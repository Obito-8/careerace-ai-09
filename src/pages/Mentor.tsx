import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import {
  Brain,
  Send,
  BookOpen,
  Code2,
  Target,
  Lightbulb,
  MessageSquare,
  User,
  Bot,
  Sparkles,
  TrendingUp,
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  type?: "suggestion" | "plan" | "feedback";
}

interface UserProfile {
  dsa_progress: number;
  resume_built: boolean;
  ai_usage_count: number;
  full_name: string;
}

const Mentor = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Redirect to auth if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  // Fetch user profile and chat history
  useEffect(() => {
    if (user) {
      fetchUserProfile();
      fetchChatHistory();
    }
  }, [user]);

  const fetchUserProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user?.id)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      setUserProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchChatHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: true })
        .limit(20);
      
      if (error) throw error;
      
      const chatMessages: Message[] = data.map(msg => [
        {
          id: `${msg.id}-user`,
          content: msg.message,
          sender: "user" as const,
          timestamp: new Date(msg.created_at),
        },
        ...(msg.response ? [{
          id: `${msg.id}-ai`,
          content: msg.response,
          sender: "ai" as const,
          timestamp: new Date(msg.created_at),
        }] : [])
      ]).flat();
      
      if (chatMessages.length === 0) {
        setMessages([{
          id: "welcome",
          content: `Hello ${userProfile?.full_name || user?.user_metadata?.full_name || 'there'}! I'm your AI Mentor. I'm here to help you with your placement preparation journey. How can I assist you today?`,
          sender: "ai",
          timestamp: new Date(),
        }]);
      } else {
        setMessages(chatMessages);
      }
    } catch (error) {
      console.error('Error fetching chat history:', error);
      setMessages([{
        id: "welcome",
        content: `Hello! I'm your AI Mentor. I'm here to help you with your placement preparation journey. How can I assist you today?`,
        sender: "ai",
        timestamp: new Date(),
      }]);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading || !user) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const messageText = inputMessage.trim();
    setInputMessage("");
    setIsLoading(true);

    try {
      // Call the chat function
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: [
            ...messages.map(msg => ({
              role: msg.sender === 'user' ? 'user' : 'assistant',
              content: msg.content
            })),
            { role: 'user', content: messageText }
          ],
          userProgress: userProfile
        }),
      });

      if (!response.ok) throw new Error('Failed to get AI response');

      // Stream the response
      let aiResponse = '';
      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response body');
      
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.trim() === '' || line.startsWith(':')) continue;
          if (!line.startsWith('data: ')) continue;
          
          const data = line.slice(6);
          if (data === '[DONE]') continue;
          
          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              aiResponse += content;
              setMessages(prev => {
                const lastMessage = prev[prev.length - 1];
                if (lastMessage?.sender === 'ai' && lastMessage.id.startsWith('streaming-')) {
                  return prev.map(msg => 
                    msg.id === lastMessage.id 
                      ? { ...msg, content: aiResponse }
                      : msg
                  );
                }
                return [...prev, {
                  id: 'streaming-' + Date.now(),
                  content: aiResponse,
                  sender: 'ai' as const,
                  timestamp: new Date(),
                }];
              });
            }
          } catch (e) {
            console.log('Failed to parse JSON:', data);
          }
        }
      }

      // Save the complete conversation to database
      await supabase.from('chat_messages').insert({
        user_id: user.id,
        message: messageText,
        response: aiResponse,
      });

      // Update AI usage count
      if (userProfile) {
        await supabase
          .from('profiles')
          .update({ ai_usage_count: (userProfile.ai_usage_count || 0) + 1 })
          .eq('user_id', user.id);
        
        setUserProfile(prev => prev ? { ...prev, ai_usage_count: (prev.ai_usage_count || 0) + 1 } : null);
      }

    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to get AI response. Please try again.",
        variant: "destructive",
      });
      
      // Remove the user message on error
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  const quickSuggestions = [
    { icon: Code2, text: "Help me plan DSA practice", category: "coding" },
    { icon: Target, text: "Create study roadmap for FAANG", category: "strategy" },
    { icon: BookOpen, text: "Review my weak areas", category: "assessment" },
    { icon: TrendingUp, text: "Track my progress", category: "analytics" },
  ];

  const handleQuickSuggestion = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Show loading if auth is still loading
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Don't render if user is not authenticated
  if (!user) {
    return null;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-4 animate-fade-in">
      {/* Chat Interface */}
      <div className="lg:col-span-3">
        <Card className="h-[600px] shadow-elegant">
          <CardHeader className="bg-gradient-primary text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Brain className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-white">AI Mentor</CardTitle>
                  <CardDescription className="text-white/80">
                    Your personalized placement guide
                  </CardDescription>
                </div>
              </div>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/20">
                <Sparkles className="mr-1 h-3 w-3" />
                Online
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="flex flex-col h-[500px] p-0">
            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.sender === "ai" && (
                      <div className="h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : message.type === "suggestion"
                          ? "bg-success/10 border border-success/20"
                          : "bg-muted"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                    {message.sender === "user" && (
                      <div className="h-8 w-8 rounded-full bg-gradient-secondary flex items-center justify-center flex-shrink-0">
                        <User className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <div className="h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div className="bg-muted rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={scrollRef} />
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Ask your AI mentor anything..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} disabled={isLoading || !inputMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Quick Suggestions */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Lightbulb className="h-4 w-4 text-warning" />
              Quick Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {quickSuggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-start h-auto p-3 text-left"
                onClick={() => handleQuickSuggestion(suggestion.text)}
              >
                <suggestion.icon className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="text-sm">{suggestion.text}</span>
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Today's Focus */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Target className="h-4 w-4 text-primary" />
              Today's Focus
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
              <h4 className="font-medium text-sm text-primary mb-1">
                Dynamic Programming
              </h4>
              <p className="text-xs text-muted-foreground">
                Master the knapsack pattern with 5 problems
              </p>
            </div>
            <div className="p-3 rounded-lg bg-success/5 border border-success/20">
              <h4 className="font-medium text-sm text-success mb-1">
                System Design
              </h4>
              <p className="text-xs text-muted-foreground">
                Learn about load balancing concepts
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Progress Insights */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <TrendingUp className="h-4 w-4 text-secondary" />
              Progress Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">DSA Progress</span>
                <span className="font-medium">{userProfile?.dsa_progress || 0}%</span>
              </div>
              <Progress value={userProfile?.dsa_progress || 0} className="h-2" />
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Resume Status</span>
              <span className={`font-medium ${userProfile?.resume_built ? 'text-success' : 'text-warning'}`}>
                {userProfile?.resume_built ? 'Built' : 'Pending'}
              </span>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">AI Usage</span>
                <span className="font-medium">{userProfile?.ai_usage_count || 0} queries</span>
              </div>
              <div className="text-xs text-muted-foreground">Total</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Mentor;
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
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

const Mentor = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi John! I'm your AI mentor. I've analyzed your progress and I'm here to help you reach your placement goals. What would you like to work on today?",
      sender: "ai",
      timestamp: new Date(),
      type: "suggestion"
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const quickSuggestions = [
    { icon: Code2, text: "Help me plan DSA practice", category: "coding" },
    { icon: Target, text: "Create study roadmap for FAANG", category: "strategy" },
    { icon: BookOpen, text: "Review my weak areas", category: "assessment" },
    { icon: TrendingUp, text: "Track my progress", category: "analytics" },
  ];

  const aiResponses = [
    "Based on your current progress, I recommend focusing on dynamic programming problems. You've mastered basic algorithms, so let's tackle more complex patterns like knapsack and subsequence problems.",
    "Great question! For FAANG preparation, I suggest this 12-week plan: Weeks 1-4 focus on data structures, weeks 5-8 on algorithms, weeks 9-10 on system design basics, and weeks 11-12 on mock interviews.",
    "I've noticed you're struggling with graph algorithms. Let's start with BFS and DFS fundamentals, then move to shortest path algorithms like Dijkstra's. I'll create a personalized practice plan.",
    "Your coding skills have improved 15% this month! Your problem-solving speed is excellent, but let's work on optimizing space complexity. I'll suggest some specific problems to practice."
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        sender: "ai",
        timestamp: new Date(),
        type: "feedback"
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleQuickSuggestion = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

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
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Problems Solved</span>
              <span className="font-medium text-success">+3 today</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Study Time</span>
              <span className="font-medium text-primary">2.5 hours</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Weak Areas</span>
              <span className="font-medium text-warning">Graphs</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Mentor;
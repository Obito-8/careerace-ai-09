import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  MessageSquare,
  Video,
  Mic,
  Clock,
  Play,
  Calendar,
  Trophy,
  TrendingUp,
  Users,
  Brain,
  Target,
} from "lucide-react";

const Interviews = () => {
  const [selectedInterview, setSelectedInterview] = useState<string | null>(null);

  const interviewTypes = [
    {
      id: "hr",
      title: "HR Interview",
      description: "Behavioral questions and culture fit assessment",
      duration: "30-45 minutes",
      difficulty: "Medium",
      icon: Users,
      questions: 25,
      completed: 18,
    },
    {
      id: "technical",
      title: "Technical Interview",
      description: "Coding problems and system design questions",
      duration: "60-90 minutes", 
      difficulty: "Hard",
      icon: Brain,
      questions: 40,
      completed: 12,
    },
    {
      id: "behavioral",
      title: "Behavioral Interview",
      description: "STAR method and past experience discussions",
      duration: "45-60 minutes",
      difficulty: "Medium",
      icon: MessageSquare,
      questions: 30,
      completed: 22,
    },
  ];

  const recentSessions = [
    {
      id: 1,
      type: "HR Interview",
      company: "Google",
      score: 85,
      feedback: "Excellent communication skills, work on specific examples",
      date: "2 days ago",
      duration: "32 min",
    },
    {
      id: 2,
      type: "Technical Interview", 
      company: "Microsoft",
      score: 72,
      feedback: "Good problem-solving approach, improve coding speed",
      date: "5 days ago",
      duration: "75 min",
    },
    {
      id: 3,
      type: "Behavioral Interview",
      company: "Amazon",
      score: 90,
      feedback: "Strong leadership examples, excellent STAR responses",
      date: "1 week ago", 
      duration: "45 min",
    },
  ];

  const upcomingScheduled = [
    {
      id: 1,
      type: "Mock Technical",
      company: "Practice Session",
      date: "Tomorrow",
      time: "2:00 PM",
      interviewer: "AI Interviewer",
    },
    {
      id: 2,
      type: "HR Simulation",
      company: "Meta Prep",
      date: "Friday",
      time: "10:00 AM", 
      interviewer: "Senior HR AI",
    },
  ];

  const commonQuestions = {
    hr: [
      "Tell me about yourself",
      "Why do you want to work here?",
      "What are your strengths and weaknesses?",
      "Where do you see yourself in 5 years?",
    ],
    technical: [
      "Reverse a linked list",
      "Design a URL shortener",
      "Find the longest substring without repeating characters",
      "Implement a LRU cache",
    ],
    behavioral: [
      "Describe a challenging project you worked on",
      "Tell me about a time you failed",
      "How do you handle conflicts with team members?",
      "Describe a time you had to learn something quickly",
    ],
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "text-success bg-success/10";
      case "Medium": return "text-warning bg-warning/10";
      case "Hard": return "text-destructive bg-destructive/10";
      default: return "";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Mock Interviews</h1>
          <p className="text-muted-foreground">Practice with AI-powered interview simulations</p>
        </div>
        <Button className="bg-gradient-hero hover:opacity-90">
          <Play className="mr-2 h-4 w-4" />
          Start Quick Interview
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="shadow-elegant">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">52</p>
                <p className="text-sm text-muted-foreground">Sessions Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-elegant">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                <Trophy className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-success">82%</p>
                <p className="text-sm text-muted-foreground">Average Score</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-elegant">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <Clock className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-warning">28h</p>
                <p className="text-sm text-muted-foreground">Practice Time</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-elegant">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-secondary">+15%</p>
                <p className="text-sm text-muted-foreground">Improvement</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Interview Types */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle>Interview Types</CardTitle>
              <CardDescription>Choose your interview focus area</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {interviewTypes.map((type) => (
                <div
                  key={type.id}
                  className="p-4 rounded-lg border hover:bg-muted/30 transition-colors cursor-pointer"
                  onClick={() => setSelectedInterview(type.id)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <type.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{type.title}</h3>
                        <p className="text-sm text-muted-foreground">{type.description}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className={getDifficultyColor(type.difficulty)}>
                      {type.difficulty}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                    <div>
                      <p className="text-muted-foreground">Duration</p>
                      <p className="font-medium">{type.duration}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Questions</p>
                      <p className="font-medium">{type.questions}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Completed</p>
                      <p className="font-medium">{type.completed}/{type.questions}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Progress value={(type.completed / type.questions) * 100} className="h-2" />
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">
                        {Math.round((type.completed / type.questions) * 100)}% Complete
                      </span>
                      <Button size="sm">
                        <Play className="mr-2 h-3 w-3" />
                        Start Practice
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Sessions */}
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-secondary" />
                Recent Sessions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentSessions.map((session) => (
                <div
                  key={session.id}
                  className="flex items-center justify-between p-4 rounded-lg border"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{session.type}</h4>
                      <Badge variant="secondary">{session.company}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{session.feedback}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {session.duration}
                      </span>
                      <span>{session.date}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-2xl font-bold ${getScoreColor(session.score)}`}>
                      {session.score}%
                    </p>
                    <p className="text-xs text-muted-foreground">Score</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Scheduled */}
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calendar className="h-5 w-5 text-primary" />
                Scheduled
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingScheduled.map((session) => (
                <div key={session.id} className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                  <h4 className="font-medium text-sm mb-1">{session.type}</h4>
                  <p className="text-xs text-muted-foreground mb-2">{session.company}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-primary font-medium">{session.date} at {session.time}</span>
                    <Button size="sm" variant="outline" className="h-6 text-xs">
                      Join
                    </Button>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule New
              </Button>
            </CardContent>
          </Card>

          {/* Common Questions */}
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Target className="h-5 w-5 text-success" />
                Today's Focus
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 rounded-lg bg-success/5 border border-success/20">
                <h4 className="font-medium text-sm text-success mb-2">HR Questions</h4>
                <div className="space-y-1">
                  {commonQuestions.hr.slice(0, 2).map((question, index) => (
                    <p key={index} className="text-xs text-muted-foreground">• {question}</p>
                  ))}
                </div>
                <Button size="sm" variant="outline" className="w-full mt-2 h-6 text-xs">
                  Practice Now
                </Button>
              </div>
              
              <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                <h4 className="font-medium text-sm text-primary mb-2">Technical Prep</h4>
                <div className="space-y-1">
                  {commonQuestions.technical.slice(0, 2).map((question, index) => (
                    <p key={index} className="text-xs text-muted-foreground">• {question}</p>
                  ))}
                </div>
                <Button size="sm" variant="outline" className="w-full mt-2 h-6 text-xs">
                  Start Coding
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="text-lg">Quick Start</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Video className="mr-2 h-4 w-4" />
                Video Interview
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Mic className="mr-2 h-4 w-4" />
                Voice Practice
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="mr-2 h-4 w-4" />
                Chat Interview
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Interviews;
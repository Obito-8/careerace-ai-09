import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Code2,
  Play,
  Clock,
  Trophy,
  CheckCircle2,
  AlertCircle,
  Zap,
  Target,
  BookOpen,
  Filter,
  Search,
} from "lucide-react";

const Practice = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedTopic, setSelectedTopic] = useState("all");

  const problems = [
    {
      id: 1,
      title: "Two Sum",
      difficulty: "Easy",
      topic: "Array",
      solved: true,
      timeSpent: "15 min",
      accuracy: 85,
      companies: ["Google", "Amazon", "Facebook"],
    },
    {
      id: 2,
      title: "Longest Substring Without Repeating Characters",
      difficulty: "Medium",
      topic: "Sliding Window",
      solved: true,
      timeSpent: "32 min",
      accuracy: 92,
      companies: ["Microsoft", "Apple"],
    },
    {
      id: 3,
      title: "Median of Two Sorted Arrays",
      difficulty: "Hard",
      topic: "Binary Search",
      solved: false,
      timeSpent: "0 min",
      accuracy: 0,
      companies: ["Google", "Netflix"],
    },
    {
      id: 4,
      title: "Valid Parentheses",
      difficulty: "Easy",
      topic: "Stack",
      solved: true,
      timeSpent: "12 min",
      accuracy: 100,
      companies: ["Amazon", "Microsoft"],
    },
    {
      id: 5,
      title: "Merge Intervals",
      difficulty: "Medium",
      topic: "Intervals",
      solved: false,
      timeSpent: "0 min",
      accuracy: 0,
      companies: ["Facebook", "Google"],
    },
  ];

  const topics = [
    { name: "Arrays", count: 45, completed: 32 },
    { name: "Strings", count: 28, completed: 20 },
    { name: "Linked Lists", count: 15, completed: 12 },
    { name: "Trees", count: 35, completed: 18 },
    { name: "Graphs", count: 25, completed: 8 },
    { name: "Dynamic Programming", count: 40, completed: 15 },
  ];

  const companies = [
    { name: "Google", problems: 120, solved: 45 },
    { name: "Amazon", problems: 95, solved: 38 },
    { name: "Microsoft", problems: 80, solved: 32 },
    { name: "Facebook", problems: 75, solved: 28 },
    { name: "Apple", problems: 60, solved: 22 },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "text-success bg-success/10 border-success/20";
      case "Medium": return "text-warning bg-warning/10 border-warning/20";
      case "Hard": return "text-destructive bg-destructive/10 border-destructive/20";
      default: return "";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Coding Practice</h1>
          <p className="text-muted-foreground">Sharpen your programming skills with curated problems</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline">
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="shadow-elegant">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-success">67</p>
                <p className="text-sm text-muted-foreground">Problems Solved</p>
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
                <p className="text-2xl font-bold text-warning">24h</p>
                <p className="text-sm text-muted-foreground">Time Spent</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-elegant">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">12</p>
                <p className="text-sm text-muted-foreground">Day Streak</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-elegant">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                <Trophy className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-secondary">89%</p>
                <p className="text-sm text-muted-foreground">Accuracy</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="problems" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="problems">Problems</TabsTrigger>
          <TabsTrigger value="topics">Topics</TabsTrigger>
          <TabsTrigger value="companies">Companies</TabsTrigger>
        </TabsList>

        {/* Problems Tab */}
        <TabsContent value="problems" className="space-y-6">
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code2 className="h-5 w-5 text-primary" />
                Practice Problems
              </CardTitle>
              <CardDescription>
                Solve problems to improve your coding skills
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {problems.map((problem) => (
                  <div
                    key={problem.id}
                    className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        {problem.solved ? (
                          <CheckCircle2 className="h-5 w-5 text-success" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-medium">{problem.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Badge variant="outline" className={getDifficultyColor(problem.difficulty)}>
                            {problem.difficulty}
                          </Badge>
                          <Badge variant="outline">{problem.topic}</Badge>
                          {problem.solved && (
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {problem.timeSpent}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          {problem.companies.map((company) => (
                            <Badge key={company} variant="secondary" className="text-xs">
                              {company}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {problem.solved && (
                        <div className="text-right">
                          <p className="text-sm font-medium text-success">{problem.accuracy}%</p>
                          <p className="text-xs text-muted-foreground">Accuracy</p>
                        </div>
                      )}
                      <Button size="sm" variant={problem.solved ? "outline" : "default"}>
                        <Play className="mr-2 h-4 w-4" />
                        {problem.solved ? "Retry" : "Solve"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Topics Tab */}
        <TabsContent value="topics" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {topics.map((topic) => (
              <Card key={topic.name} className="shadow-elegant">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{topic.name}</h3>
                      <BookOpen className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{topic.completed}/{topic.count}</span>
                      </div>
                      <Progress value={(topic.completed / topic.count) * 100} className="h-2" />
                    </div>
                    <Button variant="outline" className="w-full">
                      <Target className="mr-2 h-4 w-4" />
                      Practice
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Companies Tab */}
        <TabsContent value="companies" className="space-y-6">
          <div className="grid gap-4">
            {companies.map((company) => (
              <Card key={company.name} className="shadow-elegant">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">{company.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{company.solved}/{company.problems} solved</span>
                        <Progress 
                          value={(company.solved / company.problems) * 100} 
                          className="w-32 h-2" 
                        />
                        <span className="font-medium text-primary">
                          {Math.round((company.solved / company.problems) * 100)}%
                        </span>
                      </div>
                    </div>
                    <Button variant="outline">
                      <Code2 className="mr-2 h-4 w-4" />
                      View Problems
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Practice;
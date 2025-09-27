import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Code2,
  Clock,
  CheckCircle2,
  Play,
  BookOpen,
  Target,
  Zap,
} from "lucide-react";

const BasicProblems = () => {
  const problemCategories = [
    {
      id: "arrays",
      title: "Arrays & Strings",
      description: "Fundamental operations on arrays and string manipulation",
      problems: 25,
      completed: 18,
      difficulty: "Easy",
      color: "bg-success",
    },
    {
      id: "linked-lists",
      title: "Linked Lists",
      description: "Pointer manipulation and list operations",
      problems: 15,
      completed: 8,
      difficulty: "Easy",
      color: "bg-primary",
    },
    {
      id: "stacks-queues",
      title: "Stacks & Queues",
      description: "LIFO and FIFO data structure problems",
      problems: 12,
      completed: 5,
      difficulty: "Medium",
      color: "bg-secondary",
    },
  ];

  const basicProblems = [
    {
      id: 1,
      title: "Two Sum",
      difficulty: "Easy",
      category: "Arrays",
      completed: true,
      timeToSolve: "15 min",
    },
    {
      id: 2,
      title: "Reverse String",
      difficulty: "Easy",
      category: "Strings",
      completed: true,
      timeToSolve: "10 min",
    },
    {
      id: 3,
      title: "Valid Parentheses",
      difficulty: "Easy",
      category: "Stacks",
      completed: false,
      timeToSolve: "20 min",
    },
    {
      id: 4,
      title: "Maximum Subarray",
      difficulty: "Medium",
      category: "Arrays",
      completed: false,
      timeToSolve: "25 min",
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "text-success bg-success/10";
      case "Medium": return "text-warning bg-warning/10";
      case "Hard": return "text-destructive bg-destructive/10";
      default: return "";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Basic Problems</h1>
          <p className="text-muted-foreground">Build your foundation with essential coding problems</p>
        </div>
        <Button className="bg-gradient-hero hover:opacity-90">
          <Play className="mr-2 h-4 w-4" />
          Start Practice Session
        </Button>
      </div>

      {/* Problem Categories */}
      <div className="grid gap-6 md:grid-cols-3">
        {problemCategories.map((category) => (
          <Card key={category.id} className="shadow-elegant hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{category.title}</CardTitle>
                <Badge variant="outline" className={getDifficultyColor(category.difficulty)}>
                  {category.difficulty}
                </Badge>
              </div>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{category.completed}/{category.problems} problems</span>
              </div>
              <Progress value={(category.completed / category.problems) * 100} className="h-2" />
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {Math.round((category.completed / category.problems) * 100)}% Complete
                </span>
                <Button size="sm">
                  <Code2 className="mr-2 h-3 w-3" />
                  Practice
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Problem List */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Recommended Problems
              </CardTitle>
              <CardDescription>Start with these fundamental problems</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {basicProblems.map((problem) => (
                <div
                  key={problem.id}
                  className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                    problem.completed
                      ? "bg-success/5 border-success/20"
                      : "bg-muted/30 hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-2 w-2 rounded-full ${
                        problem.completed ? "bg-success" : "bg-muted-foreground"
                      }`}
                    />
                    <div>
                      <p className={`font-medium ${problem.completed ? "line-through text-muted-foreground" : ""}`}>
                        {problem.title}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Badge variant="outline" className={getDifficultyColor(problem.difficulty)}>
                          {problem.difficulty}
                        </Badge>
                        <Badge variant="secondary">{problem.category}</Badge>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {problem.timeToSolve}
                        </span>
                      </div>
                    </div>
                  </div>
                  {problem.completed ? (
                    <CheckCircle2 className="h-5 w-5 text-success" />
                  ) : (
                    <Button size="sm" variant="outline">
                      Solve
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Zap className="h-5 w-5 text-warning" />
                Quick Start
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Code2 className="mr-2 h-4 w-4" />
                Array Problems
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BookOpen className="mr-2 h-4 w-4" />
                Study Guide
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Target className="mr-2 h-4 w-4" />
                Practice Plan
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="text-lg">Today's Goal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/20">
                <div className="text-2xl font-bold text-primary mb-1">3</div>
                <p className="text-sm text-muted-foreground">Problems to solve</p>
                <Progress value={33} className="mt-2 h-2" />
                <p className="text-xs text-muted-foreground mt-1">1 of 3 completed</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BasicProblems;
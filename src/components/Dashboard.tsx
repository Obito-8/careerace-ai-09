import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  Code2,
  FileText,
  Target,
  TrendingUp,
  Calendar,
  Trophy,
  Clock,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  Zap,
  Award,
  Activity,
} from "lucide-react";

const Dashboard = () => {
  const overallScore = 75;
  const weeklyProgress = [
    { day: "Mon", completed: 8 },
    { day: "Tue", completed: 6 },
    { day: "Wed", completed: 12 },
    { day: "Thu", completed: 4 },
    { day: "Fri", completed: 9 },
    { day: "Sat", completed: 7 },
    { day: "Sun", completed: 5 },
  ];

  const skillAreas = [
    { name: "Data Structures", score: 80, color: "bg-success" },
    { name: "Algorithms", score: 70, color: "bg-primary" },
    { name: "System Design", score: 60, color: "bg-secondary" },
    { name: "Communication", score: 85, color: "bg-warning" },
  ];

  const todaysTasks = [
    { id: 1, title: "Complete Binary Tree Problems", type: "coding", completed: false, time: "30 min" },
    { id: 2, title: "Practice Mock Interview", type: "interview", completed: true, time: "45 min" },
    { id: 3, title: "Update Resume Skills Section", type: "resume", completed: false, time: "15 min" },
    { id: 4, title: "Read System Design Article", type: "study", completed: false, time: "20 min" },
  ];

  const upcomingMilestones = [
    { title: "Complete 100 LeetCode Problems", progress: 67, deadline: "Mar 15" },
    { title: "Mock Interview Mastery", progress: 40, deadline: "Mar 20" },
    { title: "Resume ATS Score 95%", progress: 80, deadline: "Mar 10" },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-hero p-8 text-white">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Welcome back, John! 👋</h1>
          <p className="text-lg opacity-90 mb-6">
            You're 75% ready for placements. Let's get you to 100%!
          </p>
          <div className="flex flex-wrap gap-4">
            <Button variant="secondary" className="bg-white/20 hover:bg-white/30 border-white/20">
              <Brain className="mr-2 h-4 w-4" />
              Ask AI Mentor
            </Button>
            <Button variant="outline" className="border-white/20 hover:bg-white/10">
              <Code2 className="mr-2 h-4 w-4" />
              Start Coding
            </Button>
          </div>
        </div>
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
        <div className="absolute -right-20 -bottom-10 h-60 w-60 rounded-full bg-white/5" />
      </div>

      {/* Stats Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-card shadow-elegant">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Placement Readiness</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary mb-2">{overallScore}%</div>
            <Progress value={overallScore} className="h-2 mb-2" />
            <p className="text-xs text-muted-foreground">+5% from last week</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-elegant">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Problems Solved</CardTitle>
            <Code2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success mb-2">67/100</div>
            <Progress value={67} className="h-2 mb-2" />
            <p className="text-xs text-muted-foreground">33 more to go!</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-elegant">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Study Streak</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning mb-2">12 Days</div>
            <p className="text-xs text-muted-foreground">Keep it up! 🔥</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-elegant">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Skill Level</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary mb-2">Level 5</div>
            <Badge variant="secondary" className="text-xs">Intermediate</Badge>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Today's Tasks */}
        <Card className="lg:col-span-2 shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-success" />
              Today's Tasks
            </CardTitle>
            <CardDescription>Complete these to stay on track</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {todaysTasks.map((task) => (
              <div
                key={task.id}
                className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                  task.completed
                    ? "bg-success/5 border-success/20"
                    : "bg-muted/30 hover:bg-muted/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`h-2 w-2 rounded-full ${
                      task.completed ? "bg-success" : "bg-muted-foreground"
                    }`}
                  />
                  <div>
                    <p className={`font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                      {task.title}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {task.time}
                    <Badge variant="outline" className="text-xs">
                        {task.type}
                      </Badge>
                    </div>
                  </div>
                </div>
                {!task.completed && (
                  <Button size="sm" variant="outline">
                    Start
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Skill Progress */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Skill Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {skillAreas.map((skill) => (
              <div key={skill.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{skill.name}</span>
                  <span className="text-sm text-muted-foreground">{skill.score}%</span>
                </div>
                <Progress value={skill.score} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Milestones & Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Upcoming Milestones */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-warning" />
              Upcoming Milestones
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingMilestones.map((milestone, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{milestone.title}</span>
                  <Badge variant="outline" className="text-xs">
                    {milestone.deadline}
                  </Badge>
                </div>
                <Progress value={milestone.progress} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {milestone.progress}% complete
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Weekly Activity */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-secondary" />
              Weekly Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between gap-2 h-32">
              {weeklyProgress.map((day) => (
                <div key={day.day} className="flex flex-col items-center gap-2">
                  <div
                    className="w-8 bg-gradient-primary rounded-t transition-all duration-300 hover:opacity-80"
                    style={{ height: `${(day.completed / 12) * 100}%` }}
                  />
                  <span className="text-xs text-muted-foreground">{day.day}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Jump into your learning journey</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button className="h-20 flex-col gap-2" variant="outline">
              <Brain className="h-6 w-6" />
              <span>Ask AI Mentor</span>
            </Button>
            <Button className="h-20 flex-col gap-2" variant="outline">
              <Code2 className="h-6 w-6" />
              <span>Solve Problems</span>
            </Button>
            <Button className="h-20 flex-col gap-2" variant="outline">
              <FileText className="h-6 w-6" />
              <span>Update Resume</span>
            </Button>
            <Button className="h-20 flex-col gap-2" variant="outline">
              <BookOpen className="h-6 w-6" />
              <span>Take Mock Test</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
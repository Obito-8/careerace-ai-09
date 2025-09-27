import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  Download,
  Eye,
  Edit3,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Brain,
  Target,
  Award,
  User,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Resume = () => {
  const [atsScore, setAtsScore] = useState(78);
  
  const resumeSections = [
    { name: "Contact Info", completed: true, score: 100 },
    { name: "Professional Summary", completed: true, score: 85 },
    { name: "Work Experience", completed: true, score: 90 },
    { name: "Education", completed: true, score: 95 },
    { name: "Skills", completed: true, score: 80 },
    { name: "Projects", completed: false, score: 0 },
    { name: "Certifications", completed: false, score: 0 },
  ];

  const aiSuggestions = [
    {
      type: "improvement",
      section: "Professional Summary",
      message: "Add quantifiable achievements to strengthen your summary",
      priority: "high"
    },
    {
      type: "missing",
      section: "Skills",
      message: "Include React.js and Node.js to match job requirements",
      priority: "medium"
    },
    {
      type: "optimization",
      section: "Work Experience",
      message: "Use more action verbs like 'implemented' and 'optimized'",
      priority: "low"
    },
  ];

  const recentApplications = [
    { company: "Google", position: "Software Engineer", status: "In Review", score: 85 },
    { company: "Microsoft", position: "Frontend Developer", status: "Rejected", score: 72 },
    { company: "Amazon", position: "Full Stack Developer", status: "Applied", score: 90 },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-destructive bg-destructive/10";
      case "medium": return "text-warning bg-warning/10";
      case "low": return "text-primary bg-primary/10";
      default: return "";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Review": return "text-warning bg-warning/10";
      case "Rejected": return "text-destructive bg-destructive/10";
      case "Applied": return "text-primary bg-primary/10";
      default: return "";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Resume Builder</h1>
          <p className="text-muted-foreground">Create ATS-friendly resumes with AI assistance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
          <Button>
            <Edit3 className="mr-2 h-4 w-4" />
            Edit Resume
          </Button>
        </div>
      </div>

      {/* ATS Score Card */}
      <Card className="bg-gradient-card shadow-elegant">
        <CardContent className="p-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">ATS Compatibility Score</h3>
                  <p className="text-muted-foreground">How well your resume passes automated screening</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Overall Score</span>
                  <span className="text-2xl font-bold text-primary">{atsScore}%</span>
                </div>
                <Progress value={atsScore} className="h-3" />
                <div className="flex items-center gap-2 text-sm">
                  {atsScore >= 80 ? (
                    <CheckCircle2 className="h-4 w-4 text-success" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-warning" />
                  )}
                  <span className="text-muted-foreground">
                    {atsScore >= 80 ? "Excellent ATS compatibility" : "Needs improvement for ATS"}
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Keyword Match</span>
                <span className="font-medium text-success">85%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Format Score</span>
                <span className="font-medium text-primary">92%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Readability</span>
                <span className="font-medium text-warning">75%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="builder" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="builder">Builder</TabsTrigger>
          <TabsTrigger value="feedback">AI Feedback</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
        </TabsList>

        {/* Resume Builder */}
        <TabsContent value="builder" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Sections Progress */}
            <div className="lg:col-span-1">
              <Card className="shadow-elegant">
                <CardHeader>
                  <CardTitle className="text-lg">Resume Sections</CardTitle>
                  <CardDescription>Complete all sections for best results</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {resumeSections.map((section) => (
                    <div key={section.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {section.completed ? (
                            <CheckCircle2 className="h-4 w-4 text-success" />
                          ) : (
                            <div className="h-4 w-4 rounded-full border-2 border-muted-foreground" />
                          )}
                          <span className="text-sm font-medium">{section.name}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {section.score}%
                        </span>
                      </div>
                      <Progress value={section.score} className="h-1" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Resume Preview */}
            <div className="lg:col-span-2">
              <Card className="shadow-elegant">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Resume Preview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Header */}
                  <div className="text-center space-y-2 pb-4 border-b">
                    <h2 className="text-2xl font-bold">John Doe</h2>
                    <p className="text-muted-foreground">Software Developer</p>
                    <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        john@example.com
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        +1 (555) 123-4567
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        San Francisco, CA
                      </div>
                    </div>
                  </div>

                  {/* Professional Summary */}
                  <div className="space-y-2">
                    <h3 className="font-semibold text-primary">Professional Summary</h3>
                    <p className="text-sm text-muted-foreground">
                      Passionate software developer with 3+ years of experience building scalable web applications. 
                      Proficient in React, Node.js, and Python with a track record of delivering high-quality solutions.
                    </p>
                  </div>

                  {/* Skills */}
                  <div className="space-y-2">
                    <h3 className="font-semibold text-primary">Technical Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {["React", "JavaScript", "Python", "Node.js", "MongoDB", "Git"].map((skill) => (
                        <Badge key={skill} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </div>

                  {/* Experience */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-primary">Work Experience</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-medium">Frontend Developer</h4>
                          <span className="text-sm text-muted-foreground">2022 - Present</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">TechCorp Inc.</p>
                        <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                          <li>• Developed responsive web applications using React and TypeScript</li>
                          <li>• Improved application performance by 40% through code optimization</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* AI Feedback */}
        <TabsContent value="feedback" className="space-y-6">
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                AI-Powered Feedback
              </CardTitle>
              <CardDescription>
                Get personalized suggestions to improve your resume
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {aiSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-lg border hover:bg-muted/30 transition-colors"
                >
                  <div className={`h-2 w-2 rounded-full mt-2 ${getPriorityColor(suggestion.priority)}`} />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{suggestion.section}</h4>
                      <Badge variant="outline" className={getPriorityColor(suggestion.priority)}>
                        {suggestion.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{suggestion.message}</p>
                    <Button size="sm" variant="outline">
                      <Edit3 className="mr-2 h-3 w-3" />
                      Apply Suggestion
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Templates */}
        <TabsContent value="templates" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {["Modern", "Classic", "Creative", "Minimal", "Professional", "Tech"].map((template) => (
              <Card key={template} className="shadow-elegant hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="aspect-[3/4] bg-muted rounded-lg mb-4 flex items-center justify-center">
                    <FileText className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2">{template} Template</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Perfect for {template.toLowerCase()} job applications
                  </p>
                  <Button variant="outline" className="w-full">
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Applications */}
        <TabsContent value="applications" className="space-y-6">
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-success" />
                Recent Applications
              </CardTitle>
              <CardDescription>
                Track your job applications and their ATS scores
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentApplications.map((app, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg border"
                >
                  <div className="space-y-1">
                    <h4 className="font-medium">{app.position}</h4>
                    <p className="text-sm text-muted-foreground">{app.company}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-medium">Score: {app.score}%</p>
                      <Badge variant="outline" className={getStatusColor(app.status)}>
                        {app.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Resume;
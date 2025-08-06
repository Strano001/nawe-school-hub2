import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  GraduationCap, 
  BookOpen,
  School,
  Calendar,
  TrendingUp,
  Settings,
  MessageSquare,
  FileText,
  BarChart3,
  Clock,
  Bell,
  CheckCircle,
  UserPlus,
  BookMarked,
  Target,
  Award,
  PieChart,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
import Logo from '@/components/ui/logo';
import { toast } from '@/hooks/use-toast';

const Demo = () => {
  const { user, profile, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  if (!user || !profile) {
    return <Navigate to="/auth" replace />;
  }

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Demo Session Ended",
      description: "All demo data has been reset. Thanks for exploring NaWe-SMS!",
    });
  };

  const modules = [
    {
      id: 'overview',
      name: 'Dashboard Overview',
      icon: BarChart3,
      description: 'School performance metrics and insights'
    },
    {
      id: 'students',
      name: 'Student Management',
      icon: Users,
      description: 'Enrollment, profiles, and student records'
    },
    {
      id: 'teachers',
      name: 'Staff Management',
      icon: GraduationCap,
      description: 'Teacher profiles and assignments'
    },
    {
      id: 'classes',
      name: 'Class Management',
      icon: School,
      description: 'Class setup, schedules, and room assignments'
    },
    {
      id: 'academics',
      name: 'Academic System',
      icon: BookOpen,
      description: 'Curriculum, subjects, and grading'
    },
    {
      id: 'assessments',
      name: 'CBT & Assessments',
      icon: Target,
      description: 'Computer-based testing and evaluations'
    },
    {
      id: 'reports',
      name: 'Reports & Analytics',
      icon: FileText,
      description: 'Performance reports and data insights'
    },
    {
      id: 'communication',
      name: 'Communication',
      icon: MessageSquare,
      description: 'Messages, announcements, and notifications'
    }
  ];

  const DemoOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-[hsl(var(--nawe-teal))]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[hsl(var(--nawe-teal))]">1,247</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +8.2% from last term
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-[hsl(var(--nawe-green))]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Teaching Staff</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[hsl(var(--nawe-green))]">89</div>
            <div className="text-xs text-muted-foreground">45 Full-time, 44 Part-time</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-[hsl(var(--nawe-yellow))]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Attendance Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[hsl(var(--nawe-yellow))]">96.3%</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +2.1% this month
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-[hsl(var(--nawe-red))]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Academic Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[hsl(var(--nawe-red))]">87.5%</div>
            <div className="text-xs text-muted-foreground">Average class performance</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Current Academic Session
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">2023/2024 Academic Year</span>
              <Badge className="bg-[hsl(var(--nawe-green))] text-white">Active</Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>First Term</span>
                <Badge variant="outline">Completed</Badge>
              </div>
              <div className="flex justify-between">
                <span>Second Term</span>
                <Badge className="bg-[hsl(var(--nawe-teal))] text-white">Current</Badge>
              </div>
              <div className="flex justify-between">
                <span>Third Term</span>
                <Badge variant="secondary">Upcoming</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-[hsl(var(--nawe-yellow))]" />
              Recent Achievements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 bg-[hsl(var(--nawe-green))] rounded-full"></div>
              <span className="text-sm">Mathematics Olympiad - 3rd Place</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 bg-[hsl(var(--nawe-yellow))] rounded-full"></div>
              <span className="text-sm">Science Fair - Best Innovation Award</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 bg-[hsl(var(--nawe-red))] rounded-full"></div>
              <span className="text-sm">Inter-school Sports Competition</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const DemoModule = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-primary">{title}</h3>
      {children}
    </div>
  );

  const renderModuleContent = (moduleId: string) => {
    switch (moduleId) {
      case 'overview':
        return <DemoOverview />;
      
      case 'students':
        return (
          <DemoModule title="Student Management System">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Enroll New Student
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    View All Students
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Reports
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Recent Enrollments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div>Adebayo Tunde - JS1A</div>
                    <div>Fatima Mohammed - SS2B</div>
                    <div>Chinedu Okeke - JS3C</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </DemoModule>
        );
      
      case 'teachers':
        return (
          <DemoModule title="Staff Management System">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Teaching Staff</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[hsl(var(--nawe-green))]">89</div>
                  <div className="text-xs text-muted-foreground">Active teachers</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Support Staff</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[hsl(var(--nawe-teal))]">24</div>
                  <div className="text-xs text-muted-foreground">Administrative staff</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Departments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[hsl(var(--nawe-yellow))]">12</div>
                  <div className="text-xs text-muted-foreground">Academic departments</div>
                </CardContent>
              </Card>
            </div>
          </DemoModule>
        );
      
      case 'classes':
        return (
          <DemoModule title="Class Management System">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {['JSS1', 'JSS2', 'JSS3', 'SS1', 'SS2', 'SS3'].map((level) => (
                <Card key={level}>
                  <CardHeader>
                    <CardTitle className="text-sm">{level}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1 text-sm">
                      <div>Classes: {level.includes('JSS') ? '4' : '3'}</div>
                      <div>Students: {Math.floor(Math.random() * 100) + 150}</div>
                      <div>Teachers: {Math.floor(Math.random() * 5) + 8}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </DemoModule>
        );
      
      case 'academics':
        return (
          <DemoModule title="Academic Management System">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Subjects Offered</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>Mathematics</div>
                      <div>English Language</div>
                      <div>Physics</div>
                      <div>Chemistry</div>
                      <div>Biology</div>
                      <div>Geography</div>
                      <div>Economics</div>
                      <div>Literature</div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Grading System</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>A (Excellent)</span>
                      <span className="text-[hsl(var(--nawe-green))]">90-100%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>B (Very Good)</span>
                      <span className="text-[hsl(var(--nawe-teal))]">80-89%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>C (Good)</span>
                      <span className="text-[hsl(var(--nawe-yellow))]">70-79%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>D (Pass)</span>
                      <span className="text-[hsl(var(--nawe-red))]">60-69%</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </DemoModule>
        );
      
      case 'assessments':
        return (
          <DemoModule title="CBT & Assessment System">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Ongoing Assessments</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Mathematics - Mid-term Test</span>
                    <Badge className="bg-[hsl(var(--nawe-green))] text-white">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">English Language Quiz</span>
                    <Badge className="bg-[hsl(var(--nawe-teal))] text-white">Pending</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Science Practical</span>
                    <Badge variant="outline">Scheduled</Badge>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Assessment Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Completed Tests:</span>
                    <span className="font-medium">156</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Average Score:</span>
                    <span className="font-medium text-[hsl(var(--nawe-green))]">78.5%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Participation Rate:</span>
                    <span className="font-medium text-[hsl(var(--nawe-teal))]">94.2%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </DemoModule>
        );
      
      case 'reports':
        return (
          <DemoModule title="Reports & Analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <PieChart className="h-4 w-4" />
                    Academic Reports
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full mb-2">Student Report Cards</Button>
                  <Button variant="outline" className="w-full mb-2">Class Performance</Button>
                  <Button variant="outline" className="w-full">Subject Analysis</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Administrative
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full mb-2">Attendance Reports</Button>
                  <Button variant="outline" className="w-full mb-2">Financial Summary</Button>
                  <Button variant="outline" className="w-full">Staff Reports</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full mb-2">Performance Trends</Button>
                  <Button variant="outline" className="w-full mb-2">Enrollment Stats</Button>
                  <Button variant="outline" className="w-full">Custom Reports</Button>
                </CardContent>
              </Card>
            </div>
          </DemoModule>
        );
      
      case 'communication':
        return (
          <DemoModule title="Communication Hub">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Bell className="h-4 w-4" />
                    Recent Announcements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="border-l-4 border-[hsl(var(--nawe-teal))] pl-3">
                    <div className="font-medium text-sm">Parent-Teacher Meeting</div>
                    <div className="text-xs text-muted-foreground">Scheduled for next Friday</div>
                  </div>
                  <div className="border-l-4 border-[hsl(var(--nawe-yellow))] pl-3">
                    <div className="font-medium text-sm">Mid-term Break</div>
                    <div className="text-xs text-muted-foreground">Two weeks starting Monday</div>
                  </div>
                  <div className="border-l-4 border-[hsl(var(--nawe-green))] pl-3">
                    <div className="font-medium text-sm">Sports Day</div>
                    <div className="text-xs text-muted-foreground">Inter-house competition</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Announcement
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Phone className="h-4 w-4 mr-2" />
                    SMS Notification
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Bell className="h-4 w-4 mr-2" />
                    Emergency Alert
                  </Button>
                </CardContent>
              </Card>
            </div>
          </DemoModule>
        );
      
      default:
        return <DemoOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Logo size="md" />
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="bg-[hsl(var(--nawe-teal))]/10 text-[hsl(var(--nawe-teal))] border-[hsl(var(--nawe-teal))]">
                Demo Mode
              </Badge>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Welcome,</span>
                <span className="font-medium">{profile.first_name}</span>
                <Badge variant="secondary">{profile.role.replace('_', ' ')}</Badge>
              </div>
              <Button variant="outline" onClick={handleSignOut}>
                End Demo
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            NaWe-SMS Demo Experience
          </h1>
          <p className="text-muted-foreground">
            Explore all features of our comprehensive school management system. 
            All data shown is simulated for demonstration purposes.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-4 lg:grid-cols-8 w-full">
            {modules.map((module) => (
              <TabsTrigger 
                key={module.id} 
                value={module.id} 
                className="text-xs data-[state=active]:bg-[hsl(var(--nawe-teal))] data-[state=active]:text-white"
              >
                <module.icon className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">{module.name.split(' ')[0]}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {modules.map((module) => (
            <TabsContent key={module.id} value={module.id} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <module.icon className="h-5 w-5 text-[hsl(var(--nawe-teal))]" />
                    {module.name}
                  </CardTitle>
                  <CardDescription>{module.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {renderModuleContent(module.id)}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="border-t bg-card mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Logo size="sm" />
              <span className="text-sm text-muted-foreground">
                © 2024 NaWe School Management System. Demo Environment.
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">Version 2.0</Badge>
              <Badge className="bg-[hsl(var(--nawe-green))] text-white">Live Demo</Badge>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Demo;
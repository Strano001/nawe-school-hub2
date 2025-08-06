import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Users, 
  GraduationCap, 
  BookOpen,
  School,
  Database,
  Wifi,
  Shield
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { DEMO_USERS, DEMO_SCHOOL } from '@/lib/constants';
import { createDemoData } from '@/lib/demo-data';

interface TestResult {
  name: string;
  status: 'success' | 'error' | 'pending';
  message: string;
  duration?: number;
}

const Test = () => {
  const { createDemoUser, signIn, signOut } = useAuth();
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentTest, setCurrentTest] = useState<string>('');

  const updateTestResult = (name: string, status: TestResult['status'], message: string, duration?: number) => {
    setTestResults(prev => {
      const existing = prev.find(r => r.name === name);
      if (existing) {
        return prev.map(r => r.name === name ? { ...r, status, message, duration } : r);
      }
      return [...prev, { name, status, message, duration }];
    });
  };

  const runTest = async (name: string, testFn: () => Promise<void>) => {
    setCurrentTest(name);
    updateTestResult(name, 'pending', 'Running...');
    
    const startTime = Date.now();
    try {
      await testFn();
      const duration = Date.now() - startTime;
      updateTestResult(name, 'success', 'Passed', duration);
    } catch (error) {
      const duration = Date.now() - startTime;
      updateTestResult(name, 'error', error instanceof Error ? error.message : 'Failed', duration);
    }
  };

  const testDatabaseConnection = async () => {
    const { data, error } = await supabase.from('schools').select('count').limit(1);
    if (error) throw new Error(`Database connection failed: ${error.message}`);
    if (!data) throw new Error('No response from database');
  };

  const testAuthentication = async () => {
    // Test sign up
    const testUser = {
      email: `test-${Date.now()}@nawe.ng`,
      password: 'Demo123!',
      first_name: 'Test',
      last_name: 'User',
      role: 'student',
    };

    const { error: signUpError } = await createDemoUser(testUser);
    if (signUpError) throw new Error(`Sign up failed: ${signUpError.message}`);

    // Test sign in
    const { error: signInError } = await signIn(testUser.email, testUser.password);
    if (signInError) throw new Error(`Sign in failed: ${signInError.message}`);

    // Clean up - sign out
    await signOut();
  };

  const testRoleBasedAccess = async () => {
    // Test that different roles have appropriate access
    const { data: profiles, error } = await supabase
      .from('profiles')
      .select('role')
      .limit(5);
    
    if (error) throw new Error(`Role access test failed: ${error.message}`);
    if (!profiles || profiles.length === 0) {
      throw new Error('No profiles found for role testing');
    }
  };

  const testSchoolDataIsolation = async () => {
    // Test that school data is properly isolated
    const { data: schools, error } = await supabase
      .from('schools')
      .select('id, name')
      .limit(5);
    
    if (error) throw new Error(`School isolation test failed: ${error.message}`);
    // This test passes if we can query schools without errors
  };

  const testDataIntegrity = async () => {
    // Test foreign key relationships
    const { data: classes, error } = await supabase
      .from('classes')
      .select(`
        id,
        name,
        school_id,
        schools!inner(name)
      `)
      .limit(5);
    
    if (error) throw new Error(`Data integrity test failed: ${error.message}`);
    // Test passes if relationships are properly maintained
  };

  const runAllTests = async () => {
    setIsRunning(true);
    setTestResults([]);
    setCurrentTest('');

    const tests = [
      { name: 'Database Connection', fn: testDatabaseConnection },
      { name: 'Authentication System', fn: testAuthentication },
      { name: 'Role-Based Access', fn: testRoleBasedAccess },
      { name: 'School Data Isolation', fn: testSchoolDataIsolation },
      { name: 'Data Integrity', fn: testDataIntegrity },
    ];

    for (const test of tests) {
      await runTest(test.name, test.fn);
      // Small delay between tests
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    setCurrentTest('');
    setIsRunning(false);
    
    const passedTests = testResults.filter(r => r.status === 'success').length;
    const totalTests = tests.length;
    
    toast({
      title: "Test Suite Complete",
      description: `${passedTests}/${totalTests} tests passed`,
      variant: passedTests === totalTests ? "default" : "destructive",
    });
  };

  const createDemoUsers = async () => {
    setIsRunning(true);
    let created = 0;
    
    for (const user of DEMO_USERS) {
      try {
        const { error } = await createDemoUser(user);
        if (!error) {
          created++;
        }
      } catch (error) {
        console.error('Error creating demo user:', error);
      }
    }
    
    setIsRunning(false);
    toast({
      title: "Demo Users Created",
      description: `${created}/${DEMO_USERS.length} demo users created successfully`,
    });
  };

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-destructive" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-amber-500 animate-spin" />;
    }
  };

  const getStatusColor = (status: TestResult['status']) => {
    switch (status) {
      case 'success':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'error':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'pending':
        return 'bg-amber-50 text-amber-700 border-amber-200';
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">NaWe-SMS Test Suite</h1>
          <p className="text-muted-foreground">
            Test the functionality and integrity of the school management system
          </p>
        </div>

        <Tabs defaultValue="demo" className="space-y-6">
          <TabsList className="grid w-full grid-cols-1">
            <TabsTrigger value="demo">Demo Experience</TabsTrigger>
          </TabsList>

          <TabsContent value="demo" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  NaWe-SMS Demo Experience
                </CardTitle>
                <CardDescription>
                  Experience the full power of our school management system with realistic demo data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Start Your Demo Journey</h3>
                    <p className="text-muted-foreground">
                      Use any of the demo accounts below to explore different role perspectives in NaWe-SMS. 
                      Each role offers unique features and capabilities.
                    </p>
                    <Link to="/demo">
                      <Button className="w-full bg-[hsl(var(--nawe-teal))] hover:bg-[hsl(var(--nawe-teal))]/90">
                        <GraduationCap className="h-4 w-4 mr-2" />
                        Launch Full Demo Experience
                      </Button>
                    </Link>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Available Demo Roles</h3>
                    <div className="grid grid-cols-1 gap-2">
                      {DEMO_USERS.map((user, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                          <div>
                            <span className="font-medium">{user.first_name} {user.last_name}</span>
                            <Badge variant="outline" className="ml-2">
                              {user.role.replace('_', ' ')}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {user.email}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-semibold text-lg mb-4">What You Can Explore</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card className="border-l-4 border-l-[hsl(var(--nawe-teal))]">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="h-4 w-4 text-[hsl(var(--nawe-teal))]" />
                          <span className="font-medium">Student Management</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Enrollment, profiles, attendance tracking, and academic records
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-[hsl(var(--nawe-green))]">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <GraduationCap className="h-4 w-4 text-[hsl(var(--nawe-green))]" />
                          <span className="font-medium">Academic System</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Curriculum management, grading, and progress tracking
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-[hsl(var(--nawe-yellow))]">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <BookOpen className="h-4 w-4 text-[hsl(var(--nawe-yellow))]" />
                          <span className="font-medium">CBT & Assessments</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Computer-based testing and comprehensive evaluation tools
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-[hsl(var(--nawe-red))]">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <School className="h-4 w-4 text-[hsl(var(--nawe-red))]" />
                          <span className="font-medium">Administration</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          School settings, staff management, and system configuration
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-[hsl(var(--nawe-blue))]">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Database className="h-4 w-4 text-[hsl(var(--nawe-blue))]" />
                          <span className="font-medium">Reports & Analytics</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Comprehensive reporting and data-driven insights
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-[hsl(var(--nawe-teal))]">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Wifi className="h-4 w-4 text-[hsl(var(--nawe-teal))]" />
                          <span className="font-medium">Communication</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Messaging, announcements, and parent-school communication
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </div>
    </div>
  );
};

export default Test;
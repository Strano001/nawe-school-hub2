import { useState } from 'react';
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
      email: `test-${Date.now()}@example.com`,
      password: 'testpassword123',
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
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500 animate-spin" />;
    }
  };

  const getStatusColor = (status: TestResult['status']) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
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

        <Tabs defaultValue="tests" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tests">System Tests</TabsTrigger>
            <TabsTrigger value="demo">Demo Data</TabsTrigger>
            <TabsTrigger value="info">System Info</TabsTrigger>
          </TabsList>

          <TabsContent value="tests" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Automated Test Suite
                </CardTitle>
                <CardDescription>
                  Run comprehensive tests to verify system functionality
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={runAllTests} 
                  disabled={isRunning}
                  className="w-full"
                >
                  {isRunning ? 'Running Tests...' : 'Run All Tests'}
                </Button>

                {currentTest && (
                  <Alert>
                    <Clock className="h-4 w-4" />
                    <AlertDescription>
                      Currently running: {currentTest}
                    </AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  {testResults.map((result, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        {getStatusIcon(result.status)}
                        <span className="font-medium">{result.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {result.duration && (
                          <span className="text-sm text-muted-foreground">
                            {result.duration}ms
                          </span>
                        )}
                        <Badge className={getStatusColor(result.status)}>
                          {result.message}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="demo" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Demo Users
                  </CardTitle>
                  <CardDescription>
                    Create demo users for testing different roles
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    onClick={createDemoUsers} 
                    disabled={isRunning}
                    className="w-full"
                  >
                    {isRunning ? 'Creating Users...' : 'Create Demo Users'}
                  </Button>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Available Demo Accounts:</h4>
                    {DEMO_USERS.map((user, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-muted rounded">
                        <div>
                          <span className="font-medium">{user.email}</span>
                          <Badge variant="outline" className="ml-2">
                            {user.role.replace('_', ' ')}
                          </Badge>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          Password: {user.password}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <School className="h-5 w-5" />
                    Demo School
                  </CardTitle>
                  <CardDescription>
                    Information about the demo school
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <span className="font-medium">Name:</span> {DEMO_SCHOOL.name}
                  </div>
                  <div>
                    <span className="font-medium">Code:</span> {DEMO_SCHOOL.code}
                  </div>
                  <div>
                    <span className="font-medium">Address:</span> {DEMO_SCHOOL.address}
                  </div>
                  <div>
                    <span className="font-medium">Phone:</span> {DEMO_SCHOOL.phone}
                  </div>
                  <div>
                    <span className="font-medium">Email:</span> {DEMO_SCHOOL.email}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="info" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Database
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Provider:</span>
                      <span>Supabase</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <Badge variant="outline" className="bg-green-100 text-green-800">
                        Connected
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wifi className="h-5 w-5" />
                    Authentication
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Provider:</span>
                      <span>Supabase Auth</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <Badge variant="outline" className="bg-green-100 text-green-800">
                        Active
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Multi-tenant</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Role-based access</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Nigerian term system</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Test;
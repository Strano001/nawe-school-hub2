import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { GraduationCap, School, TestTube } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { DEMO_USERS, DEMO_SCHOOL } from '@/lib/constants';

const Auth = () => {
  const { user, signIn, signUp } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Signup form state
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [schoolCode, setSchoolCode] = useState('');
  const [role, setRole] = useState('');

  // If user is already logged in, redirect to dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError(null);

    const { error } = await signIn(loginEmail, loginPassword);
    
    if (error) {
      setError(error.message);
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Logged in successfully!",
      });
    }
    
    setLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupEmail || !signupPassword || !firstName || !lastName || !schoolCode || !role) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError(null);

    // Use demo school ID for testing
    const mockSchoolId = DEMO_SCHOOL.id;

    const { error } = await signUp(signupEmail, signupPassword, {
      first_name: firstName,
      last_name: lastName,
      school_id: mockSchoolId,
      role: role,
    });

    if (error) {
      setError(error.message);
      toast({
        title: "Signup Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Account created successfully! Please check your email to verify your account.",
      });
    }

    setLoading(false);
  };

  const loginWithDemo = (demoUser: typeof DEMO_USERS[0]) => {
    setLoginEmail(demoUser.email);
    setLoginPassword(demoUser.password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <img 
              src="/lovable-uploads/a34045c0-a003-4c9a-98cb-3cff3573fdad.png" 
              alt="NaWe Logo" 
              className="h-16 w-16 object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold text-foreground">NaWe-SMS</h1>
          <p className="text-muted-foreground mt-2">School Management System</p>
        </div>

        {/* Demo Users Quick Access */}
        <Card className="mb-4">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <TestTube className="h-4 w-4" />
              Demo Accounts
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-2 gap-2">
              {DEMO_USERS.slice(0, 4).map((user, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => loginWithDemo(user)}
                  className="text-xs"
                >
                  {user.role.replace('_', ' ')}
                </Button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Click to auto-fill login credentials
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">Welcome</CardTitle>
            <CardDescription className="text-center">
              Sign in to your account or create a new one
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              {error && (
                <Alert variant="destructive" className="mt-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="Enter your email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="Enter your password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input
                        id="first-name"
                        placeholder="First name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input
                        id="last-name"
                        placeholder="Last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Create a password"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="school-code">School Code</Label>
                    <Input
                      id="school-code"
                      placeholder="Enter your school code"
                      value={schoolCode}
                      onChange={(e) => setSchoolCode(e.target.value)}
                      defaultValue={DEMO_SCHOOL.code}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select value={role} onValueChange={setRole} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="school_admin">School Administrator</SelectItem>
                        <SelectItem value="principal">Principal</SelectItem>
                        <SelectItem value="teacher">Teacher</SelectItem>
                        <SelectItem value="accountant">Accountant</SelectItem>
                        <SelectItem value="cashier">Cashier</SelectItem>
                        <SelectItem value="auditor">Auditor</SelectItem>
                        <SelectItem value="parent">Parent</SelectItem>
                        <SelectItem value="student">Student</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Creating account...' : 'Create Account'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
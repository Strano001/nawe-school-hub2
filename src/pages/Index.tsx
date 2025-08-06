import { useAuth } from '@/hooks/useAuth';
import { Navigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, School, Users, BookOpen, TrendingUp, TestTube } from 'lucide-react';
import Logo from '@/components/ui/logo';

const Index = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground mt-2">Loading...</p>
        </div>
      </div>
    );
  }

  // If user is logged in, redirect to dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Logo size="lg" showText={true} clickable={true} />
          <Button asChild>
            <Link to="/auth">Get Started</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Modern School Management
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Streamline your educational institution with our comprehensive, 
            Nigerian-focused school management system designed for efficiency and growth.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button size="lg" asChild>
              <Link to="/auth">Start Free Trial</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/test">
                <TestTube className="h-4 w-4 mr-2" />
                Test System
              </Link>
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card>
            <CardHeader>
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <School className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Multi-Tenant Architecture</CardTitle>
              <CardDescription>
                Manage multiple schools from one platform with isolated data and customizable settings.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="bg-secondary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-secondary-foreground" />
              </div>
              <CardTitle>Role-Based Access</CardTitle>
              <CardDescription>
                Seven distinct user roles from super admin to students, each with appropriate permissions.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-accent-foreground" />
              </div>
              <CardTitle>Nigerian Term System</CardTitle>
              <CardDescription>
                Built specifically for the Nigerian three-term academic system with proper term management.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Performance Analytics</CardTitle>
              <CardDescription>
                Comprehensive dashboards with visual reports for student progress and school performance.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="bg-secondary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <GraduationCap className="h-6 w-6 text-secondary-foreground" />
              </div>
              <CardTitle>CBT Integration</CardTitle>
              <CardDescription>
                Computer-Based Testing module for modern examination and assessment methods.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <School className="h-6 w-6 text-accent-foreground" />
              </div>
              <CardTitle>Customizable Branding</CardTitle>
              <CardDescription>
                Each school can customize themes, logos, and branding to match their identity.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">Ready to Transform Your School?</CardTitle>
              <CardDescription className="text-lg">
                Join hundreds of Nigerian schools already using NaWe-SMS to streamline their operations.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button size="lg" asChild className="w-full sm:w-auto">
                <Link to="/auth">Get Started Today</Link>
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                Free trial • No credit card required • Setup in minutes
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t">
        <div className="text-center text-muted-foreground">
          <p>&copy; 2024 NaWe-SMS. Built for Nigerian Educational Excellence.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

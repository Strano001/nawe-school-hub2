-- Phase 1: Foundation & Multi-tenant Database Schema for NaWe-SMS
-- Create enum types for user roles
CREATE TYPE public.user_role AS ENUM (
  'super_admin',
  'school_admin', 
  'principal',
  'accountant',
  'teacher',
  'parent',
  'student',
  'auditor',
  'cashier'
);

-- Create enum for subscription status
CREATE TYPE public.subscription_status AS ENUM (
  'active',
  'inactive',
  'suspended',
  'trial'
);

-- Create enum for term status
CREATE TYPE public.term_status AS ENUM (
  'open',
  'closed'
);

-- Create enum for grading system
CREATE TYPE public.grading_system AS ENUM (
  'letter', -- A-F
  'percentage' -- 1-100%
);

-- Create schools table (multi-tenant foundation)
CREATE TABLE public.schools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  code TEXT UNIQUE NOT NULL, -- Unique school code for identification
  address TEXT,
  phone TEXT,
  email TEXT,
  logo_url TEXT,
  theme_color TEXT DEFAULT '#1e40af',
  subscription_status subscription_status DEFAULT 'trial',
  subscription_expires_at TIMESTAMPTZ,
  grading_system grading_system DEFAULT 'percentage',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create user profiles table (extends auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
  role user_role NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  date_of_birth DATE,
  avatar_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create academic sessions table
CREATE TABLE public.academic_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL, -- e.g., "2023/2024"
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  is_current BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(school_id, name)
);

-- Create terms table (Nigerian 3-term system)
CREATE TABLE public.terms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
  academic_session_id UUID REFERENCES public.academic_sessions(id) ON DELETE CASCADE,
  name TEXT NOT NULL, -- "First Term", "Second Term", "Third Term"
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status term_status DEFAULT 'closed',
  is_current BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(school_id, academic_session_id, name)
);

-- Create classes table
CREATE TABLE public.classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL, -- e.g., "JSS 1A", "Primary 5B"
  level TEXT NOT NULL, -- e.g., "Primary", "Junior Secondary", "Senior Secondary"
  capacity INTEGER DEFAULT 40,
  class_teacher_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(school_id, name)
);

-- Create subjects table
CREATE TABLE public.subjects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  code TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(school_id, code)
);

-- Enable Row Level Security on all tables
ALTER TABLE public.schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.academic_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.terms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for schools
CREATE POLICY "Super admins can view all schools" ON public.schools
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'super_admin'
    )
  );

CREATE POLICY "Users can view their own school" ON public.schools
  FOR SELECT USING (
    id IN (
      SELECT school_id FROM public.profiles 
      WHERE profiles.id = auth.uid()
    )
  );

CREATE POLICY "Super admins can manage all schools" ON public.schools
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'super_admin'
    )
  );

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (id = auth.uid());

CREATE POLICY "School admins can view school users" ON public.profiles
  FOR SELECT USING (
    school_id IN (
      SELECT school_id FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role IN ('school_admin', 'principal')
    )
  );

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (id = auth.uid());

CREATE POLICY "School admins can manage school users" ON public.profiles
  FOR ALL USING (
    school_id IN (
      SELECT school_id FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role IN ('school_admin', 'principal')
    )
  );

-- Create RLS policies for academic_sessions, terms, classes, subjects
CREATE POLICY "School users can view school data" ON public.academic_sessions
  FOR SELECT USING (
    school_id IN (
      SELECT school_id FROM public.profiles 
      WHERE profiles.id = auth.uid()
    )
  );

CREATE POLICY "School admins can manage school data" ON public.academic_sessions
  FOR ALL USING (
    school_id IN (
      SELECT school_id FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role IN ('school_admin', 'principal')
    )
  );

-- Copy similar policies for terms, classes, subjects
CREATE POLICY "School users can view terms" ON public.terms
  FOR SELECT USING (
    school_id IN (
      SELECT school_id FROM public.profiles 
      WHERE profiles.id = auth.uid()
    )
  );

CREATE POLICY "School admins can manage terms" ON public.terms
  FOR ALL USING (
    school_id IN (
      SELECT school_id FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role IN ('school_admin', 'principal')
    )
  );

CREATE POLICY "School users can view classes" ON public.classes
  FOR SELECT USING (
    school_id IN (
      SELECT school_id FROM public.profiles 
      WHERE profiles.id = auth.uid()
    )
  );

CREATE POLICY "School admins can manage classes" ON public.classes
  FOR ALL USING (
    school_id IN (
      SELECT school_id FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role IN ('school_admin', 'principal')
    )
  );

CREATE POLICY "School users can view subjects" ON public.subjects
  FOR SELECT USING (
    school_id IN (
      SELECT school_id FROM public.profiles 
      WHERE profiles.id = auth.uid()
    )
  );

CREATE POLICY "School admins can manage subjects" ON public.subjects
  FOR ALL USING (
    school_id IN (
      SELECT school_id FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role IN ('school_admin', 'principal')
    )
  );

-- Create function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- For now, new users will need to be assigned to a school manually
  -- This will be handled by the registration flow
  RETURN NEW;
END;
$$;

-- Create trigger for new users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_schools_updated_at
  BEFORE UPDATE ON public.schools
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_academic_sessions_updated_at
  BEFORE UPDATE ON public.academic_sessions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_terms_updated_at
  BEFORE UPDATE ON public.terms
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_classes_updated_at
  BEFORE UPDATE ON public.classes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_subjects_updated_at
  BEFORE UPDATE ON public.subjects
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
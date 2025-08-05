export type UserRole = 
  | 'super_admin'
  | 'school_admin' 
  | 'principal'
  | 'accountant'
  | 'teacher'
  | 'parent'
  | 'student'
  | 'auditor'
  | 'cashier';

export interface Profile {
  id: string;
  school_id: string;
  role: UserRole;
  first_name: string;
  last_name: string;
  phone?: string;
  address?: string;
  date_of_birth?: string;
  avatar_url?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface School {
  id: string;
  name: string;
  code: string;
  address?: string;
  phone?: string;
  email?: string;
  logo_url?: string;
  theme_color: string;
  subscription_status: 'active' | 'inactive' | 'suspended' | 'trial';
  subscription_expires_at?: string;
  grading_system: 'letter' | 'percentage';
  created_at: string;
  updated_at: string;
}
export const APP_CONFIG = {
  name: import.meta.env.VITE_APP_NAME || 'NaWe-SMS',
  version: import.meta.env.VITE_APP_VERSION || '1.0.0',
  environment: import.meta.env.VITE_ENVIRONMENT || 'development',
} as const;

export const ROUTES = {
  HOME: '/',
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  STUDENTS: '/students',
  TEACHERS: '/teachers',
  CLASSES: '/classes',
  SUBJECTS: '/subjects',
  REPORTS: '/reports',
  TEST: '/test',
} as const;

export const USER_ROLES = {
  SUPER_ADMIN: 'super_admin',
  SCHOOL_ADMIN: 'school_admin',
  PRINCIPAL: 'principal',
  ACCOUNTANT: 'accountant',
  TEACHER: 'teacher',
  PARENT: 'parent',
  STUDENT: 'student',
  AUDITOR: 'auditor',
  CASHIER: 'cashier',
} as const;

export const DEMO_SCHOOL = {
  id: 'demo-school-001',
  name: 'Demo Secondary School',
  code: 'DEMO001',
  address: '123 Education Street, Lagos, Nigeria',
  phone: '+234-801-234-5678',
  email: 'info@demoschool.edu.ng',
};

export const DEMO_USERS = [
  {
    email: 'admin@demo.school',
    password: 'demo123',
    role: 'school_admin',
    first_name: 'John',
    last_name: 'Administrator',
  },
  {
    email: 'principal@demo.school',
    password: 'demo123',
    role: 'principal',
    first_name: 'Mary',
    last_name: 'Principal',
  },
  {
    email: 'teacher@demo.school',
    password: 'demo123',
    role: 'teacher',
    first_name: 'David',
    last_name: 'Teacher',
  },
  {
    email: 'student@demo.school',
    password: 'demo123',
    role: 'student',
    first_name: 'Sarah',
    last_name: 'Student',
  },
  {
    email: 'parent@demo.school',
    password: 'demo123',
    role: 'parent',
    first_name: 'James',
    last_name: 'Parent',
  },
] as const;
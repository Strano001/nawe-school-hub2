import { z } from 'zod';

// User validation schemas
export const userRoleSchema = z.enum([
  'super_admin',
  'school_admin',
  'principal',
  'accountant',
  'teacher',
  'parent',
  'student',
  'auditor',
  'cashier',
]);

export const profileSchema = z.object({
  first_name: z.string().min(1, 'First name is required').max(50),
  last_name: z.string().min(1, 'Last name is required').max(50),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  address: z.string().optional(),
  date_of_birth: z.string().optional(),
  role: userRoleSchema,
});

export const signUpSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  school_code: z.string().min(1, 'School code is required'),
  role: userRoleSchema,
});

export const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

// School validation schemas
export const schoolSchema = z.object({
  name: z.string().min(1, 'School name is required').max(100),
  code: z.string().min(1, 'School code is required').max(20),
  address: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
});

// Class validation schemas
export const classSchema = z.object({
  name: z.string().min(1, 'Class name is required').max(50),
  level: z.string().min(1, 'Level is required'),
  capacity: z.number().min(1).max(100).optional(),
});

// Subject validation schemas
export const subjectSchema = z.object({
  name: z.string().min(1, 'Subject name is required').max(100),
  code: z.string().min(1, 'Subject code is required').max(10),
  description: z.string().optional(),
});

// Validation helper functions
export const validateEmail = (email: string): boolean => {
  return z.string().email().safeParse(email).success;
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

// Form validation helper
export const getValidationErrors = (schema: z.ZodSchema, data: any) => {
  const result = schema.safeParse(data);
  if (result.success) {
    return null;
  }
  
  const errors: Record<string, string> = {};
  result.error.errors.forEach((error) => {
    const path = error.path.join('.');
    errors[path] = error.message;
  });
  
  return errors;
};
-- Fix security warnings: Set search_path for all functions to ensure security

-- Update the handle_new_user function to fix search path security
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  -- For now, new users will need to be assigned to a school manually
  -- This will be handled by the registration flow
  RETURN NEW;
END;
$$;

-- Update the update_updated_at_column function to fix search path security
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;
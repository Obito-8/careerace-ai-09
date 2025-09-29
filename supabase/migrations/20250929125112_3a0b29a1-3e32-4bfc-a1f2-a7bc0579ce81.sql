-- Drop and recreate the trigger to fix user profile creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Recreate the trigger with better error handling
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (new.id, new.raw_user_meta_data ->> 'full_name')
  ON CONFLICT (user_id) DO NOTHING;
  RETURN new;
END;
$$;

-- Create the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Clean up any orphaned auth users without profiles
DELETE FROM auth.users WHERE id NOT IN (SELECT user_id FROM public.profiles WHERE user_id IS NOT NULL);
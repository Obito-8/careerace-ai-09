-- Remove incorrectly created admin user and its profile so a clean signup can occur
WITH target AS (
  SELECT id FROM auth.users WHERE email = 'admin@placementhub.com'
)
DELETE FROM public.profiles p
USING target t
WHERE p.user_id = t.id;

WITH target AS (
  SELECT id FROM auth.users WHERE email = 'admin@placementhub.com'
)
DELETE FROM auth.users u
USING target t
WHERE u.id = t.id;
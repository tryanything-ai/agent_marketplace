// @ts-ignore
import secrets from 'secrets';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = secrets.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = secrets.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

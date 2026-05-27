import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://zuqtucfejpkghptiphsz.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1cXR1Y2ZlanBrZ2hwdGlwaHN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk1MzAxMjIsImV4cCI6MjA5NTEwNjEyMn0.DfNDuh-ucbTOU1ZbxAv_qC_zlkRrjqRb5eqQjwqMbZc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Prompt = {
  id: string;
  title: string;
  category_id: string;
  prompt: string;
  prompt_cn?: string;
  negative_prompt?: string;
  negative_prompt_cn?: string;
  description?: string;
  image_url?: string;
  sort_order?: number;
  created_at: string;
  updated_at: string;
};

export type Category = {
  id: string;
  name: string;
  icon: string;
  description?: string;
  parent_id?: string;
  created_at: string;
};

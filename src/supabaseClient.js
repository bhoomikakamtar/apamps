
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://gsspdliszpqzqvoqblyi.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdzc3BkbGlzenBxenF2b3FibHlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY5MzA2MzgsImV4cCI6MjA5MjUwNjYzOH0.aizr6puFs-b7KQGy5tLFsN_k3Al_K7U8VT7sqqJNmfg"

export const hasSupabaseConfig = supabaseUrl && supabaseKey

export const supabase = hasSupabaseConfig
    ? createClient(supabaseUrl, supabaseKey)
    : null
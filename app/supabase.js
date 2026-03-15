import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ebgekirzpsazgewhmkt.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImViZ2VraXJ6cHNhendnZXdobWt0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0NTI1NjgsImV4cCI6MjA4OTAyODU2OH0.YgXbClgAPFpRtVnUWlnwpK7oVkf_4-nsS114GelQxw0'

export const supabase = createClient(supabaseUrl, supabaseKey)
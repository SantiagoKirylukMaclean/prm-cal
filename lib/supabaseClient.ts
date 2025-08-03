import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://etgbsbgariqydkxfjbfk.supabase.co"
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0Z2JzYmdhcmlxeWRreGZqYmZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4NzI3NDEsImV4cCI6MjA2OTQ0ODc0MX0.UVNI6mgS4FG1-R99u5ebiWM-ZbFMzgI9cOQzcWJQMDQ"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

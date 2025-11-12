import { createClient } from "@supabase/supabase-js";

const URL ='https://erskpzdolyiprqafiidj.supabase.co'
const API_KEY ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVyc2twemRvbHlpcHJxYWZpaWRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5MDk2NDQsImV4cCI6MjA3ODQ4NTY0NH0.MZdp2IntKC6cYxnSglORORYz0R_sH6ADSSHDYHUdM8w'

export const supabase = createClient(URL, API_KEY)
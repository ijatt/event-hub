import { createClient } from '@supabase/supabase-js'

/**
 * This function returns a Supabase client based on the runtime configuration.
 * It uses the `useRuntimeConfig` hook to retrieve the Supabase URL and key from the configuration.
 * 
 * @returns {SupabaseClient} The Supabase client instance.
 */
export default () => {
  const config = useRuntimeConfig()
  return createClient("https://lxaioewcfoimwcbprcsh.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4YWlvZXdjZm9pbXdjYnByY3NoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNzIzODM0NCwiZXhwIjoyMDUyODE0MzQ0fQ.YpW0yMEIV9RkDxYWdMeU8AmeHDleealX5yetn03IvaU")
}
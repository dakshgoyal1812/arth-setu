const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'placeholder-anon-key';

let supabase = null;
let isConfigured = false;

try {
  if (
    supabaseUrl &&
    supabaseAnonKey &&
    !supabaseUrl.includes('placeholder') &&
    !supabaseAnonKey.includes('placeholder')
  ) {
    supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
    isConfigured = true;
    console.log(`[Supabase] Client initialized for URL: ${supabaseUrl}`);
  } else {
    // Initialize dummy client so code does not throw ReferenceError
    supabase = createClient('https://dummy-project.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy', {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
    console.log('[Supabase] Running with placeholder configuration. Update backend/.env with your Supabase credentials.');
  }
} catch (error) {
  console.error('[Supabase] Initialization error:', error.message);
}

/**
 * Checks Supabase connectivity status without crashing
 */
async function checkSupabaseConnection() {
  if (!isConfigured) {
    return {
      status: 'pending_configuration',
      message: 'SUPABASE_URL or SUPABASE_ANON_KEY has placeholder values in backend/.env',
      url: supabaseUrl,
    };
  }

  try {
    // Lightweight auth health ping
    const { error } = await supabase.auth.getSession();
    if (error) {
      return {
        status: 'connection_error',
        message: error.message,
        url: supabaseUrl,
      };
    }
    return {
      status: 'connected',
      message: 'Successfully reached Supabase',
      url: supabaseUrl,
    };
  } catch (err) {
    return {
      status: 'unreachable',
      message: err.message,
      url: supabaseUrl,
    };
  }
}

module.exports = {
  supabase,
  isConfigured,
  checkSupabaseConnection,
};

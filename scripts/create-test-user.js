// Script to create a test user account in Supabase
const { createClient } = require('@supabase/supabase-js');

// Get Supabase credentials from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function createTestUser() {
  try {
    // Create user with email and password
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: 'broomarcura@gmail.com',
      password: 'Res4617950!',
    });

    if (authError) {
      throw authError;
    }

    console.log('User created successfully:', authData);
    
    // Note: The profile entry will be created automatically if you have
    // set up a trigger in Supabase to create profiles when users sign up.
    // If not, you would need to create the profile manually here.

  } catch (error) {
    console.error('Error creating test user:', error.message);
  }
}

createTestUser();

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface ContactSubmission {
  id?: string;
  full_name: string;
  email: string;
  phone: string;
  service_interest: string;
  project_description: string;
  property_address: string;
  submitted_at?: string;
  status?: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

// Contact form submission function
export async function submitContactForm(formData: Omit<ContactSubmission, 'id' | 'submitted_at' | 'created_at' | 'updated_at'>) {
  try {
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([
        {
          full_name: formData.full_name,
          email: formData.email,
          phone: formData.phone,
          service_interest: formData.service_interest,
          project_description: formData.project_description,
          property_address: formData.property_address,
          status: 'new'
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      throw new Error(`Failed to submit form: ${error.message}`);
    }

    return { success: true, data };
  } catch (error) {
    console.error('Form submission error:', error);
    throw error;
  }
}

// Function to get all contact submissions (for admin use)
export async function getContactSubmissions() {
  try {
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('submitted_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch submissions: ${error.message}`);
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error fetching submissions:', error);
    throw error;
  }
}

// Function to update submission status
export async function updateSubmissionStatus(id: string, status: string, notes?: string) {
  try {
    const updateData: any = { 
      status, 
      updated_at: new Date().toISOString() 
    };
    
    if (notes !== undefined) {
      updateData.notes = notes;
    }

    const { data, error } = await supabase
      .from('contact_submissions')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update submission: ${error.message}`);
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error updating submission:', error);
    throw error;
  }
}
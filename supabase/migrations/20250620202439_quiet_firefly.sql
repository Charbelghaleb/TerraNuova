/*
  # Create contact submissions table

  1. New Tables
    - `contact_submissions`
      - `id` (uuid, primary key)
      - `full_name` (text, required)
      - `email` (text, required)
      - `phone` (text, required)
      - `service_interest` (text, required)
      - `project_description` (text, required)
      - `property_address` (text, required)
      - `submitted_at` (timestamp with timezone, default now())
      - `status` (text, default 'new')
      - `notes` (text, optional)

  2. Security
    - Enable RLS on `contact_submissions` table
    - Add policy for authenticated users to read all submissions
    - Add policy for anonymous users to insert their own submissions
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  service_interest text NOT NULL,
  project_description text NOT NULL,
  property_address text NOT NULL,
  submitted_at timestamptz DEFAULT now(),
  status text DEFAULT 'new',
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Policy to allow anonymous users to insert contact submissions
CREATE POLICY "Anyone can submit contact forms"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy to allow authenticated users to read all contact submissions
CREATE POLICY "Authenticated users can read all submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy to allow authenticated users to update submissions
CREATE POLICY "Authenticated users can update submissions"
  ON contact_submissions
  FOR UPDATE
  TO authenticated
  USING (true);

-- Create an index on submitted_at for better query performance
CREATE INDEX IF NOT EXISTS idx_contact_submissions_submitted_at 
  ON contact_submissions(submitted_at DESC);

-- Create an index on status for filtering
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status 
  ON contact_submissions(status);

-- Create an index on email for lookups
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email 
  ON contact_submissions(email);
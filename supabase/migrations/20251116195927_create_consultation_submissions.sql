/*
  # Create consultation_submissions table

  1. New Tables
    - `consultation_submissions`
      - `id` (uuid, primary key)
      - `first_name` (text, required)
      - `last_name` (text, optional)
      - `phone` (text, required)
      - `email` (text, required)
      - `message` (text, required)
      - `created_at` (timestamp)
  
  2. Security
    - Enable RLS on `consultation_submissions` table
    - Add policy for anonymous users to insert submissions
*/

CREATE TABLE IF NOT EXISTS consultation_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text,
  phone text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE consultation_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit consultation"
  ON consultation_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Submissions are private"
  ON consultation_submissions
  FOR SELECT
  TO authenticated
  USING (true);

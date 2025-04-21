/*
  # Create responses table

  1. New Tables
    - `responses`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `age` (integer, not null)
      - `created_at` (timestamp with time zone, default now())
  2. Security
    - Enable RLS on `responses` table
    - Add policy for anyone to insert data
    - Add policy for anyone to read data
*/

CREATE TABLE IF NOT EXISTS responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  age integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE responses ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert data
CREATE POLICY "Allow anyone to insert responses"
  ON responses
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy to allow anyone to read data
CREATE POLICY "Allow anyone to read responses"
  ON responses
  FOR SELECT
  TO anon
  USING (true);
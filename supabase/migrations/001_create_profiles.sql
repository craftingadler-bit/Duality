-- Create profiles table with DHBW verification
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,

  -- DHBW specific
  dhbw_email_verified BOOLEAN DEFAULT FALSE,
  campus TEXT CHECK (campus IN ('Mannheim', 'Stuttgart', 'Karlsruhe', 'Heilbronn', 'Mosbach', 'Ravensburg', 'Heidenheim', 'Lörrach', 'Villingen-Schwenningen')),
  major TEXT NOT NULL,
  semester INTEGER CHECK (semester BETWEEN 1 AND 6),
  current_phase TEXT CHECK (current_phase IN ('Theoriephase', 'Praxisphase', 'Auslandssemester')),

  -- Profile details
  bio TEXT,
  profile_image_url TEXT,
  interests TEXT[], -- Array of interest IDs
  lifestyle TEXT CHECK (lifestyle IN ('Party machen', 'Entspannt', 'Kreativ', 'Sportlich', 'Gemischt')),

  -- Reputation system
  reputation_score DECIMAL(3,2) DEFAULT 5.00 CHECK (reputation_score >= 0 AND reputation_score <= 5),
  total_reviews INTEGER DEFAULT 0,
  total_transactions INTEGER DEFAULT 0,

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_login_at TIMESTAMPTZ,

  -- Constraints
  CONSTRAINT valid_dhbw_email CHECK (
    dhbw_email_verified = FALSE OR
    email LIKE '%@dhbw.de' OR
    email LIKE '%@student.dhbw-mannheim.de'
  )
);

-- Create index for faster lookups
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_profiles_campus ON profiles(campus);
CREATE INDEX idx_profiles_verified ON profiles(dhbw_email_verified);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can delete their own profile"
  ON profiles FOR DELETE
  USING (auth.uid() = id);

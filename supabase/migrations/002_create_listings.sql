-- Create ENUM for listing categories
CREATE TYPE listing_category AS ENUM ('SERVICE', 'PHYSICAL', 'DIGITAL');

-- Create ENUM for listing status
CREATE TYPE listing_status AS ENUM ('ACTIVE', 'PENDING', 'SOLD', 'ARCHIVED');

-- Create listings table
CREATE TABLE IF NOT EXISTS listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,

  -- Basic info
  title TEXT NOT NULL CHECK (char_length(title) >= 5 AND char_length(title) <= 100),
  description TEXT NOT NULL CHECK (char_length(description) >= 20),
  category listing_category NOT NULL,
  subcategory TEXT, -- e.g., 'Tutoring', 'Books', 'Software'

  -- Pricing
  price DECIMAL(10,2) CHECK (price >= 0),
  is_negotiable BOOLEAN DEFAULT FALSE,
  is_free BOOLEAN DEFAULT FALSE,

  -- Status
  status listing_status DEFAULT 'ACTIVE',

  -- Location (for physical items)
  location TEXT, -- e.g., 'Lindenhof', 'Neckarstadt'
  pickup_available BOOLEAN DEFAULT TRUE,
  shipping_available BOOLEAN DEFAULT FALSE,

  -- Digital assets (for DIGITAL category)
  has_digital_asset BOOLEAN DEFAULT FALSE,
  asset_file_path TEXT, -- Path in Supabase Storage
  asset_file_name TEXT,
  asset_file_size INTEGER, -- in bytes
  asset_file_type TEXT, -- MIME type
  asset_preview_url TEXT, -- Optional preview/thumbnail

  -- Service specific (for SERVICE category)
  hourly_rate DECIMAL(10,2),
  service_duration INTEGER, -- in minutes

  -- Images
  image_urls TEXT[], -- Array of image URLs

  -- Metadata
  views_count INTEGER DEFAULT 0,
  favorites_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ, -- Optional expiration date

  -- Semester sync
  relevant_for_exam_phase BOOLEAN DEFAULT FALSE,
  target_semester INTEGER CHECK (target_semester BETWEEN 1 AND 6),

  CONSTRAINT price_or_free CHECK (
    (is_free = TRUE AND price = 0) OR
    (is_free = FALSE AND price > 0)
  )
);

-- Create indexes
CREATE INDEX idx_listings_user_id ON listings(user_id);
CREATE INDEX idx_listings_category ON listings(category);
CREATE INDEX idx_listings_status ON listings(status);
CREATE INDEX idx_listings_created_at ON listings(created_at DESC);
CREATE INDEX idx_listings_exam_phase ON listings(relevant_for_exam_phase);

-- Create updated_at trigger
CREATE TRIGGER update_listings_updated_at
  BEFORE UPDATE ON listings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for listings
CREATE POLICY "Active listings viewable by verified users"
  ON listings FOR SELECT
  USING (
    status = 'ACTIVE' AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.dhbw_email_verified = TRUE
    )
  );

CREATE POLICY "Users can view their own listings"
  ON listings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Verified users can create listings"
  ON listings FOR INSERT
  WITH CHECK (
    auth.uid() = user_id AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.dhbw_email_verified = TRUE
      AND profiles.email LIKE '%@dhbw.de'
      OR profiles.email LIKE '%@student.dhbw-mannheim.de'
    )
  );

CREATE POLICY "Users can update their own listings"
  ON listings FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own listings"
  ON listings FOR DELETE
  USING (auth.uid() = user_id);

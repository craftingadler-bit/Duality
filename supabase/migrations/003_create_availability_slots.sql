-- Create availability slots table for tutors/services
CREATE TABLE IF NOT EXISTS availability_slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,

  -- Slot details
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,

  -- Booking status
  is_booked BOOLEAN DEFAULT FALSE,
  booked_by_user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,

  -- Recurring slots
  is_recurring BOOLEAN DEFAULT FALSE,
  recurrence_rule TEXT, -- e.g., 'WEEKLY', 'BIWEEKLY'
  recurrence_end_date TIMESTAMPTZ,

  -- Metadata
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  CONSTRAINT valid_time_range CHECK (end_time > start_time),
  CONSTRAINT valid_booking CHECK (
    (is_booked = FALSE AND booked_by_user_id IS NULL) OR
    (is_booked = TRUE AND booked_by_user_id IS NOT NULL)
  )
);

-- Create indexes
CREATE INDEX idx_availability_listing ON availability_slots(listing_id);
CREATE INDEX idx_availability_user ON availability_slots(user_id);
CREATE INDEX idx_availability_start_time ON availability_slots(start_time);
CREATE INDEX idx_availability_booked ON availability_slots(is_booked);

-- Create updated_at trigger
CREATE TRIGGER update_availability_slots_updated_at
  BEFORE UPDATE ON availability_slots
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE availability_slots ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view available slots for active listings"
  ON availability_slots FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM listings
      WHERE listings.id = listing_id
      AND listings.status = 'ACTIVE'
    )
  );

CREATE POLICY "Listing owners can manage their slots"
  ON availability_slots FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view slots they booked"
  ON availability_slots FOR SELECT
  USING (auth.uid() = booked_by_user_id);

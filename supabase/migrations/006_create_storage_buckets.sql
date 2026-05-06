-- Create storage buckets for digital assets
-- Note: This must be run through Supabase Dashboard or via SQL

-- Profile images bucket (public)
INSERT INTO storage.buckets (id, name, public)
VALUES ('profile-images', 'profile-images', true)
ON CONFLICT (id) DO NOTHING;

-- Listing images bucket (public)
INSERT INTO storage.buckets (id, name, public)
VALUES ('listing-images', 'listing-images', true)
ON CONFLICT (id) DO NOTHING;

-- Digital assets bucket (private - Asset Safe)
INSERT INTO storage.buckets (id, name, public)
VALUES ('digital-assets', 'digital-assets', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for profile images
CREATE POLICY "Anyone can view profile images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'profile-images');

CREATE POLICY "Users can upload their own profile image"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'profile-images' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can update their own profile image"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'profile-images' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own profile image"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'profile-images' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Storage policies for listing images
CREATE POLICY "Anyone can view listing images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'listing-images');

CREATE POLICY "Verified users can upload listing images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'listing-images' AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.dhbw_email_verified = TRUE
    )
  );

CREATE POLICY "Users can update their own listing images"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'listing-images' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own listing images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'listing-images' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Storage policies for digital assets (Asset Safe)
-- Only buyers who completed transaction can download
CREATE POLICY "Buyers can view purchased digital assets"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'digital-assets' AND
    (
      -- Owner can always view
      auth.uid()::text = (storage.foldername(name))[1] OR
      -- Buyer who completed transaction can view
      EXISTS (
        SELECT 1 FROM transactions t
        JOIN listings l ON t.listing_id = l.id
        WHERE t.buyer_id = auth.uid()
        AND t.status = 'COMPLETED'
        AND t.asset_delivered = TRUE
        AND l.asset_file_path = name
      )
    )
  );

CREATE POLICY "Sellers can upload digital assets for their listings"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'digital-assets' AND
    auth.uid()::text = (storage.foldername(name))[1] AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.dhbw_email_verified = TRUE
    )
  );

CREATE POLICY "Sellers can update their digital assets"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'digital-assets' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Sellers can delete their digital assets"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'digital-assets' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Function to deliver digital asset after payment
CREATE OR REPLACE FUNCTION deliver_digital_asset(transaction_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  transaction_record RECORD;
BEGIN
  -- Get transaction details
  SELECT * INTO transaction_record
  FROM transactions
  WHERE id = transaction_id
  AND status = 'COMPLETED'
  AND buyer_id = auth.uid();

  IF NOT FOUND THEN
    RETURN FALSE;
  END IF;

  -- Mark asset as delivered
  UPDATE transactions
  SET
    asset_delivered = TRUE,
    asset_delivery_date = NOW()
  WHERE id = transaction_id;

  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

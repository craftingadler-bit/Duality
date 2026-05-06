# Duality - Supabase Database Setup Guide

## Overview
This database schema supports a campus marketplace with special features like phase-matching, digital asset delivery, and semester-aware prioritization.

## ⚠️ Important Note
These SQL migrations cannot be executed automatically in the Figma Make environment. You need to:

1. Go to your **Supabase Dashboard** (https://app.supabase.com)
2. Navigate to **SQL Editor**
3. Run each migration file in order (001, 002, 003, etc.)

## Features Implemented

### 1. **Profiles Table** (`001_create_profiles.sql`)
- DHBW email verification (`dhbw_email_verified`)
- Campus, Major, Semester tracking
- Current phase (Theory/Practice/Abroad)
- Reputation score (0-5) with automatic calculation
- Total reviews & transactions counter
- **RLS**: Only verified @dhbw.de users can create profiles

### 2. **Listings Table** (`002_create_listings.sql`)
- **Category ENUM**: 
  - `SERVICE` (Blue) - Tutoring, Help, etc.
  - `PHYSICAL` (Orange) - Books, Furniture, Bikes
  - `DIGITAL` (Violet) - PDFs, Scripts, Software
- Digital Asset Safe integration
- Semester sync fields (`relevant_for_exam_phase`, `target_semester`)
- **RLS**: Only verified DHBW students can create listings

### 3. **Availability Slots** (`003_create_availability_slots.sql`)
- Tutor/Service booking system
- Recurring appointments support
- Booking status tracking
- **RLS**: Only listing owners can manage slots

### 4. **Semester Sync View** (`004_create_semester_sync_view.sql`)
- Materialized view that prioritizes listings by academic period:
  - **Exam Phase** (Feb/Jul): Digital materials & tutoring get priority
  - **Semester Start** (Sep/Oct): Physical items prioritized
  - **Semester End** (Dec): Selling items prioritized
- Auto-refresh function (manual trigger or via pg_cron)
- Color coding: Blue (SERVICE), Orange (PHYSICAL), Violet (DIGITAL)

### 5. **Reviews & Transactions** (`005_create_reviews_and_transactions.sql`)
- Review system with 1-5 star ratings
- Automatic reputation score updates
- Transaction tracking with status flow
- In-app messaging system
- **RLS**: Only transaction participants can access

### 6. **Storage Buckets & Asset Safe** (`006_create_storage_buckets.sql`)
Three buckets:
- `profile-images` (public)
- `listing-images` (public)
- `digital-assets` (private - **Asset Safe**)

**Asset Safe Logic**:
- Only buyers who completed transaction can download
- Sellers can upload/manage their assets
- Automatic delivery after payment confirmation

## Installation Steps

### Step 1: Create Database Schema
Run migrations in order through Supabase SQL Editor:

```sql
-- Run these in order:
-- 001_create_profiles.sql
-- 002_create_listings.sql
-- 003_create_availability_slots.sql
-- 004_create_semester_sync_view.sql
-- 005_create_reviews_and_transactions.sql
-- 006_create_storage_buckets.sql
```

### Step 2: Enable Required Extensions
```sql
-- Required for UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Optional: For scheduled tasks (materialized view refresh)
CREATE EXTENSION IF NOT EXISTS pg_cron;
```

### Step 3: Create Storage Buckets
Go to **Storage** in Supabase Dashboard and verify these buckets exist:
- `profile-images`
- `listing-images`
- `digital-assets`

### Step 4: Configure Email Templates
Set up email verification templates for DHBW email domains in:
**Authentication → Email Templates**

## Key Security Features

### Row Level Security (RLS)
All tables have RLS enabled with policies:

1. **Profiles**: 
   - Public read
   - Users can only edit their own profile

2. **Listings**: 
   - Only verified @dhbw.de users can create
   - Public read for active listings
   - Owners can edit/delete

3. **Digital Assets**:
   - Sellers: Full access to their files
   - Buyers: Access only after completed transaction
   - Public: No access

### Email Verification
```sql
CONSTRAINT valid_dhbw_email CHECK (
  dhbw_email_verified = FALSE OR 
  email LIKE '%@dhbw.de' OR 
  email LIKE '%@student.dhbw-mannheim.de'
)
```

## Database Schema Diagram

```
profiles
├── id (UUID, PK)
├── dhbw_email_verified (BOOLEAN)
├── reputation_score (DECIMAL)
└── ...

listings
├── id (UUID, PK)
├── user_id (FK → profiles)
├── category (ENUM: SERVICE/PHYSICAL/DIGITAL)
├── asset_file_path (TEXT) -- For digital assets
└── ...

availability_slots
├── id (UUID, PK)
├── listing_id (FK → listings)
├── start_time (TIMESTAMPTZ)
└── is_booked (BOOLEAN)

transactions
├── id (UUID, PK)
├── listing_id (FK → listings)
├── buyer_id (FK → profiles)
├── asset_delivered (BOOLEAN)
└── ...

reviews
├── id (UUID, PK)
├── listing_id (FK → listings)
├── rating (INTEGER 1-5)
└── ...
```

## Useful Queries

### Get Semester-Prioritized Listings
```sql
SELECT * FROM semester_prioritized_listings
WHERE campus = 'Mannheim'
ORDER BY priority_score DESC
LIMIT 20;
```

### Check User Reputation
```sql
SELECT 
  first_name,
  last_name,
  reputation_score,
  total_reviews,
  total_transactions
FROM profiles
WHERE id = 'user-uuid';
```

### Get Available Tutor Slots
```sql
SELECT * FROM availability_slots
WHERE listing_id = 'listing-uuid'
AND is_booked = FALSE
AND start_time > NOW()
ORDER BY start_time;
```

## Maintenance

### Refresh Semester View
```sql
SELECT refresh_semester_listings();
```

### Update Reputation Score (automatic via trigger)
Triggered automatically when new review is added.

### Clean Expired Listings
```sql
UPDATE listings
SET status = 'ARCHIVED'
WHERE expires_at < NOW()
AND status = 'ACTIVE';
```

## Next Steps

1. Set up Supabase Auth for DHBW email verification
2. Configure storage buckets in dashboard
3. Implement frontend API calls using Supabase client
4. Set up automated backups
5. Enable pg_cron for automatic view refresh

## Support

For questions about the database schema, check:
- Supabase Documentation: https://supabase.com/docs
- RLS Policies: https://supabase.com/docs/guides/auth/row-level-security
- Storage: https://supabase.com/docs/guides/storage

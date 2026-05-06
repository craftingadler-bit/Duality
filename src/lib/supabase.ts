// Supabase client configuration
import { createClient } from '@supabase/supabase-js';

// Get config from the auto-generated file
const SUPABASE_URL = 'https://faleomfptbprvtqcwvyd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhbGVvbWZwdGJwcnZ0cWN3dnlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyNTIwNDEsImV4cCI6MjA5MTgyODA0MX0.mIjk-iLppfF90jUaWwaH8ZX6NtGirdTyFH2CFjis0TM';

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Listing types matching database schema
export type ListingCategory = 'SERVICE' | 'PHYSICAL' | 'DIGITAL';
export type ListingStatus = 'ACTIVE' | 'PENDING' | 'SOLD' | 'ARCHIVED';

export interface Listing {
  id: string;
  user_id: string;
  title: string;
  description: string;
  category: ListingCategory;
  subcategory?: string;
  price: number;
  is_negotiable: boolean;
  is_free: boolean;
  status: ListingStatus;
  location?: string;
  pickup_available?: boolean;
  shipping_available?: boolean;
  has_digital_asset?: boolean;
  asset_file_path?: string;
  asset_file_name?: string;
  asset_file_size?: number;
  asset_file_type?: string;
  hourly_rate?: number;
  service_duration?: number;
  image_urls?: string[];
  views_count?: number;
  favorites_count?: number;
  created_at?: string;
  updated_at?: string;
  expires_at?: string;
  relevant_for_exam_phase?: boolean;
  target_semester?: number;
}

export interface Profile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  dhbw_email_verified: boolean;
  campus?: string;
  major: string;
  semester?: number;
  current_phase?: string;
  bio?: string;
  profile_image_url?: string;
  interests?: string[];
  lifestyle?: string;
  reputation_score?: number;
  total_reviews?: number;
  total_transactions?: number;
}

export interface Event {
  id: string;
  user_id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  time: string;
  location: string;
  address?: string;
  attendees: number;
  max_attendees: number;
  image_urls?: string[];
  tags?: string[];
  is_sponsored: boolean;
  host_name: string;
  created_at?: string;
  updated_at?: string;
}

export interface Housing {
  id: string;
  user_id: string;
  type: 'partner' | 'apartment';
  title: string;
  description: string;
  price: number;
  location: string;
  address?: string;
  size: string;
  available_phase: 'A-Phase' | 'B-Phase' | 'Both';
  features: string[];
  availability_months: string[];
  image_urls?: string[];
  match_score?: number;
  roommate_name?: string;
  created_at?: string;
  updated_at?: string;
}

// API functions for listings
export const listingsAPI = {
  // Fetch all active listings
  async getListings(filters?: { category?: ListingCategory; search?: string }) {
    // TODO: Replace with actual Supabase query
    // const { data, error } = await supabaseClient
    //   .from('listings')
    //   .select('*')
    //   .eq('status', 'ACTIVE')
    //   .order('created_at', { ascending: false });

    // Mock data for now
    return {
      data: [],
      error: null
    };
  },

  // Create new listing
  async createListing(listing: Partial<Listing>) {
    // TODO: Replace with actual Supabase insert
    // const { data, error } = await supabaseClient
    //   .from('listings')
    //   .insert([listing])
    //   .select();

    console.log('Creating listing:', listing);
    return {
      data: listing,
      error: null
    };
  },

  // Upload digital asset
  async uploadDigitalAsset(file: File, userId: string, listingId: string) {
    // TODO: Replace with actual Supabase storage upload
    // const filePath = `${userId}/${listingId}/${file.name}`;
    // const { data, error } = await supabaseClient.storage
    //   .from('digital-assets')
    //   .upload(filePath, file);

    console.log('Uploading digital asset:', file.name);
    return {
      data: { path: `${userId}/${listingId}/${file.name}` },
      error: null
    };
  },

  // Upload listing images
  async uploadImages(files: File[], userId: string, listingId: string) {
    // TODO: Replace with actual Supabase storage upload
    const uploadPromises = Array.from(files).map(async (file, index) => {
      const filePath = `${userId}/${listingId}/${index}-${file.name}`;
      // const { data, error } = await supabaseClient.storage
      //   .from('listing-images')
      //   .upload(filePath, file);

      return filePath;
    });

    const paths = await Promise.all(uploadPromises);
    return {
      data: paths,
      error: null
    };
  }
};

// API functions for events
export const eventsAPI = {
  // Fetch all events
  async getEvents(filters?: { category?: string; upcoming?: boolean }) {
    // TODO: Replace with actual Supabase query
    // const { data, error } = await supabaseClient
    //   .from('events')
    //   .select('*')
    //   .order('date', { ascending: true });

    console.log('Fetching events with filters:', filters);
    return {
      data: [],
      error: null
    };
  },

  // Create new event
  async createEvent(event: Partial<Event>) {
    // TODO: Replace with actual Supabase insert
    // const { data, error } = await supabaseClient
    //   .from('events')
    //   .insert([event])
    //   .select();

    console.log('Creating event:', event);
    return {
      data: event,
      error: null
    };
  },

  // Join event
  async joinEvent(eventId: string, userId: string) {
    // TODO: Implement with Supabase
    console.log('User joining event:', { eventId, userId });
    return {
      data: { success: true },
      error: null
    };
  }
};

// API functions for housing
export const housingAPI = {
  // Fetch all housing listings
  async getHousing(filters?: {
    type?: 'partner' | 'apartment';
    phase?: string;
    priceRange?: [number, number];
  }) {
    // TODO: Replace with actual Supabase query
    // const { data, error } = await supabaseClient
    //   .from('housing')
    //   .select('*')
    //   .order('created_at', { ascending: false });

    console.log('Fetching housing with filters:', filters);
    return {
      data: [],
      error: null
    };
  },

  // Create new housing listing
  async createHousing(housing: Partial<Housing>) {
    // TODO: Replace with actual Supabase insert
    // const { data, error } = await supabaseClient
    //   .from('housing')
    //   .insert([housing])
    //   .select();

    console.log('Creating housing listing:', housing);
    return {
      data: housing,
      error: null
    };
  }
};

// API helper functions for Supabase integration
const PROJECT_ID = 'faleomfptbprvtqcwvyd';
const PUBLIC_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhbGVvbWZwdGJwcnZ0cWN3dnlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyNTIwNDEsImV4cCI6MjA5MTgyODA0MX0.mIjk-iLppfF90jUaWwaH8ZX6NtGirdTyFH2CFjis0TM';

const BASE_URL = `https://${PROJECT_ID}.supabase.co/functions/v1/make-server-be23ac2a`;

// Helper function for API calls
async function apiCall<T>(
  endpoint: string,
  options?: RequestInit
): Promise<{ data: T | null; error: string | null }> {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${PUBLIC_ANON_KEY}`,
        ...options?.headers,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      return { data: null, error: result.error || 'Request failed' };
    }

    return { data: result.data, error: null };
  } catch (error) {
    console.error('API call error:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// ============= EVENTS API =============

export const eventsAPI = {
  async getAll() {
    return apiCall<any[]>('/events');
  },

  async getById(id: string) {
    return apiCall<any>(`/events/${id}`);
  },

  async create(event: any) {
    return apiCall<any>('/events', {
      method: 'POST',
      body: JSON.stringify(event),
    });
  },

  async join(id: string) {
    return apiCall<any>(`/events/${id}/join`, {
      method: 'POST',
    });
  },
};

// ============= HOUSING API =============

export const housingAPI = {
  async getAll() {
    return apiCall<any[]>('/housing');
  },

  async getById(id: string) {
    return apiCall<any>(`/housing/${id}`);
  },

  async create(housing: any) {
    return apiCall<any>('/housing', {
      method: 'POST',
      body: JSON.stringify(housing),
    });
  },
};

// ============= MARKETPLACE API =============

export const marketplaceAPI = {
  async getAll() {
    return apiCall<any[]>('/marketplace');
  },

  async create(listing: any) {
    return apiCall<any>('/marketplace', {
      method: 'POST',
      body: JSON.stringify(listing),
    });
  },
};

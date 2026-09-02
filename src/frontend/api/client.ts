import {
  Booking,
  BookingQueryParams,
  Customer,
  DashboardStats,
  Mechanic,
  PaginatedResponse,
  Service,
  ActivityFeedItem
} from '../../types/index';

const API_BASE = '/api';

async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers
    },
    ...options
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(errorData.message || errorData.error || `HTTP ${res.status}`);
  }

  return res.json();
}

export const api = {
  getHealth: () => fetchJson<{ status: string; app: string; timestamp: string }>(`${API_BASE}/health`),

  getDashboard: (timeframe: '7d' | '30d' | '90d' = '30d') =>
    fetchJson<DashboardStats>(`${API_BASE}/dashboard?timeframe=${timeframe}`),

  getAnalytics: (timeframe: '7d' | '30d' | '90d' = '30d') =>
    fetchJson<any>(`${API_BASE}/analytics?timeframe=${timeframe}`),

  getActivity: (limit = 20) =>
    fetchJson<{ data: ActivityFeedItem[]; total: number }>(`${API_BASE}/activity?limit=${limit}`),

  getBookings: (params: BookingQueryParams = {}) => {
    const query = new URLSearchParams();
    if (params.page) query.set('page', String(params.page));
    if (params.limit) query.set('limit', String(params.limit));
    if (params.search) query.set('search', params.search);
    if (params.status && params.status !== 'ALL') query.set('status', params.status);
    if (params.mechanicId && params.mechanicId !== 'ALL') query.set('mechanicId', params.mechanicId);
    if (params.serviceId && params.serviceId !== 'ALL') query.set('serviceId', params.serviceId);
    if (params.from) query.set('from', params.from);
    if (params.to) query.set('to', params.to);
    if (params.sortBy) query.set('sortBy', params.sortBy);
    if (params.sortOrder) query.set('sortOrder', params.sortOrder);

    return fetchJson<PaginatedResponse<Booking>>(`${API_BASE}/bookings?${query.toString()}`);
  },

  getBookingById: (id: string) => fetchJson<Booking>(`${API_BASE}/bookings/${id}`),

  createBooking: (payload: {
    customerId: string;
    vehicleId: string;
    serviceId: string;
    mechanicId?: string;
    scheduledAt: string;
    address: string;
    notes?: string;
  }) => fetchJson<Booking>(`${API_BASE}/bookings`, { method: 'POST', body: JSON.stringify(payload) }),

  updateBookingStatus: (id: string, status: string, note?: string, mechanicId?: string) =>
    fetchJson<Booking>(`${API_BASE}/bookings/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, note, mechanicId })
    }),

  getMechanics: (params: { search?: string; status?: string; page?: number; limit?: number } = {}) => {
    const query = new URLSearchParams();
    if (params.search) query.set('search', params.search);
    if (params.status) query.set('status', params.status);
    if (params.page) query.set('page', String(params.page));
    if (params.limit) query.set('limit', String(params.limit));

    return fetchJson<PaginatedResponse<Mechanic>>(`${API_BASE}/mechanics?${query.toString()}`);
  },

  getMechanicById: (id: string) => fetchJson<Mechanic>(`${API_BASE}/mechanics/${id}`),

  getCustomers: (params: { search?: string; page?: number; limit?: number } = {}) => {
    const query = new URLSearchParams();
    if (params.search) query.set('search', params.search);
    if (params.page) query.set('page', String(params.page));
    if (params.limit) query.set('limit', String(params.limit));

    return fetchJson<PaginatedResponse<Customer>>(`${API_BASE}/customers?${query.toString()}`);
  },

  getCustomerById: (id: string) => fetchJson<Customer>(`${API_BASE}/customers/${id}`),

  getVehicles: () => fetchJson<{ data: any[]; total: number }>(`${API_BASE}/vehicles`),

  getServices: () => fetchJson<{ data: Service[]; total: number }>(`${API_BASE}/services`)
};

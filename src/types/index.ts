export type BookingStatus =
  | 'PENDING'
  | 'ASSIGNED'
  | 'MECHANIC_ON_THE_WAY'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED';

export type MechanicStatus = 'AVAILABLE' | 'BUSY' | 'ON_THE_WAY' | 'OFFLINE';

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  vehiclesCount?: number;
  bookingsCount?: number;
  completedBookingsCount?: number;
  totalSpent?: number;
  lastBookingDate?: string;
  vehicles?: Vehicle[];
}

export interface Vehicle {
  id: string;
  customerId: string;
  registrationNumber: string;
  make: string;
  model: string;
  year: number;
  vehicleType: string;
  createdAt: string;
  updatedAt: string;
  customer?: Customer;
}

export interface Mechanic {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: MechanicStatus;
  specialty: string;
  rating: number;
  jobsCompleted: number;
  createdAt: string;
  updatedAt: string;
  avatarUrl?: string;
  currentBookingId?: string;
  currentBooking?: Booking;
}

export interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  basePrice: number;
  estimatedDuration: string;
  createdAt: string;
  updatedAt: string;
  bookingCount?: number;
}

export interface BookingStatusHistory {
  id: string;
  bookingId: string;
  status: BookingStatus;
  note?: string | null;
  changedAt: string;
}

export interface Booking {
  id: string;
  bookingNumber: string;
  customerId: string;
  vehicleId: string;
  serviceId: string;
  mechanicId?: string | null;
  status: BookingStatus;
  amount: number;
  scheduledAt: string;
  address: string;
  notes?: string | null;
  createdAt: string;
  updatedAt: string;

  customer?: Customer;
  vehicle?: Vehicle;
  service?: Service;
  mechanic?: Mechanic | null;
  statusHistory?: BookingStatusHistory[];
}

export interface KpiCardData {
  id: string;
  label: string;
  value: string | number;
  trendPercentage: number;
  trendDirection: 'up' | 'down' | 'neutral';
  comparisonPeriod: string;
  formattedValue?: string;
  sparkline: number[];
}

export interface DashboardStats {
  kpis: {
    totalBookings: KpiCardData;
    todaysBookings: KpiCardData;
    completedBookings: KpiCardData;
    pendingBookings: KpiCardData;
    cancelledBookings: KpiCardData;
    totalRevenue: KpiCardData;
    activeMechanics: KpiCardData;
    newCustomers: KpiCardData;
  };
  statusDistribution: Array<{
    status: BookingStatus;
    label: string;
    count: number;
    color: string;
  }>;
  serviceBreakdown: Array<{
    category: string;
    count: number;
    revenue: number;
  }>;
  bookingsOverTime: Array<{
    date: string;
    bookings: number;
  }>;
  revenueOverTime: Array<{
    date: string;
    revenue: number;
  }>;
}

export interface ActivityFeedItem {
  id: string;
  type: 'STATUS_CHANGE' | 'NEW_BOOKING' | 'MECHANIC_ASSIGNED' | 'CUSTOMER_REGISTERED';
  title: string;
  description: string;
  bookingNumber?: string;
  bookingId?: string;
  entityName?: string;
  status?: BookingStatus;
  timestamp: string;
  timeAgo: string;
}

export interface PaginatedMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginatedMeta;
}

export interface BookingQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  mechanicId?: string;
  serviceId?: string;
  from?: string;
  to?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

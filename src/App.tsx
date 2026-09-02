import React, { useState, useEffect, useCallback } from 'react';
import { useTheme } from './frontend/hooks/useTheme.js';
import { useLivePolling } from './frontend/hooks/useLivePolling.js';
import { api } from './frontend/api/client.js';
import {
  Booking,
  BookingQueryParams,
  Customer,
  Mechanic,
  Service,
  ActivityFeedItem
} from './types/index.js';
import { Sidebar } from './frontend/components/layout/Sidebar.js';
import { Header } from './frontend/components/layout/Header.js';
import { KpiCards } from './frontend/components/dashboard/KpiCards.js';
import { AnalyticsCharts } from './frontend/components/dashboard/AnalyticsCharts.js';
import { RecentActivity } from './frontend/components/dashboard/RecentActivity.js';
import { BookingsTable } from './frontend/components/bookings/BookingsTable.js';
import { BookingDetailModal } from './frontend/components/bookings/BookingDetailModal.js';
import { CreateBookingModal } from './frontend/components/bookings/CreateBookingModal.js';
import { MechanicsList } from './frontend/components/mechanics/MechanicsList.js';
import { CustomersList } from './frontend/components/customers/CustomersList.js';
import { ServicesCatalog } from './frontend/components/services/ServicesCatalog.js';
import { SettingsView } from './frontend/components/settings/SettingsView.js';
import { ApiDocsModal } from './frontend/components/docs/ApiDocsModal.js';
import { Toast } from './frontend/components/ui/Toast.js';

export function App() {
  const { theme, toggleTheme, isDark } = useTheme();

  // Navigation State
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Global Search State
  const [globalSearch, setGlobalSearch] = useState('');

  // Modals & Toast State
  const [apiDocsOpen, setApiDocsOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
  };

  // Timeframe for Analytics
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d'>('30d');

  // Live Polling Dashboard Hook
  const fetchDashboardData = useCallback(() => api.getDashboard(timeframe), [timeframe]);
  const {
    data: dashboardStats,
    loading: statsLoading,
    secondsAgo,
    refetch: refetchDashboard
  } = useLivePolling(fetchDashboardData, 12000);

  // Live Activity Feed
  const fetchActivityData = useCallback(() => api.getActivity(20), []);
  const {
    data: activityData,
    loading: activityLoading,
    refetch: refetchActivity
  } = useLivePolling(fetchActivityData, 12000);

  // Master Lists State
  const [mechanics, setMechanics] = useState<Mechanic[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [services, setServices] = useState<Service[]>([]);

  // Bookings Query State
  const [queryParams, setQueryParams] = useState<BookingQueryParams>({
    page: 1,
    limit: 20,
    status: 'ALL',
    sortBy: 'scheduledAt',
    sortOrder: 'desc'
  });

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [totalBookingsCount, setTotalBookingsCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [bookingsLoading, setBookingsLoading] = useState(true);

  // Sync Global Search to queryParams search
  useEffect(() => {
    if (globalSearch !== undefined) {
      setQueryParams((prev) => ({ ...prev, search: globalSearch, page: 1 }));
    }
  }, [globalSearch]);

  // Load Bookings list from REST API
  const loadBookings = useCallback(async () => {
    setBookingsLoading(true);
    try {
      const res = await api.getBookings(queryParams);
      setBookings(res.data);
      setTotalBookingsCount(res.pagination.total);
      setTotalPages(res.pagination.totalPages);
    } catch (err: any) {
      showToast(err.message || 'Failed to load bookings', 'error');
    } finally {
      setBookingsLoading(false);
    }
  }, [queryParams]);

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  // Load Metadata (Mechanics, Customers, Vehicles, Services)
  const loadMetadata = useCallback(async () => {
    try {
      const [mRes, cRes, vRes, sRes] = await Promise.all([
        api.getMechanics({ limit: 100 }),
        api.getCustomers({ limit: 100 }),
        api.getVehicles(),
        api.getServices()
      ]);
      setMechanics(mRes.data);
      setCustomers(cRes.data);
      setVehicles(vRes.data);
      setServices(sRes.data);
    } catch (err) {
      console.error('Metadata loading error:', err);
    }
  }, []);

  useEffect(() => {
    loadMetadata();
  }, [loadMetadata]);

  // Global Refresh Handler
  const handleRefreshAll = () => {
    refetchDashboard();
    refetchActivity();
    loadBookings();
    loadMetadata();
    showToast('Operations data refreshed from PostgreSQL database');
  };

  // Create Booking Handler
  const handleCreateBooking = async (payload: any) => {
    const newBooking = await api.createBooking(payload);
    showToast(`Booking ${newBooking.bookingNumber} created successfully!`);
    loadBookings();
    refetchDashboard();
    refetchActivity();
  };

  // Update Status Handler
  const handleUpdateStatus = async (id: string, status: string, note?: string, mechanicId?: string) => {
    try {
      const updated = await api.updateBookingStatus(id, status, note, mechanicId);
      setSelectedBooking(updated);
      showToast(`Status updated to ${status}`);
      loadBookings();
      refetchDashboard();
      refetchActivity();
    } catch (err: any) {
      showToast(err.message || 'Failed to update status', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased transition-colors duration-200">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
      />

      {/* Header Bar */}
      <Header
        sidebarCollapsed={sidebarCollapsed}
        onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
        onRefresh={handleRefreshAll}
        secondsAgo={secondsAgo}
        isDark={isDark}
        toggleTheme={toggleTheme}
        onOpenApiDocs={() => setApiDocsOpen(true)}
        globalSearch={globalSearch}
        setGlobalSearch={setGlobalSearch}
      />

      {/* Main Content Area */}
      <main
        className={`pt-20 pb-12 px-4 sm:px-6 lg:px-8 transition-all duration-200 ${
          sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-68'
        }`}
      >
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Overview Dashboard Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                    Live Operations Command Center
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Real-time metrics, fleet workloads, and field bookings calculated live from PostgreSQL
                  </p>
                </div>
              </div>

              {/* 8 KPI Cards */}
              <KpiCards stats={dashboardStats} loading={statsLoading} />

              {/* 4 Analytics Charts */}
              <AnalyticsCharts
                stats={dashboardStats}
                timeframe={timeframe}
                setTimeframe={setTimeframe}
                loading={statsLoading}
              />

              {/* Live Operations Activity Stream */}
              <RecentActivity activities={activityData?.data || []} loading={activityLoading} />
            </div>
          )}

          {/* Bookings Management Tab */}
          {activeTab === 'bookings' && (
            <div className="animate-in fade-in duration-200">
              <BookingsTable
                bookings={bookings}
                total={totalBookingsCount}
                totalPages={totalPages}
                queryParams={queryParams}
                setQueryParams={setQueryParams}
                loading={bookingsLoading}
                services={services}
                mechanics={mechanics}
                onSelectBooking={(b) => {
                  setSelectedBooking(b);
                  setDetailModalOpen(true);
                }}
                onCreateNew={() => setCreateModalOpen(true)}
                onQuickStatusChange={(id, status) => handleUpdateStatus(id, status)}
              />
            </div>
          )}

          {/* Mechanics Tab */}
          {activeTab === 'mechanics' && (
            <div className="animate-in fade-in duration-200">
              <MechanicsList mechanics={mechanics} loading={false} />
            </div>
          )}

          {/* Customers Tab */}
          {activeTab === 'customers' && (
            <div className="animate-in fade-in duration-200">
              <CustomersList customers={customers} loading={false} />
            </div>
          )}

          {/* Analytics Detail Tab */}
          {activeTab === 'analytics' && (
            <div className="animate-in fade-in duration-200 space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                    Full Analytics & Business Intelligence
                  </h1>
                  <p className="text-xs text-slate-500">In-depth revenue trends and service distribution</p>
                </div>
              </div>
              <AnalyticsCharts
                stats={dashboardStats}
                timeframe={timeframe}
                setTimeframe={setTimeframe}
                loading={statsLoading}
              />
            </div>
          )}

          {/* Services Catalog Tab */}
          {activeTab === 'services' && (
            <div className="animate-in fade-in duration-200">
              <ServicesCatalog services={services} loading={false} />
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="animate-in fade-in duration-200">
              <SettingsView onRefresh={handleRefreshAll} showToast={showToast} />
            </div>
          )}
        </div>
      </main>

      {/* Modals */}
      <ApiDocsModal isOpen={apiDocsOpen} onClose={() => setApiDocsOpen(false)} />

      <CreateBookingModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        customers={customers}
        vehicles={vehicles}
        services={services}
        mechanics={mechanics}
        onCreate={handleCreateBooking}
      />

      <BookingDetailModal
        booking={selectedBooking}
        isOpen={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        mechanics={mechanics}
        onUpdateStatus={handleUpdateStatus}
      />

      {/* Toast Notification */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

export default App;

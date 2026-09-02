import React, { useState } from 'react';
import { Booking, BookingQueryParams, Service, Mechanic } from '../../../types/index.js';
import { StatusBadge } from '../ui/Badge.js';
import { Button } from '../ui/Button.js';
import { Input } from '../ui/Input.js';
import { Select } from '../ui/Select.js';
import { TableSkeleton } from '../ui/Skeleton.js';
import {
  Search,
  Filter,
  Plus,
  ChevronLeft,
  ChevronRight,
  Eye,
  Calendar,
  Wrench,
  User,
  Car,
  CheckSquare,
  Square,
  ArrowUpDown
} from 'lucide-react';

interface BookingsTableProps {
  bookings: Booking[];
  total: number;
  totalPages: number;
  queryParams: BookingQueryParams;
  setQueryParams: React.Dispatch<React.SetStateAction<BookingQueryParams>>;
  loading: boolean;
  services: Service[];
  mechanics: Mechanic[];
  onSelectBooking: (booking: Booking) => void;
  onCreateNew: () => void;
  onQuickStatusChange: (id: string, status: string) => void;
}

export function BookingsTable({
  bookings,
  total,
  totalPages,
  queryParams,
  setQueryParams,
  loading,
  services,
  mechanics,
  onSelectBooking,
  onCreateNew,
  onQuickStatusChange
}: BookingsTableProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const statusTabs = [
    { id: 'ALL', label: 'All Bookings' },
    { id: 'PENDING', label: 'Pending' },
    { id: 'ASSIGNED', label: 'Assigned' },
    { id: 'MECHANIC_ON_THE_WAY', label: 'On The Way' },
    { id: 'IN_PROGRESS', label: 'In Progress' },
    { id: 'COMPLETED', label: 'Completed' },
    { id: 'CANCELLED', label: 'Cancelled' }
  ];

  const handleSelectAll = () => {
    if (selectedIds.length === bookings.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(bookings.map((b) => b.id));
    }
  };

  const toggleSelectRow = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const handleSort = (field: string) => {
    setQueryParams((prev) => ({
      ...prev,
      sortBy: field,
      sortOrder: prev.sortBy === field && prev.sortOrder === 'asc' ? 'desc' : 'asc'
    }));
  };

  return (
    <div className="space-y-4">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Bookings Operations Management
          </h2>
          <p className="text-xs text-slate-500">
            {total.toLocaleString('en-IN')} total service bookings in database
          </p>
        </div>
        <div className="flex items-center gap-2">
          {selectedIds.length > 0 && (
            <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200 text-xs font-semibold text-blue-700">
              <span>{selectedIds.length} Selected</span>
              <button
                onClick={() => setSelectedIds([])}
                className="hover:underline text-blue-500 text-[11px]"
              >
                Clear
              </button>
            </div>
          )}
          <Button onClick={onCreateNew} icon={<Plus className="w-4 h-4" />}>
            Create New Booking
          </Button>
        </div>
      </div>

      {/* Filter Tabs Bar */}
      <div className="flex items-center gap-1 overflow-x-auto pb-2 border-b border-slate-200">
        {statusTabs.map((tab) => {
          const isActive = (queryParams.status || 'ALL') === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setQueryParams((prev) => ({ ...prev, status: tab.id, page: 1 }))}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Search & Secondary Filters Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-2xs">
        <Input
          placeholder="Search booking #, customer, reg..."
          value={queryParams.search || ''}
          onChange={(e) => setQueryParams((prev) => ({ ...prev, search: e.target.value, page: 1 }))}
          icon={<Search className="w-4 h-4" />}
        />

        <Select
          value={queryParams.serviceId || 'ALL'}
          onChange={(e) => setQueryParams((prev) => ({ ...prev, serviceId: e.target.value, page: 1 }))}
          options={[
            { value: 'ALL', label: 'All Services' },
            ...services.map((s) => ({ value: s.id, label: s.name }))
          ]}
        />

        <Select
          value={queryParams.mechanicId || 'ALL'}
          onChange={(e) => setQueryParams((prev) => ({ ...prev, mechanicId: e.target.value, page: 1 }))}
          options={[
            { value: 'ALL', label: 'All Mechanics' },
            ...mechanics.map((m) => ({ value: m.id, label: m.name }))
          ]}
        />

        <div className="flex items-center gap-2">
          <Input
            type="date"
            value={queryParams.from || ''}
            onChange={(e) => setQueryParams((prev) => ({ ...prev, from: e.target.value, page: 1 }))}
            placeholder="From"
          />
          <Input
            type="date"
            value={queryParams.to || ''}
            onChange={(e) => setQueryParams((prev) => ({ ...prev, to: e.target.value, page: 1 }))}
            placeholder="To"
          />
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 overflow-hidden shadow-2xs">
        {loading ? (
          <TableSkeleton rows={8} cols={7} />
        ) : bookings.length === 0 ? (
          <div className="p-12 text-center">
            <Filter className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-sm font-semibold text-slate-800">No bookings found</h3>
            <p className="text-xs text-slate-500 mt-1">Try adjusting your filters or search terms</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="p-3.5 w-10 text-center">
                    <button onClick={handleSelectAll} className="hover:text-slate-800">
                      {selectedIds.length === bookings.length ? (
                        <CheckSquare className="w-4 h-4 text-blue-600" />
                      ) : (
                        <Square className="w-4 h-4" />
                      )}
                    </button>
                  </th>
                  <th className="p-3.5 cursor-pointer hover:text-slate-900" onClick={() => handleSort('bookingNumber')}>
                    <div className="flex items-center gap-1">
                      <span>Booking #</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="p-3.5">Customer</th>
                  <th className="p-3.5">Vehicle</th>
                  <th className="p-3.5">Service</th>
                  <th className="p-3.5">Assigned Mechanic</th>
                  <th className="p-3.5">Scheduled</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Amount</th>
                  <th className="p-3.5 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {bookings.map((b) => {
                  const isSelected = selectedIds.includes(b.id);
                  return (
                    <tr
                      key={b.id}
                      className={`hover:bg-slate-50 transition-colors ${
                        isSelected ? 'bg-blue-50/60' : ''
                      }`}
                    >
                      <td className="p-3.5 text-center">
                        <button onClick={() => toggleSelectRow(b.id)}>
                          {isSelected ? (
                            <CheckSquare className="w-4 h-4 text-blue-600" />
                          ) : (
                            <Square className="w-4 h-4 text-slate-400" />
                          )}
                        </button>
                      </td>
                      <td className="p-3.5 font-bold text-blue-600">{b.bookingNumber}</td>
                      <td className="p-3.5">
                        <div className="font-semibold text-slate-900">{b.customer?.name || (b as any).customerName || 'N/A'}</div>
                        <div className="text-[11px] text-slate-400">{b.customer?.phone || (b as any).customerPhone || ''}</div>
                      </td>
                      <td className="p-3.5">
                        <div className="font-medium text-slate-900">{b.vehicle ? `${b.vehicle.make} ${b.vehicle.model}` : (b as any).vehicleModel || 'N/A'}</div>
                        <div className="text-[10px] font-mono bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded inline-block">
                          {b.vehicle?.registrationNumber || (b as any).vehicleReg || ''}
                        </div>
                      </td>
                      <td className="p-3.5 font-medium">{b.service?.name || (b as any).serviceName || 'N/A'}</td>
                      <td className="p-3.5">
                        {(b.mechanic?.name || (b as any).mechanicName) ? (
                          <div className="flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                            <span className="font-medium text-slate-800">{b.mechanic?.name || (b as any).mechanicName}</span>
                          </div>
                        ) : (
                          <span className="text-amber-600 text-[11px] font-semibold italic">
                            Unassigned
                          </span>
                        )}
                      </td>
                      <td className="p-3.5 whitespace-nowrap text-slate-500">
                        {new Date(b.scheduledAt).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td className="p-3.5">
                        <StatusBadge status={b.status} size="sm" />
                      </td>
                      <td className="p-3.5 text-right font-semibold text-slate-900">
                        ₹{b.amount.toLocaleString('en-IN')}
                      </td>
                      <td className="p-3.5 text-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onSelectBooking(b)}
                          icon={<Eye className="w-3.5 h-3.5" />}
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Footer */}
        <div className="p-3.5 bg-slate-50/80 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="text-slate-500">
            Showing <span className="font-bold text-slate-900">{(queryParams.page! - 1) * queryParams.limit! + 1}</span> to{' '}
            <span className="font-bold text-slate-900">
              {Math.min(queryParams.page! * queryParams.limit!, total)}
            </span>{' '}
            of <span className="font-bold text-slate-900">{total}</span> bookings
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-slate-500">Per page:</span>
              <select
                value={queryParams.limit}
                onChange={(e) => setQueryParams((prev) => ({ ...prev, limit: Number(e.target.value), page: 1 }))}
                className="bg-white border border-slate-300 rounded px-2 py-1 text-xs"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>

            <div className="flex items-center gap-1">
              <button
                disabled={queryParams.page === 1}
                onClick={() => setQueryParams((prev) => ({ ...prev, page: prev.page! - 1 }))}
                className="p-1.5 rounded-lg border border-slate-200 disabled:opacity-40 hover:bg-slate-100"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-3 font-semibold text-slate-700">
                {queryParams.page} / {totalPages || 1}
              </span>
              <button
                disabled={queryParams.page! >= totalPages}
                onClick={() => setQueryParams((prev) => ({ ...prev, page: prev.page! + 1 }))}
                className="p-1.5 rounded-lg border border-slate-200 disabled:opacity-40 hover:bg-slate-100"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

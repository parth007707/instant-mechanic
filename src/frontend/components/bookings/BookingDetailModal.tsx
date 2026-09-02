import React, { useState } from 'react';
import { Booking, Mechanic, BookingStatus } from '../../../types/index.js';
import { Modal } from '../ui/Modal.js';
import { StatusBadge } from '../ui/Badge.js';
import { Button } from '../ui/Button.js';
import { Select } from '../ui/Select.js';
import { Input } from '../ui/Input.js';
import {
  User,
  Phone,
  Mail,
  MapPin,
  Car,
  Wrench,
  Calendar,
  IndianRupee,
  Clock,
  History,
  CheckCircle2,
  FileText
} from 'lucide-react';

interface BookingDetailModalProps {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
  mechanics: Mechanic[];
  onUpdateStatus: (id: string, status: string, note?: string, mechanicId?: string) => Promise<void>;
}

export function BookingDetailModal({
  booking,
  isOpen,
  onClose,
  mechanics,
  onUpdateStatus
}: BookingDetailModalProps) {
  if (!booking) return null;

  const [newStatus, setNewStatus] = useState<string>(booking.status);
  const [selectedMechanicId, setSelectedMechanicId] = useState<string>(booking.mechanicId || '');
  const [updateNote, setUpdateNote] = useState<string>('');
  const [updating, setUpdating] = useState(false);

  const handleStatusSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    try {
      await onUpdateStatus(booking.id, newStatus, updateNote, selectedMechanicId || undefined);
      setUpdateNote('');
    } finally {
      setUpdating(false);
    }
  };

  const statusOptions = [
    { value: 'PENDING', label: 'Pending' },
    { value: 'ASSIGNED', label: 'Assigned' },
    { value: 'MECHANIC_ON_THE_WAY', label: 'Mechanic On The Way' },
    { value: 'IN_PROGRESS', label: 'In Progress' },
    { value: 'COMPLETED', label: 'Completed' },
    { value: 'CANCELLED', label: 'Cancelled' }
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Booking Details — ${booking.bookingNumber}`} maxWidth="2xl">
      <div className="space-y-6">
        {/* Header Bar */}
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase">Current Status</span>
            <div className="mt-1">
              <StatusBadge status={booking.status} size="lg" />
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold text-slate-500 uppercase">Total Amount</span>
            <p className="text-xl font-bold text-slate-900">
              ₹{booking.amount.toLocaleString('en-IN')}
            </p>
          </div>
        </div>

        {/* 2-Column Grid Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Customer & Address */}
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-blue-500" /> Customer Information
            </h4>
            <div>
              <p className="text-sm font-bold text-slate-900">{booking.customer?.name || (booking as any).customerName || 'N/A'}</p>
              <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                <Phone className="w-3 h-3 text-slate-400" /> {booking.customer?.phone || (booking as any).customerPhone || ''}
              </p>
              {(booking.customer?.email || (booking as any).customerEmail) && (
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <Mail className="w-3 h-3 text-slate-400" /> {booking.customer?.email || (booking as any).customerEmail}
                </p>
              )}
            </div>

            <div className="pt-2 border-t border-slate-100">
              <p className="text-xs font-semibold text-slate-500">Service Address</p>
              <p className="text-xs text-slate-700 mt-0.5 flex items-start gap-1">
                <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                {booking.address}
              </p>
            </div>
          </div>

          {/* Vehicle & Service */}
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Car className="w-3.5 h-3.5 text-blue-500" /> Vehicle & Service
            </h4>
            <div>
              <p className="text-sm font-bold text-slate-900">{booking.vehicle ? `${booking.vehicle.make} ${booking.vehicle.model}` : (booking as any).vehicleModel || 'N/A'}</p>
              <p className="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded inline-block mt-1">
                {booking.vehicle?.registrationNumber || (booking as any).vehicleReg || ''}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <p className="text-xs font-semibold text-slate-500">Service Required</p>
              <p className="text-xs font-medium text-slate-900 mt-0.5">{booking.service?.name || (booking as any).serviceName || 'N/A'}</p>
              <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" /> Scheduled for:{' '}
                {new Date(booking.scheduledAt).toLocaleString('en-IN')}
              </p>
            </div>
          </div>
        </div>

        {/* Update Status Form */}
        <form onSubmit={handleStatusSubmit} className="p-4 bg-blue-50/60 border border-blue-200 rounded-xl space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-blue-700 flex items-center gap-1.5">
            <Wrench className="w-3.5 h-3.5" /> Operations Status & Mechanic Management
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Select
              label="Update Booking Status"
              options={statusOptions}
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            />

            <Select
              label="Assign Mechanic"
              options={[
                { value: '', label: '-- Unassigned --' },
                ...mechanics.map((m) => ({ value: m.id, label: `${m.name} (${m.status})` }))
              ]}
              value={selectedMechanicId}
              onChange={(e) => setSelectedMechanicId(e.target.value)}
            />
          </div>

          <Input
            label="Status Update Note / Log"
            placeholder="e.g. Mechanic dispatched to location / Inspection completed"
            value={updateNote}
            onChange={(e) => setUpdateNote(e.target.value)}
          />

          <div className="flex justify-end">
            <Button type="submit" disabled={updating}>
              {updating ? 'Updating...' : 'Save Operations Status'}
            </Button>
          </div>
        </form>

        {/* Audit Timeline History */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <History className="w-3.5 h-3.5 text-blue-500" /> Complete Audit Trail Timeline
          </h4>

          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-4 max-h-48 overflow-y-auto">
            {booking.statusHistory && booking.statusHistory.length > 0 ? (
              booking.statusHistory.map((h, i) => (
                <div key={h.id || i} className="flex items-start gap-3 relative">
                  {i < booking.statusHistory!.length - 1 && (
                    <span className="absolute left-2.5 top-6 bottom-0 w-0.5 bg-slate-200" />
                  )}
                  <div className="h-5 w-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <StatusBadge status={h.status} size="sm" />
                      <span className="text-[10px] text-slate-400">
                        {new Date(h.changedAt || (h as any).timestamp).toLocaleString('en-IN')}
                      </span>
                    </div>
                    {h.note && <p className="text-xs text-slate-600 mt-1">{h.note}</p>}
                    <p className="text-[10px] text-slate-400 mt-0.5">Logged by {(h as any).changedBy || 'Operations Admin'}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 italic">No historical changes logged yet.</p>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}

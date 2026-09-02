import React, { useState } from 'react';
import { Modal } from '../ui/Modal.js';
import { Button } from '../ui/Button.js';
import { Select } from '../ui/Select.js';
import { Input } from '../ui/Input.js';
import { Customer, Service, Mechanic } from '../../../types/index.js';

interface CreateBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  customers: Customer[];
  vehicles: any[];
  services: Service[];
  mechanics: Mechanic[];
  onCreate: (payload: {
    customerId: string;
    vehicleId: string;
    serviceId: string;
    mechanicId?: string;
    scheduledAt: string;
    address: string;
    notes?: string;
  }) => Promise<void>;
}

export function CreateBookingModal({
  isOpen,
  onClose,
  customers,
  vehicles,
  services,
  mechanics,
  onCreate
}: CreateBookingModalProps) {
  const [customerId, setCustomerId] = useState('');
  const [vehicleId, setVehicleId] = useState('');
  const [serviceId, setServiceId] = useState('');
  const [mechanicId, setMechanicId] = useState('');
  const [scheduledAt, setScheduledAt] = useState(new Date().toISOString().slice(0, 16));
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Filter vehicles by selected customer
  const filteredVehicles = customerId
    ? vehicles.filter((v) => v.customerId === customerId)
    : vehicles;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerId || !vehicleId || !serviceId || !scheduledAt || !address) {
      setError('Please fill in all required fields');
      return;
    }

    setSubmitting(true);
    setError('');
    try {
      await onCreate({
        customerId,
        vehicleId,
        serviceId,
        mechanicId: mechanicId || undefined,
        scheduledAt: new Date(scheduledAt).toISOString(),
        address,
        notes: notes || undefined
      });
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to create booking');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Service Booking" maxWidth="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg font-medium">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Customer *"
            options={[
              { value: '', label: '-- Select Customer --' },
              ...customers.map((c) => ({ value: c.id, label: `${c.name} (${c.phone})` }))
            ]}
            value={customerId}
            onChange={(e) => {
              setCustomerId(e.target.value);
              setVehicleId('');
            }}
          />

          <Select
            label="Vehicle *"
            options={[
              { value: '', label: '-- Select Vehicle --' },
              ...filteredVehicles.map((v) => ({ value: v.id, label: `${v.make} ${v.model} (${v.registrationNumber})` }))
            ]}
            value={vehicleId}
            onChange={(e) => setVehicleId(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Service *"
            options={[
              { value: '', label: '-- Select Service --' },
              ...services.map((s) => ({ value: s.id, label: `${s.name} (₹${(s.basePrice || (s as any).price || 0).toLocaleString('en-IN')})` }))
            ]}
            value={serviceId}
            onChange={(e) => setServiceId(e.target.value)}
          />

          <Select
            label="Assign Mechanic (Optional)"
            options={[
              { value: '', label: '-- Unassigned --' },
              ...mechanics.map((m) => ({ value: m.id, label: `${m.name} (${m.status})` }))
            ]}
            value={mechanicId}
            onChange={(e) => setMechanicId(e.target.value)}
          />
        </div>

        <Input
          label="Scheduled Date & Time *"
          type="datetime-local"
          value={scheduledAt}
          onChange={(e) => setScheduledAt(e.target.value)}
        />

        <Input
          label="Service Address *"
          placeholder="Enter complete door-step service address with landmark"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <Input
          label="Special Instructions / Customer Notes"
          placeholder="e.g. Engine noise during cold start, check brake pads"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
          <Button variant="outline" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={submitting}>
            {submitting ? 'Creating Booking...' : 'Create Booking'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

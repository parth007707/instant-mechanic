import React, { useState } from 'react';
import { Customer } from '../../../types/index.js';
import { Card, CardContent } from '../ui/Card.js';
import { Input } from '../ui/Input.js';
import { Users, Phone, Mail, MapPin, Search, CalendarCheck, IndianRupee } from 'lucide-react';

interface CustomersListProps {
  customers: Customer[];
  loading: boolean;
}

export function CustomersList({ customers, loading }: CustomersListProps) {
  const [search, setSearch] = useState('');

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      (c.email && c.email.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Customer Directory & LTV Analytics
          </h2>
          <p className="text-xs text-slate-500">
            50+ registered car owners with total bookings and spending metrics
          </p>
        </div>
      </div>

      <div className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-2xs">
        <Input
          placeholder="Search customer name, phone, email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          icon={<Search className="w-4 h-4" />}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((c) => (
          <Card key={c.id} hoverable>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm shrink-0">
                  {c.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-bold text-slate-900 truncate">{c.name}</h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <Phone className="w-3 h-3 text-slate-400" /> {c.phone}
                  </p>
                </div>
              </div>

              {(c as any).address && (
                <p className="text-xs text-slate-500 flex items-start gap-1 truncate">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  {(c as any).address}
                </p>
              )}

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                <div className="bg-slate-50 p-2 rounded-lg text-center">
                  <p className="text-[10px] text-slate-500 uppercase font-semibold">Total Bookings</p>
                  <p className="text-sm font-bold text-slate-900 mt-0.5">{c.bookingsCount || (c as any).totalBookings || 0}</p>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg text-center">
                  <p className="text-[10px] text-slate-500 uppercase font-semibold">Total Spent</p>
                  <p className="text-sm font-bold text-emerald-600 mt-0.5">
                    ₹{(c.totalSpent || 0).toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

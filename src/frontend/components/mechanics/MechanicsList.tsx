import React, { useState } from 'react';
import { Mechanic } from '../../../types/index.js';
import { StatusBadge } from '../ui/Badge.js';
import { Card, CardContent } from '../ui/Card.js';
import { Input } from '../ui/Input.js';
import { Select } from '../ui/Select.js';
import { Wrench, Phone, Star, CheckCircle2, Search, Award } from 'lucide-react';

interface MechanicsListProps {
  mechanics: Mechanic[];
  loading: boolean;
}

export function MechanicsList({ mechanics, loading }: MechanicsListProps) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filtered = mechanics.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.specialty.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || m.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Mechanic Fleet Operations
          </h2>
          <p className="text-xs text-slate-500">
            Real-time status, ratings, and workload across 20+ field mechanics
          </p>
        </div>
      </div>

      {/* Filter controls */}
      <div className="flex flex-col sm:flex-row gap-3 bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-2xs">
        <div className="flex-1">
          <Input
            placeholder="Search mechanic name, specialty..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={<Search className="w-4 h-4" />}
          />
        </div>
        <div className="w-full sm:w-48">
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={[
              { value: 'ALL', label: 'All Statuses' },
              { value: 'AVAILABLE', label: 'Available' },
              { value: 'BUSY', label: 'Busy' },
              { value: 'ON_THE_WAY', label: 'On The Way' },
              { value: 'OFFLINE', label: 'Offline' }
            ]}
          />
        </div>
      </div>

      {/* Grid of Mechanic Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((m) => (
          <Card key={m.id} hoverable>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm shrink-0">
                    {m.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{m.name}</h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <Wrench className="w-3 h-3 text-slate-400" /> {m.specialty}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <StatusBadge status={m.status} size="sm" />
                <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{m.rating.toFixed(1)}</span>
                </div>
              </div>

              <div className="bg-slate-50 p-2.5 rounded-lg flex items-center justify-between text-xs text-slate-600">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Jobs Completed
                </span>
                <span className="font-bold text-slate-900">{m.jobsCompleted}</span>
              </div>

              <div className="flex items-center gap-1 text-xs text-slate-500 pt-1">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>{m.phone}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

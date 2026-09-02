import React from 'react';
import { Service } from '../../../types/index.js';
import { Card, CardContent } from '../ui/Card.js';
import { Layers, Clock, IndianRupee, CheckCircle2 } from 'lucide-react';

interface ServicesCatalogProps {
  services: Service[];
  loading: boolean;
}

export function ServicesCatalog({ services, loading }: ServicesCatalogProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          Automotive Service Catalog
        </h2>
        <p className="text-xs text-slate-500">
          Standardized door-step repair services, pricing, and estimated durations
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {services.map((s) => (
          <Card key={s.id} hoverable>
            <CardContent className="p-5 space-y-3 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-start justify-between">
                  <span className="p-2 rounded-xl bg-blue-50 text-blue-600">
                    <Layers className="w-5 h-5" />
                  </span>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                    ₹{(s.basePrice || (s as any).price || 0).toLocaleString('en-IN')}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mt-3">{s.name}</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{s.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1 font-medium">
                  <Clock className="w-3.5 h-3.5 text-slate-400" /> {s.estimatedDuration || (s as any).estimatedDurationHours || '1-2 hours'}
                </span>
                <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Active
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

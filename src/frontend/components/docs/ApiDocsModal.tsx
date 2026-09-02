import React from 'react';
import { Modal } from '../ui/Modal.js';
import { ExternalLink, Code2, Server, Database } from 'lucide-react';

interface ApiDocsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ApiDocsModal({ isOpen, onClose }: ApiDocsModalProps) {
  const endpoints = [
    { method: 'GET', path: '/api/health', desc: 'Backend service health check' },
    { method: 'GET', path: '/api/dashboard', desc: 'Calculated real-time KPI metrics & chart data from PostgreSQL' },
    { method: 'GET', path: '/api/bookings', desc: 'Server-side paginated, searchable & filtered vehicle bookings' },
    { method: 'GET', path: '/api/bookings/:id', desc: 'Single booking details with full status timeline history' },
    { method: 'POST', path: '/api/bookings', desc: 'Create a new vehicle service booking' },
    { method: 'PATCH', path: '/api/bookings/:id/status', desc: 'Update booking status & record timeline entry' },
    { method: 'GET', path: '/api/mechanics', desc: 'Mechanics roster with live status & completed jobs count' },
    { method: 'GET', path: '/api/customers', desc: 'Customer registry with booking counts & total revenue spent' },
    { method: 'GET', path: '/api/services', desc: 'Catalog of 8 automotive repair & periodic maintenance services' },
    { method: 'GET', path: '/api/activity', desc: 'Live operational activity stream generated from database events' }
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="REST API Documentation & OpenAPI Specification" maxWidth="2xl">
      <div className="space-y-6">
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <Server className="w-4 h-4 text-blue-600" />
              Interactive Swagger UI
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              Full OpenAPI 3.0 specification available at <code className="bg-slate-200 px-1.5 py-0.5 rounded text-slate-800">/api/docs</code>
            </p>
          </div>
          <a
            href="/api/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors"
          >
            <span>Open Swagger UI</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
            <Code2 className="w-4 h-4 text-blue-500" />
            Core Operations REST Endpoints
          </h4>
          <div className="space-y-2">
            {endpoints.map((ep, i) => (
              <div
                key={i}
                className="p-3 bg-white border border-slate-200 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 shadow-2xs"
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded uppercase ${
                      ep.method === 'GET'
                        ? 'bg-blue-100 text-blue-700'
                        : ep.method === 'POST'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}
                  >
                    {ep.method}
                  </span>
                  <code className="text-xs font-semibold text-slate-900">{ep.path}</code>
                </div>
                <span className="text-xs text-slate-500">{ep.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}

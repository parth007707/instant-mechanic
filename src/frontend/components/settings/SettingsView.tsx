import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card.js';
import { Button } from '../ui/Button.js';
import { Input } from '../ui/Input.js';
import { Database, Server, Settings, RefreshCw, ShieldCheck, BellRing, Sliders } from 'lucide-react';

interface SettingsViewProps {
  onRefresh: () => void;
  showToast: (msg: string, type?: 'success' | 'error') => void;
}

export function SettingsView({ onRefresh, showToast }: SettingsViewProps) {
  const [autoAssign, setAutoAssign] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState('12');

  const handleSave = () => {
    showToast('Operations settings saved successfully!');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          Operations & System Settings
        </h2>
        <p className="text-xs text-slate-500">
          Configure real-time dashboard behavior, database engine, and API integration
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Real-time & Dashboard Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-blue-600" />
              Live Operations Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
              <div>
                <p className="text-xs font-bold text-slate-900">Auto-Assign Nearby Mechanics</p>
                <p className="text-[11px] text-slate-500">Automatically match PENDING bookings with available field mechanics</p>
              </div>
              <input
                type="checkbox"
                checked={autoAssign}
                onChange={(e) => setAutoAssign(e.target.checked)}
                className="h-4 w-4 text-blue-600 rounded"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">
                Dashboard Auto-Poll Interval (seconds)
              </label>
              <input
                type="range"
                min="5"
                max="60"
                step="5"
                value={refreshInterval}
                onChange={(e) => setRefreshInterval(e.target.value)}
                className="w-full"
              />
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>5s (High frequency)</span>
                <span className="font-bold text-blue-600">{refreshInterval} seconds</span>
                <span>60s</span>
              </div>
            </div>

            <Button onClick={handleSave} className="w-full">
              Save Dashboard Preferences
            </Button>
          </CardContent>
        </Card>

        {/* Database & Infrastructure Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-600" />
              PostgreSQL Engine & Infrastructure Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-slate-50 rounded-lg space-y-2 text-xs border border-slate-100">
              <div className="flex justify-between">
                <span className="text-slate-500">Database Engine:</span>
                <span className="font-bold text-slate-900">PostgreSQL (PGlite WASM)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">ORM Layer:</span>
                <span className="font-bold text-slate-900">Prisma Client</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Seeded Records:</span>
                <span className="font-bold text-emerald-600">500+ Bookings, 50+ Customers</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">REST API Framework:</span>
                <span className="font-bold text-slate-900">Node.js Express + TypeScript</span>
              </div>
            </div>

            <Button variant="outline" onClick={onRefresh} icon={<RefreshCw className="w-4 h-4" />} className="w-full">
              Force Re-sync PostgreSQL State
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

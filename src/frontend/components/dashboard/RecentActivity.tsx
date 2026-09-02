import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card.js';
import { ActivityFeedItem } from '../../../types/index.js';
import { StatusBadge } from '../ui/Badge.js';
import { Activity, Clock, Wrench, UserCheck } from 'lucide-react';

interface RecentActivityProps {
  activities: ActivityFeedItem[];
  loading: boolean;
}

export function RecentActivity({ activities, loading }: RecentActivityProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Live Operations Stream</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-12 bg-slate-100 rounded-lg animate-pulse" />
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-600" />
            Live Operations Stream
          </CardTitle>
          <p className="text-xs text-slate-500">Real-time status changes & assignments feed</p>
        </div>
        <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full uppercase">
          {activities.length} EVENTS
        </span>
      </CardHeader>
      <CardContent className="p-0 divide-y divide-slate-100 max-h-96 overflow-y-auto">
        {activities.map((item) => (
          <div
            key={item.id}
            className="p-4 hover:bg-slate-50 transition-colors flex items-start gap-3"
          >
            <div className="p-2 rounded-xl bg-slate-100 text-slate-600 shrink-0 mt-0.5">
              {item.type === 'STATUS_CHANGE' ? (
                <Clock className="w-4 h-4 text-blue-500" />
              ) : ((item.type as any) === 'ASSIGNMENT' || item.type === 'MECHANIC_ASSIGNED') ? (
                <Wrench className="w-4 h-4 text-purple-500" />
              ) : (
                <UserCheck className="w-4 h-4 text-emerald-500" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-slate-900">
                  {item.bookingNumber}
                </span>
                <span className="text-[11px] text-slate-400">
                  {new Date(item.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5 truncate">{item.description}</p>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-[11px] text-slate-500 font-medium">{item.entityName || (item as any).customerName || ''}</span>
                {item.status && (
                  <>
                    <span className="text-slate-300">•</span>
                    <StatusBadge status={item.status} size="sm" />
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

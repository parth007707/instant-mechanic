import React from 'react';
import { Card, CardContent } from '../ui/Card.js';
import { CardSkeleton } from '../ui/Skeleton.js';
import { DashboardStats } from '../../../types/index.js';
import {
  CalendarCheck,
  Calendar,
  CheckCircle2,
  Clock,
  XCircle,
  IndianRupee,
  Wrench,
  UserPlus,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

interface KpiCardsProps {
  stats: DashboardStats | null;
  loading: boolean;
}

export function KpiCards({ stats, loading }: KpiCardsProps) {
  if (loading || !stats) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  const kpiList = [
    {
      data: stats.kpis.totalBookings,
      icon: CalendarCheck,
      color: 'text-blue-600 bg-blue-50/80 border border-blue-100'
    },
    {
      data: stats.kpis.todaysBookings,
      icon: Calendar,
      color: 'text-indigo-600 bg-indigo-50/80 border border-indigo-100'
    },
    {
      data: stats.kpis.completedBookings,
      icon: CheckCircle2,
      color: 'text-emerald-600 bg-emerald-50/80 border border-emerald-100'
    },
    {
      data: stats.kpis.pendingBookings,
      icon: Clock,
      color: 'text-amber-600 bg-amber-50/80 border border-amber-100'
    },
    {
      data: stats.kpis.cancelledBookings,
      icon: XCircle,
      color: 'text-rose-600 bg-rose-50/80 border border-rose-100'
    },
    {
      data: stats.kpis.totalRevenue,
      icon: IndianRupee,
      color: 'text-emerald-600 bg-emerald-50/80 border border-emerald-100'
    },
    {
      data: stats.kpis.activeMechanics,
      icon: Wrench,
      color: 'text-sky-600 bg-sky-50/80 border border-sky-100'
    },
    {
      data: stats.kpis.newCustomers,
      icon: UserPlus,
      color: 'text-purple-600 bg-purple-50/80 border border-purple-100'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpiList.map((item) => {
        const Icon = item.icon;
        const d = item.data;
        const isPositive = d.trendPercentage >= 0;

        // Render mini SVG sparkline
        const maxSpark = Math.max(...d.sparkline, 1);
        const minSpark = Math.min(...d.sparkline);
        const points = d.sparkline
          .map((val, idx) => {
            const x = (idx / (d.sparkline.length - 1)) * 60;
            const y = 20 - ((val - minSpark) / (maxSpark - minSpark || 1)) * 16;
            return `${x},${y}`;
          })
          .join(' ');

        return (
          <Card key={d.id} className="relative overflow-hidden group hover:border-blue-300 transition-all shadow-2xs">
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500 tracking-wide uppercase">
                    {d.label}
                  </p>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 tracking-tight">
                    {d.formattedValue || (typeof d.value === 'number' ? d.value.toLocaleString('en-IN') : d.value)}
                  </h3>
                </div>
                <div className={`p-2.5 rounded-xl ${item.color} shrink-0`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs">
                  <span
                    className={`inline-flex items-center gap-0.5 font-bold ${
                      isPositive ? 'text-emerald-600' : 'text-rose-600'
                    }`}
                  >
                    {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                    {isPositive ? '+' : ''}
                    {d.trendPercentage}%
                  </span>
                  <span className="text-slate-400 text-[11px] truncate">{d.comparisonPeriod}</span>
                </div>

                {/* Mini SVG Sparkline */}
                <svg className="w-16 h-6 overflow-visible shrink-0 opacity-70 group-hover:opacity-100 transition-opacity">
                  <polyline
                    fill="none"
                    stroke={isPositive ? '#10b981' : '#ef4444'}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={points}
                  />
                </svg>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

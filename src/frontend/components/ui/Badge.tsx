import React from 'react';
import { BookingStatus, MechanicStatus } from '../../../types/index.js';

export interface StatusBadgeProps {
  status: BookingStatus | MechanicStatus | string;
  size?: 'sm' | 'md' | 'lg';
}

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  let bg = 'bg-slate-100 text-slate-700 border-slate-200';
  let dot = 'bg-slate-400';
  let label = status;

  switch (status) {
    case 'PENDING':
      bg = 'bg-amber-50 text-amber-800 border-amber-200';
      dot = 'bg-amber-500';
      label = 'Pending';
      break;
    case 'ASSIGNED':
      bg = 'bg-blue-50 text-blue-800 border-blue-200';
      dot = 'bg-blue-500';
      label = 'Assigned';
      break;
    case 'MECHANIC_ON_THE_WAY':
      bg = 'bg-purple-50 text-purple-800 border-purple-200';
      dot = 'bg-purple-500';
      label = 'Mechanic On The Way';
      break;
    case 'IN_PROGRESS':
      bg = 'bg-sky-50 text-sky-800 border-sky-200';
      dot = 'bg-sky-500';
      label = 'In Progress';
      break;
    case 'COMPLETED':
      bg = 'bg-emerald-50 text-emerald-800 border-emerald-200';
      dot = 'bg-emerald-500';
      label = 'Completed';
      break;
    case 'CANCELLED':
      bg = 'bg-rose-50 text-rose-800 border-rose-200';
      dot = 'bg-rose-500';
      label = 'Cancelled';
      break;
    case 'AVAILABLE':
      bg = 'bg-emerald-50 text-emerald-800 border-emerald-200';
      dot = 'bg-emerald-500';
      label = 'Available';
      break;
    case 'BUSY':
      bg = 'bg-amber-50 text-amber-800 border-amber-200';
      dot = 'bg-amber-500';
      label = 'Busy';
      break;
    case 'ON_THE_WAY':
      bg = 'bg-purple-50 text-purple-800 border-purple-200';
      dot = 'bg-purple-500';
      label = 'On The Way';
      break;
    case 'OFFLINE':
      bg = 'bg-slate-100 text-slate-600 border-slate-200';
      dot = 'bg-slate-400';
      label = 'Offline';
      break;
  }

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-medium',
    lg: 'text-sm px-3 py-1.5 gap-2 font-semibold'
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border whitespace-nowrap transition-colors ${bg} ${sizeClasses[size]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {label}
    </span>
  );
}

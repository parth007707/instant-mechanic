import React, { useState } from 'react';
import {
  Menu,
  Search,
  Bell,
  RefreshCw,
  Sun,
  Moon,
  FileCode2,
  User,
  CheckCircle,
  Clock
} from 'lucide-react';

interface HeaderProps {
  sidebarCollapsed: boolean;
  onOpenMobileSidebar: () => void;
  onRefresh: () => void;
  secondsAgo: number;
  isDark: boolean;
  toggleTheme: () => void;
  onOpenApiDocs: () => void;
  globalSearch: string;
  setGlobalSearch: (val: string) => void;
}

export function Header({
  sidebarCollapsed,
  onOpenMobileSidebar,
  onRefresh,
  secondsAgo,
  isDark,
  toggleTheme,
  onOpenApiDocs,
  globalSearch,
  setGlobalSearch
}: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: '1', title: 'Booking IM-10482 Assigned', time: '2 mins ago', unread: true },
    { id: '2', title: 'Mechanic Ramesh Became Available', time: '8 mins ago', unread: true },
    { id: '3', title: 'Booking IM-10479 Completed (₹4,499)', time: '15 mins ago', unread: false }
  ];

  return (
    <header
      className={`fixed top-0 right-0 z-20 h-16 bg-white border-b border-slate-200/90 transition-all duration-200 ${
        sidebarCollapsed ? 'lg:left-16' : 'lg:left-64'
      } left-0 px-4 sm:px-6 flex items-center justify-between gap-4 shadow-2xs`}
    >
      {/* Left: Mobile menu button & Global Search */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          onClick={onOpenMobileSidebar}
          className="p-2 text-slate-500 hover:text-slate-700 rounded-lg hover:bg-slate-100 lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            placeholder="Search booking ID, customer name, phone, reg number..."
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-1.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Right: Status indicators, Actions, User */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Live Indicator & Timer */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-xs font-medium text-emerald-800">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-bold tracking-wider text-[11px]">LIVE</span>
          <span className="text-slate-300">|</span>
          <span className="text-[11px] text-slate-600 flex items-center gap-1">
            <Clock className="w-3 h-3 text-slate-400" />
            Updated {secondsAgo}s ago
          </span>
        </div>

        {/* Refresh Button */}
        <button
          onClick={onRefresh}
          className="p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-all"
          title="Refresh Operations Data"
        >
          <RefreshCw className="w-4 h-4" />
        </button>

        {/* API Docs Button */}
        <button
          onClick={onOpenApiDocs}
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-200 transition-all"
        >
          <FileCode2 className="w-4 h-4 text-blue-600" />
          <span>API Docs</span>
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg relative transition-all"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-blue-600 rounded-full ring-2 ring-white" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-lg py-2 z-50 animate-in fade-in duration-150">
              <div className="px-4 py-2 border-b border-slate-100 flex justify-between items-center">
                <span className="text-xs font-semibold text-slate-900">Notifications</span>
                <span className="text-[10px] bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded-full">
                  2 NEW
                </span>
              </div>
              <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className="p-3 hover:bg-slate-50 transition-colors">
                    <p className="text-xs font-medium text-slate-800">{n.title}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{n.time}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar */}
        <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shadow-xs">
          OP
        </div>
      </div>
    </header>
  );
}

import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  error?: string;
  placeholder?: string;
  value?: any;
  onChange?: (e: any) => void;
  type?: string;
  className?: string;
}

export function Input({ label, icon, error, className = '', type = 'text', ...props }: InputProps) {
  return (
    <div className="w-full space-y-1">
      {label && <label className="block text-xs font-medium text-slate-700">{label}</label>}
      <div className="relative flex items-center">
        {icon && <div className="absolute left-3 text-slate-400 pointer-events-none">{icon}</div>}
        <input
          type={type}
          className={`w-full rounded-lg border border-slate-300 bg-white text-slate-900 text-sm px-3.5 py-2 transition-colors placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 ${
            icon ? 'pl-9' : ''
          } ${error ? 'border-rose-500 focus:ring-rose-500/20 focus:border-rose-600' : ''} ${className}`}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-rose-500 mt-1">{error}</p>}
    </div>
  );
}

import React from 'react';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Array<{ value: string; label: string }>;
  error?: string;
  value?: any;
  onChange?: (e: any) => void;
  className?: string;
}

export function Select({ label, options, error, className = '', ...props }: SelectProps) {
  return (
    <div className="w-full space-y-1">
      {label && <label className="block text-xs font-medium text-slate-700">{label}</label>}
      <select
        className={`w-full rounded-lg border border-slate-300 bg-white text-slate-900 text-sm px-3.5 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 ${
          error ? 'border-rose-500 focus:ring-rose-500/20 focus:border-rose-600' : ''
        } ${className}`}
        {...props}
      >
        {options.map((opt, idx) => (
          <option key={`${opt.value}-${idx}`} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-rose-500 mt-1">{error}</p>}
    </div>
  );
}

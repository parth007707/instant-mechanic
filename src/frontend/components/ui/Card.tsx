import React, { ReactNode } from 'react';

export interface CardProps {
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
  key?: React.Key;
}

export function Card({ children, className = '', onClick, hoverable = false }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-white border border-slate-200/90 rounded-xl shadow-2xs transition-all duration-150 overflow-hidden ${
        hoverable ? 'hover:shadow-md hover:border-slate-300 cursor-pointer' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }: { children?: ReactNode; className?: string }) {
  return <div className={`p-4 sm:p-5 border-b border-slate-100 ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = '' }: { children?: ReactNode; className?: string }) {
  return <h3 className={`text-base font-semibold text-slate-900 tracking-tight ${className}`}>{children}</h3>;
}

export function CardDescription({ children, className = '' }: { children?: ReactNode; className?: string }) {
  return <p className={`text-xs text-slate-500 mt-0.5 ${className}`}>{children}</p>;
}

export function CardContent({ children, className = '' }: { children?: ReactNode; className?: string }) {
  return <div className={`p-4 sm:p-5 ${className}`}>{children}</div>;
}

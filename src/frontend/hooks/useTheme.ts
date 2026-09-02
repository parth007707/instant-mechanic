import { useState, useEffect } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark');
    localStorage.setItem('im_theme', 'light');
  }, [theme]);

  const toggleTheme = () => {
    setTheme('light');
  };

  return { theme: 'light' as const, toggleTheme, isDark: false };
}


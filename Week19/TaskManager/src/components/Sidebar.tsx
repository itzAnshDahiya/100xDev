'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store';

export default function Sidebar() {
  const { user, logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { label: 'Dashboard', href: '/dashboard', icon: '📊' },
    { label: 'Tasks', href: '/dashboard/tasks', icon: '✓' },
    { label: 'Categories', href: '/dashboard/categories', icon: '🏷️' },
    { label: 'Analytics', href: '/dashboard/analytics', icon: '📈' },
    { label: 'Profile', href: '/dashboard/profile', icon: '👤' },
  ];

  const handleLogout = () => {
    logout();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <aside
      className={`bg-slate-900 text-white transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-20'
      } min-h-screen flex flex-col`}
    >
      {/* Header */}
      <div className="p-4 border-b border-slate-700 flex items-center justify-between">
        {isOpen && (
          <div className="flex-1">
            <h1 className="text-xl font-bold">TaskFlow</h1>
            <p className="text-xs text-slate-400">Productivity App</p>
          </div>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-slate-800 rounded-lg transition"
        >
          {isOpen ? '←' : '→'}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition duration-200 group"
            title={!isOpen ? item.label : ''}
          >
            <span className="text-xl">{item.icon}</span>
            {isOpen && <span className="group-hover:translate-x-1 transition">{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* Footer - User Info & Logout */}
      <div className="p-4 border-t border-slate-700 space-y-3">
        {isOpen && (
          <div className="px-2 py-2 bg-slate-800 rounded-lg">
            <p className="text-xs text-slate-400">Logged in as</p>
            <p className="text-sm font-medium truncate">{user?.email}</p>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2 text-red-400 hover:bg-red-900/20 rounded-lg transition text-sm"
        >
          <span>🚪</span>
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}

'use client';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  Bike,
  Mountain,
  FileText,
  BarChart3,
  Crown,
} from 'lucide-react';
import { IoDocumentLockSharp } from 'react-icons/io5';
import { RiAdminFill } from 'react-icons/ri';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'User management', href: '/admin/users', icon: Users },
  { name: 'Documents', href: '/admin/documents', icon: IoDocumentLockSharp },
  { name: 'Rides', href: '/admin/rides', icon: Bike },
  { name: 'Hikes', href: '/admin/hikes', icon: Mountain },
  { name: 'SOS Logs', href: '/admin/sos-logs', icon: FileText },
  { name: 'Subscriptions', href: '/admin/subscriptions', icon: Crown },
  { name: 'Sales report', href: '/admin/sales-report', icon: BarChart3 },
];

export function AdminSidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-border bg-white">
      <div className="flex h-16 items-center gap-2 border-b border-border px-6">
        <RiAdminFill className="size-5" />
        <h1 className="text-lg font-bold">ADMIN</h1>
      </div>
      <nav className="space-y-7 p-4">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-black text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              )}
            >
              <Icon className="size-4" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

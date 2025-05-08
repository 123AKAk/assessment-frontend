'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Users, Home, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { isAdmin } = useAuth();

  const routes = [
    {
      label: 'Dashboard',
      href: '/dashboard',
      icon: Home,
      active: pathname === '/dashboard',
    },
    {
      label: 'Users',
      href: '/dashboard/users',
      icon: Users,
      active: pathname === '/dashboard/users',
    },
  ];

  return (
    <div
      className={cn(
        'fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-background transition-transform duration-300 lg:translate-x-0',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )}
    >
      <div className="flex h-16 items-center gap-2 border-b px-4">
        <div className="flex w-full items-center justify-between">
          <Link 
            href="/dashboard" 
            className="flex items-center gap-2 font-semibold text-xl"
          >
            <Users className="h-6 w-6 text-primary" />
            <span>Admin Panel</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close sidebar</span>
          </Button>
        </div>
      </div>
      <ScrollArea className="flex-1 px-2 py-4">
        <nav className="flex flex-col gap-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                'group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                route.active ? 'bg-accent text-accent-foreground' : 'transparent'
              )}
            >
              <route.icon className="h-5 w-5" />
              <span>{route.label}</span>
            </Link>
          ))}
        </nav>
        
        <div className="mt-6">
          <div className="rounded-md bg-muted p-3">
            <div className="mb-2 text-xs font-medium text-muted-foreground">
              Permission Level
            </div>
            <div className={cn(
              "text-sm font-medium",
              isAdmin() ? "text-primary" : "text-muted-foreground"
            )}>
              {isAdmin() ? "Admin (Full Access)" : "User (Read-only)"}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
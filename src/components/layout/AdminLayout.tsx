import React from 'react';
import { AdminHeader } from './AdminHeader';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-canvas font-saansfont flex flex-col text-midnight-ink">
      <AdminHeader />
      <main className="flex-1 w-full max-w-[1440px] mx-auto p-16 flex gap-16 items-start h-[calc(100vh-48px)] overflow-hidden">
        {children}
      </main>
    </div>
  );
}

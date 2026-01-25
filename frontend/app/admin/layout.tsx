'use client';

import { usePathname } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { useAuth } from '@/contexts/AuthContext';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { isAuthenticated, isLoading } = useAuth();
  const isLoginPage = pathname === '/admin/login';

  // Login sayfasında sidebar gösterme
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Yükleniyor durumunda
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-gray-600 font-semibold">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  // Giriş yapılmamışsa hiçbir şey gösterme (ProtectedRoute redirect edecek)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="admin-panel flex min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-900">
      <AdminSidebar />
      <main className="flex-1 md:ml-64 lg:ml-64">
        <div className="px-4 py-6 md:px-8 md:py-8">
          {children}
        </div>
      </main>
    </div>
  );
}

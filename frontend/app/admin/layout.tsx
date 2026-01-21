import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

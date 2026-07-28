import Sidebar from "@/components/layout/Sidebar";
import TopNavigation from "@/components/layout/TopNavigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Fixed sidebar */}
      <Sidebar />

      {/* Main area: offset by sidebar width */}
      <div className="flex flex-col flex-1 ml-64">
        {/* Fixed top navigation */}
        <TopNavigation />

        {/* Page content: offset below top nav */}
        <main className="flex-1 pt-16 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

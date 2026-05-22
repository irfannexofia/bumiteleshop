import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full">
      <DashboardSidebar className="hidden lg:flex" />
      <div className="flex min-h-screen flex-1 flex-col">{children}</div>
    </div>
  );
}

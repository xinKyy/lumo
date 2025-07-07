"use client";
import DashboardPage from "@/components/dashboard/dashboard-page";
import AccessGuard from "@/components/ui/access-guard";

export default function Dashboard() {
  return (
    <AccessGuard disabledForBusiness={true}>
      <DashboardPage />
    </AccessGuard>
  );
} 
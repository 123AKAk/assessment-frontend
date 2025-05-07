"use client";

import { useAuth } from "@/hooks/useAuth";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { RoleDistribution } from "@/components/dashboard/role-distribution";
import { RecentUsers } from "@/components/dashboard/recent-users";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back, {user?.name}
        </p>
      </div>
      
      <StatsCards />
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <RoleDistribution />
        <RecentUsers />
      </div>
    </div>
  );
}
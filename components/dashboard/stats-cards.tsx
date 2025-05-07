"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck, UserX, ShieldCheck } from "lucide-react";
import { useUsers } from "@/hooks/useUsers";
import { useAuth } from "@/hooks/useAuth";

export function StatsCards() {
  const { users } = useUsers();
  const { user } = useAuth();

  // Calculate statistics
  const totalUsers = users.length;
  const activeUsers = users.filter(user => user.status === "active").length;
  const inactiveUsers = users.filter(user => user.status === "inactive").length;
  const adminUsers = users.filter(user => user.role.id === "admin").length;

  const stats = [
    {
      title: "Total Users",
      value: totalUsers,
      icon: <Users className="h-5 w-5 text-muted-foreground" />,
      description: "Total registered users",
    },
    {
      title: "Active Users",
      value: activeUsers,
      icon: <UserCheck className="h-5 w-5 text-emerald-500" />,
      description: "Users with active accounts",
    },
    {
      title: "Inactive Users",
      value: inactiveUsers,
      icon: <UserX className="h-5 w-5 text-muted-foreground" />,
      description: "Users with inactive accounts",
    },
    {
      title: "Admin Users",
      value: adminUsers,
      icon: <ShieldCheck className="h-5 w-5 text-blue-500" />,
      description: "Users with administrator privileges",
    },
  ];

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index} className="overflow-hidden transition duration-200 border bg-card hover:border-primary/20 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <div className="p-1.5 bg-muted rounded">{stat.icon}</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
"use client";

import { useUsers } from "@/hooks/useUsers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { format } from "date-fns";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function RecentUsers() {
  const { users } = useUsers();

  // Get 5 most recent users
  const sortedUsers = [...users].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 5);

  // Get user initials
  const getUserInitials = (name: string) => {
    const names = name.split(" ");
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`;
    }
    return names[0][0];
  };

  if (sortedUsers.length === 0) {
    return null;
  }

  return (
    <Card className="col-span-1 md:col-span-2 overflow-hidden transition duration-200 border hover:border-primary/20 hover:shadow-md">
      <CardHeader>
        <CardTitle>Recently Added Users</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedUsers.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between bg-card rounded-md p-3 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {getUserInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <StatusBadge status={user.status} />
                <div className="text-sm text-muted-foreground text-right">
                  {format(new Date(user.createdAt), "MMM d, yyyy")}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
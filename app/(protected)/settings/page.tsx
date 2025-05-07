"use client";

import { useAuth } from "@/hooks/useAuth";
import { hasPermission } from "@/lib/auth-utils";
import { roles, permissions } from "@/lib/data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, XCircle } from "lucide-react";

export default function SettingsPage() {
  const { user } = useAuth();
  const canManageRoles = hasPermission(user, "manage-roles");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage system settings and view role permissions
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Roles & Permissions</CardTitle>
          <CardDescription>
            View the permissions assigned to each role in the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {roles.map((role) => (
              <div key={role.id} className="space-y-3">
                <h3 className="text-lg font-medium">{role.name}</h3>
                <Separator />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {permissions.map((permission) => {
                    const hasPermission = role.permissions.some(
                      (p) => p.id === permission.id
                    );
                    
                    return (
                      <div
                        key={permission.id}
                        className="flex items-center p-3 rounded-md bg-muted/40"
                      >
                        {hasPermission ? (
                          <CheckCircle2 className="h-5 w-5 text-emerald-500 mr-3" />
                        ) : (
                          <XCircle className="h-5 w-5 text-gray-400 mr-3" />
                        )}
                        <div>
                          <p className="font-medium">{permission.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {permission.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          
          {!canManageRoles && (
            <p className="text-sm text-muted-foreground mt-6">
              Note: You need the "Manage Roles" permission to modify roles and permissions.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
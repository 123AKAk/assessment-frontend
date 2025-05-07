"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { hasPermission } from "@/lib/auth-utils";
import { UsersTable } from "@/components/users/users-table";
import { UserFilters } from "@/components/users/user-filters";
import { UserForm } from "@/components/users/user-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Users } from "lucide-react";
import { toast } from "sonner";

export default function UsersPage() {
  const { user } = useAuth();
  const [showAddDialog, setShowAddDialog] = useState(false);
  
  const canCreateUsers = hasPermission(user, "create-users");

  const handleAddUser = () => {
    if (!canCreateUsers) {
      toast.error("You don't have permission to create users");
      return;
    }
    setShowAddDialog(true);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center">
            <Users className="mr-2 h-8 w-8 text-muted-foreground" />
            Users
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage user accounts, roles and permissions
          </p>
        </div>
        
        <Button onClick={handleAddUser} disabled={!canCreateUsers}>
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>
      
      <div className="space-y-6">
        <UserFilters />
        <UsersTable />
      </div>
      
      {/* Add user dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
          </DialogHeader>
          <UserForm
            onSubmit={() => setShowAddDialog(false)}
            onCancel={() => setShowAddDialog(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
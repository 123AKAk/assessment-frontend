'use client';

import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import DashboardLayout from '@/components/layout/DashboardLayout';
import UserTable from '@/components/users/UserTable';
import UserForm from '@/components/users/UserForm';
import { User } from '@/lib/types';
import { usersApi } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const { toast } = useToast();
  const { isAdmin } = useAuth();

  // Fetch users on page load and when pagination/search changes
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await usersApi.getUsers(currentPage, 10, searchQuery);
        setUsers(response.users);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error('Error fetching users:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch users. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [currentPage, searchQuery, toast]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page on search
  };

  // Open dialog for creating a new user
  const handleOpenCreateDialog = () => {
    setSelectedUser(null);
    setIsDialogOpen(true);
  };

  // Open dialog for editing a user
  const handleOpenEditDialog = (user: User) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  // Close dialog
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedUser(null);
  };

  // Create or update user
  const handleSubmitUser = async (data: any) => {
    try {
      if (selectedUser) {
        // Update existing user
        await usersApi.updateUser(selectedUser._id, data);
        toast({
          title: 'Success',
          description: 'User updated successfully!',
        });
      } else {
        // Create new user
        await usersApi.createUser(data);
        toast({
          title: 'Success',
          description: 'User created successfully!',
        });
      }
      // Refresh user list and close dialog
      const response = await usersApi.getUsers(currentPage, 10, searchQuery);
      setUsers(response.users);
      setTotalPages(response.totalPages);
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving user:', error);
      toast({
        title: 'Error',
        description: (error as Error).message || 'Failed to save user. Please try again.',
        variant: 'destructive',
      });
    }
  };

  // Open delete confirmation dialog
  const handleOpenDeleteDialog = (userId: string) => {
    setUserToDelete(userId);
    setIsDeleteDialogOpen(true);
  };

  // Delete user
  const handleDeleteUser = async () => {
    if (!userToDelete) return;

    try {
      await usersApi.deleteUser(userToDelete);
      toast({
        title: 'Success',
        description: 'User deleted successfully!',
      });

      // Refresh user list
      const response = await usersApi.getUsers(
        users.length === 1 && currentPage > 1 ? currentPage - 1 : currentPage,
        10,
        searchQuery
      );
      setUsers(response.users);
      setTotalPages(response.totalPages);
      
      // If we deleted the last user on this page, go back a page
      if (users.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete user. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
            <p className="text-muted-foreground">
              View and manage user accounts and access permissions
            </p>
          </div>
          {isAdmin() && (
            <Button onClick={handleOpenCreateDialog} size="sm" className="gap-1">
              <Plus className="h-4 w-4" />
              Add User
            </Button>
          )}
        </div>

        <UserTable
          users={users}
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onDelete={handleOpenDeleteDialog}
          onEdit={handleOpenEditDialog}
          onSearch={handleSearch}
          isLoading={isLoading}
        />

        {/* Create/Edit User Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {selectedUser ? 'Edit User' : 'Create New User'}
              </DialogTitle>
            </DialogHeader>
            <UserForm
              user={selectedUser || undefined}
              onSubmit={handleSubmitUser}
              onCancel={handleCloseDialog}
            />
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                user account and all associated data.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteUser}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </DashboardLayout>
  );
}
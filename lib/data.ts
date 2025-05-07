import { Role, Permission, User } from "@/types";

// Sample permissions
export const permissions: Permission[] = [
  {
    id: "view-users",
    name: "View Users",
    description: "Can view users in the system",
  },
  {
    id: "create-users",
    name: "Create Users",
    description: "Can create new users",
  },
  {
    id: "edit-users",
    name: "Edit Users",
    description: "Can edit existing users",
  },
  {
    id: "delete-users",
    name: "Delete Users",
    description: "Can delete users from the system",
  },
  {
    id: "manage-roles",
    name: "Manage Roles",
    description: "Can manage roles and permissions",
  },
];

// Sample roles
export const roles: Role[] = [
  {
    id: "admin",
    name: "Administrator",
    permissions: permissions,
  },
  {
    id: "manager",
    name: "Manager",
    permissions: [
      permissions[0], // view-users
      permissions[1], // create-users
      permissions[2], // edit-users
    ],
  },
  {
    id: "user",
    name: "Standard User",
    permissions: [permissions[0]], // view-users
  },
];

// Sample users
export const sampleUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: roles[0], // Admin
    status: "active",
    createdAt: "2023-01-15T08:30:00Z",
    lastLogin: "2023-06-20T14:25:30Z",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: roles[1], // Manager
    status: "active",
    createdAt: "2023-02-10T10:15:00Z",
    lastLogin: "2023-06-19T09:45:10Z",
  },
  {
    id: "3",
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    role: roles[2], // User
    status: "inactive",
    createdAt: "2023-03-05T14:20:00Z",
    lastLogin: "2023-05-28T11:30:45Z",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    role: roles[1], // Manager
    status: "active",
    createdAt: "2023-03-15T09:10:00Z",
    lastLogin: "2023-06-18T16:20:15Z",
  },
  {
    id: "5",
    name: "Michael Wilson",
    email: "michael.wilson@example.com",
    role: roles[2], // User
    status: "active",
    createdAt: "2023-04-02T11:45:00Z",
    lastLogin: "2023-06-15T10:05:30Z",
  },
  {
    id: "6",
    name: "Sarah Brown",
    email: "sarah.brown@example.com",
    role: roles[2], // User
    status: "inactive",
    createdAt: "2023-04-20T13:30:00Z",
  },
  {
    id: "7",
    name: "David Miller",
    email: "david.miller@example.com",
    role: roles[1], // Manager
    status: "active",
    createdAt: "2023-05-05T15:20:00Z",
    lastLogin: "2023-06-17T13:15:45Z",
  },
  {
    id: "8",
    name: "Jessica Taylor",
    email: "jessica.taylor@example.com",
    role: roles[2], // User
    status: "active",
    createdAt: "2023-05-18T10:40:00Z",
    lastLogin: "2023-06-10T09:30:20Z",
  },
  {
    id: "9",
    name: "Daniel Anderson",
    email: "daniel.anderson@example.com",
    role: roles[0], // Admin
    status: "active",
    createdAt: "2023-05-25T12:15:00Z",
    lastLogin: "2023-06-19T15:50:10Z",
  },
  {
    id: "10",
    name: "Laura Thomas",
    email: "laura.thomas@example.com",
    role: roles[2], // User
    status: "active",
    createdAt: "2023-06-08T09:25:00Z",
    lastLogin: "2023-06-16T14:40:35Z",
  },
  {
    id: "11",
    name: "Christopher White",
    email: "christopher.white@example.com",
    role: roles[1], // Manager
    status: "active",
    createdAt: "2023-06-12T14:10:00Z",
    lastLogin: "2023-06-20T11:25:15Z",
  },
  {
    id: "12",
    name: "Amanda Clark",
    email: "amanda.clark@example.com",
    role: roles[2], // User
    status: "inactive",
    createdAt: "2023-06-15T10:30:00Z",
  },
];

// Admin user for login
export const adminUser: AuthUser = {
  id: "1",
  name: "John Doe",
  email: "admin@example.com",
  role: roles[0], // Admin
};

// Manager user for login
export const managerUser: AuthUser = {
  id: "2",
  name: "Jane Smith",
  email: "manager@example.com",
  role: roles[1], // Manager
};

// Regular user for login
export const regularUser: AuthUser = {
  id: "3",
  name: "Robert Johnson",
  email: "user@example.com",
  role: roles[2], // User
};
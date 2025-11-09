"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import CustomModal from "@/components/CustomModal";
import {
  FaSearch,
  FaEdit,
  FaTrash,
  FaEye,
  FaFilter,
  FaDownload,
  FaPlus,
  FaUser,
} from "react-icons/fa";

// Mock data type for users
interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "viewer";
  status: "active" | "inactive" | "suspended";
  createdAt: string;
  lastLogin: string;
  totalAssessments: number;
}

// Mock data
const mockUsers: User[] = [
  {
    id: "user-001",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "admin",
    status: "active",
    createdAt: "2024-01-01",
    lastLogin: "2024-01-20",
    totalAssessments: 15,
  },
  {
    id: "user-002",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "user",
    status: "active",
    createdAt: "2024-01-05",
    lastLogin: "2024-01-19",
    totalAssessments: 8,
  },
  {
    id: "user-003",
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    role: "user",
    status: "inactive",
    createdAt: "2024-01-10",
    lastLogin: "2024-01-15",
    totalAssessments: 3,
  },
  {
    id: "user-004",
    name: "Alice Williams",
    email: "alice.williams@example.com",
    role: "viewer",
    status: "active",
    createdAt: "2024-01-12",
    lastLogin: "2024-01-20",
    totalAssessments: 0,
  },
  {
    id: "user-005",
    name: "Charlie Brown",
    email: "charlie.brown@example.com",
    role: "user",
    status: "suspended",
    createdAt: "2024-01-08",
    lastLogin: "2024-01-14",
    totalAssessments: 2,
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800";
    case "inactive":
      return "bg-yellow-100 text-yellow-800";
    case "suspended":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getRoleColor = (role: string) => {
  switch (role) {
    case "admin":
      return "bg-purple-100 text-purple-800";
    case "user":
      return "bg-blue-100 text-blue-800";
    case "viewer":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function Users() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<User>>({});
  const [deleteUser, setDeleteUser] = useState<User | null>(null);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [addUserFormData, setAddUserFormData] = useState<Partial<User>>({
    name: "",
    email: "",
    role: "user",
    status: "active",
  });

  // Filter users based on search, status, and role
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesStatus && matchesRole;
  });

  const handleDelete = (user: User) => {
    setDeleteUser(user);
  };

  const confirmDelete = () => {
    if (deleteUser) {
      setUsers(users.filter((u) => u.id !== deleteUser.id));
      setDeleteUser(null);
    }
  };

  const handleEdit = (user: User) => {
    setEditUser(user);
    setEditFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    });
  };

  const handleView = (user: User) => {
    setSelectedUser(user);
  };

  const closeViewModal = () => {
    setSelectedUser(null);
  };

  const closeEditModal = () => {
    setEditUser(null);
    setEditFormData({});
  };

  const handleSaveEdit = () => {
    if (editUser && editFormData) {
      setUsers(
        users.map((u) => (u.id === editUser.id ? { ...u, ...editFormData } : u))
      );
      closeEditModal();
    }
  };

  const closeDeleteModal = () => {
    setDeleteUser(null);
  };

  const closeAddUserModal = () => {
    setIsAddUserModalOpen(false);
    setAddUserFormData({
      name: "",
      email: "",
      role: "user",
      status: "active",
    });
  };

  const handleAddUser = () => {
    if (addUserFormData.name && addUserFormData.email) {
      // Generate a new user ID
      const maxId = Math.max(
        ...users.map((u) => {
          const num = parseInt(u.id.replace("user-", ""));
          return isNaN(num) ? 0 : num;
        })
      );
      const newId = `user-${String(maxId + 1).padStart(3, "0")}`;

      const newUser: User = {
        id: newId,
        name: addUserFormData.name,
        email: addUserFormData.email,
        role: addUserFormData.role || "user",
        status: addUserFormData.status || "active",
        createdAt: new Date().toISOString().split("T")[0],
        lastLogin: new Date().toISOString().split("T")[0],
        totalAssessments: 0,
      };

      setUsers([...users, newUser]);
      closeAddUserModal();
    }
  };

  return (
    <div className="flex h-screen flex-col bg-white">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="mb-2 text-3xl font-bold text-slate-900">
                User Management
              </h1>
              <p className="text-slate-600">
                Manage all system users and their permissions
              </p>
            </div>

            {/* Actions Bar */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              {/* Search and Filters */}
              <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-center">
                {/* Search */}
                <div className="relative flex-1">
                  <FaSearch className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by name, email, or user ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-10 pr-4 text-slate-900 placeholder-slate-400 focus:border-[#199980] focus:outline-none focus:ring-2 focus:ring-[#199980]/20"
                  />
                </div>

                {/* Status Filter */}
                <div className="relative">
                  <FaFilter className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="appearance-none rounded-lg border border-slate-300 bg-white py-2 pl-10 pr-8 text-slate-900 focus:border-[#199980] focus:outline-none focus:ring-2 focus:ring-[#199980]/20"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>

                {/* Role Filter */}
                <div className="relative">
                  <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="appearance-none rounded-lg border border-slate-300 bg-white py-2 pl-4 pr-8 text-slate-900 focus:border-[#199980] focus:outline-none focus:ring-2 focus:ring-[#199980]/20"
                  >
                    <option value="all">All Roles</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                    <option value="viewer">Viewer</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50">
                  <FaDownload className="h-4 w-4" />
                  Export
                </button>
                <button
                  onClick={() => setIsAddUserModalOpen(true)}
                  className="flex cursor-pointer items-center gap-2 rounded-lg bg-[#199980] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#158066]"
                >
                  <FaPlus className="h-4 w-4" />
                  Add User
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="mb-6 grid gap-4 sm:grid-cols-4">
              <div className="rounded-lg bg-white p-4 shadow-sm">
                <div className="text-sm text-slate-600">Total Users</div>
                <div className="mt-1 text-2xl font-bold text-slate-900">
                  {users.length}
                </div>
              </div>
              <div className="rounded-lg bg-white p-4 shadow-sm">
                <div className="text-sm text-slate-600">Active Users</div>
                <div className="mt-1 text-2xl font-bold text-green-600">
                  {users.filter((u) => u.status === "active").length}
                </div>
              </div>
              <div className="rounded-lg bg-white p-4 shadow-sm">
                <div className="text-sm text-slate-600">Admins</div>
                <div className="mt-1 text-2xl font-bold text-purple-600">
                  {users.filter((u) => u.role === "admin").length}
                </div>
              </div>
              <div className="rounded-lg bg-white p-4 shadow-sm">
                <div className="text-sm text-slate-600">Suspended</div>
                <div className="mt-1 text-2xl font-bold text-red-600">
                  {users.filter((u) => u.status === "suspended").length}
                </div>
              </div>
            </div>

            {/* Users Table */}
            <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                        Assessments
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                        Last Login
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-slate-500">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {filteredUsers.length === 0 ? (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-6 py-12 text-center text-slate-500"
                        >
                          No users found
                        </td>
                      </tr>
                    ) : (
                      filteredUsers.map((user) => (
                        <tr
                          key={user.id}
                          className="transition-colors hover:bg-slate-50"
                        >
                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#199980]/10 text-[#199980]">
                                <FaUser className="h-5 w-5" />
                              </div>
                              <div className="flex flex-col">
                                <div className="font-medium text-slate-900">
                                  {user.name}
                                </div>
                                <div className="text-sm text-slate-500">
                                  {user.email}
                                </div>
                                <div className="text-xs text-slate-400">
                                  {user.id}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <span
                              className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${getRoleColor(
                                user.role
                              )}`}
                            >
                              {user.role.charAt(0).toUpperCase() +
                                user.role.slice(1)}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <span
                              className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusColor(
                                user.status
                              )}`}
                            >
                              {user.status.charAt(0).toUpperCase() +
                                user.status.slice(1)}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-900">
                            {user.totalAssessments}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                            {new Date(user.lastLogin).toLocaleDateString()}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => handleView(user)}
                                className="cursor-pointer rounded p-2 text-[#199980] transition-colors hover:bg-[#199980]/10"
                                title="View"
                              >
                                <FaEye className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleEdit(user)}
                                className="cursor-pointer rounded p-2 text-yellow-600 transition-colors hover:bg-yellow-50"
                                title="Edit"
                              >
                                <FaEdit className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(user)}
                                className="cursor-pointer rounded p-2 text-red-600 transition-colors hover:bg-red-50"
                                title="Delete"
                              >
                                <FaTrash className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            {filteredUsers.length > 0 && (
              <div className="mt-6 flex items-center justify-between">
                <div className="text-sm text-slate-600">
                  Showing {filteredUsers.length} of {users.length} users
                </div>
                <div className="flex gap-2">
                  <button className="cursor-pointer rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50">
                    Previous
                  </button>
                  <button className="cursor-pointer rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50">
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* View Detail Modal */}
      <CustomModal
        isOpen={!!selectedUser}
        onClose={closeViewModal}
        title="User Details"
        footer={
          <button
            onClick={closeViewModal}
            className="cursor-pointer rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            Close
          </button>
        }
      >
        {selectedUser && (
          <div className="space-y-4">
            {/* User Information */}
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-500">
                User Information
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-medium text-slate-500">
                    Name
                  </label>
                  <p className="mt-1 text-sm font-medium text-slate-900">
                    {selectedUser.name}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500">
                    Email
                  </label>
                  <p className="mt-1 text-sm font-medium text-slate-900">
                    {selectedUser.email}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500">
                    User ID
                  </label>
                  <p className="mt-1 text-sm font-medium text-slate-900">
                    {selectedUser.id}
                  </p>
                </div>
              </div>
            </div>

            {/* Account Information */}
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-500">
                Account Information
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-medium text-slate-500">
                    Role
                  </label>
                  <div className="mt-1">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getRoleColor(
                        selectedUser.role
                      )}`}
                    >
                      {selectedUser.role.charAt(0).toUpperCase() +
                        selectedUser.role.slice(1)}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500">
                    Status
                  </label>
                  <div className="mt-1">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(
                        selectedUser.status
                      )}`}
                    >
                      {selectedUser.status.charAt(0).toUpperCase() +
                        selectedUser.status.slice(1)}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500">
                    Total Assessments
                  </label>
                  <p className="mt-1 text-sm font-medium text-slate-900">
                    {selectedUser.totalAssessments}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500">
                    Account Created
                  </label>
                  <p className="mt-1 text-sm font-medium text-slate-900">
                    {new Date(selectedUser.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500">
                    Last Login
                  </label>
                  <p className="mt-1 text-sm font-medium text-slate-900">
                    {new Date(selectedUser.lastLogin).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </CustomModal>

      {/* Edit Modal */}
      <CustomModal
        isOpen={!!editUser}
        onClose={closeEditModal}
        title="Edit User"
        footer={
          <>
            <button
              onClick={closeEditModal}
              className="cursor-pointer rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveEdit}
              className="cursor-pointer rounded-lg bg-[#199980] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#158066]"
            >
              Save Changes
            </button>
          </>
        }
      >
        {editUser && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveEdit();
            }}
            className="space-y-6"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Name
                </label>
                <input
                  type="text"
                  value={editFormData.name || ""}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, name: e.target.value })
                  }
                  className="input"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  type="email"
                  value={editFormData.email || ""}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, email: e.target.value })
                  }
                  className="input"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Role
                </label>
                <select
                  value={editFormData.role || ""}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      role: e.target.value as "admin" | "user" | "viewer",
                    })
                  }
                  className="input"
                  required
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                  <option value="viewer">Viewer</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Status
                </label>
                <select
                  value={editFormData.status || ""}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      status: e.target.value as
                        | "active"
                        | "inactive"
                        | "suspended",
                    })
                  }
                  className="input"
                  required
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
            </div>
            <div className="rounded-lg bg-slate-50 p-4">
              <p className="text-xs text-slate-500">
                Note: User ID, creation date, last login, and total assessments
                cannot be edited.
              </p>
            </div>
          </form>
        )}
      </CustomModal>

      {/* Delete Confirmation Modal */}
      <CustomModal
        isOpen={!!deleteUser}
        onClose={closeDeleteModal}
        title="Delete User"
        size="sm"
        footer={
          <>
            <button
              onClick={closeDeleteModal}
              className="cursor-pointer rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="cursor-pointer rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
            >
              Delete
            </button>
          </>
        }
      >
        {deleteUser && (
          <div className="space-y-4">
            <p className="text-slate-600">
              Are you sure you want to delete user{" "}
              <span className="font-semibold text-slate-900">
                {deleteUser.name}
              </span>
              ? This action cannot be undone.
            </p>
            <div className="rounded-lg bg-red-50 p-4">
              <p className="text-sm text-red-700">
                This will permanently delete the user account and all associated
                data.
              </p>
            </div>
          </div>
        )}
      </CustomModal>

      {/* Add User Modal */}
      <CustomModal
        isOpen={isAddUserModalOpen}
        onClose={closeAddUserModal}
        title="Add New User"
        footer={
          <>
            <button
              onClick={closeAddUserModal}
              className="cursor-pointer rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              onClick={handleAddUser}
              className="cursor-pointer rounded-lg bg-[#199980] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#158066]"
            >
              Add User
            </button>
          </>
        }
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddUser();
          }}
          className="space-y-6"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={addUserFormData.name || ""}
                onChange={(e) =>
                  setAddUserFormData({
                    ...addUserFormData,
                    name: e.target.value,
                  })
                }
                className="input"
                placeholder="Enter user name"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={addUserFormData.email || ""}
                onChange={(e) =>
                  setAddUserFormData({
                    ...addUserFormData,
                    email: e.target.value,
                  })
                }
                className="input"
                placeholder="Enter email address"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">
                Role <span className="text-red-500">*</span>
              </label>
              <select
                value={addUserFormData.role || "user"}
                onChange={(e) =>
                  setAddUserFormData({
                    ...addUserFormData,
                    role: e.target.value as "admin" | "user" | "viewer",
                  })
                }
                className="input"
                required
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
                <option value="viewer">Viewer</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">
                Status <span className="text-red-500">*</span>
              </label>
              <select
                value={addUserFormData.status || "active"}
                onChange={(e) =>
                  setAddUserFormData({
                    ...addUserFormData,
                    status: e.target.value as
                      | "active"
                      | "inactive"
                      | "suspended",
                  })
                }
                className="input"
                required
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
          </div>
          <div className="rounded-lg bg-blue-50 p-4">
            <p className="text-xs text-blue-700">
              <strong>Note:</strong> A new user ID will be automatically
              generated. The account creation date and last login will be set to
              today. Total assessments will start at 0.
            </p>
          </div>
        </form>
      </CustomModal>
    </div>
  );
}

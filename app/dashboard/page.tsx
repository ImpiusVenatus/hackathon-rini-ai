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
} from "react-icons/fa";

// Mock data type for credit assessments
// a comment
interface CreditAssessment {
  id: string;
  userId: string;
  userName: string;
  email: string;
  creditScore: number;
  status: "approved" | "pending" | "rejected";
  assessmentDate: string;
  lastUpdated: string;
}

// Mock data
const mockAssessments: CreditAssessment[] = [
  {
    id: "1",
    userId: "user-001",
    userName: "John Doe",
    email: "john.doe@example.com",
    creditScore: 750,
    status: "approved",
    assessmentDate: "2024-01-15",
    lastUpdated: "2024-01-15",
  },
  {
    id: "2",
    userId: "user-002",
    userName: "Jane Smith",
    email: "jane.smith@example.com",
    creditScore: 680,
    status: "pending",
    assessmentDate: "2024-01-16",
    lastUpdated: "2024-01-16",
  },
  {
    id: "3",
    userId: "user-003",
    userName: "Bob Johnson",
    email: "bob.johnson@example.com",
    creditScore: 620,
    status: "rejected",
    assessmentDate: "2024-01-17",
    lastUpdated: "2024-01-17",
  },
  {
    id: "4",
    userId: "user-004",
    userName: "Alice Williams",
    email: "alice.williams@example.com",
    creditScore: 790,
    status: "approved",
    assessmentDate: "2024-01-18",
    lastUpdated: "2024-01-18",
  },
  {
    id: "5",
    userId: "user-005",
    userName: "Charlie Brown",
    email: "charlie.brown@example.com",
    creditScore: 550,
    status: "rejected",
    assessmentDate: "2024-01-19",
    lastUpdated: "2024-01-19",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "approved":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "rejected":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getScoreColor = (score: number) => {
  if (score >= 750) return "text-green-600";
  if (score >= 650) return "text-yellow-600";
  return "text-red-600";
};

export default function Dashboard() {
  const [assessments, setAssessments] =
    useState<CreditAssessment[]>(mockAssessments);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedAssessment, setSelectedAssessment] =
    useState<CreditAssessment | null>(null);
  const [editAssessment, setEditAssessment] = useState<CreditAssessment | null>(
    null
  );
  const [editFormData, setEditFormData] = useState<Partial<CreditAssessment>>(
    {}
  );
  const [deleteAssessment, setDeleteAssessment] =
    useState<CreditAssessment | null>(null);

  // Filter assessments based on search and status
  const filteredAssessments = assessments.filter((assessment) => {
    const matchesSearch =
      assessment.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assessment.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assessment.userId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || assessment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = (assessment: CreditAssessment) => {
    setDeleteAssessment(assessment);
  };

  const confirmDelete = () => {
    if (deleteAssessment) {
      setAssessments(assessments.filter((a) => a.id !== deleteAssessment.id));
      setDeleteAssessment(null);
    }
  };

  const handleEdit = (assessment: CreditAssessment) => {
    setEditAssessment(assessment);
    setEditFormData({
      userName: assessment.userName,
      email: assessment.email,
      userId: assessment.userId,
      creditScore: assessment.creditScore,
      status: assessment.status,
      assessmentDate: assessment.assessmentDate,
    });
  };

  const handleView = (assessment: CreditAssessment) => {
    setSelectedAssessment(assessment);
  };

  const closeViewModal = () => {
    setSelectedAssessment(null);
  };

  const closeEditModal = () => {
    setEditAssessment(null);
    setEditFormData({});
  };

  const handleSaveEdit = () => {
    if (editAssessment && editFormData) {
      setAssessments(
        assessments.map((a) =>
          a.id === editAssessment.id
            ? {
                ...a,
                ...editFormData,
                lastUpdated: new Date().toISOString().split("T")[0],
              }
            : a
        )
      );
      closeEditModal();
    }
  };

  const closeDeleteModal = () => {
    setDeleteAssessment(null);
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
                Credit Assessments
              </h1>
              <p className="text-slate-600">
                Manage and review all credit score assessments
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
                    <option value="approved">Approved</option>
                    <option value="pending">Pending</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50">
                  <FaDownload className="h-4 w-4" />
                  Export
                </button>
                <button className="flex cursor-pointer items-center gap-2 rounded-lg bg-[#199980] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#158066]">
                  <FaPlus className="h-4 w-4" />
                  New Assessment
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="mb-6 grid gap-4 sm:grid-cols-4">
              <div className="rounded-lg bg-white p-4 shadow-sm">
                <div className="text-sm text-slate-600">Total Assessments</div>
                <div className="mt-1 text-2xl font-bold text-slate-900">
                  {assessments.length}
                </div>
              </div>
              <div className="rounded-lg bg-white p-4 shadow-sm">
                <div className="text-sm text-slate-600">Approved</div>
                <div className="mt-1 text-2xl font-bold text-green-600">
                  {assessments.filter((a) => a.status === "approved").length}
                </div>
              </div>
              <div className="rounded-lg bg-white p-4 shadow-sm">
                <div className="text-sm text-slate-600">Pending</div>
                <div className="mt-1 text-2xl font-bold text-yellow-600">
                  {assessments.filter((a) => a.status === "pending").length}
                </div>
              </div>
              <div className="rounded-lg bg-white p-4 shadow-sm">
                <div className="text-sm text-slate-600">Rejected</div>
                <div className="mt-1 text-2xl font-bold text-red-600">
                  {assessments.filter((a) => a.status === "rejected").length}
                </div>
              </div>
            </div>

            {/* Assessments Table */}
            <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                        Credit Score
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                        Assessment Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                        Last Updated
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-slate-500">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {filteredAssessments.length === 0 ? (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-6 py-12 text-center text-slate-500"
                        >
                          No assessments found
                        </td>
                      </tr>
                    ) : (
                      filteredAssessments.map((assessment) => (
                        <tr
                          key={assessment.id}
                          className="transition-colors hover:bg-slate-50"
                        >
                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="flex flex-col">
                              <div className="font-medium text-slate-900">
                                {assessment.userName}
                              </div>
                              <div className="text-sm text-slate-500">
                                {assessment.email}
                              </div>
                              <div className="text-xs text-slate-400">
                                {assessment.userId}
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <span
                              className={`text-lg font-bold ${getScoreColor(
                                assessment.creditScore
                              )}`}
                            >
                              {assessment.creditScore}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <span
                              className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusColor(
                                assessment.status
                              )}`}
                            >
                              {assessment.status.charAt(0).toUpperCase() +
                                assessment.status.slice(1)}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                            {new Date(
                              assessment.assessmentDate
                            ).toLocaleDateString()}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                            {new Date(
                              assessment.lastUpdated
                            ).toLocaleDateString()}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => handleView(assessment)}
                                className="cursor-pointer rounded p-2 text-[#199980] transition-colors hover:bg-[#199980]/10"
                                title="View"
                              >
                                <FaEye className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleEdit(assessment)}
                                className="cursor-pointer rounded p-2 text-yellow-600 transition-colors hover:bg-yellow-50"
                                title="Edit"
                              >
                                <FaEdit className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(assessment)}
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

            {/* Pagination (placeholder) */}
            {filteredAssessments.length > 0 && (
              <div className="mt-6 flex items-center justify-between">
                <div className="text-sm text-slate-600">
                  Showing {filteredAssessments.length} of {assessments.length}{" "}
                  assessments
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
        isOpen={!!selectedAssessment}
        onClose={closeViewModal}
        title="Assessment Details"
        footer={
          <button
            onClick={closeViewModal}
            className="cursor-pointer rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            Close
          </button>
        }
      >
        {selectedAssessment && (
          <div className="space-y-4">
            {/* User Information */}
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-500">
                User Information
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-medium text-slate-500">
                    User Name
                  </label>
                  <p className="mt-1 text-sm font-medium text-slate-900">
                    {selectedAssessment.userName}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500">
                    Email
                  </label>
                  <p className="mt-1 text-sm font-medium text-slate-900">
                    {selectedAssessment.email}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500">
                    User ID
                  </label>
                  <p className="mt-1 text-sm font-medium text-slate-900">
                    {selectedAssessment.userId}
                  </p>
                </div>
              </div>
            </div>

            {/* Assessment Information */}
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-500">
                Assessment Information
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-medium text-slate-500">
                    Credit Score
                  </label>
                  <p
                    className={`mt-1 text-2xl font-bold ${getScoreColor(
                      selectedAssessment.creditScore
                    )}`}
                  >
                    {selectedAssessment.creditScore}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500">
                    Status
                  </label>
                  <div className="mt-1">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(
                        selectedAssessment.status
                      )}`}
                    >
                      {selectedAssessment.status.charAt(0).toUpperCase() +
                        selectedAssessment.status.slice(1)}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500">
                    Assessment Date
                  </label>
                  <p className="mt-1 text-sm font-medium text-slate-900">
                    {new Date(
                      selectedAssessment.assessmentDate
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500">
                    Last Updated
                  </label>
                  <p className="mt-1 text-sm font-medium text-slate-900">
                    {new Date(
                      selectedAssessment.lastUpdated
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500">
                    Assessment ID
                  </label>
                  <p className="mt-1 text-sm font-medium text-slate-900">
                    {selectedAssessment.id}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </CustomModal>

      {/* Edit Modal */}
      <CustomModal
        isOpen={!!editAssessment}
        onClose={closeEditModal}
        title="Edit Assessment"
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
        {editAssessment && (
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
                  User Name
                </label>
                <input
                  type="text"
                  value={editFormData.userName || ""}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      userName: e.target.value,
                    })
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
                  User ID
                </label>
                <input
                  type="text"
                  value={editFormData.userId || ""}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, userId: e.target.value })
                  }
                  className="input"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Credit Score
                </label>
                <input
                  type="number"
                  min="0"
                  max="850"
                  value={editFormData.creditScore || ""}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      creditScore: parseInt(e.target.value) || 0,
                    })
                  }
                  className="input"
                  required
                />
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
                        | "approved"
                        | "pending"
                        | "rejected",
                    })
                  }
                  className="input"
                  required
                >
                  <option value="approved">Approved</option>
                  <option value="pending">Pending</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Assessment Date
                </label>
                <input
                  type="date"
                  value={editFormData.assessmentDate || ""}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      assessmentDate: e.target.value,
                    })
                  }
                  className="input"
                  required
                />
              </div>
            </div>
          </form>
        )}
      </CustomModal>

      {/* Delete Confirmation Modal */}
      <CustomModal
        isOpen={!!deleteAssessment}
        onClose={closeDeleteModal}
        title="Delete Assessment"
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
        {deleteAssessment && (
          <div className="space-y-4">
            <p className="text-slate-600">
              Are you sure you want to delete the assessment for{" "}
              <span className="font-semibold text-slate-900">
                {deleteAssessment.userName}
              </span>
              ? This action cannot be undone.
            </p>
            <div className="rounded-lg bg-red-50 p-4">
              <p className="text-sm text-red-700">
                This will permanently delete the assessment record.
              </p>
            </div>
          </div>
        )}
      </CustomModal>
    </div>
  );
}

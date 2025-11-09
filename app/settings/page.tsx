"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import {
  FaSave,
  FaBell,
  FaShieldAlt,
  FaDatabase,
  FaGlobe,
} from "react-icons/fa";

export default function Settings() {
  const [settings, setSettings] = useState({
    // General Settings
    siteName: "RiniAI",
    siteDescription: "AI-powered credit scoring platform",
    timezone: "UTC",
    language: "en",

    // Notification Settings
    emailNotifications: true,
    assessmentAlerts: true,
    userActivityAlerts: true,
    weeklyReports: false,

    // Security Settings
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordMinLength: 8,
    requireStrongPassword: true,

    // Appearance Settings
    theme: "system",
    primaryColor: "teal",

    // Data Settings
    dataRetentionDays: 365,
    autoBackup: true,
    backupFrequency: "daily",
  });

  const handleSave = () => {
    alert("Settings saved successfully!");
    // In a real app, this would save to the backend
  };

  const handleChange = (key: string, value: string | number | boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
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
                Settings
              </h1>
              <p className="text-slate-600">
                Manage your application settings and preferences
              </p>
            </div>

            <div className="space-y-6">
              {/* General Settings */}
              <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 px-6 py-4">
                  <div className="flex items-center gap-3">
                    <FaGlobe className="h-5 w-5 text-[#199980]" />
                    <h2 className="text-xl font-semibold text-slate-900">
                      General Settings
                    </h2>
                  </div>
                </div>
                <div className="space-y-4 p-6">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Site Name
                    </label>
                    <input
                      type="text"
                      value={settings.siteName}
                      onChange={(e) => handleChange("siteName", e.target.value)}
                      className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:border-[#199980] focus:outline-none focus:ring-2 focus:ring-[#199980]/20"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Site Description
                    </label>
                    <textarea
                      value={settings.siteDescription}
                      onChange={(e) =>
                        handleChange("siteDescription", e.target.value)
                      }
                      rows={3}
                      className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:border-[#199980] focus:outline-none focus:ring-2 focus:ring-[#199980]/20"
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">
                        Timezone
                      </label>
                      <select
                        value={settings.timezone}
                        onChange={(e) =>
                          handleChange("timezone", e.target.value)
                        }
                        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:border-[#199980] focus:outline-none focus:ring-2 focus:ring-[#199980]/20"
                      >
                        <option value="UTC">UTC</option>
                        <option value="America/New_York">Eastern Time</option>
                        <option value="America/Chicago">Central Time</option>
                        <option value="America/Denver">Mountain Time</option>
                        <option value="America/Los_Angeles">
                          Pacific Time
                        </option>
                        <option value="Europe/London">London</option>
                        <option value="Europe/Paris">Paris</option>
                        <option value="Asia/Tokyo">Tokyo</option>
                      </select>
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">
                        Language
                      </label>
                      <select
                        value={settings.language}
                        onChange={(e) =>
                          handleChange("language", e.target.value)
                        }
                        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:border-[#199980] focus:outline-none focus:ring-2 focus:ring-[#199980]/20"
                      >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                        <option value="ja">Japanese</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notification Settings */}
              <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 px-6 py-4">
                  <div className="flex items-center gap-3">
                    <FaBell className="h-5 w-5 text-[#199980]" />
                    <h2 className="text-xl font-semibold text-slate-900">
                      Notification Settings
                    </h2>
                  </div>
                </div>
                <div className="space-y-4 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-slate-900">
                        Email Notifications
                      </div>
                      <div className="text-sm text-slate-500">
                        Receive email notifications for important events
                      </div>
                    </div>
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        checked={settings.emailNotifications}
                        onChange={(e) =>
                          handleChange("emailNotifications", e.target.checked)
                        }
                        className="peer sr-only"
                      />
                      <div className="peer h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-slate-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#199980] peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#199980]/30"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-slate-900">
                        Assessment Alerts
                      </div>
                      <div className="text-sm text-slate-500">
                        Get notified when new assessments are completed
                      </div>
                    </div>
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        checked={settings.assessmentAlerts}
                        onChange={(e) =>
                          handleChange("assessmentAlerts", e.target.checked)
                        }
                        className="peer sr-only"
                      />
                      <div className="peer h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-slate-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#199980] peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#199980]/30"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-slate-900">
                        User Activity Alerts
                      </div>
                      <div className="text-sm text-slate-500">
                        Receive alerts for important user activities
                      </div>
                    </div>
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        checked={settings.userActivityAlerts}
                        onChange={(e) =>
                          handleChange("userActivityAlerts", e.target.checked)
                        }
                        className="peer sr-only"
                      />
                      <div className="peer h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-slate-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#199980] peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#199980]/30"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-slate-900">
                        Weekly Reports
                      </div>
                      <div className="text-sm text-slate-500">
                        Receive weekly summary reports via email
                      </div>
                    </div>
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        checked={settings.weeklyReports}
                        onChange={(e) =>
                          handleChange("weeklyReports", e.target.checked)
                        }
                        className="peer sr-only"
                      />
                      <div className="peer h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-slate-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#199980] peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#199980]/30"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Security Settings */}
              <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 px-6 py-4">
                  <div className="flex items-center gap-3">
                    <FaShieldAlt className="h-5 w-5 text-[#199980]" />
                    <h2 className="text-xl font-semibold text-slate-900">
                      Security Settings
                    </h2>
                  </div>
                </div>
                <div className="space-y-4 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-slate-900">
                        Two-Factor Authentication
                      </div>
                      <div className="text-sm text-slate-500">
                        Require 2FA for all admin accounts
                      </div>
                    </div>
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        checked={settings.twoFactorAuth}
                        onChange={(e) =>
                          handleChange("twoFactorAuth", e.target.checked)
                        }
                        className="peer sr-only"
                      />
                      <div className="peer h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-slate-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#199980] peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#199980]/30"></div>
                    </label>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Session Timeout (minutes)
                    </label>
                    <input
                      type="number"
                      min="5"
                      max="120"
                      value={settings.sessionTimeout}
                      onChange={(e) =>
                        handleChange("sessionTimeout", parseInt(e.target.value))
                      }
                      className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:border-[#199980] focus:outline-none focus:ring-2 focus:ring-[#199980]/20"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Minimum Password Length
                    </label>
                    <input
                      type="number"
                      min="6"
                      max="32"
                      value={settings.passwordMinLength}
                      onChange={(e) =>
                        handleChange(
                          "passwordMinLength",
                          parseInt(e.target.value)
                        )
                      }
                      className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:border-[#199980] focus:outline-none focus:ring-2 focus:ring-[#199980]/20"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-slate-900">
                        Require Strong Password
                      </div>
                      <div className="text-sm text-slate-500">
                        Enforce complex password requirements
                      </div>
                    </div>
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        checked={settings.requireStrongPassword}
                        onChange={(e) =>
                          handleChange(
                            "requireStrongPassword",
                            e.target.checked
                          )
                        }
                        className="peer sr-only"
                      />
                      <div className="peer h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-slate-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#199980] peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#199980]/30"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Data Settings */}
              <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 px-6 py-4">
                  <div className="flex items-center gap-3">
                    <FaDatabase className="h-5 w-5 text-[#199980]" />
                    <h2 className="text-xl font-semibold text-slate-900">
                      Data Settings
                    </h2>
                  </div>
                </div>
                <div className="space-y-4 p-6">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Data Retention Period (days)
                    </label>
                    <input
                      type="number"
                      min="30"
                      max="3650"
                      value={settings.dataRetentionDays}
                      onChange={(e) =>
                        handleChange(
                          "dataRetentionDays",
                          parseInt(e.target.value)
                        )
                      }
                      className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:border-[#199980] focus:outline-none focus:ring-2 focus:ring-[#199980]/20"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-slate-900">
                        Automatic Backup
                      </div>
                      <div className="text-sm text-slate-500">
                        Automatically backup data on a schedule
                      </div>
                    </div>
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        checked={settings.autoBackup}
                        onChange={(e) =>
                          handleChange("autoBackup", e.target.checked)
                        }
                        className="peer sr-only"
                      />
                      <div className="peer h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-slate-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#199980] peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#199980]/30"></div>
                    </label>
                  </div>
                  {settings.autoBackup && (
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">
                        Backup Frequency
                      </label>
                      <select
                        value={settings.backupFrequency}
                        onChange={(e) =>
                          handleChange("backupFrequency", e.target.value)
                        }
                        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:border-[#199980] focus:outline-none focus:ring-2 focus:ring-[#199980]/20"
                      >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end">
                <button
                  onClick={handleSave}
                  className="flex cursor-pointer items-center gap-2 rounded-lg bg-[#199980] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#158066]"
                >
                  <FaSave className="h-4 w-4" />
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

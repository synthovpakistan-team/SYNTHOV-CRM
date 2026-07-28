"use client";

import { Save, User, Shield, CreditCard, Bell, Key } from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500 text-sm mt-1">Manage your account settings and preferences</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col md:flex-row min-h-[600px]">

        {/* Settings Sidebar */}
        <div className="w-full md:w-64 bg-slate-50 border-r border-slate-200 p-4">
          <nav className="space-y-1">
            <button onClick={() => setActiveTab("profile")} className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${activeTab === "profile" ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`}>
              <User size={18} /> Profile
            </button>
            <button onClick={() => setActiveTab("security")} className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${activeTab === "security" ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`}>
              <Shield size={18} /> Security
            </button>
            <button onClick={() => setActiveTab("notifications")} className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${activeTab === "notifications" ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`}>
              <Bell size={18} /> Notifications
            </button>
            <button onClick={() => setActiveTab("billing")} className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${activeTab === "billing" ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`}>
              <CreditCard size={18} /> Billing & Plan
            </button>
            <button onClick={() => setActiveTab("api")} className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${activeTab === "api" ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`}>
              <Key size={18} /> API & Integrations
            </button>
          </nav>
        </div>

        {/* Settings Content */}
        <div className="flex-1 p-6 lg:p-8">
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Personal Information</h2>
                <p className="text-sm text-slate-500 mb-4">Update your photo and personal details here.</p>
                <hr className="border-slate-200" />
              </div>

              <div className="grid gap-6 max-w-2xl">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-2xl font-bold">
                    JS
                  </div>
                  <div>
                    <button className="bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm">
                      Change Avatar
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">First Name</label>
                    <input type="text" defaultValue="John" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Last Name</label>
                    <input type="text" defaultValue="Smith" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Email Address</label>
                  <input type="email" defaultValue="admin@synthov.com" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm bg-slate-50" readOnly />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Timezone</label>
                  <select className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white">
                    <option>Eastern Time (US & Canada)</option>
                    <option>Pacific Time (US & Canada)</option>
                    <option>Central Time (US & Canada)</option>
                    <option>London (GMT)</option>
                  </select>
                </div>
              </div>

              <div className="pt-6 flex justify-end">
                <button className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm">
                  <Save size={16} /> Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab !== "profile" && (
             <div className="flex flex-col items-center justify-center h-full text-center space-y-3">
               <Shield size={48} className="text-slate-300" />
               <h3 className="text-lg font-medium text-slate-700 capitalize">{activeTab} Settings</h3>
               <p className="text-slate-500 max-w-sm">This section is available in the production build. Configure your organization settings from the central admin console.</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}

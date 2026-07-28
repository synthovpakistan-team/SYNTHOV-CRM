"use client";

import { useState } from "react";
import { Zap, Play, Settings, Plus, ArrowRight, Globe, Mail, MessageSquare, Briefcase, Users, PhoneCall } from "lucide-react";

export default function AutomationsPage() {
  const [activeTab, setActiveTab] = useState("all");

  const workflows = [
    { id: 1, name: "New Lead Welcome Sequence", status: "Active", trigger: "Form Submission", actions: 3, lastRun: "10 mins ago", category: "marketing" },
    { id: 2, name: "Missed Call Text-Back", status: "Active", trigger: "Missed Call", actions: 1, lastRun: "2 hours ago", category: "calling" },
    { id: 3, name: "Post-Meeting Follow Up", status: "Paused", trigger: "Status Change: Meeting Done", actions: 2, lastRun: "Yesterday", category: "sales" },
    { id: 4, name: "Inactive Client Re-engagement", status: "Active", trigger: "No contact > 30 days", actions: 2, lastRun: "3 days ago", category: "marketing" }
  ];

  const filteredWorkflows = activeTab === "all" ? workflows : workflows.filter(w => w.category === activeTab);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Zap className="text-indigo-600" /> Automations
          </h1>
          <p className="text-slate-500 text-sm mt-1">Build workflows to automate your communication</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm">
          <Plus size={16} /> Create Workflow
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="border-b border-slate-200 bg-slate-50 p-1 flex gap-1">
          <button onClick={() => setActiveTab("all")} className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === "all" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"}`}>All Workflows</button>
          <button onClick={() => setActiveTab("marketing")} className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === "marketing" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"}`}>Marketing</button>
          <button onClick={() => setActiveTab("sales")} className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === "sales" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"}`}>Sales</button>
          <button onClick={() => setActiveTab("calling")} className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === "calling" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"}`}>Calling</button>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredWorkflows.map((workflow) => (
            <div key={workflow.id} className="p-5 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-slate-900">{workflow.name}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${workflow.status === "Active" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600"}`}>
                    {workflow.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><Play size={12} className="text-slate-400"/> Trigger: {workflow.trigger}</span>
                  <span className="flex items-center gap-1"><Settings size={12} className="text-slate-400"/> Actions: {workflow.actions}</span>
                  <span>Last run: {workflow.lastRun}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="text-slate-400 hover:text-indigo-600 p-2 transition-colors">
                  <Settings size={18} />
                </button>
                <button className="text-slate-400 hover:text-indigo-600 p-2 transition-colors">
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Templates section */}
      <h2 className="text-lg font-semibold text-slate-900 mt-8 mb-4">Start with a template</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Website Lead Follow-up", desc: "Instantly SMS and email new form submissions", icon: Globe, color: "text-blue-600 bg-blue-100" },
          { title: "No-Show Rebooking", desc: "Automated sequence to rebook missed appointments", icon: PhoneCall, color: "text-red-600 bg-red-100" },
          { title: "Welcome New Client", desc: "Send onboarding resources and intro emails", icon: Users, color: "text-green-600 bg-green-100" },
          { title: "Review Request", desc: "Ask for a Google review after service completion", icon: MessageSquare, color: "text-amber-600 bg-amber-100" },
        ].map((tpl, i) => (
          <div key={i} className="border border-slate-200 rounded-xl p-5 bg-white hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer group">
            <div className={`w-10 h-10 rounded-lg ${tpl.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
              <tpl.icon size={20} />
            </div>
            <h3 className="font-semibold text-slate-900 mb-1">{tpl.title}</h3>
            <p className="text-slate-500 text-xs">{tpl.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

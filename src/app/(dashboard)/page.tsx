"use client";

import { useState, useEffect } from "react";
import {
  Users,
  Phone,
  CalendarClock,
  MessageSquare,
  PhoneCall,
  CheckSquare,
  Mail,
  Calendar,
} from "lucide-react";
import Link from "next/link";

interface StatsData {
  contactsCount: number;
  tasksCount: number;
  callsCount: number;
  messagesCount: number;
  recentActivity: any[];
}

export default function DashboardPage() {
  const [stats, setStats] = useState<StatsData>({
    contactsCount: 0,
    tasksCount: 0,
    callsCount: 18,
    messagesCount: 32,
    recentActivity: [],
  });
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [statsRes, tasksRes] = await Promise.all([
          fetch("/api/stats"),
          fetch("/api/tasks"),
        ]);

        if (statsRes.ok) {
          const statsData = await statsRes.json();
          setStats(statsData);
        }

        if (tasksRes.ok) {
          const tasksData = await tasksRes.json();
          setTasks(tasksData.slice(0, 5));
        }
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      } finally {
        setLoading(false);
      }
    }
    loadDashboardData();
  }, []);

  const statCards = [
    {
      label: "Total Contacts",
      value: stats.contactsCount.toString(),
      icon: Users,
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
      link: "/contacts",
    },
    {
      label: "Calls Today",
      value: stats.callsCount.toString(),
      icon: Phone,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      link: "/calling",
    },
    {
      label: "Tasks Due",
      value: stats.tasksCount.toString(),
      icon: CalendarClock,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      link: "/calendar",
    },
    {
      label: "Messages",
      value: stats.messagesCount.toString(),
      icon: MessageSquare,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      link: "/messaging",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Welcome back — here's what's happening today in your CRM.
        </p>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.link}
              className="bg-white rounded-xl shadow-sm p-5 flex flex-col gap-3 hover:shadow-md transition-shadow border border-gray-100"
            >
              <div
                className={`w-10 h-10 rounded-full ${stat.iconBg} flex items-center justify-center`}
              >
                <Icon className={`w-5 h-5 ${stat.iconColor}`} />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-0.5">{stat.label}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Bottom Two Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-800">
              Recent Contacts & Activity
            </h2>
            <Link
              href="/contacts"
              className="text-xs text-indigo-600 font-medium hover:underline"
            >
              View all
            </Link>
          </div>
          {loading ? (
            <p className="text-sm text-gray-400">Loading activity...</p>
          ) : stats.recentActivity && stats.recentActivity.length > 0 ? (
            <ul className="space-y-3">
              {stats.recentActivity.map((contact: any) => (
                <li key={contact.id} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-xs">
                    {contact.firstName?.[0]}
                    {contact.lastName?.[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-800 font-medium leading-snug">
                      Added Contact: {contact.firstName} {contact.lastName}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {contact.email} {contact.companyName ? `• ${contact.companyName}` : ""}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No activity logged yet.</p>
          )}
        </div>

        {/* Upcoming Tasks */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-800">
              Real Tasks & Reminders
            </h2>
            <Link
              href="/calendar"
              className="text-xs text-indigo-600 font-medium hover:underline"
            >
              View all
            </Link>
          </div>
          {loading ? (
            <p className="text-sm text-gray-400">Loading tasks...</p>
          ) : tasks.length > 0 ? (
            <ul className="space-y-3">
              {tasks.map((task) => (
                <li key={task.id} className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {task.isCompleted ? (
                      <CheckSquare className="w-4 h-4 text-indigo-600" />
                    ) : (
                      <CalendarClock className="w-4 h-4 text-orange-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm leading-snug ${
                        task.isCompleted
                          ? "line-through text-gray-400"
                          : "text-gray-800 font-medium"
                      }`}
                    >
                      {task.title}
                    </p>
                    {task.description && (
                      <p className="text-xs text-gray-500 mt-0.5">{task.description}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No tasks created yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

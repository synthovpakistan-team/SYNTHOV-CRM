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

const stats = [
  {
    label: "Total Contacts",
    value: "247",
    icon: Users,
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
  },
  {
    label: "Calls Today",
    value: "18",
    icon: Phone,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    label: "Tasks Due",
    value: "5",
    icon: CalendarClock,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
  },
  {
    label: "Messages",
    value: "32",
    icon: MessageSquare,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
];

const recentActivity = [
  {
    icon: PhoneCall,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    text: "Called Marcus Johnson — left voicemail",
    time: "2 min ago",
  },
  {
    icon: Mail,
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
    text: "Email sent to Sandra Lee re: renewal",
    time: "14 min ago",
  },
  {
    icon: MessageSquare,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    text: "SMS received from David Kim",
    time: "31 min ago",
  },
  {
    icon: Users,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    text: "New contact added: Priya Nair",
    time: "1 hr ago",
  },
  {
    icon: CheckSquare,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    text: "Task completed: Follow-up with Acme Corp",
    time: "2 hr ago",
  },
];

const upcomingTasks = [
  {
    id: 1,
    title: "Follow up with BrightPath LLC",
    due: "Today, 3:00 PM",
    done: false,
  },
  {
    id: 2,
    title: "Send proposal to NovaTech Inc",
    due: "Today, 5:00 PM",
    done: false,
  },
  {
    id: 3,
    title: "Review contract with Stellar Co",
    due: "Tomorrow, 10:00 AM",
    done: false,
  },
  {
    id: 4,
    title: "Demo call with Orion Media",
    due: "Jul 30, 2:00 PM",
    done: true,
  },
];

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Welcome back — here's what's happening today.
        </p>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-xl shadow-sm p-5 flex flex-col gap-3"
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
            </div>
          );
        })}
      </div>

      {/* Bottom Two Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-base font-semibold text-gray-800 mb-4">
            Recent Activity
          </h2>
          <ul className="space-y-3">
            {recentActivity.map((item, idx) => {
              const Icon = item.icon;
              return (
                <li key={idx} className="flex items-start gap-3">
                  <div
                    className={`w-8 h-8 rounded-full ${item.iconBg} flex items-center justify-center flex-shrink-0 mt-0.5`}
                  >
                    <Icon className={`w-4 h-4 ${item.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-700 leading-snug">
                      {item.text}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{item.time}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Upcoming Tasks */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-800">
              Upcoming Tasks
            </h2>
            <Link
              href="/calendar"
              className="text-xs text-indigo-600 font-medium hover:underline"
            >
              View all
            </Link>
          </div>
          <ul className="space-y-3">
            {upcomingTasks.map((task) => (
              <li key={task.id} className="flex items-start gap-3">
                <input
                  type="checkbox"
                  defaultChecked={task.done}
                  className="mt-0.5 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm leading-snug ${
                      task.done
                        ? "line-through text-gray-400"
                        : "text-gray-700"
                    }`}
                  >
                    {task.title}
                  </p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Calendar className="w-3 h-3 text-gray-400" />
                    <p className="text-xs text-gray-400">{task.due}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

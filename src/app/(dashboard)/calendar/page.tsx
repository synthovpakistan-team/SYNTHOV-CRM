import { Plus, CheckCircle2, Circle, Clock } from "lucide-react";

const mockTasks = [
  {
    id: 1,
    title: "Follow up with BrightPath LLC",
    due: "Today, 3:00 PM",
    assignee: "Alex M.",
    status: "pending",
  },
  {
    id: 2,
    title: "Send proposal to NovaTech Inc",
    due: "Today, 5:00 PM",
    assignee: "Sarah K.",
    status: "pending",
  },
  {
    id: 3,
    title: "Review contract with Stellar Co",
    due: "Tomorrow, 10:00 AM",
    assignee: "Alex M.",
    status: "pending",
  },
  {
    id: 4,
    title: "Demo call with Orion Media",
    due: "Jul 30, 2:00 PM",
    assignee: "David R.",
    status: "completed",
  },
  {
    id: 5,
    title: "Monthly sync with leadership",
    due: "Aug 1, 9:00 AM",
    assignee: "Team",
    status: "pending",
  },
];

// Simple calendar generation
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const generateCalendarDays = () => {
  // Mock calendar for July 2026
  const blanks = Array(2).fill(null); // Mon, Tue blank before Wed 1st
  const dates = Array.from({ length: 31 }, (_, i) => i + 1);
  return [...blanks, ...dates];
};

export default function CalendarPage() {
  const calendarDays = generateCalendarDays();

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto text-gray-900">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Calendar & Tasks
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your schedule and upcoming to-dos.
          </p>
        </div>
        <button className="inline-flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Add Task
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Column */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 px-1">
              July 2026
            </h2>
            <div className="grid grid-cols-7 gap-1 mb-2">
              {days.map((day) => (
                <div
                  key={day}
                  className="text-center text-xs font-medium text-gray-500 py-1"
                >
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((date, idx) => {
                const isToday = date === 28; // Using July 28 from mock context
                return (
                  <div
                    key={idx}
                    className={`aspect-square flex items-center justify-center text-sm rounded-full ${
                      isToday
                        ? "bg-indigo-600 text-white font-bold"
                        : date
                        ? "text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors"
                        : ""
                    }`}
                  >
                    {date}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tasks List Column */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-base font-semibold text-gray-900">
                Upcoming Tasks
              </h2>
            </div>
            <ul className="divide-y divide-gray-100">
              {mockTasks.map((task) => {
                const isCompleted = task.status === "completed";
                return (
                  <li
                    key={task.id}
                    className="p-4 sm:px-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5 cursor-pointer" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-300 shrink-0 mt-0.5 cursor-pointer hover:text-indigo-600" />
                      )}

                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-sm font-medium ${
                            isCompleted
                              ? "text-gray-400 line-through"
                              : "text-gray-900"
                          }`}
                        >
                          {task.title}
                        </p>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5">
                          <div className="flex items-center text-xs text-gray-500">
                            <Clock className="w-3.5 h-3.5 mr-1" />
                            {task.due}
                          </div>
                          <div className="text-xs text-gray-500">
                            Assignee: <span className="font-medium text-gray-700">{task.assignee}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { Plus, CheckCircle2, Circle, Clock, X } from "lucide-react";
import { format } from "date-fns";

interface Task {
  id: string;
  title: string;
  description?: string | null;
  dueDate: string;
  isCompleted: boolean;
}

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const generateCalendarDays = () => {
  const blanks = Array(2).fill(null);
  const dates = Array.from({ length: 31 }, (_, i) => i + 1);
  return [...blanks, ...dates];
};

export default function CalendarPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const calendarDays = generateCalendarDays();

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/tasks");
      if (res.ok) {
        const data = await res.json();
        setTasks(data);
      }
    } catch (err) {
      console.error("Failed to fetch tasks", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleToggleTask = async (id: string, currentStatus: boolean) => {
    try {
      const updatedStatus = !currentStatus;
      setTasks(
        tasks.map((t) => (t.id === id ? { ...t, isCompleted: updatedStatus } : t))
      );

      await fetch("/api/tasks", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isCompleted: updatedStatus }),
      });
    } catch (err) {
      console.error("Failed to update task", err);
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    try {
      setSubmitting(true);
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          dueDate: dueDate || new Date().toISOString(),
        }),
      });

      if (res.ok) {
        setTitle("");
        setDescription("");
        setDueDate("");
        setIsModalOpen(false);
        fetchTasks();
      }
    } catch (err) {
      console.error("Failed to create task", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto text-gray-900">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Calendar & Tasks</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your schedule and real to-dos.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-auto shadow-sm"
        >
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
                <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((date, idx) => {
                const isToday = date === 28;
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
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
              <h2 className="text-base font-semibold text-gray-900">
                Tasks ({tasks.length})
              </h2>
            </div>
            {loading ? (
              <div className="p-8 text-center text-gray-500">Loading tasks...</div>
            ) : (
              <ul className="divide-y divide-gray-100">
                {tasks.map((task) => (
                  <li key={task.id} className="p-4 sm:px-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start gap-4">
                      <button
                        onClick={() => handleToggleTask(task.id, task.isCompleted)}
                        className="mt-0.5"
                      >
                        {task.isCompleted ? (
                          <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0" />
                        ) : (
                          <Circle className="w-5 h-5 text-gray-300 shrink-0 hover:text-indigo-600" />
                        )}
                      </button>

                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium ${task.isCompleted ? "text-gray-400 line-through" : "text-gray-900"}`}>
                          {task.title}
                        </p>
                        {task.description && (
                          <p className="text-xs text-gray-500 mt-0.5">{task.description}</p>
                        )}
                        <div className="flex items-center text-xs text-gray-400 mt-1">
                          <Clock className="w-3.5 h-3.5 mr-1" />
                          {task.dueDate ? format(new Date(task.dueDate), "MMM dd, yyyy h:mm a") : "No due date"}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            {!loading && tasks.length === 0 && (
              <div className="p-8 text-center text-gray-500">No tasks created yet. Click "+ Add Task" to create one!</div>
            )}
          </div>
        </div>
      </div>

      {/* Add Task Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl relative">
            <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3">
              <h2 className="text-lg font-bold text-gray-900">Add New Task</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Task Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Follow up with client"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Task details..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Due Date
                </label>
                <input
                  type="datetime-local"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50"
                >
                  {submitting ? "Creating..." : "Save Task"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

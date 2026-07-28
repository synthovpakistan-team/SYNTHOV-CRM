"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  LayoutDashboard,
  Users,
  Phone,
  MessageSquare,
  Calendar,
  Zap,
  Settings,
  LogOut,
} from "lucide-react";

const navLinks = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Contacts", href: "/contacts", icon: Users },
  { label: "Calling", href: "/calling", icon: Phone },
  { label: "Messaging", href: "/messaging", icon: MessageSquare },
  { label: "Calendar", href: "/calendar", icon: Calendar },
  { label: "Automations", href: "/automations", icon: Zap },
  { label: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const userInitial = session?.user?.name
    ? session.user.name.charAt(0).toUpperCase()
    : session?.user?.email
    ? session.user.email.charAt(0).toUpperCase()
    : "U";

  return (
    <aside className="fixed top-0 left-0 h-full w-64 bg-slate-900 flex flex-col z-30">
      {/* Brand */}
      <div className="px-6 py-5 border-b border-slate-700/60">
        <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-indigo-400 bg-clip-text text-transparent select-none">
          SYNTHOV CRM
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">Customer Platform</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navLinks.map(({ label, href, icon: Icon }) => {
          const isActive =
            href === "/" ? pathname === "/" : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group ${
                isActive
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/40"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon
                size={18}
                className={`shrink-0 transition-colors duration-150 ${
                  isActive
                    ? "text-white"
                    : "text-slate-500 group-hover:text-indigo-400"
                }`}
              />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="border-t border-slate-700/60 px-3 py-4 space-y-3">
        {/* User info */}
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-slate-800/60">
          <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center shrink-0">
            <span className="text-xs font-semibold text-white">
              {userInitial}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            {session?.user?.name && (
              <p className="text-sm font-medium text-white truncate">
                {session.user.name}
              </p>
            )}
            {session?.user?.email && (
              <p className="text-xs text-slate-400 truncate">
                {session.user.email}
              </p>
            )}
          </div>
        </div>

        {/* Sign out */}
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-red-400 transition-all duration-150 group"
        >
          <LogOut
            size={18}
            className="shrink-0 text-slate-500 group-hover:text-red-400 transition-colors duration-150"
          />
          Sign Out
        </button>
      </div>
    </aside>
  );
}

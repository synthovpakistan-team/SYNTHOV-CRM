"use client";

import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Search, Bell } from "lucide-react";

const pageTitles: Record<string, string> = {
  "/": "Dashboard",
  "/contacts": "Contacts",
  "/calling": "Calling",
  "/messaging": "Messaging",
  "/calendar": "Calendar",
  "/automations": "Automations",
  "/settings": "Settings",
};

function getPageTitle(pathname: string): string {
  if (pageTitles[pathname]) return pageTitles[pathname];
  // Match prefix-based routes (e.g. /contacts/123 -> Contacts)
  for (const [route, title] of Object.entries(pageTitles)) {
    if (route !== "/" && pathname.startsWith(route)) return title;
  }
  return "SYNTHOV CRM";
}

export default function TopNavigation() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const pageTitle = getPageTitle(pathname);

  const userInitial = session?.user?.name
    ? session.user.name.charAt(0).toUpperCase()
    : session?.user?.email
    ? session.user.email.charAt(0).toUpperCase()
    : "U";

  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-white border-b border-gray-200 flex items-center px-6 z-20">
      {/* Page title / breadcrumb */}
      <div className="flex-1">
        <h2 className="text-base font-semibold text-gray-800">{pageTitle}</h2>
        <p className="text-xs text-gray-400 leading-none mt-0.5">
          SYNTHOV CRM
        </p>
      </div>

      {/* Search bar */}
      <div className="relative mx-4 hidden sm:block">
        <Search
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        />
        <input
          type="text"
          placeholder="Search..."
          className="pl-9 pr-4 py-1.5 text-sm bg-gray-100 border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-56 transition-all duration-150"
        />
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-3">
        {/* Notification bell */}
        <button
          className="relative p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors duration-150"
          aria-label="Notifications"
        >
          <Bell size={18} />
          {/* Red dot badge */}
          <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full ring-2 ring-white" />
        </button>

        {/* User avatar */}
        <button
          className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-semibold hover:bg-indigo-700 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          aria-label="User menu"
        >
          {userInitial}
        </button>
      </div>
    </header>
  );
}

import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Phone,
  Building2,
  PhoneCall,
  MessageSquare,
  Calendar,
  Clock,
} from "lucide-react";

// For a real app, this data would be fetched based on the ID param
const mockContact = {
  id: "1",
  name: "Marcus Johnson",
  email: "marcus.j@example.com",
  phone: "(555) 123-4567",
  company: "Acme Corp",
  status: "Lead",
  avatar: "MJ",
};

const activityTimeline = [
  {
    id: 1,
    type: "call",
    icon: PhoneCall,
    title: "Outbound Call",
    description: "Left a voicemail regarding the Q3 product update.",
    date: "Today, 10:30 AM",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    id: 2,
    type: "message",
    icon: MessageSquare,
    title: "Email Sent",
    description: "Follow-up email with pricing attachments.",
    date: "Yesterday, 2:15 PM",
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
  },
  {
    id: 3,
    type: "meeting",
    icon: Calendar,
    title: "Discovery Call",
    description: "Initial 30-min discovery meeting via Zoom.",
    date: "Jul 24, 2026, 1:00 PM",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
];

export default function ContactDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Lead":
        return "bg-yellow-100 text-yellow-800";
      case "Prospect":
        return "bg-blue-100 text-blue-800";
      case "Client":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      {/* Back Button */}
      <div>
        <Link
          href="/contacts"
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:underline"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Contacts
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Contact Profile */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-2xl font-bold mb-4">
                {mockContact.avatar}
              </div>
              <h1 className="text-xl font-bold text-gray-900">
                {mockContact.name}
              </h1>
              <div className="mt-2">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                    mockContact.status
                  )}`}
                >
                  {mockContact.status}
                </span>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex items-center text-sm">
                <Mail className="w-4 h-4 text-gray-400 shrink-0 mr-3" />
                <span className="text-gray-700 truncate">
                  {mockContact.email}
                </span>
              </div>
              <div className="flex items-center text-sm">
                <Phone className="w-4 h-4 text-gray-400 shrink-0 mr-3" />
                <span className="text-gray-700">{mockContact.phone}</span>
              </div>
              <div className="flex items-center text-sm">
                <Building2 className="w-4 h-4 text-gray-400 shrink-0 mr-3" />
                <span className="text-gray-700">{mockContact.company}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 grid grid-cols-2 gap-3">
              <Link
                href={`/calling?number=${encodeURIComponent(
                  mockContact.phone
                )}`}
                className="w-full inline-flex justify-center items-center px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
              >
                <PhoneCall className="w-4 h-4 mr-2" />
                Call
              </Link>
              <button className="w-full inline-flex justify-center items-center px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors">
                <MessageSquare className="w-4 h-4 mr-2" />
                Message
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Activity & Notes */}
        <div className="lg:col-span-2 space-y-6">
          {/* Notes Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-4">
              Notes
            </h2>
            <div className="space-y-3">
              <textarea
                rows={3}
                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm text-gray-900 border p-3 placeholder:text-gray-400"
                placeholder="Add a note about this contact..."
              ></textarea>
              <div className="flex justify-end">
                <button className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2">
                  Save Note
                </button>
              </div>
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-6">
              Activity Timeline
            </h2>
            <div className="relative pl-4 border-l-2 border-gray-100 space-y-8">
              {activityTimeline.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.id} className="relative">
                    {/* Circle on the line */}
                    <div
                      className={`absolute -left-[25px] w-8 h-8 rounded-full ${item.iconBg} flex items-center justify-center`}
                    >
                      <Icon className={`w-4 h-4 ${item.iconColor}`} />
                    </div>

                    <div className="ml-6 space-y-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                        <h3 className="text-sm font-medium text-gray-900">
                          {item.title}
                        </h3>
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="w-3 h-3 mr-1" />
                          {item.date}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

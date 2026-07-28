"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Filter, Phone, Eye, Edit2 } from "lucide-react";

type ContactStatus = "Lead" | "Prospect" | "Client";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: ContactStatus;
}

const mockContacts: Contact[] = [
  {
    id: "1",
    name: "Marcus Johnson",
    email: "marcus.j@example.com",
    phone: "(555) 123-4567",
    company: "Acme Corp",
    status: "Lead",
  },
  {
    id: "2",
    name: "Sandra Lee",
    email: "slee@novatech.io",
    phone: "(555) 987-6543",
    company: "NovaTech Inc",
    status: "Client",
  },
  {
    id: "3",
    name: "David Kim",
    email: "dkim@stellar.co",
    phone: "(555) 456-7890",
    company: "Stellar Co",
    status: "Prospect",
  },
  {
    id: "4",
    name: "Priya Nair",
    email: "priya@orionmedia.com",
    phone: "(555) 234-5678",
    company: "Orion Media",
    status: "Lead",
  },
  {
    id: "5",
    name: "James Wilson",
    email: "jwilson@brightpath.net",
    phone: "(555) 876-5432",
    company: "BrightPath LLC",
    status: "Client",
  },
  {
    id: "6",
    name: "Emily Chen",
    email: "echen@globalreach.com",
    phone: "(555) 345-6789",
    company: "Global Reach",
    status: "Prospect",
  },
  {
    id: "7",
    name: "Michael Brown",
    email: "mbrown@techsolutions.com",
    phone: "(555) 765-4321",
    company: "Tech Solutions",
    status: "Client",
  },
  {
    id: "8",
    name: "Sarah Davis",
    email: "sdavis@innoways.io",
    phone: "(555) 901-2345",
    company: "InnoWays",
    status: "Lead",
  },
];

export default function ContactsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredContacts = mockContacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: ContactStatus) => {
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
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Contacts</h1>
        <button className="inline-flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 w-full sm:w-auto">
          + Add Contact
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900 placeholder-gray-500"
          />
        </div>
        <button className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          <Filter className="h-4 w-4 mr-2 text-gray-500" />
          Filter
        </button>
      </div>

      {/* Data Table */}
      <div className="bg-white border text-gray-900 border-gray-200 rounded-xl shadow-sm overflow-hidden text-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell"
                >
                  Contact Info
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell"
                >
                  Company
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredContacts.map((contact) => (
                <tr key={contact.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">
                      {contact.name}
                    </div>
                    {/* Mobile only visible info */}
                    <div className="sm:hidden text-xs text-gray-500 mt-1">
                      {contact.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                    <div className="text-gray-900">{contact.email}</div>
                    <div className="text-gray-500 text-xs mt-0.5">
                      {contact.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                    <div className="text-gray-900">{contact.company}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        contact.status
                      )}`}
                    >
                      {contact.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/contacts/${contact.id}`}
                        className="p-1.5 text-gray-400 hover:text-indigo-600 rounded flex items-center justify-center transition-colors hover:bg-indigo-50"
                        title="View Contact"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      <Link
                        href={`/calling?number=${encodeURIComponent(
                          contact.phone
                        )}`}
                        className="p-1.5 text-gray-400 hover:text-green-600 rounded flex items-center justify-center transition-colors hover:bg-green-50"
                        title="Call Contact"
                      >
                        <Phone className="h-4 w-4" />
                      </Link>
                      <button
                        className="p-1.5 text-gray-400 hover:text-gray-700 rounded flex items-center justify-center transition-colors hover:bg-gray-100"
                        title="Edit Contact"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredContacts.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No contacts found matching "{searchTerm}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

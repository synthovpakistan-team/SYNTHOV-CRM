"use client";

import { useState } from "react";
import { Send, Search, MessageSquare, Phone, Mail, Filter, Plus, ChevronRight } from "lucide-react";

const contacts = [
  { id: "1", name: "Sarah Mitchell", email: "sarah.m@acmecorp.com", phone: "+15552014890", avatar: "SM", lastMessage: "Looking forward to our meeting tomorrow!", lastTime: "2m ago", unread: 2 },
  { id: "2", name: "James Rodriguez", email: "james.r@techvision.co", phone: "+15553127745", avatar: "JR", lastMessage: "Can you send me the proposal?", lastTime: "1h ago", unread: 0 },
  { id: "3", name: "Emily Chen", email: "emily.c@designstudio.io", phone: "+15558872341", avatar: "EC", lastMessage: "Thank you for the update.", lastTime: "3h ago", unread: 1 },
  { id: "4", name: "Michael Thompson", email: "m.thompson@globalinc.com", phone: "+15554439012", avatar: "MT", lastMessage: "Please confirm the delivery date.", lastTime: "Yesterday", unread: 0 },
  { id: "5", name: "Jessica Park", email: "jessica.p@innovate.ai", phone: "+15556673398", avatar: "JP", lastMessage: "Looks great! Let's move forward.", lastTime: "Yesterday", unread: 3 },
];

const mockMessages: { [key: string]: { id: string; text: string; sender: "me" | "them"; time: string }[] } = {
  "1": [
    { id: "1", text: "Hi Sarah, just wanted to follow up on our conversation last week.", sender: "me", time: "10:00 AM" },
    { id: "2", text: "Of course! I've been reviewing your proposal.", sender: "them", time: "10:05 AM" },
    { id: "3", text: "Great! Any questions I can answer for you?", sender: "me", time: "10:07 AM" },
    { id: "4", text: "Looking forward to our meeting tomorrow!", sender: "them", time: "10:12 AM" },
  ],
  "2": [
    { id: "1", text: "Hello James, following up on our demo.", sender: "me", time: "9:00 AM" },
    { id: "2", text: "Can you send me the proposal?", sender: "them", time: "9:15 AM" },
  ],
};

export default function MessagingPage() {
  const [selectedContact, setSelectedContact] = useState(contacts[0]);
  const [newMessage, setNewMessage] = useState("");
  const [activeTab, setActiveTab] = useState<"sms" | "email">("sms");

  const messages = mockMessages[selectedContact.id] || [];

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    // In production: send via Twilio SMS or SendGrid email
    setNewMessage("");
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex overflow-hidden">
      {/* Contacts Sidebar */}
      <div className="w-80 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-4 border-b border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-lg font-bold text-slate-900">Messaging</h1>
            <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg">
              <Plus size={18} />
            </button>
          </div>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {contacts.map((contact) => (
            <button
              key={contact.id}
              onClick={() => setSelectedContact(contact)}
              className={`w-full p-4 text-left flex items-center gap-3 border-b border-slate-100 hover:bg-slate-50 transition-colors ${selectedContact.id === contact.id ? "bg-indigo-50 border-l-2 border-l-indigo-600" : ""}`}
            >
              <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                {contact.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-slate-900 font-medium text-sm truncate">{contact.name}</p>
                  <span className="text-slate-400 text-xs flex-shrink-0">{contact.lastTime}</span>
                </div>
                <p className="text-slate-500 text-xs truncate">{contact.lastMessage}</p>
              </div>
              {contact.unread > 0 && (
                <span className="flex-shrink-0 w-5 h-5 bg-indigo-600 text-white text-xs rounded-full flex items-center justify-center">
                  {contact.unread}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-slate-50">
        {/* Chat Header */}
        <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-bold">
              {selectedContact.avatar}
            </div>
            <div>
              <p className="font-semibold text-slate-900">{selectedContact.name}</p>
              <p className="text-slate-500 text-sm">{selectedContact.phone}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex bg-slate-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab("sms")}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 ${activeTab === "sms" ? "bg-white shadow-sm text-indigo-600" : "text-slate-600 hover:text-slate-900"}`}
              >
                <MessageSquare size={14} /> SMS
              </button>
              <button
                onClick={() => setActiveTab("email")}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 ${activeTab === "email" ? "bg-white shadow-sm text-indigo-600" : "text-slate-600 hover:text-slate-900"}`}
              >
                <Mail size={14} /> Email
              </button>
            </div>
            <a href={`/calling?number=${selectedContact.phone}`} className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
              <Phone size={18} />
            </a>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${msg.sender === "me" ? "bg-indigo-600 text-white rounded-br-sm" : "bg-white text-slate-900 rounded-bl-sm shadow-sm"}`}>
                <p className="text-sm">{msg.text}</p>
                <p className={`text-xs mt-1 ${msg.sender === "me" ? "text-indigo-200" : "text-slate-400"}`}>{msg.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="bg-white border-t border-slate-200 px-6 py-4">
          <div className="flex items-end gap-3">
            <div className="flex-1 bg-slate-100 rounded-xl p-3">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder={`Type a ${activeTab === "sms" ? "text message" : "email"}...`}
                className="w-full bg-transparent text-sm text-slate-900 placeholder-slate-400 resize-none focus:outline-none"
                rows={2}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
              />
            </div>
            <button
              onClick={sendMessage}
              disabled={!newMessage.trim()}
              className="p-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white rounded-xl transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Phone, PhoneOff, Mic, MicOff, Volume2, VolumeX, Hash, Delete, Users } from "lucide-react";
import Link from "next/link";

const recentCalls = [
  { id: "1", name: "Sarah Mitchell", phone: "+1 (555) 201-4890", type: "Outbound", duration: "3m 42s", time: "2 hrs ago", status: "completed" },
  { id: "2", name: "James Rodriguez", phone: "+1 (555) 312-7745", type: "Inbound", duration: "1m 18s", time: "4 hrs ago", status: "completed" },
  { id: "3", name: "Emily Chen", phone: "+1 (555) 887-2341", type: "Outbound", duration: "0m 00s", time: "Yesterday", status: "missed" },
  { id: "4", name: "Michael Thompson", phone: "+1 (555) 443-9012", type: "Outbound", duration: "8m 05s", time: "Yesterday", status: "completed" },
  { id: "5", name: "Jessica Park", phone: "+1 (555) 667-3398", type: "Inbound", duration: "2m 54s", time: "2 days ago", status: "completed" },
];

const dialpadKeys = [
  ["1", ""],
  ["2", "ABC"],
  ["3", "DEF"],
  ["4", "GHI"],
  ["5", "JKL"],
  ["6", "MNO"],
  ["7", "PQRS"],
  ["8", "TUV"],
  ["9", "WXYZ"],
  ["*", ""],
  ["0", "+"],
  ["#", ""],
];

export default function CallingPage() {
  const [dialedNumber, setDialedNumber] = useState("");
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);
  const [callTimer, setCallTimer] = useState(0);

  const handleKeyPress = (key: string) => {
    setDialedNumber((prev) => prev + key);
  };

  const handleDelete = () => {
    setDialedNumber((prev) => prev.slice(0, -1));
  };

  const handleCall = () => {
    if (!dialedNumber) return;
    setIsCallActive(true);
    // In production: initialize Twilio device.connect({ params: { To: dialedNumber } })
  };

  const handleHangUp = () => {
    setIsCallActive(false);
    setIsMuted(false);
    setCallTimer(0);
    // In production: activeCall.disconnect()
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Calling Center</h1>
          <p className="text-slate-500 text-sm mt-1">Make calls directly from your browser</p>
        </div>
        <Link href="/contacts" className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
          <Users size={16} /> Call a Contact
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Dialer Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Web Dialer</h2>

          {/* Status Info Banner */}
          <div className="mb-4 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-amber-800 text-sm">
            <strong>Setup Required:</strong> Enter your Twilio credentials in the <code className="bg-amber-100 px-1 rounded">.env</code> file to enable live calling.
          </div>

          {/* Phone Number Display */}
          <div className="bg-slate-900 rounded-xl p-4 mb-4 text-center min-h-[72px] flex items-center justify-center">
            {isCallActive ? (
              <div>
                <p className="text-green-400 text-xs font-medium mb-1">● ACTIVE CALL</p>
                <p className="text-white text-2xl font-mono tracking-widest">{dialedNumber}</p>
              </div>
            ) : (
              <p className="text-white text-2xl font-mono tracking-widest">
                {dialedNumber || <span className="text-slate-500 text-base">Enter number...</span>}
              </p>
            )}
          </div>

          {/* Dialpad */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {dialpadKeys.map(([key, sub], idx) => (
              <button
                key={idx}
                onClick={() => handleKeyPress(key)}
                disabled={isCallActive}
                className="bg-slate-100 hover:bg-slate-200 disabled:opacity-50 rounded-xl py-3 text-center transition-colors"
              >
                <span className="block text-slate-900 font-semibold text-lg">{key}</span>
                {sub && <span className="block text-slate-500 text-xs">{sub}</span>}
              </button>
            ))}
          </div>

          {/* Delete Button */}
          <div className="flex justify-end mb-4">
            <button onClick={handleDelete} disabled={isCallActive} className="text-slate-400 hover:text-slate-600 p-2">
              <Delete size={20} />
            </button>
          </div>

          {/* Call Controls */}
          {isCallActive ? (
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-4 rounded-full transition-colors ${isMuted ? "bg-red-100 text-red-600" : "bg-slate-100 text-slate-600"}`}
              >
                {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
              </button>
              <button
                onClick={handleHangUp}
                className="p-5 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors"
              >
                <PhoneOff size={24} />
              </button>
              <button
                onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                className={`p-4 rounded-full transition-colors ${isSpeakerOn ? "bg-indigo-100 text-indigo-600" : "bg-slate-100 text-slate-600"}`}
              >
                {isSpeakerOn ? <Volume2 size={20} /> : <VolumeX size={20} />}
              </button>
            </div>
          ) : (
            <button
              onClick={handleCall}
              disabled={!dialedNumber}
              className="w-full py-4 rounded-xl bg-green-600 hover:bg-green-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <Phone size={20} /> Call
            </button>
          )}
        </div>

        {/* Recent Calls */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Recent Calls</h2>
          <div className="space-y-3">
            {recentCalls.map((call) => (
              <div key={call.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${call.status === "missed" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-700"}`}>
                    {call.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-slate-900 font-medium text-sm">{call.name}</p>
                    <p className="text-slate-500 text-xs">{call.phone} · {call.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-xs font-medium ${call.status === "missed" ? "text-red-500" : "text-slate-600"}`}>
                    {call.status === "missed" ? "Missed" : call.duration}
                  </p>
                  <p className="text-slate-400 text-xs">{call.time}</p>
                </div>
                <button
                  onClick={() => { setDialedNumber(call.phone.replace(/\D/g, "")); }}
                  className="ml-2 p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                >
                  <Phone size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

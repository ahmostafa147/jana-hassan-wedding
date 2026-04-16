"use client";

import { useState } from "react";

interface Rsvp {
  id: number;
  name: string;
  quantity: number;
  created_at: string;
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [rsvps, setRsvps] = useState<Rsvp[]>([]);
  const [totalGuests, setTotalGuests] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRsvps = async (pw: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/rsvps", {
        headers: { "x-admin-password": pw },
      });
      if (!res.ok) {
        if (res.status === 401) throw new Error("Wrong password");
        throw new Error("Failed to fetch");
      }
      const data = await res.json();
      setRsvps(data.rsvps);
      setTotalGuests(data.totalGuests);
      setAuthenticated(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetchRsvps(password);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Remove this RSVP?")) return;
    try {
      await fetch("/api/admin/rsvps", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify({ id }),
      });
      fetchRsvps(password);
    } catch {
      alert("Failed to delete");
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#F5F0EB] flex items-center justify-center p-6">
        <form onSubmit={handleLogin} className="bg-white rounded-lg shadow-md p-8 w-full max-w-sm">
          <h1 className="text-xl font-semibold text-gray-800 mb-6 text-center">Admin Login</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-400 mb-4"
          />
          {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gray-800 text-white rounded-lg text-sm font-medium hover:bg-gray-700 disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F0EB] p-6 sm:p-10">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">RSVPs</h1>
          <button
            onClick={() => fetchRsvps(password)}
            className="text-sm text-gray-500 hover:text-gray-800 cursor-pointer"
          >
            Refresh
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-lg p-5 shadow-sm">
            <p className="text-sm text-gray-500">Total RSVPs</p>
            <p className="text-3xl font-semibold text-gray-800 mt-1">{rsvps.length}</p>
          </div>
          <div className="bg-white rounded-lg p-5 shadow-sm">
            <p className="text-sm text-gray-500">Total Guests</p>
            <p className="text-3xl font-semibold text-gray-800 mt-1">{totalGuests}</p>
          </div>
        </div>

        {/* RSVP List */}
        {rsvps.length === 0 ? (
          <div className="bg-white rounded-lg p-10 shadow-sm text-center">
            <p className="text-gray-400">No RSVPs yet</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">Name</th>
                  <th className="text-center text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">Guests</th>
                  <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">Date</th>
                  <th className="px-3 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {rsvps.map((rsvp) => (
                  <tr key={rsvp.id} className="border-b border-gray-50 last:border-0">
                    <td className="px-5 py-4 text-sm text-gray-800">{rsvp.name}</td>
                    <td className="px-5 py-4 text-sm text-gray-600 text-center">{rsvp.quantity}</td>
                    <td className="px-5 py-4 text-xs text-gray-400 text-right">
                      {new Date(rsvp.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-3 py-4">
                      <button
                        onClick={() => handleDelete(rsvp.id)}
                        className="text-xs text-red-400 hover:text-red-600 cursor-pointer"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

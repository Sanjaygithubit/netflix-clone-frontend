import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem("userEmail") || "Guest";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 md:px-12 py-4 border-b border-zinc-800/80 bg-black/70 backdrop-blur">
        <div className="text-2xl font-extrabold tracking-[0.25em] text-red-600">
          NETFLIX
        </div>
        <button
          onClick={handleLogout}
          className="rounded-full bg-zinc-900 border border-zinc-600 px-4 py-1.5 text-xs md:text-sm hover:bg-zinc-800"
        >
          Logout
        </button>
      </header>

      {/* Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 text-center space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold">
          Welcome, <span className="text-red-400">{email}</span> 👋
        </h1>
        <p className="max-w-xl text-sm md:text-base text-zinc-400">
          You’ve successfully passed the{" "}
          <span className="font-semibold text-zinc-200">
            mock authentication
          </span>
          . In a real app, this dashboard would show your personalized Netflix
          content, watchlist, and recommendations.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mt-4">
          <div className="rounded-2xl bg-zinc-900/70 border border-zinc-700/70 p-4 text-left">
            <p className="text-xs text-zinc-400 mb-1">Status</p>
            <p className="text-sm font-semibold text-green-400">
              Logged in (Mock)
            </p>
          </div>
          <div className="rounded-2xl bg-zinc-900/70 border border-zinc-700/70 p-4 text-left">
            <p className="text-xs text-zinc-400 mb-1">Tech Stack</p>
            <p className="text-sm font-semibold text-zinc-200">
              React · Tailwind · Node · Express
            </p>
          </div>
         
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

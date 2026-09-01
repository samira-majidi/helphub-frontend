'use client'
import React from "react";
// ایمپورت‌های مربوط به آیکون‌ها و کامپوننت‌های قبلی
import { Bell, Settings, Activity } from "lucide-react"; 
import ExpertProfile from "@/entities/expert/ui/ExpertProfile"; 
import { ExpertStatusManager } from "@/entities/expert/ui/ExpertStatusManager";

export default function ExpertDashboardPage() {
  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-8 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Section */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Expert Dashboard ✨
            </h1>
            <p className="text-sm text-slate-500 mt-1.5 font-medium">
              Manage your professional presence and track your activity.
            </p>
          </div>
          
          {/* Top Right Corner: Status Manager + Action Icons */}
          <div className="flex items-center gap-4">
            <ExpertStatusManager />
            <div className="flex items-center gap-3 border-l-2 border-slate-100 pl-4">
              <button className="p-2.5 text-slate-400 hover:text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all">
                <Bell size={20} />
              </button>
              <button className="p-2.5 text-slate-400 hover:text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all">
                <Settings size={20} />
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: The Expert Profile Widget */}
          <div className="lg:col-span-4 flex justify-center lg:justify-start">
            <ExpertProfile />
          </div>

          {/* Right Column: Other Dashboard Widgets */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Widget 1: Quick Stats Placeholder */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-center gap-2 mb-6">
                <Activity className="text-blue-500" size={24} />
                <h3 className="text-lg font-bold text-slate-800">
                  Recent Activity Overview
                </h3>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <p className="text-xs text-slate-500 font-bold uppercase mb-1">Total Views</p>
                  <p className="text-2xl font-black text-slate-800">1,248</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <p className="text-xs text-slate-500 font-bold uppercase mb-1">New Messages</p>
                  <p className="text-2xl font-black text-emerald-600">5</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 col-span-2 md:col-span-1">
                  <p className="text-xs text-slate-500 font-bold uppercase mb-1">Profile Rating</p>
                  <p className="text-2xl font-black text-amber-500">4.9/5</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}

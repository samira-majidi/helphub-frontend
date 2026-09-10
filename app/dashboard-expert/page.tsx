'use client'
import React from "react";
import dynamic from "next/dynamic"; // 👈 اضافه شد
import { Bell, Settings, Loader2 } from "lucide-react"; 
import ExpertProfile from "@/entities/expert/ui/ExpertProfile"; 
import { ExpertStatusManager } from "@/entities/expert/ui/ExpertStatusManager";

// 👇 بارگذاری تنبل لیست پیام‌ها
const DashboardSimpleConversationList = dynamic(
  () => import("@/widget/converstation-item/DashboardSimpleConversationList"),
  {
    loading: () => (
      <div className="p-8 flex items-center justify-center text-slate-400">
        <Loader2 className="w-6 h-6 animate-spin text-amber-500" />
      </div>
    ),
    ssr: false,
  }
);

export default function ExpertDashboardPage() {
  return (
    <main className="min-h-screen bg-[#F8F9FA] p-6 font-sans">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-6">
        
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:px-8 rounded-2xl border border-gray-100 shadow-sm w-full">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
              Expert Dashboard <span className="text-xl">✨</span>
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage your professional presence and track your activity.
            </p>
          </div>
          
          <div className="flex items-center gap-6 mt-2 sm:mt-0">
            <ExpertStatusManager />
            
            <div className="hidden sm:flex items-center gap-3 border-l border-gray-100 pl-6">
              <button className="p-2 text-gray-400 hover:text-gray-600 bg-white hover:bg-gray-50 rounded-full border border-gray-100 transition-all shadow-sm">
                <Bell size={18} />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 bg-white hover:bg-gray-50 rounded-full border border-gray-100 transition-all shadow-sm">
                <Settings size={18} />
              </button>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <aside className="lg:col-span-4">
            <ExpertProfile />
          </aside>

          <section className="lg:col-span-8 flex flex-col gap-6">
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-2 md:grid md:grid-cols-3 md:pb-0 md:overflow-visible [&::-webkit-scrollbar]:hidden">
              <div className="min-w-[260px] md:min-w-0 snap-center shrink-0 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
                <h3 className="text-sm font-bold text-gray-800 mb-4">Total Views</h3>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-3xl font-black text-gray-900">1,248</p>
                    <p className="text-xs text-emerald-500 font-semibold mt-1">+18% <span className="text-gray-400 font-normal">this week</span></p>
                  </div>
                  <div className="w-16 h-8 text-blue-400">
                    <svg viewBox="0 0 100 30" className="w-full h-full stroke-current stroke-2 fill-none stroke-linecap-round stroke-linejoin-round">
                      <path d="M0 25 L20 15 L40 20 L60 5 L80 10 L100 0" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Stat Card 2: New Messages */}
              <div className="min-w-[260px] md:min-w-0 snap-center shrink-0 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
                  <h3 className="text-sm font-bold text-gray-800 mb-4">New Messages</h3>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-3xl font-black text-amber-500">5</p>
                      <p className="text-xs text-gray-400 font-medium mt-1">+2 unread</p>
                    </div>
                    <div className="p-3 bg-amber-50 rounded-2xl text-amber-500">
                       <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7" /><rect x="3" y="5" width="18" height="14" rx="2" /></svg>
                    </div>
                  </div>
              </div>

              {/* Stat Card 3: Profile Rating */}
              <div className="min-w-[260px] md:min-w-0 snap-center shrink-0 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
                <h3 className="text-sm font-bold text-gray-800 mb-4">Profile Rating</h3>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-3xl font-black text-amber-500">4.9/5</p>
                    <div className="flex text-amber-400 mt-1 gap-0.5">
                        {[...Array(5)].map((_, i) => (<svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>))}
                    </div>
                    <p className="text-[10px] text-gray-400 font-medium mt-1">Based on 86 reviews</p>
                  </div>
                  <div className="p-3 bg-amber-50 rounded-2xl text-amber-500">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-5 sm:p-6 flex justify-between items-center">
                  <h3 className="text-base font-bold text-gray-800">Recent Messages</h3>
                  <a href="#" className="text-sm font-medium text-amber-600 hover:text-amber-500">View all</a>
              </div>
              <DashboardSimpleConversationList />
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-base font-bold text-gray-800">Profile Views</h3>
                <select className="text-xs sm:text-sm text-gray-500 bg-white border border-gray-200 rounded-lg px-3 py-1.5 outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 cursor-pointer shadow-sm transition-all">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>This Year</option>
                </select>
              </div>
              <div className="relative h-64 w-full mt-4">
                <div className="absolute inset-0 flex flex-col justify-between text-[10px] text-gray-400 pb-6">
                  {[400, 300, 200, 100, 0].map((val) => (<div key={val} className="flex items-center w-full gap-4"><span className="w-6 text-right font-medium">{val}</span><div className="flex-1 border-b border-gray-100 dashed"></div></div>))}
                </div>
                <div className="absolute inset-0 left-10 pb-6">
                  <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
                    <defs><linearGradient id="amberGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f59e0b" stopOpacity="0.2" /><stop offset="100%" stopColor="#f59e0b" stopOpacity="0" /></linearGradient></defs>
                    <polygon points="0,100 0,70 16.6,55 33.3,75 50,45 66.6,55 83.3,25 100,45 100,100" fill="url(#amberGradient)" />
                    <polyline points="0,70 16.6,55 33.3,75 50,45 66.6,55 83.3,25 100,45" fill="none" stroke="#f59e0b" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                    {[{ x: 0, y: 70 },{ x: 16.6, y: 55 },{ x: 33.3, y: 75 },{ x: 50, y: 45 },{ x: 66.6, y: 55 },{ x: 83.3, y: 25 },{ x: 100, y: 45 }].map((point, i) => (<circle key={i} cx={point.x} cy={point.y} r="4" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" vectorEffect="non-scaling-stroke" className="transition-all hover:r-6 cursor-pointer" />))}
                  </svg>
                </div>
                <div className="absolute bottom-0 left-10 right-0 flex justify-between text-[10px] text-gray-400 font-medium">
                  <span>May 12</span><span>May 13</span><span>May 14</span><span>May 15</span><span>May 16</span><span>May 17</span><span>May 18</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

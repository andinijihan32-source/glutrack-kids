"use client";

import React, { useEffect, useState } from "react";
import { TrendingUp, Award, AlertCircle } from "lucide-react";
import { useApp } from "@/lib/appContext";

interface FoodLogEntry {
  id: string; foodName: string; sugarGrams: number; consumedAt: string;
}

export default function WeeklyTrendsPage() {
  const { user, familyAccounts } = useApp();
  const childAccounts = familyAccounts.filter((u) => u.role === "CHILDREN");
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [logs, setLogs] = useState<FoodLogEntry[]>([]);

  useEffect(() => {
    if (!user) return;
    if (user.role === "CHILDREN") {
      setSelectedUserId(user.id);
    } else if (childAccounts.length > 0 && !childAccounts.some((c) => c.id === selectedUserId)) {
      setSelectedUserId(childAccounts[0].id);
    } else if (childAccounts.length === 0) {
      setSelectedUserId(user.id);
    }
  }, [user, childAccounts, selectedUserId]);

  useEffect(() => {
    if (!selectedUserId) return;
    fetch(`/api/logs?userId=${selectedUserId}`, { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => setLogs(d.logs || []));
  }, [selectedUserId]);

  if (!user) return null;

  const targetUser = familyAccounts.find((u) => u.id === selectedUserId) || user;
  const limit = targetUser.dailySugarLimit || 25;

  const last7Days = Array.from({ length: 7 }).map((_, idx) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - idx));
    const key = d.toISOString().split("T")[0];
    const dayLabel = d.toLocaleDateString("id-ID", { weekday: "short", day: "numeric" });
    const total = Math.round(logs.filter((l) => l.consumedAt.startsWith(key)).reduce((s, l) => s + l.sugarGrams, 0) * 10) / 10;
    return { key, dayLabel, total };
  });

  const maxVal = Math.max(limit * 1.5, ...last7Days.map((d) => d.total), 40);
  const weeklyAvg = Math.round((last7Days.reduce((s, d) => s + d.total, 0) / 7) * 10) / 10;

  const sortedDays = [...last7Days].sort((a, b) => b.total - a.total);
  const highestDay = sortedDays[0];
  const lowestDay = sortedDays[sortedDays.length - 1];

  const validKeys = new Set(last7Days.map((d) => d.key));
  const foodMap: Record<string, number> = {};
  logs.filter((l) => validKeys.has(l.consumedAt.split("T")[0])).forEach((l) => {
    foodMap[l.foodName] = (foodMap[l.foodName] || 0) + l.sugarGrams;
  });

  const topFoods = Object.entries(foodMap)
    .map(([name, total]) => ({ name, total: Math.round(total * 10) / 10 }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {user.role !== "CHILDREN" && childAccounts.length > 0 && (
        <div className="bg-white p-4 rounded-3xl border-2 border-teal-100 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs font-extrabold text-slate-700">Laporan Mingguan Anak:</span>
          <div className="flex gap-2">
            {childAccounts.map((c) => (
              <button key={c.id} onClick={() => setSelectedUserId(c.id)} className={`px-4 py-2 rounded-full text-xs font-extrabold ${selectedUserId === c.id ? "bg-brand-turquoise text-white" : "bg-slate-100 text-slate-600"}`}>
                {c.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-[2rem] border-2 border-teal-100 shadow-sm">
          <p className="text-xs font-extrabold text-slate-400">Rata-Rata Harian (7 Hari)</p>
          <p className="text-3xl font-black text-brand-turquoise mt-1">{weeklyAvg}g</p>
          <p className="text-xs font-semibold text-slate-500 mt-1">Batas ideal: {limit}g/hari</p>
        </div>
        <div className="bg-white p-5 rounded-[2rem] border-2 border-rose-100 shadow-sm">
          <p className="text-xs font-extrabold text-slate-400 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5 text-rose-500" /> Hari Tertinggi</p>
          <p className="text-3xl font-black text-brand-pink mt-1">{highestDay?.total ?? 0}g</p>
          <p className="text-xs font-semibold text-slate-500 mt-1">{highestDay?.dayLabel}</p>
        </div>
        <div className="bg-white p-5 rounded-[2rem] border-2 border-emerald-100 shadow-sm">
          <p className="text-xs font-extrabold text-slate-400 flex items-center gap-1"><Award className="w-3.5 h-3.5 text-emerald-500" /> Hari Terendah</p>
          <p className="text-3xl font-black text-emerald-600 mt-1">{lowestDay?.total ?? 0}g</p>
          <p className="text-xs font-semibold text-slate-500 mt-1">{lowestDay?.dayLabel}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-[2rem] border-2 border-teal-100 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
          <h2 className="font-black text-slate-800 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-brand-turquoise" /> Grafik Konsumsi Gula 7 Hari Terakhir</h2>
          <div className="flex items-center gap-3 text-[11px] font-extrabold">
            <span className="flex items-center gap-1 text-emerald-600"><span className="w-3 h-3 rounded-full bg-emerald-400" /> Aman (≤100%)</span>
            <span className="flex items-center gap-1 text-amber-600"><span className="w-3 h-3 rounded-full bg-amber-400" /> Waspada (101-300%)</span>
            <span className="flex items-center gap-1 text-rose-600"><span className="w-3 h-3 rounded-full bg-rose-500" /> Bahaya (&gt;300%)</span>
          </div>
        </div>

        <div className="h-64 flex items-end justify-between gap-3 pt-6 pb-2 px-2 border-b-2 border-slate-100">
          {last7Days.map((day) => {
            const heightPct = Math.min(Math.round((day.total / maxVal) * 100), 100);
            const ratio = day.total / limit;
            const color = ratio > 3 ? "bg-rose-500" : ratio > 1 ? "bg-amber-400" : "bg-emerald-400";
            return (
              <div key={day.key} className="flex-1 flex flex-col items-center h-full justify-end">
                <span className="text-xs font-black text-slate-700 mb-1.5">{day.total}g</span>
                <div className="w-full max-w-[48px] bg-slate-100 rounded-2xl h-44 flex items-end overflow-hidden p-1">
                  <div className={`w-full rounded-xl transition-all duration-500 ${color}`} style={{ height: `${Math.max(heightPct, 5)}%` }} />
                </div>
                <span className="text-[11px] font-extrabold text-slate-500 mt-2 text-center">{day.dayLabel}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white p-6 rounded-[2rem] border-2 border-teal-100 shadow-sm">
        <h3 className="font-black text-slate-800 mb-4">Top Penyumbang Gula Minggu Ini</h3>
        {topFoods.length === 0 ? (
          <p className="text-xs font-semibold text-slate-500">Belum ada data konsumsi 7 hari terakhir.</p>
        ) : (
          <div className="space-y-3">
            {topFoods.map((item, i) => (
              <div key={item.name} className="flex items-center justify-between p-3.5 rounded-2xl bg-teal-50/60 border border-teal-100">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-brand-turquoise text-white text-xs font-black flex items-center justify-center">#{i + 1}</span>
                  <span className="text-sm font-extrabold text-slate-800">{item.name}</span>
                </div>
                <span className="text-sm font-black text-brand-pink">{item.total}g gula</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

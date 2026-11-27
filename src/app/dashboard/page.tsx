"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle, CheckCircle2, ShieldAlert, PlusCircle, Sparkles,
  Utensils, Repeat, Calculator, TrendingUp, GraduationCap, BookOpenCheck,
} from "lucide-react";
import { useApp } from "@/lib/appContext";
import { getSugarStatus } from "@/lib/portion";
import { HappyKidsHeroArt } from "@/components/MascotArt";

interface FoodLogEntry {
  id: string; userId: string; foodName: string; portionUnit: string;
  portionSize: string; portionAmount: number; estimatedGrams: number;
  sugarGrams: number; consumedAt: string;
}

export default function DashboardPage() {
  const { user, familyAccounts, switchAccount } = useApp();
  const [logsMap, setLogsMap] = useState<Record<string, FoodLogEntry[]>>({});

  const childAccounts = familyAccounts.filter((u) => u.role === "CHILDREN");

  useEffect(() => {
    if (!user) return;
    const targetIds =
      user.role === "CHILDREN"
        ? [user.id]
        : childAccounts.length > 0
        ? childAccounts.map((c) => c.id)
        : [user.id];

    Promise.all(
      targetIds.map(async (uid) => {
        const res = await fetch(`/api/logs?userId=${uid}`, { cache: "no-store" });
        const data = await res.json();
        return { uid, logs: data.logs || [] };
      })
    ).then((results) => {
      const next: Record<string, FoodLogEntry[]> = {};
      results.forEach((r) => { next[r.uid] = r.logs; });
      setLogsMap(next);
    });
  }, [user, childAccounts.length]);

  if (!user) return null;

  const todayStr = new Date().toISOString().split("T")[0];

  const quickFeatureCards = [
    { href: "/diary", title: "Pantau Konsumsi Gula", desc: "Catat makanan & minuman", icon: BookOpenCheck, cardBg: "bg-rose-50 border-rose-200 hover:border-rose-400", iconBg: "bg-brand-pink text-white" },
    { href: "/calculator", title: "Kalkulator Takaran", desc: "Hitung sendok & porsi", icon: Calculator, cardBg: "bg-amber-50 border-amber-200 hover:border-amber-400", iconBg: "bg-amber-400 text-slate-900" },
    { href: "/trends", title: "Grafik Mingguan", desc: "Lihat tren 7 hari", icon: TrendingUp, cardBg: "bg-emerald-50 border-emerald-200 hover:border-emerald-400", iconBg: "bg-emerald-500 text-white" },
    { href: "/education", title: "Edukasi & Kuis", desc: "Detektif label gizi", icon: GraduationCap, cardBg: "bg-purple-50 border-purple-200 hover:border-purple-400", iconBg: "bg-purple-500 text-white" },
  ];

  if (user.role === "CHILDREN") {
    const myLogs = logsMap[user.id] || [];
    const todayLogs = myLogs.filter((l) => l.consumedAt.startsWith(todayStr));
    const totalToday = Math.round(todayLogs.reduce((s, l) => s + l.sugarGrams, 0) * 10) / 10;
    const limit = user.dailySugarLimit || 25;
    const status = getSugarStatus(totalToday, limit);
    const barWidth = Math.min(Math.round((status.percentage / 300) * 100), 100);

    const bannerStyles = {
      SAFE: "bg-emerald-50 border-emerald-300 text-emerald-950",
      WARNING: "bg-amber-50 border-amber-300 text-amber-950",
      DANGER: "bg-rose-50 border-rose-300 text-rose-950",
    }[status.level];

    const barColor = {
      SAFE: "bg-emerald-500",
      WARNING: "bg-amber-400",
      DANGER: "bg-rose-500",
    }[status.level];

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-[#CFF4FF] via-[#E6FFFA] to-[#ECFCCB] rounded-[2rem] p-6 sm:p-7 border-4 border-white shadow-playful flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white text-brand-teal text-xs font-black">
              <Sparkles className="w-4 h-4 text-amber-400" /> Halo, {user.name}!
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 leading-tight">
              Kendalikan Gula, <span className="text-brand-teal">Cegah Diabetes</span> Sejak Dini!
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-slate-600 max-w-lg">
              Yuk jaga tameng sehatmu tetap hijau dengan mencatat makanan dan minumanmu setiap hari!
            </p>
            <div className="pt-1">
              <Link href="/diary" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-pink hover:bg-rose-600 text-white text-xs sm:text-sm font-black shadow-playful-pink transition">
                <PlusCircle className="w-4 h-4" /> Catat Konsumsi Gula →
              </Link>
            </div>
          </div>
          <div className="shrink-0"><HappyKidsHeroArt /></div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickFeatureCards.map((c) => {
            const Icon = c.icon;
            return (
              <Link key={c.href} href={c.href} className={`p-4 rounded-3xl border-2 transition flex flex-col items-center text-center ${c.cardBg}`}>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-2.5 ${c.iconBg}`}>
                  <Icon className="w-6 h-6 stroke-[2.5]" />
                </div>
                <h3 className="font-black text-xs sm:text-sm text-slate-800">{c.title}</h3>
                <p className="text-[11px] font-semibold text-slate-500 mt-0.5">{c.desc}</p>
              </Link>
            );
          })}
        </div>

        <div className={`p-5 rounded-3xl border-4 flex items-start gap-4 ${bannerStyles}`}>
          <div className="p-3 rounded-2xl bg-white shrink-0">
            {status.level === "SAFE" && <CheckCircle2 className="w-8 h-8 text-emerald-500" />}
            {status.level === "WARNING" && <AlertTriangle className="w-8 h-8 text-amber-500" />}
            {status.level === "DANGER" && <ShieldAlert className="w-8 h-8 text-rose-500" />}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-xs font-black uppercase px-3 py-0.5 rounded-full bg-white">{status.label}</span>
              <h2 className="font-black text-base sm:text-lg">{status.nudgeTitle}</h2>
            </div>
            <p className="text-sm font-semibold opacity-90">{status.nudgeMessage}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-[2rem] p-6 border-2 border-teal-100 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div>
                <p className="text-xs font-extrabold text-brand-teal uppercase">Progress Sehatku Hari Ini</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-4xl font-black text-slate-800">{totalToday}g</span>
                  <span className="text-sm font-bold text-slate-500">/ {limit}g batas harian ({status.percentage}%)</span>
                </div>
              </div>
              <span className="px-3.5 py-1.5 rounded-full bg-teal-50 text-brand-teal text-xs font-black">Target ≤ {limit}g</span>
            </div>
            <div className="w-full h-6 bg-slate-100 rounded-full overflow-hidden p-1 border border-slate-200">
              <div className={`h-full rounded-full transition-all duration-500 ${barColor}`} style={{ width: `${barWidth}%` }} />
            </div>
            <div className="flex justify-between text-[11px] font-extrabold text-slate-400 mt-2">
              <span>0g</span>
              <span className="text-emerald-600">100% ({limit}g Aman)</span>
              <span className="text-amber-600">200% ({limit * 2}g)</span>
              <span className="text-rose-600">300% ({limit * 3}g Bahaya)</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-brand-turquoise to-teal-600 rounded-[2rem] p-6 text-white flex flex-col justify-between shadow-playful-teal">
            <div>
              <span className="inline-flex items-center gap-1 text-xs font-extrabold bg-white/20 px-3 py-1 rounded-full mb-3">
                <Sparkles className="w-3.5 h-3.5" /> Sisa Kuota Aman
              </span>
              <p className="text-4xl font-black mt-1">{Math.max(0, Math.round((limit - totalToday) * 10) / 10)} gram</p>
              <p className="text-xs text-teal-50 font-semibold mt-1">
                Setara ± {Math.max(0, Math.round(((limit - totalToday) / 4) * 10) / 10)} sendok teh gula
              </p>
            </div>
            <Link href="/education" className="mt-4 inline-flex items-center justify-center px-4 py-3 rounded-full bg-amber-300 text-slate-900 text-xs font-black hover:bg-amber-400 transition">
              Main Kuis Detektif Gula →
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-[2rem] p-6 border-2 border-teal-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-black text-slate-800 flex items-center gap-2">
              <Utensils className="w-5 h-5 text-brand-pink" /> Makanan & Minuman Hari Ini ({todayLogs.length} item)
            </h3>
            <Link href="/diary" className="text-xs font-extrabold text-brand-teal hover:underline">Kelola / Edit di Food Diary →</Link>
          </div>
          {todayLogs.length === 0 ? (
            <p className="text-sm font-semibold text-slate-500 py-6 text-center">Belum ada catatan hari ini. Klik &quot;Catat Konsumsi Gula&quot; di atas untuk mencatat!</p>
          ) : (
            <div className="divide-y divide-slate-100">
              {todayLogs.map((log) => (
                <div key={log.id} className="py-3.5 flex items-center justify-between">
                  <div>
                    <p className="font-extrabold text-sm text-slate-800">{log.foodName}</p>
                    <p className="text-xs font-semibold text-slate-500">{log.portionAmount} {log.portionUnit} ({log.portionSize}) • ~{log.estimatedGrams}g</p>
                  </div>
                  <span className="px-3.5 py-1.5 rounded-full bg-rose-50 text-brand-pink font-black text-xs">+{log.sugarGrams}g gula</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-[#CFF4FF] via-[#E6FFFA] to-[#ECFCCB] rounded-[2rem] p-6 sm:p-7 border-4 border-white shadow-playful flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 text-center md:text-left">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white text-brand-teal text-xs font-black">
            <Sparkles className="w-4 h-4 text-amber-400" /> Dashboard Orang Tua
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 leading-tight">
            Pantau & Dampingi <span className="text-brand-teal">Konsumsi Gula Anak</span> Setiap Hari!
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-slate-600 max-w-lg">
            Memantau {childAccounts.length} profil anak terhubung di database. Gunakan tombol <strong>Ganti Akun</strong> untuk menambah profil anak baru.
          </p>
          <div className="pt-1 flex flex-wrap justify-center md:justify-start gap-2.5">
            <Link href="/diary" className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-brand-pink hover:bg-rose-600 text-white text-xs font-black shadow-playful-pink transition">
              <PlusCircle className="w-4 h-4" /> + Catat / Edit Food Diary
            </Link>
          </div>
        </div>
        <div className="shrink-0"><HappyKidsHeroArt /></div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickFeatureCards.map((c) => {
          const Icon = c.icon;
          return (
            <Link key={c.href} href={c.href} className={`p-4 rounded-3xl border-2 transition flex flex-col items-center text-center ${c.cardBg}`}>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-2.5 ${c.iconBg}`}>
                <Icon className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h3 className="font-black text-xs sm:text-sm text-slate-800">{c.title}</h3>
              <p className="text-[11px] font-semibold text-slate-500 mt-0.5">{c.desc}</p>
            </Link>
          );
        })}
      </div>

      {childAccounts.length === 0 ? (
        <div className="bg-white rounded-[2rem] p-8 border-2 border-teal-100 text-center space-y-2">
          <p className="font-black text-slate-800">Belum ada profil anak terhubung</p>
          <p className="text-xs font-semibold text-slate-500">
            Klik tombol kuning <strong>Ganti Akun</strong> di pojok kanan atas → pilih <strong>+ Tambah Profil Anak</strong> untuk menghubungkan akun anak.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {childAccounts.map((child) => {
            const cLogs = logsMap[child.id] || [];
            const childTodayLogs = cLogs.filter((l) => l.consumedAt.startsWith(todayStr));
            const totalToday = Math.round(childTodayLogs.reduce((s, l) => s + l.sugarGrams, 0) * 10) / 10;
            const status = getSugarStatus(totalToday, child.dailySugarLimit);

            const badgeColor = {
              SAFE: "bg-emerald-100 text-emerald-800",
              WARNING: "bg-amber-100 text-amber-800",
              DANGER: "bg-rose-100 text-rose-800",
            }[status.level];

            const barColor = {
              SAFE: "bg-emerald-500",
              WARNING: "bg-amber-400",
              DANGER: "bg-rose-500",
            }[status.level];

            return (
              <div key={child.id} className="bg-white rounded-[2rem] p-6 border-2 border-teal-100 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-lg" style={{ backgroundColor: child.avatarColor }}>
                        {child.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-black text-slate-800">{child.name}</h3>
                        <p className="text-xs font-semibold text-slate-500">@{child.username}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[11px] font-black ${badgeColor}`}>{status.label}</span>
                  </div>

                  <div className="flex items-baseline justify-between mb-2">
                    <span className="text-3xl font-black text-slate-800">
                      {totalToday}g <span className="text-xs font-bold text-slate-500">/ {child.dailySugarLimit}g</span>
                    </span>
                    <span className="text-xs font-extrabold text-brand-teal">{status.percentage}% ({childTodayLogs.length} item hari ini)</span>
                  </div>

                  <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
                    <div className={`h-full rounded-full ${barColor}`} style={{ width: `${Math.min(Math.round((status.percentage / 300) * 100), 100)}%` }} />
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t-2 border-slate-100 flex items-center justify-between">
                  <Link href="/diary" className="text-xs font-extrabold text-brand-pink hover:underline">+ Catat / Edit Diary</Link>
                  <button onClick={() => switchAccount(child.id)} className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-teal-50 hover:bg-teal-100 text-xs font-extrabold text-brand-teal transition">
                    <Repeat className="w-3.5 h-3.5" /> Switch ke Akun Anak →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, BookOpenCheck, Calculator, TrendingUp,
  GraduationCap, Users, ChevronDown, Repeat, UserCircle, LogOut, Menu, X,
} from "lucide-react";
import { useApp } from "@/lib/appContext";
import AccountSwitcherModal from "./AccountSwitcherModal";
import { SiGluLogo } from "./MascotArt";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, loading, logout } = useApp();
  const [isSwitcherOpen, setIsSwitcherOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  if (pathname === "/login") return <>{children}</>;

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#EBF9FA]">
        <div className="text-center space-y-3">
          <SiGluLogo />
          <p className="text-xs font-extrabold text-brand-teal animate-pulse">
            Menghubungkan ke Database GLUTRACK KIDS...
          </p>
        </div>
      </div>
    );
  }

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, badgeBg: "bg-teal-100 text-teal-600", roles: ["ADMIN", "PARENT", "CHILDREN"] },
    { href: "/diary", label: "Food Diary", icon: BookOpenCheck, badgeBg: "bg-rose-100 text-rose-500", roles: ["ADMIN", "PARENT", "CHILDREN"] },
    { href: "/calculator", label: "Sugar Calculator", icon: Calculator, badgeBg: "bg-amber-100 text-amber-600", roles: ["ADMIN", "PARENT", "CHILDREN"] },
    { href: "/trends", label: "Weekly Trends", icon: TrendingUp, badgeBg: "bg-emerald-100 text-emerald-600", roles: ["ADMIN", "PARENT", "CHILDREN"] },
    { href: "/education", label: "Sugar Education", icon: GraduationCap, badgeBg: "bg-purple-100 text-purple-600", roles: ["ADMIN", "PARENT", "CHILDREN"] },
    { href: "/parent-access", label: "Parent Access", icon: Users, badgeBg: "bg-sky-100 text-sky-600", roles: ["PARENT", "ADMIN"] },
  ].filter((item) => item.roles.includes(user.role));

  const activeTitle =
    navItems.find((n) => pathname.startsWith(n.href))?.label ||
    (pathname === "/profile" ? "Profil Pengguna" : "GLUTRACK KIDS");

  return (
    <div className="min-h-screen flex bg-gradient-to-b from-[#DFF7FA] via-[#F2FCFD] to-[#E8F8F5] text-slate-800">
      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 bg-white/95 backdrop-blur-md border-r-2 border-teal-100 z-30 shadow-sm">
        <div className="px-5 py-5 border-b-2 border-teal-50 bg-gradient-to-r from-cyan-50/80 to-teal-50/60">
          <SiGluLogo compact />
          <p className="text-[11px] font-bold text-brand-teal mt-2">Kendalikan Gula, Cegah Diabetes!</p>
        </div>

        <nav className="flex-1 px-4 py-5 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-2xl text-sm font-extrabold transition ${
                  active ? "bg-brand-turquoise text-white shadow-playful-teal -translate-y-0.5" : "text-slate-600 hover:bg-teal-50/80 hover:text-brand-teal"
                }`}
              >
                <span className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${active ? "bg-white/20 text-white" : item.badgeBg}`}>
                  <Icon className="w-4 h-4 stroke-[2.5]" />
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t-2 border-teal-50">
          <button
            onClick={() => setIsSwitcherOpen(true)}
            className="w-full flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-amber-50 to-teal-50 hover:from-amber-100 hover:to-teal-100 border-2 border-teal-200/70 transition text-left"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-extrabold text-sm shrink-0" style={{ backgroundColor: user.avatarColor }}>
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="truncate">
                <p className="text-xs font-extrabold text-slate-800 truncate">{user.name}</p>
                <p className="text-[11px] text-brand-pink font-extrabold">Ganti Akun →</p>
              </div>
            </div>
            <Repeat className="w-4 h-4 text-brand-teal shrink-0" />
          </button>
        </div>
      </aside>

      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden flex">
          <div className="fixed inset-0 bg-slate-900/40" onClick={() => setIsMobileSidebarOpen(false)} />
          <aside className="relative w-72 max-w-xs bg-white h-full flex flex-col z-50 shadow-2xl border-r-4 border-teal-100">
            <div className="flex items-center justify-between px-5 py-4 border-b-2 border-teal-50">
              <SiGluLogo compact />
              <button onClick={() => setIsMobileSidebarOpen(false)} className="p-1.5 rounded-full bg-slate-100 text-slate-600"><X className="w-5 h-5" /></button>
            </div>
            <nav className="flex-1 px-3 py-4 space-y-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3.5 py-3 rounded-2xl text-sm font-extrabold ${active ? "bg-brand-turquoise text-white" : "text-slate-600 hover:bg-teal-50"}`}
                  >
                    <span className={`w-8 h-8 rounded-xl flex items-center justify-center ${active ? "bg-white/20 text-white" : item.badgeBg}`}>
                      <Icon className="w-4 h-4" />
                    </span>
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </aside>
        </div>
      )}

      <div className="flex-1 flex flex-col lg:pl-64 min-w-0">
        <header className="sticky top-0 z-20 bg-white/85 backdrop-blur-md border-b-2 border-teal-100/80 px-4 sm:px-8 py-3.5">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button onClick={() => setIsMobileSidebarOpen(true)} className="lg:hidden p-2 rounded-2xl border-2 border-teal-200 bg-teal-50 text-brand-teal">
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-lg sm:text-2xl font-black text-slate-800 tracking-tight">{activeTitle}</h1>
                <p className="text-xs font-semibold text-slate-500 hidden sm:block">
                  Halo, Sahabat Sehat! Profil Aktif: <span className="font-extrabold text-brand-teal">{user.name}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <button onClick={() => setIsSwitcherOpen(true)} className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-amber-300 hover:bg-amber-400 text-slate-900 text-xs font-extrabold shadow-xs transition">
                <Repeat className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Ganti Akun</span>
              </button>

              <div className="relative">
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-full bg-white border-2 border-teal-100 hover:border-brand-turquoise transition">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-extrabold text-xs" style={{ backgroundColor: user.avatarColor }}>
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="text-left hidden md:block">
                    <div className="text-xs font-extrabold text-slate-800 leading-tight">{user.name}</div>
                    <span className="inline-block text-[10px] font-black px-2 rounded-full bg-teal-100 text-teal-800">{user.role}</span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>

                {isDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)} />
                    <div className="absolute right-0 mt-2 w-56 rounded-3xl bg-white shadow-xl border-2 border-teal-100 py-2 z-20">
                      <Link href="/profile" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-teal-50">
                        <UserCircle className="w-4 h-4 text-brand-turquoise" /> Halaman Profil
                      </Link>
                      <button onClick={() => { setIsDropdownOpen(false); setIsSwitcherOpen(true); }} className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-teal-50">
                        <Repeat className="w-4 h-4 text-brand-purple" /> Switch / Add Account
                      </button>
                      <div className="my-1 border-t border-slate-100" />
                      <button onClick={() => { setIsDropdownOpen(false); logout(); }} className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-rose-600 hover:bg-rose-50">
                        <LogOut className="w-4 h-4" /> Keluar (Logout)
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-6">{children}</main>

        <footer className="border-t-2 border-teal-100/80 bg-white/80 py-4 px-4 sm:px-8 text-center text-xs font-bold text-slate-500">
          © 2026 GLUTRACK KIDS — Kendalikan Gula, Cegah Diabetes Sejak Dini!
        </footer>
      </div>

      <AccountSwitcherModal isOpen={isSwitcherOpen} onClose={() => setIsSwitcherOpen(false)} />
    </div>
  );
}

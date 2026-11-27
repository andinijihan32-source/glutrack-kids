"use client";

import React from "react";
import Link from "next/link";
import { Repeat, Users, BookOpenCheck } from "lucide-react";
import { useApp } from "@/lib/appContext";

export default function ParentAccessPage() {
  const { familyAccounts, switchAccount } = useApp();
  const childAccounts = familyAccounts.filter((u) => u.role === "CHILDREN");

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-[2rem] p-6 border-2 border-teal-100 shadow-sm">
        <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
          <Users className="w-5 h-5 text-brand-turquoise" /> Akses Cepat Profil Anak Terhubung
        </h2>
        <p className="text-xs font-semibold text-slate-500 mt-1">
          Klik <strong>Switch ke Anak</strong> untuk berpindah langsung ke tampilan anak, atau klik tombol kuning <strong>Ganti Akun</strong> di pojok kanan atas untuk mendaftarkan profil anak baru ke database.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {childAccounts.map((child) => (
            <div key={child.id} className="p-5 rounded-3xl border-2 border-teal-100 bg-teal-50/30 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-lg" style={{ backgroundColor: child.avatarColor }}>
                  {child.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-black text-slate-800">{child.name}</h3>
                  <p className="text-xs font-semibold text-slate-500">@{child.username} • Batas: {child.dailySugarLimit}g/hari</p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <button onClick={() => switchAccount(child.id)} className="px-4 py-2 rounded-full bg-brand-turquoise hover:bg-brand-teal text-white text-xs font-extrabold flex items-center gap-1.5 transition">
                  <Repeat className="w-3.5 h-3.5" /> Switch ke Anak
                </button>
                <Link href="/diary" className="px-4 py-1.5 rounded-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-extrabold text-center flex items-center justify-center gap-1">
                  <BookOpenCheck className="w-3.5 h-3.5" /> Catat Diary
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { Save, CheckCircle2 } from "lucide-react";
import { useApp } from "@/lib/appContext";

export default function ProfilePage() {
  const { user, refreshSession } = useApp();
  const [name, setName] = useState("");
  const [dailySugarLimit, setDailySugarLimit] = useState(25);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setDailySugarLimit(user.dailySugarLimit);
    }
  }, [user]);

  if (!user) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, dailySugarLimit }),
    });
    if (res.ok) {
      await refreshSession();
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-[2rem] p-6 sm:p-8 border-2 border-teal-100 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-lg" style={{ backgroundColor: user.avatarColor }}>
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h2 className="font-black text-slate-800">{user.name}</h2>
          <p className="text-xs font-semibold text-slate-500">@{user.username} • Role: <strong>{user.role}</strong></p>
        </div>
      </div>

      {saved && (
        <div className="mb-4 p-3 rounded-2xl bg-emerald-50 border-2 border-emerald-200 text-emerald-800 text-xs font-extrabold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> Perubahan profil tersimpan di database!
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="block text-xs font-extrabold text-slate-700 mb-1">Nama Lengkap</label>
          <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2.5 rounded-2xl border-2 border-slate-200 text-sm font-bold" />
        </div>
        <div>
          <label className="block text-xs font-extrabold text-slate-700 mb-1">Target Batas Maksimal Gula Harian (gram)</label>
          <input type="number" min={5} max={100} value={dailySugarLimit} onChange={(e) => setDailySugarLimit(Number(e.target.value))} className="w-full px-4 py-2.5 rounded-2xl border-2 border-slate-200 text-sm font-bold" />
        </div>
        <button type="submit" className="w-full py-3.5 rounded-full bg-brand-turquoise hover:bg-brand-teal text-white font-black text-sm shadow-playful-teal flex items-center justify-center gap-2">
          <Save className="w-4 h-4" /> Simpan Perubahan
        </button>
      </form>
    </div>
  );
}

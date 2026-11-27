"use client";

import React, { useState } from "react";
import { Check, Plus, UserPlus, X, Sparkles } from "lucide-react";
import { useApp } from "@/lib/appContext";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function AccountSwitcherModal({ isOpen, onClose }: Props) {
  const { user, familyAccounts, switchAccount, refreshSession } = useApp();
  const [mode, setMode] = useState<"LIST" | "CREATE">("LIST");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("CHILDREN");
  const [dailySugarLimit, setDailySugarLimit] = useState(25);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen || !user) return null;

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, username, role, dailySugarLimit, linkToCurrentParent: true,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Gagal menambah akun.");
      } else {
        await refreshSession();
        setName("");
        setUsername("");
        setMode("LIST");
        onClose();
      }
    } catch {
      setError("Terjadi kesalahan jaringan.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-[2rem] bg-white shadow-2xl border-4 border-teal-100 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b-2 border-teal-50 bg-gradient-to-r from-teal-50 via-cyan-50 to-amber-50">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-brand-pink" />
            <h3 className="font-extrabold text-slate-800">
              {mode === "LIST" ? "Ganti Akun Keluarga" : "Tambah Akun Anak / Keluarga"}
            </h3>
          </div>
          <button
            onClick={() => { setMode("LIST"); onClose(); }}
            className="p-1.5 rounded-full bg-white hover:bg-rose-50 text-slate-500 hover:text-brand-pink"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {mode === "LIST" ? (
            <div className="space-y-3">
              <p className="text-xs font-semibold text-slate-500">
                Klik profil di bawah untuk berpindah akun langsung (tersimpan permanen di database):
              </p>
              <div className="max-h-64 overflow-y-auto space-y-2.5 pr-1">
                {familyAccounts.map((acc) => {
                  const isActive = acc.id === user.id;
                  return (
                    <button
                      key={acc.id}
                      onClick={async () => { await switchAccount(acc.id); onClose(); }}
                      className={`w-full flex items-center justify-between p-3.5 rounded-2xl border-2 transition text-left ${
                        isActive ? "border-brand-turquoise bg-teal-50/80" : "border-slate-200 hover:border-brand-turquoise/60 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-white font-extrabold text-base" style={{ backgroundColor: acc.avatarColor }}>
                          {acc.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-extrabold text-slate-800 text-sm">{acc.name}</div>
                          <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                            <span>@{acc.username}</span>
                            <span>•</span>
                            <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-extrabold text-[10px]">{acc.role}</span>
                          </div>
                        </div>
                      </div>
                      {isActive && (
                        <span className="w-7 h-7 rounded-full bg-brand-turquoise text-white flex items-center justify-center">
                          <Check className="w-4 h-4 stroke-[3]" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
              <div className="pt-3 border-t border-slate-100">
                <button
                  onClick={() => setMode("CREATE")}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-brand-pink hover:bg-rose-600 text-white text-xs font-extrabold transition shadow-playful-pink"
                >
                  <UserPlus className="w-4 h-4" /> + Tambah Profil Anak / Akun Baru
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleCreate} className="space-y-4">
              {error && <div className="p-2.5 rounded-xl bg-rose-50 text-rose-700 text-xs font-bold">{error}</div>}
              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1">Nama Profil</label>
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Contoh: Arka (7 Tahun)" className="w-full px-4 py-2.5 rounded-2xl border-2 border-slate-200 text-sm font-bold" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1">Username</label>
                  <input type="text" required value={username} onChange={(e) => setUsername(e.target.value)} placeholder="arka_anak" className="w-full px-3.5 py-2.5 rounded-2xl border-2 border-slate-200 text-sm font-bold" />
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1">Peran</label>
                  <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full px-3 py-2.5 rounded-2xl border-2 border-slate-200 text-sm bg-white font-semibold">
                    <option value="CHILDREN">Anak (Children)</option>
                    <option value="PARENT">Orang Tua (Parent)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1">Target Batas Gula Harian (gram)</label>
                <input type="number" min={5} max={100} value={dailySugarLimit} onChange={(e) => setDailySugarLimit(Number(e.target.value))} className="w-full px-4 py-2.5 rounded-2xl border-2 border-slate-200 text-sm font-bold" />
              </div>
              <div className="flex gap-2.5 pt-2">
                <button type="button" onClick={() => setMode("LIST")} className="flex-1 py-3 rounded-2xl border-2 border-slate-200 text-xs font-extrabold text-slate-600">Kembali</button>
                <button type="submit" disabled={submitting} className="flex-1 py-3 rounded-2xl bg-brand-turquoise text-white text-xs font-extrabold hover:bg-brand-teal flex items-center justify-center gap-1">
                  <Plus className="w-4 h-4" /> {submitting ? "Menyimpan..." : "Simpan Akun"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

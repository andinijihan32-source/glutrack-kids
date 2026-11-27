"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { LogIn, UserPlus, ShieldCheck } from "lucide-react";
import { useApp } from "@/lib/appContext";
import { SiGluLogo, HappyKidsHeroArt } from "@/components/MascotArt";

export default function LoginPage() {
  const router = useRouter();
  const { refreshSession } = useApp();
  const [tab, setTab] = useState<"LOGIN" | "REGISTER">("LOGIN");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("bunda_rina");
  const [password, setPassword] = useState("123456");
  const [role, setRole] = useState("PARENT");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const endpoint = tab === "LOGIN" ? "/api/auth/login" : "/api/auth/register";
      const payload =
        tab === "LOGIN"
          ? { username, password }
          : { name, username, password, role, dailySugarLimit: 25 };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Terjadi kesalahan.");
      } else {
        await refreshSession();
        router.push("/dashboard");
      }
    } catch {
      setError("Gagal terhubung ke server database.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#BCEEFF] via-[#E5F9FF] to-[#D9F99D] p-4 sm:p-8">
      <div className="w-full max-w-5xl bg-white/95 backdrop-blur-md rounded-[2.5rem] shadow-2xl border-4 border-white overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-6 bg-gradient-to-b from-[#CFF4FF] via-[#ECFEFF] to-[#ECFCCB] p-8 flex flex-col justify-between items-center text-center">
          <div className="w-full flex justify-start"><SiGluLogo /></div>
          <div className="my-4">
            <HappyKidsHeroArt />
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 leading-tight mt-2">
              Kendalikan Gula, <span className="text-brand-teal underline decoration-amber-300 decoration-4">Cegah Diabetes</span> Sejak Dini!
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-2 max-w-md mx-auto">
              Platform edukasi dan pemantauan konsumsi gula harian anak yang seru untuk seluruh keluarga.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2 text-[11px] font-extrabold">
            <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-700">Pantau Gula</span>
            <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800">Makan Sehat</span>
            <span className="px-3 py-1 rounded-full bg-teal-100 text-teal-800">Edukasi Interaktif</span>
          </div>
        </div>

        <div className="lg:col-span-6 p-7 sm:p-10 flex flex-col justify-center bg-white">
          <div className="mb-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-brand-teal text-xs font-extrabold mb-2">
              <ShieldCheck className="w-4 h-4" /> Akun Keluarga Tersimpan di Cloud
            </span>
            <h1 className="text-2xl font-black text-slate-800">
              {tab === "LOGIN" ? "Masuk ke Aplikasi 👋" : "Daftar Akun Baru ✨"}
            </h1>
          </div>

          <div className="flex rounded-full bg-teal-50 p-1 mb-5 text-xs font-extrabold border border-teal-100">
            <button type="button" onClick={() => { setTab("LOGIN"); setError(""); }} className={`flex-1 py-2 rounded-full transition ${tab === "LOGIN" ? "bg-brand-turquoise text-white" : "text-slate-600"}`}>
              Masuk (Login)
            </button>
            <button type="button" onClick={() => { setTab("REGISTER"); setUsername(""); setPassword(""); setError(""); }} className={`flex-1 py-2 rounded-full transition ${tab === "REGISTER" ? "bg-brand-turquoise text-white" : "text-slate-600"}`}>
              Daftar Baru (Register)
            </button>
          </div>

          {error && <div className="mb-4 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {tab === "REGISTER" && (
              <>
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1">Nama Lengkap</label>
                  <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Contoh: Bunda Rina" className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 text-sm font-bold" />
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1">Peran Akun</label>
                  <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 text-sm font-bold bg-white">
                    <option value="PARENT">Orang Tua (Parent)</option>
                    <option value="CHILDREN">Anak (Children)</option>
                  </select>
                </div>
              </>
            )}
            <div>
              <label className="block text-xs font-extrabold text-slate-700 mb-1">Username</label>
              <input type="text" required value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 text-sm font-bold focus:outline-none focus:border-brand-turquoise" />
            </div>
            <div>
              <label className="block text-xs font-extrabold text-slate-700 mb-1">Password</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 text-sm font-bold focus:outline-none focus:border-brand-turquoise" />
            </div>
            <button type="submit" disabled={loading} className="w-full py-3.5 rounded-full bg-brand-pink hover:bg-rose-600 text-white font-black text-sm shadow-playful-pink active:translate-y-1 transition flex items-center justify-center gap-2">
              {tab === "LOGIN" ? <LogIn className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
              {loading ? "Memproses..." : tab === "LOGIN" ? "Mulai Sekarang →" : "Buat Akun & Masuk →"}
            </button>
          </form>

          {tab === "LOGIN" && (
            <p className="mt-4 text-[11px] font-semibold text-slate-400 text-center">
              Akun awal bawaan seed: <strong className="text-slate-600">bunda_rina</strong> atau <strong className="text-slate-600">rafi_anak</strong> (password: <strong className="text-slate-600">123456</strong>)
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

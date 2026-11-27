"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Calendar, Package, Utensils, Check, X } from "lucide-react";
import { useApp } from "@/lib/appContext";
import { PORTION_SIZES, PORTION_UNITS, calculateEstimatedGrams } from "@/lib/portion";

interface FoodItem {
  id: string; name: string; category: string; sugarPer100g: number;
  defaultServingUnit: string; gramsPerUnit: number;
}

interface FoodLogEntry {
  id: string; userId: string; foodName: string; isPackaged: boolean;
  portionUnit: string; portionSize: string; portionAmount: number;
  estimatedGrams: number; sugarGrams: number; consumedAt: string;
  loggedBy?: { name: string };
}

export default function FoodDiaryPage() {
  const { user, familyAccounts } = useApp();
  const childAccounts = familyAccounts.filter((u) => u.role === "CHILDREN");

  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [logs, setLogs] = useState<FoodLogEntry[]>([]);
  const [loadingLogs, setLoadingLogs] = useState(false);

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
    fetch("/api/foods").then((r) => r.json()).then((d) => setFoods(d.foods || []));
  }, []);

  const fetchLogs = useCallback(async () => {
    if (!selectedUserId) return;
    setLoadingLogs(true);
    try {
      const res = await fetch(`/api/logs?userId=${selectedUserId}`, { cache: "no-store" });
      const data = await res.json();
      setLogs(data.logs || []);
    } finally {
      setLoadingLogs(false);
    }
  }, [selectedUserId]);

  useEffect(() => { fetchLogs(); }, [fetchLogs]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [isPackaged, setIsPackaged] = useState(false);
  const [selectedFoodId, setSelectedFoodId] = useState("");
  const [foodName, setFoodName] = useState("");
  const [portionUnit, setPortionUnit] = useState("potong");
  const [portionSize, setPortionSize] = useState("sedang");
  const [portionAmount, setPortionAmount] = useState(1);
  const [sugarPerServing, setSugarPerServing] = useState(10);
  const [consumedDate, setConsumedDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [saving, setSaving] = useState(false);

  const selectedFoodObj = foods.find((f) => f.id === selectedFoodId);

  const estimatedGrams = isPackaged
    ? Math.round(portionAmount * 100 * 10) / 10
    : calculateEstimatedGrams(portionUnit, portionSize, portionAmount, selectedFoodObj?.gramsPerUnit);

  const calculatedSugar = isPackaged
    ? Math.round(sugarPerServing * portionAmount * 10) / 10
    : Math.round(((estimatedGrams * (selectedFoodObj?.sugarPer100g ?? 15)) / 100) * 10) / 10;

  const handleSelectPresetFood = (fid: string) => {
    setSelectedFoodId(fid);
    const found = foods.find((f) => f.id === fid);
    if (found) {
      setFoodName(found.name);
      setPortionUnit(found.defaultServingUnit);
    }
  };

  const resetForm = () => {
    setEditingId(null); setSelectedFoodId(""); setFoodName("");
    setPortionUnit("potong"); setPortionSize("sedang"); setPortionAmount(1);
    setSugarPerServing(10); setConsumedDate(new Date().toISOString().split("T")[0]);
  };

  const handleEditClick = (log: FoodLogEntry) => {
    setEditingId(log.id); setFoodName(log.foodName); setIsPackaged(log.isPackaged);
    setPortionUnit(log.portionUnit); setPortionSize(log.portionSize || "sedang");
    setPortionAmount(log.portionAmount);
    if (log.isPackaged && log.portionAmount > 0) {
      setSugarPerServing(Math.round((log.sugarGrams / log.portionAmount) * 10) / 10);
    }
    setConsumedDate(log.consumedAt.split("T")[0]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!foodName.trim() || !selectedUserId) return;
    setSaving(true);
    try {
      const payload = {
        userId: selectedUserId, foodItemId: selectedFoodId || null,
        foodName: foodName.trim(), isPackaged,
        portionUnit: isPackaged ? "bungkus" : portionUnit,
        portionSize, portionAmount, estimatedGrams,
        sugarGrams: calculatedSugar, consumedAt: consumedDate,
      };
      if (editingId) {
        await fetch(`/api/logs/${editingId}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      } else {
        await fetch("/api/logs", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      }
      resetForm();
      await fetchLogs();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/logs/${id}`, { method: "DELETE" });
    await fetchLogs();
  };

  const formatDateIndo = (iso: string) => {
    const dateOnly = iso.split("T")[0];
    return new Date(`${dateOnly}T12:00:00`).toLocaleDateString("id-ID", {
      weekday: "long", day: "numeric", month: "short", year: "numeric",
    });
  };

  if (!user) return null;

  return (
    <div className="space-y-6">
      {user.role !== "CHILDREN" && childAccounts.length > 0 && (
        <div className="bg-white p-4 rounded-3xl border-2 border-teal-100 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs font-extrabold text-slate-700">Menampilkan & Mencatat Food Diary untuk Anak:</span>
          <div className="flex flex-wrap gap-2">
            {childAccounts.map((child) => (
              <button key={child.id} onClick={() => setSelectedUserId(child.id)} className={`px-4 py-2 rounded-full text-xs font-extrabold transition ${selectedUserId === child.id ? "bg-brand-turquoise text-white" : "bg-slate-100 text-slate-600 hover:bg-teal-50"}`}>
                {child.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white rounded-[2rem] p-6 border-2 border-teal-100 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <h2 className="text-lg font-black text-slate-800">{editingId ? "Edit Catatan Konsumsi" : "Catat Konsumsi Makanan / Minuman"}</h2>
          <div className="flex rounded-full bg-teal-50 p-1 text-xs font-extrabold border border-teal-100">
            <button type="button" onClick={() => setIsPackaged(false)} className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition ${!isPackaged ? "bg-brand-turquoise text-white" : "text-slate-600"}`}>
              <Utensils className="w-3.5 h-3.5" /> Non-Kemasan / Rumah
            </button>
            <button type="button" onClick={() => setIsPackaged(true)} className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition ${isPackaged ? "bg-brand-pink text-white" : "text-slate-600"}`}>
              <Package className="w-3.5 h-3.5" /> Produk Kemasan
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-extrabold text-slate-700 mb-1">Tanggal Konsumsi</label>
              <input type="date" required value={consumedDate} onChange={(e) => setConsumedDate(e.target.value)} className="w-full px-3.5 py-2.5 rounded-2xl border-2 border-slate-200 text-sm font-bold" />
            </div>

            {!isPackaged ? (
              <>
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1">Pilih Referensi Makanan (Database)</label>
                  <select value={selectedFoodId} onChange={(e) => handleSelectPresetFood(e.target.value)} className="w-full px-3.5 py-2.5 rounded-2xl border-2 border-slate-200 text-sm bg-white font-semibold">
                    <option value="">-- Input Manual / Pilih Makanan --</option>
                    {foods.map((f) => (
                      <option key={f.id} value={f.id}>{f.name} (~{f.sugarPer100g}g gula/100g)</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1">Nama Makanan / Minuman *</label>
                  <input type="text" required value={foodName} onChange={(e) => setFoodName(e.target.value)} placeholder="Contoh: Donat Cokelat / Tempe Bacem" className="w-full px-3.5 py-2.5 rounded-2xl border-2 border-slate-200 text-sm font-bold" />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1">Nama Produk Kemasan *</label>
                  <input type="text" required value={foodName} onChange={(e) => setFoodName(e.target.value)} placeholder="Contoh: Susu Kotak Cokelat 200ml" className="w-full px-3.5 py-2.5 rounded-2xl border-2 border-slate-200 text-sm font-bold" />
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1">Gula per Takaran Saji (Label Gizi - gram)</label>
                  <input type="number" step="0.1" min={0} required value={sugarPerServing} onChange={(e) => setSugarPerServing(Number(e.target.value))} className="w-full px-3.5 py-2.5 rounded-2xl border-2 border-slate-200 text-sm font-bold" />
                </div>
              </>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-extrabold text-slate-700 mb-1">Jumlah Porsi / Sajian</label>
              <input type="number" step="0.25" min="0.25" required value={portionAmount} onChange={(e) => setPortionAmount(Number(e.target.value))} className="w-full px-3.5 py-2.5 rounded-2xl border-2 border-slate-200 text-sm font-bold" />
            </div>

            {!isPackaged && (
              <>
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1">Satuan Takaran (Rumah Tangga)</label>
                  <select value={portionUnit} onChange={(e) => setPortionUnit(e.target.value)} className="w-full px-3.5 py-2.5 rounded-2xl border-2 border-slate-200 text-sm bg-white font-semibold">
                    {PORTION_UNITS.map((u) => (
                      <option key={u.value} value={u.value}>{u.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1">Skala Ukuran Potong / Porsi</label>
                  <select value={portionSize} disabled={portionUnit === "gram"} onChange={(e) => setPortionSize(e.target.value)} className="w-full px-3.5 py-2.5 rounded-2xl border-2 border-slate-200 text-sm bg-white font-semibold disabled:bg-slate-100">
                    {PORTION_SIZES.map((s) => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                </div>
              </>
            )}
          </div>

          <div className="p-4 rounded-3xl bg-gradient-to-r from-teal-50 via-cyan-50 to-amber-50 border-2 border-teal-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4 text-xs">
              <div>
                <span className="text-slate-500 font-semibold block">Estimasi Berat Porsi:</span>
                <strong className="text-sm font-black text-slate-800">{estimatedGrams} gram</strong>
              </div>
              <div className="h-7 w-px bg-teal-200 hidden sm:block" />
              <div>
                <span className="text-slate-500 font-semibold block">Estimasi Kandungan Gula:</span>
                <strong className="text-lg font-black text-brand-pink">{calculatedSugar} gram gula</strong>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {editingId && (
                <button type="button" onClick={resetForm} className="px-4 py-2.5 rounded-full border-2 border-slate-300 bg-white text-slate-700 text-xs font-extrabold flex items-center gap-1">
                  <X className="w-4 h-4" /> Batal
                </button>
              )}
              <button type="submit" disabled={saving} className="px-6 py-3 rounded-full bg-brand-pink hover:bg-rose-600 text-white text-xs font-black shadow-playful-pink flex items-center gap-1.5 transition">
                {editingId ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                {saving ? "Menyimpan..." : editingId ? "Simpan Perubahan" : "Simpan ke Database"}
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-[2rem] p-6 border-2 border-teal-100 shadow-sm">
        <h3 className="font-black text-slate-800 mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-brand-turquoise" /> Riwayat Konsumsi Tersimpan (Editable)
        </h3>
        {loadingLogs ? (
          <p className="text-xs font-bold text-slate-400 py-6 text-center">Memuat riwayat...</p>
        ) : logs.length === 0 ? (
          <p className="text-sm font-semibold text-slate-500 py-8 text-center">Belum ada catatan konsumsi untuk profil ini.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-teal-50 text-[11px] font-black uppercase text-slate-400">
                  <th className="py-3 px-3">Tanggal & Hari</th>
                  <th className="py-3 px-3">Makanan / Minuman</th>
                  <th className="py-3 px-3">Takaran / Porsi</th>
                  <th className="py-3 px-3">Estimasi Gula</th>
                  <th className="py-3 px-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-teal-50/40">
                    <td className="py-3.5 px-3 text-xs font-bold text-slate-600 whitespace-nowrap">{formatDateIndo(log.consumedAt)}</td>
                    <td className="py-3.5 px-3">
                      <div className="font-extrabold text-slate-800">{log.foodName}</div>
                      <div className="text-[11px] font-semibold text-slate-400">
                        {log.isPackaged ? "Produk Kemasan" : "Non-Kemasan"} • Dicatat oleh {log.loggedBy?.name || "Keluarga"}
                      </div>
                    </td>
                    <td className="py-3.5 px-3 text-xs font-semibold text-slate-600">
                      {log.portionAmount} {log.portionUnit} {!log.isPackaged && log.portionUnit !== "gram" ? `(${log.portionSize})` : ""} • <span className="text-slate-400">~{log.estimatedGrams}g</span>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="px-3 py-1 rounded-full bg-rose-50 text-brand-pink font-black text-xs">{log.sugarGrams}g</span>
                    </td>
                    <td className="py-3.5 px-3 text-right whitespace-nowrap">
                      <button onClick={() => handleEditClick(log)} title="Edit catatan ini" className="p-2 rounded-xl bg-amber-50 text-amber-600 hover:bg-amber-100 transition mr-1.5">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(log.id)} title="Hapus catatan ini" className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 transition">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

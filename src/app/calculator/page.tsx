"use client";

import React, { useEffect, useState } from "react";
import { Calculator, Sparkles, Info } from "lucide-react";
import { PORTION_SIZES, PORTION_UNITS, calculateEstimatedGrams } from "@/lib/portion";

interface FoodItem {
  id: string; name: string; sugarPer100g: number;
  defaultServingUnit: string; gramsPerUnit: number;
}

export default function SugarCalculatorPage() {
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [selectedFoodId, setSelectedFoodId] = useState("");
  const [customSugarPer100g, setCustomSugarPer100g] = useState(20);
  const [unit, setUnit] = useState("sendok");
  const [size, setSize] = useState("sedang");
  const [amount, setAmount] = useState(2);

  useEffect(() => {
    fetch("/api/foods").then((r) => r.json()).then((d) => setFoods(d.foods || []));
  }, []);

  const selectedFood = foods.find((f) => f.id === selectedFoodId);
  const sugarRate = selectedFood ? selectedFood.sugarPer100g : customSugarPer100g;
  const estGrams = calculateEstimatedGrams(unit, size, amount, selectedFood?.gramsPerUnit);
  const estSugar = Math.round(((estGrams * sugarRate) / 100) * 10) / 10;
  const pctOf25g = Math.round((estSugar / 25) * 100);
  const tspEquivalent = Math.round((estSugar / 4) * 10) / 10;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-[2rem] p-6 sm:p-8 border-2 border-teal-100 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3.5 rounded-2xl bg-amber-100 text-amber-600">
            <Calculator className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-800">Kalkulator Simulasi Gula & Konverter Porsi Rumah Tangga</h2>
            <p className="text-xs font-semibold text-slate-500">Perkirakan kandungan gula dari sendok, mangkuk, potong kecil/sedang/besar sebelum dikonsumsi.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-extrabold text-slate-700 mb-1">Pilih Jenis Makanan / Minuman</label>
              <select
                value={selectedFoodId}
                onChange={(e) => {
                  setSelectedFoodId(e.target.value);
                  const found = foods.find((f) => f.id === e.target.value);
                  if (found) setUnit(found.defaultServingUnit);
                }}
                className="w-full px-3.5 py-2.5 rounded-2xl border-2 border-slate-200 text-sm bg-white font-semibold"
              >
                <option value="">-- Simulasi Bebas (Atur Kadar Gula Manual) --</option>
                {foods.map((f) => (
                  <option key={f.id} value={f.id}>{f.name} ({f.sugarPer100g}g gula / 100g)</option>
                ))}
              </select>
            </div>

            {!selectedFood && (
              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1">Perkiraan Kadar Gula per 100g Makanan (gram)</label>
                <input type="number" min={0} max={100} value={customSugarPer100g} onChange={(e) => setCustomSugarPer100g(Number(e.target.value))} className="w-full px-3.5 py-2.5 rounded-2xl border-2 border-slate-200 text-sm font-bold" />
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1">Jumlah</label>
                <input type="number" step="0.5" min="0.5" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full px-3.5 py-2.5 rounded-2xl border-2 border-slate-200 text-sm font-bold" />
              </div>
              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1">Takaran</label>
                <select value={unit} onChange={(e) => setUnit(e.target.value)} className="w-full px-3.5 py-2.5 rounded-2xl border-2 border-slate-200 text-sm bg-white font-semibold">
                  {PORTION_UNITS.map((u) => (
                    <option key={u.value} value={u.value}>{u.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-extrabold text-slate-700 mb-1">Ukuran Porsi / Potongan</label>
              <div className="grid grid-cols-3 gap-2">
                {PORTION_SIZES.map((s) => (
                  <button key={s.value} type="button" disabled={unit === "gram"} onClick={() => setSize(s.value)} className={`py-2.5 px-2 rounded-2xl text-xs font-extrabold border-2 transition ${size === s.value ? "border-brand-turquoise bg-teal-50 text-brand-teal" : "border-slate-200 text-slate-600"}`}>
                    {s.label.split(" ")[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] bg-gradient-to-br from-[#CFF4FF] via-[#E6FFFA] to-[#FEF9C3] border-2 border-teal-200 p-6 flex flex-col justify-between">
            <div>
              <span className="inline-flex items-center gap-1 text-xs font-black text-brand-teal bg-white px-3.5 py-1 rounded-full">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Hasil Konversi Estimasi
              </span>
              <div className="mt-5">
                <p className="text-xs font-semibold text-slate-600">Total Berat Porsi Diperkirakan:</p>
                <p className="text-xl font-black text-slate-800">{estGrams} gram</p>
              </div>
              <div className="mt-4">
                <p className="text-xs font-semibold text-slate-600">Estimasi Gula Terkandung:</p>
                <p className="text-4xl font-black text-brand-pink mt-0.5">{estSugar} <span className="text-base font-extrabold">gram</span></p>
                <p className="text-xs font-bold text-slate-700 mt-1">Setara dengan <strong>± {tspEquivalent} sendok teh</strong> gula pasir</p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t-2 border-white/80">
              <div className="flex justify-between text-xs font-extrabold mb-1.5">
                <span>Porsi dari Batas Harian Anak (25g):</span>
                <span className={pctOf25g > 300 ? "text-rose-600" : pctOf25g > 100 ? "text-amber-600" : "text-brand-teal"}>{pctOf25g}%</span>
              </div>
              <div className="w-full h-4 bg-white rounded-full overflow-hidden p-0.5">
                <div className={`h-full rounded-full ${pctOf25g > 300 ? "bg-rose-500" : pctOf25g > 100 ? "bg-amber-400" : "bg-emerald-500"}`} style={{ width: `${Math.min(Math.round((pctOf25g / 300) * 100), 100)}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-5 rounded-3xl border-2 border-teal-100 flex items-start gap-3 text-xs font-semibold text-slate-600">
        <Info className="w-5 h-5 text-brand-turquoise shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Catatan Early Warning System:</strong> Konversi sendok, potong (kecil/sedang/besar), dan mangkuk menggunakan standar estimasi praktis ukuran rumah tangga untuk membantu pemantauan harian anak tanpa harus menimbang makanan secara kaku.
        </p>
      </div>
    </div>
  );
}

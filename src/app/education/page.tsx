"use client";

import React, { useState } from "react";
import { BookOpen, Sparkles, CheckCircle2, HelpCircle } from "lucide-react";

const MODULES = [
  {
    id: "m1", category: "Label Gizi", badge: "bg-pink-100 text-pink-700", border: "border-pink-200",
    title: "Detektif Label Gizi: Takaran Saji vs Per Kemasan",
    summary: "Jangan tertipu angka gula kecil di kemasan! Cek dulu berapa kali sajian dalam 1 bungkus.",
    content: "Sering kali botol minuman menuliskan 'Gula: 12g', tetapi di bagian atas tertulis '2 Sajian per Kemasan'. Artinya jika kamu menghabiskan 1 botol sendirian, gula yang masuk ke tubuhmu adalah 12g x 2 = 24 gram — hampir menghabiskan jatah harianmu!",
  },
  {
    id: "m2", category: "Gula Tersembunyi", badge: "bg-amber-100 text-amber-800", border: "border-amber-200",
    title: "Nama Samaran Gula Tersembunyi",
    summary: "Gula tidak selalu ditulis 'Gula' di komposisi. Kenali nama-nama samarannya!",
    content: "Produsen makanan sering menggunakan istilah lain untuk gula tambahan, seperti: Sukrosa, Fruktosa, Sirup Jagung Tinggi Fruktosa (HFCS), Dekstrosa, Maltosa, Madu Olahan, dan Sirup Glukosa. Jika ada di 3 urutan pertama komposisi, berarti produk itu tinggi gula!",
  },
  {
    id: "m3", category: "Pencegahan Diabetes", badge: "bg-purple-100 text-purple-700", border: "border-purple-200",
    title: "Aturan 25 Gram & Benteng Cegah Diabetes",
    summary: "Batas aman gula tambahan anak menurut WHO & Kemenkes adalah maksimal 25 gram (6 sendok teh) per hari.",
    content: "Mengonsumsi gula berlebih setiap hari membuat pankreas bekerja terlalu keras memproduksi insulin. Dengan membatasi gula di bawah 25g/hari, memperbanyak air putih, dan aktif bergerak 60 menit sehari, tubuhmu tetap berenergi dan terlindungi dari risiko Diabetes Tipe 2 sejak dini.",
  },
];

const QUIZ_QUESTIONS = [
  { q: "Berapa batas maksimal konsumsi gula tambahan harian anak menurut WHO & Kemenkes?", options: ["10 gram (2,5 sdt)", "25 gram (6 sdt)", "60 gram (15 sdt)"], answer: 1 },
  { q: "Di kemasan minuman tertulis Gula 11g per sajian, dan '2 Sajian per Kemasan'. Jika diminum habis, berapa gulanya?", options: ["11 gram", "22 gram", "5,5 gram"], answer: 1 },
  { q: "Manakah di bawah ini yang merupakan nama samaran gula tersembunyi di komposisi makanan?", options: ["Sirup Jagung Tinggi Fruktosa (HFCS)", "Natrium Klorida", "Kalsium Karbonat"], answer: 0 },
  { q: "Jika indikator gulamu sudah melewati batas harian, minuman apa yang paling tepat dipilih?", options: ["Teh manis kemasan", "Minuman boba", "Air putih segar"], answer: 2 },
];

export default function EducationPage() {
  const [servingsPerPack, setServingsPerPack] = useState(2);
  const [sugarPerServing, setSugarPerServing] = useState(12);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submittedScore, setSubmittedScore] = useState<number | null>(null);

  const totalPackSugar = servingsPerPack * sugarPerServing;

  const handleSubmitQuiz = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach((item, idx) => { if (answers[idx] === item.answer) score++; });
    setSubmittedScore(score);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {MODULES.map((mod) => (
          <div key={mod.id} className={`bg-white rounded-[2rem] p-6 border-2 shadow-sm flex flex-col justify-between ${mod.border}`}>
            <div>
              <span className={`inline-block px-3.5 py-1 rounded-full text-[11px] font-black mb-3 ${mod.badge}`}>{mod.category}</span>
              <h3 className="font-black text-slate-800 text-base mb-2">{mod.title}</h3>
              <p className="text-xs font-extrabold text-brand-teal mb-3">{mod.summary}</p>
              <p className="text-xs font-semibold text-slate-600 leading-relaxed">{mod.content}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[2rem] p-6 border-2 border-teal-100 shadow-sm">
        <h3 className="font-black text-slate-800 flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-brand-turquoise" /> Simulasi Interaktif: Membaca Tabel Informasi Nilai Gizi
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="border-4 border-slate-800 rounded-3xl p-5 bg-amber-50/40 font-mono text-xs space-y-2">
            <div className="border-b-4 border-slate-800 pb-1 font-black text-sm">INFORMASI NILAI GIZI</div>
            <div className="flex justify-between">
              <span>Takaran Saji: 100 ml</span>
              <span className="font-black text-brand-pink">{servingsPerPack} Sajian per Kemasan</span>
            </div>
            <div className="border-t-2 border-slate-800 pt-2 flex justify-between font-black">
              <span>Jumlah per Sajian — Gula Total</span>
              <span className="text-brand-teal">{sugarPerServing} g</span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-extrabold text-slate-700 mb-1">Ubah Jumlah Sajian per Kemasan: <strong>{servingsPerPack} sajian</strong></label>
              <input type="range" min={1} max={5} value={servingsPerPack} onChange={(e) => setServingsPerPack(Number(e.target.value))} className="w-full accent-brand-turquoise" />
            </div>
            <div>
              <label className="block text-xs font-extrabold text-slate-700 mb-1">Ubah Gula per Sajian: <strong>{sugarPerServing} gram</strong></label>
              <input type="range" min={2} max={25} value={sugarPerServing} onChange={(e) => setSugarPerServing(Number(e.target.value))} className="w-full accent-brand-pink" />
            </div>
            <div className="p-4 rounded-2xl bg-teal-50 border-2 border-teal-200 text-xs font-bold">
              Jika seluruh kemasan dihabiskan, total gula yang masuk adalah <strong className="text-base font-black text-brand-pink">{totalPackSugar} gram</strong> ({Math.round((totalPackSugar / 25) * 100)}% dari batas harian anak!).
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] p-6 border-2 border-teal-100 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-black text-slate-800 flex items-center gap-2"><HelpCircle className="w-5 h-5 text-brand-pink" /> Mini-Kuis Detektif Gula</h3>
          {submittedScore !== null && (
            <span className="px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Skor Kamu: {submittedScore} / {QUIZ_QUESTIONS.length}
            </span>
          )}
        </div>

        <div className="space-y-4">
          {QUIZ_QUESTIONS.map((item, qIdx) => (
            <div key={qIdx} className="p-4 rounded-3xl bg-cyan-50/50 border border-teal-100 space-y-2.5">
              <p className="text-sm font-extrabold text-slate-800">{qIdx + 1}. {item.q}</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {item.options.map((opt, oIdx) => {
                  const selected = answers[qIdx] === oIdx;
                  return (
                    <button key={oIdx} type="button" onClick={() => setAnswers({ ...answers, [qIdx]: oIdx })} className={`p-3 rounded-2xl text-xs font-bold text-left border-2 transition ${selected ? "border-brand-turquoise bg-teal-50 text-brand-teal" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"}`}>
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
          <button onClick={handleSubmitQuiz} className="px-6 py-3 rounded-full bg-brand-turquoise hover:bg-brand-teal text-white text-xs font-black shadow-playful-teal flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> Cek Skor Kuis
          </button>
        </div>
      </div>
    </div>
  );
}

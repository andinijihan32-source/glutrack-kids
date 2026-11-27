export const PORTION_UNITS = [
  { value: "gram", label: "Gram (g) — Langsung", defaultGrams: 1 },
  { value: "sendok", label: "Sendok (sdm/sdt)", defaultGrams: 10 },
  { value: "potong", label: "Potong (kue/lauk/buah)", defaultGrams: 55 },
  { value: "mangkuk", label: "Mangkuk", defaultGrams: 150 },
  { value: "gelas", label: "Gelas", defaultGrams: 250 },
  { value: "piring", label: "Piring", defaultGrams: 200 },
  { value: "buah", label: "Buah / Biji", defaultGrams: 100 },
  { value: "bungkus", label: "Bungkus / Kemasan", defaultGrams: 50 },
];

export const PORTION_SIZES = [
  { value: "kecil", label: "Kecil (0.7x)", multiplier: 0.7 },
  { value: "sedang", label: "Sedang / Standar (1.0x)", multiplier: 1.0 },
  { value: "besar", label: "Besar (1.5x)", multiplier: 1.5 },
];

export function calculateEstimatedGrams(
  unit: string,
  size: string,
  amount: number,
  baseGramsPerUnit?: number
): number {
  if (unit === "gram") return Math.round(amount * 10) / 10;
  const unitInfo = PORTION_UNITS.find((u) => u.value === unit);
  const sizeInfo = PORTION_SIZES.find((s) => s.value === size) || PORTION_SIZES[1];
  const gramsPerUnit =
    baseGramsPerUnit && baseGramsPerUnit > 0
      ? baseGramsPerUnit
      : unitInfo?.defaultGrams ?? 50;
  return Math.round(amount * gramsPerUnit * sizeInfo.multiplier * 10) / 10;
}

export function getSugarStatus(totalSugar: number, limit: number) {
  const safeLimit = limit > 0 ? limit : 25;
  const pct = Math.round((totalSugar / safeLimit) * 100);

  if (pct > 300) {
    return {
      level: "DANGER" as const,
      percentage: pct,
      label: "Zona Merah • Bahaya (≥ 3x Batas)",
      nudgeTitle: "Peringatan Dini Si Glu (Sugar Alert)!",
      nudgeMessage:
        "Wah, gula hari ini sudah 3x lipat batas aman anak! Yuk stop minuman/camilan manis dulu, minum air putih segar, dan gerak aktif ya!",
    };
  }

  if (pct > 100) {
    return {
      level: "WARNING" as const,
      percentage: pct,
      label: "Zona Kuning • Waspada",
      nudgeTitle: "Hati-Hati! Sudah Melewati 25g",
      nudgeMessage:
        "Asupan gulamu sudah melewati batas ideal harian (25g). Yuk rem yang manis-manis dan pilih air putih untuk minuman berikutnya!",
    };
  }

  return {
    level: "SAFE" as const,
    percentage: pct,
    label: "Zona Hijau • Tameng Aman",
    nudgeTitle: "Keren! Tameng Sehatmu Aktif!",
    nudgeMessage:
      "Konsumsi gulamu hari ini masih aman di bawah 25g. Terus pertahankan pola makan sehat dan aktif bergerak ya!",
  };
}

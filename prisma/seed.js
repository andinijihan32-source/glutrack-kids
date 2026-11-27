const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const p = (arr) => JSON.stringify(arr);

const FOOD_DATABASE = [
  // ================= 1. BUAH-BUAHAN SEGAR UTUH (Gula Alami / Intrinsic Sugar - Aman) =================
  {
    name: 'Pisang Ambon / Cavendish',
    category: 'FRUIT',
    sugarType: 'NATURAL_FRUIT',
    servingLabel: '1 buah sedang (100 g)',
    sugarGrams: 12.2,
    portions: p([
      { label: '1 buah kecil (65 g)', sugar: 7.9 },
      { label: '1 buah sedang (100 g)', sugar: 12.2 },
      { label: '1 buah besar (135 g)', sugar: 16.5 },
    ]),
    sourceRef: 'TKPI Kemenkes RI (Gula Alami Buah Utuh)',
  },
  {
    name: 'Semangka Merah',
    category: 'FRUIT',
    sugarType: 'NATURAL_FRUIT',
    servingLabel: '1 potong sedang (100 g)',
    sugarGrams: 6.2,
    portions: p([
      { label: '1 potong kecil (60 g)', sugar: 3.7 },
      { label: '1 potong sedang (100 g)', sugar: 6.2 },
      { label: '1 potong besar (160 g)', sugar: 9.9 },
    ]),
    sourceRef: 'TKPI Kemenkes RI (Gula Alami Buah Utuh)',
  },
  {
    name: 'Mangga Harum Manis',
    category: 'FRUIT',
    sugarType: 'NATURAL_FRUIT',
    servingLabel: '1/2 buah sedang / 1 ptg bsr (100 g)',
    sugarGrams: 13.7,
    portions: p([
      { label: '1 potong kecil (50 g)', sugar: 6.9 },
      { label: '1 potong sedang (100 g)', sugar: 13.7 },
      { label: '1 buah utuh sedang (200 g)', sugar: 27.4 },
    ]),
    sourceRef: 'TKPI Kemenkes RI (Gula Alami Buah Utuh)',
  },
  {
    name: 'Apel Merah / Fuji',
    category: 'FRUIT',
    sugarType: 'NATURAL_FRUIT',
    servingLabel: '1 buah sedang (120 g)',
    sugarGrams: 12.5,
    portions: p([
      { label: '1/2 buah / potong sedang (60 g)', sugar: 6.2 },
      { label: '1 buah sedang utuh (120 g)', sugar: 12.5 },
      { label: '1 buah besar utuh (180 g)', sugar: 18.7 },
    ]),
    sourceRef: 'TKPI Kemenkes RI (Gula Alami Buah Utuh)',
  },
  {
    name: 'Jeruk Manis / Pontianak',
    category: 'FRUIT',
    sugarType: 'NATURAL_FRUIT',
    servingLabel: '1 buah sedang (110 g)',
    sugarGrams: 9.4,
    portions: p([
      { label: '1 buah kecil (75 g)', sugar: 6.4 },
      { label: '1 buah sedang (110 g)', sugar: 9.4 },
      { label: '1 buah besar (150 g)', sugar: 12.8 },
    ]),
    sourceRef: 'TKPI Kemenkes RI (Gula Alami Buah Utuh)',
  },
  {
    name: 'Pepaya Matang',
    category: 'FRUIT',
    sugarType: 'NATURAL_FRUIT',
    servingLabel: '1 potong sedang (100 g)',
    sugarGrams: 7.8,
    portions: p([
      { label: '1 potong kecil (60 g)', sugar: 4.7 },
      { label: '1 potong sedang (100 g)', sugar: 7.8 },
      { label: '1 potong besar (150 g)', sugar: 11.7 },
    ]),
    sourceRef: 'TKPI Kemenkes RI (Gula Alami Buah Utuh)',
  },
  {
    name: 'Melon Hijau / Oranye',
    category: 'FRUIT',
    sugarType: 'NATURAL_FRUIT',
    servingLabel: '1 potong sedang (100 g)',
    sugarGrams: 7.9,
    portions: p([
      { label: '1 potong kecil (60 g)', sugar: 4.7 },
      { label: '1 potong sedang (100 g)', sugar: 7.9 },
      { label: '1 potong besar (150 g)', sugar: 11.8 },
    ]),
    sourceRef: 'TKPI Kemenkes RI (Gula Alami Buah Utuh)',
  },
  {
    name: 'Anggur Merah / Hijau',
    category: 'FRUIT',
    sugarType: 'NATURAL_FRUIT',
    servingLabel: '10 butir sedang (80 g)',
    sugarGrams: 12.4,
    portions: p([
      { label: '5 butir kecil (40 g)', sugar: 6.2 },
      { label: '10 butir sedang (80 g)', sugar: 12.4 },
      { label: '1 mangkok kecil / 20 butir (150 g)', sugar: 23.2 },
    ]),
    sourceRef: 'TKPI Kemenkes RI (Gula Alami Buah Utuh)',
  },
  {
    name: 'Pir Hijau / Madu',
    category: 'FRUIT',
    sugarType: 'NATURAL_FRUIT',
    servingLabel: '1 buah sedang (130 g)',
    sugarGrams: 12.7,
    portions: p([
      { label: '1/2 buah sedang (65 g)', sugar: 6.4 },
      { label: '1 buah sedang utuh (130 g)', sugar: 12.7 },
    ]),
    sourceRef: 'TKPI Kemenkes RI (Gula Alami Buah Utuh)',
  },
  {
    name: 'Alpukat Mentega',
    category: 'FRUIT',
    sugarType: 'NATURAL_FRUIT',
    servingLabel: '1/2 buah sedang (100 g)',
    sugarGrams: 0.7,
    portions: p([
      { label: '1/2 buah sedang (100 g)', sugar: 0.7 },
      { label: '1 buah utuh (200 g)', sugar: 1.4 },
    ]),
    sourceRef: 'TKPI Kemenkes RI (Gula Alami Buah Utuh)',
  },

  // ================= 2. MINUMAN KEMASAN (Acuan Informasi Nilai Gizi BPOM) =================
  {
    name: 'Susu UHT Cokelat (Kotak Kecil)',
    category: 'PACKAGED',
    sugarType: 'ADDED',
    servingLabel: '1 kotak kecil (125 ml)',
    sugarGrams: 12.0,
    portions: p([
      { label: '1/2 kotak (62.5 ml)', sugar: 6.0 },
      { label: '1 kotak kecil (125 ml)', sugar: 12.0 },
      { label: '1 kotak sedang (200 ml)', sugar: 19.0 },
      { label: '1 kotak besar (250 ml)', sugar: 24.0 },
    ]),
    sourceRef: 'Informasi Nilai Gizi BPOM',
  },
  {
    name: 'Susu UHT Stroberi (Kotak)',
    category: 'PACKAGED',
    sugarType: 'ADDED',
    servingLabel: '1 kotak kecil (125 ml)',
    sugarGrams: 11.5,
    portions: p([
      { label: '1 kotak kecil (125 ml)', sugar: 11.5 },
      { label: '1 kotak sedang (200 ml)', sugar: 18.0 },
      { label: '1 kotak besar (250 ml)', sugar: 23.0 },
    ]),
    sourceRef: 'Informasi Nilai Gizi BPOM',
  },
  {
    name: 'Susu UHT Full Cream / Plain (Tanpa Gula)',
    category: 'PACKAGED',
    sugarType: 'ADDED',
    servingLabel: '1 kotak sedang (200 ml)',
    sugarGrams: 0.0,
    portions: p([
      { label: '1 kotak kecil (125 ml)', sugar: 0.0 },
      { label: '1 kotak sedang (200 ml)', sugar: 0.0 },
      { label: '1 kotak besar (250 ml)', sugar: 0.0 },
    ]),
    sourceRef: 'Informasi Nilai Gizi BPOM (0g Gula Tambahan)',
  },
  {
    name: 'Teh Kotak / Teh Botol Melati',
    category: 'PACKAGED',
    sugarType: 'ADDED',
    servingLabel: '1 kotak / botol kecil (200 ml)',
    sugarGrams: 17.0,
    portions: p([
      { label: '1/2 kotak (100 ml)', sugar: 8.5 },
      { label: '1 kotak / botol kecil (200 ml)', sugar: 17.0 },
      { label: '1 botol sedang (350 ml)', sugar: 29.0 },
    ]),
    sourceRef: 'Informasi Nilai Gizi BPOM',
  },
  {
    name: 'Minuman Yogurt Kemasan (Botol Kecil)',
    category: 'PACKAGED',
    sugarType: 'ADDED',
    servingLabel: '1 botol kecil (65 ml)',
    sugarGrams: 10.0,
    portions: p([
      { label: '1 botol kecil (65 ml)', sugar: 10.0 },
      { label: '1 botol sedang (200 ml)', sugar: 22.0 },
    ]),
    sourceRef: 'Informasi Nilai Gizi BPOM',
  },
  {
    name: 'Minuman Soda / Cola Kaleng',
    category: 'PACKAGED',
    sugarType: 'ADDED',
    servingLabel: '1 kaleng kecil (250 ml)',
    sugarGrams: 27.0,
    portions: p([
      { label: '1/2 kaleng (125 ml)', sugar: 13.5 },
      { label: '1 kaleng kecil (250 ml)', sugar: 27.0 },
      { label: '1 botol sedang (390 ml)', sugar: 41.0 },
    ]),
    sourceRef: 'Informasi Nilai Gizi BPOM',
  },
  {
    name: 'Jus Buah Kemasan Kotak (Jambu / Jeruk / Mangga)',
    category: 'PACKAGED',
    sugarType: 'ADDED',
    servingLabel: '1 kotak sedang (250 ml)',
    sugarGrams: 24.0,
    portions: p([
      { label: '1 kotak kecil (125 ml)', sugar: 12.0 },
      { label: '1 kotak sedang (250 ml)', sugar: 24.0 },
    ]),
    sourceRef: 'Informasi Nilai Gizi BPOM',
  },
  {
    name: 'Minuman Isotonik / Rasa Buah Botol',
    category: 'PACKAGED',
    sugarType: 'ADDED',
    servingLabel: '1 botol sedang (350 ml)',
    sugarGrams: 21.0,
    portions: p([
      { label: '1/2 botol (175 ml)', sugar: 10.5 },
      { label: '1 botol sedang (350 ml)', sugar: 21.0 },
      { label: '1 botol besar (500 ml)', sugar: 30.0 },
    ]),
    sourceRef: 'Informasi Nilai Gizi BPOM',
  },

  // ================= 3. JAJANAN & KUE (Acuan URT Kemenkes RI & Label BPOM) =================
  {
    name: 'Cokelat Batang Susu / Kacang',
    category: 'SNACK',
    sugarType: 'ADDED',
    servingLabel: '1 potong sedang / 3 keping (25 g)',
    sugarGrams: 13.5,
    portions: p([
      { label: '1 potong kecil / 1 keping (10 g)', sugar: 5.4 },
      { label: '1 potong sedang / 3 keping (25 g)', sugar: 13.5 },
      { label: '1 batang besar penuh (55 g)', sugar: 29.7 },
    ]),
    sourceRef: 'TKPI Kemenkes RI & ING BPOM',
  },
  {
    name: 'Donat Gula Halus / Meses Cokelat',
    category: 'SNACK',
    sugarType: 'ADDED',
    servingLabel: '1 buah sedang (50 g)',
    sugarGrams: 14.0,
    portions: p([
      { label: '1 buah kecil / donat mini (25 g)', sugar: 7.0 },
      { label: '1 buah sedang standar (50 g)', sugar: 14.0 },
      { label: '1 buah besar / topping penuh (80 g)', sugar: 22.5 },
    ]),
    sourceRef: 'URT Kemenkes RI / TKPI',
  },
  {
    name: 'Biskuit Krim Cokelat / Vanila',
    category: 'SNACK',
    sugarType: 'ADDED',
    servingLabel: '3 keping sedang (30 g)',
    sugarGrams: 11.0,
    portions: p([
      { label: '1 keping (10 g)', sugar: 3.7 },
      { label: '3 keping / 1 takaran saji (30 g)', sugar: 11.0 },
      { label: '1 bungkus panjang (120 g)', sugar: 44.0 },
    ]),
    sourceRef: 'Informasi Nilai Gizi BPOM',
  },
  {
    name: 'Wafer Cokelat / Keju Kemasan',
    category: 'SNACK',
    sugarType: 'ADDED',
    servingLabel: '1 bungkus kecil (20 g)',
    sugarGrams: 8.5,
    portions: p([
      { label: '1 bungkus kecil (20 g)', sugar: 8.5 },
      { label: '1 bungkus sedang (45 g)', sugar: 19.0 },
    ]),
    sourceRef: 'Informasi Nilai Gizi BPOM',
  },
  {
    name: 'Es Krim Stik Cokelat / Vanila',
    category: 'SNACK',
    sugarType: 'ADDED',
    servingLabel: '1 stik standar (60 ml)',
    sugarGrams: 15.0,
    portions: p([
      { label: '1 stik kecil / mini (40 ml)', sugar: 10.0 },
      { label: '1 stik standar (60 ml)', sugar: 15.0 },
      { label: '1 cone besar (110 ml)', sugar: 24.0 },
    ]),
    sourceRef: 'Informasi Nilai Gizi BPOM',
  },
  {
    name: 'Martabak Manis (Terang Bulan Cokelat Keju)',
    category: 'SNACK',
    sugarType: 'ADDED',
    servingLabel: '1 potong sedang (60 g)',
    sugarGrams: 18.0,
    portions: p([
      { label: '1 potong kecil (35 g)', sugar: 10.5 },
      { label: '1 potong sedang (60 g)', sugar: 18.0 },
      { label: '1 potong besar (90 g)', sugar: 27.0 },
    ]),
    sourceRef: 'URT Kemenkes RI / TKPI',
  },
  {
    name: 'Pisang Cokelat (Piscok) / Kue Cubit',
    category: 'SNACK',
    sugarType: 'ADDED',
    servingLabel: '1 buah / potong sedang (45 g)',
    sugarGrams: 11.0,
    portions: p([
      { label: '1 potong kecil (25 g)', sugar: 6.0 },
      { label: '1 buah / potong sedang (45 g)', sugar: 11.0 },
      { label: '1 potong besar (70 g)', sugar: 17.0 },
    ]),
    sourceRef: 'URT Kemenkes RI / TKPI',
  },
  {
    name: 'Permen Manis / Lolipop',
    category: 'SNACK',
    sugarType: 'ADDED',
    servingLabel: '2 butir permen (10 g)',
    sugarGrams: 8.0,
    portions: p([
      { label: '1 butir permen (5 g)', sugar: 4.0 },
      { label: '2 butir permen (10 g)', sugar: 8.0 },
      { label: '1 batang lolipop (15 g)', sugar: 12.0 },
    ]),
    sourceRef: 'Informasi Nilai Gizi BPOM',
  },
  {
    name: 'Chiki / Snack Jagung Manis Pedas',
    category: 'SNACK',
    sugarType: 'ADDED',
    servingLabel: '1 bungkus kecil (25 g)',
    sugarGrams: 4.5,
    portions: p([
      { label: '1 bungkus kecil (25 g)', sugar: 4.5 },
      { label: '1 bungkus besar (65 g)', sugar: 11.5 },
    ]),
    sourceRef: 'Informasi Nilai Gizi BPOM',
  },
  {
    name: 'Roti Manis Isi Cokelat / Selai',
    category: 'SNACK',
    sugarType: 'ADDED',
    servingLabel: '1 bungkus / buah sedang (60 g)',
    sugarGrams: 13.0,
    portions: p([
      { label: '1 potong kecil (30 g)', sugar: 6.5 },
      { label: '1 buah sedang (60 g)', sugar: 13.0 },
      { label: '1 buah besar (90 g)', sugar: 19.5 },
    ]),
    sourceRef: 'Informasi Nilai Gizi BPOM',
  },

  // ================= 4. MINUMAN SEDUH & KEKINIAN (Acuan URT Gelas & Mangkok) =================
  {
    name: 'Es Teh Manis Warung / Buatan Rumah',
    category: 'DRINK',
    sugarType: 'ADDED',
    servingLabel: '1 gelas belimbing (250 ml)',
    sugarGrams: 20.0,
    portions: p([
      { label: '1 gelas kecil (150 ml)', sugar: 12.0 },
      { label: '1 gelas belimbing sedang (250 ml)', sugar: 20.0 },
      { label: '1 gelas jumbo / cup besar (400 ml)', sugar: 32.0 },
    ]),
    sourceRef: 'URT Kemenkes RI (Gelas Belimbing)',
  },
  {
    name: 'Boba Brown Sugar Milk Tea',
    category: 'DRINK',
    sugarType: 'ADDED',
    servingLabel: '1 cup sedang (350 ml)',
    sugarGrams: 34.0,
    portions: p([
      { label: '1 cup kecil (250 ml)', sugar: 24.0 },
      { label: '1 cup sedang (350 ml)', sugar: 34.0 },
      { label: '1 cup besar (500 ml)', sugar: 48.0 },
    ]),
    sourceRef: 'Survei Gizi Pangan Komersial',
  },
  {
    name: 'Susu Bubuk Cokelat Seduh (Milo / Dancow)',
    category: 'DRINK',
    sugarType: 'ADDED',
    servingLabel: '1 gelas sedang (200 ml)',
    sugarGrams: 16.0,
    portions: p([
      { label: '1 gelas kecil (125 ml)', sugar: 10.0 },
      { label: '1 gelas sedang (200 ml)', sugar: 16.0 },
    ]),
    sourceRef: 'Informasi Nilai Gizi BPOM',
  },
  {
    name: 'Es Sirup Merah / Cocopandan',
    category: 'DRINK',
    sugarType: 'ADDED',
    servingLabel: '1 gelas belimbing (250 ml)',
    sugarGrams: 22.0,
    portions: p([
      { label: '1 gelas kecil (150 ml)', sugar: 13.0 },
      { label: '1 gelas belimbing (250 ml)', sugar: 22.0 },
    ]),
    sourceRef: 'URT Kemenkes RI & ING BPOM',
  },
  {
    name: 'Jus Buah Segar Pakai Gula (Alpukat / Mangga)',
    category: 'DRINK',
    sugarType: 'ADDED',
    servingLabel: '1 gelas sedang (250 ml)',
    sugarGrams: 24.0,
    portions: p([
      { label: '1 gelas kecil (150 ml)', sugar: 14.5 },
      { label: '1 gelas sedang (250 ml)', sugar: 24.0 },
    ]),
    sourceRef: 'URT Kemenkes RI (Free Sugar Jus)',
  },

  // ================= 5. MASAKAN RUMAH & HIDANGAN BERKUAH (Acuan URT Kemenkes RI) =================
  {
    name: 'Sayur Sop Ayam / Bakso',
    category: 'HOMEMADE',
    sugarType: 'ADDED',
    servingLabel: '1 mangkok sedang (200 ml)',
    sugarGrams: 3.0,
    portions: p([
      { label: '1 mangkok kecil (125 ml)', sugar: 1.8 },
      { label: '1 mangkok sedang (200 ml)', sugar: 3.0 },
      { label: '1 mangkok besar (300 ml)', sugar: 4.5 },
    ]),
    sourceRef: 'URT Kemenkes RI (Mangkok Sedang)',
  },
  {
    name: 'Sayur Asem / Sayur Lodeh',
    category: 'HOMEMADE',
    sugarType: 'ADDED',
    servingLabel: '1 mangkok sedang (200 ml)',
    sugarGrams: 4.5,
    portions: p([
      { label: '1 mangkok kecil (125 ml)', sugar: 2.8 },
      { label: '1 mangkok sedang (200 ml)', sugar: 4.5 },
      { label: '1 mangkok besar (300 ml)', sugar: 6.8 },
    ]),
    sourceRef: 'URT Kemenkes RI (Mangkok Sedang)',
  },
  {
    name: 'Ayam Kecap / Ayam Bakar Manis',
    category: 'HOMEMADE',
    sugarType: 'ADDED',
    servingLabel: '1 potong sedang (60 g)',
    sugarGrams: 6.5,
    portions: p([
      { label: '1 potong kecil (40 g)', sugar: 4.3 },
      { label: '1 potong sedang (60 g)', sugar: 6.5 },
      { label: '1 potong besar (90 g)', sugar: 9.8 },
    ]),
    sourceRef: 'URT Kemenkes RI / TKPI',
  },
  {
    name: 'Semur Daging / Telur Semur',
    category: 'HOMEMADE',
    sugarType: 'ADDED',
    servingLabel: '1 potong / 1 butir sedang (60 g)',
    sugarGrams: 7.0,
    portions: p([
      { label: '1 potong kecil (35 g)', sugar: 4.0 },
      { label: '1 potong / butir sedang (60 g)', sugar: 7.0 },
      { label: '1 potong besar (90 g)', sugar: 10.5 },
    ]),
    sourceRef: 'URT Kemenkes RI / TKPI',
  },
  {
    name: 'Tempe / Tahu Bacem atau Orek Tempe Manis',
    category: 'HOMEMADE',
    sugarType: 'ADDED',
    servingLabel: '1 potong sedang / 2 sdm (50 g)',
    sugarGrams: 5.5,
    portions: p([
      { label: '1 potong kecil / 1 sdm (25 g)', sugar: 2.8 },
      { label: '1 potong sedang / 2 sdm (50 g)', sugar: 5.5 },
      { label: '1 potong besar / 3 sdm (75 g)', sugar: 8.3 },
    ]),
    sourceRef: 'URT Kemenkes RI / TKPI',
  },
  {
    name: 'Bubur Kacang Hijau / Kolak Pisang',
    category: 'HOMEMADE',
    sugarType: 'ADDED',
    servingLabel: '1 mangkok sedang (200 ml)',
    sugarGrams: 22.0,
    portions: p([
      { label: '1 mangkok kecil (125 ml)', sugar: 13.8 },
      { label: '1 mangkok sedang (200 ml)', sugar: 22.0 },
      { label: '1 mangkok besar (300 ml)', sugar: 33.0 },
    ]),
    sourceRef: 'URT Kemenkes RI (Mangkok Sedang)',
  },
  {
    name: 'Sereal Sarapan Anak (Cokelat / Madu) + Susu',
    category: 'HOMEMADE',
    sugarType: 'ADDED',
    servingLabel: '1 mangkok sedang (1 porsi saji)',
    sugarGrams: 12.0,
    portions: p([
      { label: '1 mangkok kecil (1/2 porsi)', sugar: 6.0 },
      { label: '1 mangkok sedang (1 porsi saji)', sugar: 12.0 },
    ]),
    sourceRef: 'Informasi Nilai Gizi BPOM',
  },
  {
    name: 'Nasi Putih (Karbohidrat Kompleks, Non-Gula Tambahan)',
    category: 'HOMEMADE',
    sugarType: 'ADDED',
    servingLabel: '1 centong / porsi sedang (100 g)',
    sugarGrams: 0.1,
    portions: p([
      { label: '1/2 centong / porsi kecil (50 g)', sugar: 0.0 },
      { label: '1 centong / porsi sedang (100 g)', sugar: 0.1 },
      { label: '1.5 centong / porsi besar (150 g)', sugar: 0.2 },
    ]),
    sourceRef: 'TKPI Kemenkes RI (0g Gula Tambahan)',
  },

  // ================= 6. PEMANIS & OLESAN (Acuan Takaran Sendok Baku Permenkes RI) =================
  {
    name: 'Gula Pasir / Gula Merah (Tambahan Masak/Minum)',
    category: 'SWEETENER',
    sugarType: 'ADDED',
    servingLabel: '1 sendok teh peres (4 g)',
    sugarGrams: 4.0,
    portions: p([
      { label: '1/2 sendok teh (2 g)', sugar: 2.0 },
      { label: '1 sendok teh peres (4 g)', sugar: 4.0 },
      { label: '1 sendok makan peres (12 g)', sugar: 12.0 },
    ]),
    sourceRef: 'Permenkes RI No. 30/2013 & URT Kemenkes',
  },
  {
    name: 'Kental Manis Putih / Cokelat',
    category: 'SWEETENER',
    sugarType: 'ADDED',
    servingLabel: '1 sendok makan (15 g)',
    sugarGrams: 8.5,
    portions: p([
      { label: '1 sendok teh (5 g)', sugar: 2.8 },
      { label: '1 sendok makan (15 g)', sugar: 8.5 },
      { label: '1 sachet utuh (38 g)', sugar: 21.5 },
    ]),
    sourceRef: 'Informasi Nilai Gizi BPOM & URT Sendok',
  },
  {
    name: 'Selai Cokelat / Kacang / Stroberi Roti',
    category: 'SWEETENER',
    sugarType: 'ADDED',
    servingLabel: '1 sendok makan (15 g)',
    sugarGrams: 8.0,
    portions: p([
      { label: '1 sendok teh (5 g)', sugar: 2.7 },
      { label: '1 sendok makan (15 g)', sugar: 8.0 },
    ]),
    sourceRef: 'URT Sendok Kemenkes RI',
  },
  {
    name: 'Madu Murni / Madu Rasa',
    category: 'SWEETENER',
    sugarType: 'ADDED',
    servingLabel: '1 sendok teh (5 ml)',
    sugarGrams: 4.2,
    portions: p([
      { label: '1 sendok teh (5 ml)', sugar: 4.2 },
      { label: '1 sendok makan (15 ml)', sugar: 12.6 },
    ]),
    sourceRef: 'TKPI Kemenkes RI & WHO Free Sugar',
  },
  {
    name: 'Kecap Manis / Saus Tomat Manis',
    category: 'SWEETENER',
    sugarType: 'ADDED',
    servingLabel: '1 sendok makan (15 ml)',
    sugarGrams: 6.5,
    portions: p([
      { label: '1 sendok teh (5 ml)', sugar: 2.2 },
      { label: '1 sendok makan (15 ml)', sugar: 6.5 },
    ]),
    sourceRef: 'Informasi Nilai Gizi BPOM & URT Sendok',
  },
];

async function main() {
  console.log('Memperbarui database makanan & buah terstandar Kemenkes/BPOM...');
  await prisma.foodItem.deleteMany({ where: { isCustom: false } });

  for (const item of FOOD_DATABASE) {
    await prisma.foodItem.create({ data: item });
  }
  console.log(`Selesai! ${FOOD_DATABASE.length} item makanan, minuman, jajanan, masakan rumah & buah berhasil disimpan.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
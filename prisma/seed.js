const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const foods = [
    { name: "Gula Pasir / Gula Meja", category: "Makanan", sugarPer100g: 100.0, defaultServingUnit: "sendok", gramsPerUnit: 5.0 },
    { name: "Teh Manis", category: "Minuman", sugarPer100g: 8.5, defaultServingUnit: "gelas", gramsPerUnit: 250.0 },
    { name: "Susu Kental Manis", category: "Minuman", sugarPer100g: 54.0, defaultServingUnit: "sendok", gramsPerUnit: 15.0 },
    { name: "Donat Gula / Glaze", category: "Camilan", sugarPer100g: 28.0, defaultServingUnit: "potong", gramsPerUnit: 55.0 },
    { name: "Biskuit Cokelat", category: "Kemasan", sugarPer100g: 36.0, defaultServingUnit: "bungkus", gramsPerUnit: 40.0 },
    { name: "Minuman Teh Kemasan Botol", category: "Kemasan", sugarPer100g: 7.5, defaultServingUnit: "bungkus", gramsPerUnit: 330.0 },
    { name: "Susu UHT Rasa Cokelat/Stroberi", category: "Kemasan", sugarPer100g: 10.5, defaultServingUnit: "bungkus", gramsPerUnit: 200.0 },
    { name: "Es Krim Cone / Cup", category: "Camilan", sugarPer100g: 22.0, defaultServingUnit: "mangkuk", gramsPerUnit: 80.0 },
    { name: "Martabak Manis", category: "Camilan", sugarPer100g: 32.0, defaultServingUnit: "potong", gramsPerUnit: 65.0 },
    { name: "Tempe Bacem / Tahu Bacem", category: "Lauk", sugarPer100g: 14.0, defaultServingUnit: "potong", gramsPerUnit: 50.0 },
    { name: "Semur Daging / Ayam Kecap", category: "Lauk", sugarPer100g: 11.0, defaultServingUnit: "potong", gramsPerUnit: 75.0 },
    { name: "Sereal Sarapan Manis", category: "Makanan", sugarPer100g: 30.0, defaultServingUnit: "mangkuk", gramsPerUnit: 45.0 },
    { name: "Nasi Putih (Gula Alami Rendah)", category: "Makanan", sugarPer100g: 0.2, defaultServingUnit: "piring", gramsPerUnit: 150.0 },
    { name: "Buah Pisang / Apel Segar", category: "Makanan", sugarPer100g: 11.0, defaultServingUnit: "buah", gramsPerUnit: 100.0 },
    { name: "Boba Brown Sugar Milk Tea", category: "Minuman", sugarPer100g: 12.5, defaultServingUnit: "gelas", gramsPerUnit: 350.0 },
    { name: "Kecap Manis / Saus Tomat", category: "Makanan", sugarPer100g: 48.0, defaultServingUnit: "sendok", gramsPerUnit: 15.0 },
  ];

  for (const f of foods) {
    await prisma.foodItem.upsert({
      where: { name: f.name },
      update: f,
      create: f,
    });
  }

  const defaultPass = await bcrypt.hash("123456", 10);

  const parent = await prisma.user.upsert({
    where: { username: "bunda_rina" },
    update: {},
    create: {
      username: "bunda_rina",
      name: "Bunda Rina (Orang Tua)",
      passwordHash: defaultPass,
      role: "PARENT",
      dailySugarLimit: 25,
      avatarColor: "#00B4A6",
    },
  });

  await prisma.user.upsert({
    where: { username: "rafi_anak" },
    update: { parentId: parent.id },
    create: {
      username: "rafi_anak",
      name: "Rafi (10 Tahun)",
      passwordHash: defaultPass,
      role: "CHILDREN",
      dailySugarLimit: 25,
      avatarColor: "#38BDF8",
      parentId: parent.id,
    },
  });

  await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      name: "Admin Glutrack",
      passwordHash: defaultPass,
      role: "ADMIN",
      dailySugarLimit: 25,
      avatarColor: "#A855F7",
    },
  });

  console.log("Database Supabase GLUTRACK KIDS berhasil diisi data awal!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

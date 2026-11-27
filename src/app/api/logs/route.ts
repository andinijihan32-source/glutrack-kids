import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

export async function GET(req: Request) {
  const session = await getSessionUser();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const targetUserId = searchParams.get("userId") || session.userId;

  const logs = await prisma.foodLog.findMany({
    where: { userId: targetUserId },
    include: { loggedBy: { select: { name: true } } },
    orderBy: [{ consumedAt: "desc" }, { createdAt: "desc" }],
  });

  return NextResponse.json({ logs });
}

export async function POST(req: Request) {
  const session = await getSessionUser();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const created = await prisma.foodLog.create({
      data: {
        userId: body.userId || session.userId,
        loggedById: session.userId,
        foodItemId: body.foodItemId || null,
        foodName: String(body.foodName).trim(),
        isPackaged: Boolean(body.isPackaged),
        portionUnit: String(body.portionUnit || "potong"),
        portionSize: String(body.portionSize || "sedang"),
        portionAmount: Number(body.portionAmount) || 1,
        estimatedGrams: Number(body.estimatedGrams) || 0,
        sugarGrams: Number(body.sugarGrams) || 0,
        consumedAt: body.consumedAt ? new Date(`${body.consumedAt}T12:00:00`) : new Date(),
      },
      include: { loggedBy: { select: { name: true } } },
    });

    return NextResponse.json({ log: created });
  } catch (err) {
    console.error("Create log error:", err);
    return NextResponse.json({ error: "Gagal menyimpan catatan." }, { status: 500 });
  }
}

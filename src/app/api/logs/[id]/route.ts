import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await getSessionUser();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const updated = await prisma.foodLog.update({
      where: { id: params.id },
      data: {
        foodName: String(body.foodName).trim(),
        isPackaged: Boolean(body.isPackaged),
        portionUnit: String(body.portionUnit),
        portionSize: String(body.portionSize || "sedang"),
        portionAmount: Number(body.portionAmount),
        estimatedGrams: Number(body.estimatedGrams),
        sugarGrams: Number(body.sugarGrams),
        consumedAt: body.consumedAt ? new Date(`${body.consumedAt}T12:00:00`) : undefined,
      },
    });
    return NextResponse.json({ log: updated });
  } catch (err) {
    console.error("Update log error:", err);
    return NextResponse.json({ error: "Gagal memperbarui catatan." }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const session = await getSessionUser();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await prisma.foodLog.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Delete log error:", err);
    return NextResponse.json({ error: "Gagal menghapus catatan." }, { status: 500 });
  }
}

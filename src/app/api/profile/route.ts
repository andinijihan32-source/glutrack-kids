import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

export async function PUT(req: Request) {
  const session = await getSessionUser();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const updated = await prisma.user.update({
    where: { id: session.userId },
    data: {
      name: String(body.name).trim(),
      dailySugarLimit: Number(body.dailySugarLimit) || 25,
    },
  });

  return NextResponse.json({ user: updated });
}

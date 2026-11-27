import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const foods = await prisma.foodItem.findMany({ orderBy: { name: "asc" } });
  return NextResponse.json({ foods });
}

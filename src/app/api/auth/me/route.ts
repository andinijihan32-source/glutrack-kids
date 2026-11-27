import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

export async function GET() {
  const session = await getSessionUser();
  if (!session) {
    return NextResponse.json({ user: null, familyAccounts: [] }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    include: {
      children: {
        select: { id: true, username: true, name: true, role: true, dailySugarLimit: true, avatarColor: true },
      },
      parent: {
        select: {
          id: true, username: true, name: true, role: true, dailySugarLimit: true, avatarColor: true,
          children: {
            select: { id: true, username: true, name: true, role: true, dailySugarLimit: true, avatarColor: true },
          },
        },
      },
    },
  });

  if (!user) {
    return NextResponse.json({ user: null, familyAccounts: [] }, { status: 401 });
  }

  const map = new Map();
  map.set(user.id, {
    id: user.id, username: user.username, name: user.name, role: user.role,
    dailySugarLimit: user.dailySugarLimit, avatarColor: user.avatarColor,
  });

  if (user.children) {
    for (const c of user.children) map.set(c.id, c);
  }
  if (user.parent) {
    map.set(user.parent.id, {
      id: user.parent.id, username: user.parent.username, name: user.parent.name,
      role: user.parent.role, dailySugarLimit: user.parent.dailySugarLimit, avatarColor: user.parent.avatarColor,
    });
    for (const sibling of user.parent.children) map.set(sibling.id, sibling);
  }

  return NextResponse.json({
    user: {
      id: user.id, username: user.username, name: user.name, role: user.role,
      dailySugarLimit: user.dailySugarLimit, avatarColor: user.avatarColor,
    },
    familyAccounts: Array.from(map.values()),
  });
}

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { SESSION_COOKIE, getSessionUser, signToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, username, password, role, dailySugarLimit, linkToCurrentParent } = body;

    if (!name || !username) {
      return NextResponse.json({ error: "Nama dan username wajib diisi." }, { status: 400 });
    }

    const cleanUsername = String(username).trim().toLowerCase();
    const existing = await prisma.user.findUnique({ where: { username: cleanUsername } });
    if (existing) {
      return NextResponse.json({ error: "Username sudah dipakai." }, { status: 409 });
    }

    const session = await getSessionUser();
    let parentId: string | null = null;
    if (linkToCurrentParent && session && session.role === "PARENT" && role === "CHILDREN") {
      parentId = session.userId;
    }

    const colors = ["#00B4A6", "#38BDF8", "#F43F5E", "#FACC15", "#A855F7", "#4ADE80"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const passwordHash = await bcrypt.hash(String(password || "123456"), 10);

    const user = await prisma.user.create({
      data: {
        name: String(name).trim(),
        username: cleanUsername,
        passwordHash,
        role: role || "PARENT",
        dailySugarLimit: Number(dailySugarLimit) || 25,
        avatarColor: randomColor,
        parentId,
      },
    });

    const token = await signToken({
      userId: user.id,
      username: user.username,
      role: user.role,
    });

    const res = NextResponse.json({
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role,
        dailySugarLimit: user.dailySugarLimit,
        avatarColor: user.avatarColor,
      },
    });

    res.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    return res;
  } catch (err) {
    console.error("Register error:", err);
    return NextResponse.json({ error: "Gagal membuat akun baru." }, { status: 500 });
  }
}

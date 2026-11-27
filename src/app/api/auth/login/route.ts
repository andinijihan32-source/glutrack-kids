import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { SESSION_COOKIE, signToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, password, quickSwitchUserId } = body;

    let user = null;
    if (quickSwitchUserId) {
      user = await prisma.user.findUnique({ where: { id: quickSwitchUserId } });
    } else if (username) {
      user = await prisma.user.findUnique({
        where: { username: String(username).trim().toLowerCase() },
      });
      if (user && password) {
        const valid = await bcrypt.compare(String(password), user.passwordHash);
        if (!valid) {
          return NextResponse.json({ error: "Username atau password salah." }, { status: 401 });
        }
      }
    }

    if (!user) {
      return NextResponse.json({ error: "Akun tidak ditemukan." }, { status: 404 });
    }

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
    console.error("Login error:", err);
    return NextResponse.json({ error: "Gagal memproses login." }, { status: 500 });
  }
}

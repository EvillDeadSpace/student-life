import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Missing email or password" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // NOTE: passwords are stored as plain text in this project - compare directly
    if (user.password !== password) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Do not send password back - construct a safe user object
    const safeUser = {
      id: user.id,
      ime: user.ime,
      prezime: user.prezime,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      lokacija: user.lokacija,
    };

    return NextResponse.json(safeUser);
  } catch (error) {
    console.error("/api/auth/login error:", error);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}

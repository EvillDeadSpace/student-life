import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// User registration endpoint
export async function POST(req: Request) {
  try {
    const { ime, prezime, email, password, lokacija } = await req.json();

    const user = await prisma.user.create({
      data: { ime, prezime, email, password, lokacija },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Registration error details:", error);
    return NextResponse.json(
      {
        error: "User registration failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

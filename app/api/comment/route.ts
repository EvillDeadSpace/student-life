import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

// ADD COMMENT
export async function POST(request: Request) {
  const body = await request.json();
  const { content, userId, postId } = body;

  if (!content || !userId || !postId) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const comment = await prisma.comment.create({
    data: { content, userId, postId },
  });

  return NextResponse.json(comment);
}

// GET COMMENT
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const postIdParam = url.searchParams.get("postId");
    const postId = postIdParam ? Number(postIdParam) : undefined;

    if (!postId) {
      const commentsAll = await prisma.comment.findMany({
        include: { user: true, post: true },
        orderBy: { createdAt: "desc" },
        take: 50,
      });
      return NextResponse.json(commentsAll);
    }

    const comments = await prisma.comment.findMany({
      where: { postId },
      include: { user: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(comments);
  } catch (error) {
    console.error("GET /api/comment error:", error);
    return NextResponse.json(
      { error: "Error fetching comments" },
      { status: 500 }
    );
  }
}

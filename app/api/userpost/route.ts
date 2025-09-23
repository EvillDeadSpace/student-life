import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET POST BY USER ID
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId"); // query param

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  const posts = await prisma.post.findMany({
    where: { userId: Number(userId) },
  });

  return NextResponse.json(posts);
}

// DELETE METHOD for post removing
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("postId");

    if (!postId) {
      return NextResponse.json({ error: "Missing postId" }, { status: 400 });
    }

    const postIdNum = Number(postId);
    if (Number.isNaN(postIdNum)) {
      return NextResponse.json({ error: "Invalid postId" }, { status: 400 });
    }

    // ensure the post exists and optionally get owner for auth checks
    const existing = await prisma.post.findUnique({
      where: { id: postIdNum },
      select: { id: true, userId: true },
    });

    if (!existing) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // TODO: Add ownership/auth checks here. Example placeholder:
    // const user = await getUserFromSession(req);
    // if (!user || user.id !== existing.userId) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    // Delete dependent records first to avoid FK constraint violations.
    // Use a transaction so all deletes succeed or none are applied.
    const results = await prisma.$transaction([
      prisma.comment.deleteMany({ where: { postId: postIdNum } }),
      prisma.likes.deleteMany({ where: { postId: postIdNum } }),
      prisma.post.delete({ where: { id: postIdNum } }),
    ]);

    // results[2] is the deleted post
    const deletedPost = results[2];

    return NextResponse.json(deletedPost, { status: 200 });
  } catch (err: unknown) {
    console.error("DELETE /api/userpost error:", err);
    // Prisma P2003 is foreign key constraint violation; report friendly message
    if (typeof err === "object" && err !== null) {
      const record = err as Record<string, unknown>;
      const code = record["code"];
      if (code === "P2003") {
        return NextResponse.json(
          {
            error:
              "Constraint violation while deleting post (dependent records exist)",
          },
          { status: 409 }
        );
      }
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

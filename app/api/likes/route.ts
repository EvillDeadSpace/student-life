// ...existing code...
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // use default import if lib/prisma exports default

// GET: count likes
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const raw = url.searchParams.get("postId");
    console.log("GET /api/likes raw postId:", raw);
    if (raw === null)
      return NextResponse.json({ error: "postId required" }, { status: 400 });
    const postId = Number(raw);
    if (Number.isNaN(postId))
      return NextResponse.json(
        { error: "postId must be a number" },
        { status: 400 }
      );

    const count = await prisma.likes.count({ where: { postId } });
    return NextResponse.json({ count });
  } catch (err: unknown) {
    console.error("GET /api/likes error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Server error" },
      { status: 500 }
    );
  }
}

// POST: toggle like
export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("POST /api/likes body:", body);

    const rawPostId = body?.postId;
    const rawUserId = body?.userId;

    if (rawPostId === undefined || rawUserId === undefined) {
      console.log("POST /api/likes missing fields", { rawPostId, rawUserId });
      return NextResponse.json(
        { error: "postId and userId required" },
        { status: 400 }
      );
    }

    const postId = Number(rawPostId);
    const userId = Number(rawUserId);

    if (Number.isNaN(postId) || Number.isNaN(userId)) {
      console.log("POST /api/likes invalid numeric fields", {
        rawPostId,
        rawUserId,
      });
      return NextResponse.json(
        { error: "postId and userId must be numbers" },
        { status: 400 }
      );
    }

    // validate existence
    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!post) {
      console.log("POST /api/likes post not found for id", postId);
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      console.log("POST /api/likes user not found for id", userId);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const existing = await prisma.likes.findUnique({
      where: { userId_postId: { userId, postId } },
    });

    if (existing) {
      await prisma.likes.delete({ where: { id: existing.id } });
      return NextResponse.json({ liked: false });
    }

    await prisma.likes.create({ data: { userId, postId } });
    return NextResponse.json({ liked: true });
  } catch (err: unknown) {
    console.error("POST /api/likes error:", err);
    // If FK error (P2003) -> useful message
    if (
      typeof err === "object" &&
      err !== null &&
      "code" in err &&
      (err as { code?: string }).code === "P2003"
    ) {
      return NextResponse.json(
        { error: "Foreign key constraint violated" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Server error" },
      { status: 500 }
    );
  }
}

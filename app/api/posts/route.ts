import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create new post
export async function POST(req: Request) {
  try {
    const { userId, ime, prezime, naslov, tekst, kategorija } =
      await req.json();

    const post = await prisma.post.create({
      data: {
        userId,
        ime,
        prezime,
        naslov,
        tekst,
        kategorija,
      },
    });

    // Invalidate cache for category pages to show new posts immediately
    const categorySlug = kategorija.toLowerCase().replace(/\s+/g, "-");
    revalidatePath(`/kategorije/${categorySlug}`);
    revalidatePath("/kategorije");

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json({ error: "Error creating post" }, { status: 500 });
  }
}

// Get all posts with user location (JOIN query)
export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: {
          select: {
            lokacija: true,
          },
        },
      },
      orderBy: {
        datum: "desc",
      },
    });

    // Transform data to include user location in each post
    const postsWithLocation = posts.map((post) => ({
      ...post,
      lokacija: post.user.lokacija,
    }));

    return NextResponse.json(postsWithLocation);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Error fetching posts" },
      { status: 500 }
    );
  }
}

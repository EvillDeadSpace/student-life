// Type definitions for API data
export interface User {
  id?: string;
  ime?: string;
  prezime?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  password?: string;
  lokacija: string;
  comments: Comment[];
}

export interface Post {
  id: number;
  ime?: string;
  prezime?: string;
  datum?: string;
  kategorija: string;
  naslov?: string;
  title?: string;
  tekst?: string;
  content?: string;
  lokacija?: string;
  lajkovi: number;
  comments: number;
  user?: {
    lokacija: string;
  };
}

// Fetch posts filtered by category
export async function heroPost(): Promise<Post[]> {
  try {
    const base =
      typeof window !== "undefined"
        ? "" // client: relative ok
        : process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"; // server: koristi env ili fallback

    const res = await fetch(`${base}/api/posts`, {
      cache: "no-store",
      headers: { "Cache-Control": "no-cache" },
    });

    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Error fetching posts:", err);
    return [];
  }
}
// Fetch posts filtered by category
export async function getAllPost(category: string): Promise<Post[]> {
  try {
    // Use relative path for API calls (works both locally and in production)
    const response = await fetch("/api/posts", {
      cache: "no-store", // Ne keširaj podatke
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });

    if (!response.ok) {
      console.error("Failed to fetch posts:", response.statusText);
      return [];
    }

    const data: Post[] = await response.json();

    const filtered = data.filter(
      (post: Post) => post.kategorija?.toLowerCase() === category.toLowerCase()
    );

    return filtered;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

// Fetch post by user id
export async function getAllPostByUser(
  userId: string | number | undefined
): Promise<Post[]> {
  try {
    if (!userId) return [];
    // Use relative path so it works in production too
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    const res = await fetch(`${baseUrl}/api/userpost?userId=${userId}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("Failed to fetch user posts:", res.statusText);
      return [];
    }
    const data = await res.json();
    if (!Array.isArray(data)) return [];
    return data as Post[];
  } catch (error) {
    console.log(error);
    return [];
  }
}

// Register new user
export async function register(userData: User) {
  try {
    // Use relative path for API calls (works both locally and in production)
    const response = await fetch("/api/auth/registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Registration error");
    }

    return data;
  } catch (error) {
    throw error;
  }
}

// Save user session to localStorage (client-side only)
export const saveUserToStorage = (userData: User) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        id: userData.id,
        ime: userData.ime,
        prezime: userData.prezime,
        email: userData.email,
        lokacija: userData.lokacija,
        isLoggedIn: true,
      })
    );
  }
};

export const getUserFromStorage = () => {
  if (typeof window !== "undefined") {
    const userData = localStorage.getItem("currentUser");
    return userData ? JSON.parse(userData) : null;
  }
  return null;
};

export const removeUserFromStorage = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("currentUser");
  }
};

export const isUserLoggedIn = () => {
  return getUserFromStorage() !== null;
};

// Convert title to URL-friendly slug (removes special characters, spaces)
export const createSlug = (naslov: string): string => {
  return naslov
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // replace spaces with dashes
    .replace(/[^a-z0-9-]/g, "") // remove special characters
    .replace(/-+/g, "-"); // remove duplicate dashes
};

// Convert slug back to title format (capitalize words)
export const slugToTitle = (slug: string): string => {
  return slug
    .replace(/-/g, " ") // replace dashes with spaces
    .replace(/\b\w/g, (l) => l.toUpperCase()); // capitalize first letters
};

// Find specific post by title (used for dynamic routing)
export const getPostByTitle = async (naslov: string) => {
  try {
    // Use absolute URL for client-side calls when needed
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    const response = await fetch(`${baseUrl}/api/posts`);

    if (!response.ok) {
      console.error("Failed to fetch posts:", response.statusText);
      return null;
    }

    const data = await response.json();

    const post = data.find(
      (p: { naslov: string }) => p.naslov.toLowerCase() === naslov.toLowerCase()
    );

    return post || null;
  } catch (error) {
    console.error("Error finding post:", error);
    return null;
  }
};

export async function getLikeCount(postId: number) {
  const res = await fetch(`/api/likes?postId=${postId}`, { cache: "no-store" });
  const json = await res.json();
  if (!res.ok) {
    console.error("getLikeCount error response:", res.status, json);
    return 0;
  }
  return Number(json.count ?? 0);
}

export async function toggleLike(postId: number, userId: number) {
  const res = await fetch(`/api/likes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ postId, userId }),
  });
  const json = await res.json();
  if (!res.ok) {
    console.error("toggleLike error response:", res.status, json);
  }
  return json;
}

export async function deletePost(postId: number) {
  try {
    // use leading slash so path works from any route
    const res = await fetch(`/api/userpost?postId=${postId}`, {
      method: "DELETE",
    });

    // attempt to parse JSON (endpoint returns deleted post)
    const json = await res.json().catch(() => null);

    if (!res.ok) {
      console.error("Problem with deleting", res.status, json);
      throw new Error(
        (json && (json.error || json.message)) || "Delete failed"
      );
    }

    return json;
  } catch (err) {
    console.error("deletePost error:", err);
    throw err;
  }
}

// Fetch all users
export async function fetchAllStudent(): Promise<Post[]> {
  try {
    const base =
      typeof window !== "undefined"
        ? "" // client: relative ok
        : process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"; // server: koristi env ili fallback

    const res = await fetch(`${base}/api/user`, {
      cache: "no-store",
      headers: { "Cache-Control": "no-cache" },
    });

    if (!res.ok) return [];

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Error fetching posts:", err);
    return [];
  }
}
export async function getNumberComments() {}

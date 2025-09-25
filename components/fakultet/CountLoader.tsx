import FakultetClient from "@/components/fakultet/FakultetClient";
import type { Post } from "@/lib/api";

// Server component that awaits the posts promise and renders the client with count
export default async function CountLoader({
  postsPromise,
}: {
  postsPromise: Promise<Post[]>;
}) {
  const posts = await postsPromise;
  return <FakultetClient countPost={posts.length} />;
}

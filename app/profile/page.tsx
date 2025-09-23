"use client";

import { getAllPostByUser, getUserFromStorage, type Post } from "@/lib/api";
import { useEffect, useState } from "react";
import ProfileCard from "@/components/profile/ProfileCard";
import { removeUserFromStorage } from "@/lib/Auth";
import type { User } from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ProfilePostComponents from "./ProfilePostComponents";
import { Toaster } from "react-hot-toast";

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [post, setPost] = useState<Post[] | null>(null);
  const [postsLoading, setPostsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userData = getUserFromStorage();
    if (!userData) {
      router.push("/");
      return;
    }

    const loadPosts = async () => {
      setPostsLoading(true);
      const posts = await getAllPostByUser(userData.id);
      setPost(posts);
      setPostsLoading(false);
    };

    loadPosts();

    setUser((prev) => (prev ? prev : userData));
  }, [router]);

  const logout = () => {
    removeUserFromStorage();
    setUser(null);
    router.push("/");
  };

  const handleDelete = async (postId: number) => {
    // optimistic UI: remove locally first
    setPost((prev) => (prev ? prev.filter((p) => p.id !== postId) : prev));
    try {
      await fetch(`/api/userpost?postId=${postId}`, { method: "DELETE" });
      // optionally you could re-fetch posts here if you want fresh data
    } catch (err) {
      console.error("Delete failed", err);
      // revert optimistic change by reloading posts
      const userData = getUserFromStorage();
      if (userData) {
        const fresh = await getAllPostByUser(userData.id);
        setPost(fresh);
      }
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='mb-6'>
          <Link href='/' className='text-sm text-gray-600 dark:text-gray-300'>
            &larr; Povratak
          </Link>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <div className='md:col-span-1'>
            <ProfileCard user={user} onLogout={logout} />
          </div>

          <div className='md:col-span-2'>
            <div className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg flex items-center justify-between'>
              <div>
                <h3 className='text-xl font-bold text-gray-900 dark:text-white'>
                  Moji postovi
                </h3>
                <p className='text-sm text-gray-500 dark:text-gray-400 mt-2'>
                  Pregled tvojih postova
                </p>
              </div>

              <div className='flex items-center space-x-4'>
                <div className='hidden sm:block text-right'>
                  <div className='text-3xl font-extrabold text-gray-900 dark:text-white'>
                    {post?.length ?? 0}
                  </div>
                  <div className='text-sm text-gray-500 dark:text-gray-400'>
                    Postova
                  </div>
                </div>
              </div>
            </div>
            {postsLoading ? (
              <div className='mt-6 text-center'>
                <div className='animate-spin rounded-full h-10 w-10 border-b-2 border-teal-600 mx-auto' />
              </div>
            ) : (
              <div className='mt-6 space-y-8 text-lg'>
                <ProfilePostComponents
                  posts={post ?? []}
                  onDelete={handleDelete}
                />

                <Toaster />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;

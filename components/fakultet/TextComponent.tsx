import { CalendarIcon, UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { createSlug, type Post } from "../../lib/api";
import LikeButton from "../LikeComponents/LikeComponents";

// Main CARD async component
async function TextComponent({
  postsPromise,
}: {
  postsPromise: Promise<Post[]>;
}) {
  const posts = await postsPromise;

  return (
    <div>
      <div className='space-y-6'>
        {posts.map((post) => (
          <div
            key={post.id}
            className='bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1'
          >
            <div className='p-6'>
              {/* Post header */}
              <div className='flex items-start justify-between mb-4'>
                <div className='flex items-center space-x-3'>
                  <div className='w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center'>
                    <UserIcon className='w-6 h-6 text-white' />
                  </div>
                  <div>
                    <div className='font-medium text-gray-900 dark:text-white'>
                      {post.ime} {post.prezime}
                    </div>
                    <div className='flex items-center text-sm text-gray-500 dark:text-gray-400'>
                      <CalendarIcon className='w-4 h-4 mr-1' />
                      {post.datum?.slice(0, 10)}
                    </div>
                  </div>
                </div>
                <div className='flex flex-wrap gap-2'>
                  <span className='bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium'>
                    {post.kategorija}
                  </span>
                  <span className='bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium'>
                    📍 {post.lokacija || post.user?.lokacija}
                  </span>
                </div>
              </div>

              {/* Post content */}
              <Link
                href={`/kategorije/${createSlug(
                  post.naslov || post.title || ""
                )}`}
              >
                <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-3 hover:text-teal-600 dark:hover:text-teal-400 cursor-pointer transition-colors'>
                  {post.naslov || post.title}
                </h3>
              </Link>
              <p className='text-gray-600 dark:text-gray-300 mb-4'>
                {post.tekst || post.content}
              </p>

              {/* Post footer */}
              <div className='flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700'>
                <div className='flex items-center space-x-6'>
                  <LikeButton postId={post.id} compact />
                </div>
                <Link
                  href={`/kategorije/${createSlug(
                    post.naslov || post.title || ""
                  )}`}
                >
                  <button className='bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center'>
                    Čitaj više
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TextComponent;

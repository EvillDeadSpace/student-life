import {
  CalendarIcon,
  ChatBubbleLeftEllipsisIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { createSlug, type Post } from "../../lib/api";

// Display posts in card format with category and location badges
function TextComponent({ posts }: { posts: Post[] }) {
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
                      {post.datum || new Date().toLocaleDateString()}
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
                  <button className='flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors'>
                    <svg
                      className='w-5 h-5'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                      />
                    </svg>
                    <span>{post.likes}</span>
                  </button>
                  <button className='flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors'>
                    <ChatBubbleLeftEllipsisIcon className='w-5 h-5' />
                    <span>{post.comments}</span>
                  </button>
                </div>
                <Link
                  href={`/kategorije/${createSlug(
                    post.naslov || post.title || ""
                  )}`}
                >
                  <button className='text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium transition-colors'>
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

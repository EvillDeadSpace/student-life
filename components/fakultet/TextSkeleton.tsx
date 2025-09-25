import React from "react";

// Simple Tailwind-based skeleton placeholder for loading posts
export default function TextSkeleton({ count = 3 }: { count?: number }) {
  const items = Array.from({ length: count });
  return (
    <div className='space-y-6 mt-6'>
      {items.map((_, i) => (
        <div
          key={i}
          className='animate-pulse flex space-x-4 bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700'
        >
          <div className='rounded-full bg-gray-200 dark:bg-gray-700 h-12 w-12' />
          <div className='flex-1 space-y-3 py-1'>
            <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4' />
            <div className='space-y-2'>
              <div className='h-3 bg-gray-200 dark:bg-gray-700 rounded' />
              <div className='h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6' />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

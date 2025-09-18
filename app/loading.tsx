import React from "react";

export default function Loading() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-6'>
      <div className='relative w-full max-w-lg'>
        {/* Animated background blobs */}
        <div className='absolute -top-32 -right-24 w-64 h-64 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full filter blur-3xl opacity-20 animate-blob' />
        <div className='absolute -bottom-32 -left-24 w-64 h-64 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-2000' />

        <div className='relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 flex flex-col items-center gap-6'>
          <div className='flex items-center gap-4'>
            <div className='w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-blue-600 flex items-center justify-center shadow-lg animate-pulse-slow'>
              {/* simple logo mark */}
              <svg
                width='36'
                height='36'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M12 2L15 8H9L12 2Z' fill='white' />
                <path d='M12 22L9 16H15L12 22Z' fill='rgba(255,255,255,0.85)' />
              </svg>
            </div>
            <div>
              <h3 className='text-2xl font-bold text-gray-900 dark:text-white'>
                Student Life
              </h3>
              <p className='text-sm text-gray-500 dark:text-gray-300'>
                Učitavanje sadržaja, sačekajte...
              </p>
            </div>
          </div>

          {/* skeleton rows */}
          <div className='w-full space-y-4'>
            <div
              className='h-4 rounded-md bg-gray-200 dark:bg-gray-700 skeleton'
              style={{ width: "60%" }}
            />
            <div
              className='h-3 rounded-md bg-gray-200 dark:bg-gray-700 skeleton'
              style={{ width: "40%" }}
            />
            <div className='h-48 rounded-2xl bg-gray-100 dark:bg-gray-700 skeleton' />
            <div className='flex gap-4'>
              <div className='h-10 w-24 rounded-full bg-gray-200 dark:bg-gray-700 skeleton' />
              <div className='h-10 w-24 rounded-full bg-gray-200 dark:bg-gray-700 skeleton' />
            </div>
          </div>

          <div className='text-xs text-gray-400'>
            Ako učitavanje traje predugo, osvežite stranicu ili proverite mrežu.
          </div>
        </div>
      </div>
    </div>
  );
}

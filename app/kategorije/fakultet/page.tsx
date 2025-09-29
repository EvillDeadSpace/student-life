import TextComponent from "@/components/fakultet/TextComponent";
import { getAllPost } from "@/lib/api";
import {
  AcademicCapIcon,
  ArrowLeftIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { Suspense } from "react";
import TextSkeleton from "@/components/fakultet/TextSkeleton";
import CountLoader from "@/components/fakultet/CountLoader";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function FakultetPage(props: any) {
  const searchParams = await props?.searchParams;
  const city = searchParams?.city ?? undefined;

  const postsPromise = getAllPost("fakultet", city);
  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
      {/* Header */}
      <div className='bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-4'>
              <Link
                href='/kategorije'
                className='flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors'
              >
                <ArrowLeftIcon className='w-5 h-5 mr-2' />
                Nazad na kategorije
              </Link>
            </div>
            <div className='flex space-x-3'>
              <Link
                href={"/dodaj-iskustvo?cat=Fakultet"}
                className='bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center'
              >
                <PlusIcon className='w-5 h-5 mr-2' />
                Podjeli iskustvo
              </Link>
            </div>
          </div>

          <div className='mt-6 flex items-center'>
            <div className='bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-3 mr-4'>
              <AcademicCapIcon className='w-8 h-8 text-white' />
            </div>
            <div>
              <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
                Fakultet
              </h1>
              <p className='text-gray-600 dark:text-gray-300 mt-1'>
                Iskustva, savjeti i informacije o fakultetima
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Header content */}
        <Suspense fallback={<TextSkeleton count={4} />}>
          <CountLoader postsPromise={postsPromise} />
          <TextComponent postsPromise={postsPromise} />
        </Suspense>
        <div className='text-center mt-8'>
          <button className='bg-white dark:bg-gray-800 border-2 border-teal-500 text-teal-600 dark:text-teal-400 hover:bg-teal-500 hover:text-white dark:hover:bg-teal-500 dark:hover:text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl'>
            Učitaj više objava
          </button>
        </div>
      </div>
    </div>
  );
}

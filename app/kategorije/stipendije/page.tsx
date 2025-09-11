import TextComponent from "@/components/fakultet/TextComponent";
import { getAllPost } from "@/lib/api";
import {
  CurrencyDollarIcon,
  ArrowLeftIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

export default async function StipendijePage() {
  const data = await getAllPost("stipendije");

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
      <div className='bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
          <div className='flex items-center justify-between'>
            <Link
              href='/kategorije'
              className='flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors'
            >
              <ArrowLeftIcon className='w-5 h-5 mr-2' />
              Nazad na kategorije
            </Link>
            <button className='bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center'>
              <PlusIcon className='w-5 h-5 mr-2' />
              Podjeli iskustvo
            </button>
          </div>

          <div className='mt-6 flex items-center'>
            <div className='bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-3 mr-4'>
              <CurrencyDollarIcon className='w-8 h-8 text-white' />
            </div>
            <div>
              <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
                Stipendije
              </h1>
              <p className='text-gray-600 dark:text-gray-300 mt-1'>
                Informacije o stipendijama i finansijskoj podršci
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
          <div className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg'>
            <div className='text-2xl font-bold text-gray-900 dark:text-white'>
              {data.length}
            </div>
            <div className='text-gray-600 dark:text-gray-300'>Objava</div>
          </div>
          <div className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg'>
            <div className='text-2xl font-bold text-gray-900 dark:text-white'>
              {data.reduce((acc, post) => acc + post.comments, 0)}
            </div>
            <div className='text-gray-600 dark:text-gray-300'>Komentara</div>
          </div>
          <div className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg'>
            <div className='text-2xl font-bold text-gray-900 dark:text-white'>
              {data.reduce((acc, post) => acc + post.likes, 0)}
            </div>
            <div className='text-gray-600 dark:text-gray-300'>Sviđanja</div>
          </div>
        </div>

        <TextComponent posts={data} />
      </div>
    </div>
  );
}

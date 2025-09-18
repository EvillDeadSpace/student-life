"use client";
import { useState, useEffect } from "react";
import TextComponent from "@/components/fakultet/TextComponent";
import { getAllPost } from "@/lib/api";
import type { Post } from "@/lib/api";
import {
  HomeIcon,
  ArrowLeftIcon,
  PlusIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

import CitySelect from "@/components/ui/CitySelect";
import { selectCityFunction } from "@/components/ui/FunctionToHandleCity";

export default function StudentskiDomPage() {
  const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [selectCity, setSelectedCity] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setRefreshing(true);
      const posts = await getAllPost("studentski dom");
      setData(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();

    const handleFocus = () => {
      fetchData();
    };

    const interval = setInterval(() => {
      fetchData();
    }, 30000);

    window.addEventListener("focus", handleFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const dataToShow = selectCityFunction(data, selectCity);

  if (loading) {
    return (
      <div className='min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-teal-600'></div>
          <p className='mt-4 text-gray-600 dark:text-gray-400'>Loading...</p>
        </div>
      </div>
    );
  }

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
            <div className='flex items-center space-x-3'>
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className='bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center disabled:opacity-50'
              >
                <ArrowPathIcon
                  className={`w-5 h-5 mr-2 ${refreshing ? "animate-spin" : ""}`}
                />
                {refreshing ? "Osvježava..." : "Osvježi"}
              </button>
              <Link
                href='/dodaj-iskustvo?category=studentski-dom'
                className='bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center'
              >
                <PlusIcon className='w-5 h-5 mr-2' />
                Podjeli iskustvo
              </Link>
            </div>
          </div>

          <div className='mt-6 flex items-center'>
            <div className='bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-3 mr-4'>
              <HomeIcon className='w-8 h-8 text-white' />
            </div>
            <div>
              <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
                Studentski dom
              </h1>
              <p className='text-gray-600 dark:text-gray-300 mt-1'>
                Sve o smještaju i životu u studentskim domovima
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
          <div className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg content-center'>
            <div className='text-4xl font-bold text-gray-900 dark:text-white'>
              {data.length}
            </div>
            <div className='text-gray-600 dark:text-gray-300'>Objava</div>
          </div>
          <div className='text-m bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg'>
            <CitySelect value={selectCity} onChange={setSelectedCity} />
          </div>
          <div className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg'>
            <div className='text-2xl font-bold text-gray-900 dark:text-white'>
              24/7
            </div>
            <div className='text-gray-600 dark:text-gray-300'>Podrška</div>
          </div>
        </div>

        <div className='space-y-6'>
          <TextComponent posts={dataToShow} />
        </div>

        {data.length === 0 && (
          <div className='text-center py-12'>
            <HomeIcon className='mx-auto h-12 w-12 text-gray-400' />
            <h3 className='mt-2 text-sm font-medium text-gray-900 dark:text-white'>
              Nema objava za studentski dom
            </h3>
            <p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>
              Budite prvi koji će podijeliti iskustvo!
            </p>
            <div className='mt-6'>
              <Link
                href='/dodaj-iskustvo?category=studentski-dom'
                className='inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500'
              >
                <PlusIcon className='-ml-1 mr-2 h-5 w-5' aria-hidden='true' />
                Dodaj iskustvo
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

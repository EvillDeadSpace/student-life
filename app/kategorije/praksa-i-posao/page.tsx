"use client";
import { useState, useEffect } from "react";
import TextComponent from "@/components/fakultet/TextComponent";
import { getAllPost, type Post } from "@/lib/api";
import {
  BriefcaseIcon,
  ArrowLeftIcon,
  PlusIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

import CitySelect from "@/components/ui/CitySelect";
import { selectCityFunction } from "@/components/ui/FunctionToHandleCity";

export default function PraksaPosaoPage() {
  const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const fetchData = async () => {
    try {
      setRefreshing(true);
      const posts = await getAllPost("praksa i posao");
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

  const postToShow: Post[] = selectCityFunction(data, selectedCity) as Post[];

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
                href='/dodaj-iskustvo?category=praksa-i-posao'
                className='bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center'
              >
                <PlusIcon className='w-5 h-5 mr-2' />
                Podjeli iskustvo
              </Link>
            </div>
          </div>

          <div className='mt-6 flex items-center'>
            <div className='bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-3 mr-4'>
              <BriefcaseIcon className='w-8 h-8 text-white' />
            </div>
            <div>
              <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
                Praksa i posao
              </h1>
              <p className='text-gray-600 dark:text-gray-300 mt-1'>
                Mogućnosti za praksu, part-time poslove i karijerni razvoj
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 '>
          <div className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg'>
            <div className='text-2xl font-bold text-gray-900 dark:text-white'>
              {data.length}
            </div>
            <div className='text-gray-600 dark:text-gray-300'>Objava</div>
          </div>
          <div className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg'>
            <div className='text-m font-bold text-gray-900 dark:text-white'>
              <CitySelect value={selectedCity} onChange={setSelectedCity} />
            </div>
          </div>
          <div className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg'>
            <div className='text-2xl font-bold text-gray-900 dark:text-white'>
              {data.reduce((acc, post) => acc + (Number(post.lajkovi) || 0), 0)}
            </div>
            <div className='text-gray-600 dark:text-gray-300'>Sviđanja</div>
          </div>
        </div>
        <TextComponent posts={postToShow} />
      </div>
    </div>
  );
}

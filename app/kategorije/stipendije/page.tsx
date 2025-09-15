"use client";
import { useState, useEffect } from "react";
import TextComponent from "@/components/fakultet/TextComponent";
import { getAllPost, type Post } from "@/lib/api";
import {
  CurrencyDollarIcon,
  ArrowLeftIcon,
  PlusIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

export default function StipendijePage() {
  const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      setRefreshing(true);
      const posts = await getAllPost("stipendije");
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

    // Auto-refresh kada korisnik vrati focus na tab
    const handleFocus = () => {
      console.log("Page focused - refreshing data...");
      fetchData();
    };

    // Auto-refresh svakih 30 sekundi
    const interval = setInterval(() => {
      console.log("Auto-refresh interval - fetching new data...");
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
                href='/dodaj-iskustvo?category=stipendije'
                className='bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center'
              >
                <PlusIcon className='w-5 h-5 mr-2' />
                Podjeli iskustvo
              </Link>
            </div>
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

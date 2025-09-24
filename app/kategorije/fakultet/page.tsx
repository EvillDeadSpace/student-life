"use client";
import { useState, useEffect, Suspense } from "react";
import TextComponent from "@/components/fakultet/TextComponent";
import CitySelect from "@/components/ui/CitySelect";
import { getAllPost, type Post } from "@/lib/api";
import {
  AcademicCapIcon,
  ArrowLeftIcon,
  PlusIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { selectCityFunction } from "@/components/ui/FunctionToHandleCity";
import { useRouter } from "next/navigation";
import HeroCounterFallback from "@/components/HeroCounterFallback";

export default function FakultetPage() {
  const routing = useRouter();

  const [data, setData] = useState<Post[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setRefreshing(true);

      // Sort but need to fix this not good working
      const posts = await getAllPost("fakultet");
      const sortPost = [...posts].sort((a, b) => b.lajkovi - a.lajkovi);
      setData(sortPost);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
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

    // Auto-refresh
    const interval = setInterval(() => {
      console.log("Auto-refresh interval - fetching new data...");
      fetchData();
    }, 30000);

    window.addEventListener("focus", handleFocus);

    // Cleanup
    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const postToShow: Post[] = selectCityFunction(data, selectedCity) as Post[];

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
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className='bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center disabled:opacity-50'
              >
                <ArrowPathIcon
                  className={`w-5 h-5 mr-2 ${refreshing ? "animate-spin" : ""}`}
                />
                {refreshing ? "Osvežava..." : "Osveži"}
              </button>
              <button
                onClick={() => routing.push("/dodaj-iskustvo?cat=Fakultet")}
                className='bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center'
              >
                <PlusIcon className='w-5 h-5 mr-2' />
                Podjeli iskustvo
              </button>
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
        {/* Stats */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
          <div className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg content-center'>
            <div className='text-4xl font-bold text-gray-900 dark:text-white justify-center'>
              {data.length}
            </div>
            <div className='text-gray-600 dark:text-gray-300'>Objava</div>
          </div>

          {/* Select city menu */}
          <div className='text-m bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg'>
            <CitySelect value={selectedCity} onChange={setSelectedCity} />
          </div>

          <div className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg'>
            <div className='text-2xl font-bold text-gray-900 dark:text-white'>
              <p>coming soon...</p>
            </div>
            <div className='text-gray-600 dark:text-gray-300'>Sviđanja</div>
          </div>
        </div>

        {/* Posts */}
        <Suspense fallback={<HeroCounterFallback />}>
          <TextComponent posts={postToShow} />
        </Suspense>
        {/* Load more button */}
        <div className='text-center mt-8'>
          <button className='bg-white dark:bg-gray-800 border-2 border-teal-500 text-teal-600 dark:text-teal-400 hover:bg-teal-500 hover:text-white dark:hover:bg-teal-500 dark:hover:text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl'>
            Učitaj više objava
          </button>
        </div>
      </div>
    </div>
  );
}

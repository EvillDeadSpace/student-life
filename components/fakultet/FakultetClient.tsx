"use client";

import { useState } from "react";
import { useEffect } from "react";
import CitySelect from "@/components/ui/CitySelect";
import { type Post, getAllPost } from "@/lib/api";
import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

type Props = {
  initialPosts?: Post[];
  countPost?: number;
};

export default function FakultetClient({ initialPosts, countPost }: Props) {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [postsCount, setPostsCount] = useState<number>(
    initialPosts?.length ?? 0
  );

  useEffect(() => {
    let mounted = true;
    // If no initial posts were provided by the server, fetch on mount so the UI shows numbers
    if (!initialPosts) {
      (async () => {
        try {
          const data = await getAllPost("fakultet");
          if (mounted) setPostsCount(data.length);
        } catch (err) {
          console.error("FakultetClient fetch error:", err);
        }
      })();
    }
    return () => {
      mounted = false;
    };
  }, [initialPosts]);

  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
        <div className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg content-center'>
          <div className='text-4xl font-bold text-gray-900 dark:text-white justify-center'>
            {countPost}
          </div>
          <div className='text-gray-600 dark:text-gray-300'>Objava</div>
        </div>

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
    </div>
  );
}

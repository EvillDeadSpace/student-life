"use client";

import { useState } from "react";
import CitySelect from "@/components/ui/CitySelect";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

type Props = {
  countPost?: number;
  // optional slug like 'fakultet' or 'studentski-dom'
  categorySlug?: string;
};

export default function FakultetClient({ countPost, categorySlug }: Props) {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  // postsCount state is not used in this client — server provides count via props

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function onCitySelect(city: string | null) {
    // update local (controlled) value so dropdown reflects selection
    setSelectedCity(city);

    // determine base path — prefer explicit prop, else infer from pathname
    let base = "/kategorije";
    const inferred = pathname?.split("?")[0];
    if (categorySlug) base = `/kategorije/${categorySlug}`;
    else if (inferred && inferred.startsWith("/kategorije")) base = inferred;

    // preserve other query params and set/delete `city`
    const params = new URLSearchParams(searchParams?.toString() || "");
    if (city) params.set("city", city);
    else params.delete("city");

    const qs = params.toString();
    const url = qs ? `${base}?${qs}` : base;
    // replace instead of push to avoid history spam
    router.replace(url);
  }

  // no client-side fetch needed here — parent server component provides initial data/count

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
          <CitySelect value={selectedCity} onChange={onCitySelect} />
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

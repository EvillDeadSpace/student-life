"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { DocumentPlusIcon } from "@heroicons/react/24/outline";
import { getUserFromStorage } from "../../lib/api";

import toast, { Toaster } from "react-hot-toast";

export default function Experience() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    kategorija: "",
    naslov: "",
    tekst: "",
  });
  const [loading, setLoading] = useState(false);

  const kategorije = [
    "Fakultet",
    "Studentski dom",
    "Stipendije",
    "Praksa i posao",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Take from storage info
      const user = getUserFromStorage();
      if (!user) {
        toast.error("Morate biti ulogovani da biste dodali iskustvo!");
        return;
      }

      // Setup data for API
      const postData = {
        userId: user.id,
        ime: user.ime,
        prezime: user.prezime,
        naslov: formData.naslov,
        tekst: formData.tekst,
        kategorija: formData.kategorija,
      };

      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        // show a longer toast and pause briefly so users see it before redirect
        toast.success("Iskustvo je uspješno dodano!", { duration: 2000 });

        // small delay so the toast is visible before navigation
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Reset forme
        setFormData({ kategorija: "", naslov: "", tekst: "" });

        // Redirect to the appropriate category page (use postData to get the chosen category)
        const categorySlug = postData.kategorija
          .toLowerCase()
          .replace(/\s+/g, "-");
        router.push(`/kategorije/${categorySlug}`);
      } else {
        throw new Error("Greška pri dodavanju iskustva");
      }
    } catch (error) {
      toast.error("Greška pri dodavanju iskustva!" + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900 bg-grid-pattern flex items-center justify-center p-4'>
      {/* Background decorations - isti kao login */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-green-400 to-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob'></div>
        <div className='absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000'></div>
      </div>

      {/* Main Card */}
      <div className='relative w-full max-w-2xl transition-all duration-500 transform  opacity-0 animate-fadeInUp cursor-pointer'>
        {/* Header */}
        <div className='text-center mb-8'>
          <div className='inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl shadow-lg mb-4 transform hover:scale-105 transition-transform duration-300'>
            <DocumentPlusIcon className='w-10 h-10 text-white' />
          </div>
          <h1 className='text-3xl font-bold bg-gradient-to-r from-green-500 to-teal-600 bg-clip-text text-transparent'>
            Podijeli iskustvo
          </h1>
          <p className='text-gray-600 dark:text-gray-400 mt-2'>
            Ispričaj nam svoju priču i pomozi drugim studentima
          </p>
        </div>

        {/* Form Card */}
        <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-2xl backdrop-blur-lg bg-opacity-90 dark:bg-opacity-90 border border-gray-200 dark:border-gray-700 p-8'>
          <form className='space-y-6' onSubmit={handleSubmit}>
            {/* Kategorija Select */}
            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                Kategorija iskustva
              </label>
              <select
                value={formData.kategorija}
                onChange={(e) =>
                  setFormData({ ...formData, kategorija: e.target.value })
                }
                className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white transition-all duration-300'
                required
              >
                <option value=''>Izaberi kategoriju...</option>
                {kategorije.map((kat) => (
                  <option key={kat} value={kat}>
                    {kat}
                  </option>
                ))}
              </select>
            </div>

            {/* Naslov */}
            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                Naslov iskustva
              </label>
              <input
                type='text'
                value={formData.naslov}
                onChange={(e) =>
                  setFormData({ ...formData, naslov: e.target.value })
                }
                placeholder='Npr. Moja prva godina na fakultetu...'
                className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white transition-all duration-300'
                required
              />
            </div>

            {/* Tekst iskustva */}
            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                Opišite svoje iskustvo
              </label>
              <textarea
                value={formData.tekst}
                onChange={(e) =>
                  setFormData({ ...formData, tekst: e.target.value })
                }
                rows={6}
                placeholder='Detaljno opišite svoje iskustvo, savjete, preporuke...'
                className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white transition-all duration-300 resize-none'
                required
              />
            </div>

            {/* Submit dugme */}
            <button
              type='submit'
              disabled={loading}
              className='w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800'
            >
              {loading ? "Dodajem iskustvo..." : "Podijeli iskustvo"}
            </button>
          </form>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

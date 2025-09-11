"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { slugToTitle, getPostByTitle, type Post } from "../../../lib/api";
import {
  ArrowLeftIcon,
  CalendarIcon,
  UserIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

// Format date helper function
const formatDate = (dateString: string | undefined) => {
  if (!dateString) return "Nepoznat datum";

  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("bs-BA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return "Nepoznat datum";
  }
};

export default function SlugPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;

      try {
        // Convert slug u header
        const naslov = slugToTitle(slug);

        // Find post
        const foundPost = await getPostByTitle(naslov);

        console.log("Slug:", slug);
        console.log("Naslov:", naslov);
        console.log("Post:", foundPost);

        setPost(foundPost);
      } catch (error) {
        console.error("Error fetching post:", error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600'></div>
          <p className='mt-4 text-gray-600'>Loading...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center'>
            <span className='text-3xl text-white'>😔</span>
          </div>
          <h1 className='text-3xl font-bold text-gray-800 mb-4'>
            Objava nije pronađena
          </h1>
          <p className='text-gray-600 mb-8'>
            Možda je uklonjena ili je URL pogrešan
          </p>
          <Link
            href='/kategorije'
            className='inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg'
          >
            <ArrowLeftIcon className='w-5 h-5 mr-2' />
            Nazad na kategorije
          </Link>
        </div>
      </div>
    );
  }

  // Format datum
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "Nepoznat datum";
    const date = new Date(dateString);
    return date.toLocaleDateString("bs-BA", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
      {/* Header - stil kao u kategorijama */}
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

            {/* Category & Location Badges */}
            <div className='flex flex-wrap gap-2'>
              <div className='bg-gradient-to-r from-teal-500 to-blue-600 text-white px-4 py-2 rounded-lg font-medium shadow-lg flex items-center'>
                <TagIcon className='w-4 h-4 mr-2' />
                {post.kategorija}
              </div>
              <div className='bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg font-medium shadow-lg flex items-center'>
                <svg
                  className='w-4 h-4 mr-2'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                  />
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                  />
                </svg>
                {post.lokacija}
              </div>
            </div>
          </div>

          {/* Article Title */}
          <div className='mt-6'>
            <h1 className='text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4'>
              {post.naslov}
            </h1>

            {/* Author & Date Info */}
            <div className='flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-300'>
              <div className='flex items-center'>
                <UserIcon className='w-5 h-5 mr-2' />
                <span className='font-medium'>
                  {post.ime} {post.prezime}
                </span>
              </div>
              <div className='flex items-center'>
                <CalendarIcon className='w-5 h-5 mr-2' />
                <span>{formatDate(post.datum)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Article Content */}
        <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden'>
          <div className='p-8'>
            <div className='prose prose-lg max-w-none dark:prose-invert'>
              <div className='text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap'>
                {post.tekst}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className='flex flex-wrap items-center justify-center gap-4 mt-8'>
          <button className='inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl'>
            <svg
              className='w-5 h-5 mr-2'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
              />
            </svg>
            Sviđa mi se
          </button>

          <button className='inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 transform hover:scale-105'>
            <svg
              className='w-5 h-5 mr-2'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z'
              />
            </svg>
            Podijeli
          </button>

          <button className='inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 transform hover:scale-105'>
            <svg
              className='w-5 h-5 mr-2'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-1.586l-4 4z'
              />
            </svg>
            Komentiraj
          </button>
        </div>

        {/* Similar Posts Section */}
        <div className='mt-16'>
          <h3 className='text-2xl font-bold text-center mb-8 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent'>
            Možda vas zanima
          </h3>
          <div className='text-center'>
            <Link
              href={`/kategorije/${post.kategorija
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
              className='inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl'
            >
              Više iz kategorije &ldquo;{post.kategorija}&rdquo;
              <svg
                className='w-5 h-5 ml-2'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M13 7l5 5m0 0l-5 5m5-5H6'
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

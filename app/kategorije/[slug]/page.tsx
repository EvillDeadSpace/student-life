"use client";
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import {
  slugToTitle,
  getPostByTitle,
  type Post,
  getUserFromStorage,
} from "../../../lib/api";
import {
  ArrowLeftIcon,
  CalendarIcon,
  UserIcon,
  TagIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

// Components for likes
import LikeButton from "@/components/LikeComponents/LikeComponents";

//tooltip component
import Tooltip from "rc-tooltip";
import toast, { Toaster } from "react-hot-toast";

export default function SlugPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  type Comment = {
    id: string;
    content: string;
    createdAt: string;
    user?: {
      ime: string;
      prezime: string;
    };
  };

  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [visible, setVisible] = useState(false);

  // Use ref to focus on input text
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;

      try {
        // Convert slug u header
        const naslov = slugToTitle(slug);

        // Find post
        const foundPost = await getPostByTitle(naslov);

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

  // fetch comments when post is loaded (declare unconditionally to preserve Hooks order)
  useEffect(() => {
    const fetchComments = async () => {
      if (!post) return;
      try {
        const res = await fetch(`/api/comment?postId=${post.id}`);
        const data = await res.json();
        setComments(data || []);
      } catch (err) {
        console.error("Error fetching comments", err);
      }
    };

    fetchComments();
  }, [post]);

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

  const handleSubmitComment = async () => {
    if (!commentText.trim()) return;
    if (!post) return;

    const currentUser = getUserFromStorage();
    const userId = currentUser?.id ?? null;

    if (!userId) {
      toast.error("Mora te se ulogovati kako bih posavili komentar ", {
        duration: 4000,
        style: {
          textAlign: "center",
        },
      });

      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`/api/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: commentText, userId, postId: post.id }),
      });
      const created = await res.json();
      if (!res.ok) throw new Error(created.error || "Failed");

      // refresh comments
      setComments((prev) => [created, ...prev]);
      setCommentText("");
    } catch (err) {
      console.error("Error posting comment", err);
    } finally {
      toast.success("Vas komentar je postavljen");
      setSubmitting(false);
    }
  };

  // Function handler when press on button to save text
  const handleOnClickShareButton = () => {
    setVisible(true);

    const naslov = window.location.href;
    navigator.clipboard.writeText(naslov);

    setTimeout(() => setVisible(false), 1500);
  };

  // Handler on scroll to bots
  function handleScrollButton() {
    window.scroll({ top: document.body.scrollHeight, behavior: "smooth" });

    inputRef.current?.focus();
  }

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
      {/* Header */}
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
                <Tooltip
                  placement='top'
                  trigger={["hover"]}
                  overlay={<p className='text-white'>YYYY-MM-DD</p>}
                >
                  <span>{post.datum?.slice(0, 10)}</span>
                </Tooltip>
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
          {/* Button  */}
          <LikeButton postId={post.id} />

          <Tooltip
            placement='top'
            overlay={
              <div className='flex flex-col items-center text-sm  text-white  px-4 py-2 rounded-4xl shadow-lg animate-fade-in'>
                <p>Ovaj clanak je kopiran</p>
                <ClipboardDocumentCheckIcon
                  className='w-6 h-6 mt-1'
                  width={16}
                  height={16}
                />
              </div>
            }
            visible={visible}
          >
            <button
              onClick={handleOnClickShareButton}
              className='inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 transform hover:scale-105'
            >
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
          </Tooltip>
          <button
            onClick={handleScrollButton}
            className='inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 transform hover:scale-105'
          >
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

        {/* Comments Section */}
        <div className='mt-12'>
          <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden'>
            {/* Comments Header */}
            <div className='bg-gradient-to-r from-teal-500 via-blue-500 to-purple-600 px-6 py-4'>
              <h3 className='text-xl font-bold text-white flex items-center'>
                <svg
                  className='w-6 h-6 mr-3'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
                  />
                </svg>
                Komentari ({comments.length})
              </h3>
            </div>

            {/* Comments List */}
            <div className='p-6 space-y-6'>
              {comments.map((komentar) => (
                <div
                  key={komentar.id}
                  className='bg-gray-50 dark:bg-gray-700 rounded-xl p-5 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1'
                >
                  {/* Comment Header */}
                  <div className='flex items-center justify-between mb-3'>
                    <div className='flex items-center space-x-3'>
                      <div className='w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center'>
                        <span className='text-white font-bold text-sm'>
                          {(komentar.user?.ime ?? "A").charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <h4 className='font-semibold text-gray-900 dark:text-white'>
                          {komentar.user
                            ? `${komentar.user.ime} ${komentar.user.prezime}`
                            : "Anonim"}
                        </h4>
                        <p className='text-sm text-gray-500 dark:text-gray-400'>
                          {komentar.createdAt.slice(0, 10)}
                        </p>
                      </div>
                    </div>
                    {/* Comment Actions */}
                  </div>

                  {/* Comment Content */}
                  <p className='text-gray-700 dark:text-gray-300 leading-relaxed pl-13'>
                    {komentar.content}
                  </p>
                </div>
              ))}

              {/* Add Comment Form */}
              <div className='border-t border-gray-200 dark:border-gray-600 pt-6 mt-8'>
                <h4 className='text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center'>
                  <svg
                    className='w-5 h-5 mr-2 text-teal-500'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 4v16m8-8H4'
                    />
                  </svg>
                  Dodaj komentar
                </h4>

                <div className='space-y-4'>
                  <textarea
                    ref={inputRef}
                    rows={4}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder='Vaš komentar...'
                    className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white resize-none transition-all duration-300'
                  ></textarea>

                  <div className='flex justify-end'>
                    <button
                      onClick={handleSubmitComment}
                      disabled={submitting}
                      className='bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center disabled:opacity-50'
                    >
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
                          d='M12 19l9 2-9-18-9 18 9-2zm0 0v-8'
                        />
                      </svg>
                      Objavi komentar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
      <Toaster />;
    </div>
  );
}

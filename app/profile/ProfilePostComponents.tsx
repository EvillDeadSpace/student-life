"use client";

import React, { useState } from "react";
import { type Post } from "@/lib/api";
import Link from "next/link";
import toast from "react-hot-toast";

const TrashIcon: React.FC<{ className?: string }> = ({
  className = "w-5 h-5",
}) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    className={className}
    aria-hidden
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M3 6h18M8 6v14a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6M10 6V4a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v2'
    />
  </svg>
);

type Props = {
  posts?: Post[];
  onDelete?: (postId: number) => Promise<void> | void;
};

export default function ProfilePostComponents({ posts = [], onDelete }: Props) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  if (!posts || posts.length === 0) {
    return (
      <div className='mt-6 text-center text-gray-600 dark:text-gray-300'>
        Nema objava
      </div>
    );
  }

  const openConfirm = (id: number) => {
    setSelectedId(id);
    setModalOpen(true);
  };

  const closeConfirm = () => {
    setSelectedId(null);
    setModalOpen(false);
  };

  const confirmDelete = async () => {
    if (selectedId == null) return;
    try {
      setDeleting(true);
      if (onDelete) {
        await onDelete(selectedId);
        toast.success("Uspjesno ste izbrisali post");
      }
    } catch (err) {
      console.error("Delete failed", err);
      toast.error("Brisanje nije uspjelo");
    } finally {
      setDeleting(false);
      closeConfirm();
    }
  };

  return (
    <div className='mt-6 grid gap-4'>
      {posts.map((p) => {
        const title = p.naslov ?? p.title ?? "(Bez naslova)";
        const date = typeof p.datum === "string" ? p.datum.slice(0, 10) : "-";
        const initial = title && title[0] ? title[0].toUpperCase() : "P";
        const kategorija = p.kategorija;
        const id = p.id;

        return (
          <article
            key={p.id}
            className='flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow'
          >
            <div className='flex items-center gap-4'>
              <div className='flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-blue-600 text-white flex items-center justify-center font-bold'>
                {initial}
              </div>

              <div>
                <h4 className='text-base font-semibold text-gray-900 dark:text-white'>
                  {title}
                </h4>
                <div className='text-xs text-gray-500 dark:text-gray-400 mt-1'>
                  <span>{date}</span>
                  <span className='mx-2'>•</span>
                  <span>{kategorija}</span>
                </div>
              </div>
            </div>

            <div className='flex items-center gap-2'>
              <Link
                href={`/kategorije/${encodeURIComponent(
                  p.naslov ?? p.title ?? ""
                )}`}
                className='inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-teal-500 to-blue-600 text-white text-sm rounded-full shadow'
              >
                Pogledaj
              </Link>

              <button
                aria-label={`Obriši post ${title}`}
                onClick={() => openConfirm(id)}
                className='inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-300 border border-red-100 dark:border-transparent'
              >
                <TrashIcon className='w-4 h-4' />
                <span className='text-sm'>Obriši</span>
              </button>
            </div>
          </article>
        );
      })}

      {modalOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center'>
          <div
            className='absolute inset-0 bg-black/40'
            onClick={closeConfirm}
          />

          <div className='relative bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md p-6'>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
              Potvrdi brisanje
            </h3>
            <p className='mt-2 text-sm text-gray-600 dark:text-gray-300'>
              Da li si siguran da želiš obrisati ovaj post?
            </p>

            <div className='mt-4 flex justify-end gap-2'>
              <button
                onClick={closeConfirm}
                className='px-3 py-1.5 rounded-md bg-gray-100 dark:bg-gray-700 text-sm'
                disabled={deleting}
              >
                Odustani
              </button>
              <button
                onClick={confirmDelete}
                className='px-3 py-1.5 rounded-md bg-red-600 text-white text-sm'
                disabled={deleting}
              >
                {deleting ? "Brisanje..." : "Obriši"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

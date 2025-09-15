"use client";
import { useEffect, useState } from "react";
import { getLikeCount, getUserFromStorage, toggleLike } from "@/lib/api";

export default function LikeButton({
  postId,
  initialCount,
  compact,
}: {
  postId: number;
  initialCount?: number;
  compact?: boolean;
}) {
  const [count, setCount] = useState<number>(initialCount ?? 0);
  const [loading, setLoading] = useState(false);
  const user = getUserFromStorage(); // returns stored user or null
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const c = await getLikeCount(postId);
        if (mounted) setCount(c);
      } catch (err) {
        console.error("getLikeCount error:", err);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [postId]);

  const onClick = async () => {
    if (!user) {
      alert("Moraš se ulogovati da bi lajkao");
      return;
    }
    const userId = Number((user as { id?: number | string }).id);
    if (!userId || Number.isNaN(userId)) {
      alert("Nevažeći korisnik");
      return;
    }
    // optimistic UI - immediate toggle for responsiveness
    setIsLiked((s) => !s);

    setLoading(true);
    try {
      console.debug("LikeButton: sending toggle", { postId, userId });
      const res = await toggleLike(postId, userId);
      console.debug("LikeButton: toggle response", res);
      if (res && typeof res.liked === "boolean") {
        if (res.liked) setCount((c) => c + 1);
        else setCount((c) => Math.max(0, c - 1));
        setIsLiked(Boolean(res.liked));
      } else {
        // fallback: refresh real count
        const real = await getLikeCount(postId);
        setCount(real);
      }
    } catch (err) {
      console.error("toggleLike error:", err);
      // revert optimistic like on error
      setIsLiked((s) => !s);
    } finally {
      setLoading(false);
    }
  };

  // Compact simple inline heart + count (reverted to original small design)
  if (compact) {
    return (
      <button
        onClick={onClick}
        aria-pressed={isLiked}
        disabled={loading}
        title={isLiked ? "Otkaži lajk" : "Lajkaj"}
        className={`inline-flex items-center justify-center gap-2 
    rounded-full px-4 py-2 text-sm font-medium 
    bg-white text-black 
    transition-all duration-200 
    hover:bg-blue-400 hover:shadow-md 
    focus:outline-none focus:ring-2 focus:ring-white/40 
    ${loading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
      >
        <span
          className={`text-lg leading-none ${
            isLiked ? "text-red-500" : "text-black"
          }`}
          aria-hidden
        >
          ❤️
        </span>
        <span className='ml-1 text-black'>{count}</span>
      </button>
    );
  }

  // Default full button for slug/post pages (unchanged)
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className='inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-semibold rounded-lg shadow-sm  hover:shadow-lg transition-all duration-300 transform hover:scale-105'
    >
      <span className='mr-2'>❤️</span>
      <span>{count}</span>
    </button>
  );
}

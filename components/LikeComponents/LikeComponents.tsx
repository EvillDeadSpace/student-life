"use client";
import { useEffect, useState } from "react";
import { getLikeCount, getUserFromStorage, toggleLike } from "@/lib/api";
import toast from "react-hot-toast";

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
  // floating animation state: { sign: 1|-1, stage: 'start' | 'end', key }
  const [floatAnim, setFloatAnim] = useState<{
    sign: number;
    stage: "start" | "end";
    key: number;
  } | null>(null);

  const floatColor = floatAnim
    ? floatAnim.sign > 0
      ? "text-green-400"
      : "text-red-400"
    : "text-white";

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
      toast.error("Moras biti logovan kako bih se lajkovao");
      return;
    }
    const userId = Number((user as { id?: number | string }).id);
    if (!userId || Number.isNaN(userId)) {
      alert("Nevažeći korisnik");
      return;
    }
    // optimistic UI - immediate toggle for responsiveness
    const willLike = !isLiked;
    setIsLiked(willLike);

    // Do not trigger float animation optimistically here. We'll show a single
    // float animation after the server confirms the actual change to avoid
    // showing +1 then -1 on conflicting results.

    setLoading(true);
    try {
      const res = await toggleLike(postId, userId);
      if (res && typeof res.liked === "boolean") {
        if (res.liked) setCount((c) => c + 1);
        else setCount((c) => Math.max(0, c - 1));
        setIsLiked(Boolean(res.liked));
        // show single floating animation based on the server-confirmed result
        const serverKey = Date.now();
        setFloatAnim({
          sign: res.liked ? 1 : -1,
          stage: "start",
          key: serverKey,
        });
        setTimeout(() => {
          setFloatAnim((p) =>
            p && p.key === serverKey ? { ...p, stage: "end" } : p
          );
        }, 30);
        setTimeout(() => {
          setFloatAnim((p) => (p && p.key === serverKey ? null : p));
        }, 1500);
      } else {
        // fallback: refresh real count
        const real = await getLikeCount(postId);
        setCount(real);
      }
    } catch (err) {
      console.error("toggleLike error:", err);
      // revert optimistic like on error
      setIsLiked((s) => !s);
      // show negative feedback animation on failure
      const key2 = Date.now();
      setFloatAnim({ sign: -1, stage: "start", key: key2 });
      setTimeout(
        () =>
          setFloatAnim((p) =>
            p && p.key === key2 ? { ...p, stage: "end" } : p
          ),
        30
      );
      setTimeout(
        () => setFloatAnim((p) => (p && p.key === key2 ? null : p)),
        1500
      );
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
        <span className='relative inline-flex items-center'>
          {/* Floating animation element */}
          {floatAnim ? (
            <span
              key={floatAnim.key}
              className={`absolute -top-6 left-8 pointer-events-none ${floatColor} text-xl font-bold drop-shadow-xl transition-all duration-1500 ease-out ${
                floatAnim.stage === "start"
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 -translate-y-8 scale-125 -rotate-6"
              }`}
              aria-hidden
            >
              {floatAnim.sign > 0 ? "+1" : "-1"}
            </span>
          ) : null}
          <span
            className={`text-lg leading-none ${
              isLiked ? "text-red-500" : "text-black"
            }`}
            aria-hidden
          >
            ❤️
          </span>
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
      className='relative inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-semibold rounded-lg shadow-sm  hover:shadow-lg transition-all duration-300 transform hover:scale-105'
    >
      {/* Floating animation element for default button */}
      {floatAnim ? (
        <span
          key={floatAnim.key}
          className={`absolute -top-6 left-8 pointer-events-none ${floatColor} text-xl font-bold drop-shadow-xl transition-all duration-1500 ease-out ${
            floatAnim.stage === "start"
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 -translate-y-8 scale-125 -rotate-6"
          }`}
          aria-hidden
        >
          {floatAnim.sign > 0 ? "+1" : "-1"}
        </span>
      ) : null}

      <span className='mr-2'>❤️</span>
      <span>{count}</span>
    </button>
  );
}

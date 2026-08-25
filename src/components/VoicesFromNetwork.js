"use client";

import { useCallback, useEffect, useState } from "react";
import { Icon } from "@iconify/react";

const VIDEOS = [
  { id: "hVyO0Rtzql8", title: "PAAN Network Voice 1" },
  { id: "efXMBeAW6Tc", title: "PAAN Network Voice 2" },
  { id: "zJd1akSivAw", title: "PAAN Network Voice 3" },
];

const VIDEOS_PER_VIEW = 3;

function getEmbedUrl(videoId, { autoplay = false, muted = false } = {}) {
  const params = new URLSearchParams({
    controls: "1",
    rel: "0",
    modestbranding: "1",
    enablejsapi: "1",
  });
  if (autoplay) params.set("autoplay", "1");
  if (muted) params.set("mute", "1");
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}

function VideoCard({ video, onPlay }) {
  const [thumbQuality, setThumbQuality] = useState("maxresdefault");
  const thumbnail = `https://img.youtube.com/vi/${video.id}/${thumbQuality}.jpg`;

  return (
    <article className="group relative overflow-hidden rounded-2xl bg-[#172840] shadow-[0_8px_30px_rgba(23,40,64,0.12)] ring-1 ring-[#172840]/10 transition-all duration-300 hover:shadow-[0_16px_48px_rgba(23,40,64,0.2)] hover:-translate-y-0.5">
      <div className="relative aspect-video">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumbnail}
          alt={video.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={() => {
            if (thumbQuality !== "hqdefault") setThumbQuality("hqdefault");
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#172840]/95 via-[#172840]/40 to-[#172840]/20" />
        <button
          type="button"
          onClick={onPlay}
          className="absolute inset-0 flex items-center justify-center"
          aria-label={`Play ${video.title}`}
        >
          <span className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-[#F25849] text-white shadow-lg ring-4 ring-white/20 transition-transform duration-300 group-hover:scale-110">
            <Icon icon="mdi:play" className="ml-1 h-7 w-7 sm:h-8 sm:w-8" />
          </span>
        </button>
      </div>
    </article>
  );
}

function VideoModal({ video, onClose }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#172840]/90 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close video"
          className="absolute -top-12 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white shadow-md backdrop-blur-sm transition-colors hover:bg-[#F25849] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F25849]"
        >
          <Icon icon="mdi:close" className="h-5 w-5" />
        </button>
        <div className="relative aspect-video overflow-hidden rounded-2xl bg-[#172840] shadow-2xl">
          <iframe
            className="absolute inset-0 h-full w-full"
            src={getEmbedUrl(video.id, { autoplay: true })}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}

export default function VoicesFromNetwork() {
  const [startIndex, setStartIndex] = useState(0);
  const [activeVideo, setActiveVideo] = useState(null);

  const maxStartIndex = Math.max(0, VIDEOS.length - VIDEOS_PER_VIEW);
  const canGoPrev = startIndex > 0;
  const canGoNext = startIndex < maxStartIndex;
  const visibleVideos = VIDEOS.slice(startIndex, startIndex + VIDEOS_PER_VIEW);

  const closeModal = useCallback(() => setActiveVideo(null), []);

  const goToPrev = () => {
    setStartIndex((prev) => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    setStartIndex((prev) => Math.min(maxStartIndex, prev + 1));
  };

  return (
    <section className="relative bg-white py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-8 sm:mb-10">
          <h2 className="mb-3 text-l font-normal uppercase text-[#172840] md:text-2xl lg:text-lg">
            Voices From the Network
          </h2>
          <div className="flex items-center justify-between gap-4">
            <p className="text-2xl font-normal text-[#172840] md:text-3xl">
              Real agencies. Real work. Real impact<br/>across 23+ African markets.
            </p>
            <div className="flex shrink-0 items-center gap-1">
              <button
                type="button"
                onClick={goToPrev}
                disabled={!canGoPrev}
                aria-label="Previous videos"
                className="p-1 text-[#172840] transition-colors hover:text-[#F25849] disabled:pointer-events-none disabled:opacity-30"
              >
                <Icon icon="mdi:arrow-left" width="32" height="32" />
              </button>
              <button
                type="button"
                onClick={goToNext}
                disabled={!canGoNext}
                aria-label="Next videos"
                className="p-1 text-[#172840] transition-colors hover:text-[#F25849] disabled:pointer-events-none disabled:opacity-30"
              >
                <Icon icon="mdi:arrow-right" width="32" height="32" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-3">
          {visibleVideos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              onPlay={() => setActiveVideo(video)}
            />
          ))}
        </div>
      </div>

      {activeVideo && <VideoModal video={activeVideo} onClose={closeModal} />}
    </section>
  );
}

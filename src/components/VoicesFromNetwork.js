"use client";

import { useCallback, useState } from "react";
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

function VideoCard({ video, isPlaying, onToggle, startMuted }) {
  const [thumbQuality, setThumbQuality] = useState("maxresdefault");
  const thumbnail = `https://img.youtube.com/vi/${video.id}/${thumbQuality}.jpg`;

  return (
    <article className="group relative overflow-hidden rounded-2xl bg-[#172840] shadow-[0_8px_30px_rgba(23,40,64,0.12)] ring-1 ring-[#172840]/10 transition-all duration-300 hover:shadow-[0_16px_48px_rgba(23,40,64,0.2)] hover:-translate-y-0.5">
      <div className="relative aspect-video">
        {isPlaying ? (
          <iframe
            key={`${video.id}-playing`}
            className="absolute inset-0 h-full w-full"
            src={getEmbedUrl(video.id, { autoplay: true, muted: startMuted })}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <>
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
              onClick={() => onToggle(true)}
              className="absolute inset-0 flex items-center justify-center"
              aria-label={`Play ${video.title}`}
            >
              <span className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-[#F25849] text-white shadow-lg ring-4 ring-white/20 transition-transform duration-300 group-hover:scale-110">
                <Icon icon="mdi:play" className="ml-1 h-7 w-7 sm:h-8 sm:w-8" />
              </span>
            </button>
          </>
        )}

        {isPlaying && (
          <div className="absolute bottom-0 right-0 z-10 p-4">
            <button
              type="button"
              onClick={() => onToggle(false)}
              aria-label={`Pause ${video.title}`}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-white shadow-md backdrop-blur-sm transition-colors hover:bg-[#F25849] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F25849]"
            >
              <Icon icon="mdi:pause" className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </article>
  );
}

export default function VoicesFromNetwork() {
  const [startIndex, setStartIndex] = useState(0);
  const [playingById, setPlayingById] = useState({ [VIDEOS[0].id]: true });

  const maxStartIndex = Math.max(0, VIDEOS.length - VIDEOS_PER_VIEW);
  const canGoPrev = startIndex > 0;
  const canGoNext = startIndex < maxStartIndex;
  const visibleVideos = VIDEOS.slice(startIndex, startIndex + VIDEOS_PER_VIEW);

  const setVideoPlaying = useCallback((videoId, playing) => {
    setPlayingById((prev) => ({ ...prev, [videoId]: playing }));
  }, []);

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
          {visibleVideos.map((video, index) => {
            const globalIndex = startIndex + index;
            const isPlaying = Boolean(playingById[video.id]);

            return (
              <VideoCard
                key={video.id}
                video={video}
                isPlaying={isPlaying}
                startMuted={globalIndex === 0}
                onToggle={(playing) => setVideoPlaying(video.id, playing)}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

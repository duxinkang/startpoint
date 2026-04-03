"use client";

import { useState } from "react";
import { Play, X } from "lucide-react";

export default function Home() {
  const pages = Array.from({ length: 19 }, (_, i) => i + 1);
  const videos = [
    { title: "Ava - Artisan V3.4", src: "/Ava - Artisan V3.4.mp4" },
    { title: "Poly Final", src: "/Poly Final.mp4" },
  ];
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <main className="pt-20 relative overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-28 -left-20 w-[34rem] h-[34rem] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-1/3 -right-24 w-[30rem] h-[30rem] rounded-full bg-secondary/12 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_48%),radial-gradient(circle_at_70%_65%,rgba(241,74,22,0.08),transparent_42%)]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-3 md:px-5 py-6 md:py-10 space-y-6 md:space-y-10">
        {pages.map((page) => (
          <section
            key={page}
            className="relative rounded-2xl overflow-hidden border border-border bg-card shadow-[0_18px_50px_rgba(26,26,26,0.12)]"
          >
            <img
              src={`/pdf-pages/page-${String(page).padStart(2, "0")}.png`}
              alt={`StartPoint 宣传 PDF 第 ${page} 页`}
              className="block w-full h-auto"
              loading={page <= 2 ? "eager" : "lazy"}
            />
            {page === 6 && (
              <div className="absolute bottom-3 right-3 md:bottom-5 md:right-5 flex gap-2">
                {videos.map((video) => (
                  <button
                    key={video.src}
                    type="button"
                    className="cursor-pointer inline-flex items-center gap-1.5 px-2.5 py-1.5 md:px-3 md:py-2 rounded-full bg-foreground/85 text-background text-[11px] md:text-xs font-medium hover:bg-primary transition-colors"
                    onClick={() => setActiveVideo(video.src)}
                  >
                    <Play className="w-3 h-3" />
                    {video.title}
                  </button>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>

      {activeVideo && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 md:p-6"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="w-full max-w-5xl rounded-2xl bg-black border border-white/15 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-end p-2">
              <button
                type="button"
                className="cursor-pointer p-2 rounded-full text-white/85 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="关闭视频"
                onClick={() => setActiveVideo(null)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <video src={activeVideo} controls autoPlay className="w-full h-auto" />
          </div>
        </div>
      )}
    </main>
  );
}

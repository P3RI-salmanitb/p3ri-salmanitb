"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Calendar,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TimelineItem {
  date: string;
  time: string;
  activity: string;
  info: string;
}

interface Program {
  id: number;
  slug: string;
  title: string;
  summary: string;
  date_display: string;
  location: string;
  images: string[];
  registration_url: string;
  details: {
    description: string;
    timeline: TimelineItem[];
  };
}

export default function ProgramDetailClient({ program }: { program: Program }) {
  const images =
    program.images.length > 0 ? program.images : ["/images/empty-img.png"];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Auto-advance carousel
  useEffect(() => {
    if (isPaused || images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused, images.length]);

  const goTo = useCallback(
    (index: number) => {
      setCurrentIndex(
        ((index % images.length) + images.length) % images.length,
      );
    },
    [images.length],
  );

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? 0;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0]?.clientX ?? 0;
  };
  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goTo(currentIndex + 1);
      else goTo(currentIndex - 1);
    }
  };

  return (
    <>
      {/* ─── Hero Section ─── */}
      <section className="relative overflow-hidden bg-primary pb-20 pt-24 md:pb-28 md:pt-32 lg:pb-32 lg:pt-36">
        {/* Decorative background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-hero-bg/20 blur-3xl" />
          <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute right-1/4 top-1/3 h-40 w-40 rounded-full bg-brand-purple/10 blur-2xl" />
        </div>

        {/* Dot pattern */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 md:px-12 lg:px-20">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex items-center gap-2 font-montserrat text-sm text-white/60"
          >
            <Link
              href="/program"
              className="transition-colors hover:text-white"
            >
              Program
            </Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span className="text-white/90 font-medium">{program.title}</span>
          </nav>

          <div className="flex flex-col items-center text-center">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
              <Sparkles size={16} className="text-accent" />
              <span className="font-montserrat text-xs font-semibold uppercase tracking-wider text-accent">
                Ramadhan 1447 H
              </span>
            </div>

            {/* Title */}
            <h1 className="mb-6 max-w-3xl font-forum text-4xl leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              {program.title}
            </h1>

            {/* Meta info */}
            <div className="mb-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-montserrat text-sm font-medium text-white/80 md:text-base">
              {program.date_display && (
                <div className="flex items-center gap-2">
                  <Calendar
                    size={16}
                    className="flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span>{program.date_display}</span>
                </div>
              )}
              {program.location && (
                <div className="flex items-center gap-2">
                  <MapPin
                    size={16}
                    className="flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span>{program.location}</span>
                </div>
              )}
            </div>

            {/* Summary */}
            <p className="max-w-2xl font-montserrat text-sm font-medium leading-relaxed text-white/70 md:text-base">
              {program.summary}
            </p>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M0 80V40C240 0 480 0 720 40C960 80 1200 80 1440 40V80H0Z"
              fill="var(--color-background-page)"
            />
          </svg>
        </div>
      </section>

      {/* ─── Image Carousel ─── */}
      <section className="px-6 pb-8 pt-4 md:px-12 md:pb-12 md:pt-8 lg:px-20">
        <div className="mx-auto max-w-4xl">
          <div
            className="group relative overflow-hidden rounded-2xl bg-card shadow-xl md:rounded-3xl"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            role="region"
            aria-label="Galeri gambar program"
            aria-roledescription="carousel"
          >
            {/* Main image */}
            <div className="relative aspect-video w-full md:aspect-[16/9]">
              <Image
                src={images[currentIndex] ?? "/images/empty-img.png"}
                alt={`${program.title} — gambar ${currentIndex + 1} dari ${images.length}`}
                fill
                className="object-cover transition-opacity duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 896px"
                priority={currentIndex === 0}
                key={currentIndex}
              />
            </div>

            {/* Arrow buttons (desktop) */}
            {images.length > 1 && (
              <>
                <button
                  onClick={() => goTo(currentIndex - 1)}
                  className="absolute left-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg backdrop-blur-sm transition-all hover:bg-white md:block"
                  aria-label="Gambar sebelumnya"
                >
                  <ChevronLeft size={24} className="text-foreground" />
                </button>
                <button
                  onClick={() => goTo(currentIndex + 1)}
                  className="absolute right-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg backdrop-blur-sm transition-all hover:bg-white md:block"
                  aria-label="Gambar berikutnya"
                >
                  <ChevronRight size={24} className="text-foreground" />
                </button>
              </>
            )}

            {/* Dot indicators */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className={cn(
                      "h-2.5 rounded-full transition-all duration-300",
                      i === currentIndex
                        ? "w-8 bg-white shadow-lg"
                        : "w-2.5 bg-white/50 hover:bg-white/70",
                    )}
                    aria-label={`Gambar ${i + 1}`}
                    aria-current={i === currentIndex ? "true" : undefined}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─── Description Section ─── */}
      <section className="px-6 py-10 md:px-12 md:py-16 lg:px-20 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-border bg-card p-8 shadow-lg md:rounded-3xl md:p-12">
            <h2 className="mb-6 text-center font-forum text-3xl text-foreground sm:text-4xl md:text-5xl">
              Deskripsi Program
            </h2>
            <p className="text-center font-montserrat text-sm font-medium leading-relaxed text-text-gray md:text-base lg:text-lg">
              {program.details.description}
            </p>
          </div>
        </div>
      </section>

      {/* ─── Timeline Section ─── */}
      <section
        id="detailtimeline"
        className="scroll-mt-20 px-6 pb-10 pt-6 md:px-12 md:pb-16 md:pt-12 lg:px-20 lg:pb-20"
      >
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-8 text-center font-forum text-3xl text-foreground sm:text-4xl md:mb-12 md:text-5xl lg:text-6xl">
            Timeline
          </h2>

          {/* Location badge */}
          <div className="mb-12 flex justify-center md:mb-16">
            <div className="inline-flex items-center gap-3 rounded-2xl bg-primary px-8 py-4 shadow-md">
              <MapPin
                size={24}
                className="flex-shrink-0 text-white"
                aria-hidden="true"
              />
              <span className="font-montserrat text-sm font-semibold text-accent sm:text-base md:text-lg">
                {program.location}
              </span>
            </div>
          </div>

          {/* Timeline items */}
          {program.details.timeline.length === 1 ? (
            /* Single item — centered */
            <div className="flex flex-col items-center gap-6">
              <div className="rounded-full bg-gradient-to-r from-brand-purple to-brand-purple-dark px-8 py-3 shadow-md">
                <span className="font-montserrat text-sm font-bold text-white">
                  {program.details.timeline[0]!.date}
                </span>
              </div>
              <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-lg">
                <h3 className="mb-2 font-montserrat text-xl font-bold text-brand-purple">
                  {program.details.timeline[0]!.activity}
                </h3>
                <p className="mb-4 font-montserrat text-sm font-semibold text-brand-purple/70">
                  {program.details.timeline[0]!.time}
                </p>
                <p className="font-montserrat text-sm font-medium text-text-gray">
                  {program.details.timeline[0]!.info}
                </p>
              </div>
            </div>
          ) : (
            /* Multiple items — alternating timeline */
            <div className="relative">
              {/* Center line (desktop) */}
              <div className="absolute left-6 top-0 hidden h-full w-0.5 bg-brand-purple/20 md:left-1/2 md:block md:-translate-x-1/2" />
              {/* Left line (mobile) */}
              <div className="absolute left-6 top-0 h-full w-0.5 bg-brand-purple/20 md:hidden" />

              <div className="flex flex-col gap-12 md:gap-16">
                {program.details.timeline.map((item, index) => {
                  const isEven = index % 2 === 0;

                  return (
                    <div
                      key={index}
                      className={cn(
                        "flex w-full items-start",
                        /* Mobile: always left-aligned */
                        "flex-row",
                        /* Desktop: alternate sides */
                        isEven ? "md:flex-row" : "md:flex-row-reverse",
                      )}
                    >
                      {/* Mobile dot */}
                      <div className="relative mr-6 flex flex-col items-center md:hidden">
                        <div className="z-20 h-4 w-4 rounded-full bg-brand-purple ring-4 ring-background-page" />
                      </div>

                      {/* Content side */}
                      <div
                        className={cn(
                          "flex w-full flex-col gap-3 md:w-[42%]",
                          isEven ? "md:items-start" : "md:items-end",
                        )}
                      >
                        {/* Date badge */}
                        <div className="w-fit rounded-full bg-gradient-to-r from-brand-purple to-brand-purple-dark px-6 py-2 shadow-sm">
                          <span className="font-montserrat text-xs font-bold text-white sm:text-sm">
                            {item.date}
                          </span>
                        </div>

                        {/* Card */}
                        <div className="w-full rounded-2xl border border-border bg-card p-6 shadow-lg">
                          <h3 className="font-montserrat text-lg font-bold text-brand-purple md:text-xl">
                            {item.activity}
                          </h3>
                          <p className="mb-3 font-montserrat text-xs font-semibold text-brand-purple/70 md:text-sm">
                            {item.time}
                          </p>
                          <p className="font-montserrat text-xs font-medium leading-relaxed text-text-gray md:text-sm">
                            {item.info}
                          </p>
                        </div>
                      </div>

                      {/* Center dot (desktop) */}
                      <div className="relative hidden items-center justify-center md:flex md:w-[16%]">
                        {/* Dashed connector line */}
                        <div
                          className={cn(
                            "absolute top-1/2 h-0.5 w-12",
                            isEven
                              ? "right-[calc(50%+14px)]"
                              : "left-[calc(50%+14px)]",
                          )}
                          style={{
                            backgroundImage:
                              "repeating-linear-gradient(to right, var(--color-brand-purple) 0, var(--color-brand-purple) 6px, transparent 6px, transparent 12px)",
                          }}
                        />
                        <div className="z-20 h-5 w-5 rounded-full bg-brand-purple-dark ring-4 ring-background-page" />
                      </div>

                      {/* Spacer for opposite side (desktop) */}
                      <div className="hidden md:block md:w-[42%]" />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ─── CTA Button ─── */}
      <section className="flex justify-center px-6 pb-20 pt-6 md:pb-28">
        <Link
          href={program.registration_url}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 font-montserrat text-base font-bold text-accent-foreground shadow-lg transition-all duration-300 hover:brightness-105 hover:shadow-xl md:px-10 md:py-5 md:text-lg"
        >
          Daftar Sekarang
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-purple text-white shadow-md transition-transform duration-300 group-hover:translate-x-1 md:h-12 md:w-12">
            <ArrowRight size={20} strokeWidth={2.5} />
          </div>
        </Link>
      </section>
    </>
  );
}

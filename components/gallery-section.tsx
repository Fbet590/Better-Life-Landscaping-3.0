"use client"

import Image from "next/image"
import { useState, useEffect, useCallback, useRef } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

const PROJECTS = [
  { src: "/images/gallery-1.jpg", alt: "Custom dark aluminum lattice pergola over patio" },
  { src: "/images/gallery-2.jpg", alt: "White solid-roof patio cover with outdoor dining" },
  { src: "/images/gallery-3.jpg", alt: "Louvered pergola over outdoor kitchen" },
  { src: "/images/gallery-4.jpg", alt: "White lattice patio cover over pool area" },
  { src: "/images/gallery-5.jpg", alt: "Modern solid-roof patio cover at golden hour" },
  { src: "/images/gallery-6.jpg", alt: "Two-tone freestanding patio cover with furniture" },
  { src: "/images/gallery-7.jpg", alt: "Brown lattice pergola with wicker daybed and desert landscaping" },
  { src: "/images/gallery-8.jpg", alt: "Brown lattice sun cover viewed from underneath" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/604827609_18094585025494359_2108981316619141228_n-0AadZQYeohlA9iFeiDp9eWNZcdRMWD.jpg", alt: "Black louvered pergola attached to home over concrete patio with desert landscaping" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/605904172_18094585016494359_2863394204829172646_n-IIwcEm36fmjpJa8g3xuQ7KLIZYcPcl.jpg", alt: "Freestanding dark pergola on paver patio with turf lawn at dusk" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/607221145_18094584959494359_1782656086283699737_n%28792%29-WvfnpX84pBxOyJGZqrFpaJcojCPLhK.jpg", alt: "Aerial view of backyard with louvered pergola, paver patio, and turf" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/605904169_18094585007494359_5876347638347139777_n-5q7yZGXgKM5Ix4EPYAkT38mIISAX3t.jpg", alt: "View from covered patio of freestanding pergola with lit stone walkway" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/605985192_18094584977494359_7429041825270019903_n-xR50zGkMKfGeaS97U8OsrxhNKDG5uO.jpg", alt: "Low-angle view of louvered pergola with lit stone pathway and desert landscaping at dusk" },
]

const poppinsStyle = { fontFamily: "var(--font-poppins), Poppins, sans-serif" }

export function GallerySection() {
  const [current, setCurrent] = useState(0)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % PROJECTS.length)
    }, 10000)
  }, [])

  useEffect(() => {
    if (lightboxIndex !== null) {
      if (timerRef.current) clearInterval(timerRef.current)
      return
    }
    startTimer()
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [lightboxIndex, startTimer])

  const goToSlide = (index: number) => {
    setCurrent(index)
    startTimer()
  }

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index)
    document.body.style.overflow = "hidden"
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null)
    document.body.style.overflow = ""
  }, [])

  const lightboxNext = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % PROJECTS.length : null))
  }, [])

  const lightboxPrev = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null ? (prev - 1 + PROJECTS.length) % PROJECTS.length : null))
  }, [])

  return (
    <section className="bg-background py-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-amber-600">
            See Our Stunning Results
          </p>
          <h2
            className="text-3xl font-bold text-foreground sm:text-4xl text-balance"
            style={poppinsStyle}
          >
            Explore Our Recent Patio Projects
          </h2>
        </div>

        <div className="mx-auto max-w-4xl">
          <div
            onClick={() => openLightbox(current)}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLightbox(current) } }}
            role="button"
            tabIndex={0}
            className="group relative isolate w-full overflow-hidden rounded-2xl cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600"
            aria-label={`View ${PROJECTS[current].alt}`}
          >
            {PROJECTS.map((project, i) => (
              <Image
                key={project.src}
                src={project.src}
                alt={project.alt}
                width={896}
                height={560}
                className={`w-full h-auto object-cover transition-opacity duration-700 ease-in-out ${
                  i === current ? "relative opacity-100" : "absolute inset-0 opacity-0"
                }`}
                sizes="(max-width: 896px) 100vw, 896px"
                priority={i === 0}
              />
            ))}
            <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10 pointer-events-none" />
          </div>

          <div className="mt-6 flex justify-center gap-2">
            {PROJECTS.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current ? "w-6 bg-amber-600" : "w-2 bg-foreground/20"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            aria-label="Close lightbox"
          >
            <X className="size-6" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); lightboxPrev() }}
            className="absolute left-4 z-10 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            aria-label="Previous image"
          >
            <ChevronLeft className="size-6" />
          </button>

          <div
            className="relative max-h-[85vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={PROJECTS[lightboxIndex].src}
              alt={PROJECTS[lightboxIndex].alt}
              width={1200}
              height={900}
              className="max-h-[85vh] w-auto rounded-lg object-contain"
              priority
            />
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); lightboxNext() }}
            className="absolute right-4 z-10 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            aria-label="Next image"
          >
            <ChevronRight className="size-6" />
          </button>
        </div>
      )}
    </section>
  )
}

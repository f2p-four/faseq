"use client"

import { useState, useRef } from "react"
import { Heart, Share2 } from "lucide-react"
import Image from "next/image"

const productImages = [
  "https://down-br.img.susercontent.com/file/br-11134207-820m2-mm7pjwrv93b4ec",
  "https://http2.mlstatic.com/D_NQ_NP_2X_730338-MLB108885832417_032026-F.webp",
  "https://http2.mlstatic.com/D_NQ_NP_2X_987084-MLB108885772695_032026-F.webp",
  "https://http2.mlstatic.com/D_NQ_NP_2X_669477-MLB108886279879_032026-F.webp",
]

export function ProductGallery() {
  const [currentImage, setCurrentImage] = useState(0)
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  const minSwipeDistance = 50

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX
    touchEndX.current = null
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return

    const distance = touchStartX.current - touchEndX.current
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe && currentImage < productImages.length - 1) {
      setCurrentImage(currentImage + 1)
    }

    if (isRightSwipe && currentImage > 0) {
      setCurrentImage(currentImage - 1)
    }

    touchStartX.current = null
    touchEndX.current = null
  }

  return (
    <div className="relative bg-white">
      {/* Main Image */}
      <div
        className="relative aspect-square w-full max-w-md mx-auto cursor-grab active:cursor-grabbing"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="absolute top-4 left-4 bg-black/60 text-white text-xs px-2 py-1 rounded-sm">
          {currentImage + 1} / {productImages.length}
        </div>
        <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">
          <Heart className="w-5 h-5 text-[#3483FA]" />
        </button>
        <Image
          src={productImages[currentImage]}
          alt="Camisa Seleção Brasil Azul"
          fill
          className="object-contain p-4"
          priority
        />
        <button className="absolute bottom-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">
          <Share2 className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Thumbnail Dots */}
      <div className="flex justify-center gap-2 py-4">
        {productImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentImage ? "bg-[#3483FA]" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  )
}

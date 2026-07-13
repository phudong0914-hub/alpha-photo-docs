import { useState, useRef, useEffect } from "react";
import { MoveHorizontal } from "lucide-react";

interface ImageComparisonSliderProps {
  originalSrc: string;
  improvedSrc: string;
  originalLabel?: string;
  improvedLabel?: string;
  aspectRatio?: string;
}

export function ImageComparisonSlider({
  originalSrc,
  improvedSrc,
  originalLabel = "Ảnh Gốc",
  improvedLabel = "Đã Cải Tiến",
  aspectRatio = "aspect-[16/9]",
}: ImageComparisonSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0 - 100)
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    if (e.touches.length === 0) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleTouchStart = () => {
    setIsDragging(true);
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden rounded-xl border border-[#1e1e2a] bg-[#0a0a14] select-none ${aspectRatio}`}
    >
      {/* Original Image (Background) */}
      <img
        src={originalSrc}
        alt="Original"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />
      <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded bg-[#050508]/80 backdrop-blur-md border border-white/5 text-[10px] font-semibold tracking-wider text-[#9d9db5] uppercase">
        {originalLabel}
      </div>

      {/* Improved Image (Foreground / Clipped) */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
      >
        <img
          src={improvedSrc}
          alt="Improved"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{ width: "100%", height: "100%" }}
        />
        <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded bg-[#c9a84c]/90 backdrop-blur-md border border-[#c9a84c]/20 text-[10px] font-semibold tracking-wider text-black uppercase">
          {improvedLabel}
        </div>
      </div>

      {/* Slider Bar & Handle */}
      <div
        className="absolute top-0 bottom-0 z-20 w-0.5 bg-[#c9a84c] cursor-ew-resize group"
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* Handle visual representation */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#12121f]/95 border-2 border-[#c9a84c] flex items-center justify-center shadow-lg shadow-black/60 cursor-ew-resize group-hover:scale-110 active:scale-95 transition-transform duration-200">
          <MoveHorizontal size={14} className="text-[#c9a84c]" />
        </div>
      </div>

      {/* Instructions Overlay (Fades out when interacting) */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 px-3 py-1.5 rounded-full bg-[#050508]/75 backdrop-blur-sm border border-white/5 text-[10px] text-[#5a5a72] pointer-events-none text-center hidden sm:block">
        Kéo thanh trượt để so sánh chi tiết
      </div>
    </div>
  );
}

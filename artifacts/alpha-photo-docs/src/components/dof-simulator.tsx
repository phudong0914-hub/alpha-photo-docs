import { useState, useMemo } from "react";
import { Aperture, Move, Eye, Info, Sparkles } from "lucide-react";

export function DofSimulator() {
  const [aperture, setAperture] = useState(2.8); // f-stop values: 1.4, 2.0, 2.8, 4.0, 5.6, 8.0, 11, 16
  const [distance, setDistance] = useState(2.0); // meters (1.0m to 10.0m)
  const [focalLength, setFocalLength] = useState(85); // mm (24mm to 200mm)

  // f-stop scale helper for ticks
  const fStops = [1.4, 2.0, 2.8, 4.0, 5.6, 8.0, 11, 16];

  // Calculate simulated depth of field blur levels in pixels
  // Blur is proportional to: (focalLength^2) / (aperture * (distance * 1000))
  const blurAmounts = useMemo(() => {
    // Normalization factors
    const fFactor = Math.pow(focalLength / 50, 2); // reference at 50mm
    const aFactor = 2.8 / aperture; // reference at f/2.8
    const dFactor = 3.0 / distance; // reference at 3 meters

    const baseBlur = 12 * fFactor * aFactor * dFactor;

    // Constrain blur values to reasonable CSS pixels
    const backgroundBlur = Math.min(24, Math.max(0, baseBlur));
    // Foreground object is closer than focus plane, so it will blur even more
    const foregroundBlur = Math.min(32, Math.max(0, baseBlur * 1.5));

    // Calculate depth of field field indicator (shallow, medium, deep)
    let dofRating = "Trung bình";
    let dofColor = "text-[#ffcb6b]";
    if (baseBlur > 15) {
      dofRating = "Mỏng (Xóa phông mạnh)";
      dofColor = "text-[#fb7185]";
    } else if (baseBlur < 3) {
      dofRating = "Sâu (Nét toàn phần)";
      dofColor = "text-[#22c55e]";
    }

    return {
      bg: backgroundBlur,
      fg: foregroundBlur,
      rating: dofRating,
      color: dofColor,
      rawScore: baseBlur
    };
  }, [aperture, distance, focalLength]);

  return (
    <div className="w-full my-8 bg-[#0a0a10] border border-[#1e1e2a] rounded-xl overflow-hidden shadow-xl shadow-black/30">
      {/* Header Accent */}
      <div className="px-5 py-3 border-b border-[#1e1e2a] bg-[#0c0c16] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Aperture size={16} className="text-[#a855f7]" />
          <h3 className="text-sm font-semibold text-[#e4e4ed] tracking-wide">
            Bộ Giả Lập Quang Học DoF & Khẩu Độ
          </h3>
        </div>
        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#a855f7]/10 text-[#a855f7] border border-[#a855f7]/20">
          Tương Tác Premium
        </span>
      </div>

      {/* Simulator Display Screen */}
      <div className="relative aspect-[16/7] w-full bg-[#030305] overflow-hidden border-b border-[#1e1e2a]">
        {/* Grid lines background */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />

        {/* 1. Background Layer (Cityscape / Forest silhouette) */}
        <div 
          className="absolute inset-0 flex items-center justify-center transition-all duration-300 pointer-events-none"
          style={{ 
            filter: `blur(${blurAmounts.bg}px)`, 
            transform: `scale(${1 + (blurAmounts.bg * 0.005)})`, // Prevent edge artifacts
            opacity: 0.85
          }}
        >
          {/* Virtual background graphics */}
          <div className="w-full h-full relative">
            {/* Distant mountains/buildings */}
            <div className="absolute bottom-4 left-1/4 w-32 h-44 rounded-t-full bg-gradient-to-t from-[#141424] to-transparent opacity-60" />
            <div className="absolute bottom-0 left-[45%] w-48 h-56 rounded-t-full bg-gradient-to-t from-[#11111f] to-transparent opacity-75" />
            <div className="absolute bottom-10 right-1/4 w-36 h-36 rounded-full bg-gradient-to-t from-[#18182d] to-transparent opacity-50" />
            {/* Bokeh dots that fade in when blur is high */}
            {blurAmounts.bg > 3 && (
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-[35%] w-8 h-8 rounded-full bg-[#ffcb6b]/20 blur-[1px] transition-all" style={{ transform: `scale(${1 + blurAmounts.bg * 0.2})` }} />
                <div className="absolute top-1/3 left-[55%] w-12 h-12 rounded-full bg-[#7c8aff]/15 blur-[1.5px] transition-all" style={{ transform: `scale(${1 + blurAmounts.bg * 0.25})` }} />
                <div className="absolute top-1/5 right-[20%] w-10 h-10 rounded-full bg-[#fb7185]/10 blur-[1px] transition-all" style={{ transform: `scale(${1 + blurAmounts.bg * 0.18})` }} />
                <div className="absolute top-1/2 left-[15%] w-6 h-6 rounded-full bg-white/5 blur-[2px] transition-all" style={{ transform: `scale(${1 + blurAmounts.bg * 0.3})` }} />
              </div>
            )}
            {/* Soft sunset glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-[80%] rounded-full bg-gradient-to-t from-[#ff7e3b]/10 to-transparent blur-3xl pointer-events-none" />
          </div>
        </div>

        {/* 2. Focused Subject Layer (Portrait silhouette / Flower) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="relative flex flex-col items-center justify-end h-full pb-3">
            {/* Focused Camera Target lines */}
            <div className="absolute top-[42%] w-12 h-12 border border-[#a855f7]/30 rounded flex items-center justify-center opacity-80">
              <div className="w-1.5 h-1.5 bg-[#a855f7] rounded-full animate-ping" />
              <div className="absolute inset-0 border-t-2 border-l-2 border-[#a855f7] w-3 h-3 top-0 left-0" />
              <div className="absolute inset-0 border-t-2 border-r-2 border-[#a855f7] w-3 h-3 top-0 right-0" />
              <div className="absolute inset-0 border-b-2 border-l-2 border-[#a855f7] w-3 h-3 bottom-0 left-0" />
              <div className="absolute inset-0 border-b-2 border-r-2 border-[#a855f7] w-3 h-3 bottom-0 right-0" />
            </div>

            {/* Model vector visual */}
            <div className="w-24 h-48 relative flex flex-col items-center justify-end">
              {/* Head */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-b from-[#e4e4ed]/90 to-[#b5b5c9] border border-white/10 shadow-lg shadow-black/50" />
              {/* Neck */}
              <div className="w-2 h-3 bg-[#a1a1b5]" />
              {/* Shoulders / Body */}
              <div className="w-20 h-28 rounded-t-3xl bg-gradient-to-b from-[#1b1b2f] to-[#0f0f18] border-t border-x border-white/5 flex items-center justify-center">
                <span className="text-[9px] font-mono text-[#5a5a72]">FOCUSED</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Foreground Layer (Leaf / Branch silhouette) */}
        <div 
          className="absolute bottom-0 -left-6 w-32 h-44 transition-all duration-300 pointer-events-none z-20"
          style={{ 
            filter: `blur(${blurAmounts.fg}px)`, 
            transform: `scale(${1 + (blurAmounts.fg * 0.005)})`,
            opacity: 0.65 
          }}
        >
          {/* Leaf / branch shape */}
          <div className="w-full h-full relative">
            <div className="absolute bottom-0 left-0 w-20 h-40 bg-gradient-to-tr from-[#1b1b2d] to-transparent rounded-tr-[80px] border-r border-[#ffffff]/10" />
            <div className="absolute bottom-16 left-6 w-12 h-20 bg-gradient-to-tr from-[#1b1b2d] to-transparent rounded-tr-[60px] transform rotate-12" />
          </div>
        </div>

        {/* Optical Info Overlay */}
        <div className="absolute top-3 left-3 px-3 py-2 rounded-lg bg-[#050508]/85 backdrop-blur-md border border-white/5 text-[11px] font-mono text-[#9d9db5] leading-relaxed z-30">
          <div>Khoảng DOF: <span className={`font-semibold ${blurAmounts.color}`}>{blurAmounts.rating}</span></div>
          <div>Mức xóa phông nền: <span className="text-white font-bold">{blurAmounts.bg.toFixed(1)}px</span></div>
        </div>

        {/* Lens perspective focal scale indicator */}
        <div className="absolute bottom-3 right-3 px-3 py-1 rounded bg-[#050508]/80 backdrop-blur-sm border border-white/5 text-[9px] font-mono text-[#5a5a72] z-30 flex items-center gap-1.5">
          <Eye size={10} /> Tiêu cự giả lập: <span className="text-[#a855f7] font-semibold">{focalLength}mm</span>
        </div>
      </div>

      {/* Control Panel Grid */}
      <div className="p-5 bg-[#07070d] grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 1. Aperture Slider */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-[#9d9db5] flex items-center gap-1 font-medium">
              <Aperture size={12} className="text-[#fb7185]" /> Khẩu độ (Aperture)
            </span>
            <span className="font-mono text-[#fb7185] font-semibold">f/{aperture}</span>
          </div>
          
          <input
            type="range"
            min="0"
            max={fStops.length - 1}
            value={fStops.indexOf(aperture)}
            onChange={(e) => setAperture(fStops[parseInt(e.target.value)])}
            className="w-full h-1 bg-[#1a1a2e] rounded-lg appearance-none cursor-pointer accent-[#fb7185]"
          />
          
          <div className="flex justify-between text-[9px] font-mono text-[#5a5a72] px-0.5">
            <span>f/1.4 (Lớn)</span>
            <span>f/4.0</span>
            <span>f/8.0</span>
            <span>f/16 (Nhỏ)</span>
          </div>
        </div>

        {/* 2. Subject Distance Slider */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-[#9d9db5] flex items-center gap-1 font-medium">
              <Move size={12} className="text-[#ffcb6b]" /> Khoảng cách (Distance)
            </span>
            <span className="font-mono text-[#ffcb6b] font-semibold">{distance.toFixed(1)} m</span>
          </div>

          <input
            type="range"
            min="1.0"
            max="10.0"
            step="0.5"
            value={distance}
            onChange={(e) => setDistance(parseFloat(e.target.value))}
            className="w-full h-1 bg-[#1a1a2e] rounded-lg appearance-none cursor-pointer accent-[#ffcb6b]"
          />

          <div className="flex justify-between text-[9px] font-mono text-[#5a5a72] px-0.5">
            <span>1.0m (Gần)</span>
            <span>3.0m</span>
            <span>6.0m</span>
            <span>10.0m (Xa)</span>
          </div>
        </div>

        {/* 3. Focal Length Slider */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-[#9d9db5] flex items-center gap-1 font-medium">
              <Eye size={12} className="text-[#7c8aff]" /> Tiêu cự (Focal Length)
            </span>
            <span className="font-mono text-[#7c8aff] font-semibold">{focalLength} mm</span>
          </div>

          <input
            type="range"
            min="24"
            max="200"
            step="1"
            value={focalLength}
            onChange={(e) => setFocalLength(parseInt(e.target.value))}
            className="w-full h-1 bg-[#1a1a2e] rounded-lg appearance-none cursor-pointer accent-[#7c8aff]"
          />

          <div className="flex justify-between text-[9px] font-mono text-[#5a5a72] px-0.5">
            <span>24mm (Rộng)</span>
            <span>50mm (Chuẩn)</span>
            <span>85mm (Chân dung)</span>
            <span>200mm (Tele)</span>
          </div>
        </div>
      </div>

      {/* Dynamic Physics Explanation Footer */}
      <div className="px-5 py-3 border-t border-[#1e1e2a] bg-[#0c0c16] text-[11px] text-[#5a5a72] flex gap-2 items-start leading-relaxed">
        <Info size={14} className="text-[#a855f7] shrink-0 mt-0.5" />
        <p>
          {aperture <= 2.8 && focalLength >= 85 && distance <= 3 ? (
            <span className="text-[#e4e4ed]">
              💡 **Phối cảnh xóa phông cực đại:** Khẩu độ mở lớn (<strong>f/{aperture}</strong>), tiêu cự chụp xa (<strong>{focalLength}mm</strong>) và đứng sát chủ thể (<strong>{distance}m</strong>) giúp cô lập hoàn toàn đối tượng, tạo hiệu ứng bokeh bong bóng quyến rũ ở hậu cảnh.
            </span>
          ) : aperture >= 8 && focalLength <= 35 ? (
            <span className="text-[#e4e4ed]">
              💡 **Bố cục phong cảnh nét sâu:** Khẩu độ khép sâu (<strong>f/{aperture}</strong>) kết hợp ống kính góc rộng (<strong>{focalLength}mm</strong>) tạo ra trường ảnh sâu rộng. Mọi chi tiết từ tiền cảnh đến dãy núi phía sau đều sắc nét.
            </span>
          ) : (
            <span>
              Di chuyển các thanh trượt để quan sát mối tương quan: **Khẩu độ mở** càng rộng, ống kính **tiêu cự** càng dài và **khoảng cách** càng gần sẽ làm vùng ảnh rõ nét (Depth of Field) mỏng đi đáng kể.
            </span>
          )}
        </p>
      </div>
    </div>
  );
}

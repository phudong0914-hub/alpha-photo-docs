import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Grid, Eye, RotateCw, HelpCircle, Sparkles } from 'lucide-react';

interface DeconstructionPreset {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  bgGradient: string;
  subjectContent: React.ReactNode;
  foregroundContent: React.ReactNode;
  vectorSvg: React.ReactNode;
}

interface VisualDeconstructionLabProps {
  defaultPreset?: 'portrait' | 'dunes';
}

export function VisualDeconstructionLab({ defaultPreset = 'portrait' }: VisualDeconstructionLabProps) {
  const [presetId, setPresetId] = useState<string>(defaultPreset);
  const [viewMode, setViewMode] = useState<'original' | 'vector' | 'layers'>('layers');
  const [layerSpread, setLayerSpread] = useState<number>(60); // translation Z distance in px
  const [rotateX, setRotateX] = useState<number>(12); // initial oblique angles
  const [rotateY, setRotateY] = useState<number>(-12);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse move handler for 3D rotation parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || viewMode !== 'layers') return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within element
    const y = e.clientY - rect.top;  // y position within element
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation (-18 to 18 degrees)
    const rotX = -((y - centerY) / centerY) * 18;
    const rotY = ((x - centerX) / centerX) * 18;
    
    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    // Smoothly return to default oblique view for layers, flat for others
    setRotateX(12);
    setRotateY(-12);
  };

  // Presets definition
  const presets: Record<string, DeconstructionPreset> = {
    portrait: {
      id: 'portrait',
      title: 'Chân dung Studio Nghệ thuật',
      subtitle: 'Phân cấp ánh sáng & Xóa phông bokeh',
      desc: 'Sự tách biệt hoàn hảo giữa chủ thể sắc nét và tiền cảnh/hậu cảnh mờ giúp dồn toàn bộ sự chú ý của người xem vào ánh mắt nhân vật.',
      bgGradient: 'linear-gradient(135deg, #0b0b14 0%, #151528 50%, #251833 100%)',
      
      // Subject: silhouette portrait with elegant neon gold accents
      subjectContent: (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <svg className="w-56 h-56 text-[#c9a84c]/20" viewBox="0 0 100 100" fill="currentColor">
            {/* Elegant silhouette outline */}
            <path d="M50 15 C35 15 25 25 25 40 C25 50 28 55 28 65 C28 75 35 85 45 88 L45 92 L55 92 L55 88 C65 85 72 75 72 65 C72 55 75 50 75 40 C75 25 65 15 50 15 Z" />
            {/* Golden glowing highlight lines */}
            <path d="M28 65 Q40 68 50 68 T72 65" fill="none" stroke="#ffe58f" strokeWidth="1" className="opacity-70" />
            <path d="M30 45 Q40 50 50 45 T70 45" fill="none" stroke="#ffe58f" strokeWidth="0.8" className="opacity-50" />
            {/* Sharp glowing eye dots */}
            <circle cx="42" cy="42" r="1.5" fill="#38bdf8" />
            <circle cx="58" cy="42" r="1.5" fill="#38bdf8" />
          </svg>
        </div>
      ),
      
      // Foreground: glowing organic leaf shadows and blurry bokeh particles
      foregroundContent: (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Bottom-left/foreground warm bokeh circles */}
          <div className="absolute bottom-6 left-12 w-14 h-14 rounded-full bg-amber-500/20 blur-[8px] mix-blend-screen" />
          <div className="absolute bottom-16 left-28 w-8 h-8 rounded-full bg-[#c9a84c]/15 blur-[6px] mix-blend-screen" />
          <div className="absolute top-20 left-16 w-10 h-10 rounded-full bg-blue-500/10 blur-[10px] mix-blend-screen" />
        </div>
      ),

      // Vector elements: Rule of thirds grid, diagonal lines, and focal points
      vectorSvg: (
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Rule of thirds grid lines */}
          <line x1="33.3" y1="0" x2="33.3" y2="100" stroke="rgba(255, 215, 0, 0.25)" strokeWidth="0.5" strokeDasharray="2,2" />
          <line x1="66.6" y1="0" x2="66.6" y2="100" stroke="rgba(255, 215, 0, 0.25)" strokeWidth="0.5" strokeDasharray="2,2" />
          <line x1="0" y1="33.3" x2="100" y2="33.3" stroke="rgba(255, 215, 0, 0.25)" strokeWidth="0.5" strokeDasharray="2,2" />
          <line x1="0" y1="66.6" x2="100" y2="66.6" stroke="rgba(255, 215, 0, 0.25)" strokeWidth="0.5" strokeDasharray="2,2" />
          
          {/* Lead lines tracing the shoulders */}
          <line x1="10" y1="90" x2="45" y2="80" stroke="#38bdf8" strokeWidth="0.75" />
          <line x1="90" y1="90" x2="55" y2="80" stroke="#38bdf8" strokeWidth="0.75" />
          
          {/* Diagonal dynamic lines meeting at eye level */}
          <line x1="0" y1="0" x2="42" y2="42" stroke="rgba(124, 138, 255, 0.3)" strokeWidth="0.5" />
          <line x1="100" y1="0" x2="58" y2="42" stroke="rgba(124, 138, 255, 0.3)" strokeWidth="0.5" />
          
          {/* Golden Focal Point circles around eyes */}
          <circle cx="42" cy="42" r="6" fill="none" stroke="#ffe58f" strokeWidth="0.75" className="animate-ping" style={{ animationDuration: '3s' }} />
          <circle cx="42" cy="42" r="3.5" fill="none" stroke="#ffe58f" strokeWidth="0.75" />
          <circle cx="58" cy="42" r="3.5" fill="none" stroke="#ffe58f" strokeWidth="0.75" />
          
          {/* Labels */}
          <text x="42" y="35" fill="#ffe58f" fontSize="3" fontFamily="monospace" textAnchor="middle">FOCUS EYE (PRIMARY)</text>
          <text x="50" y="74" fill="#38bdf8" fontSize="3" fontFamily="monospace" textAnchor="middle">SKELETAL SHOULDER LINE</text>
        </svg>
      )
    },
    dunes: {
      id: 'dunes',
      title: 'Đường cong Cồn cát Hoàng hôn',
      subtitle: 'Đường dẫn hướng S-Curve & Phối cảnh lớp',
      desc: 'Bố cục đường cong mềm mại kết hợp phối cảnh xếp chồng tạo cảm giác không gian sa mạc rộng lớn vô tận.',
      bgGradient: 'linear-gradient(to top, #3b0764 0%, #701a75 35%, #be185d 70%, #f43f5e 100%)',
      
      // Subject: sharp golden sand dune ridge curves
      subjectContent: (
        <div className="absolute inset-0 pointer-events-none">
          {/* Sun setting */}
          <div className="absolute top-[40%] left-[60%] w-16 h-16 rounded-full bg-amber-200/90 blur-[2px] shadow-[0_0_20px_rgba(253,224,71,0.5)]" />
          
          {/* Midground sand ridge silhouette */}
          <svg className="absolute bottom-0 w-full h-[65%] text-[#9d174d]" viewBox="0 0 100 100" preserveAspectRatio="none" fill="currentColor">
            <path d="M0 70 Q 30 40, 60 65 T 100 45 L 100 100 L 0 100 Z" />
            {/* Glowing ridge highlight */}
            <path d="M0 70 Q 30 40, 60 65 T 100 45" fill="none" stroke="#ffe58f" strokeWidth="1.2" className="opacity-80" />
          </svg>
        </div>
      ),
      
      // Foreground: deep dark silhouetted grass blades and foreground dune crest
      foregroundContent: (
        <div className="absolute inset-0 pointer-events-none">
          {/* Closest dune crest */}
          <svg className="absolute bottom-0 w-full h-[35%] text-[#4c0519]" viewBox="0 0 100 100" preserveAspectRatio="none" fill="currentColor">
            <path d="M0 85 Q 40 65, 100 90 L 100 100 L 0 100 Z" />
            <path d="M0 85 Q 40 65, 100 90" fill="none" stroke="#fda4af" strokeWidth="1" className="opacity-70" />
          </svg>
          
          {/* Silhouetted blades of grass */}
          <div className="absolute bottom-0 left-[15%] w-24 h-24 overflow-hidden opacity-80">
            <svg className="w-full h-full text-black" viewBox="0 0 10 10" fill="currentColor">
              <path d="M1 10 Q 1 7, 3 4 Q 2 7, 2 10 Z" />
              <path d="M3 10 Q 4 5, 6 2 Q 4.5 6, 4 10 Z" />
              <path d="M5 10 Q 5 6, 7 5 Q 5.5 8, 5.5 10 Z" />
              <path d="M7 10 Q 8 6, 9.5 5.5 Q 8.5 8, 8 10 Z" />
            </svg>
          </div>
        </div>
      ),

      // Vector elements: S-curve path tracing the ridge line, grid thirds
      vectorSvg: (
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Rule of thirds */}
          <line x1="33.3" y1="0" x2="33.3" y2="100" stroke="rgba(255, 215, 0, 0.2)" strokeWidth="0.5" strokeDasharray="3,3" />
          <line x1="66.6" y1="0" x2="66.6" y2="100" stroke="rgba(255, 215, 0, 0.2)" strokeWidth="0.5" strokeDasharray="3,3" />
          <line x1="0" y1="33.3" x2="100" y2="33.3" stroke="rgba(255, 215, 0, 0.2)" strokeWidth="0.5" strokeDasharray="3,3" />
          <line x1="0" y1="66.6" x2="100" y2="66.6" stroke="rgba(255, 215, 0, 0.2)" strokeWidth="0.5" strokeDasharray="3,3" />
          
          {/* Trace S-Curve along the dune ridge */}
          <path
            d="M 0 70 Q 30 40, 60 65 T 100 45"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="1.5"
            strokeDasharray="1,1"
            className="animate-pulse"
          />
          
          {/* Vector curves for flow direction */}
          <path d="M 15 80 Q 25 75, 30 71" fill="none" stroke="#22c55e" strokeWidth="0.75" />
          <path d="M 75 75 Q 85 65, 90 55" fill="none" stroke="#22c55e" strokeWidth="0.75" />
          
          {/* Sun intersection markers */}
          <line x1="60" y1="0" x2="60" y2="100" stroke="#fda4af" strokeWidth="0.4" strokeDasharray="1,5" />
          <line x1="0" y1="48" x2="100" y2="48" stroke="#fda4af" strokeWidth="0.4" strokeDasharray="1,5" />
          <circle cx="60" cy="48" r="4" fill="none" stroke="#ffe58f" strokeWidth="0.75" />
          
          {/* Labels */}
          <text x="25" y="47" fill="#38bdf8" fontSize="3" fontFamily="monospace">LEADING S-CURVE RIDGE</text>
          <text x="66" y="52" fill="#ffe58f" fontSize="3" fontFamily="monospace">GOLDEN RATIO SUNLIGHT</text>
        </svg>
      )
    }
  };

  const currentPreset = presets[presetId];

  // Reset view rotation when changing modes
  useEffect(() => {
    if (viewMode !== 'layers') {
      setRotateX(0);
      setRotateY(0);
    } else {
      setRotateX(12);
      setRotateY(-12);
    }
  }, [viewMode]);

  return (
    <div className="my-8 p-5 rounded-2xl bg-white/[0.01] border border-white/[0.06] backdrop-blur-md flex flex-col gap-6 shadow-xl">
      
      {/* Title & Presets Switcher Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/[0.05] pb-4">
        <div>
          <span className="text-[10px] font-mono text-[#c9a84c] tracking-widest uppercase flex items-center gap-1 mb-1">
            <Sparkles size={11} className="animate-spin-slow" /> Creative Director Sandbox
          </span>
          <h3 className="text-base font-serif text-slate-100 flex items-center gap-2">
            Lab Phân Rã Thị Giác
            <span className="text-[9px] font-mono text-[#5a5a72] bg-white/[0.04] border border-white/[0.08] px-2 py-0.5 rounded uppercase">
              Interact 3D
            </span>
          </h3>
        </div>
        
        {/* Preset switch tabs */}
        <div className="flex gap-1.5 bg-black/45 p-1 rounded-lg border border-white/5 w-full sm:w-auto">
          {Object.values(presets).map((p) => (
            <button
              key={p.id}
              onClick={() => setPresetId(p.id)}
              className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${presetId === p.id ? 'bg-[#c9a84c] text-black font-bold shadow-md' : 'text-[#9d9db5] hover:text-white'}`}
            >
              {p.title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Sandbox Layout: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Left Column: Interactive 3D Canvas (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col items-center">
          
          {/* Main 3D Canvas Screen */}
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative w-full aspect-video rounded-xl bg-[#030305] border border-white/[0.06] overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing group"
            style={{
              perspective: '1000px',
            }}
          >
            {/* Visual Guides overlay when layers mode is active */}
            {viewMode === 'layers' && (
              <div className="absolute top-3 left-3 z-30 pointer-events-none flex flex-col gap-1">
                <span className="text-[8px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded uppercase tracking-wider flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Di chuột để xoay 3D Parallax
                </span>
              </div>
            )}

            {/* View Mode Indicator (Right side) */}
            <div className="absolute top-3 right-3 z-30 pointer-events-none text-[8px] font-mono text-[#5a5a72] bg-black/60 border border-white/5 px-2 py-0.5 rounded">
              CHẾ ĐỘ: {viewMode.toUpperCase()}
            </div>

            {/* 3D Transform Wrapper Container */}
            <motion.div
              style={{
                width: '85%',
                height: '85%',
                transformStyle: 'preserve-3d',
                rotateX: rotateX,
                rotateY: rotateY,
              }}
              className="relative transition-transform duration-100 ease-out"
              animate={!isHovering && viewMode === 'layers' ? {
                rotateX: [12, 12, 8, 12],
                rotateY: [-12, -8, -12, -12],
              } : {}}
              transition={!isHovering && viewMode === 'layers' ? {
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              } : {}}
            >
              
              {/* --- LAYER 1: BACKGROUND LAYER --- */}
              <div
                style={{
                  background: currentPreset.bgGradient,
                  transform: `translateZ(${-layerSpread}px)`,
                  zIndex: 1,
                  transformStyle: 'preserve-3d',
                  boxShadow: viewMode === 'layers' ? '0 10px 30px rgba(0,0,0,0.6)' : 'none',
                }}
                className={`absolute inset-0 rounded-lg overflow-hidden transition-all duration-500 border ${viewMode === 'layers' ? 'border-[#38bdf8]/15 bg-black/10' : 'border-transparent'}`}
              >
                {/* Background lighting flare or sky circle */}
                <div className="absolute inset-0 bg-radial-gradient from-white/10 to-transparent pointer-events-none" />
                
                {/* Depth layer tag */}
                {viewMode === 'layers' && (
                  <span className="absolute top-2 left-2 text-[7px] font-mono text-[#38bdf8] bg-black/60 border border-[#38bdf8]/20 px-1 rounded select-none pointer-events-none uppercase">
                    HẬU CẢNH (Z = {-layerSpread}px)
                  </span>
                )}
              </div>

              {/* --- LAYER 2: SUBJECT/MIDGROUND LAYER --- */}
              <div
                style={{
                  transform: `translateZ(0px)`,
                  zIndex: 2,
                  transformStyle: 'preserve-3d',
                }}
                className={`absolute inset-0 rounded-lg transition-all duration-500 pointer-events-none ${viewMode === 'layers' ? 'border border-[#ffe58f]/15 shadow-[0_15px_35px_rgba(0,0,0,0.5)]' : ''}`}
              >
                {/* Preset subject content */}
                <div className="opacity-100">
                  {currentPreset.subjectContent}
                </div>

                {/* Depth layer tag */}
                {viewMode === 'layers' && (
                  <span className="absolute top-2 left-2 text-[7px] font-mono text-[#ffe58f] bg-black/60 border border-[#ffe58f]/20 px-1 rounded select-none pointer-events-none uppercase">
                    CHỦ THỂ CHÍNH (Z = 0px)
                  </span>
                )}
              </div>

              {/* --- LAYER 3: FOREGROUND LAYER --- */}
              <div
                style={{
                  transform: `translateZ(${layerSpread}px)`,
                  zIndex: 3,
                  transformStyle: 'preserve-3d',
                }}
                className={`absolute inset-0 rounded-lg transition-all duration-500 pointer-events-none ${viewMode === 'layers' ? 'border border-emerald-500/10 shadow-[0_20px_45px_rgba(0,0,0,0.4)]' : ''}`}
              >
                {/* Preset foreground content */}
                {currentPreset.foregroundContent}

                {/* Depth layer tag */}
                {viewMode === 'layers' && (
                  <span className="absolute top-2 left-2 text-[7px] font-mono text-emerald-400 bg-black/60 border border-emerald-500/20 px-1 rounded select-none pointer-events-none uppercase">
                    TIỀN CẢNH (Z = {layerSpread}px)
                  </span>
                )}
              </div>

              {/* --- SVG VECTOR OVERLAYS --- */}
              {viewMode === 'vector' && (
                <div 
                  style={{ zIndex: 10, transform: 'translateZ(10px)' }}
                  className="absolute inset-0 rounded-lg overflow-hidden pointer-events-none"
                >
                  {currentPreset.vectorSvg}
                </div>
              )}

            </motion.div>
          </div>
        </div>
        
        {/* Right Column: Information & Interactive Controls (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          
          {/* Preset Description Card */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c]" />
              {currentPreset.title}
            </h4>
            <span className="text-[10px] font-mono text-slate-400 block mb-2">{currentPreset.subtitle}</span>
            <p className="text-xs text-[#9d9db5] leading-relaxed mb-0">
              {currentPreset.desc}
            </p>
          </div>

          {/* Mode Switcher Buttons */}
          <div className="flex flex-col gap-2">
            <span className="text-[9px] font-mono text-[#5a5a72] uppercase tracking-widest pl-0.5">CHỌN PHƯƠNG THỨC PHÂN TÍCH:</span>
            <div className="grid grid-cols-3 gap-2 bg-black/30 p-1 rounded-xl border border-white/5">
              <button
                type="button"
                onClick={() => setViewMode('original')}
                className={`py-2 rounded-lg text-[10px] font-mono font-bold cursor-pointer transition-colors flex flex-col items-center gap-1 ${viewMode === 'original' ? 'bg-white/5 border border-white/10 text-white' : 'text-[#5a5a72] hover:text-slate-300'}`}
              >
                <Eye size={12} />
                <span>BẢN GỐC</span>
              </button>
              
              <button
                type="button"
                onClick={() => setViewMode('vector')}
                className={`py-2 rounded-lg text-[10px] font-mono font-bold cursor-pointer transition-colors flex flex-col items-center gap-1 ${viewMode === 'vector' ? 'bg-amber-500/10 border border-amber-500/20 text-[#ffe58f]' : 'text-[#5a5a72] hover:text-slate-300'}`}
              >
                <Grid size={12} />
                <span>VECTORS</span>
              </button>
              
              <button
                type="button"
                onClick={() => setViewMode('layers')}
                className={`py-2 rounded-lg text-[10px] font-mono font-bold cursor-pointer transition-colors flex flex-col items-center gap-1 ${viewMode === 'layers' ? 'bg-[#38bdf8]/10 border border-[#38bdf8]/20 text-[#38bdf8]' : 'text-[#5a5a72] hover:text-slate-300'}`}
              >
                <Layers size={12} />
                <span>LỚP 3D (DE DOF)</span>
              </button>
            </div>
          </div>

          {/* Depth Exploder Slider - only visible in layers mode */}
          <AnimatePresence>
            {viewMode === 'layers' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="flex flex-col gap-2 overflow-hidden border-t border-white/[0.04] pt-4"
              >
                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span className="text-[#38bdf8] uppercase tracking-wider">ĐỘ GIÃN TRỤC Z (EXPLOSION):</span>
                  <span className="text-slate-200 font-bold">{layerSpread}px</span>
                </div>
                
                <input
                  type="range"
                  min="0"
                  max="120"
                  value={layerSpread}
                  onChange={(e) => setLayerSpread(Number(e.target.value))}
                  className="w-full h-1.5 rounded-lg bg-black/50 appearance-none cursor-pointer accent-[#38bdf8] border border-white/5"
                />
                
                <div className="flex justify-between text-[8px] font-mono text-[#5a5a72] mt-1">
                  <span>PHẲNG (2D)</span>
                  <span>TÁCH LỚP GẦN KHÍT</span>
                  <span>SAO BĂNG (3D RỜI)</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Deconstruction theory info */}
          <div className="p-3 rounded-lg bg-black/20 border border-white/[0.03] text-[10px] leading-relaxed text-[#5a5a72]">
            <span className="font-semibold text-slate-400 block mb-1">💡 GIÁM ĐỐC SÁNG TẠO ĐÁNH GIÁ:</span>
            {viewMode === 'original' && 'Chế độ xem thông thường. Toàn bộ các lớp tiền cảnh, chủ thể, hậu cảnh chồng khít tạo ảo giác 2D phẳng hoàn thiện.'}
            {viewMode === 'vector' && 'Lưới vàng neon hiển thị điểm giao thoa bố cục. Hãy chú ý cách mắt nhân vật hoặc mặt trời hoàng hôn được đặt chuẩn xác tại các điểm giao nhau 1/3 (Focal Points) và các đường chéo dẫn hướng.'}
            {viewMode === 'layers' && 'Khi kéo thanh trượt, bạn phân rã chiều sâu quang học. Lớp tiền cảnh (bokeh/cỏ) trượt nhanh nhất, lớp chủ thể đứng yên, lớp hậu cảnh lùi sâu. Parallax giúp não bộ cảm nhận khoảng cách thật.'}
          </div>

        </div>
      </div>
    </div>
  );
}

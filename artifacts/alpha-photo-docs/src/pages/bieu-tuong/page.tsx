import { useEffect, useState } from 'react';
import { LessonVideoPlayer } from '@/components/lesson-video-player';
import { lessonVideos } from '@/lib/video-config';
import { Link } from 'wouter';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  BookOpen01Icon,
  CheckIcon,
  CircleIcon,
  FocusIcon,
  AiScanIcon,
  SparklesIcon,
  LayerIcon,
  EyeIcon,
  Compass01Icon,
  ColorsIcon,
  Maximize01Icon,
  AlertCircleIcon,
  File01Icon,
  ReloadIcon,
} from '@hugeicons/core-free-icons';
import { motion, AnimatePresence } from 'framer-motion';
import DocsLayout from '@/components/docs-layout';

// TOC Navigation Sections
const tocSections = [
  { id: 'premise', label: 'Hình ảnh không trung lập', level: 1 },
  { id: 'barthes-analyzer', label: 'Phân tích ba tầng nghĩa', level: 1 },
  { id: 'color-board', label: 'Mã màu tương phản Đông-Tây', level: 1 },
  { id: 'gaze-ethics', label: 'Đạo đức của cái nhìn', level: 1 },
  { id: 'fieldwork', label: 'Nhật ký bài tập điền dã', level: 1 },
];

// Meaning layers (Studium, Punctum, Myth)
const meaningLayers = [
  {
    id: 'studium',
    name: 'Studium (Bối cảnh)',
    vietnamese: 'Điều ta cùng hiểu',
    copy: 'Studium là bối cảnh chung của bức ảnh - các thông tin xã hội, văn hóa hay lịch sử mà phần lớn người xem trong cùng một cộng đồng có thể dễ dàng nhận biết.',
    analysis: 'Trong ảnh, bối cảnh đền thờ uy nghiêm và trang phục truyền thống của chủ thể biểu đạt tính tâm linh và cội nguồn sâu sắc mà ai cũng hiểu.',
    overlayType: 'studium'
  },
  {
    id: 'punctum',
    name: 'Punctum (Điểm chạm)',
    vietnamese: 'Điều chạm vào riêng ta',
    copy: 'Punctum là một chi tiết nhỏ bất ngờ đâm xuyên qua lý trí, bỏ qua tính chung của bối cảnh để đánh thức ký ức cá nhân và làm rung động trái tim người xem.',
    analysis: 'Một chi tiết nhỏ như chiếc nhẫn bạc lấp lánh trên ngón tay thô ráp xù xì bỗng thu hút toàn bộ sự chú ý, tạo liên tưởng đến cuộc sống lao động ấm áp.',
    overlayType: 'punctum'
  },
  {
    id: 'myth',
    name: 'Myth (Huyền thoại)',
    vietnamese: 'Điều xã hội hóa tự nhiên',
    copy: 'Myth là các kiến tạo tư tưởng xã hội (về giới, quyền lực, cái đẹp) được lặp đi lặp lại đủ lâu thông qua hình ảnh để người xem coi đó là lẽ tự nhiên.',
    analysis: 'Ánh sáng mờ ảo điêu khắc chủ thể như một người giữ gìn linh hồn xưa cũ, củng cố huyền thoại về sự thần bí và thanh khiết của văn hóa phương Đông.',
    overlayType: 'myth'
  }
];

// Color codes comparing East and West
const colorCodes = [
  {
    id: 'red',
    color: 'Màu Đỏ',
    west: 'Ham muốn · Cảnh báo · Sự kịch tính',
    east: 'Hỷ sự · Vận may · Sự linh thiêng',
    tone: '#a94338',
    description: 'Tại phương Tây, màu đỏ kích hoạt trạng thái báo động hoặc ham muốn mãnh liệt. Ngược lại, tại Đông Á, đỏ là sắc màu của may mắn, hỷ sự và xua đuổi tà ma.'
  },
  {
    id: 'white',
    color: 'Màu Trắng',
    west: 'Tinh khiết · Hòa bình · Khởi đầu mới',
    east: 'Tang lễ · Tiễn biệt · Sự trống rỗng / Vô ngã',
    tone: '#ddd5c6',
    description: 'Nếu áo cưới phương Tây dùng màu trắng biểu thị sự tinh khôi, thì văn hóa Đông phương truyền thống dùng sắc trắng thô cho tang lễ, biểu thị sự tiễn biệt và vô ngã.'
  },
  {
    id: 'gold',
    color: 'Màu Vàng',
    west: 'Giá trị · Chiến thắng · Sự phản bội / Hèn nhát',
    east: 'Hoàng quyền · Linh thiêng · Sự thịnh vượng',
    tone: '#b98a3e',
    description: 'Vàng tại phương Tây có lúc gắn với sự phản bội (Judas). Tại phương Đông, vàng là đặc quyền của hoàng gia, biểu thị cho sự linh thiêng tối cao (Phật giáo) và thịnh vượng.'
  },
  {
    id: 'green',
    color: 'Màu Xanh Lục',
    west: 'Tự nhiên · Tăng trưởng · Sự ghen tị (Green with envy)',
    east: 'Sự sống · Thiên đường · Hòa bình / Thanh thản',
    tone: '#3d6757',
    description: 'Xanh lục phương Tây đôi khi biểu thị lòng ghen tị hoặc tiền tài. Ở Đông Á, đây là sắc ngọc bích biểu thị sự vĩnh hằng, hòa bình và dòng chảy sinh mệnh không ngừng.'
  }
];

// Ethical gaze traps
const gazeEthicsTraps = [
  {
    id: 'exotic',
    title: 'Exoticization (Cảnh lạ mắt hóa)',
    trap: 'Biến một cộng đồng hoặc văn hóa thành vật trang trí lạ mắt cho ống kính người ngoài, chỉ nhấn mạnh sự khác biệt kỳ quặc để kích thích sự tò mò.',
    antidote: 'Tìm kiếm những điểm tương đồng nhân bản. Tránh chụp chủ thể như một đối tượng triển lãm mà hãy đặt họ trong bối cảnh đời sống sinh hoạt tự nhiên của họ.'
  },
  {
    id: 'single',
    title: 'Single Story (Câu chuyện phiến diện)',
    trap: 'Chỉ sử dụng một khuôn hình hoặc khuôn mẫu dễ nhớ để đại diện cho toàn bộ đời sống phức tạp, phong phú của một con người hoặc một sắc dân.',
    antidote: 'Chụp đa dạng góc nhìn, lột tả nhiều trạng thái cảm xúc khác nhau: lao động, nghỉ ngơi, niềm vui lẫn nỗi buồn để bức chân dung có chiều sâu phức hợp.'
  },
  {
    id: 'savior',
    title: 'Savior Framing (Định khung cứu thế)',
    trap: 'Đặt camera hoặc nhân vật bên ngoài vào vị trí chủ động, hùng mạnh, trong khi chủ thể bản địa chỉ tồn tại như những người thụ động chờ được cứu giúp.',
    antidote: 'Trao quyền lực cho chủ thể thông qua góc máy ngang tầm mắt hoặc từ dưới lên nhẹ, ghi nhận sự tự chủ và nội lực tự thân của họ thay vì sự thương hại.'
  }
];

const symbolExamples: Record<string, string> = {
  'Nước (Water)': 'Chụp biểu tượng Nước: 1. Nước nhỏ giọt từ vòi cũ (sự lãng phí); 2. Ly nước đá tan chảy trên bàn gỗ (sự chờ đợi); 3. Cơn mưa xối xả qua cửa kính ô tô (sự cô đơn); 4. Sóng vỗ vào vách đá (nội lực); 5. Vũng nước phản chiếu bóng người đi qua (sự vô thường).',
  'Bàn tay (Hand)': 'Chụp biểu tượng Bàn tay: 1. Bàn tay thô ráp của người cha nắm bàn tay nhỏ xíu của con (sự bảo bọc); 2. Hai bàn tay đan vào nhau trong bóng tối (sự kết nối); 3. Bàn tay lấm lem bùn đất đang nâng niu mầm cây (sự sống/lao động); 4. Bàn tay buông thõng từ mép giường (sự mệt mỏi/bất lực); 5. Bàn tay áp chặt vào tấm kính phủ sương mờ (sự ngăn cách).',
  'Bóng tối (Shadow)': 'Chụp biểu tượng Bóng tối: 1. Bóng người kéo dài trên con đường vắng lúc hoàng hôn (nỗi cô đơn); 2. Nửa khuôn mặt chìm hoàn toàn trong bóng tối (bí ẩn/nhân cách ẩn giấu); 3. Bóng chiếc lá in trên vách tường trắng (sự tĩnh lặng/thiền); 4. Góc tối sau cánh cửa hé mở (sự sợ hãi/rình rập); 5. Điểm bóng râm mát dưới tán cây lớn giữa trưa nắng (sự trú ẩn/bình yên).',
  'Vòng tròn (Circle)': 'Chụp biểu tượng Vòng tròn: 1. Chiếc nhẫn cưới đặt trên trang sách cũ (sự gắn kết vĩnh cửu); 2. Gợn sóng tròn đồng tâm loang ra trên mặt hồ tĩnh lặng (sự tác động/lan tỏa); 3. Lỗ ngắm tròn của ống kính máy ảnh (góc nhìn/cái nhìn); 4. Vòng bánh xe quay tròn tốc độ cao bị nhòe (dòng chảy thời gian); 5. Đốm nắng tròn lọt qua kẽ lá (sự may mắn/điểm sáng).',
  'Ánh sáng (Light)': 'Chụp biểu tượng Ánh sáng: 1. Vệt nắng xiên qua khe cửa chiếu vào căn phòng tối (hy vọng); 2. Ánh đèn dầu leo lét trong đêm mưa (sự mong manh/kiên trì); 3. Ánh sáng chói lòa từ ngọn hải đăng quét qua biển cả (sự dẫn lối); 4. Ánh sáng từ màn hình điện thoại soi rõ khuôn mặt buồn (sự cô lập thời công nghệ); 5. Vệt nắng rực rỡ lúc bình minh trên đỉnh núi (sự khởi đầu/chân lý).'
};

export default function BieuTuongPage() {
  const [isRead, setIsRead] = useState(false);
  
  // 1. Semiotics Analyzer states
  const [activeLayer, setActiveLayer] = useState(meaningLayers[0]);

  // 2. Color Ledger states
  const [selectedColor, setSelectedColor] = useState(colorCodes[0]);

  // 3. Ethics states
  const [activeTrap, setActiveTrap] = useState(gazeEthicsTraps[0]);

  // 4. Fieldwork Notebook states
  const [notebookBrief, setNotebookBrief] = useState({
    symbol: 'Nước (Water)',
    notes: 'Chụp biểu tượng Nước: 1. Nước nhỏ giọt từ vòi cũ (sự lãng phí); 2. Ly nước đá tan chảy trên bàn gỗ (sự chờ đợi); 3. Cơn mưa xối xả qua cửa kính ô tô (sự cô đơn); 4. Sóng vỗ vào vách đá (nội lực); 5. Vũng nước phản chiếu bóng người đi qua (sự vô thường).',
  });
  const [notebookSaved, setNotebookSaved] = useState(true);

  useEffect(() => {
    try {
      const readPages: string[] = JSON.parse(localStorage.getItem('alpha-doc-read') || '[]');
      setIsRead(readPages.includes('/bieu-tuong'));
    } catch {}
  }, []);

  const toggleRead = () => {
    try {
      const readPages: string[] = JSON.parse(localStorage.getItem('alpha-doc-read') || '[]');
      const updated = isRead
        ? readPages.filter((page) => page !== '/bieu-tuong')
        : Array.from(new Set([...readPages, '/bieu-tuong']));
      localStorage.setItem('alpha-doc-read', JSON.stringify(updated));
      setIsRead(!isRead);
    } catch {}
  };

  const handleSaveNotebook = (e: React.FormEvent) => {
    e.preventDefault();
    if (notebookBrief.notes.trim()) {
      setNotebookSaved(true);
    }
  };

  return (
    <DocsLayout tocSections={tocSections}>
      <article className="min-h-screen text-[#e4e4ed] bg-[#050508] relative font-sans leading-relaxed selection:bg-[#a94338]/30 selection:text-white">
        
        {/* Ambient Dark-Red Glows representing Symbolism theme */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] rounded-full bg-[#a94338]/5 blur-[130px] mix-blend-screen" />
          <div className="absolute top-[35%] right-[10%] w-[450px] h-[450px] rounded-full bg-[#b98a3e]/3 blur-[140px] mix-blend-screen" />
          <div className="absolute bottom-[15%] left-[20%] w-[380px] h-[380px] rounded-full bg-stone-700/5 blur-[120px] mix-blend-screen" />
        </div>

        {/* HERO SECTION */}
        <header className="relative w-full border-b border-white/[0.06] overflow-hidden pt-12 md:pt-16 pb-20 px-6 lg:px-12">
          {/* Background Image Wash */}
          <div className="absolute inset-0 z-0 opacity-35 filter grayscale contrast-125 saturate-50 pointer-events-none">
            <img
              src="/hero-bieu-tuong.png"
              alt="Cultural Symbolism Background"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/85 to-[#050508]" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left text */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <div className="flex items-center gap-2 mb-4 bg-[#a94338]/10 border border-[#a94338]/20 px-3 py-1 rounded-full text-xs font-mono text-[#a94338]">
                <HugeiconsIcon icon={SparklesIcon} size={13} className="animate-pulse" />
                <span>BÀI 03 · NGÔN NGỮ THỊ GIÁC</span>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif tracking-tight leading-none mb-6">
                Biểu tượng
                <em className="block text-[#d59a54] font-serif font-light italic mt-2 ml-12 md:ml-20">văn hóa</em>
              </h1>

              <p className="text-base md:text-lg text-[#9d9db5] max-w-xl leading-relaxed mb-8">
                Một hình ảnh không bao giờ mang một lớp nghĩa duy nhất. Nó hoạt động như một tấm gương phản chiếu lịch sử, ký ức và vị thế xã hội của người đang nhìn.
              </p>

              <div className="flex items-center gap-6 text-xs text-[#5a5a72] font-mono border-t border-white/[0.08] pt-6 w-full max-w-md">
                <span className="flex items-center gap-1.5">
                  <HugeiconsIcon icon={AiScanIcon} size={13} />
                  VISUAL SEMIOTICS
                </span>
                <span>•</span>
                <span>18 PHÚT ĐỌC</span>
                {isRead && (
                  <>
                    <span>•</span>
                    <span className="text-[#5ce0a0] flex items-center gap-1">
                      <HugeiconsIcon icon={CheckIcon} size={13} />
                      ĐÃ ĐỌC XONG
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Right glass card showcasing symbolism */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[400px] aspect-square p-3 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl shadow-2xl">
                <div className="relative w-full h-full rounded-xl overflow-hidden group">
                  <img
                    src="/hero-bieu-tuong.png"
                    alt="Cultural symbols"
                    className="w-full h-full object-cover filter saturate-50 contrast-115 brightness-90 group-hover:scale-105 transition-transform duration-[1200ms]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
                  
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-[10px] font-mono text-white/50 tracking-wider pointer-events-none">
                    <span>SYMBOLIC PLATE 03</span>
                    <span className="text-[#a94338]">SEMIOTICS</span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
                    <span className="text-[10px] font-mono text-[#d59a54]">BÀI TẬP ĐỌC ẢNH</span>
                    <h3 className="text-base font-serif text-white font-medium mt-1">Con mắt quan sát</h3>
                    <p className="text-[11px] text-[#9d9db5] mt-1 line-clamp-2">Học cách tách biệt thông tin thuần túy ra khỏi các ẩn dụ văn hóa sâu xa được ẩn giấu trong khung hình.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </header>

        {/* Video bài học */}
        <div className="max-w-7xl mx-auto px-6 pt-12">
          <LessonVideoPlayer video={lessonVideos['/bieu-tuong']} />
        </div>

        {/* SECTION I: PREMISE */}
        <section id="premise" className="max-w-7xl mx-auto px-6 py-20 border-b border-white/[0.06]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4">
              <span className="text-xs font-mono text-[#5a5a72] uppercase tracking-widest block mb-2">01 / Tiền đề ký hiệu</span>
              <h2 className="text-3xl font-serif text-white leading-tight">Hình ảnh không trung lập</h2>
            </div>
            
            <div className="lg:col-span-8 flex flex-col gap-6">
              <div className="relative p-8 rounded-2xl bg-white/[0.01] border border-white/[0.04] backdrop-blur-sm">
                <span className="absolute -top-6 left-6 text-7xl font-serif text-[#a94338]/20 select-none">“</span>
                <blockquote className="text-xl md:text-2xl font-serif text-[#f0e6d2] leading-relaxed italic relative z-10">
                  Một bức ảnh không nói lên ngàn lời. Nó nói những lời khác biệt với những người đã sống những cuộc đời hoàn toàn khác biệt.
                </blockquote>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-[#9d9db5] leading-relaxed mt-4">
                <p>
                  Đặt cùng một bức ảnh - ví dụ một người phụ nữ trong y phục màu đỏ sẫm đứng lặng im trước cổng một đền thờ cổ - trước ba người đến từ ba lục địa. Một người phương Tây nhìn thấy sự kịch tính của đức tin; một người Á Đông cảm nhận sự thành kính linh thiêng; một nhà nhân chủng học nhìn ra cấu trúc quyền lực giai cấp. 
                </p>
                <p>
                  Nhiếp ảnh gia chuyên nghiệp không chỉ chịu trách nhiệm với ánh sáng hay độ nét của ống kính. Họ chịu trách nhiệm trực tiếp với **hệ thống ý nghĩa biểu tượng** được kích hoạt khi bức ảnh đi vào thế giới thực.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION II: BARTHES SEMIOTIC ANALYZER */}
        <section id="barthes-analyzer" className="max-w-7xl mx-auto px-6 py-20 border-b border-white/[0.06]">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono text-[#7c8aff] uppercase tracking-widest block mb-2">02 / Ký hiệu học Barthes</span>
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">Trình phân tích Ba tầng nghĩa</h2>
            <p className="text-sm text-[#9d9db5]">
              Theo triết gia Roland Barthes, người xem tiếp nhận hình ảnh qua ba tầng nhận thức xếp chồng lên nhau. Hãy chọn từng tầng bên dưới để xem phân tích trực quan.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left: Semiotic Visual Screen */}
            <div className="lg:col-span-7 flex flex-col justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md min-h-[460px]">
              
              {/* Image with dynamic overlays */}
              <div className="relative w-full flex-grow rounded-xl overflow-hidden bg-black/40 flex items-center justify-center">
                <img
                  src="/hero-muc-dich.png"
                  alt="Barthes Semiotics Illustration"
                  className={`w-full h-full object-cover transition-all duration-700 ${
                    activeLayer.id === 'punctum' ? 'brightness-50 saturate-50' : 
                    activeLayer.id === 'myth' ? 'contrast-115 grayscale' : ''
                  }`}
                />

                {/* Overlays */}
                <AnimatePresence mode="wait">
                  
                  {/* Studium Context Overlay */}
                  {activeLayer.id === 'studium' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 border-[6px] border-[#d59a54]/30 pointer-events-none"
                    >
                      <div className="absolute top-4 left-4 bg-[#d59a54] text-black text-[9px] font-mono font-semibold px-2 py-0.5 rounded tracking-widest uppercase">
                        STUDIUM FRAME
                      </div>
                    </motion.div>
                  )}

                  {/* Punctum Focal Circle Overlay */}
                  {activeLayer.id === 'punctum' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 pointer-events-none"
                    >
                      {/* Pulse target overlaying specific detail (the person looking) */}
                      <div className="absolute top-[48%] left-[45%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                        <span className="w-10 h-10 rounded-full border-2 border-[#a94338] animate-ping absolute" />
                        <span className="w-5 h-5 rounded-full bg-[#a94338] flex items-center justify-center">
                          <HugeiconsIcon icon={FocusIcon} size={12} className="text-white" />
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-4 bg-[#a94338] text-white text-[9px] font-mono px-2 py-0.5 rounded">
                        PUNCTUM (CHITIẾT CHI PHỐI CẢM XÚC)
                      </div>
                    </motion.div>
                  )}

                  {/* Myth Structural Grid Overlay */}
                  {activeLayer.id === 'myth' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-stone-900/10 pointer-events-none"
                    >
                      <svg className="w-full h-full absolute inset-0">
                        {/* Golden vectors highlighting social constructs */}
                        <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#d59a54" strokeWidth="1.5" strokeDasharray="5,5" />
                        <line x1="45%" y1="0" x2="45%" y2="100%" stroke="#d59a54" strokeWidth="1.5" strokeDasharray="5,5" />
                      </svg>
                      <div className="absolute top-4 right-4 bg-white/10 backdrop-blur text-white text-[8px] font-mono px-2 py-0.5 rounded border border-white/10">
                        MYTHOS SYSTEM (HỆ THƯỢNG TẦNG TƯ TƯỞNG)
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>

                {/* HUD Specs */}
                <div className="absolute top-4 left-4 flex items-center gap-1 bg-black/80 px-2 py-0.5 rounded text-[8px] font-mono text-white/50 border border-white/5">
                  <HugeiconsIcon icon={Maximize01Icon} size={9} className="text-white/50" /> HUD SE-03
                </div>
              </div>

              {/* Annotation Text */}
              <div className="mt-4 pt-4 border-t border-white/[0.06] px-2 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <span className="text-[10px] font-mono text-amber-500 uppercase tracking-widest">{activeLayer.vietnamese}</span>
                  <p className="text-xs text-[#9d9db5] max-w-xl mt-1">{activeLayer.analysis}</p>
                </div>
                <span className="text-2xl font-serif text-white/20 font-light italic shrink-0">
                  {activeLayer.name.split(' ')[0]}
                </span>
              </div>

            </div>

            {/* Right: Layer Selectors */}
            <div className="lg:col-span-5 flex flex-col gap-3 justify-between">
              {meaningLayers.map((layer) => {
                const isActive = layer.id === activeLayer.id;
                return (
                  <button
                    key={layer.id}
                    onClick={() => setActiveLayer(layer)}
                    className={`w-full p-4 rounded-xl text-left border transition-all duration-300 flex items-start gap-4 ${
                      isActive
                        ? 'bg-amber-500/[0.03] border-amber-500/40 shadow-sm'
                        : 'bg-white/[0.01] border-white/[0.04] hover:bg-white/[0.03] hover:border-white/10'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded bg-white/5 flex items-center justify-center shrink-0 ${isActive ? 'text-amber-400' : 'text-[#5a5a72]'}`}>
                      <HugeiconsIcon icon={LayerIcon} size={15} />
                    </div>
                    
                    <div className="flex-grow">
                      <div className="flex justify-between items-center">
                        <h4 className={`text-sm font-semibold transition-colors ${isActive ? 'text-amber-400' : 'text-slate-200'}`}>
                          {layer.name}
                        </h4>
                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />}
                      </div>
                      <span className="text-[10px] font-mono text-[#5a5a72] uppercase block mt-0.5">
                        {layer.vietnamese}
                      </span>
                      <p className="text-xs text-[#9d9db5] mt-2 line-clamp-2">
                        {layer.copy}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

          </div>
        </section>

        {/* SECTION III: INTERACTIVE CULTURAL COLOR LEDGER */}
        <section id="color-board" className="w-full bg-[#0a0a10] border-y border-white/[0.06] py-20 px-6">
          <div className="max-w-7xl mx-auto">
            
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-16">
              <div>
                <span className="text-xs font-mono text-[#a94338] uppercase tracking-widest block mb-2">03 / Mã văn hoá màu sắc</span>
                <h2 className="text-3xl md:text-4xl font-serif text-white">Một màu sắc · Nhiều Thế giới</h2>
              </div>
              <p className="text-sm text-[#9d9db5] max-w-md">
                Hậu kỳ màu không đơn thuần là thẩm mỹ. Mỗi sắc độ đều kích hoạt các phản ứng tâm lý và văn hóa trái ngược nhau giữa Đông và Tây. Nhấp chọn một màu để khám phá.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Color Swatches Grid */}
              <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                {colorCodes.map((item) => {
                  const isSelected = item.id === selectedColor.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSelectedColor(item)}
                      className={`p-6 rounded-xl border text-left transition-all duration-300 relative overflow-hidden group ${
                        isSelected
                          ? 'border-amber-500/50 bg-white/[0.02] shadow-md'
                          : 'border-white/[0.04] bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.02]'
                      }`}
                    >
                      {/* Color dot/glow */}
                      <div className="w-12 h-12 rounded-full mb-4 border border-white/10 relative flex items-center justify-center" style={{ backgroundColor: item.tone }}>
                        <div className="absolute inset-0 rounded-full blur-md opacity-40 group-hover:opacity-75 transition-opacity" style={{ backgroundColor: item.tone }} />
                      </div>
                      
                      <h4 className="text-sm font-semibold text-slate-200">{item.color}</h4>
                      <span className="text-[10px] font-mono text-[#5a5a72] block mt-0.5">CLICK TO ANALYZE</span>
                      
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-amber-500" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Comparison Panel */}
              <div className="lg:col-span-7 p-8 rounded-2xl bg-white/[0.01] border border-white/[0.04] backdrop-blur-md">
                
                {/* Active Swatch Header */}
                <div className="flex items-center gap-3 border-b border-white/[0.08] pb-6 mb-6">
                  <div className="w-8 h-8 rounded-full border border-white/20" style={{ backgroundColor: selectedColor.tone }} />
                  <div>
                    <h3 className="text-xl font-serif text-white font-medium">{selectedColor.color}</h3>
                    <span className="text-[10px] font-mono text-amber-500 uppercase tracking-widest">CULTURAL CONTRAST LEDGER</span>
                  </div>
                </div>

                {/* Cultural Comparison Split */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                  
                  {/* Western Interpretation */}
                  <div className="p-4 rounded-xl bg-black/30 border border-white/[0.03]">
                    <div className="flex items-center gap-1.5 text-xs font-mono text-white/50 mb-2 uppercase tracking-wide">
                      <HugeiconsIcon icon={Compass01Icon} size={12} className="text-white/40" />
                      <span>Phương Tây (West)</span>
                    </div>
                    <p className="text-sm text-[#f0e6d2] font-serif font-medium leading-relaxed">
                      {selectedColor.west}
                    </p>
                  </div>

                  {/* Eastern Interpretation */}
                  <div className="p-4 rounded-xl bg-[#d59a54]/5 border border-[#d59a54]/10">
                    <div className="flex items-center gap-1.5 text-xs font-mono text-amber-500/80 mb-2 uppercase tracking-wide">
                      <HugeiconsIcon icon={Compass01Icon} size={12} className="text-amber-500/40" />
                      <span>Đông Phương (East)</span>
                    </div>
                    <p className="text-sm text-[#f0e6d2] font-serif font-medium leading-relaxed">
                      {selectedColor.east}
                    </p>
                  </div>

                </div>

                {/* Description */}
                <p className="text-xs text-[#9d9db5] leading-relaxed bg-white/[0.02] border border-white/[0.04] p-4 rounded-lg">
                  {selectedColor.description}
                </p>

              </div>

            </div>

          </div>
        </section>

        {/* SECTION IV: ETHICS OF SEEING */}
        <section id="gaze-ethics" className="max-w-4xl mx-auto px-6 py-20 border-b border-white/[0.06]">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono text-[#a94338] uppercase tracking-widest block mb-2">04 / Đạo đức nhiếp ảnh</span>
            <h2 className="text-3xl font-serif text-white mb-4">Đạo đức của Cái nhìn (The Gaze)</h2>
            <p className="text-sm text-[#9d9db5]">
              Cái nhìn qua ống kính camera luôn đi kèm với một vị trí quyền lực bất đối xứng. Hãy rà soát 3 cạm bẫy định kiến dưới đây để biết cách tôn trọng chủ thể.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {gazeEthicsTraps.map((trap) => {
              const isActive = trap.id === activeTrap.id;
              return (
                <button
                  key={trap.id}
                  onClick={() => setActiveTrap(trap)}
                  className={`p-5 rounded-xl border text-left flex flex-col justify-between transition-all duration-300 ${
                    isActive
                      ? 'bg-red-500/[0.02] border-[#a94338]/40 shadow-sm'
                      : 'bg-white/[0.01] border-white/[0.04] hover:bg-white/[0.02] hover:border-white/10'
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <HugeiconsIcon
                        icon={AlertCircleIcon}
                        size={15}
                        className={isActive ? 'text-[#a94338]' : 'text-[#5a5a72]'}
                      />
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#a94338]" />}
                    </div>
                    <h4 className={`text-xs font-semibold uppercase tracking-wider ${isActive ? 'text-[#a94338]' : 'text-slate-200'}`}>
                      {trap.title.split(' ')[0]}
                    </h4>
                    <span className="text-[10px] text-[#5a5a72] font-mono block mt-0.5">
                      {trap.title.includes('(') ? `(${trap.title.split('(')[1]}` : ''}
                    </span>
                  </div>
                  
                  <span className="text-[10px] font-mono text-white/30 mt-4 block">SELECT TO DIAGNOSE</span>
                </button>
              );
            })}
          </div>

          {/* Ethics Diagnostic Panel */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md relative overflow-hidden">
            
            {/* Warning band print */}
            <div className="absolute top-0 right-0 transform translate-x-12 translate-y-3 rotate-45 border-y border-[#a94338]/30 px-10 py-0.5 bg-[#a94338]/10 text-[6px] font-mono text-[#a94338] tracking-widest text-center">
              GAZE DIAGNOSTIC
            </div>

            <div className="flex items-center gap-1.5 text-[9px] font-mono text-[#a94338] mb-4">
              <HugeiconsIcon icon={EyeIcon} size={11} className="text-[#a94338]" />
              <span>DIAGNOSTIC REPORT: {activeTrap.title.toUpperCase()}</span>
            </div>

            <div className="flex flex-col gap-6">
              <div>
                <span className="text-[10px] font-mono text-white/40 block uppercase">Cạm bẫy (The Trap)</span>
                <p className="text-xs text-[#f0e6d2] leading-relaxed mt-1">
                  {activeTrap.trap}
                </p>
              </div>

              <div className="border-t border-white/[0.06] pt-4">
                <span className="text-[10px] font-mono text-[#5ce0a0] block uppercase">Giải pháp khắc phục (The Antidote)</span>
                <p className="text-xs text-[#9d9db5] leading-relaxed mt-1">
                  {activeTrap.antidote}
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION V: FIELDWORK WORKSPACE NOTEBOOK */}
        <section id="fieldwork" className="max-w-4xl mx-auto px-6 py-20 border-b border-white/[0.06]">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono text-amber-500 uppercase tracking-widest block mb-2">05 / Bài tập thực địa</span>
            <h2 className="text-3xl font-serif text-white mb-4">Nhật ký Bài tập Điền dã</h2>
            <p className="text-sm text-[#9d9db5]">
              Thực hiện bài tập kiểm tra ranh giới văn hóa bằng cách chụp một biểu tượng phổ quát dưới 5 trạng thái cảm xúc. Hãy ghi chép kế hoạch thực địa của bạn.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            
            {/* Fieldwork notebook Form */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md">
              <h3 className="text-base font-serif text-slate-200 mb-6 flex items-center gap-2">
                <HugeiconsIcon icon={File01Icon} size={15} className="text-[#a94338]" />
                <span>Nhật ký thực địa</span>
              </h3>

              <form onSubmit={handleSaveNotebook} className="flex flex-col gap-4">
                
                {/* Symbol Select */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono text-[#9d9db5] uppercase">Chọn biểu tượng phổ quát</label>
                  <select
                    value={notebookBrief.symbol}
                    onChange={(e) => {
                      const selectedVal = e.target.value;
                      setNotebookBrief({
                        symbol: selectedVal,
                        notes: symbolExamples[selectedVal] || ''
                      });
                      setNotebookSaved(true);
                    }}
                    className="w-full px-4 py-2.5 rounded-lg bg-black/45 border border-white/10 text-xs text-slate-100 focus:outline-none focus:border-amber-500/50"
                  >
                    <option value="Nước (Water)">Nước (Nguồn sống · Sự thanh tẩy · Trôi chảy)</option>
                    <option value="Bàn tay (Hand)">Bàn tay (Lao động · Kết nối · Sự bảo bọc)</option>
                    <option value="Bóng tối (Shadow)">Bóng tối (Bí ẩn · Sự che giấu · Nỗi sợ)</option>
                    <option value="Vòng tròn (Circle)">Vòng tròn (Vĩnh cửu · Sự trọn vẹn · Trói buộc)</option>
                    <option value="Ánh sáng (Light)">Ánh sáng (Hy vọng · Sự thật · Khải huyền)</option>
                  </select>
                </div>

                {/* Field Notes Area */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono text-[#9d9db5] uppercase">Kế hoạch chụp & Phản hồi (Ý tưởng 5 tấm)</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Mô tả ý tưởng chụp của bạn (Ví dụ: Chụp bóng bàn tay in trên cát nóng, in trên kính mờ trời mưa...)"
                    value={notebookBrief.notes}
                    onChange={(e) => setNotebookBrief({ ...notebookBrief, notes: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-black/45 border border-white/10 text-xs text-slate-100 placeholder:text-white/20 focus:outline-none focus:border-amber-500/50 resize-none font-sans"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!notebookBrief.notes.trim()}
                  className="w-full mt-2 py-3 rounded-lg bg-[#a94338] hover:bg-red-700 disabled:bg-white/10 disabled:text-white/20 text-white font-semibold text-xs transition-all shadow-md cursor-pointer disabled:cursor-not-allowed border-none"
                >
                  Lưu Nhật ký Điền dã
                </button>

              </form>
            </div>

            {/* Fieldwork notebook preview */}
            <div className="relative h-full min-h-[320px] rounded-2xl border border-dashed border-white/10 bg-white/[0.01] flex flex-col items-center justify-center p-6 text-center">
              
              {!notebookSaved ? (
                <>
                  <div className="w-12 h-12 rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center text-[#5a5a72] mb-4">
                    <HugeiconsIcon icon={Compass01Icon} size={20} className="text-[#5a5a72]" />
                  </div>
                  <h4 className="text-sm font-semibold text-slate-200 mb-1">Nhật ký đang trống</h4>
                  <p className="text-xs text-[#9d9db5] max-w-xs leading-relaxed">
                    Vui lòng soạn kế hoạch bài tập điền dã ở bảng bên trái để hoàn tất nhật ký lưu trữ.
                  </p>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full text-left p-6 rounded-xl border border-amber-500/25 bg-[#0f0e0d] relative shadow-lg overflow-hidden"
                >
                  {/* Decorative sketch lines simulating a notepad */}
                  <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(#fff_1px,transparent_1px)] bg-[size:100%_1.5rem]" />

                  <div className="flex items-center gap-1.5 text-[9px] font-mono text-[#d59a54] mb-4">
                    <HugeiconsIcon icon={File01Icon} size={11} className="text-[#d59a54]" />
                    <span>FIELDWORK NOTEBOOK // PAGE 03</span>
                  </div>

                  <h4 className="text-sm font-mono text-white/40 uppercase">Chủ đề biểu tượng:</h4>
                  <h3 className="text-lg font-serif text-amber-500 font-semibold border-b border-white/[0.08] pb-3 mb-4">
                    {notebookBrief.symbol}
                  </h3>

                  <div className="flex flex-col gap-3">
                    <div>
                      <span className="text-[10px] font-mono text-white/40 block uppercase">Ý tưởng sáng tác & Nhật trình</span>
                      <p className="text-xs text-[#f0e6d2] font-serif whitespace-pre-wrap leading-relaxed mt-2 italic">
                        &ldquo;{notebookBrief.notes}&rdquo;
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-white/[0.08] pt-4 mt-6 flex justify-between items-center text-[9px] font-mono text-[#5a5a72]">
                    <span>STATUS: DRAFT SAVED FOR FIELDWORK</span>
                    <button
                      onClick={() => setNotebookSaved(false)}
                      className="text-amber-500 hover:text-white transition-colors bg-transparent border-none cursor-pointer font-semibold uppercase flex items-center gap-1"
                    >
                      <HugeiconsIcon icon={ReloadIcon} size={10} className="text-amber-500" />
                      <span>Viết lại</span>
                    </button>
                  </div>
                </motion.div>
              )}

            </div>

          </div>
        </section>

        {/* COMPLETION & NAVIGATION */}
        <section className="max-w-4xl mx-auto px-6 py-20 text-center">
          <button
            onClick={toggleRead}
            className={`inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-sm transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer border ${
              isRead
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500/20'
                : 'bg-[#a94338] border-[#a94338] text-white hover:bg-red-700 shadow-md shadow-red-950/20'
            }`}
          >
            <span>{isRead ? 'Đã hoàn thành bài học' : 'Đánh dấu hoàn thành bài học'}</span>
            <span className="flex items-center justify-center">
              <HugeiconsIcon icon={isRead ? CheckIcon : BookOpen01Icon} size={18} />
            </span>
          </button>
        </section>

        {/* NAVIGATION PREV/NEXT LESSON */}
        <nav className="max-w-7xl mx-auto border-t border-white/[0.06] grid grid-cols-1 md:grid-cols-2 text-sm" aria-label="Lesson navigation">
          <Link href="/muc-dich" className="flex items-center justify-between p-8 border-b md:border-b-0 md:border-r border-white/[0.06] hover:bg-white/[0.01] transition-all group">
            <div className="flex gap-4 items-center">
              <HugeiconsIcon icon={ArrowLeft01Icon} size={16} className="text-[#5a5a72] group-hover:text-white transition-colors" />
              <div className="text-left">
                <span className="text-[10px] font-mono text-[#5a5a72] block uppercase tracking-wider">Bài trước / HA02</span>
                <span className="text-base font-semibold text-slate-200 mt-1 block">Mục đích hình ảnh</span>
              </div>
            </div>
          </Link>

          <Link href="/duong-net" className="flex items-center justify-between p-8 hover:bg-white/[0.01] transition-all group text-right">
            <div className="flex gap-4 items-center ml-auto">
              <div className="text-right">
                <span className="text-[10px] font-mono text-[#5a5a72] block uppercase tracking-wider">Bài tiếp theo / HA04</span>
                <span className="text-base font-semibold text-slate-200 mt-1 block">Đường nét cảm xúc</span>
              </div>
              <HugeiconsIcon icon={ArrowRight01Icon} size={16} className="text-[#5a5a72] group-hover:text-white transition-colors" />
            </div>
          </Link>
        </nav>

        {/* FOOTER */}
        <footer className="max-w-7xl mx-auto border-t border-white/[0.06] py-8 px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-[#5a5a72]">
          <span>KHÓA HỌC NGÔN NGỮ THỊ GIÁC</span>
          <span className="flex items-center gap-1 text-[#a94338]"><HugeiconsIcon icon={SparklesIcon} size={12} className="text-[#a94338]" /> BÀI 03 / 19 BÀI HỌC</span>
        </footer>

      </article>
    </DocsLayout>
  );
}

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
  WorkflowCircle01Icon,
  ClipboardListIcon,
  Award01Icon,
  ChevronRightIcon,
  EyeIcon,
  Settings01Icon,
  Compass01Icon,
  ColorsIcon,
  Maximize01Icon,
  LockIcon,
  CircleUnlockIcon,
  AlertCircleIcon,
  File01Icon,
  ReloadIcon,
} from '@hugeicons/core-free-icons';
import { motion, AnimatePresence } from 'framer-motion';
import DocsLayout from '@/components/docs-layout';

// TOC Navigation Sections
const tocSections = [
  { id: 'manifesto', label: 'Tư duy thống nhất', level: 1 },
  { id: 'director-table', label: 'Bàn dựng đạo diễn', level: 1 },
  { id: 'mindmap', label: 'Bản đồ hệ thống 18 chương', level: 1 },
  { id: 'workflow', label: 'Quy trình kiểm duyệt', level: 1 },
  { id: 'planner', label: 'Lập hồ sơ tốt nghiệp', level: 1 },
  { id: 'finale', label: 'Khép khóa học', level: 1 },
];

// Interactive Director's Table Elements
const directorElements = [
  {
    id: 'atmosphere',
    title: 'Atmosphere (Khí quyển)',
    vietnamese: 'Khí quyển cảm xúc',
    src: '/hero-bau-khong-khi.webp',
    copy: 'Atmosphere là trường năng lượng cảm xúc bao trùm, được tạo ra từ sự hòa hợp tuyệt đối giữa ánh sáng dịu và sắc độ lạnh, mang lại cảm giác tĩnh lặng và u hoài sâu lắng.',
    overlayType: 'atmosphere',
  },
  {
    id: 'structure',
    title: 'Structure (Cấu trúc)',
    vietnamese: 'Bố cục & đường dẫn',
    src: '/hero-bo-cuc.webp',
    copy: 'Khung hình được tổ chức chặt chẽ bằng bố cục 1/3 và các đường dẫn chéo mảnh. Sự vững chãi này định hình trật tự đọc ảnh của não bộ.',
    overlayType: 'grid',
  },
  {
    id: 'emotion',
    title: 'Emotion (Màu sắc)',
    vietnamese: 'Sắc thái màu sắc',
    src: '/hero-mau-sac.webp',
    copy: 'Tông màu chủ đạo là sắc hổ phách (amber) ấm áp tương phản nhẹ với shadow xanh lạnh, tạo ra một trường lực cảm xúc vừa lãng mạn vừa suy tư.',
    overlayType: 'palette',
    palette: ['#0d0d0f', '#d59a54', '#7c8aff', '#f0e6d2', '#1e1b18']
  },
  {
    id: 'eyepath',
    title: 'Eye Path (Phân cấp)',
    vietnamese: 'Điểm nhấn & phân cấp',
    src: '/hero-phan-cap.webp',
    copy: 'Điểm nhấn thị giác mạnh hướng mắt người xem đi từ các chi tiết tiền cảnh sẫm màu, trượt dọc theo tia sáng và dừng chân tại chủ thể chính ở trung cảnh.',
    overlayType: 'eyepath',
  },
  {
    id: 'space',
    title: 'Space (Dư âm)',
    vietnamese: 'Không gian & dư âm',
    src: '/hero-khong-gian-extra.webp',
    copy: 'Khoảng trống bao la (negative space) chiếm hơn 60% diện tích ảnh không hề lãng phí, nó hoạt động như nhịp nghỉ thị giác, khuếch đại sự cô đơn của chủ thể.',
    overlayType: 'space',
  }
];

// 18-Chapter Curriculum split into 5 levels
const curriculumLevels = [
  {
    number: '01',
    name: 'Nền tảng nhận thức',
    english: 'Cognitive Foundation',
    copy: 'Bài 1-3 định hình bản chất của nhiếp ảnh: sức mạnh tâm lý của ảnh, cách xác lập mục đích chụp và vai trò của biểu tượng văn hóa để kể câu chuyện phi ngôn ngữ.',
    chapters: [
      { num: 'Chương 1', name: 'Sức mạnh hình ảnh', src: '/hero-tab1.webp', desc: 'Lý giải tại sao một hình ảnh có thể tác động trực tiếp và lưu dấu trong tâm trí người xem lâu hơn ngôn từ.' },
      { num: 'Chương 2', name: 'Mục đích nhiếp ảnh', src: '/hero-muc-dich.webp', desc: 'Định hình mục tiêu cốt lõi của tác phẩm: ghi nhận, thuyết phục, khơi gợi cảm xúc hay thử nghiệm thị giác.' },
      { num: 'Chương 3', name: 'Ngôn ngữ biểu tượng', src: '/hero-bieu-tuong.webp', desc: 'Giải mã cách lồng ghép các biểu tượng văn hóa, ẩn dụ thị giác để tạo chiều sâu ý nghĩa đa tầng.' }
    ]
  },
  {
    number: '02',
    name: 'Từ vựng thị giác',
    english: 'Visual Vocabulary',
    copy: 'Bài 4-9 là bảng chữ cái thị giác cơ bản. Bạn học cách nói bằng các yếu tố hình học sơ khởi: đường nét, hình khối, không gian, ánh sáng, màu sắc và tương phản.',
    chapters: [
      { num: 'Chương 4', name: 'Đường nét (Line)', src: '/hero-duong-net.webp', desc: 'Dẫn dắt mắt người xem di chuyển, tạo cảm giác ổn định, năng động hay căng thẳng thông qua hướng đi.' },
      { num: 'Chương 5', name: 'Hình dạng (Shape)', src: '/hero-hinh-dang.webp', desc: 'Sử dụng hình tròn tạo sự hài hòa, hình vuông tạo sự vững chãi, hình tam giác tạo sự chuyển động lực.' },
      { num: 'Chương 6', name: 'Không gian (Space)', src: '/hero-khong-gian.webp', desc: 'Thiết lập mối quan hệ giữa chủ thể (positive space) và khoảng trống (negative space) để tạo nhịp thở.' },
      { num: 'Chương 7', name: 'Ánh sáng (Light)', src: '/anh-sang-hero.png', desc: 'Điêu khắc khối, tạo bóng đổ, độ kịch tính và định hình kết cấu của thế giới vật chất.' },
      { num: 'Chương 8', name: 'Màu sắc (Color)', src: '/hero-mau-sac.webp', desc: 'Ứng dụng bánh xe màu sắc và sự tương tác giữa các tông màu để khơi gợi trạng thái tâm lý lập tức.' },
      { num: 'Chương 9', name: 'Tương phản (Contrast)', src: '/hero-tuong-phan.webp', desc: 'Tạo ra lực kéo thị giác mạnh mẽ thông qua tương phản sáng tối, nóng lạnh hoặc kích thước.' }
    ]
  },
  {
    number: '03',
    name: 'Cảm giác vật chất',
    english: 'Tactile & Atmosphere',
    copy: 'Bài 10-12 chuyển hóa từ việc nhìn sang việc chạm và cảm nhận. Bạn thiết lập chất liệu bề mặt ảnh, cảm giác tỷ lệ và bầu không khí bao trùm không gian.',
    chapters: [
      { num: 'Chương 10', name: 'Chất liệu (Texture)', src: '/hero-chat-lieu.webp', desc: 'Đánh thức xúc giác của người xem qua cách thể hiện độ mịn màng, thô ráp hay gai góc của bề mặt.' },
      { num: 'Chương 11', name: 'Tỷ lệ & Kích thước', src: '/hero-kich-thuoc-ty-le.webp', desc: 'So sánh kích thước các vật thể để nhấn mạnh sự vĩ đại của thiên nhiên hay sự bé nhỏ của con người.' },
      { num: 'Chương 12', name: 'Bầu không khí', src: '/hero-bau-khong-khi.webp', desc: 'Tổng hòa sương mù, khói, độ ẩm và thời tiết để tạo ra một môi trường cảm xúc đậm đặc.' }
    ]
  },
  {
    number: '04',
    name: 'Cấu trúc câu chuyện',
    english: 'Story Structure',
    copy: 'Bài 13-15 là các quyết định mang tính đạo diễn. Bạn sắp đặt trật tự bằng bố cục, điều khiển góc chụp để định vị tâm lý người xem, và dùng tiêu điểm để phân lọc thông tin.',
    chapters: [
      { num: 'Chương 13', name: 'Bố cục (Composition)', src: '/hero-bo-cuc.webp', desc: 'Sắp xếp trật tự các vật thể trong khung để tạo ra sự mạch lạc và dẫn dắt người xem đọc ảnh tự nhiên.' },
      { num: 'Chương 14', name: 'Góc chụp (Camera Angle)', src: '/hero-goc-chup.webp', desc: 'Thay đổi góc cao, góc thấp hay ngang mắt để thiết lập mối quan hệ quyền lực, sự đồng cảm hay xa cách.' },
      { num: 'Chương 15', name: 'Tiêu điểm & Độ sâu', src: '/hero-tieu-diem.webp', desc: 'Điều phối độ nông sâu trường ảnh để cô lập chủ thể, dọn dẹp hậu cảnh nhiễu và định hướng sự tập trung.' }
    ]
  },
  {
    number: '05',
    name: 'Hệ thống vận hành',
    english: 'Operational System',
    copy: 'Bài 16-18 là chất keo kết dính. Nhịp điệu tạo ra chuyển động thời gian, cân bằng giữ vững sự ổn định lực, và phân cấp sắp xếp thứ tự ưu tiên của mọi yếu tố.',
    chapters: [
      { num: 'Chương 16', name: 'Nhịp điệu (Rhythm)', src: '/hero-nhip-dieu.webp', desc: 'Lặp đi lặp lại các yếu tố thị giác có chu kỳ để tạo nên một giai điệu hình ảnh sống động.' },
      { num: 'Chương 17', name: 'Cân bằng (Balance)', src: '/hero-can-bang.webp', desc: 'Phân bổ trọng lượng thị giác để tạo ra sự cân bằng đối xứng (tĩnh) hoặc cân bằng bất đối xứng (động).' },
      { num: 'Chương 18', name: 'Phân cấp (Hierarchy)', src: '/hero-phan-cap.webp', desc: 'Thiết lập rõ nét yếu tố chính, phụ và phụ trợ để dẫn dắt tuyến đọc ảnh mạch lạc từ trước ra sau.' }
    ]
  }
];

// Capstone assignment prefilled templates
const capstoneVisualRulesOptions = [
  'Low-key Lighting (Ánh sáng tương phản cao, vùng tối sâu)',
  'High-key Lighting (Ánh sáng sáng trong, ít bóng đổ)',
  'Monochromatic Palette (Bảng màu đơn sắc hoặc tối giản màu)',
  'Analogue Colors (Bảng màu tương đồng, dịu mắt)',
  'Rule of Thirds & Diagonal Lines (Khung lưới 1/3 & đường dẫn chéo)',
  'Centered Symmetry (Cân bằng đối xứng tâm vững chãi)',
  'Macro Textures (Độ nổi chất liệu cực cận cảnh)',
  'Wide Ambient Space (Không gian âm rộng, chủ thể tí hon)',
  'Low Angle Viewpoint (Góc chụp từ dưới lên tạo quyền lực)',
  'Ultra-Shallow Depth of Field (Trường ảnh cực mỏng cô lập nét)'
];

export default function TinhThongNhatPage() {
  const [isRead, setIsRead] = useState(false);
  const [showCert, setShowCert] = useState(false);
  const [certName, setCertName] = useState('');

  // 1. State for Director's Table
  const [activeElement, setActiveElement] = useState(directorElements[0]);

  // 2. State for Mindmap
  const [activeLevelTab, setActiveLevelTab] = useState(0);

  // 3. State for Actionable Workflow Checklist
  const [checkedSteps, setCheckedSteps] = useState([false, false, false, false, false]);

  // 4. State for Capstone Planner
  const [plannerBrief, setPlannerBrief] = useState({
    title: '',
    intent: '',
    visualRules: [] as string[],
    sequenceNotes: '',
  });
  const [briefGenerated, setBriefGenerated] = useState(false);

  useEffect(() => {
    try {
      const readPages: string[] = JSON.parse(localStorage.getItem('alpha-doc-read') || '[]');
      setIsRead(readPages.includes('/tinh-thong-nhat'));
    } catch {}
  }, []);

  const toggleRead = () => {
    try {
      const readPages: string[] = JSON.parse(localStorage.getItem('alpha-doc-read') || '[]');
      const updated = isRead
        ? readPages.filter((page) => page !== '/tinh-thong-nhat')
        : Array.from(new Set([...readPages, '/tinh-thong-nhat']));
      localStorage.setItem('alpha-doc-read', JSON.stringify(updated));
      setIsRead(!isRead);
      if (!isRead) {
        setShowCert(true);
      }
    } catch {}
  };

  const handleStepCheck = (index: number) => {
    const updated = [...checkedSteps];
    updated[index] = !updated[index];
    setCheckedSteps(updated);
  };

  const completionPercentage = Math.round(
    (checkedSteps.filter(Boolean).length / checkedSteps.length) * 100
  );

  const handleRuleToggle = (rule: string) => {
    const current = [...plannerBrief.visualRules];
    if (current.includes(rule)) {
      setPlannerBrief({
        ...plannerBrief,
        visualRules: current.filter((r) => r !== rule),
      });
    } else {
      if (current.length < 3) {
        setPlannerBrief({
          ...plannerBrief,
          visualRules: [...current, rule],
        });
      }
    }
  };

  const handleGenerateBrief = (e: React.FormEvent) => {
    e.preventDefault();
    if (plannerBrief.title && plannerBrief.intent && plannerBrief.visualRules.length > 0) {
      setBriefGenerated(true);
    }
  };

  const activeElementData = activeElement;

  return (
    <DocsLayout tocSections={tocSections}>
      <article className="min-h-screen text-[#e4e4ed] bg-[#050508] relative font-sans leading-relaxed selection:bg-amber-500/30 selection:text-white">
        
        {/* Cinematic Backdrop Glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute top-[8%] left-[10%] w-[380px] h-[380px] rounded-full bg-amber-500/5 blur-[120px] mix-blend-screen" />
          <div className="absolute top-[25%] right-[5%] w-[480px] h-[480px] rounded-full bg-indigo-500/5 blur-[150px] mix-blend-screen" />
          <div className="absolute bottom-[20%] left-[15%] w-[420px] h-[420px] rounded-full bg-violet-600/5 blur-[130px] mix-blend-screen" />
        </div>

        {/* HERO SECTION */}
        <header className="relative w-full border-b border-white/[0.06] overflow-hidden pt-12 md:pt-16 pb-20 px-6 lg:px-12">
          {/* Subtle background image */}
          <div className="absolute inset-0 z-0 opacity-40 filter grayscale contrast-125 saturate-50 pointer-events-none">
            <img
              src="/hero-khong-gian.webp"
              alt="Background"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/80 to-[#050508]" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Title Column */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <div className="flex items-center gap-2 mb-4 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full text-xs font-mono text-[#f0a060]">
                <HugeiconsIcon icon={SparklesIcon} size={13} className="animate-pulse text-[#f0a060]" />
                <span>CHƯƠNG CUỐI · BÀI 19</span>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif tracking-tight leading-none mb-6">
                Tính
                <em className="block text-[#d59a54] font-serif font-light italic mt-2 ml-12 md:ml-20">thống nhất</em>
              </h1>

              <p className="text-base md:text-lg text-[#9d9db5] max-w-xl leading-relaxed mb-8">
                Khi 18 chương trước không còn là những kỹ thuật rời rạc, mà hội tụ thành một hệ điều hành thị giác chuyên nghiệp, mạch lạc và mang đậm dấu ấn cá nhân của bạn.
              </p>

              <div className="flex items-center gap-6 text-xs text-[#5a5a72] font-mono border-t border-white/[0.08] pt-6 w-full max-w-md">
                <span className="flex items-center gap-1.5">
                  <HugeiconsIcon icon={AiScanIcon} size={13} className="text-[#5a5a72]" />
                  FINAL SYNTHESIS
                </span>
                <span>•</span>
                <span>19 / 19 BÀI HỌC</span>
                {isRead && (
                  <>
                    <span>•</span>
                    <span className="text-[#5ce0a0] flex items-center gap-1">
                      <HugeiconsIcon icon={CheckIcon} size={13} className="text-[#5ce0a0]" />
                      ĐÃ TỐT NGHIỆP
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Showcase Collage Frame */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[420px] aspect-[4/5] p-3 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl shadow-2xl">
                <div className="relative w-full h-full rounded-xl overflow-hidden group">
                  <img
                    src="/hero-bau-khong-khi.webp"
                    alt="Atmosphere visual example"
                    className="w-full h-full object-cover filter saturate-75 contrast-110 brightness-95 group-hover:scale-105 transition-transform duration-[1200ms]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30 pointer-events-none" />
                  
                  {/* Floating labels */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-[10px] font-mono text-white/50 tracking-wider pointer-events-none">
                    <span>IMAGE BRIEF 01</span>
                    <span className="text-amber-400">ATMOSPHERE</span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-1 pointer-events-none">
                    <span className="text-xs font-mono text-amber-500">INTENT DRIVEN</span>
                    <h3 className="text-lg font-serif text-white font-medium">Bức ảnh cuối cùng</h3>
                    <p className="text-[11px] text-white/60 line-clamp-2">Sự tổng hợp toàn bộ các kỹ thuật đường nét, ánh sáng, màu sắc phục vụ duy nhất một cảm xúc trầm lặng.</p>
                  </div>
                </div>

                {/* Overlap offset frames */}
                <div className="absolute -bottom-6 -left-6 w-32 aspect-square rounded-lg border border-white/10 overflow-hidden shadow-xl hidden md:block">
                  <img src="/hero-bo-cuc.webp" alt="Structure" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/30 pointer-events-none" />
                  <div className="absolute bottom-1 left-1.5 text-[8px] font-mono text-white/70 pointer-events-none">02. STRUCTURE</div>
                </div>

                <div className="absolute -top-6 -right-6 w-28 aspect-square rounded-lg border border-white/10 overflow-hidden shadow-xl hidden md:block">
                  <img src="/hero-phan-cap.webp" alt="Focal Point" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/30 pointer-events-none" />
                  <div className="absolute bottom-1 left-1.5 text-[8px] font-mono text-white/70 pointer-events-none">03. FOCUS PATH</div>
                </div>
              </div>
            </div>

          </div>
        </header>

        {/* Video bài học */}
        <div className="max-w-7xl mx-auto px-6 pt-12">
          <LessonVideoPlayer video={lessonVideos['/tinh-thong-nhat']} />
        </div>

        {/* SECTION I: MANIFESTO */}
        <section id="manifesto" className="max-w-7xl mx-auto px-6 py-20 border-b border-white/[0.06]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4">
              <span className="text-xs font-mono text-[#5a5a72] uppercase tracking-widest block mb-2">01 / Triết lý sáng tác</span>
              <h2 className="text-3xl font-serif text-white leading-tight">Tư duy thống nhất trong Nhiếp ảnh</h2>
            </div>
            
            <div className="lg:col-span-8 flex flex-col gap-6">
              <div className="relative p-8 rounded-2xl bg-white/[0.01] border border-white/[0.04] backdrop-blur-sm">
                <span className="absolute -top-6 left-6 text-7xl font-serif text-amber-500/20 select-none">“</span>
                <blockquote className="text-xl md:text-2xl font-serif text-[#f0e6d2] leading-relaxed italic relative z-10">
                  Một bức ảnh chuyên nghiệp không phải vì nó phơi bày nhiều kỹ thuật phức tạp. Nó chuyên nghiệp khi mọi kỹ thuật sử dụng đều cùng đồng lòng phục vụ cho <span className="text-[#d59a54] not-italic font-medium border-b border-amber-500/30 pb-0.5">một ý định duy nhất.</span>
                </blockquote>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-[#9d9db5] leading-relaxed mt-4">
                <p>
                  Đi qua 18 chương học, bạn đã nắm vững cả một kho từ vựng thị giác đồ sộ: từ sức mạnh biểu tượng, đường nét sắc sảo, hình khối vững chãi, cho tới phép điều phối ánh sáng, tương phản màu sắc và sắp đặt nhịp điệu bố cục. Tuy nhiên, nếu áp dụng tất cả một cách bừa bãi, tác phẩm sẽ chỉ là một mớ hỗn độn kỹ nghệ.
                </p>
                <p>
                  Chương cuối cùng không cung cấp thêm một công cụ bấm máy mới. Chương này giúp bạn xây dựng **hệ điều hành nhìn nhận**: năng lực tinh giản tối đa, biết hy sinh những góc chụp đẹp nhưng lạc lõng để giữ lại một hệ thống hình ảnh nhất quán, chặt chẽ, tạo sức nặng thị giác tối đa cho thông điệp.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION II: INTERACTIVE DIRECTOR'S TABLE */}
        <section id="director-table" className="max-w-7xl mx-auto px-6 py-20 border-b border-white/[0.06]">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono text-[#7c8aff] uppercase tracking-widest block mb-2">02 / Không gian làm việc</span>
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">Bàn dựng ảnh của Đạo diễn</h2>
            <p className="text-sm text-[#9d9db5]">
              Một bức ảnh thống nhất là một cấu trúc có đạo diễn. Hãy nhấp vào các thành phần dưới đây để xem cách các lớp thiết kế tương tác với nhau để tạo nên tác phẩm hoàn thiện.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left: Interactive Canvas Screen */}
            <div className="lg:col-span-7 flex flex-col justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md shadow-inner min-h-[450px] md:min-h-[500px]">
              
              {/* Canvas Frame */}
              <div className="relative w-full flex-grow rounded-xl overflow-hidden bg-black/40 flex items-center justify-center">
                
                {/* Image under selection */}
                <img
                  src={activeElementData.src}
                  alt={activeElementData.title}
                  className={`w-full h-full object-cover transition-all duration-700 ease-in-out ${
                    activeElementData.overlayType === 'grid' ? 'brightness-50 saturate-50' : 
                    activeElementData.overlayType === 'eyepath' ? 'contrast-125 saturate-50' : ''
                  }`}
                />

                {/* Interactive Overlays */}
                <AnimatePresence mode="wait">
                  {/* Grid Overlay (Rule of Thirds) */}
                  {activeElementData.overlayType === 'grid' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none"
                    >
                      <div className="border-r border-b border-amber-500/40 border-dashed" />
                      <div className="border-r border-b border-amber-500/40 border-dashed" />
                      <div className="border-b border-amber-500/40 border-dashed" />
                      <div className="border-r border-b border-amber-500/40 border-dashed" />
                      <div className="border-r border-b border-amber-500/40 border-dashed" />
                      <div className="border-b border-amber-500/40 border-dashed" />
                      <div className="border-r border-amber-500/40 border-dashed" />
                      <div className="border-r border-amber-500/40 border-dashed" />
                      <div className="pointer-events-none" />
                    </motion.div>
                  )}

                  {/* Eye Path Overlay */}
                  {activeElementData.overlayType === 'eyepath' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 pointer-events-none"
                    >
                      {/* SVG line */}
                      <svg className="w-full h-full absolute inset-0">
                        {/* Golden curved path */}
                        <path
                          d="M 100 500 Q 200 200 400 250"
                          fill="none"
                          stroke="#d59a54"
                          strokeWidth="2"
                          strokeDasharray="8,8"
                          className="animate-[dash_2s_linear_infinite]"
                          style={{
                            strokeDashoffset: 100,
                          }}
                        />
                      </svg>
                      {/* Focal ring overlay */}
                      <div className="absolute top-[46%] left-[62%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                        <span className="w-8 h-8 rounded-full border-2 border-amber-500/80 animate-ping absolute" />
                        <span className="w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center">
                          <HugeiconsIcon icon={FocusIcon} size={10} className="text-black" />
                        </span>
                      </div>
                    </motion.div>
                  )}

                  {/* Space Highlight (Negative space overlay) */}
                  {activeElementData.overlayType === 'space' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-black/60 backdrop-blur-[2px] pointer-events-none flex items-center justify-center"
                    >
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-dashed border-white/20 bg-transparent shadow-[0_0_0_100vw_rgba(0,0,0,0.6)]" />
                      <span className="absolute bottom-8 text-xs font-mono text-white/50 bg-black/60 border border-white/10 px-3 py-1 rounded">NEGATIVE SPACE (KHOẢNG KHÔNG CÔ LẬP)</span>
                    </motion.div>
                  )}

                  {/* Atmosphere (Radial smoke/glow) */}
                  {activeElementData.overlayType === 'atmosphere' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 pointer-events-none bg-gradient-to-t from-indigo-950/20 via-transparent to-amber-500/10 mix-blend-color-dodge"
                    />
                  )}

                  {/* Palette swatch Overlay */}
                  {activeElementData.overlayType === 'palette' && activeElementData.palette && (
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 20, opacity: 0 }}
                      className="absolute bottom-4 right-4 flex gap-2 p-2 rounded-lg bg-black/85 border border-white/10 pointer-events-none"
                    >
                      {activeElementData.palette.map((color, i) => (
                        <div key={i} className="flex flex-col items-center gap-1">
                          <div className="w-8 h-8 rounded border border-white/25" style={{ backgroundColor: color }} />
                          <span className="text-[8px] font-mono text-white/60">{color}</span>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Scale HUD overlay */}
                <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-black/70 px-2 py-1 rounded text-[9px] font-mono tracking-wider text-white/60 border border-white/5">
                  <HugeiconsIcon icon={Maximize01Icon} size={10} className="text-white/60" />
                  <span>1920 x 1080px (RAW)</span>
                </div>
              </div>

              {/* Annotation */}
              <div className="mt-4 pt-4 border-t border-white/[0.06] px-2 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                <div>
                  <span className="text-[10px] font-mono text-amber-500 uppercase tracking-widest">{activeElementData.vietnamese}</span>
                  <p className="text-xs text-[#9d9db5] max-w-xl mt-0.5">{activeElementData.copy}</p>
                </div>
                <span className="text-2xl font-serif text-white/25 font-light italic shrink-0">
                  {activeElementData.title.split(' ')[0]}
                </span>
              </div>

            </div>

            {/* Right: Interactive Navigation Cards */}
            <div className="lg:col-span-5 flex flex-col gap-3 justify-between">
              {directorElements.map((elem) => {
                const isActive = elem.id === activeElementData.id;
                return (
                  <button
                    key={elem.id}
                    onClick={() => setActiveElement(elem)}
                    className={`w-full p-4 rounded-xl text-left flex items-center gap-4 transition-all duration-300 border ${
                      isActive
                        ? 'bg-amber-500/[0.04] border-amber-500/40 shadow-[0_0_15px_rgba(213,154,84,0.05)]'
                        : 'bg-white/[0.01] border-white/[0.04] hover:bg-white/[0.03] hover:border-white/10'
                    }`}
                  >
                    {/* Small image thumb */}
                    <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 border border-white/10">
                      <img src={elem.src} alt={elem.title} className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-grow">
                      <div className="flex justify-between items-center">
                        <h4 className={`text-sm font-semibold transition-colors ${isActive ? 'text-amber-400' : 'text-slate-200'}`}>
                          {elem.title}
                        </h4>
                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />}
                      </div>
                      <span className="text-[11px] text-[#5a5a72] font-mono block mt-0.5 uppercase tracking-wide">
                        {elem.vietnamese}
                      </span>
                      <p className="text-xs text-[#9d9db5] mt-1.5 line-clamp-1">
                        {elem.copy}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

          </div>
        </section>

        {/* SECTION III: INTERACTIVE COURSE MINDMAP */}
        <section id="mindmap" className="w-full bg-[#0a0a10] border-y border-white/[0.06] py-20 px-6">
          <div className="max-w-7xl mx-auto">
            
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-16">
              <div>
                <span className="text-xs font-mono text-amber-500 uppercase tracking-widest block mb-2">03 / Tổng quan học trình</span>
                <h2 className="text-3xl md:text-4xl font-serif text-white">Kiến trúc Hệ điều hành Thị giác</h2>
              </div>
              <p className="text-sm text-[#9d9db5] max-w-md">
                18 chương học trước không chỉ là một danh sách phẳng. Chúng được chia làm 5 tầng năng lực cốt lõi. Hãy nhấp để mở rộng chi tiết các chương thành phần.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Tab Levels Selector */}
              <div className="lg:col-span-4 flex flex-col gap-2">
                {curriculumLevels.map((level, idx) => {
                  const isActive = idx === activeLevelTab;
                  return (
                    <button
                      key={level.number}
                      onClick={() => setActiveLevelTab(idx)}
                      className={`w-full p-4 rounded-xl text-left border transition-all duration-300 flex items-start gap-4 ${
                        isActive
                          ? 'bg-amber-500/[0.04] border-amber-500/40 shadow-sm'
                          : 'bg-white/[0.01] border-white/[0.04] hover:bg-white/[0.02] hover:border-white/10'
                      }`}
                    >
                      <span className={`text-sm font-mono transition-colors ${isActive ? 'text-amber-400' : 'text-[#5a5a72]'}`}>
                        {level.number}
                      </span>
                      <div>
                        <span className="text-[10px] font-mono text-[#5a5a72] block uppercase tracking-wider">
                          {level.english}
                        </span>
                        <h3 className={`text-base font-semibold transition-colors mt-0.5 ${isActive ? 'text-amber-400' : 'text-slate-200'}`}>
                          {level.name}
                        </h3>
                      </div>
                      <HugeiconsIcon
                        icon={ChevronRightIcon}
                        size={16}
                        className={`ml-auto self-center transition-transform ${isActive ? 'transform rotate-90 text-amber-500' : 'text-[#5a5a72]'}`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Sub-chapters Container */}
              <div className="lg:col-span-8 p-6 rounded-2xl bg-white/[0.01] border border-white/[0.04] backdrop-blur-sm min-h-[350px]">
                
                {/* Level Title & Summary */}
                <div className="border-b border-white/[0.08] pb-6 mb-6">
                  <span className="text-[11px] font-mono text-[#5a5a72] uppercase tracking-widest">
                    LEVEL {curriculumLevels[activeLevelTab].number} // {curriculumLevels[activeLevelTab].english}
                  </span>
                  <h3 className="text-xl font-serif text-white font-medium mt-1">
                    {curriculumLevels[activeLevelTab].name}
                  </h3>
                  <p className="text-xs text-[#9d9db5] mt-2 leading-relaxed max-w-2xl">
                    {curriculumLevels[activeLevelTab].copy}
                  </p>
                </div>

                {/* Sub-chapters List Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {curriculumLevels[activeLevelTab].chapters.map((ch, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04] hover:border-white/10 transition-colors flex gap-3 items-start"
                    >
                      {/* Micro thumbnail */}
                      <div className="w-14 h-14 rounded overflow-hidden shrink-0 border border-white/10 bg-black/20">
                        <img src={ch.src} alt={ch.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[9px] font-mono text-amber-500 bg-amber-500/10 px-1 py-0.2 rounded uppercase">
                            {ch.num}
                          </span>
                          <h4 className="text-xs font-semibold text-slate-200">{ch.name}</h4>
                        </div>
                        <p className="text-[11px] text-[#9d9db5] leading-relaxed mt-1">
                          {ch.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* SECTION IV: WORKFLOW & AUDIT CHECKLIST */}
        <section id="workflow" className="max-w-4xl mx-auto px-6 py-20 border-b border-white/[0.06]">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono text-[#5ce0a0] uppercase tracking-widest block mb-2">04 / Thực hành kiểm định</span>
            <h2 className="text-3xl font-serif text-white mb-4">Quy trình Đánh giá & Kiểm duyệt Ảnh</h2>
            <p className="text-sm text-[#9d9db5]">
              Khi đứng trước tác phẩm vừa chụp, hãy rà soát kỹ lưỡng qua 5 bước kiểm duyệt dưới đây để xem bức ảnh đã đạt sự thống nhất trọn vẹn chưa.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md">
            
            {/* Real-time Progress HUD */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/[0.08] pb-6 mb-6">
              <div>
                <span className="text-[11px] font-mono text-white/50 block">CHỈ SỐ THỐNG NHẤT CỦA TÁC PHẨM</span>
                <span className="text-2xl font-serif text-white font-medium mt-1">
                  {completionPercentage}% Sẵn sàng
                </span>
              </div>
              <div className="w-full sm:w-60 h-2 bg-black/40 rounded-full overflow-hidden border border-white/5 relative">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-[#5ce0a0] transition-all duration-500 ease-out"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>

            {/* Checklist items */}
            <div className="flex flex-col gap-4">
              {[
                {
                  step: '01',
                  title: 'Ý định cốt lõi (Intent Clear)',
                  detail: 'Bạn có thể định nghĩa bức ảnh này tồn tại để nói lên câu chuyện gì trong một câu đơn hay không? Hay nó chứa quá nhiều ý tưởng rời rạc?',
                  icon: EyeIcon
                },
                {
                  step: '02',
                  title: 'Nhất quán từ vựng thị giác (Visual Vocabulary)',
                  detail: 'Các thành tố chính (đường dẫn, ánh sáng, màu sắc) có đang kéo bức ảnh về các hướng tâm trạng đối nghịch nhau một cách vô thức không?',
                  icon: ColorsIcon
                },
                {
                  step: '03',
                  title: 'Bố cục chặt chẽ (Structure Checked)',
                  detail: 'Mắt người xem có đi theo một lộ trình trật tự, từ điểm nhấn trung tâm (focal point) rồi tỏa ra các chi tiết phụ trợ hợp lý không?',
                  icon: LayerIcon
                },
                {
                  step: '04',
                  title: 'Giản lược chi tiết thừa (Simplify Path)',
                  detail: 'Đã loại bỏ hoặc che bớt các điểm rác thị giác (vùng highlight cháy ở rìa, vật thể rác, màu sắc chói lệch hệ màu chủ đạo) chưa?',
                  icon: FocusIcon
                },
                {
                  step: '05',
                  title: 'Trường lực cảm xúc trọn vẹn (Atmosphere Unlocked)',
                  detail: 'Khi nhìn lướt qua trong 1 giây đầu tiên, bức ảnh có kích hoạt được ngay lập tức một trạng thái cảm xúc (lạnh lẽo, ấm áp, cô đơn, bí ẩn) hay không?',
                  icon: SparklesIcon
                }
              ].map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => handleStepCheck(idx)}
                  className={`p-4 rounded-xl text-left border cursor-pointer transition-all duration-300 flex items-start gap-4 ${
                    checkedSteps[idx]
                      ? 'bg-[#5ce0a0]/[0.02] border-[#5ce0a0]/30 shadow-sm'
                      : 'bg-white/[0.01] border-white/[0.04] hover:bg-white/[0.02]'
                  }`}
                >
                  <div className="pt-0.5">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                      checkedSteps[idx]
                        ? 'bg-[#5ce0a0] border-[#5ce0a0] text-black'
                        : 'border-white/20 hover:border-white/40'
                    }`}>
                      {checkedSteps[idx] && <HugeiconsIcon icon={CheckIcon} size={12} className="text-black" />}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-mono ${checkedSteps[idx] ? 'text-[#5ce0a0]' : 'text-[#5a5a72]'}`}>
                        BƯỚC {item.step}
                      </span>
                      <h4 className={`text-sm font-semibold transition-colors ${checkedSteps[idx] ? 'text-[#5ce0a0]' : 'text-slate-200'}`}>
                        {item.title}
                      </h4>
                      <HugeiconsIcon icon={item.icon} size={13} className="ml-auto text-[#5a5a72]" />
                    </div>
                    <p className="text-xs text-[#9d9db5] mt-1 leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Checklist CTA */}
            <div className="mt-6 flex justify-between items-center">
              <button
                onClick={() => setCheckedSteps([true, true, true, true, true])}
                className="text-xs font-mono text-[#7c8aff] hover:text-white transition-colors flex items-center gap-1.5 bg-transparent border-none cursor-pointer"
              >
                <HugeiconsIcon icon={ClipboardListIcon} size={14} className="text-[#7c8aff]" />
                <span>Chọn tất cả</span>
              </button>

              <button
                onClick={() => setCheckedSteps([false, false, false, false, false])}
                className="text-xs font-mono text-[#5a5a72] hover:text-white transition-colors flex items-center gap-1.5 bg-transparent border-none cursor-pointer"
              >
                <HugeiconsIcon icon={ReloadIcon} size={14} className="text-[#5a5a72]" />
                <span>Reset</span>
              </button>
            </div>

          </div>
        </section>

        {/* SECTION V: INTERACTIVE CAPSTONE PLANNER */}
        <section id="planner" className="max-w-4xl mx-auto px-6 py-20 border-b border-white/[0.06]">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono text-[#ffcb6b] uppercase tracking-widest block mb-2">05 / Bài tốt nghiệp</span>
            <h2 className="text-3xl font-serif text-white mb-4">Lập Hồ sơ Đề án Sáng tác Tốt nghiệp</h2>
            <p className="text-sm text-[#9d9db5]">
              Yêu cầu tốt nghiệp là xây dựng một bộ ảnh 12 tấm có tính thống nhất tuyệt đối. Hãy dùng trình lập đề cương dưới đây để phác thảo ý tưởng của bạn.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            
            {/* Planner Form */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md">
              <h3 className="text-base font-serif text-slate-200 mb-6 flex items-center gap-2">
                <HugeiconsIcon icon={Settings01Icon} size={15} className="text-amber-500" />
                <span>Trình lập đề cương dự án</span>
              </h3>

              <form onSubmit={handleGenerateBrief} className="flex flex-col gap-4">
                
                {/* Project Title */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono text-[#9d9db5] uppercase">Tên bộ ảnh / Project Title</label>
                  <input
                    type="text"
                    required
                    placeholder="ví dụ: Dư âm phố đêm, Vệt nắng muộn..."
                    value={plannerBrief.title}
                    onChange={(e) => setPlannerBrief({ ...plannerBrief, title: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-black/40 border border-white/10 text-sm text-slate-100 placeholder:text-white/20 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50"
                  />
                </div>

                {/* Intent Statement */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono text-[#9d9db5] uppercase">Ý định nghệ thuật / Intent (1 câu)</label>
                  <textarea
                    required
                    rows={2}
                    placeholder="Bộ ảnh này muốn người xem cảm nhận được nỗi sầu muộn hay sự bình yên ở không gian nào?..."
                    value={plannerBrief.intent}
                    onChange={(e) => setPlannerBrief({ ...plannerBrief, intent: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-black/40 border border-white/10 text-sm text-slate-100 placeholder:text-white/20 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 resize-none"
                  />
                </div>

                {/* Visual Rules Selection (Select max 3) */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono text-[#9d9db5] uppercase">
                    Quy tắc thị giác chủ đạo (Chọn tối đa 3)
                  </label>
                  <div className="flex flex-col gap-1.5 max-h-[160px] overflow-y-auto pr-2 custom-scrollbar">
                    {capstoneVisualRulesOptions.map((rule) => {
                      const isSelected = plannerBrief.visualRules.includes(rule);
                      return (
                        <button
                          type="button"
                          key={rule}
                          onClick={() => handleRuleToggle(rule)}
                          className={`w-full px-3 py-2 rounded text-left text-xs transition-all border flex justify-between items-center ${
                            isSelected
                              ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                              : 'bg-black/20 border-white/[0.04] text-[#9d9db5] hover:bg-white/[0.02] hover:text-white'
                          }`}
                        >
                          <span>{rule}</span>
                          {isSelected && <HugeiconsIcon icon={CheckIcon} size={12} className="text-amber-400" />}
                        </button>
                      );
                    })}
                  </div>
                  <span className="text-[10px] text-[#5a5a72] font-mono">
                    Đã chọn: {plannerBrief.visualRules.length}/3 quy tắc.
                  </span>
                </div>

                {/* Sequence plan */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono text-[#9d9db5] uppercase">Sắp xếp nhịp kể chuyện / Sequence Notes</label>
                  <textarea
                    rows={2}
                    placeholder="Mô tả ngắn cách sắp xếp nhịp (ví dụ: mở cảnh rộng, kết cảnh bằng điểm nhấn tiêu điểm cực cận)..."
                    value={plannerBrief.sequenceNotes}
                    onChange={(e) => setPlannerBrief({ ...plannerBrief, sequenceNotes: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-black/40 border border-white/10 text-sm text-slate-100 placeholder:text-white/20 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={!plannerBrief.title || !plannerBrief.intent || plannerBrief.visualRules.length === 0}
                  className="w-full mt-4 py-3 rounded-lg bg-[#d59a54] hover:bg-amber-500 disabled:bg-white/10 disabled:text-white/20 text-black font-semibold text-sm transition-all shadow-lg shadow-amber-950/10 cursor-pointer disabled:cursor-not-allowed"
                >
                  Tạo Artist Brief Đề án
                </button>

              </form>
            </div>

            {/* Brief Render Output preview */}
            <div className="relative h-full min-h-[350px] md:min-h-[440px] rounded-2xl border border-dashed border-white/10 bg-white/[0.01] flex flex-col items-center justify-center p-6 text-center">
              
              {!briefGenerated ? (
                <>
                  <div className="w-12 h-12 rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center text-[#5a5a72] mb-4">
                    <HugeiconsIcon icon={File01Icon} size={20} className="text-[#5a5a72]" />
                  </div>
                  <h4 className="text-sm font-semibold text-slate-200 mb-1">Đang đợi thông tin</h4>
                  <p className="text-xs text-[#9d9db5] max-w-xs leading-relaxed">
                    Vui lòng điền thông tin đề án tốt nghiệp ở bảng bên trái để xuất bản Artist Brief chính thức.
                  </p>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full text-left p-6 rounded-xl border border-amber-500/30 bg-black/50 backdrop-blur-lg relative overflow-hidden"
                >
                  {/* Decorative badge print */}
                  <div className="absolute top-0 right-0 transform translate-x-10 translate-y-2 rotate-45 border-y border-amber-500/30 px-10 py-1 bg-amber-500/10 text-[7px] font-mono text-amber-500 tracking-widest text-center">
                    GRADUATION PROJECT BRIEF
                  </div>

                  <div className="flex items-center gap-1.5 text-[9px] font-mono text-amber-500 mb-4">
                    <HugeiconsIcon icon={Compass01Icon} size={11} className="text-amber-500" />
                    <span>ARTIST STATEMENT & PRODUCTION BRIEF</span>
                  </div>

                  <h3 className="text-2xl font-serif text-white font-semibold border-b border-white/[0.08] pb-4 mb-4">
                    {plannerBrief.title}
                  </h3>

                  <div className="flex flex-col gap-4">
                    <div>
                      <span className="text-[10px] font-mono text-white/40 block uppercase">1. Tuyên ngôn nghệ thuật (Intent)</span>
                      <p className="text-xs text-[#f0e6d2] italic font-serif leading-relaxed mt-1">
                        &ldquo;{plannerBrief.intent}&rdquo;
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-white/40 block uppercase">2. Quy tắc thị giác chủ đạo</span>
                      <ul className="list-disc list-inside text-xs text-[#9d9db5] mt-1.5 flex flex-col gap-1">
                        {plannerBrief.visualRules.map((rule, i) => (
                          <li key={i} className="leading-relaxed">
                            <span className="text-slate-200">{rule.split('(')[0]}</span>
                            {rule.includes('(') && (
                              <span className="text-[10px] text-amber-500/70 block ml-5">
                                ({rule.split('(')[1]}
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {plannerBrief.sequenceNotes && (
                      <div>
                        <span className="text-[10px] font-mono text-white/40 block uppercase">3. Nhịp điệu & Sắp thứ tự ảnh (Sequence)</span>
                        <p className="text-xs text-[#9d9db5] leading-relaxed mt-1">
                          {plannerBrief.sequenceNotes}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-white/[0.08] pt-4 mt-6 flex justify-between items-center text-[9px] font-mono text-[#5a5a72]">
                    <span>STATUS: APPROVED FOR SHOOTING</span>
                    <button
                      onClick={() => setBriefGenerated(false)}
                      className="text-amber-500 hover:text-white transition-colors bg-transparent border-none cursor-pointer font-semibold uppercase flex items-center gap-1"
                    >
                      <HugeiconsIcon icon={ReloadIcon} size={10} className="text-amber-500" />
                      <span>Đổi thiết lập</span>
                    </button>
                  </div>
                </motion.div>
              )}

            </div>

          </div>
        </section>

        {/* SECTION VI: FINALE & CERTIFICATE TRIGGER */}
        <section id="finale" className="relative max-w-4xl mx-auto px-6 py-24 text-center overflow-hidden">
          
          {/* Circular light halo in center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-amber-500/[0.03] blur-[80px] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center gap-6">
            <span className="text-xs font-mono text-amber-500 uppercase tracking-widest">
              The course closes, the practice begins
            </span>
            
            <h2 className="text-3xl md:text-5xl font-serif text-white max-w-2xl leading-tight">
              Biết ngôn ngữ thị giác để nhìn
              <em className="block not-italic text-[#d59a54] font-serif font-light italic mt-1">thế giới có trách nhiệm và chiều sâu hơn.</em>
            </h2>

            <p className="text-sm text-[#9d9db5] max-w-xl leading-relaxed mb-4">
              Sau 19 chương học, mục tiêu cuối cùng không phải là làm ảnh &ldquo;đúng công thức&rdquo;. Mục tiêu thực sự là biết rõ mình đang nói gì, vì sao dùng kỹ thuật đó, và nó tác động lên tâm lý người xem như thế nào.
            </p>

            <button
              onClick={toggleRead}
              className={`inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-sm transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer border ${
                isRead
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500/20'
                  : 'bg-[#d59a54] border-[#d59a54] text-black hover:bg-amber-500 shadow-lg shadow-amber-950/20'
              }`}
            >
              <span>{isRead ? 'Xem Chứng nhận Tốt nghiệp' : 'Đánh dấu hoàn thành khóa học'}</span>
              <span className="flex items-center justify-center">
                <HugeiconsIcon icon={isRead ? Award01Icon : BookOpen01Icon} size={18} />
              </span>
            </button>
          </div>
        </section>

        {/* NAVIGATION PREV/NEXT LESSON */}
        <nav className="max-w-7xl mx-auto border-t border-white/[0.06] grid grid-cols-1 md:grid-cols-2 text-sm" aria-label="Lesson navigation">
          <Link href="/phan-cap" className="flex items-center justify-between p-8 border-b md:border-b-0 md:border-r border-white/[0.06] hover:bg-white/[0.01] transition-all group">
            <div className="flex gap-4 items-center">
              <HugeiconsIcon icon={ArrowLeft01Icon} size={16} className="text-[#5a5a72] group-hover:text-white transition-colors" />
              <div className="text-left">
                <span className="text-[10px] font-mono text-[#5a5a72] block uppercase tracking-wider">Bài trước / HA18</span>
                <span className="text-base font-semibold text-slate-200 mt-1 block">Phân cấp & Điểm nhấn</span>
              </div>
            </div>
          </Link>

          <Link href="/khoa-hoc" className="flex items-center justify-between p-8 hover:bg-white/[0.01] transition-all group text-right">
            <div className="flex gap-4 items-center ml-auto">
              <div className="text-right">
                <span className="text-[10px] font-mono text-[#5a5a72] block uppercase tracking-wider">Khép hành trình / Home</span>
                <span className="text-base font-semibold text-slate-200 mt-1 block">Tổng quan khóa học</span>
              </div>
              <HugeiconsIcon icon={ArrowRight01Icon} size={16} className="text-[#5a5a72] group-hover:text-white transition-colors" />
            </div>
          </Link>
        </nav>

        {/* FOOTER */}
        <footer className="max-w-7xl mx-auto border-t border-white/[0.06] py-8 px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-[#5a5a72]">
          <span>KHÓA HỌC NGÔN NGỮ THỊ GIÁC · HOÀN THÀNH</span>
          <span className="flex items-center gap-1 text-[#f0a060]"><HugeiconsIcon icon={SparklesIcon} size={12} className="text-[#f0a060]" /> BÀI 19 / 19 BÀI HỌC</span>
        </footer>

        {/* DIGITAL GRADUATION CERTIFICATE MODAL */}
        <AnimatePresence>
          {showCert && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-[680px] p-1 rounded-2xl bg-gradient-to-br from-amber-500/40 via-amber-900/10 to-indigo-900/30 shadow-2xl relative"
              >
                {/* Certificate Core Panel */}
                <div className="w-full bg-[#0c0c10] rounded-[14px] p-8 md:p-12 relative overflow-hidden border border-white/5 text-center">
                  
                  {/* Decorative elements */}
                  <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_center,rgba(213,154,84,0.15),transparent_60%)]" />
                  
                  {/* Certificate borders */}
                  <div className="absolute inset-4 border border-amber-500/20 rounded-lg pointer-events-none" />
                  <div className="absolute inset-[20px] border border-dashed border-amber-500/10 rounded-md pointer-events-none" />

                  {/* Corner ornaments */}
                  <div className="absolute top-6 left-6 w-4 h-4 border-t border-l border-amber-500/60" />
                  <div className="absolute top-6 right-6 w-4 h-4 border-t border-r border-amber-500/60" />
                  <div className="absolute bottom-6 left-6 w-4 h-4 border-b border-l border-amber-500/60" />
                  <div className="absolute bottom-6 right-6 w-4 h-4 border-b border-r border-amber-500/60" />

                  {/* Seal header */}
                  <div className="relative z-10 flex flex-col items-center gap-1.5 mb-6">
                    <div className="w-14 h-14 rounded-full border border-amber-500/40 bg-amber-500/5 flex items-center justify-center text-amber-400">
                      <HugeiconsIcon icon={Award01Icon} size={32} className="text-amber-400" />
                    </div>
                    <span className="text-[10px] font-mono text-amber-500 tracking-[0.25em] uppercase mt-2">CERTIFICATE OF COMPLETION</span>
                  </div>

                  {/* Main text */}
                  <div className="relative z-10">
                    <h3 className="text-3xl md:text-4xl font-serif text-[#f0e6d2] font-semibold leading-tight mb-2">
                      CHỨNG NHẬN TỐT NGHIỆP
                    </h3>
                    <p className="text-xs text-[#9d9db5] font-mono tracking-wider uppercase mb-8">
                      KHÓA HỌC NGÔN NGỮ THỊ GIÁC & TƯ DUY NHẤT QUÁN
                    </p>

                    {/* Student Name Input */}
                    <div className="max-w-xs mx-auto mb-6 border-b border-dashed border-amber-500/40 pb-1.5">
                      <input
                        type="text"
                        placeholder="Nhập họ và tên của bạn..."
                        value={certName}
                        onChange={(e) => setCertName(e.target.value)}
                        className="w-full text-center bg-transparent border-none text-xl font-serif text-[#d59a54] placeholder:text-amber-500/35 focus:outline-none italic"
                      />
                    </div>

                    <p className="text-xs text-[#9d9db5] max-w-md mx-auto leading-relaxed mb-8">
                      Đã hoàn thành xuất sắc toàn diện 19 chương học của chương trình học chính thức, làm chủ hệ thống ngôn ngữ thị giác đa tầng và đạt tiêu chuẩn đánh giá chuyên môn nhiếp ảnh nghệ thuật.
                    </p>
                  </div>

                  {/* Signatures */}
                  <div className="relative z-10 grid grid-cols-2 gap-8 max-w-md mx-auto border-t border-white/[0.08] pt-6 mb-2">
                    <div className="flex flex-col items-center">
                      <span className="text-[11px] font-serif text-white italic font-medium">Antigravity Visuals</span>
                      <span className="text-[9px] font-mono text-[#5a5a72] mt-1.5 uppercase">BAN ĐẠO DIỄN NGHỆ THUẬT</span>
                    </div>

                    <div className="flex flex-col items-center">
                      <span className="text-[11px] font-mono text-amber-500/80">#VISUAL-UNIFIED-19</span>
                      <span className="text-[9px] font-mono text-[#5a5a72] mt-2 uppercase">MÃ SỐ KIỂM ĐỊNH</span>
                    </div>
                  </div>

                  {/* Close button */}
                  <button
                    onClick={() => setShowCert(false)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/5 text-[#5a5a72] hover:text-white transition-colors cursor-pointer border-none bg-transparent"
                  >
                    ✕
                  </button>

                  <div className="mt-8 relative z-10 flex gap-4 justify-center">
                    <button
                      onClick={() => setShowCert(false)}
                      className="px-6 py-2 rounded-full border border-white/10 hover:bg-white/5 text-xs font-mono text-[#9d9db5] hover:text-white transition-colors cursor-pointer bg-transparent"
                    >
                      ĐÓNG
                    </button>
                    {certName && (
                      <button
                        onClick={() => {
                          alert(`Chúc mừng ${certName} đã hoàn thành khóa học!`);
                        }}
                        className="px-6 py-2 rounded-full bg-amber-500 text-black text-xs font-mono font-semibold hover:bg-amber-400 transition-colors cursor-pointer border-none"
                      >
                        XÁC NHẬN TÊN & LƯU
                      </button>
                    )}
                  </div>

                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </article>
    </DocsLayout>
  );
}

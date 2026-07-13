import { useState, useEffect } from 'react';
import { useLocation, Link } from 'wouter';
import { motion } from 'framer-motion';
import {
  Camera,
  Palette,
  Layers,
  Grid3X3,
  Sparkles,
  Check,
  Compass,
} from 'lucide-react';

interface Lesson {
  num: number;
  path: string;
  title: string;
  desc: string;
}

interface Chapter {
  number: string;
  title: string;
  desc: string;
  color: string; // text color class
  bgColor: string; // background color class
  borderColor: string; // border color class
  glowColor: string; // rgba glow color string
  icon: React.ComponentType<any>;
  lessons: Lesson[];
}

const chaptersData: Chapter[] = [
  {
    number: '01',
    title: 'Nền tảng hình ảnh',
    desc: 'Hiểu sức mạnh, mục đích và trách nhiệm văn hóa của người tạo hình ảnh.',
    color: 'text-[#7c8aff]',
    bgColor: 'bg-[#7c8aff]/[0.02]',
    borderColor: 'border-[#7c8aff]/20',
    glowColor: 'rgba(124, 138, 255, 0.25)',
    icon: Camera,
    lessons: [
      { num: 1, path: '/', title: 'Sức mạnh hình ảnh', desc: 'Hiểu cơ chế thần kinh và cách ứng dụng sức mạnh truyền tải của hình ảnh.' },
      { num: 2, path: '/muc-dich', title: 'Mục đích hình ảnh', desc: 'Định hình mục tiêu cốt lõi và ý đồ truyền đạt của tác phẩm.' },
      { num: 3, path: '/bieu-tuong', title: 'Biểu tượng văn hóa', desc: 'Giải mã cách lồng ghép các biểu tượng văn hóa và ẩn dụ thị giác.' },
    ],
  },
  {
    number: '02',
    title: 'Ngôn ngữ thị giác',
    desc: 'Làm chủ đường nét, hình dạng, không gian, ánh sáng, màu sắc và tương phản.',
    color: 'text-[#ffcb6b]',
    bgColor: 'bg-[#ffcb6b]/[0.02]',
    borderColor: 'border-[#ffcb6b]/20',
    glowColor: 'rgba(255, 203, 107, 0.25)',
    icon: Palette,
    lessons: [
      { num: 4, path: '/duong-net', title: 'Đường nét cảm xúc', desc: 'Dẫn dắt mắt người xem di chuyển qua hướng đi của đường nét.' },
      { num: 5, path: '/hinh-dang', title: 'Hình dạng hình khối', desc: 'Sử dụng hình tròn, vuông, tam giác để khơi gợi trạng thái tâm lý.' },
      { num: 6, path: '/khong-gian', title: 'Không gian âm dương', desc: 'Thiết lập mối quan hệ giữa positive space và negative space.' },
      { num: 7, path: '/anh-sang', title: 'Ánh sáng bóng tối', desc: 'Điêu khắc khối, tạo bóng đổ và định hình kết cấu thế giới.' },
      { num: 8, path: '/mau-sac', title: 'Màu sắc cảm xúc', desc: 'Ứng dụng bánh xe màu sắc để khơi gợi trạng thái tâm lý sâu sắc.' },
      { num: 9, path: '/tuong-phan', title: 'Tương phản màu sắc', desc: 'Tạo lực kéo thị giác mạnh mẽ qua tương phản sáng tối, nóng lạnh.' },
    ],
  },
  {
    number: '03',
    title: 'Chất liệu & Tỷ lệ',
    desc: 'Biến bề mặt, kích thước và bầu không khí thành ngôn ngữ cảm xúc.',
    color: 'text-[#22c55e]',
    bgColor: 'bg-[#22c55e]/[0.02]',
    borderColor: 'border-[#22c55e]/20',
    glowColor: 'rgba(34, 197, 94, 0.25)',
    icon: Layers,
    lessons: [
      { num: 10, path: '/chat-lieu', title: 'Chất liệu bề mặt', desc: 'Đánh thức xúc giác người xem qua độ mịn, thô, gai góc của bề mặt.' },
      { num: 11, path: '/kich-thuoc', title: 'Kích thước tỷ lệ', desc: 'So sánh kích thước để nhấn mạnh sự vĩ đại hay bé nhỏ.' },
      { num: 12, path: '/bau-khong-khi', title: 'Bầu không khí', desc: 'Tổng hòa sương mù, khói, độ ẩm để tạo môi trường cảm xúc.' },
    ],
  },
  {
    number: '04',
    title: 'Bố cục & Góc nhìn',
    desc: 'Tổ chức khung hình, vị trí máy ảnh, tiêu điểm và chiều sâu có chủ đích.',
    color: 'text-[#a855f7]',
    bgColor: 'bg-[#a855f7]/[0.02]',
    borderColor: 'border-[#a855f7]/20',
    glowColor: 'rgba(168, 85, 247, 0.25)',
    icon: Grid3X3,
    lessons: [
      { num: 13, path: '/bo-cuc', title: 'Bố cục khung hình', desc: 'Sắp xếp trật tự các vật thể trong khung để tạo sự mạch lạc.' },
      { num: 14, path: '/goc-chup', title: 'Góc chụp camera', desc: 'Thay đổi góc cao, thấp, ngang để thiết lập mối quan hệ quyền lực.' },
      { num: 15, path: '/tieu-diem', title: 'Tiêu điểm độ sâu', desc: 'Điều phối độ nông sâu trường ảnh để cô lập chủ thể.' },
    ],
  },
  {
    number: '05',
    title: 'Nguyên tắc vận hành',
    desc: 'Kết nối nhịp điệu, cân bằng, phân cấp và thống nhất thành một visual voice.',
    color: 'text-[#fb7185]',
    bgColor: 'bg-[#fb7185]/[0.02]',
    borderColor: 'border-[#fb7185]/20',
    glowColor: 'rgba(251, 113, 133, 0.25)',
    icon: Sparkles,
    lessons: [
      { num: 16, path: '/nhip-dieu', title: 'Nhịp điệu thị giác', desc: 'Lặp đi lặp lại các yếu tố thị giác để tạo giai điệu hình ảnh.' },
      { num: 17, path: '/can-bang', title: 'Cân bằng tĩnh động', desc: 'Phân bổ trọng lượng thị giác để tạo cân bằng đối xứng hay bất đối xứng.' },
      { num: 18, path: '/phan-cap', title: 'Phân cấp điểm nhấn', desc: 'Thiết lập yếu tố chính, phụ để dẫn dắt tuyến đọc ảnh mạch lạc.' },
      { num: 19, path: '/tinh-thong-nhat', title: 'Tính thống nhất', desc: 'Tổng hợp toàn bộ ngôn ngữ thị giác thành một tác phẩm hoàn chỉnh.' },
    ],
  },
];

interface CourseTreeProps {
  variant?: 'embed' | 'modal';
  onNodeClick?: () => void;
}

export function CourseTree({ variant = 'embed', onNodeClick }: CourseTreeProps) {
  const [location] = useLocation();
  const [readPages, setReadPages] = useState<string[]>([]);

  useEffect(() => {
    try {
      const read = JSON.parse(localStorage.getItem('alpha-doc-read') || '[]');
      setReadPages(read);
    } catch {
      // Ignored
    }
  }, [location]);

  const isRead = (path: string) => readPages.includes(path);
  const isActive = (path: string) => location === path;

  return (
    <div className={`w-full ${variant === 'modal' ? 'px-1 max-h-[80vh] overflow-y-auto pr-2' : ''}`}>
      {/* Visual Roadmap container */}
      <div className="relative flex flex-col gap-10 pl-6 md:pl-10">
        
        {/* Timeline main connector line (SVG background) */}
        <div 
          className="absolute left-[19px] md:left-[27px] top-6 bottom-6 w-0.5"
          style={{
            background: 'linear-gradient(to bottom, #1e1e2d 0%, #312e45 30%, #1e1e2d 100%)',
          }}
        />

        {chaptersData.map((chapter, chapIndex) => {
          const ChapterIcon = chapter.icon;
          const completedCount = chapter.lessons.filter(l => isRead(l.path)).length;
          const totalCount = chapter.lessons.length;
          const isChapterActive = chapter.lessons.some(l => isActive(l.path));

          return (
            <motion.div
              key={chapter.number}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: chapIndex * 0.08 }}
              className="relative flex flex-col gap-4"
            >
              {/* Chapter indicator node (large circle on timeline) */}
              <div 
                className={`absolute left-[-20px] md:left-[-28px] top-0 w-10 h-10 md:w-14 md:h-14 rounded-full border-2 bg-[#09090e] z-10 flex items-center justify-center transition-all duration-300 ${
                  isChapterActive 
                    ? `border-white ${chapter.color}` 
                    : completedCount === totalCount
                      ? 'border-[#22c55e] text-[#22c55e]'
                      : 'border-white/10 text-white/40'
                }`}
                style={{
                  boxShadow: isChapterActive ? `0 0 15px ${chapter.glowColor}` : 'none',
                }}
              >
                <ChapterIcon size={variant === 'modal' ? 16 : 20} />
              </div>

              {/* Chapter Content Area */}
              <div className="pl-8 md:pl-12">
                
                {/* Chapter Title Panel */}
                <div className="mb-4">
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-mono tracking-widest uppercase ${chapter.color}`}>
                      Chặng {chapter.number}
                    </span>
                    <span className="text-[11px] text-[#5a5a72] font-mono">
                      ({completedCount}/{totalCount} hoàn thành)
                    </span>
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-slate-100 mt-0.5 font-serif">
                    {chapter.title}
                  </h3>
                  {variant === 'embed' && (
                    <p className="text-xs text-[#7e7e9a] mt-1 max-w-xl font-sans">
                      {chapter.desc}
                    </p>
                  )}
                </div>

                {/* Lesson Nodes Grid */}
                <div className={`grid gap-3 ${variant === 'embed' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                  {chapter.lessons.map((lesson) => {
                    const active = isActive(lesson.path);
                    const completed = isRead(lesson.path);

                    return (
                      <Link 
                        key={lesson.num} 
                        href={lesson.path}
                        onClick={onNodeClick}
                        className={`group relative p-4 rounded-xl border transition-all duration-300 text-left cursor-pointer select-none flex flex-col justify-between overflow-hidden active:scale-[0.98] active:translate-y-[0.5px] ${
                          active 
                            ? 'bg-white/[0.04] border-white/40' 
                            : completed
                              ? 'bg-white/[0.01] border-[#22c55e]/20 hover:border-[#22c55e]/40'
                              : 'bg-white/[0.01] border-white/5 hover:border-white/10'
                        }`}
                        style={{
                          boxShadow: active ? `0 4px 20px ${chapter.glowColor}` : 'none'
                        }}
                      >
                        {/* Status bar top */}
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <span className={`font-mono text-xs font-semibold ${
                            active 
                              ? chapter.color 
                              : completed 
                                ? 'text-[#22c55e]' 
                                : 'text-white/30'
                          }`}>
                            Bài {String(lesson.num).padStart(2, '0')}
                          </span>
                          
                          {completed && (
                            <span className="w-4 h-4 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/20 flex items-center justify-center text-[#22c55e]">
                              <Check size={9} strokeWidth={3} />
                            </span>
                          )}
                          {active && !completed && (
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                          )}
                        </div>

                        {/* Lesson Info */}
                        <div>
                          <h4 className="text-xs md:text-sm font-semibold text-slate-100 group-hover:text-white transition-colors">
                            {lesson.title}
                          </h4>
                          {variant === 'embed' && (
                            <p className="text-[11px] text-[#5a5a72] mt-1 line-clamp-2 leading-relaxed">
                              {lesson.desc}
                            </p>
                          )}
                        </div>

                        {/* Ambient node glow effect */}
                        {active && (
                          <div 
                            className="absolute -right-10 -bottom-10 w-24 h-24 rounded-full blur-2xl opacity-40 pointer-events-none"
                            style={{ backgroundColor: chapter.color.includes('7c8aff') ? '#7c8aff' : chapter.color.includes('ffcb6b') ? '#ffcb6b' : chapter.color.includes('22c55e') ? '#22c55e' : chapter.color.includes('a855f7') ? '#a855f7' : '#fb7185' }}
                          />
                        )}
                      </Link>
                    );
                  })}
                </div>

              </div>
            </motion.div>
          );
        })}

        {/* Completion Milestone Node */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="relative flex items-center gap-4 pl-8 md:pl-12 mt-4"
        >
          {/* Milestone Circle on timeline */}
          <div className="absolute left-[-20px] md:left-[-28px] top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 rounded-full border-2 border-white/5 bg-[#09090e] z-10 flex items-center justify-center text-white/20">
            <Compass size={18} />
          </div>
          <div>
            <span className="text-[10px] font-mono tracking-widest text-[#5a5a72] uppercase block">
              Cột mốc
            </span>
            <Link 
              href="/tong-ket"
              onClick={onNodeClick}
              className={`text-sm font-medium font-serif mt-0.5 block hover:underline active:scale-[0.98] transition-transform ${
                location === '/tong-ket' ? 'text-white' : 'text-[#7e7e9a] hover:text-white'
              }`}
            >
              Bản đồ Tổng kết khóa học &rarr;
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}



import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useLocation } from 'wouter';
import { Link } from 'wouter';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import {
  Menu,
  Search,
  Camera,
  Sparkles,
  ChevronDown,
  Home,
  ArrowUp,
  X,
  FileSearch,
  ArrowLeft,
  ArrowRight,
  Type,
  Palette,
  Layers,
  Clock,
  PenTool,
  Sun,
  Circle,
  Maximize2,
  Wind,
  Scale,
  Zap,
  Target,
  Grid3X3,
  Focus,
  Music,
  Gauge,
  Diamond,
  Cpu,
  Compass,
} from 'lucide-react';
import { CourseTree } from './course-tree';
import LessonInteractiveTools from './lesson-interactive-tools';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
interface TocSection {
  id: string;
  label: string;
  level: number;
}

interface DocsLayoutProps {
  children: React.ReactNode;
  tocSections: TocSection[];
}

/* ------------------------------------------------------------------ */
/*  Search Data                                                        */
/* ------------------------------------------------------------------ */
const searchData = [
  { title: 'Tổng quan khóa học', href: '/khoa-hoc', tags: ['khóa học', 'lộ trình', 'ngôn ngữ thị giác', 'bắt đầu'] },
  { title: '1. Sức mạnh của hình ảnh', href: '/', tags: ['hình ảnh', 'sức mạnh', 'thần kinh', 'triết học', 'post-truth', 'visual literacy', 'semiotics', 'punctum'] },
  { title: '2. Mục đích của hình ảnh', href: '/muc-dich', tags: ['mục đích', 'documentary', 'communicative', 'evocative', 'persuasive', 'exploratory', 'pre-visualization'] },
  { title: '3. Biểu tượng văn hóa', href: '/bieu-tuong', tags: ['biểu tượng', 'văn hóa', 'barthes', 'studium', 'punctum', 'myth', 'màu sắc', 'colonialism'] },
  { title: '4. Đường nét cảm xúc', href: '/duong-net', tags: ['đường nét', 'cảm xúc', 'line', 'contour', 'gesture', 'leading lines', 's-curve', 'composition'] },
  { title: '5. Hình dạng hình khối', href: '/hinh-dang', tags: ['hình dạng', 'hình khối', 'shape', 'form', 'geometry', 'circle', 'triangle', 'square'] },
  { title: '6. Không gian âm dương', href: '/khong-gian', tags: ['không gian', 'âm dương', 'positive space', 'negative space', 'figure-ground', 'depth', 'foreground'] },
  { title: '7. Ánh sáng bóng tối', href: '/anh-sang', tags: ['ánh sáng', 'bóng tối', 'light', 'shadow', 'direction', 'quality', 'golden hour', 'chiaroscuro'] },
  { title: '8. Màu sắc', href: '/mau-sac', tags: ['màu sắc', 'color', 'wheel', 'harmony', 'temperature', 'saturation', 'hue', 'psychology'] },
  { title: '9. Tương phản màu sắc', href: '/tuong-phan', tags: ['tương phản', 'màu sắc', 'contrast', 'complementary', 'simultaneous', 'vibration', 'color contrast'] },
  { title: '10. Chất liệu bề mặt', href: '/chat-lieu', tags: ['chất liệu', 'bề mặt', 'texture', 'pattern', 'tactile', 'visual texture', 'detail', 'macro'] },
  { title: '11. Kích thước tỷ lệ', href: '/kich-thuoc', tags: ['kích thước', 'tỷ lệ', 'scale', 'proportion', 'golden ratio', 'rule of thirds', 'perspective', 'reference'] },
  { title: '12. Bầu không khí & Cảm xúc', href: '/bau-khong-khi', tags: ['bầu không khí', 'cảm xúc', 'atmosphere', 'stimmung', 'visual voice', 'nội hóa', 'khoảnh khắc quyết định'] },
  { title: '13. Bố cục', href: '/bo-cuc', tags: ['bố cục', 'composition', 'rule of thirds', 'golden ratio', 'framing', 'balance', 'dynamic tension'] },
  { title: '14. Góc chụp', href: '/goc-chup', tags: ['góc chụp', 'perspective', 'eye level', 'low angle', 'high angle', 'dutch angle', 'bird eye'] },
  { title: '15. Tiêu điểm & Độ sâu', href: '/tieu-diem', tags: ['tiêu điểm', 'độ sâu', 'focus', 'depth of field', 'aperture', 'bokeh', 'sharpness', 'f-stop'] },
  { title: '16. Nhịp điệu thị giác', href: '/nhip-dieu', tags: ['nhịp điệu', 'rhythm', 'pattern', 'repetition', 'visual flow', 'movement', 'beat'] },
  { title: '17. Cân bằng Tĩnh & Động', href: '/can-bang', tags: ['cân bằng', 'balance', 'tĩnh', 'động', 'symmetry', 'asymmetry', 'visual weight', 'tension', 'stability'] },
  { title: '18. Phân cấp & Điểm nhấn', href: '/phan-cap', tags: ['phân cấp', 'điểm nhấn', 'hierarchy', 'emphasis', 'focal point', 'dominant', 'subordinate'] },
  { title: '19. Tính Thống Nhất', href: '/tinh-thong-nhat', tags: ['thống nhất', 'unity', 'cohesion', 'harmony', 'gestalt', 'wholeness', 'integration'] },
  { title: 'Bản đồ ngôn ngữ thị giác', href: '/tong-ket', tags: ['tổng kết', 'bản đồ', 'roadmap', 'insight'] },
  { title: 'AI Phân tích Ảnh', href: '/phan-tich-anh', tags: ['phân tích', 'ảnh', 'ai', 'mentor', 'thẩm định', 'critique', 'chẩn đoán'] },
];

/* ------------------------------------------------------------------ */
/*  Page Navigation Config                                             */
/* ------------------------------------------------------------------ */
const pageNavConfig: { href: string; title: string; desc: string; num: number }[] = [
  { href: '/', title: '1. Sức mạnh của hình ảnh', desc: 'Nền tảng hình ảnh', num: 1 },
  { href: '/muc-dich', title: '2. Mục đích của hình ảnh', desc: 'Nền tảng hình ảnh', num: 2 },
  { href: '/bieu-tuong', title: '3. Biểu tượng văn hóa', desc: 'Nền tảng hình ảnh', num: 3 },
  { href: '/duong-net', title: '4. Đường nét cảm xúc', desc: 'Ngôn ngữ thị giác', num: 4 },
  { href: '/hinh-dang', title: '5. Hình dạng hình khối', desc: 'Ngôn ngữ thị giác', num: 5 },
  { href: '/khong-gian', title: '6. Không gian âm dương', desc: 'Ngôn ngữ thị giác', num: 6 },
  { href: '/anh-sang', title: '7. Ánh sáng bóng tối', desc: 'Ngôn ngữ thị giác', num: 7 },
  { href: '/mau-sac', title: '8. Màu sắc', desc: 'Ngôn ngữ thị giác', num: 8 },
  { href: '/tuong-phan', title: '9. Tương phản màu sắc', desc: 'Ngôn ngữ thị giác', num: 9 },
  { href: '/chat-lieu', title: '10. Chất liệu bề mặt', desc: 'Nguyên lý thị giác', num: 10 },
  { href: '/kich-thuoc', title: '11. Kích thước tỷ lệ', desc: 'Nguyên lý thị giác', num: 11 },
  { href: '/bau-khong-khi', title: '12. Bầu không khí & Cảm xúc', desc: 'Nguyên lý thị giác', num: 12 },
  { href: '/bo-cuc', title: '13. Bố cục', desc: 'Bố cục & Góc nhìn', num: 13 },
  { href: '/goc-chup', title: '14. Góc chụp', desc: 'Bố cục & Góc nhìn', num: 14 },
  { href: '/tieu-diem', title: '15. Tiêu điểm & Độ sâu', desc: 'Bố cục & Góc nhìn', num: 15 },
  { href: '/nhip-dieu', title: '16. Nhịp điệu thị giác', desc: 'Nguyên tắc vận hành', num: 16 },
  { href: '/can-bang', title: '17. Cân bằng Tĩnh & Động', desc: 'Nguyên tắc vận hành', num: 17 },
  { href: '/phan-cap', title: '18. Phân cấp & Điểm nhấn', desc: 'Nguyên tắc vận hành', num: 18 },
  { href: '/tinh-thong-nhat', title: '19. Tính Thống Nhất', desc: 'Nguyên tắc vận hành', num: 19 },
  { href: '/phan-tich-anh', title: 'AI Phân tích & Chẩn đoán Ảnh', desc: 'Công cụ thực hành', num: 20 },
];

/* ------------------------------------------------------------------ */
/*  Sidebar Nav Structure                                              */
/* ------------------------------------------------------------------ */
interface NavItem {
  href: string;
  label: string;
  num: number;
}

interface NavGroup {
  key: string;
  icon: React.ReactNode;
  label: string;
  color: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    key: 'nen-tang',
    icon: <Camera size={15} className="text-[#7c8aff]" />,
    label: 'Nền tảng hình ảnh',
    color: '#7c8aff',
    items: [
      { href: '/', label: 'Sức mạnh của hình ảnh', num: 1 },
      { href: '/muc-dich', label: 'Mục đích của hình ảnh', num: 2 },
      { href: '/bieu-tuong', label: 'Biểu tượng văn hóa', num: 3 },
    ],
  },
  {
    key: 'ngon-ngu',
    icon: <Palette size={15} className="text-[#ffcb6b]" />,
    label: 'Ngôn ngữ thị giác',
    color: '#ffcb6b',
    items: [
      { href: '/duong-net', label: 'Đường nét cảm xúc', num: 4 },
      { href: '/hinh-dang', label: 'Hình dạng hình khối', num: 5 },
      { href: '/khong-gian', label: 'Không gian âm dương', num: 6 },
      { href: '/anh-sang', label: 'Ánh sáng bóng tối', num: 7 },
      { href: '/mau-sac', label: 'Màu sắc', num: 8 },
      { href: '/tuong-phan', label: 'Tương phản màu sắc', num: 9 },
    ],
  },
  {
    key: 'chat-lieu',
    icon: <Layers size={15} className="text-emerald-400" />,
    label: 'Nguyên lý thị giác',
    color: '#22c55e',
    items: [
      { href: '/chat-lieu', label: 'Chất liệu bề mặt', num: 10 },
      { href: '/kich-thuoc', label: 'Kích thước tỷ lệ', num: 11 },
      { href: '/bau-khong-khi', label: 'Bầu không khí & Cảm xúc', num: 12 },
    ],
  },
  {
    key: 'bo-cuc',
    icon: <Grid3X3 size={15} className="text-[#a855f7]" />,
    label: 'Bố cục & Góc nhìn',
    color: '#a855f7',
    items: [
      { href: '/bo-cuc', label: 'Bố cục', num: 13 },
      { href: '/goc-chup', label: 'Góc chụp', num: 14 },
      { href: '/tieu-diem', label: 'Tiêu điểm & Độ sâu', num: 15 },
    ],
  },
  {
    key: 'nguyen-ly',
    icon: <Sparkles size={15} className="text-[#fb7185]" />,
    label: 'Nguyên tắc vận hành',
    color: '#fb7185',
    items: [
      { href: '/nhip-dieu', label: 'Nhịp điệu thị giác', num: 16 },
      { href: '/can-bang', label: 'Cân bằng Tĩnh & Động', num: 17 },
      { href: '/phan-cap', label: 'Phân cấp & Điểm nhấn', num: 18 },
      { href: '/tinh-thong-nhat', label: 'Tính Thống Nhất', num: 19 },
    ],
  },
  {
    key: 'cong-cu',
    icon: <Sparkles size={15} className="text-[#38bdf8]" />,
    label: 'Công cụ thực hành',
    color: '#38bdf8',
    items: [
      { href: '/phan-tich-anh', label: 'AI Phân tích Ảnh', num: 20 },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Framer Motion Variants                                             */
/* ------------------------------------------------------------------ */
const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const sidebarVariants: Variants = {
  hidden: { x: -280, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 30,
    },
  },
  exit: {
    x: -280,
    opacity: 0,
    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
  },
};

const searchOverlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

const searchModalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 400,
      damping: 30,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -10,
    transition: { duration: 0.15 },
  },
};

const searchResultVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.04,
      duration: 0.25,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const navGroupVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.03,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
  },
};

const backToTopVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 300, damping: 25 },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: 10,
    transition: { duration: 0.2 },
  },
};

const pageVariants: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -4,
    transition: { duration: 0.2 },
  },
};

/* ------------------------------------------------------------------ */
/*  Progress Ring SVG Component                                        */
/* ------------------------------------------------------------------ */
function ProgressRing({ progress, size = 44, strokeWidth = 2.5, color = '#7c8aff' }: {
  progress: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg
      width={size}
      height={size}
      className="absolute inset-0 -rotate-90"
      style={{ width: size, height: size }}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 300ms cubic-bezier(0.22, 1, 0.36, 1)' }}
      />
    </svg>
  );
}

function HaloLogo({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`halo-logo ${compact ? 'halo-logo-compact' : ''}`} aria-hidden="true">
      <span className="halo-logo-aura" />
      <span className="halo-logo-ring" />
      <span className="halo-logo-core">α</span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function DocsLayout({ children, tocSections }: DocsLayoutProps) {
  const [pathname] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isRoadmapOpen, setIsRoadmapOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    'nen-tang': true,
    'ngon-ngu': true,
    'chat-lieu': true,
    'bo-cuc': true,
    'nguyen-ly': true,
    'cong-cu': true,
  });
  const [activeToc, setActiveToc] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackTop, setShowBackTop] = useState(false);
  const [fontSize, setFontSize] = useState<number>(16);
  const [mounted, setMounted] = useState(false);
  const [visitedPages, setVisitedPages] = useState<string[]>([]);
  const [completedPages, setCompletedPages] = useState<string[]>([]);
  const [selectedSearchIdx, setSelectedSearchIdx] = useState(0);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const articleRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  /* ---- Mount guard ---- */
  useEffect(() => {
    setMounted(true);
  }, []);

  /* ---- Initialize from localStorage ---- */
  useEffect(() => {
    if (!mounted) return;
    try {
      const savedFont = localStorage.getItem('alpha-doc-font-size');
      if (savedFont) setFontSize(Number(savedFont));
      const savedVisited = localStorage.getItem('alpha-doc-visited');
      if (savedVisited) setVisitedPages(JSON.parse(savedVisited));
      const savedCompleted = localStorage.getItem('alpha-doc-read');
      if (savedCompleted) setCompletedPages(JSON.parse(savedCompleted));
      const savedRecent = localStorage.getItem('alpha-doc-recent-searches');
      if (savedRecent) setRecentSearches(JSON.parse(savedRecent));
    } catch {}
  }, [mounted]);

  /* ---- Auto-expand current group ---- */
  useEffect(() => {
    const currentGroup = navGroups.find(g =>
      g.items.some(item => {
        if (item.href === '/') return pathname === '/';
        return pathname === item.href;
      })
    );
    if (currentGroup) {
      setExpandedGroups(prev => ({ ...prev, [currentGroup.key]: true }));
    }
  }, [pathname]);

  /* ---- Track page visit ---- */
  useEffect(() => {
    if (!mounted) return;
    try {
      const current = pathname || '/';
      const savedVisited = localStorage.getItem('alpha-doc-visited');
      const visited: string[] = savedVisited ? JSON.parse(savedVisited) : [];
      if (!visited.includes(current)) {
        const updated = [...visited, current];
        setVisitedPages(updated);
        localStorage.setItem('alpha-doc-visited', JSON.stringify(updated));
      } else {
        setVisitedPages(visited);
      }
      const completed: string[] = JSON.parse(localStorage.getItem('alpha-doc-read') || '[]');
      setCompletedPages(completed);
    } catch {}
  }, [pathname, mounted]);

  /* ---- Apply font size ---- */
  useEffect(() => {
    document.documentElement.style.setProperty('--doc-font-size', `${fontSize}px`);
  }, [fontSize]);

  /* ---- Scroll tracking ---- */
  const handleContentScroll = useCallback((event: React.UIEvent<HTMLDivElement>) => {
    const scrollContainer = event.currentTarget;
    const scrollTop = scrollContainer.scrollTop;
    const docHeight = scrollContainer.scrollHeight - scrollContainer.clientHeight;
    setScrollProgress(docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0);
    setShowBackTop(scrollTop > 400);
  }, []);

  useEffect(() => {
    let lastTop = -1;
    let lastScrollable = -1;

    const syncScrollState = () => {
      const scrollContainer = scrollContainerRef.current;
      if (scrollContainer) {
        const scrollTop = scrollContainer.scrollTop;
        const scrollable = scrollContainer.scrollHeight - scrollContainer.clientHeight;
        if (scrollTop !== lastTop || scrollable !== lastScrollable) {
          lastTop = scrollTop;
          lastScrollable = scrollable;
          setScrollProgress(
            scrollable > 0 ? Math.min((scrollTop / scrollable) * 100, 100) : 0
          );
          setShowBackTop(scrollTop > 400);
        }
      }
    };

    syncScrollState();
    const interval = window.setInterval(syncScrollState, 100);
    return () => window.clearInterval(interval);
  }, []);

  /* ---- IntersectionObserver for TOC ---- */
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    const ids = tocSections.map((s) => s.id);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        for (let i = entries.length - 1; i >= 0; i--) {
          if (entries[i].isIntersecting) {
            setActiveToc(entries[i].target.id);
            break;
          }
        }
      },
      { root: scrollContainer, rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [tocSections]);

  /* ---- IntersectionObserver for Scroll Reveal ---- */
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { root: scrollContainer, threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    revealElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* ---- Inject copy buttons into quote blocks ---- */
  useEffect(() => {
    const quoteBlocks = document.querySelectorAll('.quote-block');
    const cleanupFns: (() => void)[] = [];

    quoteBlocks.forEach((block) => {
      if (block.querySelector('.quote-copy-btn')) return;
      const btn = document.createElement('button');
      btn.className = 'quote-copy-btn';
      btn.textContent = 'Sao chép';
      btn.addEventListener('click', async () => {
        const text = block.textContent || '';
        try {
          await navigator.clipboard.writeText(text.trim());
          btn.textContent = 'Đã sao chép!';
          setTimeout(() => { btn.textContent = 'Sao chép'; }, 2000);
        } catch {
          btn.textContent = 'Lỗi!';
          setTimeout(() => { btn.textContent = 'Sao chép'; }, 2000);
        }
      });
      block.appendChild(btn);
    });

    return () => cleanupFns.forEach((fn) => fn());
  });

  /* ---- Helpers ---- */
  const toggleGroup = useCallback((key: string) => {
    setExpandedGroups((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const scrollToTop = useCallback(() => {
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollContainerRef.current?.scrollTo({ top: 0 });
  }, [pathname]);

  const cycleFontSize = useCallback(() => {
    setFontSize((prev) => {
      const sizes = [14, 16, 18];
      const idx = sizes.indexOf(prev);
      const next = sizes[(idx + 1) % sizes.length];
      try { localStorage.setItem('alpha-doc-font-size', String(next)); } catch {}
      return next;
    });
  }, []);

  const addRecentSearch = useCallback((query: string) => {
    if (!query.trim()) return;
    setRecentSearches(prev => {
      const filtered = prev.filter(s => s !== query.trim());
      const updated = [query.trim(), ...filtered].slice(0, 5);
      try { localStorage.setItem('alpha-doc-recent-searches', JSON.stringify(updated)); } catch {}
      return updated;
    });
  }, []);

  /* ---- Determine active nav item ---- */
  const isActive = useCallback((href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href;
  }, [pathname]);

  /* ---- Determine current page index for mobile bottom bar ---- */
  const currentIdx = pageNavConfig.findIndex((p) =>
    p.href === '/' ? pathname === '/' : pathname === p.href
  );
  const prevPage = currentIdx > 0 ? pageNavConfig[currentIdx - 1] : null;
  const nextPage = currentIdx < pageNavConfig.length - 1 ? pageNavConfig[currentIdx + 1] : null;

  /* ---- Search filtering ---- */
  const searchResults = useMemo(() =>
    searchQuery.trim()
      ? searchData.filter((item) => {
          const q = searchQuery.toLowerCase();
          return (
            item.title.toLowerCase().includes(q) ||
            item.tags.some((tag) => tag.toLowerCase().includes(q))
          );
        })
      : [],
    [searchQuery]
  );

  /* ---- Keyboard shortcuts ---- */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setSidebarOpen(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  /* ---- Search keyboard navigation ---- */
  useEffect(() => {
    if (!searchOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedSearchIdx(prev => Math.min(prev + 1, searchResults.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedSearchIdx(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter' && searchResults.length > 0) {
        e.preventDefault();
        const result = searchResults[selectedSearchIdx];
        if (result) {
          addRecentSearch(searchQuery);
          setSearchOpen(false);
          setSearchQuery('');
          window.location.href = result.href;
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [searchOpen, selectedSearchIdx, searchQuery, searchResults, addRecentSearch]);

  /* ---- Reset selected search index when results change ---- */
  useEffect(() => {
    setSelectedSearchIdx(0);
  }, [searchQuery]);

  /* ---- Determine reading position estimate ---- */
  const getReadingPosition = useCallback(() => {
    const level1Sections = tocSections.filter((s) => s.level === 1);
    if (level1Sections.length === 0) return '';
    const activeIdx = level1Sections.findIndex((s) => s.id === activeToc);
    if (activeIdx === -1) return `Khoảng §1 trong ${level1Sections.length} phần`;
    return `Khoảng §${activeIdx + 1} trong ${level1Sections.length} phần`;
  }, [tocSections, activeToc]);

  /* ---- Count visited pages ---- */
  const readCount = useMemo(() =>
    completedPages.filter((p) => pageNavConfig.some((pg) => pg.href === p)).length,
    [completedPages]
  );

  /* ---- Font size label ---- */
  const fontLabel = fontSize === 14 ? 'Nhỏ' : fontSize === 16 ? 'Vừa' : 'Lớn';

  /* ---- Font size dots indicator ---- */
  const fontDots = fontSize === 14 ? 1 : fontSize === 16 ? 2 : 3;

  /* ================================================================ */
  /*  RENDER                                                           */
  /* ================================================================ */
  return (
    <div className="h-[100dvh] overflow-hidden bg-background text-foreground" suppressHydrationWarning>
      {/* ==================== TOP PROGRESS BAR ==================== */}
      <div
        className="top-progress-bar"
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
      />

      {/* ==================== HEADER ==================== */}
      <header className="fixed top-0 left-0 right-0 h-14 z-30 flex items-center justify-between px-4 border-b border-[rgba(255,255,255,0.07)] bg-[rgba(5,5,8,0.75)] backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <motion.button
            className="lg:hidden p-2 rounded-lg hover:bg-[rgba(255,255,255,0.04)] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            onClick={() => setSidebarOpen(true)}
            aria-label="Toggle sidebar"
            whileTap={{ scale: 0.92 }}
          >
            <Menu size={18} className="text-[#9a9ab0]" />
          </motion.button>
          <Link href="/khoa-hoc" className="flex items-center gap-2.5 group">
            <HaloLogo />
            <div className="flex flex-col justify-center">
              <span className="font-semibold text-[#e8e8f0] text-sm tracking-tight hidden sm:inline group-hover:text-[#50e4ed] transition-colors duration-300">
                Alpha Photography
              </span>
              <span
                className="hidden sm:inline mt-1.5 leading-none pl-0.5"
                style={{
                  fontFamily: "'Cinzel', 'Cormorant Garamond', 'Didot', 'Times New Roman', serif",
                  fontWeight: 900,
                  fontStyle: "normal",
                  fontSize: "12px",
                  letterSpacing: "0.24em",
                  background: "linear-gradient(135deg, #ffe58f 0%, #d4af37 50%, #b8882a 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 0 8px rgba(255, 215, 100, 0.45)) drop-shadow(0 1.5px 3px rgba(0,0,0,0.9))",
                  textShadow: "none",
                  textTransform: "uppercase",
                }}
              >
                TRUNGVT
              </span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {/* Font size toggle with visual dots */}
          <motion.button
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[rgba(255,255,255,0.07)] bg-[rgba(15,15,24,0.6)] hover:bg-[rgba(20,20,31,0.8)] hover:border-[rgba(255,255,255,0.12)] transition-colors text-[#5a5a72] text-xs min-h-[36px] backdrop-blur-sm"
            onClick={cycleFontSize}
            aria-label="Toggle font size"
            title={`Cỡ chữ: ${fontLabel}`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
          >
            <Type size={13} />
            <span className="hidden sm:inline text-[#9a9ab0]">{fontLabel}</span>
            <div className="flex items-center gap-[3px] ml-0.5">
              {[1, 2, 3].map(dot => (
                <motion.div
                  key={dot}
                  className="rounded-full"
                  animate={{
                    width: dot <= fontDots ? 5 : 3,
                    height: dot <= fontDots ? 5 : 3,
                    backgroundColor: dot <= fontDots ? '#7c8aff' : 'rgba(255,255,255,0.08)',
                  }}
                  transition={{ duration: 0.2 }}
                />
              ))}
            </div>
          </motion.button>

          {/* Search button with glow */}
          <motion.button
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[rgba(255,255,255,0.07)] bg-[rgba(15,15,24,0.6)] hover:bg-[rgba(20,20,31,0.8)] hover:border-[rgba(124,138,255,0.2)] transition-all text-[#5a5a72] text-sm min-h-[36px] backdrop-blur-sm group/search relative overflow-hidden"
            onClick={() => setSearchOpen(true)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            {/* Hover glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(124,138,255,0.04)] to-transparent opacity-0 group-hover/search:opacity-100 transition-opacity duration-300" />
            <Search size={14} className="relative z-10 group-hover/search:text-[#7c8aff] transition-colors duration-200" />
            <span className="hidden sm:inline relative z-10 text-[#9a9ab0] group-hover/search:text-[#e8e8f0] transition-colors duration-200">Tìm kiếm...</span>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-[rgba(5,5,8,0.6)] border border-[rgba(255,255,255,0.07)] text-[10px] font-mono text-[#5a5a72] relative z-10">
              ⌘K
            </kbd>
          </motion.button>
        </div>

        <div
          className="header-glow"
          style={{ opacity: Math.min(scrollProgress / 50, 1) }}
        />
      </header>

      {/* ==================== SIDEBAR OVERLAY (Mobile) ==================== */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              className="sidebar-left w-[272px] flex flex-col fixed top-0 bottom-0 z-50 lg:hidden overflow-y-auto sidebar-scroll"
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{
                background: 'rgba(10, 10, 16, 0.92)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                borderRight: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              {/* Mobile sidebar header */}
              <div className="flex items-center justify-between px-4 h-14 border-b border-[rgba(255,255,255,0.07)]">
                <Link href="/khoa-hoc" className="flex items-center gap-2.5" onClick={() => setSidebarOpen(false)}>
                  <HaloLogo compact />
                  <span className="font-semibold text-[#e8e8f0] text-sm">Alpha Docs</span>
                </Link>
                <motion.button
                  onClick={() => setSidebarOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-[rgba(255,255,255,0.04)] transition-colors"
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={16} className="text-[#5a5a72]" />
                </motion.button>
              </div>

              {/* Mobile sidebar content */}
              <div className="flex-1 overflow-y-auto sidebar-scroll pt-3 pb-4">
                {/* Home link */}
                <div className="px-3 pb-2 flex flex-col gap-1">
                  <Link
                    href="/khoa-hoc"
                    className={`nav-item flex items-center gap-2.5 px-3 py-2 rounded-md text-sm ${isActive('/khoa-hoc') ? 'active' : 'text-[#9a9ab0]'}`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Home size={15} className="text-[#5a5a72]" />
                    Tổng quan khóa học
                  </Link>
                  <button
                    onClick={() => {
                      setSidebarOpen(false);
                      setIsRoadmapOpen(true);
                    }}
                    className="w-full nav-item flex items-center gap-2.5 px-3 py-2 rounded-md text-sm text-[#9a9ab0] hover:text-white transition-colors cursor-pointer text-left bg-transparent border-none"
                  >
                    <Compass size={15} className="text-[#7c8aff] flex-shrink-0" />
                    Sơ đồ lộ trình
                  </button>
                </div>

                {navGroups.map((group) => (
                  <div key={group.key} className="px-3 pb-1">
                    <button
                      className="flex items-center gap-2 px-3 py-2 w-full text-left group"
                      onClick={() => toggleGroup(group.key)}
                    >
                      <span className="relative">
                        {group.icon}
                        {/* Glow dot for group header */}
                        <motion.span
                          className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: group.color }}
                          animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.1, 0.8] }}
                          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                        />
                      </span>
                      <span
                        className="text-xs font-semibold uppercase tracking-wider"
                        style={{ color: group.color }}
                      >
                        {group.label}
                      </span>
                      <motion.div
                        animate={{ rotate: expandedGroups[group.key] ? 0 : -90 }}
                        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <ChevronDown size={14} className="text-[#5a5a72]" />
                      </motion.div>
                    </button>
                    <AnimatePresence initial={false}>
                      {expandedGroups[group.key] && (
                        <motion.div
                          className="ml-2 pl-3 border-l border-[rgba(255,255,255,0.07)] overflow-hidden"
                          variants={navGroupVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                        >
                          {group.items.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className={`nav-item flex items-center gap-2 px-3 py-1.5 rounded-md text-sm ${
                                isActive(item.href) ? 'active' : 'text-[#9a9ab0]'
                              }`}
                              onClick={() => setSidebarOpen(false)}
                            >
                              <span
                                className={`status-dot ${
                                  isActive(item.href)
                                    ? 'current'
                                    : mounted && visitedPages.includes(item.href)
                                    ? 'visited'
                                    : 'unvisited'
                                }`}
                              />
                              <span className="nav-label text-xs">
                                {item.num}. {item.label}
                              </span>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
              <div className="px-3 pb-3">
                <Link
                  href="/tong-ket"
                  className={`nav-item flex items-center gap-2.5 px-3 py-2 rounded-md text-sm ${isActive('/tong-ket') ? 'active' : 'text-[#9a9ab0]'}`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Sparkles size={15} className="text-[#fb7185]" />
                  Bản đồ tổng kết
                </Link>
              </div>

              {/* Mobile sidebar footer */}
              <div className="sidebar-footer">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[#5a5a72] uppercase tracking-wider">
                    Tiến trình đọc
                  </span>
                  <span className="text-[10px] font-mono text-[#7c8aff]">
                    {readCount}/19 bài đã đọc
                  </span>
                </div>
                <div className="sidebar-progress-bar">
                  <div
                    className="sidebar-progress-fill"
                    style={{ width: `${(readCount / 19) * 100}%` }}
                  />
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ==================== LEFT SIDEBAR (Desktop) ==================== */}
      <aside
        className="sidebar-left w-[272px] border-r border-[rgba(255,255,255,0.07)] flex-col fixed top-14 bottom-0 overflow-y-auto sidebar-scroll hidden lg:flex"
        style={{
          background: 'rgba(10, 10, 16, 0.65)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        {/* Home */}
        <div className="px-3 pt-4 pb-2 flex flex-col gap-1">
          <Link
            href="/khoa-hoc"
            className={`nav-item flex items-center gap-2.5 px-3 py-2 rounded-md text-sm ${isActive('/khoa-hoc') ? 'active' : 'text-[#9a9ab0]'}`}
          >
            <Home size={15} className="text-[#5a5a72]" />
            Tổng quan khóa học
          </Link>
          <button
            onClick={() => setIsRoadmapOpen(true)}
            className="w-full nav-item flex items-center gap-2.5 px-3 py-2 rounded-md text-sm text-[#9a9ab0] hover:text-white transition-colors cursor-pointer text-left bg-transparent border-none"
          >
            <Compass size={15} className="text-[#7c8aff] flex-shrink-0" />
            Sơ đồ lộ trình
          </button>
          <Link
            href="/tong-ket"
            className={`nav-item flex items-center gap-2.5 px-3 py-2 rounded-md text-sm ${isActive('/tong-ket') ? 'active' : 'text-[#9a9ab0]'}`}
          >
            <Sparkles size={15} className="text-[#fb7185]" />
            Bản đồ tổng kết
          </Link>
        </div>

        {/* Nav Groups */}
        {navGroups.map((group) => (
          <div key={group.key} className="px-3 pb-1">
            <button
              className="flex items-center gap-2 px-3 py-2 w-full text-left group"
              onClick={() => toggleGroup(group.key)}
            >
              <span className="relative">
                {group.icon}
                {/* Glow dot for group header */}
                <motion.span
                  className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: group.color }}
                  animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.1, 0.8] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                />
              </span>
              <span
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: group.color }}
              >
                {group.label}
              </span>
              <motion.div
                animate={{ rotate: expandedGroups[group.key] ? 0 : -90 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="ml-auto"
              >
                <ChevronDown size={14} className="text-[#5a5a72]" />
              </motion.div>
            </button>
            <AnimatePresence initial={false}>
              {expandedGroups[group.key] && (
                <motion.div
                  className="ml-2 pl-3 border-l border-[rgba(255,255,255,0.07)] overflow-hidden"
                  variants={navGroupVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`nav-item flex items-center gap-2 px-3 py-1.5 rounded-md text-sm relative ${
                        isActive(item.href) ? 'active' : 'text-[#9a9ab0]'
                      }`}
                    >
                      {/* Active gradient highlight background */}
                      {isActive(item.href) && (
                        <motion.div
                          className="absolute inset-0 rounded-md"
                          layoutId="activeNavBg"
                          style={{
                            background: 'linear-gradient(135deg, rgba(124,138,255,0.08), rgba(167,139,250,0.04))',
                            borderLeft: '2px solid #7c8aff',
                          }}
                          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                        />
                      )}
                      <span
                        className={`status-dot relative z-10 ${
                          isActive(item.href)
                            ? 'current'
                            : mounted && visitedPages.includes(item.href)
                            ? 'visited'
                            : 'unvisited'
                        }`}
                      />
                      <span className="nav-label text-xs relative z-10">
                        {item.num}. {item.label}
                      </span>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}

        {/* Sidebar Footer */}
        <div className="sidebar-footer">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#5a5a72] uppercase tracking-wider">
              Tiến trình đọc
            </span>
            <span className="text-[10px] font-mono text-[#7c8aff]">
              {readCount}/19 bài đã đọc
            </span>
          </div>
          <div className="sidebar-progress-bar">
            <motion.div
              className="sidebar-progress-fill"
              animate={{ width: `${(readCount / 19) * 100}%` }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          {/* Milestone indicators */}
          <div className="flex items-center justify-between mt-1.5 px-0.5">
            {[5, 10, 15, 19].map(milestone => (
              <div
                key={milestone}
                className="flex items-center gap-1"
              >
                <div
                  className="w-1 h-1 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: readCount >= milestone ? '#7c8aff' : 'rgba(255,255,255,0.06)',
                    boxShadow: readCount >= milestone ? '0 0 4px rgba(124,138,255,0.3)' : 'none',
                  }}
                />
                <span
                  className="text-[8px] font-mono transition-colors duration-300"
                  style={{
                    color: readCount >= milestone ? '#7c8aff' : 'rgba(255,255,255,0.08)',
                  }}
                >
                  {milestone}
                </span>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* ==================== MAIN CONTENT AREA ==================== */}
      <div
        ref={scrollContainerRef}
        className="docs-scroll-viewport lg:pl-[272px] pt-14"
        onScroll={handleContentScroll}
      >
        <div className="flex">
          <AnimatePresence mode="wait">
            <motion.main
              key={pathname}
              className="flex-1 min-w-0 page-enter"
              ref={articleRef}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {children}
              <LessonInteractiveTools pathname={pathname} />
            </motion.main>
          </AnimatePresence>

          {/* ==================== Right TOC Sidebar ==================== */}
          <aside className="sidebar-right w-[220px] shrink-0 hidden xl:block">
            <div
              className="sticky top-20 pl-6 pr-2"
              style={{
                background: 'rgba(10, 10, 16, 0.3)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                borderRadius: '0 12px 12px 0',
                borderLeft: '1px solid rgba(255,255,255,0.04)',
              }}
            >
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[#5a5a72] mb-3 pt-4">
                Mục lục
              </p>
              <nav className="space-y-0.5 pb-2">
                {tocSections.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className={`toc-link flex items-center text-xs py-1 ${
                      activeToc === sec.id
                        ? 'active text-[#7c8aff]'
                        : 'text-[#5a5a72]'
                    }`}
                    style={{
                      paddingLeft:
                        sec.level === 1 ? '8px' : sec.level === 2 ? '16px' : '24px',
                    }}
                  >
                    {/* Animated sliding highlight indicator */}
                    {activeToc === sec.id ? (
                      <motion.span
                        className="toc-dot active"
                        layoutId="tocIndicator"
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      />
                    ) : (
                      <span className="toc-dot" />
                    )}
                    {sec.label}
                  </a>
                ))}
              </nav>

              <div className="mt-4 pt-4 pb-4 border-t border-[rgba(255,255,255,0.04)]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] text-[#5a5a72] uppercase tracking-wider">
                    Tiến trình
                  </span>
                  <span className="text-[10px] font-mono text-[#7c8aff]">
                    {Math.round(scrollProgress)}%
                  </span>
                </div>
                {/* Progress ring + bar */}
                <div className="flex items-center gap-3">
                  <div className="relative flex-shrink-0" style={{ width: 36, height: 36 }}>
                    <ProgressRing progress={scrollProgress} size={36} strokeWidth={2.5} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[8px] font-mono text-[#7c8aff] font-bold">
                        {Math.round(scrollProgress)}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 h-1 rounded-full bg-[rgba(255,255,255,0.04)] overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: 'var(--gradient-progress)' }}
                      animate={{ width: `${scrollProgress}%` }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </div>
                {activeToc && (
                  <motion.div
                    className="reading-position"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {getReadingPosition()}
                  </motion.div>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* ==================== BACK TO TOP ==================== */}
      <AnimatePresence>
        {showBackTop && (
          <motion.button
            className="fixed bottom-6 right-6 z-20 back-to-top-elite"
            onClick={scrollToTop}
            aria-label="Back to top"
            variants={backToTopVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            style={{
              background: 'rgba(15, 15, 24, 0.75)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
          >
            {/* Progress ring around button */}
            <ProgressRing progress={scrollProgress} size={44} strokeWidth={2} />
            <div className="relative z-10 flex flex-col items-center justify-center gap-[1px]">
              <ArrowUp size={14} />
              <span className="text-[8px] font-mono leading-none">{Math.round(scrollProgress)}%</span>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ==================== MOBILE BOTTOM BAR ==================== */}
      <div
        className="mobile-bottom-bar"
        style={{
          background: 'rgba(5, 5, 8, 0.82)',
          backdropFilter: 'blur(24px) saturate(1.6)',
          WebkitBackdropFilter: 'blur(24px) saturate(1.6)',
          borderTop: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        {prevPage ? (
          <motion.div whileTap={{ scale: 0.93 }}>
            <Link href={prevPage.href} className="mob-nav-btn">
              <ArrowLeft size={14} />
              <span>{prevPage.num}</span>
            </Link>
          </motion.div>
        ) : (
          <span className="mob-nav-btn disabled">
            <ArrowLeft size={14} />
          </span>
        )}

        <div className="flex flex-col items-center gap-0.5">
          <span className="text-[10px] font-mono text-[#9a9ab0]">
            {currentIdx + 1}/{pageNavConfig.length}
          </span>
          <div className="flex items-center gap-1.5">
            {/* Page dot progression */}
            {pageNavConfig.map((_, idx) => {
              // Show condensed dots (only show near current page on mobile)
              const dist = Math.abs(idx - currentIdx);
              if (dist > 2 && idx !== 0 && idx !== pageNavConfig.length - 1) return null;
              return (
                <motion.div
                  key={idx}
                  className="rounded-full"
                  animate={{
                    width: idx === currentIdx ? 12 : 4,
                    height: 4,
                    backgroundColor: idx === currentIdx
                      ? '#7c8aff'
                      : idx < currentIdx
                      ? 'rgba(124,138,255,0.3)'
                      : 'rgba(255,255,255,0.08)',
                  }}
                  transition={{ duration: 0.3 }}
                />
              );
            })}
          </div>
        </div>

        {nextPage ? (
          <motion.div whileTap={{ scale: 0.93 }}>
            <Link href={nextPage.href} className="mob-nav-btn">
              <span>{nextPage.num}</span>
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        ) : (
          <span className="mob-nav-btn disabled">
            <ArrowRight size={14} />
          </span>
        )}
      </div>

      {/* ==================== SEARCH MODAL ==================== */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-start justify-center pt-[18vh] sm:pt-[20vh]"
            variants={searchOverlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
          >
            {/* Blurred background overlay */}
            <motion.div
              className="absolute inset-0 bg-black/60"
              style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
            />

            {/* Search modal */}
            <motion.div
              className="relative w-full max-w-lg mx-4 overflow-hidden"
              style={{
                background: 'rgba(15, 15, 24, 0.95)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px',
                boxShadow: '0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(124,138,255,0.05), 0 0 40px rgba(124,138,255,0.03)',
              }}
              variants={searchModalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Search input */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[rgba(255,255,255,0.07)]">
                <Search size={18} className="text-[#5a5a72] flex-shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Tìm kiếm tài liệu..."
                  className="flex-1 bg-transparent border-none outline-none text-sm text-[#e8e8f0] placeholder-[#5a5a72]"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <kbd className="px-1.5 py-0.5 rounded bg-[rgba(5,5,8,0.6)] border border-[rgba(255,255,255,0.07)] text-[10px] font-mono text-[#5a5a72] flex-shrink-0">
                  ESC
                </kbd>
              </div>

              {/* Search results / Recent searches */}
              <div className="max-h-80 overflow-y-auto sidebar-scroll">
                {searchQuery.trim() === '' ? (
                  <div>
                    {/* Recent searches */}
                    {recentSearches.length > 0 && (
                      <div className="px-4 py-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] text-[#5a5a72] uppercase tracking-wider font-semibold">
                            Tìm kiếm gần đây
                          </span>
                          <button
                            className="text-[10px] text-[#5a5a72] hover:text-[#7c8aff] transition-colors"
                            onClick={() => {
                              setRecentSearches([]);
                              try { localStorage.removeItem('alpha-doc-recent-searches'); } catch {}
                            }}
                          >
                            Xóa
                          </button>
                        </div>
                        <div className="space-y-0.5">
                          {recentSearches.map((term, idx) => (
                            <motion.button
                              key={term}
                              className="w-full text-left flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-[rgba(255,255,255,0.03)] transition-colors text-sm"
                              variants={searchResultVariants}
                              initial="hidden"
                              animate="visible"
                              custom={idx}
                              onClick={() => setSearchQuery(term)}
                            >
                              <Clock size={12} className="text-[#5a5a72] flex-shrink-0" />
                              <span className="text-[#9a9ab0]">{term}</span>
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    )}
                    {/* Empty state */}
                    {recentSearches.length === 0 && (
                      <div className="p-8 text-center">
                        <FileSearch size={32} className="mx-auto text-[rgba(255,255,255,0.06)] mb-3" />
                        <p className="text-sm text-[#5a5a72]">Nhập từ khóa để tìm kiếm...</p>
                        <p className="text-xs text-[rgba(255,255,255,0.06)] mt-1">⌘K để mở, ESC để đóng</p>
                      </div>
                    )}
                  </div>
                ) : searchResults.length === 0 ? (
                  <div className="p-8 text-center">
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FileSearch size={32} className="mx-auto text-[rgba(255,255,255,0.06)] mb-3" />
                      <p className="text-sm text-[#5a5a72]">Không tìm thấy kết quả cho &ldquo;{searchQuery}&rdquo;</p>
                    </motion.div>
                  </div>
                ) : (
                  <div className="py-2">
                    {searchResults.map((item, idx) => (
                      <motion.div
                        key={item.href}
                        variants={searchResultVariants}
                        initial="hidden"
                        animate="visible"
                        custom={idx}
                      >
                        <Link
                          href={item.href}
                          className={`search-result-item ${
                            selectedSearchIdx === idx
                              ? 'bg-[rgba(124,138,255,0.06)] border-[rgba(124,138,255,0.1)]'
                              : ''
                          }`}
                          onClick={() => {
                            addRecentSearch(searchQuery);
                            setSearchOpen(false);
                            setSearchQuery('');
                          }}
                          onMouseEnter={() => setSelectedSearchIdx(idx)}
                        >
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-semibold text-[#e8e8f0]">{item.title}</p>
                            {selectedSearchIdx === idx && (
                              <motion.span
                                className="text-[10px] text-[#7c8aff] font-mono ml-auto"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                              >
                                Enter ↵
                              </motion.span>
                            )}
                          </div>
                          <div className="mt-1">
                            {item.tags.slice(0, 4).map((tag) => (
                              <span key={tag} className="search-tag">{tag}</span>
                            ))}
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Search footer with keyboard hints */}
              <div className="px-4 py-2 border-t border-[rgba(255,255,255,0.05)] flex items-center gap-3 text-[10px] text-[#5a5a72]">
                <span className="flex items-center gap-1">
                  <kbd className="px-1 py-0.5 rounded bg-[rgba(5,5,8,0.6)] border border-[rgba(255,255,255,0.06)] font-mono text-[9px]">↑↓</kbd>
                  Điều hướng
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1 py-0.5 rounded bg-[rgba(5,5,8,0.6)] border border-[rgba(255,255,255,0.06)] font-mono text-[9px]">↵</kbd>
                  Chọn
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1 py-0.5 rounded bg-[rgba(5,5,8,0.6)] border border-[rgba(255,255,255,0.06)] font-mono text-[9px]">esc</kbd>
                  Đóng
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==================== ROADMAP MODAL ==================== */}
      <AnimatePresence>
        {isRoadmapOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsRoadmapOpen(false)}
          >
            {/* Blurred background overlay */}
            <motion.div
              className="absolute inset-0 bg-black/80"
              style={{ backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
            />

            {/* Modal Box */}
            <motion.div
              className="relative w-full max-w-4xl h-[85vh] flex flex-col overflow-hidden"
              style={{
                background: 'rgba(10, 10, 16, 0.96)',
                backdropFilter: 'blur(30px)',
                WebkitBackdropFilter: 'blur(30px)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '24px',
                boxShadow: '0 24px 80px rgba(0,0,0,0.6), 0 0 40px rgba(124,138,255,0.04)',
              }}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-[rgba(255,255,255,0.06)] bg-white/[0.01]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#7c8aff]/10 flex items-center justify-center text-[#7c8aff]">
                    <Compass size={18} />
                  </div>
                  <div>
                    <h3 className="text-base font-serif font-semibold text-slate-100 leading-tight">
                      Sơ đồ lộ trình học tập
                    </h3>
                    <p className="text-xs text-[#5a5a72] mt-0.5 font-sans">
                      19 bài học & 5 chặng phát triển tư duy hình ảnh
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsRoadmapOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-white/[0.04] text-[#5a5a72] hover:text-white transition-colors cursor-pointer bg-transparent border-none"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 sidebar-scroll">
                <CourseTree variant="modal" onNodeClick={() => setIsRoadmapOpen(false)} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

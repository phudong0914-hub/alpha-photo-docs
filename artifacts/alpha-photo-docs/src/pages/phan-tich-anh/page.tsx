import { useState, useEffect } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  AiScanIcon,
  SparklesIcon,
  CheckIcon,
  Upload01Icon,
  HelpCircleIcon,
  ColorsIcon,
  Compass01Icon,
  EyeIcon,
  FocusIcon,
  Settings01Icon,
  Delete02Icon,
  BookOpen01Icon,
  ArrowRight01Icon,
  ReloadIcon,
  Maximize01Icon
} from '@hugeicons/core-free-icons';
import { motion, AnimatePresence } from 'framer-motion';
import DocsLayout from '@/components/docs-layout';
import { ImageComparisonSlider } from '@/components/image-comparison-slider';
import { VisualDeconstructionLab } from '@/components/visual-deconstruction-lab';

// Types for diagnostic pins
interface DiagnosticPin {
  id: string;
  x: number; // percentage
  y: number; // percentage
  category: 'bocuc' | 'anhsang' | 'mausac' | 'chatlieu' | 'tieudiem' | 'bieutuong';
  status: 'good' | 'bad';
  term: string;
  notes: string;
}

// 19 Visual Principles scoring type
interface DetailedScores {
  // Group 1: Ngôn ngữ Hình ảnh
  sucManh: number;       // 1. Sức mạnh hình ảnh
  mucDich: number;       // 2. Mục đích hình ảnh
  bieuTuong: number;     // 3. Biểu tượng văn hóa
  // Group 2: Ngữ thị giác
  duongNet: number;      // 4. Đường nét cảm xúc
  hinhKhoi: number;      // 5. Nhân dạng hình khối
  khongGian: number;     // 6. Không gian âm dương
  anhSang: number;       // 7. Ánh sáng bóng tối
  mauSac: number;        // 8. Màu sắc
  tuongPhan: number;     // 9. Tương phản màu sắc
  // Group 3: Lý thị giác
  chatLieu: number;      // 10. Chất liệu bề mặt
  kichThuoc: number;     // 11. Kích thước & Tỷ lệ
  khongKy: number;       // 12. Khoảng không kỳ & Cảm xúc
  // Group 4: Bố cục & Góc nhìn
  bocuc: number;         // 13. Bố cục
  gocChup: number;       // 14. Góc chụp
  tieuDiem: number;      // 15. Tiêu điểm & Độ sâu
  // Group 5: Vận tác Vận hành
  nhipDieu: number;      // 16. Nhịp điệu thị giác
  canBang: number;       // 17. Cân bằng Tĩnh & Động
  phamCap: number;       // 18. Phẩm cấp & Điểm nhấn
  tinhThong: number;     // 19. Tinh Thống Nhất
}

const EMPTY_DETAILED_SCORES: DetailedScores = {
  sucManh: 0, mucDich: 0, bieuTuong: 0,
  duongNet: 0, hinhKhoi: 0, khongGian: 0, anhSang: 0, mauSac: 0, tuongPhan: 0,
  chatLieu: 0, kichThuoc: 0, khongKy: 0,
  bocuc: 0, gocChup: 0, tieuDiem: 0,
  nhipDieu: 0, canBang: 0, phamCap: 0, tinhThong: 0,
};

// Compute aggregate scores from detailed scores
function computeAggregates(d: DetailedScores) {
  const avg = (...ns: number[]) => Math.round(ns.reduce((a, b) => a + b, 0) / ns.length);
  return {
    bocuc: avg(d.bocuc, d.gocChup, d.tieuDiem, d.kichThuoc, d.nhipDieu),
    anhsang: avg(d.anhSang, d.khongGian, d.canBang),
    mausac: avg(d.mauSac, d.tuongPhan, d.chatLieu),
    chatlieu: avg(d.sucManh, d.mucDich, d.bieuTuong, d.duongNet, d.hinhKhoi, d.khongKy, d.phamCap, d.tinhThong),
  };
}

// Category styles and config
const categories = {
  bocuc: { label: 'Bố cục (Composition)', color: '#7c8aff', bg: 'bg-[#7c8aff]/10', border: 'border-[#7c8aff]/30', text: 'text-[#7c8aff]' },
  anhsang: { label: 'Ánh sáng (Lighting)', color: '#ffcb6b', bg: 'bg-[#ffcb6b]/10', border: 'border-[#ffcb6b]/30', text: 'text-[#ffcb6b]' },
  mausac: { label: 'Màu sắc (Color)', color: '#fb7185', bg: 'bg-[#fb7185]/10', border: 'border-[#fb7185]/30', text: 'text-[#fb7185]' },
  chatlieu: { label: 'Chất liệu (Texture)', color: '#22c55e', bg: 'bg-[#22c55e]/10', border: 'border-[#22c55e]/30', text: 'text-[#22c55e]' },
  tieudiem: { label: 'Tiêu điểm (Focus)', color: '#a855f7', bg: 'bg-[#a855f7]/10', border: 'border-[#a855f7]/30', text: 'text-[#a855f7]' },
  bieutuong: { label: 'Biểu tượng (Symbolism)', color: '#ff7e3b', bg: 'bg-[#ff7e3b]/10', border: 'border-[#ff7e3b]/30', text: 'text-[#ff7e3b]' },
};

const categoryTerms = {
  bocuc: ['Quy tắc 1/3 (Rule of thirds)', 'Tỷ lệ vàng (Golden ratio)', 'Đường dẫn hướng (Leading lines)', 'Khung trong khung (Sub-framing)', 'Bố cục đối xứng', 'Căng thẳng động (Dynamic tension)'],
  anhsang: ['Ánh sáng bên (Side light)', 'Ánh sáng ven (Rim light)', 'Silhouette (Ngược sáng)', 'Low-key (Tông tối)', 'High-key (Tông sáng)', 'Chiaroscuro (Tương phản gắt)'],
  mausac: ['Hòa sắc bổ túc', 'Hòa sắc tương đồng', 'Tương phản nhiệt độ', 'Tương phản đồng thời', 'Màu sắc tối giản', 'Màu sắc đơn sắc (Monochrome)'],
  chatlieu: ['Chất liệu thô ráp (Matte)', 'Chất liệu bóng bẩy (Specular)', 'Nhịp điệu hoa văn (Pattern)', 'Macro (Chi tiết cực cận)'],
  tieudiem: ['Độ sâu trường ảnh mỏng (DoF mỏng)', 'Tiêu điểm cô lập', 'Độ sắc nét biên', 'Chuyển động nhòe (Motion blur)'],
  bieutuong: ['Studium (Bối cảnh chung)', 'Punctum (Điểm chạm riêng)', 'Huyền thoại xã hội (Myth)', 'Đạo đức cái nhìn (The Gaze)'],
};

// Demo images with pre-written critique
const demoImages = [
  {
    id: 'demo-portrait',
    title: 'Banner Thời trang Biển (KOL)',
    src: '/kol-beach-fashion.png',
    scores: { bocuc: 88, anhsang: 82, mausac: 92, chatlieu: 85 },
    critique: `### BÁO CÁO PHÂN TÍCH THỊ GIÁC & THIẾT KẾ (BANNER THỜI TRANG BIỂN)

**1. ĐIỂM SÁNG (STRENGTHS):**
*   **Phân cấp thị giác (Visual Hierarchy):** Bố cục chia cột dọc 2/3 (chủ thể KOL bên phải) và 1/3 (thông tin và ảnh sản phẩm bên trái) cực kỳ khoa học. Ánh mắt người xem được thu hút trước tiên bởi gương mặt rạng rỡ của KOL, trượt dọc theo cơ thể dẫn xuống nút kêu gọi hành động (Call to Action - Mua ngay) ở góc dưới bên trái và ưu đãi 30% ở góc phải.
*   **Hòa sắc tương phản nhiệt độ:** Việc kết hợp màu xanh trời (Sky Blue) của bộ bikini với tone vàng ấm của ánh nắng và cát biển tạo nên một bộ phối tương phản nhiệt độ (ấm - lạnh) bắt mắt, khơi gợi xúc cảm mùa hè tươi mát, tràn đầy sức sống.
*   **Ánh sáng thương mại (Commercial Lighting):** Ánh sáng Studio giả lập nắng biển rất mượt mà. Nguồn sáng chính (Key Light) dịu nhẹ chiếu góc 45 độ làm sáng gương mặt và toàn thân KOL, kết hợp với nguồn sáng ven (Rim Light) từ phía sau làm nổi bật mái tóc và bờ vai, tách bạch chủ thể khỏi phông nền biển mờ.

**2. ĐIỂM CẦN CẢI THIỆN (WEAKNESSES):**
*   **Sắp xếp chữ (Typography Layout):** Cụm tiêu đề "THỜI TRANG BIỂN siêu hot" sử dụng quá nhiều phông chữ khác nhau (serif, sans-serif và viết tay dạng script). Điều này làm xao nhãng và giảm tính thống nhất (Unity) của thiết kế thương hiệu.
*   **Khoảng cách chữ & dấu:** Chữ "BIỂN" lồng dấu hỏi ở trên đầu chữ "Ê" bị dính sát vào chữ "THỜI TRANG" ở dòng trên, gây ra cảm giác chật chội về mặt thị giác. Khoảng cách giữa các sản phẩm Bikini flatlay ở cột bên trái còn hơi thưa.

**3. KẾ HOẠCH HÀNH ĐỘNG CHO LẦN SAU:**
*   Giới hạn số lượng font chữ trong tiêu đề chính xuống tối đa 2 font (1 font sans-serif hiện đại cho các thông tin bổ trợ và 1 font serif thanh lịch, vững chãi cho từ khóa "BIỂN").
*   Tăng khoảng cách dòng (leading) giữa "THỜI TRANG" và "BIỂN" lên khoảng 8-10% để các dấu thanh tiếng Việt được thở và hiển thị trọn vẹn, không bị chồng lấn.`
  },
  {
    id: 'demo-desert',
    title: 'Đường cong cồn cát Hoàng hôn',
    src: '/hero-bieu-tuong.png',
    scores: { bocuc: 92, anhsang: 85, mausac: 88, chatlieu: 75 },
    critique: `### BÁO CÁO PHÂN TÍCH TÁC PHẨM (DEMO DESERT)

**1. ĐIỂM SÁNG (STRENGTHS):**
*   **Đường nét (Lines):** Các đường cong uốn lượn của sườn cát tạo ra các đường dẫn mắt (Leading Lines) chữ S vô cùng quyến rũ, kéo tầm mắt người xem từ tiền cảnh ra vô cực.
*   **Màu sắc & Tương phản:** Tương phản nhiệt độ màu rất tốt: Ánh nắng ấm áp màu cát cháy tương phản dịu dàng với bóng xanh lạnh của vùng triền cát khuất nắng.

**2. ĐIỂM CẦN CẢI THIỆN (WEAKNESSES):**
*   **Tiêu điểm (Focal Point):** Bức ảnh thiếu một điểm nhấn tiêu điểm (Focal Point / Punctum) rõ rệt để làm điểm dừng cho mắt. Người xem dễ bị trôi dạt vô định theo các đường cong mà không có neo chặn cảm xúc.

**3. KẾ HOẠCH HÀNH ĐỘNG CHO LẦN SAU:**
*   Chờ đợi hoặc đặt một chủ thể nhân vật (ví dụ: một bóng người cô đơn đứng trên đỉnh cồn cát, hoặc một cái cây khô đơn độc) đặt tại giao điểm 1/3 để đóng vai trò làm tiêu điểm cảm xúc.
*   Chụp sát mặt đất hơn để phóng đại cấu trúc gợn sóng cát mịn ở tiền cảnh, làm nổi bật chất cảm cát.`
  }
];

export default function PhantichAnhPage() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [selectedDemoId, setSelectedDemoId] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState('AIzaSyAcyWnzMrXZSD9XrJAbCUOAl2Ikklovcl8');
  const [showApiKey, setShowApiKey] = useState(false);
  const [pins, setPins] = useState<DiagnosticPin[]>([]);
  const [activePinId, setActivePinId] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState('');
  const [critiqueReport, setCritiqueReport] = useState<string | null>(null);
  const [scores, setScores] = useState({ bocuc: 0, anhsang: 0, mausac: 0, chatlieu: 0 });
  const [detailedScores, setDetailedScores] = useState<DetailedScores>(EMPTY_DETAILED_SCORES);
  
  // Premium View Mode (Canvas vs Slider comparison)
  const [viewMode, setViewMode] = useState<'canvas' | 'slider'>('canvas');
  
  // Premium Critique History
  interface HistoryItem {
    id: string;
    date: string;
    title: string;
    imageSrc: string;
    scores: typeof scores;
    detailedScores: DetailedScores;
    critique: string;
    pins: DiagnosticPin[];
    aiPromptData: any;
  }
  const [critiqueHistory, setCritiqueHistory] = useState<HistoryItem[]>([]);

  // Custom photo metadata states
  const [imageSubject, setImageSubject] = useState('');
  const [aiPromptData, setAiPromptData] = useState<{
    subject: string;
    gpt_image_prompt: string;
    midjourney_prompt: string;
    nanobana_prompt: string;
  } | null>(null);

  // Comparison snapshot state
  const [originalSnapshot, setOriginalSnapshot] = useState<{
    src: string;
    scores: typeof scores;
    detailedScores: DetailedScores;
    critique: string;
    pins: DiagnosticPin[];
  } | null>(null);

  // Save current photo as Original Baseline
  const saveAsOriginalSnapshot = () => {
    if (!imageSrc || !critiqueReport) return;
    setOriginalSnapshot({
      src: imageSrc,
      scores: { ...scores },
      detailedScores: { ...detailedScores },
      critique: critiqueReport,
      pins: [...pins]
    });
    // Clear workspace for the improved photo upload
    setImageSrc(null);
    setPins([]);
    setActivePinId(null);
    setCritiqueReport(null);
    setScores({ bocuc: 0, anhsang: 0, mausac: 0, chatlieu: 0 });
    setDetailedScores(EMPTY_DETAILED_SCORES);
    setSelectedDemoId(null);
    setAiPromptData(null);
    setViewMode('canvas');
  };

  const clearComparison = () => {
    setOriginalSnapshot(null);
    setViewMode('canvas');
  };

  // JSON Prompt generator states
  const [showPromptModal, setShowPromptModal] = useState(false);
  const [generatedPromptJson, setGeneratedPromptJson] = useState<string | null>(null);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  // Floating pin builder fields
  const [pinCategory, setPinCategory] = useState<keyof typeof categories>('bocuc');
  const [pinStatus, setPinStatus] = useState<'good' | 'bad'>('good');
  const [pinTerm, setPinTerm] = useState('');
  const [pinNotes, setPinNotes] = useState('');

  useEffect(() => {
    // Load saved API key or save the default one
    const savedKey = localStorage.getItem('alpha-gemini-key');
    if (savedKey) {
      setApiKey(savedKey);
    } else {
      localStorage.setItem('alpha-gemini-key', 'AIzaSyAcyWnzMrXZSD9XrJAbCUOAl2Ikklovcl8');
    }

    // Load critique history from localstorage
    try {
      const savedHistory = localStorage.getItem('alpha-critique-history');
      if (savedHistory) {
        setCritiqueHistory(JSON.parse(savedHistory));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleSaveApiKey = (key: string) => {
    setApiKey(key);
    localStorage.setItem('alpha-gemini-key', key);
  };

  // Helper to add item to history
  const addToHistory = (
    title: string,
    img: string,
    sc: typeof scores,
    detSc: DetailedScores,
    crit: string,
    pn: DiagnosticPin[],
    aiPrompt: any
  ) => {
    const newItem: HistoryItem = {
      id: Math.random().toString(36).substring(2, 9),
      date: new Date().toLocaleString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
        day: "2-digit",
        month: "2-digit",
      }),
      title,
      imageSrc: img,
      scores: sc,
      detailedScores: detSc,
      critique: crit,
      pins: pn,
      aiPromptData: aiPrompt,
    };
    const updatedHistory = [newItem, ...critiqueHistory.slice(0, 9)]; // Keep max 10 items
    setCritiqueHistory(updatedHistory);
    try {
      localStorage.setItem('alpha-critique-history', JSON.stringify(updatedHistory));
    } catch (e) {
      console.error(e);
    }
  };

  const loadHistoryItem = (item: HistoryItem) => {
    setImageSrc(item.imageSrc);
    setScores(item.scores);
    setDetailedScores(item.detailedScores);
    setCritiqueReport(item.critique);
    setPins(item.pins);
    setAiPromptData(item.aiPromptData);
    setSelectedDemoId(null);
    setActivePinId(null);
    setViewMode('canvas');
  };

  const deleteHistoryItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = critiqueHistory.filter((item) => item.id !== id);
    setCritiqueHistory(updated);
    try {
      localStorage.setItem('alpha-critique-history', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  // Helper to compile optimized prompt JSON
  const generatePromptJson = () => {
    if (!critiqueReport) return;

    // Parse strengths and weaknesses from markdown report
    let strengthsList: string[] = [];
    let weaknessesList: string[] = [];
    
    const lines = critiqueReport.split('\n');
    let currentSection = '';
    
    lines.forEach(line => {
      if (line.includes('ĐIỂM SÁNG') || line.includes('STRENGTHS')) {
        currentSection = 'strengths';
      } else if (line.includes('ĐIỂM CẦN CẢI THIỆN') || line.includes('WEAKNESSES')) {
        currentSection = 'weaknesses';
      } else if (line.startsWith('###') || line.startsWith('**3.')) {
        currentSection = '';
      }
      
      if (line.trim().startsWith('*') || line.trim().startsWith('-')) {
        const item = line.replace(/^[\s*-]+/, '').trim();
        if (currentSection === 'strengths') strengthsList.push(item);
        if (currentSection === 'weaknesses') weaknessesList.push(item);
      }
    });

    if (strengthsList.length === 0) {
      strengthsList = ['Bố cục chia tỷ lệ hợp lý, độ tương phản màu sắc hài hòa.'];
    }
    if (weaknessesList.length === 0) {
      weaknessesList = ['typography chưa tối ưu, khoảng cách chữ tiếng Việt chưa được thông thoáng.'];
    }

    const isKOL = selectedDemoId === 'demo-portrait';
    const isDesert = selectedDemoId === 'demo-desert';

    // Build positive and negative prompts dynamically
    let focalSubject = "Custom uploaded photograph scene";
    let gptImagePrompt = "";
    let midjourneyPrompt = "";
    let nanobanaPrompt = "";
    let negativePrompt = "blurry, low resolution, bad composition, distorted focus, noisy, artifacting";

    if (isKOL) {
      focalSubject = "Beautiful Vietnamese female model (KOL) wearing a sky-blue bikini set";
      gptImagePrompt = "A highly realistic, photographic advertising swimwear campaign, featuring a beautiful Vietnamese female model (KOL) wearing a sky-blue bikini with fine floral lace embroidery, posing natural three-quarter view on a soft white sand tropical beach. Warm natural sunlight at 45 degrees, gentle rim light highlighting hair. Canon EOS R5, 85mm lens, f/2.2, crisp details, natural skin texture, realistic beach waves, 8k resolution, authentic catalog photo.";
      midjourneyPrompt = "A professional high-end fashion swimwear campaign advertisement banner, featuring a beautiful Vietnamese model KOL in a sky-blue bikini with delicate lace embroidery, posing on a sunny tropical beach during golden hour. Palm leaves framing, 85mm lens, f/1.8, cinematic lighting, rim light, warm and cool color contrast, clean composition, commercial catalog style --ar 9:16 --v 6.0";
      nanobanaPrompt = "Beautiful swimwear portrait photography. A Vietnamese model posing on a beach, bikini sky-blue color. Golden sunset light from the side, rim light highlighting details. Add palm leaves on the top-right corner to create sub-framing. Clean font layout on the left, clear line spacing.";
      negativePrompt = "blurry, low resolution, bad typography, squished text, overlapping diacritics, poor line spacing, distorted anatomy, oversaturated colors, harsh direct flash, flat lighting, unrealistic skin texture";
    } else if (isDesert) {
      focalSubject = "Winding desert sand dunes at sunset";
      gptImagePrompt = "A realistic, high-fidelity landscape photograph of sweeping desert sand dunes at sunset. Sharp ridges casting precise cool blue shadows, highly detailed warm golden sand ripples in close foreground. A single traveler in a crimson red cloak stands at the right-third dune peak. 35mm lens, f/8, natural dramatic lighting, photographic accuracy.";
      midjourneyPrompt = "A national geographic fine-art landscape photograph. sweeping curves of desert sand dunes at sunset, sharp ridges casting deep blue shadows, warm golden sand texture, a single lone traveler in a crimson red cloak stands on the dune peak, rule of thirds, wide angle shot, high contrast, cinematic --ar 16:9 --style raw --v 6.0";
      nanobanaPrompt = "Sweeping desert sand dunes landscape under a sunset sky. Draw sharp crest lines with deep blue shadows. In the foreground, show highly defined sand wave textures. Place a small traveler wearing a bright red cloak on the top ridge as a visual focal point.";
    } else {
      // Custom uploaded photo
      if (aiPromptData) {
        focalSubject = aiPromptData.subject;
        gptImagePrompt = aiPromptData.gpt_image_prompt;
        midjourneyPrompt = aiPromptData.midjourney_prompt;
        nanobanaPrompt = aiPromptData.nanobana_prompt;
      } else {
        const customSubject = imageSubject.trim() || "A custom scene";
        focalSubject = customSubject;
        gptImagePrompt = `A highly realistic, photographic representation of ${customSubject}, balanced natural lighting, crisp details, high fidelity, 8k resolution, authentic photographic style.`;
        midjourneyPrompt = `A professional fine-art commercial photograph of ${customSubject}, optimized composition reflecting rule of thirds, clean details, balanced cinematic studio lighting setup, rich depth of field, high dynamic range --ar 16:9 --v 6.0`;
        nanobanaPrompt = `A creative depiction of ${customSubject}, balanced composition with rule of thirds, high detail, descriptive scene elements.`;
      }
    }

    const promptObj = {
      $schema_version: "2.1",
      target_engine_standard: "GPT Image 2 (Realism) / Midjourney v6.0 (Artistic) / Nanobana 2 (Creative)",
      analyzed_image_profile: {
        category: isKOL ? "Commercial Fashion Advertisement Banner" : isDesert ? "Fine Art Landscape Photography" : "Custom Uploaded Artwork/Photo",
        original_focal_subject: focalSubject,
        critical_weaknesses_resolved: weaknessesList
      },
      reconstruction_parameters: {
        subject_detailing: {
          core_focus: isKOL 
            ? "A stunning East Asian female model with clear skin, warm smile, and elegant facial features."
            : isDesert 
              ? "Winding crest lines of desert sand dunes, sharp ridges casting clean geometric shadows."
              : `Optimized high-fidelity representation of: ${focalSubject}`,
          apparel_styling: isKOL 
            ? "A high-end two-piece sky-blue swimwear bikini set with delicate floral lace embroidery and golden chain shoulder straps."
            : "N/A",
          posing_and_expression: isKOL 
            ? "Posing gracefully on a beach, natural three-quarter view, looking towards the camera with a welcoming expression."
            : "N/A"
        },
        environment_and_atmosphere: {
          background_setting: isKOL 
            ? "A luxury tropical beach during golden hour. Crystal clear turquoise water, soft waves crashing on white sand."
            : isDesert
              ? "Vast desert landscape at sunset, sky showing warm orange and deep purple gradients, cool blue sky ambient shadows."
              : "Studio clean ambient background, balanced highlight distributions to elevate target shapes.",
          framing_foreground: isKOL 
            ? "Soft tropical palm leaves gently framing the top-right edge to create a natural frame-in-frame depth."
            : isDesert
              ? "Sharp ripples in the sand in the close foreground, highly defined texture."
              : "Crisp sharp focus plane, depth separation from background blur.",
          visual_focal_point: isKOL 
            ? "The KOL model as the dominant subject positioned at the right-third intersection."
            : isDesert
              ? "A lone traveler wearing a flowing crimson red cloak walking on the crest of the dune, serving as a distinct focal point."
              : "Rule of thirds alignment, placing the main element at one of the four intersections to anchor the visual interest."
        },
        cinematography_and_render: {
          lighting_setup: isKOL 
            ? "Professional commercial studio lighting. Main soft key light at 45-degree angle. Sub-lighting rim light (backlight) highlighting hair and shoulder outlines for separation."
            : "Cinematic low-angle side lighting from the setting sun, accentuating the sand textures and creating dramatic chiaroscuro contrasts.",
          lens_specification: "Shot on 85mm prime lens, f/1.8 aperture, low ISO, crisp sharp focus on the subject, soft background bokeh blur.",
          color_grading: isKOL 
            ? "Warm-cool temperature contrast (warm sun-drenched sand dunes vs. cool sky-blue bikini and ocean turquoise)."
            : "High contrast complementary color grading to separate focus planes."
        },
        commercial_layout_rules: isKOL ? {
          composition_grid: "Split vertical columns. Right 2/3 reserved for the model. Left 1/3 reserved for minimal typography.",
          typography_guideline: "Taglines set in a modern, clean Sans-Serif font. Brand title set in an elegant, thin Serif font. Set line-spacing (leading) to 1.35x to avoid overlapping of Vietnamese diacritics."
        } : null
      },
      optimized_generative_prompts: {
        gpt_image_prompt: gptImagePrompt,
        midjourney_prompt: midjourneyPrompt,
        nanobana_prompt: nanobanaPrompt,
        negative_prompt_raw: negativePrompt
      }
    };

    setGeneratedPromptJson(JSON.stringify(promptObj, null, 2));
    setShowPromptModal(true);
    setCopiedPrompt(false);
  };

  const copyPromptToClipboard = async () => {
    if (!generatedPromptJson) return;
    try {
      await navigator.clipboard.writeText(generatedPromptJson);
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2000);
    } catch {}
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target?.result as string);
        setSelectedDemoId(null);
        setPins([]);
        setActivePinId(null);
        setCritiqueReport(null);
        setScores({ bocuc: 0, anhsang: 0, mausac: 0, chatlieu: 0 });
      };
      reader.readAsDataURL(file);
    }
  };

  const selectDemoImage = (demo: typeof demoImages[0]) => {
    setImageSrc(demo.src);
    setSelectedDemoId(demo.id);
    setPins([]);
    setActivePinId(null);
    setScores(demo.scores);
    setCritiqueReport(demo.critique);
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (critiqueReport && !apiKey) return; // Lock pins if already evaluated static demo
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const newPin: DiagnosticPin = {
      id: Math.random().toString(36).substr(2, 9),
      x,
      y,
      category: 'bocuc',
      status: 'good',
      term: categoryTerms.bocuc[0],
      notes: ''
    };

    setPins([...pins, newPin]);
    setActivePinId(newPin.id);
    
    // Set default fields for pin form
    setPinCategory('bocuc');
    setPinStatus('good');
    setPinTerm(categoryTerms.bocuc[0]);
    setPinNotes('');
  };

  const updateActivePin = () => {
    if (!activePinId) return;
    setPins(pins.map(p => p.id === activePinId ? {
      ...p,
      category: pinCategory,
      status: pinStatus,
      term: pinTerm,
      notes: pinNotes
    } : p));
    setActivePinId(null);
  };

  const deletePin = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setPins(pins.filter(p => p.id !== id));
    if (activePinId === id) setActivePinId(null);
  };

  const handleCategoryChange = (cat: keyof typeof categories) => {
    setPinCategory(cat);
    setPinTerm(categoryTerms[cat][0]);
  };

  // Run AI critique
  const runCritiqueAnalysis = async () => {
    if (!imageSrc) return;
    setIsAnalyzing(true);
    setCritiqueReport(null);

    // Scenario A: Real Gemini API critique
    if (apiKey.trim() && apiKey !== 'AIzaSyAcyWnzMrXZSD9XrJAbCUOAl2Ikklovcl8') {
      try {
        setAnalysisProgress('Đang tải tệp ảnh lên và mã hóa dữ liệu...');
        await new Promise(r => setTimeout(r, 800));

        setAnalysisProgress('Đang kết nối cổng Google Gemini Vision Pro...');
        // extract base64 data only
        const base64Data = imageSrc.split(',')[1];
        const mimeType = imageSrc.split(';')[0].split(':')[1];

        setAnalysisProgress('Gemini đang thực hiện bóc tách bố cục & góc chụp...');
        await new Promise(r => setTimeout(r, 600));
        
        setAnalysisProgress('Gemini đang rà soát dải tương phản màu sắc...');
        await new Promise(r => setTimeout(r, 600));

        setAnalysisProgress('Đang đối chiếu quy chuẩn 19 bài học & kết xuất báo cáo...');

        const prompt = `Bạn là một Mentor nhiếp ảnh nghệ thuật hàng đầu và nhà ký hiệu học thị giác. Hãy thẩm định bức ảnh này theo bộ TIÊU CHÍ 19 TUYỆT CHIÊU THỊ GIÁC sau đây:

NHÓM 1 - NGÔN NGỮ HÌNH ẢNH:
1. sucManh (Sức mạnh hình ảnh): Ảnh có khoảnh khắc quyết định, cảm xúc sống động, punctum (điểm chạm) đủ mạnh không?
2. mucDich (Mục đích hình ảnh): Ý đồ tác giả có được truyền đạt rõ ràng, nhất quán không?
3. bieuTuong (Biểu tượng văn hóa): Ảnh có sử dụng/khơi gợi biểu tượng, thần thoại, hay ký hiệu văn hóa không?

NHÓM 2 - NGỮ THỊ GIÁC:
4. duongNet (Đường nét cảm xúc): Các đường nét trong ảnh tạo cảm xúc gì — dẫn dắt hay gây nhiễu?
5. hinhKhoi (Nhân dạng hình khối): Các hình khối chủ thể có rõ nét, cân đối, dễ nhận diện không?
6. khongGian (Không gian âm dương): Khoảng trống (negative space) và khoảng đặc có cân bằng, tạo nhịp thở không?
7. anhSang (Ánh sáng bóng tối): Chất lượng ánh sáng — hướng, độ tương phản sáng/tối, kịch tính?
8. mauSac (Màu sắc): Bảng màu có chủ đích, hài hòa và gợi cảm xúc phù hợp không?
9. tuongPhan (Tương phản màu sắc): Độ tương phản màu — nhiệt độ, bão hòa, đồng thời — có hiệu quả không?

NHÓM 3 - LÝ THỊ GIÁC:
10. chatLieu (Chất liệu bề mặt): Chất cảm, texture của vật thể có được thể hiện sống động không?
11. kichThuoc (Kích thước & Tỷ lệ): Tỷ lệ các yếu tố trong khung có đúng chuẩn thẩm mỹ không?
12. khongKy (Khoảng không kỳ): Ảnh có tạo được cảm giác khoảng không gian kỳ ảo, chiều sâu, bí ẩn không?

NHÓM 4 - BỐ CỤC & GÓC NHÌN:
13. bocuc (Bố cục): Áp dụng quy tắc 1/3, đường vàng, bố cục động có chuẩn không?
14. gocChup (Góc chụp): Góc máy ảnh có tạo lợi thế cho chủ thể, tạo cảm xúc phù hợp không?
15. tieuDiem (Tiêu điểm & Độ sâu): Điểm lấy nét, độ mờ hậu cảnh (bokeh/DoF) có ý đồ không?

NHÓM 5 - VẬN TÁC VẬN HÀNH:
16. nhipDieu (Nhịp điệu thị giác): Các yếu tố lặp lại tạo nhịp điệu, sự liên tục thị giác không?
17. canBang (Cân bằng Tĩnh & Động): Ảnh cân bằng hay tạo được cân bằng động chủ đích?
18. phamCap (Phẩm cấp & Điểm nhấn): Có điểm nhấn (focal hero) rõ ràng, phân cấp thị giác logic không?
19. tinhThong (Tinh Thống Nhất): Toàn bộ các yếu tố có hướng về một thông điệp thống nhất không?

---
Viết báo cáo bằng TIẾNG VIỆT theo cấu trúc Markdown sau:

### BÁO CÁO THẨM ĐỊNH TÁC PHẨM — 19 TUYỆT CHIÊU THỊ GIÁC

**1. ĐIỂM SÁNG (STRENGTHS):**
*   [Phân tích kỹ từng điểm đã đạt — liên hệ cụ thể tên tuyệt chiêu]

**2. ĐIỂM CẦN CẢI THIỆN (WEAKNESSES):**
*   [Phân tích chi tiết từng điểm yếu — liên hệ tên tuyệt chiêu, giải thích lý do ảnh hưởng cảm xúc]

**3. KẾ HOẠCH HÀNH ĐỘNG CHO LẦN CHỤP SAU:**
*   [Checklist cụ thể từng bước cải thiện, gắn với tuyệt chiêu tương ứng]

---
Cuối báo cáo, xuất 2 khối dữ liệu kỹ thuật theo định dạng chính xác sau đây (không thêm ký tự nào khác ngoài nội dung JSON):

||SCORES||{"sucManh":85,"mucDich":80,"bieuTuong":70,"duongNet":75,"hinhKhoi":80,"khongGian":70,"anhSang":65,"mauSac":85,"tuongPhan":80,"chatLieu":70,"kichThuoc":78,"khongKy":65,"bocuc":82,"gocChup":75,"tieuDiem":70,"nhipDieu":68,"canBang":72,"phamCap":80,"tinhThong":75}||

||PROMPT_CONFIG||{"subject":"Short English description of actual subject in this photo","gpt_image_prompt":"Optimized prompt for GPT Image 2 (focusing on extreme realism, high-fidelity photographic accuracy, natural textures, matching reality and the original photo details) correcting all weaknesses","midjourney_prompt":"Optimized prompt for Midjourney v6.0 (focusing on artistic and aesthetic excellence, cinematic styling, rich color grading, beautiful rendering, stylized look) correcting all weaknesses","nanobana_prompt":"Optimized prompt for Nanobana 2 (focusing on creative visual cues, descriptive detail, and conversational prompt instructions) correcting all weaknesses"}||

QUAN TRỌNG: Thay thế tất cả các con số trong ||SCORES|| bằng điểm số THỰC TẾ (0-100) của bức ảnh này dựa trên phân tích của bạn cho từng tiêu chí. Không giữ nguyên các số mẫu trên.`;

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{
                parts: [
                  { text: prompt },
                  { inlineData: { mimeType: mimeType, data: base64Data } }
                ]
              }],
              generationConfig: { temperature: 0.3 }
            })
          }
        );

        if (!response.ok) throw new Error('API request failed. Key có thể không hợp lệ.');

        const data = await response.json();
        const textCritique = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!textCritique) throw new Error('Không nhận được phản hồi phân tích từ Gemini.');

        let cleanedReport = textCritique;
        let safeScores = { ...EMPTY_DETAILED_SCORES };
        let parsedAiData = null;

        // Parse ||SCORES|| block — real 19-principle scores from Gemini
        const scoresMatch = textCritique.match(/\|\|SCORES\|\|(\{[\s\S]*?\})\|\|/);
        if (scoresMatch) {
          try {
            const rawScores = JSON.parse(scoresMatch[1].trim()) as Partial<DetailedScores>;
            safeScores = { ...EMPTY_DETAILED_SCORES, ...rawScores };
            setDetailedScores(safeScores);
            setScores(computeAggregates(safeScores));
            cleanedReport = cleanedReport.replace(/\|\|SCORES\|\|[\s\S]*?\|\|/, '').trim();
          } catch (e) {
            console.error('Failed to parse SCORES block', e);
          }
        }

        // Parse ||PROMPT_CONFIG|| block — subject & AI prompts
        const configMatch = cleanedReport.match(/\|\|PROMPT_CONFIG\|\|([\s\S]*?)\|\|/);
        if (configMatch) {
          try {
            parsedAiData = JSON.parse(configMatch[1].trim());
            setAiPromptData(parsedAiData);
            cleanedReport = cleanedReport.replace(/\|\|PROMPT_CONFIG\|\|([\s\S]*?)\|\|/, '').trim();
          } catch (e) {
            console.error('Failed to parse PROMPT_CONFIG block', e);
            setAiPromptData(null);
          }
        } else {
          setAiPromptData(null);
        }

        // Store clean report
        setCritiqueReport(cleanedReport);
        
        // Save to critique history
        const finalScores = computeAggregates(safeScores);
        const title = selectedDemoId 
          ? (selectedDemoId === 'demo-portrait' ? 'Banner Thời trang Biển (KOL)' : 'Đường cong cồn cát Hoàng hôn') 
          : (imageSubject.trim() || 'Ảnh tự tải lên');
        addToHistory(title, imageSrc, finalScores, safeScores, cleanedReport, pins, parsedAiData);

      } catch (err: any) {
        alert(err.message || 'Lỗi kết nối API. Vui lòng kiểm tra lại API Key.');
      } finally {
        setIsAnalyzing(false);
      }
    } 
    // Scenario B: Offline/Self-diagnosis compiling from pins
    else {
      setAnalysisProgress('Đang tổng hợp dữ liệu chẩn đoán thủ công...');
      await new Promise(r => setTimeout(r, 1200));

      let activePins = [...pins];
      let goods = activePins.filter(p => p.status === 'good');
      let bads = activePins.filter(p => p.status === 'bad');

      let compiledReport = '';

      if (activePins.length === 0) {
        // Create 2 default pins to guide the user visually on their image
        const defaultPins: DiagnosticPin[] = [
          {
            id: 'default-pin-1',
            x: 33.3,
            y: 33.3,
            category: 'bocuc',
            status: 'good',
            term: 'Quy tắc 1/3 (Rule of thirds)',
            notes: 'Bố cục phần chính của chủ thể nằm ở giao điểm 1/3 lý tưởng.'
          },
          {
            id: 'default-pin-2',
            x: 66.6,
            y: 50.0,
            category: 'anhsang',
            status: 'bad',
            term: 'Ánh sáng bên (Side Light)',
            notes: 'Vùng tối ở rìa đối diện hơi sâu, làm mất chi tiết khối (Shadow clipping).'
          }
        ];
        setPins(defaultPins);
        activePins = defaultPins;
        goods = [defaultPins[0]];
        bads = [defaultPins[1]];

        compiledReport = `### BÁO CÁO TỰ CHẨN ĐOÁN THI GIÁC (MẪU TỰ ĐỘNG)

Hệ thống đã tự động đặt **2 điểm chẩn đoán mẫu** trên ảnh của bạn để làm hướng dẫn (bạn có thể click trực tiếp vào các ghim này để chỉnh sửa hoặc click lên bất kỳ vị trí nào khác trên ảnh để tự đánh giá):

**1. ĐIỂM SÁNG ĐÃ ĐẠT ĐƯỢC (STRENGTHS):**
*   **[Bố cục] - Quy tắc 1/3:** Bố cục phần chính của chủ thể nằm ở giao điểm 1/3 lý tưởng, tạo ra không gian thở cân đối cho bức ảnh.

**2. ĐIỂM CẦN CẢI THIỆN (WEAKNESSES):**
*   **[Ánh sáng] - Ánh sáng bên:** Vùng tối ở phía đối diện nguồn sáng chính hơi bị mất chi tiết, cần tăng cường nguồn sáng phụ để làm mềm bóng đổ.

**3. KẾ HOẠCH HÀNH ĐỘNG CHO LẦN CHỤP SAU:**
1. Hãy chủ động click vào các vị trí khác trên ảnh để tự đánh giá thêm các yếu tố Đường nét, Màu sắc, hoặc Chất liệu.
2. Sử dụng thêm một tấm hắt sáng (Reflector) ở góc 135 độ so với nguồn sáng chính để phản hồi lại 10-15% chi tiết vùng tối.`;
      } else {
        // Compile user pins into a beautiful report
        compiledReport = `### BÁO CÁO TỰ CHẨN ĐOÁN THI GIÁC (SELF-CRITIQUE REPORT)

Báo cáo được tổng hợp dựa trên **${activePins.length} điểm ghim chẩn đoán thị giác** do bạn trực tiếp đánh dấu trên tác phẩm.

**1. ĐIỂM SÁNG ĐÃ ĐẠT ĐƯỢC (STRENGTHS):**
${goods.length > 0 
  ? goods.map(p => `*   **[${categories[p.category].label}] - ${p.term}:** ${p.notes || 'Thực hiện tốt kỹ thuật.'}`).join('\n')
  : '*   Chưa đánh dấu điểm sáng nào. Bạn hãy tự tin tìm ra những nét bố cục hoặc ánh sáng tốt của bức ảnh và ghim lại!'
}

**2. ĐIỂM CẦN CẢI THIỆN (WEAKNESSES):**
${bads.length > 0 
  ? bads.map(p => `*   **[${categories[p.category].label}] - ${p.term}:** ${p.notes || 'Cần điều chỉnh lại thông số hoặc góc chụp để hạn chế lỗi.'}`).join('\n')
  : '*   Tuyệt vời! Không có lỗi bố cục hay ánh sáng nào bị đánh dấu.'
}

**3. KẾ HOẠCH HÀNH ĐỘNG CHO LẦN CHỤP SAU:**
${bads.length > 0
  ? bads.map((p, i) => `${i+1}. Đối với **${p.term}**: Cần lập pre-visualization (hình dung trước), đo sáng cẩn thận và kiểm tra xem có vật thể gây xao nhãng nào ở rìa ảnh không.`).join('\n')
  : '1. Tiếp tục duy trì phong cách bố cục và kỹ thuật ánh sáng này.\n2. Thực hành thêm ở các điều kiện ánh sáng khó hơn (ngược sáng, đêm muộn) để nâng cao tay nghề.'
}`;
      }

      // Calculate scores based on ratio of good/bad pins
      const total = activePins.length;
      const goodCount = goods.length;
      const baseScore = Math.floor((goodCount / total) * 40) + 55; // range 55-95

      const calculatedScores = {
        bocuc: activePins.some(p => p.category === 'bocuc') 
          ? Math.min(98, baseScore + (goods.filter(p => p.category === 'bocuc').length * 5) - (bads.filter(p => p.category === 'bocuc').length * 8)) 
          : 75,
        anhsang: activePins.some(p => p.category === 'anhsang') 
          ? Math.min(98, baseScore + (goods.filter(p => p.category === 'anhsang').length * 5) - (bads.filter(p => p.category === 'anhsang').length * 8)) 
          : 70,
        mausac: activePins.some(p => p.category === 'mausac') 
          ? Math.min(98, baseScore + (goods.filter(p => p.category === 'mausac').length * 5) - (bads.filter(p => p.category === 'mausac').length * 8)) 
          : 80,
        chatlieu: activePins.some(p => p.category === 'chatlieu') 
          ? Math.min(98, baseScore + (goods.filter(p => p.category === 'chatlieu').length * 5) - (bads.filter(p => p.category === 'chatlieu').length * 8)) 
          : 70
      };

      setScores(calculatedScores);
      setCritiqueReport(compiledReport);
      setIsAnalyzing(false);

      // Create synthetic 19 detailed scores for offline review
      const offlineDetailedScores: DetailedScores = {
        sucManh: calculatedScores.chatlieu, mucDich: calculatedScores.chatlieu, bieuTuong: calculatedScores.chatlieu,
        duongNet: calculatedScores.chatlieu, hinhKhoi: calculatedScores.chatlieu, khongGian: calculatedScores.anhsang,
        anhSang: calculatedScores.anhsang, mauSac: calculatedScores.mausac, tuongPhan: calculatedScores.mausac,
        chatLieu: calculatedScores.mausac, kichThuoc: calculatedScores.bocuc, khongKy: calculatedScores.chatlieu,
        bocuc: calculatedScores.bocuc, gocChup: calculatedScores.bocuc, tieuDiem: calculatedScores.bocuc,
        nhipDieu: calculatedScores.bocuc, canBang: calculatedScores.anhsang, phamCap: calculatedScores.chatlieu,
        tinhThong: calculatedScores.chatlieu
      };

      const title = selectedDemoId 
        ? (selectedDemoId === 'demo-portrait' ? 'Banner Thời trang Biển (KOL)' : 'Đường cong cồn cát Hoàng hôn') 
        : (imageSubject.trim() || 'Ảnh tự chẩn đoán');
      
      addToHistory(title, imageSrc, calculatedScores, offlineDetailedScores, compiledReport, activePins, null);
    }
  };

  const handleReset = () => {
    setImageSrc(null);
    setSelectedDemoId(null);
    setPins([]);
    setActivePinId(null);
    setCritiqueReport(null);
    setScores({ bocuc: 0, anhsang: 0, mausac: 0, chatlieu: 0 });
  };

  const mockToc = [
    { id: 'canvas', label: 'Bàn dựng chẩn đoán', level: 1 },
    { id: 'critique', label: 'Báo cáo chẩn đoán', level: 1 }
  ];

  return (
    <DocsLayout tocSections={mockToc}>
      <article className="min-h-screen text-[#e4e4ed] bg-[#050508] relative font-sans leading-relaxed selection:bg-[#a94338]/30 selection:text-white pt-12 md:pt-16 pb-20 px-6 lg:px-12">
        
        {/* Glow ambient background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute top-[15%] right-[10%] w-[500px] h-[500px] rounded-full bg-[#7c8aff]/3 blur-[140px] mix-blend-screen" />
          <div className="absolute bottom-[20%] left-[5%] w-[420px] h-[420px] rounded-full bg-[#a94338]/4 blur-[130px] mix-blend-screen" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* HEADER */}
          <header className="mb-12 border-b border-white/[0.06] pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 mb-3 bg-[#38bdf8]/10 border border-[#38bdf8]/20 px-3 py-1 rounded-full text-xs font-mono text-[#38bdf8]">
                <HugeiconsIcon icon={AiScanIcon} size={13} className="animate-pulse" />
                <span>AI PHOTO CRITIQUE LAB</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-serif text-white tracking-tight">Phòng Lab Phân Tích & Chẩn Đoán Ảnh</h1>
              <p className="text-sm text-[#9d9db5] mt-2 max-w-2xl">
                Tải lên tác phẩm của bạn, tự ghim các điểm chẩn đoán lỗi kỹ thuật / điểm sáng nghệ thuật, hoặc kết nối **Google Gemini AI** để nhận báo cáo phân tích thị giác tự động tức thì.
              </p>
            </div>
            
            <button
              onClick={handleReset}
              className="px-4 py-2 border border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.04] rounded-lg text-xs font-mono text-[#9d9db5] flex items-center gap-2 cursor-pointer"
            >
              <HugeiconsIcon icon={ReloadIcon} size={12} />
              Đặt lại Bàn dựng
            </button>
          </header>

          {/* GEMINI CONNECTION PANEL */}
          <section className="mb-8 p-6 rounded-2xl bg-white/[0.01] border border-white/[0.04] backdrop-blur-md">
            <button
              onClick={() => setShowApiKey(!showApiKey)}
              className="w-full flex justify-between items-center text-left bg-transparent border-none cursor-pointer text-[#e4e4ed]"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#38bdf8]/10 flex items-center justify-center text-[#38bdf8]">
                  <HugeiconsIcon icon={SparklesIcon} size={15} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-100">Kích hoạt Phân tích Tự động bằng Google Gemini AI (Tùy chọn)</h3>
                  <p className="text-xs text-[#5a5a72] mt-0.5">
                    {apiKey ? '✓ Đã kết nối khóa API Gemini' : 'Nhập Gemini API Key để nhận phản hồi phân tích hình ảnh thông minh từ mô hình Vision.'}
                  </p>
                </div>
              </div>
              <span className="text-xs text-[#5a5a72] font-mono hover:text-white transition-colors">
                {showApiKey ? 'ẨN CẤU HÌNH ▲' : 'HIỆN CẤU HÌNH ▼'}
              </span>
            </button>

            <AnimatePresence>
              {showApiKey && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden mt-6 pt-6 border-t border-white/[0.06]"
                >
                  <div className="max-w-xl">
                    <label className="text-xs font-mono text-[#9d9db5] block mb-2">GOOGLE GEMINI API KEY</label>
                    <div className="flex gap-3">
                      <input
                        type="password"
                        placeholder="AIzaSy..."
                        value={apiKey}
                        onChange={(e) => handleSaveApiKey(e.target.value)}
                        className="flex-grow px-4 py-2.5 rounded-lg bg-black/45 border border-white/10 text-xs text-slate-100 placeholder:text-white/20 focus:outline-none focus:border-[#38bdf8]/50"
                      />
                      {apiKey && (
                        <button
                          onClick={() => handleSaveApiKey('')}
                          className="px-3 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 text-xs hover:bg-red-500/20 cursor-pointer"
                        >
                          Xóa khóa
                        </button>
                      )}
                    </div>
                    <p className="text-[10px] text-[#5a5a72] mt-2 leading-relaxed">
                      API Key được lưu trữ trực tiếp trên LocalStorage của trình duyệt cá nhân, hoàn toàn không được gửi về bất kỳ máy chủ trung gian nào. Bạn có thể lấy Key miễn phí tại Google AI Studio.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* MAIN LAB WORKSPACE GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Col: Canvas Area (7 Cols) */}
            <div id="canvas" className="lg:col-span-7 flex flex-col gap-6 scroll-mt-20">
              
              {/* SIDE-BY-SIDE COMPARISON SNAPSHOT CARD — 19 TUYỆT CHIÊU */}
              {originalSnapshot && (
                <div className="p-5 rounded-2xl bg-gradient-to-br from-[#0f0f1c] to-[#15152a] border border-[#7c8aff]/20 relative overflow-hidden">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-mono text-[#7c8aff] tracking-wider uppercase flex items-center gap-2">
                      <HugeiconsIcon icon={Compass01Icon} size={12} />
                      <span>ĐỐI CHIẾU 19 TUYỆT CHIÊU — BEFORE vs AFTER</span>
                    </span>
                    <button
                      onClick={clearComparison}
                      className="text-[9px] font-mono px-2 py-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded cursor-pointer transition-colors"
                    >
                      Xóa đối chiếu ✕
                    </button>
                  </div>

                  {/* Photo thumbnails + total score delta */}
                  <div className="flex gap-3 mb-4">
                    <div className="flex gap-2 items-center bg-black/30 p-2 rounded-xl border border-white/[0.03] flex-1">
                      <div className="w-12 aspect-square rounded overflow-hidden bg-black shrink-0 border border-white/5">
                        <img src={originalSnapshot.src} className="w-full h-full object-cover" alt="Original" />
                      </div>
                      <div>
                        <div className="text-[9px] font-mono text-slate-500 uppercase">TRƯỚC (Before)</div>
                        <div className="text-base font-mono font-bold text-white">
                          {Math.round(Object.values(originalSnapshot.detailedScores).reduce((a,b)=>a+b,0)/19)}
                          <span className="text-[9px] text-slate-500">/100</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center text-[#7c8aff] text-lg">→</div>
                    <div className="flex gap-2 items-center bg-[#7c8aff]/5 p-2 rounded-xl border border-[#7c8aff]/15 flex-1">
                      <div className="w-12 aspect-square rounded overflow-hidden bg-black shrink-0 border border-[#7c8aff]/20">
                        {imageSrc 
                          ? <img src={imageSrc} className="w-full h-full object-cover" alt="After" />
                          : <div className="w-full h-full flex items-center justify-center text-[#5a5a72] text-[8px] text-center p-1">Chưa có ảnh</div>
                        }
                      </div>
                      <div>
                        <div className="text-[9px] font-mono text-[#7c8aff] uppercase">SAU (After)</div>
                        <div className="text-base font-mono font-bold text-white">
                          {Math.round(Object.values(detailedScores).reduce((a,b)=>a+b,0)/19)}
                          <span className="text-[9px] text-slate-500">/100</span>
                        </div>
                        {(() => {
                          const before = Math.round(Object.values(originalSnapshot.detailedScores).reduce((a,b)=>a+b,0)/19);
                          const after = Math.round(Object.values(detailedScores).reduce((a,b)=>a+b,0)/19);
                          const delta = after - before;
                          return delta !== 0 ? (
                            <span className={`text-[10px] font-mono font-bold ${delta > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                              {delta > 0 ? '+' : ''}{delta}%
                            </span>
                          ) : null;
                        })()}
                      </div>
                    </div>
                  </div>

                  {/* 19-principle comparison bars */}
                  <div className="flex flex-col gap-1.5">
                    {(Object.entries(originalSnapshot.detailedScores) as [keyof DetailedScores, number][]).map(([key, beforeVal]) => {
                      const labels: Record<keyof DetailedScores, string> = {
                        sucManh: '1. Sức mạnh', mucDich: '2. Mục đích', bieuTuong: '3. Biểu tượng',
                        duongNet: '4. Đường nét', hinhKhoi: '5. Hình khối', khongGian: '6. Không gian',
                        anhSang: '7. Ánh sáng', mauSac: '8. Màu sắc', tuongPhan: '9. Tương phản',
                        chatLieu: '10. Chất liệu', kichThuoc: '11. Kích thước', khongKy: '12. Không kỳ',
                        bocuc: '13. Bố cục', gocChup: '14. Góc chụp', tieuDiem: '15. Tiêu điểm',
                        nhipDieu: '16. Nhịp điệu', canBang: '17. Cân bằng', phamCap: '18. Phẩm cấp', tinhThong: '19. Tinh Thống',
                      };
                      const afterVal = detailedScores[key];
                      const delta = afterVal - beforeVal;
                      const hasData = afterVal > 0;
                      return (
                        <div key={key} className="flex items-center gap-2">
                          <span className="text-[8px] text-[#5a5a72] w-24 shrink-0 truncate">{labels[key]}</span>
                          <div className="flex-1 flex items-center gap-1">
                            <div className="flex-1 h-1 bg-white/[0.04] rounded-full overflow-hidden">
                              <div className="h-full bg-white/20 rounded-full" style={{ width: `${beforeVal}%` }} />
                            </div>
                            <span className="text-[8px] font-mono text-slate-500 w-7 text-right">{beforeVal > 0 ? `${beforeVal}` : '—'}</span>
                          </div>
                          {hasData ? (
                            <>
                              <span className={`text-[8px] font-mono w-9 text-center font-bold shrink-0 ${delta > 0 ? 'text-emerald-400' : delta < 0 ? 'text-red-400' : 'text-slate-500'}`}>
                                {delta > 0 ? `+${delta}` : delta < 0 ? `${delta}` : '='} 
                              </span>
                              <div className="flex-1 flex items-center gap-1">
                                <span className="text-[8px] font-mono text-slate-400 w-7">{afterVal}</span>
                                <div className="flex-1 h-1 bg-white/[0.04] rounded-full overflow-hidden">
                                  <div
                                    className="h-full rounded-full transition-all"
                                    style={{ width: `${afterVal}%`, background: delta > 0 ? '#22c55e' : delta < 0 ? '#ef4444' : '#5a5a72' }}
                                  />
                                </div>
                              </div>
                            </>
                          ) : (
                            <span className="text-[8px] font-mono text-[#5a5a72] w-28 text-center shrink-0">⏳ chờ phân tích</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Image Light Table Canvas */}
              <div className="p-4 rounded-2xl bg-white/[0.01] border border-white/[0.06] backdrop-blur-md flex flex-col justify-between">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-mono text-[#5a5a72] tracking-widest uppercase">
                    {imageSrc ? 'LIGHT TABLE CANVAS' : 'UPLOAD WORKSPACE'}
                  </span>
                  {imageSrc && (
                    <span className="text-[9px] font-mono text-amber-500 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
                      {!apiKey ? 'MODE: SELF-CRITIQUE (CLICK ON IMAGE TO PIN)' : 'MODE: GEMINI READY (CLICK TO PIN OPTIONALLY)'}
                    </span>
                  )}
                </div>

                {originalSnapshot && imageSrc && (
                  <div className="flex gap-1.5 mb-3 bg-black/45 p-1 rounded-lg border border-white/5">
                    <button
                      type="button"
                      onClick={() => setViewMode('canvas')}
                      className={`flex-1 py-1.5 rounded-md text-[11px] font-semibold cursor-pointer transition-colors ${viewMode === 'canvas' ? 'bg-[#a94338] text-white font-bold' : 'text-[#9d9db5] hover:text-white'}`}
                    >
                      Bàn dựng Chẩn đoán (Pins)
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode('slider')}
                      className={`flex-1 py-1.5 rounded-md text-[11px] font-semibold cursor-pointer transition-colors ${viewMode === 'slider' ? 'bg-[#a94338] text-white font-bold' : 'text-[#9d9db5] hover:text-white'}`}
                    >
                      Thanh trượt Before / After
                    </button>
                  </div>
                )}

                {imageSrc && !selectedDemoId && (
                  <div className="mb-4 p-3.5 rounded-xl bg-black/45 border border-white/5">
                    <label className="text-[9px] font-mono text-[#38bdf8] block mb-1.5 uppercase tracking-wider">
                      Chủ thể bức ảnh của bạn (Ví dụ: Cốc cà phê, Chân dung...):
                    </label>
                    <input
                      type="text"
                      placeholder="Nhập tên chủ đề/chủ thể ảnh để tối ưu hóa Prompt JSON..."
                      value={imageSubject}
                      onChange={(e) => setImageSubject(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-xs text-slate-100 placeholder:text-white/20 focus:outline-none focus:border-[#38bdf8]/40"
                    />
                  </div>
                )}

                {/* Upload Zone / Canvas Container */}
                <div className="relative w-full aspect-video rounded-xl bg-black/50 border border-white/[0.04] overflow-hidden flex items-center justify-center">
                  {!imageSrc ? (
                    <div className="p-8 text-center flex flex-col items-center max-w-sm">
                      <div className="w-16 h-16 rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center text-slate-400 mb-6">
                        <HugeiconsIcon icon={Upload01Icon} size={28} />
                      </div>
                      
                      <h3 className="text-base font-serif text-slate-200 mb-2">
                        {originalSnapshot ? 'Tải ảnh cải tiến (After) từ AI lên' : 'Tải ảnh chụp của bạn lên'}
                      </h3>
                      <p className="text-xs text-[#9d9db5] leading-relaxed mb-6">
                        {originalSnapshot 
                          ? 'Tải lên bức ảnh mới được cải tiến bằng Prompt AI tối ưu để tiến hành so sánh đối chiếu chỉ số.'
                          : 'Chọn tệp ảnh (.jpg, .png) cần thẩm định hoặc trải nghiệm nhanh bằng ảnh chụp mẫu bên dưới.'}
                      </p>
                      
                      <label className="px-5 py-2.5 rounded-lg bg-[#a94338] hover:bg-red-700 text-white font-semibold text-xs transition-all shadow-md cursor-pointer">
                        Chọn tệp hình ảnh
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  ) : viewMode === 'slider' && originalSnapshot ? (
                    /* Before/After slider mode */
                    <div className="w-full h-full">
                      <ImageComparisonSlider
                        originalSrc={originalSnapshot.src}
                        improvedSrc={imageSrc}
                        originalLabel="Ảnh Gốc (Before)"
                        improvedLabel="Ảnh Cải Tiến (After)"
                        aspectRatio="aspect-auto w-full h-full"
                      />
                    </div>
                  ) : (
                    // Interactive Canvas Screen
                    <div
                      onClick={handleCanvasClick}
                      className="relative w-full h-full cursor-crosshair group overflow-hidden flex items-center justify-center bg-black/40"
                    >
                      <img
                        src={imageSrc}
                        alt="Workspace Preview"
                        className="w-full h-full object-contain pointer-events-none"
                      />

                      {/* Floating glowing grid overlays on hover */}
                      <div className="absolute inset-0 border border-white/5 pointer-events-none grid grid-cols-3 grid-rows-3 opacity-0 group-hover:opacity-30 transition-opacity duration-500">
                        <div className="border border-white/5" />
                        <div className="border border-white/5" />
                        <div className="border border-white/5" />
                        <div className="border border-white/5" />
                        <div className="border border-white/5" />
                        <div className="border border-white/5" />
                        <div className="border border-white/5" />
                        <div className="border border-white/5" />
                        <div className="border border-white/5" />
                      </div>

                      {/* Glowing pins render */}
                      {pins.map((pin) => (
                        <div
                          key={pin.id}
                          style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActivePinId(pin.id);
                            setPinCategory(pin.category);
                            setPinStatus(pin.status);
                            setPinTerm(pin.term);
                            setPinNotes(pin.notes);
                          }}
                          className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 flex items-center justify-center group/pin"
                        >
                          <span
                            className="w-8 h-8 rounded-full animate-ping absolute opacity-45"
                            style={{ backgroundColor: pin.status === 'good' ? '#22c55e' : '#a94338' }}
                          />
                          <span
                            className="w-5 h-5 rounded-full flex items-center justify-center shadow-lg border border-white/30 text-[9px] font-mono text-white font-bold"
                            style={{ backgroundColor: pin.status === 'good' ? '#22c55e' : '#a94338' }}
                          >
                            {pin.status === 'good' ? '✓' : '!'}
                          </span>
                          
                          {/* Mini hover tag */}
                          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/90 border border-white/10 px-2 py-0.5 rounded text-[8px] font-mono text-white whitespace-nowrap opacity-0 group-hover/pin:opacity-100 transition-opacity pointer-events-none">
                            {pin.term}
                          </div>
                        </div>
                      ))}

                    </div>
                  )}
                </div>

                {/* Pin Info Overlay Form */}
                <AnimatePresence>
                  {activePinId && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] overflow-hidden"
                    >
                      <div className="flex justify-between items-center border-b border-white/[0.06] pb-3 mb-4">
                        <span className="text-[10px] font-mono text-[#38bdf8] uppercase tracking-wider flex items-center gap-1">
                          <HugeiconsIcon icon={FocusIcon} size={12} /> Cấu hình Điểm ghim chẩn đoán
                        </span>
                        <button
                          onClick={(e) => deletePin(activePinId, e)}
                          className="text-red-400 hover:text-white bg-transparent border-none cursor-pointer text-[10px] font-semibold flex items-center gap-1"
                        >
                          <HugeiconsIcon icon={Delete02Icon} size={11} /> Xóa ghim
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        {/* 1. Category */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-mono text-[#9d9db5] uppercase">Phân mục</label>
                          <select
                            value={pinCategory}
                            onChange={(e) => handleCategoryChange(e.target.value as keyof typeof categories)}
                            className="w-full px-3 py-1.5 rounded bg-black border border-white/10 text-xs text-slate-100 focus:outline-none"
                          >
                            {Object.entries(categories).map(([k, v]) => (
                              <option key={k} value={k}>{v.label.split(' (')[0]}</option>
                            ))}
                          </select>
                        </div>

                        {/* 2. Status */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-mono text-[#9d9db5] uppercase">Đánh giá</label>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => setPinStatus('good')}
                              className={`flex-1 py-1 rounded text-xs font-semibold cursor-pointer border ${pinStatus === 'good' ? 'bg-green-500/10 border-green-500 text-green-400' : 'bg-transparent border-white/10 text-[#9d9db5]'}`}
                            >
                              Đạt (Good)
                            </button>
                            <button
                              type="button"
                              onClick={() => setPinStatus('bad')}
                              className={`flex-1 py-1 rounded text-xs font-semibold cursor-pointer border ${pinStatus === 'bad' ? 'bg-red-500/10 border-red-500 text-red-400' : 'bg-transparent border-white/10 text-[#9d9db5]'}`}
                            >
                              Lỗi (Needs Fix)
                            </button>
                          </div>
                        </div>

                        {/* 3. Technique Terms */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-mono text-[#9d9db5] uppercase">Quy chuẩn ngữ pháp</label>
                          <select
                            value={pinTerm}
                            onChange={(e) => setPinTerm(e.target.value)}
                            className="w-full px-3 py-1.5 rounded bg-black border border-white/10 text-xs text-slate-100 focus:outline-none"
                          >
                            {categoryTerms[pinCategory].map((t) => (
                              <option key={t} value={t}>{t}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Notes input */}
                      <div className="flex flex-col gap-1.5 mb-4">
                        <label className="text-[10px] font-mono text-[#9d9db5] uppercase">Ghi chú cụ thể</label>
                        <input
                          type="text"
                          placeholder="Ví dụ: Cánh tay chủ thể gập khúc hướng chéo tạo đường chéo động tốt..."
                          value={pinNotes}
                          onChange={(e) => setPinNotes(e.target.value)}
                          className="w-full px-3 py-2 rounded bg-black border border-white/10 text-xs text-slate-100 focus:outline-none"
                        />
                      </div>

                      <button
                        onClick={updateActivePin}
                        className="w-full py-2 bg-[#a94338] hover:bg-red-700 text-white font-semibold text-xs rounded transition-colors border-none cursor-pointer"
                      >
                        Xác nhận ghim chẩn đoán
                      </button>

                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* DEMO IMAGES INSPIRATION BOX */}
              {!imageSrc && (
                <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/[0.04] backdrop-blur-md">
                  <h3 className="text-sm font-serif text-slate-200 mb-4 flex items-center gap-1.5">
                    <HugeiconsIcon icon={BookOpen01Icon} size={14} className="text-[#38bdf8]" />
                    <span>Hoặc trải nghiệm bằng Ảnh chụp mẫu:</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {demoImages.map((demo) => (
                      <button
                        key={demo.id}
                        onClick={() => selectDemoImage(demo)}
                        className="flex gap-4 p-3 rounded-xl border border-white/[0.04] bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.02] text-left transition-colors cursor-pointer group"
                      >
                        <div className="w-20 aspect-square rounded overflow-hidden bg-black shrink-0 relative">
                          <img
                            src={demo.src}
                            alt={demo.title}
                            className="w-full h-full object-cover grayscale saturate-50 group-hover:scale-105 transition-transform duration-700"
                          />
                        </div>
                        <div className="flex-grow flex flex-col justify-center">
                          <h4 className="text-xs font-semibold text-slate-200">{demo.title}</h4>
                          <span className="text-[10px] font-mono text-[#5a5a72] block mt-1">CLICK TO RUN MENTOR CRITIQUE</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* CRITIQUE HISTORY PANEL */}
              {critiqueHistory.length > 0 && (
                <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/[0.04] backdrop-blur-md mt-6">
                  <h3 className="text-sm font-serif text-slate-200 mb-4 flex items-center gap-1.5">
                    <HugeiconsIcon icon={ReloadIcon} size={14} className="text-[#a855f7] animate-spin-slow" />
                    <span>Lịch sử thẩm định gần đây:</span>
                  </h3>
                  
                  <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto pr-1">
                    {critiqueHistory.map((item) => {
                      const totalScore = Math.round(Object.values(item.detailedScores).reduce((a, b) => a + b, 0) / 19);
                      return (
                        <div
                          key={item.id}
                          onClick={() => loadHistoryItem(item)}
                          className="flex items-center gap-4 p-2.5 rounded-xl border border-white/[0.03] bg-black/20 hover:border-white/10 hover:bg-white/[0.01] transition-all cursor-pointer group"
                        >
                          <div className="w-12 aspect-square rounded overflow-hidden bg-black shrink-0 border border-white/5">
                            <img src={item.imageSrc} className="w-full h-full object-cover" alt={item.title} />
                          </div>
                          
                          <div className="flex-grow min-w-0">
                            <div className="flex justify-between items-start gap-1">
                              <h4 className="text-xs font-semibold text-slate-200 truncate">{item.title}</h4>
                              <span className="text-[9px] font-mono text-emerald-400 font-bold shrink-0">{totalScore}%</span>
                            </div>
                            <div className="flex justify-between items-center mt-1">
                              <span className="text-[9px] font-mono text-[#5a5a72]">{item.date}</span>
                              <button
                                onClick={(e) => deleteHistoryItem(item.id, e)}
                                className="text-[9px] text-[#5a5a72] hover:text-red-400 p-0.5 rounded cursor-pointer transition-colors border-none bg-transparent"
                                title="Xóa lịch sử"
                              >
                                ✕
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Visual Deconstruction Reference Lab */}
              <div className="mt-6">
                <VisualDeconstructionLab defaultPreset="portrait" />
              </div>
            </div>

            {/* Right Col: Critique Output Dashboard (5 Cols) */}
            <div id="critique" className="lg:col-span-5 flex flex-col gap-6 scroll-mt-20">
              
              {/* Critique trigger button */}
              {imageSrc && !critiqueReport && !isAnalyzing && (
                <button
                  onClick={runCritiqueAnalysis}
                  className="w-full py-4 bg-[#a94338] hover:bg-red-700 text-white font-semibold text-sm rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer border-none"
                >
                  <HugeiconsIcon icon={AiScanIcon} size={16} />
                  <span>{apiKey.trim() ? 'Bắt đầu AI Phân tích Tác phẩm (Gemini)' : 'Lập Báo cáo Tự Chẩn đoán'}</span>
                </button>
              )}

              {/* Loader */}
              {isAnalyzing && (
                <div className="p-8 rounded-2xl border border-[#38bdf8]/15 bg-white/[0.01] backdrop-blur-md flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full border-2 border-dashed border-[#38bdf8] animate-spin flex items-center justify-center mb-6">
                    <HugeiconsIcon icon={AiScanIcon} size={18} className="text-[#38bdf8] animate-pulse" />
                  </div>
                  <h4 className="text-sm font-semibold text-slate-200 mb-2">Đang phân tích tác phẩm...</h4>
                  <p className="text-xs text-[#9d9db5] max-w-xs leading-relaxed animate-pulse">
                    {analysisProgress}
                  </p>
                </div>
              )}

              {/* Result Critique Dashboard */}
              {critiqueReport && (
                <div className="flex flex-col gap-6">
                  
                  {/* 19-Principle Scorecard */}
                  <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/[0.06] backdrop-blur-md">
                    {/* Header with overall score */}
                    <div className="flex items-center justify-between mb-5">
                      <h3 className="text-xs font-mono text-[#7c8aff] uppercase tracking-widest">THẨM ĐỊNH 19 TUYỆT CHIÊU THỊ GIÁC</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono text-[#5a5a72]">TỔNG ĐIỂM</span>
                        <span className="text-lg font-mono font-bold text-white">
                          {Math.round(Object.values(detailedScores).reduce((a, b) => a + b, 0) / 19)}
                          <span className="text-[9px] text-[#5a5a72]">/100</span>
                        </span>
                      </div>
                    </div>

                    {/* 4 Aggregate rings */}
                    <div className="grid grid-cols-4 gap-3 mb-5 pb-5 border-b border-white/[0.04]">
                      {[
                        { label: 'Bố cục', val: scores.bocuc, color: '#7c8aff' },
                        { label: 'Ánh sáng', val: scores.anhsang, color: '#ffcb6b' },
                        { label: 'Màu sắc', val: scores.mausac, color: '#fb7185' },
                        { label: 'Ngữ nghĩa', val: scores.chatlieu, color: '#22c55e' },
                      ].map(({ label, val, color }) => (
                        <div key={label} className="flex flex-col items-center gap-1">
                          <div className="relative w-12 h-12 flex items-center justify-center">
                            <ProgressRing progress={val} size={48} strokeWidth={3} color={color} />
                            <span className="text-[10px] font-mono font-bold text-slate-100">{val}%</span>
                          </div>
                          <span className="text-[8px] font-mono text-white/40 uppercase">{label}</span>
                        </div>
                      ))}
                    </div>

                    {/* 19 individual principle bars */}
                    <div className="flex flex-col gap-2.5">
                      {[
                        { group: 'NGÔN NGỮ HÌNH ẢNH', color: '#ff7e3b', items: [
                          { label: '1. Sức mạnh hình ảnh', val: detailedScores.sucManh },
                          { label: '2. Mục đích hình ảnh', val: detailedScores.mucDich },
                          { label: '3. Biểu tượng văn hóa', val: detailedScores.bieuTuong },
                        ]},
                        { group: 'NGÔN NGỮ THỊ GIÁC', color: '#a855f7', items: [
                          { label: '4. Đường nét cảm xúc', val: detailedScores.duongNet },
                          { label: '5. Nhân dạng hình khối', val: detailedScores.hinhKhoi },
                          { label: '6. Không gian âm dương', val: detailedScores.khongGian },
                          { label: '7. Ánh sáng bóng tối', val: detailedScores.anhSang },
                          { label: '8. Màu sắc', val: detailedScores.mauSac },
                          { label: '9. Tương phản màu sắc', val: detailedScores.tuongPhan },
                        ]},
                        { group: 'NGUYÊN LÝ THỊ GIÁC', color: '#38bdf8', items: [
                          { label: '10. Chất liệu bề mặt', val: detailedScores.chatLieu },
                          { label: '11. Kích thước & Tỷ lệ', val: detailedScores.kichThuoc },
                          { label: '12. Khoảng không kỳ', val: detailedScores.khongKy },
                        ]},
                        { group: 'BỐ CỤC & GÓC NHÌN', color: '#7c8aff', items: [
                          { label: '13. Bố cục', val: detailedScores.bocuc },
                          { label: '14. Góc chụp', val: detailedScores.gocChup },
                          { label: '15. Tiêu điểm & Độ sâu', val: detailedScores.tieuDiem },
                        ]},
                        { group: 'VẬN TÁC VẬN HÀNH', color: '#22c55e', items: [
                          { label: '16. Nhịp điệu thị giác', val: detailedScores.nhipDieu },
                          { label: '17. Cân bằng Tĩnh & Động', val: detailedScores.canBang },
                          { label: '18. Phẩm cấp & Điểm nhấn', val: detailedScores.phamCap },
                          { label: '19. Tinh Thống Nhất', val: detailedScores.tinhThong },
                        ]},
                      ].map(({ group, color, items }) => (
                        <div key={group} className="mb-1">
                          <div className="text-[8px] font-mono uppercase tracking-widest mb-1.5 pb-0.5 border-b border-white/[0.04]" style={{ color }}>{group}</div>
                          <div className="flex flex-col gap-1">
                            {items.map(({ label, val }) => (
                              <div key={label}>
                                <div className="flex justify-between items-center mb-0.5">
                                  <span className="text-[9px] text-[#7a7a9a] truncate pr-2">{label}</span>
                                  <span className={`text-[9px] font-mono font-bold shrink-0 ${val >= 75 ? 'text-emerald-400' : val >= 55 ? 'text-amber-400' : val > 0 ? 'text-red-400' : 'text-[#3a3a5a]'}`}>
                                    {val > 0 ? `${val}%` : '—'}
                                  </span>
                                </div>
                                <div className="h-1 bg-white/[0.04] rounded-full overflow-hidden">
                                  <div
                                    className="h-full rounded-full transition-all duration-700"
                                    style={{
                                      width: val > 0 ? `${val}%` : '0%',
                                      background: val >= 75 ? color : val >= 55 ? '#ffcb6b' : val > 0 ? '#ef4444' : 'transparent'
                                    }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Critique text report */}
                  <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/[0.06] backdrop-blur-md relative overflow-hidden">
                    {/* Decorative watermark */}
                    <div className="absolute top-4 right-4 text-[#a94338]/10 text-6xl font-serif select-none pointer-events-none font-bold">α</div>
                    
                    <div className="critique-markdown text-xs text-[#9d9db5] leading-relaxed whitespace-pre-wrap font-sans">
                      {critiqueReport}
                    </div>
                  </div>

                  {/* Action row grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* Generate JSON Prompt button */}
                    <button
                      onClick={generatePromptJson}
                      className="w-full py-3.5 bg-gradient-to-r from-[#38bdf8] to-[#7c8aff] hover:from-[#7c8aff] hover:to-[#38bdf8] text-white font-semibold text-xs rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer border-none"
                    >
                      <HugeiconsIcon icon={SparklesIcon} size={14} />
                      <span>Tạo Prompt JSON ⚡</span>
                    </button>

                    {/* Set as baseline button */}
                    <button
                      onClick={saveAsOriginalSnapshot}
                      disabled={!!originalSnapshot}
                      className={`w-full py-3.5 text-white font-semibold text-xs rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer border-none ${
                        originalSnapshot 
                          ? 'bg-[#1b1b2d] text-slate-500 cursor-not-allowed opacity-50' 
                          : 'bg-[#a94338] hover:bg-red-700'
                      }`}
                    >
                      <HugeiconsIcon icon={Compass01Icon} size={14} />
                      <span>{originalSnapshot ? 'Đã lưu ảnh gốc' : 'Đặt làm ảnh gốc đối chiếu 📊'}</span>
                    </button>
                  </div>

                </div>
              )}

              {/* Placeholder warning if no critique ran yet */}
              {!critiqueReport && !isAnalyzing && (
                <div className="p-8 rounded-2xl border border-dashed border-white/10 bg-white/[0.01] flex flex-col items-center justify-center text-center min-h-[300px]">
                  <div className="w-12 h-12 rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center text-[#5a5a72] mb-4">
                    <HugeiconsIcon icon={AiScanIcon} size={20} className="text-[#5a5a72]" />
                  </div>
                  <h4 className="text-sm font-semibold text-slate-200 mb-1">Chưa có Báo cáo thẩm định</h4>
                  <p className="text-xs text-[#9d9db5] max-w-xs leading-relaxed">
                    {imageSrc 
                      ? 'Nhấp nút "Bắt đầu AI Phân tích" hoặc "Tự chẩn đoán" ở trên để kết xuất báo cáo thẩm định tác phẩm.'
                      : 'Vui lòng chọn ảnh mẫu hoặc tải ảnh của bạn lên bàn dựng bên trái để bắt đầu.'
                    }
                  </p>
                </div>
              )}

            </div>

          </div>

        </div>

        {/* PROMPT GENERATOR MODAL */}
        <AnimatePresence>
          {showPromptModal && generatedPromptJson && (
            <>
              {/* Backdrop - separate fixed layer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowPromptModal(false)}
                className="fixed inset-0 bg-black/85 backdrop-blur-md"
                style={{ zIndex: 9998 }}
              />
              
              {/* Modal Box - sits above backdrop */}
              <motion.div
                initial={{ scale: 0.95, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, y: 20, opacity: 0 }}
                className="fixed inset-0 flex items-center justify-center p-4 pointer-events-none"
                style={{ zIndex: 9999 }}
              >
              <div className="relative w-full max-w-2xl bg-[#0f0f18] border border-white/[0.08] rounded-2xl shadow-2xl p-6 overflow-hidden pointer-events-auto max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-base font-serif text-slate-100 flex items-center gap-2">
                      <HugeiconsIcon icon={SparklesIcon} size={16} className="text-[#38bdf8]" />
                      <span>Optimized Prompt Builder (JSON)</span>
                    </h3>
                    <p className="text-[10px] text-[#9d9db5] mt-1">
                      JSON tổng hợp chẩn đoán lỗi của ảnh gốc và biên soạn prompt hoàn hảo sửa đổi điểm yếu để đưa vào các AI Generator.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowPromptModal(false)}
                    className="p-1.5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer border-none bg-transparent"
                  >
                    Đóng
                  </button>
                </div>

                {/* Preformatted code panel */}
                <div className="relative mb-4 bg-black/60 border border-white/[0.04] p-4 rounded-xl max-h-[380px] overflow-y-auto">
                  <pre className="font-mono text-[10px] text-[#38bdf8] whitespace-pre-wrap leading-relaxed select-text">
                    {generatedPromptJson}
                  </pre>
                </div>

                <div className="flex flex-wrap gap-2 justify-end">
                  <button
                    onClick={copyPromptToClipboard}
                    className="px-3 py-1.5 bg-white/[0.04] hover:bg-white/10 border border-white/10 text-white font-semibold text-[10px] rounded-lg transition-all cursor-pointer active:scale-[0.98]"
                  >
                    {copiedPrompt ? '✓ Đã sao chép!' : 'Sao chép Full JSON'}
                  </button>
                  <button
                    onClick={() => {
                      try {
                        const obj = JSON.parse(generatedPromptJson);
                        const p = obj.optimized_generative_prompts?.gpt_image_prompt 
                          || obj.optimized_generative_prompts?.positive_prompt_raw 
                          || "";
                        navigator.clipboard.writeText(p);
                        alert('Đã sao chép prompt GPT Image 2 (Thực tế) vào Clipboard!');
                      } catch (err) {
                        alert('Lỗi sao chép prompt.');
                      }
                    }}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[10px] rounded-lg transition-all cursor-pointer border-none active:scale-[0.98]"
                  >
                    Sao chép GPT Image 2
                  </button>
                  <button
                    onClick={() => {
                      try {
                        const obj = JSON.parse(generatedPromptJson);
                        const p = obj.optimized_generative_prompts?.midjourney_prompt 
                          || "";
                        navigator.clipboard.writeText(p);
                        alert('Đã sao chép prompt Midjourney (Nghệ thuật) vào Clipboard!');
                      } catch (err) {
                        alert('Lỗi sao chép prompt.');
                      }
                    }}
                    className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-[10px] rounded-lg transition-all cursor-pointer border-none active:scale-[0.98]"
                  >
                    Sao chép Midjourney
                  </button>
                  <button
                    onClick={() => {
                      try {
                        const obj = JSON.parse(generatedPromptJson);
                        const p = obj.optimized_generative_prompts?.nanobana_prompt 
                          || "";
                        navigator.clipboard.writeText(p);
                        alert('Đã sao chép prompt Nanobana 2 vào Clipboard!');
                      } catch (err) {
                        alert('Lỗi sao chép prompt.');
                      }
                    }}
                    className="px-3 py-1.5 bg-[#a94338] hover:bg-red-700 text-white font-semibold text-[10px] rounded-lg transition-all cursor-pointer border-none active:scale-[0.98]"
                  >
                    Sao chép Nanobana 2
                  </button>
                </div>
              </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

      </article>
    </DocsLayout>
  );
}

function ProgressRing({ progress, size = 64, strokeWidth = 3, color = '#7c8aff' }: {
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
        style={{ transition: 'stroke-dashoffset 400ms ease' }}
      />
    </svg>
  );
}

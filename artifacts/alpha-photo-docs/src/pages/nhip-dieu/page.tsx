

import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import {
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  GraduationCap,
  AlertTriangle,
  Lightbulb,
  Camera,
  Eye,
  Music,
  Waves,
  Sparkles,
  Layers,
  Zap,
  Palette,
  BookOpen,
  Check,
  Circle,
  Repeat,
  Shuffle,
  Activity,
} from 'lucide-react';
import DocsLayout from '@/components/docs-layout';

/* ------------------------------------------------------------------ */
/*  TOC Data                                                          */
/* ------------------------------------------------------------------ */
const tocSections = [
  { id: 'sec-1', label: 'Ⅰ. Nhịp điệu là gì', level: 1 },
  { id: 'sec-1-1', label: '1. Lặp lại với biến đổi', level: 2 },
  { id: 'sec-1-2', label: '2. Âm nhạc thị giác', level: 2 },
  { id: 'sec-1-3', label: '3. Mắt di chuyển qua hình ảnh', level: 2 },
  { id: 'sec-2', label: 'Ⅱ. Các loại nhịp điệu', level: 1 },
  { id: 'sec-2-1', label: '1. Nhịp điệu đều (Regular Rhythm)', level: 2 },
  { id: 'sec-2-2', label: '2. Nhịp điệu chảy (Flowing Rhythm)', level: 2 },
  { id: 'sec-2-3', label: '3. Nhịp điệu tiến triển (Progressive Rhythm)', level: 2 },
  { id: 'sec-2-4', label: '4. Nhịp điệu xen kẽ (Alternating Rhythm)', level: 2 },
  { id: 'sec-2-5', label: '5. Nhịp điệu rải rác (Sporadic Rhythm)', level: 2 },
  { id: 'sec-3', label: 'Ⅲ. Tạo nhịp điệu', level: 1 },
  { id: 'sec-3-1', label: '1. Lặp lại hình dạng', level: 2 },
  { id: 'sec-3-2', label: '2. Lặp lại màu sắc và đường nét', level: 2 },
  { id: 'sec-3-3', label: '3. Khoảng cách và tiến triển', level: 2 },
  { id: 'sec-3-4', label: '4. Phá pattern', level: 2 },
  { id: 'sec-4', label: 'Ⅳ. Nhịp điệu và cảm xúc', level: 1 },
  { id: 'sec-4-1', label: '1. Nhịp nhanh = Năng lượng và cấp bách', level: 2 },
  { id: 'sec-4-2', label: '2. Nhịp chậm = Bình yên và chiêm nghiệm', level: 2 },
  { id: 'sec-4-3', label: '3. Nhịp gãy = Căng thẳng và bất ngờ', level: 2 },
  { id: 'sec-4-4', label: '4. Nhịp chảy = Hòa bình và hài hòa', level: 2 },
  { id: 'sec-5', label: 'Ⅴ. Phá nhịp', level: 1 },
  { id: 'sec-5-1', label: '1. Phá pattern như tiêu điểm', level: 2 },
  { id: 'sec-5-2', label: '2. Một yếu tố khác biệt', level: 2 },
  { id: 'sec-5-3', label: '3. Bất thường như nhấn mạnh', level: 2 },
  { id: 'summary', label: 'Tóm tắt 7 điểm chính', level: 1 },
];

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */
export default function NhipDieuPage() {
  const [isRead, setIsRead] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('alpha-doc-read');
      if (saved) {
        const readPages: string[] = JSON.parse(saved);
        if (readPages.includes('/nhip-dieu')) setIsRead(true);
      }
    } catch {}
  }, []);

  const toggleRead = () => {
    try {
      const saved = localStorage.getItem('alpha-doc-read');
      const readPages: string[] = saved ? JSON.parse(saved) : [];
      if (isRead) {
        const updated = readPages.filter((p) => p !== '/nhip-dieu');
        localStorage.setItem('alpha-doc-read', JSON.stringify(updated));
        setIsRead(false);
      } else {
        const updated = [...readPages, '/nhip-dieu'];
        localStorage.setItem('alpha-doc-read', JSON.stringify(updated));
        setIsRead(true);
      }
    } catch {}
  };

  return (
    <DocsLayout tocSections={tocSections}>
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 lg:pb-8 prose-doc fade-in">
        {/* Breadcrumb */}
        <div className="breadcrumb flex items-center gap-1.5 text-xs text-[#6b6b80] mb-6">
          <a href="#">Docs</a>
          <ChevronRight size={12} />
          <a href="#">Nguyên lý vận hành</a>
          <ChevronRight size={12} />
          <span className="text-[#9d9db5]">Nhịp điệu thị giác</span>
        </div>

        {/* Badges */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold font-mono px-2 py-0.5 rounded bg-[rgba(124,138,255,0.1)] text-[#7c8aff]">
            HA16
          </span>
          <span className="text-[11px] text-[#6b6b80]">16 phút đọc · #NhipDieu #Rhythm #Pattern #NguonLucThiGiac</span>
          <span className="elite-badge">
            <GraduationCap size={11} />
            Nâng cao
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-[#e4e4ed] leading-tight mb-3 border-none pb-0">
          Nhịp điệu thị giác
        </h1>

        {/* Subtitle */}
        <p className="text-base text-[#9d9db5] leading-relaxed mb-6" style={{ marginTop: 0 }}>
          Nguyên lý vận hành · Bài 16 — Khi hình ảnh bắt đầu có nhịp đập, mắt người bắt đầu khiêu vũ
        </p>

        {/* Hero image */}
        <div className="color-overview-hero rounded-xl overflow-hidden border border-[#1e1e2a] mb-8">
          <img
            src="/hero-nhip-dieu.png"
            alt="Infographic tổng quan về nhịp điệu thị giác trong nhiếp ảnh: repetition, spacing, direction, variation, các loại nhịp điệu và ngắt nhịp"
            className="w-full h-auto object-contain"
            loading="eager"
          />
        </div>

        {/* Opening Quote */}
        <div className="quote-block">
          <p>
            &ldquo;Nhiếp ảnh là âm nhạc cho mắt. Bố cục là giai điệu, màu sắc là hòa âm, ánh sáng là nhịp điệu — và người xem là vũ công.&rdquo;
          </p>
        </div>

        {/* ============================================================ */}
        {/*  SECTION I                                                    */}
        {/* ============================================================ */}
        <h2 id="sec-1" className="scroll-mt-20">
          <span className="section-num">Ⅰ</span>
          Nhịp điệu là gì
        </h2>

        <p className="drop-cap">
          Nhịp điệu thị giác (visual rhythm) là sự lặp lại có quy luật của các yếu tố thị giác — hình dạng, màu sắc, đường nét, khoảng cách — tạo ra một dòng chảy mà mắt người có thể &ldquo;đọc&rdquo; như một bản nhạc. Nó là cầu nối giữa bố cục tĩnh và trải nghiệm động: trong khi bố cục là cấu trúc, nhịp điệu là chuyển động bên trong cấu trúc đó.
        </p>

        <hr className="doc-divider" />

        {/* 1.1 */}
        <h3 id="sec-1-1" className="scroll-mt-20">
          1. Lặp lại với biến đổi — Công thức của nhịp điệu
        </h3>

        <p>
          Nhịp điệu không chỉ là lặp lại đơn thuần — đó là pattern. Lặp lại không có biến đổi là máy móc, nhàm chán. Biến đổi không có lặp lại là hỗn loạn. Nhịp điệu xuất hiện khi cả hai cùng tồn tại: đủ lặp lại để tạo nhận dạng, đủ biến đổi để tạo sự sống.
        </p>

        <div className="callout callout-key">
          <div className="callout-title">
            <Lightbulb size={13} className="inline mr-1" />
            Pattern vs. Rhythm
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Pattern (hoa văn) là lặp lại giống hệt. Rhythm (nhịp điệu) là lặp lại có biến đổi. Gạch men trong nhà tắm là pattern. Hàng cây dọc theo con đường — mỗi cây hơi khác nhau, khoảng cách hơi thay đổi — là rhythm. Pattern tạo nền, rhythm tạo nhạc.
          </p>
        </div>

        <hr className="doc-divider" />

        {/* 1.2 */}
        <h3 id="sec-1-2" className="scroll-mt-20">
          2. Âm nhạc thị giác — Khi mắt nghe thấy
        </h3>

        <p>
          Có một sự tương đồng sâu sắc giữa âm nhạc và nhịp điệu thị giác — và đó không phải là ẩn dụ suông. Cả hai đều dựa trên lặp lại, biến đổi, và kỳ vọng. Khi bạn nhìn thấy một hàng cột kiến trúc, mắt bạn &ldquo;đọc&rdquo; nó như một chuỗi beat — và khi một cột bị thiếu hoặc khác biệt, bạn &ldquo;nghe&rdquo; sự bất thường như một nốt sai.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
          <div className="hotspot-card text-center">
            <div className="text-[#7c8aff] mb-2">
              <Repeat size={22} className="mx-auto" />
            </div>
            <p className="text-sm font-semibold text-[#e4e4ed] mb-1">Beat</p>
            <p className="text-xs text-[#9d9db5]">Mỗi yếu tố lặp lại là một beat — một đơn vị nhịp cơ bản. Hàng cây, hàng cột, dải cửa sổ.</p>
          </div>
          <div className="hotspot-card text-center">
            <div className="text-[#ffcb6b] mb-2">
              <Activity size={22} className="mx-auto" />
            </div>
            <p className="text-sm font-semibold text-[#e4e4ed] mb-1">Tempo</p>
            <p className="text-xs text-[#9d9db5]">Khoảng cách giữa các beat quyết định tốc độ nhịp. Gần nhau = nhanh, xa nhau = chậm.</p>
          </div>
          <div className="hotspot-card text-center">
            <div className="text-emerald-400 mb-2">
              <Shuffle size={22} className="mx-auto" />
            </div>
            <p className="text-sm font-semibold text-[#e4e4ed] mb-1">Variation</p>
            <p className="text-xs text-[#9d9db5]">Sự biến đổi trong lặp lại tạo ra melodie — đường cong thay đổi, màu sắc chuyển sắc, kích thước tăng dần.</p>
          </div>
        </div>

        <hr className="doc-divider" />

        {/* 1.3 */}
        <h3 id="sec-1-3" className="scroll-mt-20">
          3. Mắt di chuyển qua hình ảnh
        </h3>

        <p>
          Nhịp điệu thị giác quyết định <span className="key-concept">con đường mắt người xem di chuyển</span> qua bức ảnh. Khi nhịp điệu đều, mắt di chuyển mượt mà. Khi nhịp điệu gãy, mắt bị dừng lại đột ngột. Khi nhịp điệu chảy, mắt trượt nhẹ nhàng. Kiểm soát nhịp điệu = kiểm soát trải nghiệm xem.
        </p>

        <p>
          Eye tracking research đã chứng minh: mắt không quét hình ảnh ngẫu nhiên — nó theo dõi các pattern lặp lại, dừng lại ở các điểm bất thường, và quay lại các vùng có nhịp điệu mạnh. Hiểu điều này cho phép bạn thiết kế &ldquo;vũ đạo&rdquo; của mắt người xem.
        </p>

        {/* ============================================================ */}
        {/*  SECTION II                                                   */}
        {/* ============================================================ */}
        <h2 id="sec-2" className="scroll-mt-20">
          <span className="section-num">Ⅱ</span>
          Các loại nhịp điệu
        </h2>

        <p>
          Năm loại nhịp điệu cơ bản trong nhiếp ảnh — mỗi loại tạo ra trải nghiệm và cảm xúc khác nhau.
        </p>

        <hr className="doc-divider" />

        {/* 2.1 */}
        <h3 id="sec-2-1" className="scroll-mt-20">
          1. Nhịp điệu đều (Regular Rhythm)
        </h3>

        <p>
          Lặp lại đồng nhất — cùng hình dạng, cùng kích thước, cùng khoảng cách. Đây là nhịp điệu đơn giản nhất và mạnh mẽ nhất: hàng cột, hàng cây, cửa sổ, gạch men. Nó tạo ra cảm giác trật tự, ổn định, và đáng tin cậy — nhưng cũng có thể trở nên nhàm chán nếu không có biến đổi.
        </p>

        <div className="hotspot-card my-4">
          <div className="flex items-center gap-2 mb-2">
            <Music size={16} className="text-[#7c8aff]" />
            <span className="text-sm font-semibold text-[#e4e4ed]">Regular Rhythm trong thực hành</span>
          </div>
          <p className="text-xs text-[#9d9db5] leading-relaxed">
            Kiến trúc là nguồn giàu nhất của regular rhythm — dãy cửa sổ, hàng cột, tầng lầu lặp lại. Chụp thẳng vào pattern để nhấn mạnh sự lặp lại, hoặc chụp nghiêng để tạo biến đổi phối cảnh. Biến đổi nhẹ (một cửa sổ mở, một người đứng cạnh cột) có thể biến pattern thành câu chuyện.
          </p>
        </div>

        <hr className="doc-divider" />

        {/* 2.2 */}
        <h3 id="sec-2-2" className="scroll-mt-20">
          2. Nhịp điệu chảy (Flowing Rhythm)
        </h3>

        <p>
          Lặp lại theo đường cong — không có góc nhọn, không có dừng đột ngột. Nhịp điệu chảy tạo ra cảm giác tự nhiên, nhẹ nhàng, và thanh lịch. Nó xuất hiện trong tự nhiên nhiều nhất: sóng biển, cồn cát, dòng sông uốn lượn, rễ cây đan xen.
        </p>

        <div className="hotspot-card my-4">
          <div className="flex items-center gap-2 mb-2">
            <Waves size={16} className="text-[#ffcb6b]" />
            <span className="text-sm font-semibold text-[#e4e4ed]">Flowing Rhythm trong thực hành</span>
          </div>
          <p className="text-xs text-[#9d9db5] leading-relaxed">
            Tìm những đường cong tự nhiên và khai thác chúng: bờ biển nhìn từ trên cao, cánh đồng lúa theo gió, đường chân kính uốn lượn, hoặc thậm chí nếp gấp vải. Ống góc rộng + góc cao nhẹ thường tăng hiệu ứng chảy. Long exposure (phơi sáng dài) biến sóng thành sương mù — tăng tính chảy của nhịp điệu.
          </p>
        </div>

        <hr className="doc-divider" />

        {/* 2.3 */}
        <h3 id="sec-2-3" className="scroll-mt-20">
          3. Nhịp điệu tiến triển (Progressive Rhythm)
        </h3>

        <p>
          Lặp lại với sự thay đổi dần dần — lớn dần, nhỏ dần, sáng dần, tối dần. Nhịp điệu tiến triển tạo ra cảm giác phát triển, vận động, hoặc biến đổi. Nó như một giai điệu tăng dần — nhạc cụ thêm vào từng cái một đến khi hòa tấu đạt đỉnh.
        </p>

        <p>Ví dụ thị giác:</p>
        <ul className="factor-list">
          <li>
            <strong>Perspective:</strong> Hàng cây nhỏ dần về phía đường chân trời — tiến triển tự nhiên nhất.
          </li>
          <li>
            <strong>Kích thước:</strong> Các vòng tròn lớn dần từ trung tâm ra ngoài — tạo cảm giác mở rộng.
          </li>
          <li>
            <strong>Màu sắc:</strong> Gradient từ tối sang sáng — tiến triển màu tạo chiều sâu cảm xúc.
          </li>
          <li>
            <strong>Độ đặc:</strong> Pattern thưa dần đến đặc — tạo cảm giác tăng tốc.
          </li>
        </ul>

        <hr className="doc-divider" />

        {/* 2.4 */}
        <h3 id="sec-2-4" className="scroll-mt-20">
          4. Nhịp điệu xen kẽ (Alternating Rhythm)
        </h3>

        <p>
          Hai hoặc nhiều motif luân phiên lặp lại — ABABAB hoặc ABCABC. Nhịp điệu xen kẽ phức tạp hơn regular rhythm và tạo ra sự phong phú, bất ngờ, và chiều sâu. Nó giống như nhịp 2/4 hoặc 3/4 trong âm nhạc — có tính &ldquo;nhảy&rdquo; tự nhiên.
        </p>

        <div className="hotspot-card my-4">
          <div className="flex items-center gap-2 mb-2">
            <Palette size={16} className="text-emerald-400" />
            <span className="text-sm font-semibold text-[#e4e4ed]">Alternating Rhythm trong thực hành</span>
          </div>
          <p className="text-xs text-[#9d9db5] leading-relaxed">
            Xen kẽ sáng tối (cột sáng và bóng), xen kẽ màu (đỏ-xanh-đỏ-xanh), xen kẽ hình dạng (tròn-vuông-tròn-vuông). Kiến trúc Art Deco là nguồn giàu alternating rhythm — họa tiết lặp lại phức tạp. Street photography cũng thường tận dụng nhịp xen kẽ: người qua lại với nhịp điệu bước chân khác nhau.
          </p>
        </div>

        <hr className="doc-divider" />

        {/* 2.5 */}
        <h3 id="sec-2-5" className="scroll-mt-20">
          5. Nhịp điệu rải rác (Sporadic Rhythm)
        </h3>

        <p>
          Lặp lại không đều — có pattern nhưng không đều đặn. Đây là nhịp điệu phức tạp nhất và tự nhiên nhất. Trong tự nhiên, không có gì lặp lại hoàn toàn đồng nhất: những tảng đá trên bãi biển, những đám mây trên bầu trời, những người đi bộ trên vỉa hè — tất cả có pattern nhưng không đều.
        </p>

        <div className="callout callout-key">
          <div className="callout-title">
            <Lightbulb size={13} className="inline mr-1" />
            Sporadic vs. Random
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Sporadic rhythm không phải là ngẫu nhiên (random). Ngẫu nhiên không có pattern. Sporadic có pattern nhưng không đều — giống như jazz: có beat, nhưng beat không đều. Nó tự do nhưng không hỗn loạn. Nhiều nhiếp ảnh gia master như Henri Cartier-Bresson và Alex Webb đã tạo ra sporadic rhythm trong ảnh đường phố của họ — và đó là lý do ảnh của họ trông &ldquo;tự nhiên&rdquo; nhưng vẫn có cấu trúc.
          </p>
        </div>

        {/* ============================================================ */}
        {/*  SECTION III                                                  */}
        {/* ============================================================ */}
        <h2 id="sec-3" className="scroll-mt-20">
          <span className="section-num">Ⅲ</span>
          Tạo nhịp điệu
        </h2>

        <p>
          Nhịp điệu không chỉ là thứ bạn &ldquo;tìm thấy&rdquo; — nó là thứ bạn tạo ra. Bằng cách chọn góc chụp, khung hình, và hậu kỳ, bạn có thể nhấn mạnh hoặc tạo ra nhịp điệu mà mắt thường không nhìn thấy.
        </p>

        <hr className="doc-divider" />

        {/* 3.1 */}
        <h3 id="sec-3-1" className="scroll-mt-20">
          1. Lặp lại hình dạng — Nền tảng của nhịp điệu
        </h3>

        <p>
          Hình dạng là yếu tố dễ tạo nhịp điệu nhất. Hình dạng lặp lại tự nhiên trong kiến trúc (cửa sổ, cột, tầng), tự nhiên (lá, hoa, sóng), và con người tạo ra (ô, mũ, xe). Khi bạn nhận ra sự lặp lại, hãy:
        </p>

        <ul className="factor-list">
          <li>
            <strong>Chụp thẳng vào pattern:</strong> Đứng trực diện để nhấn mạnh sự lặp lại thuần túy.
          </li>
          <li>
            <strong>Chụp nghiêng:</strong> Tạo biến đổi phối cảnh — cùng hình dạng nhưng khác kích thước → progressive rhythm.
          </li>
          <li>
            <strong>Đợi yếu tố phá pattern:</strong> Một người bước vào hàng cột, một cửa sổ mở khác biệt — biến pattern thành câu chuyện.
          </li>
        </ul>

        <hr className="doc-divider" />

        {/* 3.2 */}
        <h3 id="sec-3-2" className="scroll-mt-20">
          2. Lặp lại màu sắc và đường nét
        </h3>

        <p>
          Màu sắc và đường nét có thể tạo nhịp điệu ngay cả khi hình dạng không lặp lại. Một dải màu đỏ xuyên suốt bức ảnh — trong chiếc váy, trên biển báo, trong ánh chiều tà — tạo ra nhịp điệu màu sắc mạnh mẽ. Tương tự, một đường cong xuất hiện nhiều lần tạo ra nhịp điệu đường nét.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <Circle size={16} className="text-[#7c8aff]" />
              <span className="text-sm font-semibold text-[#e4e4ed]">Nhịp hình dạng</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Lặp lại hình tròn, vuông, tam giác — dễ nhận diện nhất, mạnh nhất.
            </p>
          </div>
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <Palette size={16} className="text-[#ffcb6b]" />
              <span className="text-sm font-semibold text-[#e4e4ed]">Nhịp màu sắc</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Cùng một màu xuất hiện nhiều lần — tinh tế hơn, yêu cầu mắt tinh hơn.
            </p>
          </div>
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <Waves size={16} className="text-emerald-400" />
              <span className="text-sm font-semibold text-[#e4e4ed]">Nhịp đường nét</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Đường cong lặp lại — thanh lịch nhất, gần âm nhạc nhất.
            </p>
          </div>
        </div>

        <hr className="doc-divider" />

        {/* 3.3 */}
        <h3 id="sec-3-3" className="scroll-mt-20">
          3. Khoảng cách và tiến triển
        </h3>

        <p>
          Khoảng cách giữa các yếu tố lặp lại quyết định &ldquo;tốc độ&rdquo; của nhịp điệu. Khoảng cách đều = nhịp ổn định. Khoảng cách giảm dần = nhịp tăng tốc (cảm giác cấp bách). Khoảng cách tăng dần = nhịp giảm tốc (cảm giác lắng xuống). Sự thay đổi khoảng cách một cách có chủ đích là cách bạn tạo &ldquo;tempo&rdquo; cho hình ảnh.
        </p>

        <hr className="doc-divider" />

        {/* 3.4 */}
        <h3 id="sec-3-4" className="scroll-mt-20">
          4. Phá pattern — Khi sự khác biệt kể câu chuyện
        </h3>

        <p>
          Một trong những kỹ thuật mạnh nhất trong nhiếp ảnh: thiết lập pattern rồi phá vỡ nó. Khi mắt người xem đã &ldquo;bắt nhịp&rdquo; và kỳ vọng sự lặp lại tiếp theo, một yếu tố khác biệt tạo ra phản ứng mạnh — sự chú ý tức thì. Đây là nguyên lý &ldquo;phá nhịp&rdquo; — và nó sẽ được khám phá sâu hơn trong phần V.
        </p>

        <div className="overflow-x-auto my-4 rounded-lg border border-[#1e1e2a]">
          <table className="doc-table">
            <thead>
              <tr>
                <th>Cách tạo nhịp điệu</th>
                <th>Yếu tố lặp lại</th>
                <th>Cảm xúc tạo ra</th>
                <th>Phù hợp</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Lặp hình dạng</td>
                <td>Hình tròn, vuông, tam giác</td>
                <td>Trật tự, ổn định, mạnh mẽ</td>
                <td>Kiến trúc, thiết kế, still life</td>
              </tr>
              <tr>
                <td>Lặp màu sắc</td>
                <td>Cùng tone xuất hiện nhiều lần</td>
                <td>Kết nối, hài hòa, tinh tế</td>
                <td>Fashion, street, fine art</td>
              </tr>
              <tr>
                <td>Lặp đường nét</td>
                <td>Đường cong, chéo, thẳng</td>
                <td>Dòng chảy, thanh lịch, tự nhiên</td>
                <td>Phong cảnh, đường phố, portrait</td>
              </tr>
              <tr>
                <td>Tiến triển</td>
                <td>Lớn dần, sáng dần, đặc dần</td>
                <td>Phát triển, vận động, tăng tốc</td>
                <td>Perspective, kinetic, abstract</td>
              </tr>
              <tr>
                <td>Phá pattern</td>
                <td>Một yếu tố khác biệt</td>
                <td>Bất ngờ, tập trung, nhấn mạnh</td>
                <td>Street, concept, editorial</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ============================================================ */}
        {/*  SECTION IV                                                   */}
        {/* ============================================================ */}
        <h2 id="sec-4" className="scroll-mt-20">
          <span className="section-num">Ⅳ</span>
          Nhịp điệu và cảm xúc
        </h2>

        <p>
          Giống như âm nhạc, nhịp điệu thị giác kích hoạt phản ứng cảm xúc trực tiếp — không cần qua phân tích nhận thức. Nhịp nhanh khiến tim đập nhanh hơn. Nhịp chậm khiến hơi thở chậm lại. Nhịp gãy tạo căng thẳng. Nhịp chảy tạo bình yên.
        </p>

        <hr className="doc-divider" />

        {/* 4.1 */}
        <h3 id="sec-4-1" className="scroll-mt-20">
          1. Nhịp nhanh = Năng lượng và cấp bách
        </h3>

        <p>
          Khi các yếu tố lặp lại nằm gần nhau và nhiều, nhịp điệu nhanh — tạo ra cảm giác năng lượng, chuyển động, cấp bách. Hình ảnh thành phố về đêm với hàng nghìn đèn neon, rừng trời cao san sát, hoặc đám đông biểu tình — tất cả có nhịp nhanh.
        </p>

        <div className="hotspot-card my-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap size={16} className="text-[#fb7185]" />
            <span className="text-sm font-semibold text-[#e4e4ed]">Tạo nhịp nhanh</span>
          </div>
          <p className="text-xs text-[#9d9db5] leading-relaxed">
            Ống góc rộng + lại gần: thu nhiều yếu tố lặp lại vào khung hình, khoảng cách bị nén lại → nhịp tăng tốc. Góc chéo: tạo thêm chiều hướng chuyển động. Hậu kỳ tăng contrast: làm mỗi beat rõ hơn, nhịp mạnh hơn.
          </p>
        </div>

        <hr className="doc-divider" />

        {/* 4.2 */}
        <h3 id="sec-4-2" className="scroll-mt-20">
          2. Nhịp chậm = Bình yên và chiêm nghiệm
        </h3>

        <p>
          Khi các yếu tố lặp lại nằm xa nhau và ít, nhịp điệu chậm — tạo ra cảm giác bình yên, chiêm nghiệm, tĩnh lặng. Một vài cây cô độc trên đồng hoang, vài ngọn núi nhấp nhô xa xa, hai ba người ngồi trên băng ghế công viên — nhịp chậm mời gọi sự lắng đọng.
        </p>

        <div className="callout callout-key">
          <div className="callout-title">
            <Lightbulb size={13} className="inline mr-1" />
            Michael Kenna và nhịp chậm
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Nhiếp ảnh phong cảnh Michael Kenna là bậc thầy của nhịp điệu chậm. Ảnh của ông thường chỉ có 2-3 yếu tố lặp lại, khoảng cách lớn, phơi sáng dài (8-12 giờ) biến chi tiết thành simplicity. Nhịp chậm trong ảnh Kenna buộc người xem phải dừng lại — chậm lại — và mới thấy được vẻ đẹp tĩnh lặng.
          </p>
        </div>

        <hr className="doc-divider" />

        {/* 4.3 */}
        <h3 id="sec-4-3" className="scroll-mt-20">
          3. Nhịp gãy = Căng thẳng và bất ngờ
        </h3>

        <p>
          Khi nhịp điệu bị gián đoạn — pattern lặp lại đột ngột dừng, khoảng cách thay đổi bất thường, hoặc yếu tố khác biệt xuất hiện — nhịp gãy tạo ra căng thẳng, bất ngờ, hoặc bối rối. Đây là nhịp điệu của nghệ thuật hiện đại, phim kinh dị, và nhiếp ảnh thực nghiệm.
        </p>

        <hr className="doc-divider" />

        {/* 4.4 */}
        <h3 id="sec-4-4" className="scroll-mt-20">
          4. Nhịp chảy = Hòa bình và hài hòa
        </h3>

        <p>
          Nhịp điệu chảy (flowing rhythm) là nhịp điệu của hòa bình — không góc cạnh, không dừng đột ngột, chỉ có sự trôi chảy liên tục. Nó xuất hiện nhiều nhất trong tự nhiên và tạo ra phản ứng thư giãn trực tiếp: sóng biển, cồn cát, cánh đồng lúa theo gió, dòng sông uốn lượn.
        </p>

        <div className="comparison-grid my-4">
          <div className="comp-card">
            <span className="sub-label">NHỊP NHANH</span>
            <h4>Năng lượng, cấp bách</h4>
            <p>
              Yếu tố gần nhau, nhiều, dày đặc. Thành phố, đám đông, rừng nhà cao tầng. Mắt di chuyển nhanh, tim đập nhanh hơn.
            </p>
          </div>
          <div className="comp-card" style={{ borderColor: '#22c55e44' }}>
            <span className="sub-label" style={{ color: '#22c55e', background: 'rgba(34,197,94,0.1)' }}>NHỊP CHẬM</span>
            <h4>Bình yên, chiêm nghiệm</h4>
            <p>
              Yếu tố xa nhau, ít, thưa thớt. Đồng hoang, sa mạc, mặt nước phẳng. Mắt di chuyển chậm, hơi thở chậm lại.
            </p>
          </div>
        </div>

        {/* ============================================================ */}
        {/*  SECTION V                                                    */}
        {/* ============================================================ */}
        <h2 id="sec-5" className="scroll-mt-20">
          <span className="section-num-elite">Ⅴ</span>
          Phá nhịp
        </h2>

        <p>
          Phá nhịp (breaking rhythm) là một trong những kỹ thuật mạnh nhất trong nhiếp ảnh — và trong nghệ thuật nói chung. Khi bạn thiết lập một pattern và sau đó phá vỡ nó, bạn tạo ra một điểm tập trung tự nhiên mà mắt người xem không thể bỏ qua. Đây là nguyên lý &ldquo;anomaly as emphasis&rdquo; (bất thường như nhấn mạnh).
        </p>

        <hr className="doc-divider" />

        {/* 5.1 */}
        <h3 id="sec-5-1" className="scroll-mt-20">
          1. Phá pattern như tiêu điểm mạnh nhất
        </h3>

        <p>
          Khi một hình ảnh chứa nhiều yếu tố lặp lại và một yếu tố khác biệt, mắt người tự động bị thu hút vào yếu tố khác biệt — không cần mũi tên, không cần màu nổi, không cần kích thước lớn. Sự khác biệt trong bối cảnh đồng nhất chính là focal point mạnh nhất.
        </p>

        <div className="callout callout-key">
          <div className="callout-title">
            <Lightbulb size={13} className="inline mr-1" />
            Tại sao phá nhịp mạnh hơn điểm nhấn thông thường
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Điểm nhấn thông thường (màu sắc, kích thước, vị trí) hoạt động ở cấp độ nhận thức — bạn phải &ldquo;tìm&rdquo; nó. Phá nhịp hoạt động ở cấp độ sinh học — mắt phát hiện sự bất thường trong vòng mili-giây, trước khi bạn kịp phân tích. Đây là phản ứng tiến hóa: trong tự nhiên, sự khác biệt có thể là mối đe dọa — nên não bộ ưu tiên phát hiện nó.
          </p>
        </div>

        <hr className="doc-divider" />

        {/* 5.2 */}
        <h3 id="sec-5-2" className="scroll-mt-20">
          2. Một yếu tố khác biệt — Nguyên lý &ldquo;Một&rdquo;
        </h3>

        <p>
          Quy tắc: chỉ một yếu tố khác biệt. Không phải hai, không phải ba — chỉ một. Khi có hai yếu tố khác biệt, chúng cạnh tranh. Khi có ba, nó trở thành pattern mới. Một yếu tố khác biệt đơn lẻ trong một pattern đồng nhất tạo ra sự tập trung tuyệt đối.
        </p>

        <p>Các loại khác biệt hiệu quả:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
          <div className="conn-card" style={{ borderLeftColor: '#7c8aff' }}>
            <p className="text-sm font-semibold text-[#e4e4ed] mb-1">Khác biệt màu sắc</p>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Một chiếc ô đỏ giữa hàng trăm ô đen. Một bộ đồ vàng giữa đám đông mặc đen. Cách trực quan nhất để phá nhịp.
            </p>
          </div>
          <div className="conn-card" style={{ borderLeftColor: '#ffcb6b' }}>
            <p className="text-sm font-semibold text-[#e4e4ed] mb-1">Khác biệt hướng</p>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Một người nhìn ngược lại. Một cây nghiêng ngược hướng. Sự đảo chiều tạo ra phản ứng tức thì.
            </p>
          </div>
          <div className="conn-card" style={{ borderLeftColor: '#22c55e' }}>
            <p className="text-sm font-semibold text-[#e4e4ed] mb-1">Khác biệt kích thước</p>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Một vật lớn hơn nhỏ hơn tất cả những thứ khác. Hoặc nhỏ hơn. Sự bất tỷ lệ thu hút sự chú ý.
            </p>
          </div>
          <div className="conn-card" style={{ borderLeftColor: '#a855f7' }}>
            <p className="text-sm font-semibold text-[#e4e4ed] mb-1">Khác biệt trạng thái</p>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Một người đứng yên giữa đám đông đang chạy. Một cửa sổ sáng giữa dãy cửa tối. Sự tĩnh trong động (hoặc ngược lại).
            </p>
          </div>
        </div>

        <hr className="doc-divider" />

        {/* 5.3 */}
        <h3 id="sec-5-3" className="scroll-mt-20">
          3. Bất thường như nhấn mạnh — Kỹ thuật master
        </h3>

        <p>
          Khi bạn hiểu phá nhịp là một hình thức nhấn mạnh, bạn bắt đầu sử dụng nó có chủ đích thay vì ngẫu nhiên. Thay vì &ldquo;chụp xem có gì khác không&rdquo;, bạn chủ động thiết kế sự khác biệt:
        </p>

        <ul className="factor-list">
          <li>
            <strong>Đợi khoảnh khắc:</strong> Tìm pattern, rồi đợi một yếu tố khác biệt xuất hiện — người bước vào, ánh sáng thay đổi, một cửa sổ mở.
          </li>
          <li>
            <strong>Tạo sự khác biệt:</strong> Trong studio hoặc still life, bạn hoàn toàn kiểm soát — đặt một vật khác biệt vào pattern đồng nhất.
          </li>
          <li>
            <strong>Hậu kỳ nhấn mạnh:</strong> Chuyển màu một yếu tố khác biệt sang tone khác, hoặc làm sáng/tối nó so với pattern.
          </li>
        </ul>

        <div className="callout callout-photo">
          <div className="callout-title">
            <Camera size={13} className="inline mr-1" />
            Case Study: Elliott Erwitt
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Elliott Erwitt là bậc thầy của phá nhịp trong nhiếp ảnh. Bức ảnh nổi tiếng nhất của ông — chó ngắm thế giới từ góc nhìn chó, với chủ nhân chỉ thấy từ đầu gối trở xuống — là sự phá nhịp hoàn hảo: pattern thế giới người bị phá vỡ bởi góc nhìn của chó. Sự bất thường trong góc nhìn biến một tình huống bình thường thành một câu chuyện hài hước và sâu sắc.
          </p>
        </div>

        {/* ============================================================ */}
        {/*  SUMMARY                                                      */}
        {/* ============================================================ */}
        <h2 id="summary" className="scroll-mt-20">
          Tóm tắt 7 điểm chính
        </h2>
        <div className="space-y-3 my-4">
          <div className="key-point">
            <div className="key-point-num">01</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Nhịp điệu thị giác là sự lặp lại có biến đổi — đủ lặp lại để tạo nhận dạng, đủ biến đổi để tạo sự sống.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">02</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Năm loại nhịp điệu: đều, chảy, tiến triển, xen kẽ, rải rác — mỗi loại tạo cảm xúc khác nhau.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">03</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Nhịp điệu quyết định con đường mắt người xem di chuyển qua hình ảnh — kiểm soát nhịp = kiểm soát trải nghiệm.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">04</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Nhịp nhanh = năng lượng, nhịp chậm = bình yên, nhịp gãy = căng thẳng, nhịp chảy = hòa bình.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">05</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Tạo nhịp điệu bằng lặp lại hình dạng, màu sắc, đường nét, khoảng cách — và tiến triển.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">06</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Phá nhịp (breaking rhythm) tạo ra focal point mạnh nhất — bất thường như nhấn mạnh.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">07</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Quy tắc &ldquo;Một&rdquo;: chỉ một yếu tố khác biệt trong pattern. Hai yếu tố cạnh tranh, ba tạo pattern mới.
            </p>
          </div>
        </div>

        {/* ============================================================ */}
        {/*  TINH HOA CHUYÊN GIA                                         */}
        {/* ============================================================ */}
        <div className="elite-master-section">
          <div className="callout callout-master">
            <div className="callout-title">✦ Tinh hoa 20 năm</div>
            <p style={{ marginBottom: 0, lineHeight: 1.75 }}>
              Nhịp điệu không phải là sự lặp lại — nó là sự lặp lại <strong>CÓ BIẾN ĐỔI</strong>. Khi bạn tìm được nhịp điệu trong cảnh thực và sau đó phá vỡ nó đúng lúc, bạn tạo ra điểm nhấn mạnh hơn bất kỳ kỹ thuật nào khác. Đây là lý do tại sao một chiếc ghế màu đỏ duy nhất trong hàng ghế trắng gây tác động lớn hơn cả một bức ảnh phức tạp đầy kỹ thuật. Não bộ yêu thích pattern và khi pattern bị phá vỡ, nó <em>không thể không chú ý</em>.
            </p>
          </div>
          <div className="callout callout-pitfall">
            <div className="callout-title">⚠ Bẫy chuyên gia</div>
            <p style={{ marginBottom: 0, lineHeight: 1.75 }}>
              Tìm pattern và chụp pattern đó <strong>thuần túy</strong> mà không có "điểm phá vỡ" (visual interruption). Pattern thuần túy tạo ra texture đẹp nhưng không có câu chuyện — nó là nền trang trí, không phải ảnh có ý nghĩa. Câu chuyện chỉ bắt đầu khi có gì đó phá vỡ expectation. <em>"The moment of deviation"</em> — khoảnh khắc lệch nhịp — là khoảnh khắc đáng chụp nhất.
            </p>
          </div>
          <div className="practice-exercise">
            <div className="practice-header">⬥ Bài tập thực chiến — Pattern, Break &amp; Build</div>
            <div className="practice-body">
              <p>Khám phá nhịp điệu thị giác qua 3 cấp độ:</p>
              <ol className="practice-steps">
                <li><strong>Regular Pattern — Trật tự:</strong> Tìm và chụp một pattern hoàn toàn đều đặn (hàng cột, gạch lát, hàng cây). Cảm giác: ổn định, trật tự, đôi khi tẻ nhạt.</li>
                <li><strong>Broken Pattern — Kịch tính:</strong> Cùng cảnh đó, hoặc tìm cảnh tương tự có YẾU TỐ PHÁ VỠ — một cái khác biệt trong hàng đồng nhất. Chụp và so sánh cảm xúc với ảnh trên.</li>
                <li><strong>Progressive Rhythm — Chuyển hóa:</strong> Tìm cảnh có pattern thay đổi dần theo hướng (cây nhỏ đến lớn, sóng gần đến xa, đường thu hẹp vào horizon). Câu chuyện này về sự chuyển hóa, thời gian, hay hành trình?</li>
              </ol>
            </div>
          </div>
        </div>

        <hr className="doc-divider" />

        {/* Mark as Read */}
        <div className="mt-8 flex items-center gap-3">
          <button
            className={`mark-read-btn ${isRead ? 'read' : ''}`}
            onClick={toggleRead}
          >
            {isRead ? <Check size={14} /> : <BookOpen size={14} />}
            {isRead ? 'Đã hoàn thành' : 'Đánh dấu đã đọc'}
          </button>
        </div>

        {/* Bottom navigation cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
          <Link href="/tieu-diem" className="group nav-card">
            <div className="nav-card-label">← Bài trước</div>
            <div className="nav-card-title">14. Tiêu điểm & Độ sâu</div>
            <div className="nav-card-desc">Bố cục & Góc nhìn</div>
          </Link>
          <Link href="/can-bang" className="group nav-card text-right">
            <div className="nav-card-label">Bài tiếp →</div>
            <div className="nav-card-title">16. Cân bằng thị giác</div>
            <div className="nav-card-desc">Nguyên lý vận hành</div>
          </Link>
        </div>

        {/* Enhanced Footer */}
        <div className="mt-16 pt-8 border-t border-[#1e1e2a]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-gradient-to-br from-[#7c8aff] to-[#5a6aff] flex items-center justify-center text-white text-[8px] font-bold">α</div>
              <span className="text-xs text-[#6b6b80]">Alpha Photography Docs</span>
            </div>
            <span className="text-xs text-[#6b6b80]">v2.0 · 2026</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-[#6b6b80]">
            <div>
              <p className="font-semibold text-[#9d9db5] mb-2">Nền tảng</p>
              <a href="/" className="block hover:text-[#7c8aff] transition-colors">Sức mạnh hình ảnh</a>
              <a href="/muc-dich" className="block hover:text-[#7c8aff] transition-colors">Mục đích hình ảnh</a>
              <a href="/bieu-tuong" className="block hover:text-[#7c8aff] transition-colors">Biểu tượng văn hóa</a>
            </div>
            <div>
              <p className="font-semibold text-[#9d9db5] mb-2">Kỹ thuật</p>
              <span className="block text-[#3a3a4a]">Tam giác phơi sáng</span>
              <span className="block text-[#3a3a4a]">Tiêu điểm & DOF</span>
              <span className="block text-[#3a3a4a]">Điều kiện chụp</span>
            </div>
            <div>
              <p className="font-semibold text-[#9d9db5] mb-2">Nghệ thuật</p>
              <span className="block text-[#3a3a4a]">Kể chuyện hình ảnh</span>
              <span className="block text-[#3a3a4a]">Phong cách riêng</span>
              <span className="block text-[#3a3a4a]">Street photography</span>
            </div>
            <div>
              <p className="font-semibold text-[#9d9db5] mb-2">Về chúng tôi</p>
              <span className="text-[#3a3a4a]">Tmtprompt.com</span>
              <span className="block text-[#3a3a4a]">© 2026</span>
            </div>
          </div>
        </div>
      </article>
    </DocsLayout>
  );
}

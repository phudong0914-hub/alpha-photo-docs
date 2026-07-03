

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
  Brain,
  Palette,
  Eye,
  Contrast,
  Circle,
  Sparkles,
  BookOpen,
  Check,
  Layers,
  SplitSquareHorizontal,
  Zap,
} from 'lucide-react';
import DocsLayout from '@/components/docs-layout';

/* ------------------------------------------------------------------ */
/*  TOC Data                                                          */
/* ------------------------------------------------------------------ */
const tocSections = [
  { id: 'sec-1', label: 'Ⅰ. Các loại tương phản', level: 1 },
  { id: 'sec-1-1', label: '1. Tương phản sắc độ (Hue Contrast)', level: 2 },
  { id: 'sec-1-2', label: '2. Tương phản sáng-tối (Light-Dark Contrast)', level: 2 },
  { id: 'sec-1-3', label: '3. Tương phản lạnh-ấm (Cold-Warm Contrast)', level: 2 },
  { id: 'sec-1-4', label: '4. Tương phản bổ sắc (Complementary Contrast)', level: 2 },
  { id: 'sec-1-5', label: '5. Tương phản đồng thời (Simultaneous Contrast)', level: 2 },
  { id: 'sec-1-6', label: '6. Tương phản độ bão hòa (Saturation Contrast)', level: 2 },
  { id: 'sec-1-7', label: '7. Tương phản diện tích (Extension Contrast)', level: 2 },
  { id: 'sec-2', label: 'Ⅱ. Tương phản bổ sắc', level: 1 },
  { id: 'sec-2-1', label: '1. Tại sao bổ sắc là tương phản mạnh nhất', level: 2 },
  { id: 'sec-2-2', label: '2. Ví dụ trong nhiếp ảnh', level: 2 },
  { id: 'sec-2-3', label: '3. Bảng các cặp bổ sắc', level: 2 },
  { id: 'sec-3', label: 'Ⅲ. Tương phản đồng thời', level: 1 },
  { id: 'sec-3-1', label: '1. Ảo giác thị giác của não bộ', level: 2 },
  { id: 'sec-3-2', label: '2. Màu sắc ảnh hưởng lẫn nhau', level: 2 },
  { id: 'sec-3-3', label: '3. Nghiên cứu của Josef Albers', level: 2 },
  { id: 'sec-4', label: 'Ⅳ. Ứng dụng tương phản', level: 1 },
  { id: 'sec-4-1', label: '1. Tạo điểm nhấn (Focal Point)', level: 2 },
  { id: 'sec-4-2', label: '2. Chiều sâu qua ấm-lạnh', level: 2 },
  { id: 'sec-4-3', label: '3. Tâm trạng qua mức độ tương phản', level: 2 },
  { id: 'sec-4-4', label: '4. Tương phản cao vs tương phản thấp', level: 2 },
  { id: 'summary', label: 'Tóm tắt 7 điểm chính', level: 1 },
];

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */
export default function TuongPhanPage() {
  const [isRead, setIsRead] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('alpha-doc-read');
      if (saved) {
        const readPages: string[] = JSON.parse(saved);
        if (readPages.includes('/tuong-phan')) setIsRead(true);
      }
    } catch {}
  }, []);

  const toggleRead = () => {
    try {
      const saved = localStorage.getItem('alpha-doc-read');
      const readPages: string[] = saved ? JSON.parse(saved) : [];
      if (isRead) {
        const updated = readPages.filter((p) => p !== '/tuong-phan');
        localStorage.setItem('alpha-doc-read', JSON.stringify(updated));
        setIsRead(false);
      } else {
        const updated = [...readPages, '/tuong-phan'];
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
          <a href="#">Ngôn ngữ thị giác</a>
          <ChevronRight size={12} />
          <span className="text-[#9d9db5]">Tương phản màu sắc</span>
        </div>

        {/* Badges */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold font-mono px-2 py-0.5 rounded bg-[rgba(124,138,255,0.1)] text-[#7c8aff]">
            HA9
          </span>
          <span className="text-[11px] text-[#6b6b80]">16 phút đọc · #TuongPhan #ColorContrast #Itten #NgonNguThiGiac</span>
          <span className="elite-badge">
            <GraduationCap size={11} />
            Nâng cao
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-[#e4e4ed] leading-tight mb-3 border-none pb-0">
          Tương phản màu sắc
        </h1>

        {/* Subtitle */}
        <p className="text-base text-[#9d9db5] leading-relaxed mb-6" style={{ marginTop: 0 }}>
          Ngôn ngữ thị giác · Bài 9 — Tương phản là nhịp đập của hình ảnh — không có nó, mọi thứ hòa tan vào một mặt phẳng vô hồn
        </p>

        {/* Hero image */}
        <div className="color-overview-hero rounded-xl overflow-hidden border border-[#1e1e2a] mb-8">
          <img
            src="/hero-tuong-phan.png"
            alt="Infographic tổng quan về tương phản màu sắc trong nhiếp ảnh: 7 loại tương phản của Itten, bổ sắc, đồng thời và ứng dụng"
            className="w-full h-auto object-contain"
            loading="eager"
          />
        </div>

        {/* Opening Quote */}
        <div className="quote-block">
          <p>
            &ldquo;Tương phản là cách mà ánh sáng và bóng tối, màu sắc và hình khối nói chuyện với nhau. Không có tương phản, không có giao tiếp.&rdquo;
          </p>
          <p className="quote-attr">— Johannes Itten, The Art of Color</p>
        </div>

        <p className="drop-cap">
          Nếu màu sắc là từ vựng của ngôn ngữ thị giác, thì tương phản là ngữ pháp — nó tạo ra cấu trúc, nhấn mạnh, và ý nghĩa. Không phải ngẫu nhiên Johannes Itten, bậc thầy color theory của Bauhaus, đặt tương phản ở trung tâm hệ thống giảng dạy của mình. Ông hiểu rằng màu sắc không tồn tại độc lập — nó chỉ có nghĩa khi đặt cạnh một màu khác. Bài này sẽ đi sâu vào 7 loại tương phản màu sắc của Itten và cách chúng tạo ra sức mạnh thị giác trong nhiếp ảnh.
        </p>

        {/* ============================================================ */}
        {/*  SECTION I                                                    */}
        {/* ============================================================ */}
        <h2 id="sec-1" className="scroll-mt-20">
          <span className="section-num">Ⅰ</span>
          Các loại tương phản — 7 loại tương phản của Itten
        </h2>

        <p>
          Johannes Itten, giáo sư huyền thoại của trường Bauhaus, đã hệ thống hóa 7 loại tương phản màu sắc trong tác phẩm &ldquo;The Art of Color&rdquo; (1961). Mỗi loại tương phản tạo ra một hiệu ứng thị giác và cảm xúc khác nhau, và hiểu tất cả 7 loại cho phép nhiếp ảnh gia chọn đúng công cụ cho đúng mục đích.
        </p>

        <hr className="doc-divider" />

        {/* 1.1 */}
        <h3 id="sec-1-1" className="scroll-mt-20">
          1. Tương phản sắc độ (Hue Contrast)
        </h3>

        <p>
          Đây là loại tương phản cơ bản nhất: sự khác biệt <span className="key-concept">danh tính</span> giữa các màu. Đỏ bên cạnh xanh lam tạo ra hue contrast; vàng bên cạnh tím cũng vậy. Sức mạnh của hue contrast phụ thuộc vào khoảng cách trên bánh xe màu — càng xa nhau, tương phản càng mạnh.
        </p>

        <p>Đặc điểm trong nhiếp ảnh:</p>
        <ul className="factor-list">
          <li>
            <strong>Hue contrast nguyên thủy:</strong> Ba màu gốc (đỏ, vàng, xanh lam) tạo ra hue contrast mạnh nhất — thường thấy trong nhiếp ảnh lễ hội, carnival.
          </li>
          <li>
            <strong>Hue contrast thứ cấp:</strong> Các màu pha (cam, xanh lục, tím) tạo ra tương phản nhẹ hơn — phù hợp editorial, fashion.
          </li>
          <li>
            <strong>Lưu ý:</strong> Quá nhiều hue contrast tạo ra sự hỗn loạn thị giác. Cần có màu chủ đạo để anchor.
          </li>
        </ul>

        <hr className="doc-divider" />

        {/* 1.2 */}
        <h3 id="sec-1-2" className="scroll-mt-20">
          2. Tương phản sáng-tối (Light-Dark Contrast)
        </h3>

        <p>
          Tương phản sáng-tối là loại tương phản phổ quát nhất — nó hoạt động ngay cả khi không có màu (đen trắng). Đây là sự khác biệt <span className="key-concept">luminance</span> giữa các vùng trong ảnh. Chiaroscuro trong hội họa Phục Hưng, zone system của Ansel Adams, low-key và high-key photography — tất cả đều dựa trên light-dark contrast.
        </p>

        <div className="comparison-grid my-4">
          <div className="comp-card">
            <span className="sub-label">HIGH CONTRAST</span>
            <h4>Tương phản sáng-tối cao</h4>
            <p>
              Khoảng cách luminance lớn giữa sáng và tối. Tạo kịch tính, căng thẳng, mạnh mẽ. Film noir, silhouette, hard flash photography.
            </p>
          </div>
          <div className="comp-card" style={{ borderColor: '#22c55e44' }}>
            <span className="sub-label" style={{ color: '#22c55e', background: 'rgba(34,197,94,0.1)' }}>LOW CONTRAST</span>
            <h4>Tương phản sáng-tối thấp</h4>
            <p>
              Khoảng cách luminance nhỏ. Tạo sự êm ái, tinh tế, mộng mơ. Fog, overcast light, high-key, matte pastel aesthetic.
            </p>
          </div>
        </div>

        <hr className="doc-divider" />

        {/* 1.3 */}
        <h3 id="sec-1-3" className="scroll-mt-20">
          3. Tương phản lạnh-ấm (Cold-Warm Contrast)
        </h3>

        <p>
          Đây là loại tương phản tạo ra <span className="key-concept">chiều sâu cảm xúc</span> phong phú nhất. Màu ấm (đỏ, cam, vàng) và màu lạnh (xanh lam, xanh lục) khi đặt cạnh nhau không chỉ tạo ra sự khác biệt — chúng tạo ra một trường năng lượng thị giác, nơi màu ấm dường như &ldquo;tiến&rdquo; về phía người xem còn màu lạnh &ldquo;lùi&rdquo; về phía hậu cảnh.
        </p>

        <div className="callout callout-key">
          <div className="callout-title">
            <Lightbulb size={13} className="inline mr-1" />
            Nguyên lý tiến-lùi của màu sắc
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Màu ấm có bước sóng dài hơn, mắt cần điều chỉnh ít hơn để focus — tạo cảm giác &ldquo;gần&rdquo;. Màu lạnh có bước sóng ngắn hơn, mắt điều chỉnh nhiều hơn — tạo cảm giác &ldquo;xa&rdquo;. Đây không phải ảo giác — nó là hiện tượng vật lý thực sự, và nhiếp ảnh gia exploit nó để tạo chiều sâu không gian trong ảnh 2D.
          </p>
        </div>

        <hr className="doc-divider" />

        {/* 1.4 */}
        <h3 id="sec-1-4" className="scroll-mt-20">
          4. Tương phản bổ sắc (Complementary Contrast)
        </h3>

        <p>
          Khi hai màu bổ sắc (đối diện trên bánh xe) đặt cạnh nhau, chúng tạo ra hiệu ứng &ldquo;rung động&rdquo; thị giác (vibration effect) — ranh giới giữa hai màu dường như run rẩy. Đây là loại tương phản <span className="key-concept">mạnh nhất</span> về mặt cảm xúc và sẽ được phân tích sâu ở Section II.
        </p>

        <hr className="doc-divider" />

        {/* 1.5 */}
        <h3 id="sec-1-5" className="scroll-mt-20">
          5. Tương phản đồng thời (Simultaneous Contrast)
        </h3>

        <p>
          Đây là loại tương phản tinh tế nhất và ít được nhận thức nhất — nhưng lại là nền tảng của mọi color grading chuyên nghiệp. Khi một màu đặt cạnh màu khác, não bộ tự động &ldquo;thêm&rdquo; màu bổ sắc vào màu nền — làm cho màu trung tâm thay đổi cảm nhận. Xám trên nền đỏ trông hơi xanh; xám trên nền xanh trông hơi đỏ. Sẽ phân tích sâu ở Section III.
        </p>

        <hr className="doc-divider" />

        {/* 1.6 */}
        <h3 id="sec-1-6" className="scroll-mt-20">
          6. Tương phản độ bão hòa (Saturation Contrast)
        </h3>

        <p>
          Sự khác biệt giữa màu bão hòa cao (rực rỡ) và màu bão hòa thấp (nhạt, xám). Đây là công cụ tạo <span className="key-concept">phân cấp thị giác</span> mạnh mẽ: chủ thể saturation cao tự động nổi bật trên nền desaturated. Nhiều nhiếp ảnh gia chuyên nghiệp sử dụng kỹ thuật này thay vì tăng sharpness — nó tinh tế và tự nhiên hơn.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
          <div className="hotspot-card text-center">
            <div className="text-[#ff6b6b] mb-2">
              <Zap size={22} className="mx-auto" />
            </div>
            <p className="text-sm font-semibold text-[#e4e4ed] mb-1">Cao vs Thấp</p>
            <p className="text-xs text-[#9d9db5]">Chủ thể rực rỡ trên nền nhạt — focal point tự nhiên. Phổ biến nhất trong portrait và commercial.</p>
          </div>
          <div className="hotspot-card text-center">
            <div className="text-[#ffcb6b] mb-2">
              <Layers size={22} className="mx-auto" />
            </div>
            <p className="text-sm font-semibold text-[#e4e4ed] mb-1">Color Pop</p>
            <p className="text-xs text-[#9d9db5]">Một màu duy nhất saturation cao trên ảnh gần đen trắng. Hiệu ứng mạnh nhưng dễ kitsch nếu lạm dụng.</p>
          </div>
          <div className="hotspot-card text-center">
            <div className="text-emerald-400 mb-2">
              <Eye size={22} className="mx-auto" />
            </div>
            <p className="text-sm font-semibold text-[#e4e4ed] mb-1">Muted Palette</p>
            <p className="text-xs text-[#9d9db5]">Toàn ảnh low saturation — tinh tế, thanh lịch, phim ảnh. Fine art, editorial, fashion high-end.</p>
          </div>
        </div>

        <hr className="doc-divider" />

        {/* 1.7 */}
        <h3 id="sec-1-7" className="scroll-mt-20">
          7. Tương phản diện tích (Extension Contrast)
        </h3>

        <p>
          Itten phát hiện rằng cường độ tương phản không chỉ phụ thuộc vào màu sắc — nó còn phụ thuộc vào <span className="key-concept">tỷ lệ diện tích</span>. Một mảng vàng nhỏ trên nền lớn màu tím có thể tạo ra sự cân bằng thị giác tương đương với một mảng tím nhỏ trên nền vàng lớn — nếu tỷ lệ diện tích đúng.
        </p>

        <p>Tỷ lệ diện tích cân bằng của Goethe:</p>
        <div className="overflow-x-auto my-4 rounded-lg border border-[#1e1e2a]">
          <table className="doc-table">
            <thead>
              <tr>
                <th>Màu sắc</th>
                <th>Độ sáng tương đối (Goethe)</th>
                <th>Tỷ lệ diện tích cân bằng</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Vàng</td>
                <td>9</td>
                <td>Nhỏ nhất — chỉ cần diện tích nhỏ đã có trọng lực lớn</td>
              </tr>
              <tr>
                <td>Cam</td>
                <td>8</td>
                <td>Nhỏ</td>
              </tr>
              <tr>
                <td>Đỏ</td>
                <td>6</td>
                <td>Trung bình</td>
              </tr>
              <tr>
                <td>Xanh lá</td>
                <td>6</td>
                <td>Trung bình</td>
              </tr>
              <tr>
                <td>Xanh lam</td>
                <td>4</td>
                <td>Lớn — cần diện tích lớn để cân bằng</td>
              </tr>
              <tr>
                <td>Tím</td>
                <td>3</td>
                <td>Lớn nhất — cần diện tích lớn nhất để có trọng lực tương đương</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="callout callout-brain">
          <div className="callout-title">
            <Brain size={13} className="inline mr-1" />
            Ý nghĩa thực tiễn
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Tỷ lệ này giải thích tại sao một điểm đỏ nhỏ trên nền xanh lục lớn (ladybug trên lá) lại tạo ấn tượng mạnh — trong khi một mảng đỏ lớn trên mảng xanh lục nhỏ lại cảm giác nặng nề. Nó cũng giải thích tại sao logo của nhiều thương hiệu dùng màu vàng — nó có trọng lực thị giác cao nhất trên mỗi đơn vị diện tích.
          </p>
        </div>

        {/* ============================================================ */}
        {/*  SECTION II                                                   */}
        {/* ============================================================ */}
        <h2 id="sec-2" className="scroll-mt-20">
          <span className="section-num">Ⅱ</span>
          Tương phản bổ sắc — Xung đột hoàn hảo
        </h2>

        <hr className="doc-divider" />

        {/* 2.1 */}
        <h3 id="sec-2-1" className="scroll-mt-20">
          1. Tại sao bổ sắc là tương phản mạnh nhất
        </h3>

        <p>
          Tương phản bổ sắc mạnh nhất vì nó exploit cơ chế sinh học của thị giác: khi bạn nhìn vào một màu trong thời gian đủ lâu, các tế bào nón (cone cells) chuyên biệt cho màu đó bị mệt (fatigue). Khi bạn chuyển mắt đi, não bộ tự động &ldquo;thấy&rdquo; màu bổ sắc — hiện tượng afterimage. Đặt hai màu bổ sắc cạnh nhau chính là kích hoạt cơ chế này cùng lúc, tạo ra hiệu ứng &ldquo;rung động&rdquo; thị giác không thể kiểm soát.
        </p>

        <div className="callout callout-photo">
          <div className="callout-title">
            <Camera size={13} className="inline mr-1" />
            Case Study: Hoàng hôn — Bổ sắc tự nhiên hoàn hảo
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Giờ hoàng hôn là khoảnh khắc tương phản bổ sắc tự nhiên mạnh nhất: trời vẫn giữ sắc xanh lam (cold) trong khi ánh mặt trời trở thành vàng cam rực rỡ (warm). Đây không phải ngẫu nhiên — nó là kết quả của tán xạ Rayleigh. Nhiếp ảnh gia landscape hiểu điều này và gọi đó là &ldquo;golden hour&rdquo; — nhưng ít ai nhận ra rằng sức mạnh của golden hour nằm ở complementary contrast, không chỉ ở ánh sáng ấm.
          </p>
        </div>

        <hr className="doc-divider" />

        {/* 2.2 */}
        <h3 id="sec-2-2" className="scroll-mt-20">
          2. Ví dụ trong nhiếp ảnh
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[#ff6b6b]"><Circle size={12} fill="currentColor" /></span>
              <span className="text-sm font-semibold text-[#e4e4ed]">Đỏ + Xanh lục</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Áo đỏ trong rừng; hoa đỏ trên lá xanh; đèn đỏ giao thông trên cây xanh. Tương phản này đặc biệt mạnh vì đỏ và xanh lục nằm đối diện trực tiếp trên bánh xe.
            </p>
          </div>
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[#ff9a5c]"><Circle size={12} fill="currentColor" /></span>
              <span className="text-sm font-semibold text-[#e4e4ed]">Cam + Xanh lam</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Ánh nắng chiều trên biển; hoodie cam trước bầu trời xanh; teal-orange look trong cinema. Đây là cặp bổ sắc được sử dụng nhiều nhất trong nhiếp ảnh và điện ảnh.
            </p>
          </div>
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[#ffcb6b]"><Circle size={12} fill="currentColor" /></span>
              <span className="text-sm font-semibold text-[#e4e4ed]">Vàng + Tím</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Hoàng hôn vàng trên mây tím; đèn đường vàng trong đêm tím; lavender field dưới nắng vàng. Cặp này tạo cảm giác kỳ ảo, lãng mạn.
            </p>
          </div>
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[#7c8aff]"><Circle size={12} fill="currentColor" /></span>
              <span className="text-sm font-semibold text-[#e4e4ed]">Xanh lam + Cam-Đỏ</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Split-complementary: xanh lam chính + cam và đỏ cam phụ. Ít kịch tính hơn complementary thuần nhưng đa dạng hơn. Thường thấy trong cinematic color grading.
            </p>
          </div>
        </div>

        <hr className="doc-divider" />

        {/* 2.3 */}
        <h3 id="sec-2-3" className="scroll-mt-20">
          3. Bảng các cặp bổ sắc
        </h3>

        <div className="overflow-x-auto my-4 rounded-lg border border-[#1e1e2a]">
          <table className="doc-table">
            <thead>
              <tr>
                <th>Màu A</th>
                <th>Màu B (Bổ sắc)</th>
                <th>Góc trên bánh xe</th>
                <th>Hiệu ứng thị giác</th>
                <th>Mức độ rung động</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ color: '#ff6b6b', fontWeight: 600 }}>Đỏ</td>
                <td style={{ color: '#4ade80', fontWeight: 600 }}>Xanh lục</td>
                <td>180°</td>
                <td>Xung đột mạnh, kịch tính</td>
                <td>Rất cao</td>
              </tr>
              <tr>
                <td style={{ color: '#ff9a5c', fontWeight: 600 }}>Cam</td>
                <td style={{ color: '#7c8aff', fontWeight: 600 }}>Xanh lam</td>
                <td>180°</td>
                <td>Cinematic, phổ biến nhất</td>
                <td>Cao</td>
              </tr>
              <tr>
                <td style={{ color: '#ffcb6b', fontWeight: 600 }}>Vàng</td>
                <td style={{ color: '#a855f7', fontWeight: 600 }}>Tím</td>
                <td>180°</td>
                <td>Kỳ ảo, lãng mạn</td>
                <td>Trung bình cao</td>
              </tr>
              <tr>
                <td style={{ color: '#4ade80', fontWeight: 600 }}>Xanh lục vàng</td>
                <td style={{ color: '#a855f7', fontWeight: 600 }}>Tím đỏ</td>
                <td>180°</td>
                <td>Tự nhiên + bí ẩn</td>
                <td>Trung bình</td>
              </tr>
              <tr>
                <td style={{ color: '#7c8aff', fontWeight: 600 }}>Xanh lơ</td>
                <td style={{ color: '#ff6b6b', fontWeight: 600 }}>Đỏ cam</td>
                <td>180°</td>
                <td>Truyền thông, digital</td>
                <td>Cao</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ============================================================ */}
        {/*  SECTION III                                                  */}
        {/* ============================================================ */}
        <h2 id="sec-3" className="scroll-mt-20">
          <span className="section-num">Ⅲ</span>
          Tương phản đồng thời — Khi mắt lừa não bộ
        </h2>

        <hr className="doc-divider" />

        {/* 3.1 */}
        <h3 id="sec-3-1" className="scroll-mt-20">
          1. Ảo giác thị giác của não bộ
        </h3>

        <p>
          Simultaneous contrast là hiện tượng mà cùng một màu sắc, khi đặt trên các nền khác nhau, sẽ <span className="key-concept">trông khác nhau</span>. Không phải &ldquo;hơi khác&rdquo; — mà khác rõ ràng, đo được, và không thể kiểm soát bằng ý chí. Đây không phải lỗi của thị giác — nó là feature tiến hóa: não bộ tự động hiệu chỉnh màu sắc theo ngữ cảnh để giải mã thông tin chính xác hơn về môi trường.
        </p>

        <div className="callout callout-warning">
          <div className="callout-title">
            <AlertTriangle size={13} className="inline mr-1" />
            Thí nghiệm kinh điển
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Cùng một màu xám trung tính đặt trên nền đỏ sẽ trông hơi xanh lục (bổ sắc của đỏ). Đặt cùng màu xám đó trên nền xanh lam — nó trông hơi cam (bổ sắc của xanh lam). Màu xám hoàn toàn giống nhau, nhưng não bạn &ldquo;thấy&rdquo; hai màu khác nhau. Đây không phải opinion — nó là hiện tượng thần kinh học được đo đạc bằng thiết bị.
          </p>
        </div>

        <hr className="doc-divider" />

        {/* 3.2 */}
        <h3 id="sec-3-2" className="scroll-mt-20">
          2. Màu sắc ảnh hưởng lẫn nhau
        </h3>

        <p>
          Simultaneous contrast hoạt động theo nguyên tắc: <span className="key-concept">não bộ tự động thêm màu bổ sắc của nền vào màu trung tâm</span>. Điều này có nghĩa là mọi màu sắc trong bức ảnh đều đang &ldquo;nói chuyện&rdquo; với mọi màu khác — và cuộc trò chuyện này không thể tắt đi.
        </p>

        <p>Ứng dụng trong nhiếp ảnh:</p>
        <ul className="factor-list">
          <li>
            <strong>Da thịt trên nền xanh lam:</strong> Não thêm cam (bổ sắc của xanh lam) vào da — da trông ấm hơn, khỏe hơn. Đây là lý do portrait trên nền xanh lam rất phổ biến.
          </li>
          <li>
            <strong>Da thịt trên nền đỏ:</strong> Não thêm xanh lục (bổ sắc của đỏ) vào da — da trông xanh xao, ốm yếu. Tránh nền đỏ trong portrait trừ khi đây là hiệu ứng bạn muốn.
          </li>
          <li>
            <strong>Color grading shadow:</strong> Thêm teal vào shadow khiến highlight tự động trông ấm hơn — không cần chỉnh highlight. Đây là bí mật của teal-orange look.
          </li>
        </ul>

        <hr className="doc-divider" />

        {/* 3.3 */}
        <h3 id="sec-3-3" className="scroll-mt-20">
          3. Nghiên cứu của Josef Albers
        </h3>

        <p>
          Josef Albers, trong tác phẩm nền tảng &ldquo;Interaction of Color&rdquo; (1963), đã chứng minh thông qua hàng trăm bài tập thực hành rằng: màu sắc là quan hệ, không phải thuộc tính. Ông đặt cùng một màu sắc trên hàng chục nền khác nhau — và mỗi lần, màu đó trông hoàn toàn khác.
        </p>

        <div className="quote-block">
          <p>
            &ldquo;Trong nhận thức thị giác, màu sắc gần như không bao giờ được thấy như nó thực sự — như nó vật lý tồn tại. Thực tế này làm cho màu sắc trở thành phương tiện nghệ thuật linh hoạt nhất.&rdquo;
          </p>
          <p className="quote-attr">— Josef Albers</p>
        </div>

        <p>
          Bài học lớn nhất từ Albers cho nhiếp ảnh gia: đừng đánh giá một màu sắc độc lập — hãy đánh giá nó trong ngữ cảnh. Một chiếc áo &ldquo;xanh lam&rdquo; sẽ trông rất khác khi đứng trước bầu trời so với khi đứng trước bức tường đỏ. Mọi quyết định color grading phải xét đến simultaneous contrast.
        </p>

        {/* ============================================================ */}
        {/*  SECTION IV                                                   */}
        {/* ============================================================ */}
        <h2 id="sec-4" className="scroll-mt-20">
          <span className="section-num">Ⅳ</span>
          Ứng dụng tương phản — Từ lý thuyết đến tác phẩm
        </h2>

        <hr className="doc-divider" />

        {/* 4.1 */}
        <h3 id="sec-4-1" className="scroll-mt-20">
          1. Tạo điểm nhấn (Focal Point) bằng tương phản
        </h3>

        <p>
          Tương phản màu sắc là cách tạo focal point mạnh thứ hai sau tương phản sáng-tối — và trong nhiều trường hợp, nó hiệu quả hơn vì tinh tế hơn. Mắt tự động di chuyển đến vùng có tương phản cao nhất, và bạn có thể exploit điều này:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
          <div className="conn-card" style={{ borderLeftColor: '#7c8aff' }}>
            <p className="text-sm font-semibold text-[#e4e4ed] mb-1">Complementary Focal Point</p>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Áo đỏ trong cảnh rừng xanh — focal point ngay lập tức. Không cần rule of thirds, không cần leading lines — complementary contrast tự động pull mắt.
            </p>
          </div>
          <div className="conn-card" style={{ borderLeftColor: '#ffcb6b' }}>
            <p className="text-sm font-semibold text-[#e4e4ed] mb-1">Saturation Focal Point</p>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Chủ thể saturation cao trên nền desaturated — kỹ thuật film sử dụng thường xuyên để hướng mắt khán giả mà không cần dialogue.
            </p>
          </div>
          <div className="conn-card" style={{ borderLeftColor: '#22c55e' }}>
            <p className="text-sm font-semibold text-[#e4e4ed] mb-1">Warm-Cool Focal Point</p>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Vùng ấm trên nền lạnh (hoặc ngược lại) — tạo depth và separation tự nhiên. Chủ thể ấm tự động &ldquo;nổi&rdquo; lên trên nền lạnh.
            </p>
          </div>
          <div className="conn-card" style={{ borderLeftColor: '#a855f7' }}>
            <p className="text-sm font-semibold text-[#e4e4ed] mb-1">Extension Focal Point</p>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Một mảng vàng nhỏ trên nền tím lớn — exploit tỷ lệ diện tích để tạo điểm nhấn mà không cần đến complementary pairs.
            </p>
          </div>
        </div>

        <hr className="doc-divider" />

        {/* 4.2 */}
        <h3 id="sec-4-2" className="scroll-mt-20">
          2. Chiều sâu qua tương phản ấm-lạnh
        </h3>

        <p>
          Trong hội họa Phục Hưng, họa sĩ sử dụng atmospheric perspective — vật xa có màu lạnh hơn, nhạt hơn; vật gần có màu ấm hơn, đậm hơn — để tạo chiều sâu trên canvas phẳng. Nhiếp ảnh có thể exploit hiện tượng tự nhiên này hoặc nhân tạo nó trong hậu kỳ.
        </p>

        <ul className="factor-list">
          <li>
            <strong>Chiều sâu tự nhiên:</strong> Sương mù làm xa cảnh lạnh hơn — núi xa xanh lam hơn núi gần. Giữ lại (hoặc tăng) sự khác biệt ấm-lạnh này trong hậu kỳ.
          </li>
          <li>
            <strong>Chiều sâu nhân tạo:</strong> Color grading shadow teal + highlight ấm — tạo depth perception ngay cả trong ảnh không có khoảng cách thực sự.
          </li>
          <li>
            <strong>Foreground ấm, background lạnh:</strong> Kỹ thuật cổ điển — foreground ấm &ldquo;đưa&rdquo; người xem vào ảnh, background lạnh &ldquo;mở&rdquo; không gian ra xa.
          </li>
        </ul>

        <hr className="doc-divider" />

        {/* 4.3 */}
        <h3 id="sec-4-3" className="scroll-mt-20">
          3. Tâm trạng qua mức độ tương phản
        </h3>

        <p>
          Mức độ tương phản (contrast level) trực tiếp quyết định <span className="key-concept">cường độ cảm xúc</span> của bức ảnh. Tương phản cao = cảm xúc mạnh, rõ ràng; tương phản thấp = cảm xúc tinh tế, mơ hồ. Giống như âm nhạc: high contrast là fortissimo, low contrast là pianissimo.
        </p>

        <div className="overflow-x-auto my-4 rounded-lg border border-[#1e1e2a]">
          <table className="doc-table">
            <thead>
              <tr>
                <th>Mức độ tương phản</th>
                <th>Cảm xúc</th>
                <th>Thể loại nhiếp ảnh</th>
                <th>Nhiếp ảnh gia tham khảo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Rất cao</td>
                <td>Kịch tính, căng thẳng, bạo lực thị giác</td>
                <td>Noir, punk, conflict photography</td>
                <td>Daido Moriyama, Guy Bourdin</td>
              </tr>
              <tr>
                <td>Cao</td>
                <td>Mạnh mẽ, tự tin, rõ ràng</td>
                <td>Commercial, fashion, editorial</td>
                <td>Annie Leibovitz, Platon</td>
              </tr>
              <tr>
                <td>Trung bình</td>
                <td>Cân bằng, tự nhiên, dễ chịu</td>
                <td>Lifestyle, documentary, travel</td>
                <td>Steve McCurry, Peter Lindbergh</td>
              </tr>
              <tr>
                <td>Thấp</td>
                <td>Tinh tế, mơ hồ, hoài niệm</td>
                <td>Fine art, mood, minimalist</td>
                <td>Michael Kenna, Saul Leiter</td>
              </tr>
              <tr>
                <td>Rất thấp</td>
                <td>Thiền, siêu thực, giấc mơ</td>
                <td>Abstract, ethereal, experimental</td>
                <td>Hiroshi Sugimoto, Rinko Kawauchi</td>
              </tr>
            </tbody>
          </table>
        </div>

        <hr className="doc-divider" />

        {/* 4.4 */}
        <h3 id="sec-4-4" className="scroll-mt-20">
          4. Tương phản cao vs tương phản thấp
        </h3>

        <div className="comparison-grid my-4">
          <div className="comp-card">
            <span className="sub-label" style={{ color: '#fb7185', background: 'rgba(251,113,133,0.1)' }}>HIGH CONTRAST PHOTOGRAPHY</span>
            <h4>Tương phản cao — Fortissimo</h4>
            <p>
              Tương phản bổ sắc đầy đủ, saturation cao, light-dark contrast mạnh. Mỗi vùng ảnh &ldquo;la&rdquo; để được chú ý. Phù hợp khi bạn cần tác động ngay lập tức — quảng cáo, editorial, photojournalism. Rủi ro: mệt mỏi thị giác nếu không có vùng &ldquo;nghỉ&rdquo;.
            </p>
          </div>
          <div className="comp-card" style={{ borderColor: '#22c55e44' }}>
            <span className="sub-label" style={{ color: '#22c55e', background: 'rgba(34,197,94,0.1)' }}>LOW CONTRAST PHOTOGRAPHY</span>
            <h4>Tương phản thấp — Pianissimo</h4>
            <p>
              Analogous palette, saturation thấp, light-dark contrast nhẹ. Ảnh thì thầm thay vì la. Phù hợp khi bạn cần sự lắng đọng — fine art, meditation, intimacy. Rủi ro: nhàm chán nếu không có ít nhất một điểm tương phản để anchor.
            </p>
          </div>
        </div>

        <div className="callout callout-key">
          <div className="callout-title">
            <Lightbulb size={13} className="inline mr-1" />
            Bí quyết của bậc thầy
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Nhiếp ảnh gia bậc thầy không chọn giữa high contrast hay low contrast — họ kiểm soát <strong>phân bố</strong> tương phản. Một bức ảnh có thể 90% low contrast với 10% high contrast ở đúng focal point — và đó là tổ hợp mạnh nhất. Nuance trong tổng thể, punch ở đúng nơi cần thiết.
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
              Itten định nghĩa 7 loại tương phản màu sắc: hue, light-dark, cold-warm, complementary, simultaneous, saturation, extension.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">02</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Tương phản bổ sắc là mạnh nhất — nó exploit cơ chế afterimage của tế bào nón, tạo hiệu ứng rung động thị giác.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">03</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Tương phản đồng thời (simultaneous contrast) chứng minh màu sắc là quan hệ — không phải thuộc tính độc lập.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">04</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Tương phản ấm-lạnh tạo chiều sâu: màu ấm tiến, màu lạnh lùi — công cụ không thể thiếu cho depth trong ảnh 2D.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">05</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Mức độ tương phản quyết định cường độ cảm xúc: cao = kịch tính, thấp = tinh tế. Phân bố tương phản quan trọng hơn mức độ tuyệt đối.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">06</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Tương phản diện tích (extension) giải thích tại sao mảng vàng nhỏ có trọng lực thị giác tương đương mảng tím lớn.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">07</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Tổ hợp mạnh nhất: 90% low contrast + 10% high contrast ở focal point — nuance trong tổng thể, punch ở đúng nơi cần thiết.
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
              Tương phản không phải chỉ là black &amp; white. Tương phản là bất kỳ điều gì tạo ra <strong>TENSION</strong> — giữa cũ và mới, to và nhỏ, sáng và tối, tự nhiên và nhân tạo, đơn giản và phức tạp. Một ảnh không có tension không có drama, và không có drama thì không có câu chuyện thực sự. Câu hỏi quan trọng nhất khi nhìn bất kỳ cảnh nào: <em>"Tension ở đây là gì? Và tôi có thể đặt khung hình để làm nổi bật tension đó không?"</em>
            </p>
          </div>
          <div className="callout callout-pitfall">
            <div className="callout-title">⚠ Bẫy chuyên gia</div>
            <p style={{ marginBottom: 0, lineHeight: 1.75 }}>
              Nhầm <strong>tương phản tonal</strong> với <strong>tương phản thị giác thực sự</strong>. Bạn có thể có tương phản cao về tone (sáng/tối rõ ràng) nhưng thấp về narrative tension — ảnh vẫn flat vì thiếu ý nghĩa đối lập. Tension thực sự đến từ <em>mâu thuẫn ý nghĩa</em>, không chỉ tone. Một người già trong môi trường trẻ trung tạo tension mạnh hơn bất kỳ high-contrast filter nào.
            </p>
          </div>
          <div className="practice-exercise">
            <div className="practice-header">⬥ Bài tập thực chiến — 5 Contrast Portraits</div>
            <div className="practice-body">
              <p>Tìm và chụp 5 "tương phản chân dung" — mỗi ảnh kể về một sự đối lập sâu sắc:</p>
              <ol className="practice-steps">
                <li><strong>Thời gian:</strong> Cái gì già nua bên cạnh cái gì hiện đại? (ông bà với smartphone, chùa cổ bên tòa nhà kính)</li>
                <li><strong>Kích thước:</strong> Sự nhỏ bé của con người trước cái vĩ đại của tự nhiên hay kiến trúc.</li>
                <li><strong>Thiên nhiên vs. Nhân tạo:</strong> Cỏ xanh mọc qua vết nứt bê tông. Sự sống trong vật vô tri.</li>
                <li><strong>Tĩnh vs. Động:</strong> Freeze motion — một thứ hoàn toàn bất động bên cạnh blur chuyển động.</li>
                <li><strong>Cảm xúc:</strong> Nụ cười trong đám tang. Vẻ nghiêm trang trong đám hội. Không dùng Photoshop composite.</li>
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
          <Link href="/mau-sac" className="group nav-card">
            <div className="nav-card-label">← Bài trước</div>
            <div className="nav-card-title">8. Màu sắc</div>
            <div className="nav-card-desc">Ngôn ngữ thị giác</div>
          </Link>
          <Link href="/chat-lieu" className="group nav-card text-right">
            <div className="nav-card-label">Bài tiếp →</div>
            <div className="nav-card-title">10. Chất liệu bề mặt</div>
            <div className="nav-card-desc">Chất liệu & Tỷ lệ</div>
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
              <p className="font-semibold text-[#9d9db5] mb-2">Ngôn ngữ thị giác</p>
              <a href="/mau-sac" className="block hover:text-[#7c8aff] transition-colors">Màu sắc</a>
              <a href="/tuong-phan" className="block hover:text-[#7c8aff] transition-colors">Tương phản màu sắc</a>
              <a href="/anh-sang" className="block hover:text-[#7c8aff] transition-colors">Ánh sáng bóng tối</a>
            </div>
            <div>
              <p className="font-semibold text-[#9d9db5] mb-2">Chất liệu & Tỷ lệ</p>
              <a href="/chat-lieu" className="block hover:text-[#7c8aff] transition-colors">Chất liệu bề mặt</a>
              <a href="/kich-thuoc" className="block hover:text-[#7c8aff] transition-colors">Kích thước tỷ lệ</a>
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

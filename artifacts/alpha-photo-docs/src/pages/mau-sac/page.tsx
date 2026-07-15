

import { useState, useEffect } from 'react';
import { LessonVideoPlayer } from '@/components/lesson-video-player';
import { lessonVideos } from '@/lib/video-config';
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
  Sun,
  Thermometer,
  Eye,
  Droplets,
  Sparkles,
  BookOpen,
  Check,
  SlidersHorizontal,
  Contrast,
} from 'lucide-react';
import DocsLayout from '@/components/docs-layout';

/* ------------------------------------------------------------------ */
/*  TOC Data                                                          */
/* ------------------------------------------------------------------ */
const tocSections = [
  { id: 'sec-1', label: 'Ⅰ. Bản chất màu sắc', level: 1 },
  { id: 'sec-1-1', label: '1. Hue — Sắc độ', level: 2 },
  { id: 'sec-1-2', label: '2. Saturation — Độ bão hòa', level: 2 },
  { id: 'sec-1-3', label: '3. Luminance — Độ sáng', level: 2 },
  { id: 'sec-1-4', label: '4. Cách chúng ta nhận thức màu sắc', level: 2 },
  { id: 'sec-1-5', label: '5. Pha màu cộng và pha màu trừ', level: 2 },
  { id: 'sec-2', label: 'Ⅱ. Bánh xe màu sắc và hòa hợp', level: 1 },
  { id: 'sec-2-1', label: '1. Bánh xe màu sắc (Color Wheel)', level: 2 },
  { id: 'sec-2-2', label: '2. Các hệ thống hòa hợp màu sắc', level: 2 },
  { id: 'sec-3', label: 'Ⅲ. Nhiệt độ màu sắc', level: 1 },
  { id: 'sec-3-1', label: '1. Màu ấm và màu lạnh', level: 2 },
  { id: 'sec-3-2', label: '2. Tác động cảm xúc của nhiệt độ màu', level: 2 },
  { id: 'sec-3-3', label: '3. Nhiệt độ màu trong Kelvin', level: 2 },
  { id: 'sec-4', label: 'Ⅳ. Tâm lý học màu sắc', level: 1 },
  { id: 'sec-4-1', label: '1. Đỏ — Đam mê và nguy hiểm', level: 2 },
  { id: 'sec-4-2', label: '2. Xanh lam — Bình yên và tin tưởng', level: 2 },
  { id: 'sec-4-3', label: '3. Vàng — Niềm vui và cảnh báo', level: 2 },
  { id: 'sec-4-4', label: '4. Xanh lá — Thiên nhiên và phát triển', level: 2 },
  { id: 'sec-4-5', label: '5. Tím — Vương giả và bí ẩn', level: 2 },
  { id: 'sec-4-6', label: '6. Cam — Năng lượng và ấm áp', level: 2 },
  { id: 'sec-5', label: 'Ⅴ. Màu sắc trong hậu kỳ', level: 1 },
  { id: 'sec-5-1', label: '1. Cân bằng trắng (White Balance)', level: 2 },
  { id: 'sec-5-2', label: '2. Color Grading', level: 2 },
  { id: 'sec-5-3', label: '3. Split Toning', level: 2 },
  { id: 'sec-5-4', label: '4. LUT (Look-Up Table)', level: 2 },
  { id: 'summary', label: 'Tóm tắt 8 điểm chính', level: 1 },
];

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */
export default function MauSacPage() {
  const [isRead, setIsRead] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('alpha-doc-read');
      if (saved) {
        const readPages: string[] = JSON.parse(saved);
        if (readPages.includes('/mau-sac')) setIsRead(true);
      }
    } catch {}
  }, []);

  const toggleRead = () => {
    try {
      const saved = localStorage.getItem('alpha-doc-read');
      const readPages: string[] = saved ? JSON.parse(saved) : [];
      if (isRead) {
        const updated = readPages.filter((p) => p !== '/mau-sac');
        localStorage.setItem('alpha-doc-read', JSON.stringify(updated));
        setIsRead(false);
      } else {
        const updated = [...readPages, '/mau-sac'];
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
          <span className="text-[#9d9db5]">Màu sắc</span>
        </div>

        {/* Badges */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold font-mono px-2 py-0.5 rounded bg-[rgba(124,138,255,0.1)] text-[#7c8aff]">
            HA8
          </span>
          <span className="text-[11px] text-[#6b6b80]">18 phút đọc · #MauSac #ColorTheory #NgonNguThiGiac</span>
          <span className="elite-badge">
            <GraduationCap size={11} />
            Nâng cao
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-[#e4e4ed] leading-tight mb-3 border-none pb-0">
          Màu sắc
        </h1>

        {/* Subtitle */}
        <p className="text-base text-[#9d9db5] leading-relaxed mb-6" style={{ marginTop: 0 }}>
          Ngôn ngữ thị giác · Bài 8 — Màu sắc không chỉ là thuộc tính của vật thể — nó là ngôn ngữ cảm xúc mạnh nhất của nhiếp ảnh
        </p>

        {/* Hero image */}
        <div className="color-overview-hero rounded-xl overflow-hidden border border-[#1e1e2a] mb-8">
          <img
            src="/hero-mau-sac.webp"
            alt="Infographic tổng quan về màu sắc trong nhiếp ảnh: hue, saturation, luminance, bánh xe màu, hòa hợp màu và tâm lý màu sắc"
            className="w-full h-auto object-contain"
            loading="eager"
          />
        </div>

        {/* Video bài học */}
        <LessonVideoPlayer video={lessonVideos['/mau-sac']} />

        {/* Opening Quote */}
        <div className="quote-block">
          <p>
            &ldquo;Màu sắc là nơi mà não bộ và vũ trụ gặp nhau. Nó là ngôn ngữ của ánh sáng nói với cảm xúc.&rdquo;
          </p>
          <p className="quote-attr">— Josef Albers, Interaction of Color</p>
        </div>

        <p className="drop-cap">
          Trong số tất cả các yếu tố thị giác, màu sắc là yếu tố tác động nhanh nhất và sâu nhất đến cảm xúc người xem. Trước khi não bộ kịp phân tích bố cục hay nhận diện chủ thể, màu sắc đã hoàn thành công việc truyền tải tâm trạng. Một bức ảnh toàn sắc độ xanh lam tạo cảm giác lắng đọng ngay lập tức; một bức ảnh ngập sắc đỏ gợi ra sự căng thẳng không cần lời giải thích. Hiểu màu sắc là nắm được chìa khóa cảm xúc mạnh nhất trong tay bạn.
        </p>

        {/* ============================================================ */}
        {/*  SECTION I                                                    */}
        {/* ============================================================ */}
        <h2 id="sec-1" className="scroll-mt-20">
          <span className="section-num">Ⅰ</span>
          Bản chất màu sắc
        </h2>

        <p>
          Màu sắc không phải là thuộc tính vật lý của đối tượng — nó là trải nghiệm cảm giác do não bộ tạo ra khi tiếp nhận ánh sáng ở các bước sóng khác nhau. Tảng đá không &ldquo;màu đỏ&rdquo; — nó chỉ phản xạ ánh sáng ở bước sóng mà não chúng ta diễn giải là đỏ. Sự phân biệt này có vẻ học thuật, nhưng nó là nền tảng để hiểu tại sao cùng một màu sắc lại tạo ra phản ứng khác nhau trong các bối cảnh khác nhau.
        </p>

        <hr className="doc-divider" />

        {/* 1.1 */}
        <h3 id="sec-1-1" className="scroll-mt-20">
          1. Hue — Sắc độ: Danh tính của màu sắc
        </h3>

        <p>
          Hue là thuộc tính định nghĩa <span className="key-concept">danh tính</span> của màu sắc — yếu tố phân biệt đỏ với xanh lam, vàng với tím. Trên bánh xe màu sắc, hue được biểu diễn bằng vị trí góc (0°–360°), nơi mỗi độ đại diện cho một sắc độ khác nhau. Trong nhiếp ảnh, hue là công cụ phân loại cảm xúc cơ bản nhất: ấm (đỏ, cam, vàng) và lạnh (xanh lam, xanh lục, tím).
        </p>

        <div className="callout callout-key">
          <div className="callout-title">
            <Lightbulb size={13} className="inline mr-1" />
            Hue trong thực hành nhiếp ảnh
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Khi bạn chỉnh HSL panel trong Lightroom, việc kéo hue slider không thay đổi độ bão hòa hay độ sáng — nó chỉ &ldquo;di chuyển&rdquo; sắc độ dọc theo bánh xe màu. Ví dụ: kéo hue của xanh lá về phía vàng biến nó thành màu oliu; kéo về phía xanh lam biến nó thành teal. Đây là kỹ thuật tinh tế nhất để điều chỉnh tâm trạng ảnh mà không làm mất tự nhiên.
          </p>
        </div>

        <hr className="doc-divider" />

        {/* 1.2 */}
        <h3 id="sec-1-2" className="scroll-mt-20">
          2. Saturation — Độ bão hòa: Cường độ cảm xúc
        </h3>

        <p>
          Saturation đo lường <span className="key-concept">mức độ thuần khiết</span> của một màu sắc — khoảng cách từ màu xám trung tính đến sắc độ rực rỡ nhất. Một màu đỏ saturation cao như cờ hiệu tạo cảm xúc mãnh liệt; cùng sắc đỏ nhưng saturation thấp (gần hồng nhạt) truyền tải sự dịu dàng. Đây là thanh điều khiển âm lượng cảm xúc: saturation cao = ồn ào, saturation thấp = thì thầm.
        </p>

        <p>Ứng dụng trong nhiếp ảnh:</p>
        <ul className="factor-list">
          <li>
            <strong>Desaturation chọn lọc:</strong> Giảm saturation ở nền, giữ saturation cao ở chủ thể — tạo focal point tự nhiên mà không cần tăng sharpness.
          </li>
          <li>
            <strong>Monochrome từng phần:</strong> Để lại một màu duy nhất saturation cao (color pop technique) — hiệu ứng thị giác mạnh mẽ nhưng dễ bị lạm dụng.
          </li>
          <li>
            <strong>Low saturation toàn ảnh:</strong> Phong cách muted/film-like tạo cảm giác hoài niệm, tinh tế — được ưa chuộng trong fine art và editorial.
          </li>
        </ul>

        <hr className="doc-divider" />

        {/* 1.3 */}
        <h3 id="sec-1-3" className="scroll-mt-20">
          3. Luminance — Độ sáng: Trọng lực của màu sắc
        </h3>

        <p>
          Luminance là thuộc tính ít được chú ý nhất nhưng lại quyết định <span className="key-concept">trọng lực thị giác</span> của màu sắc. Cùng saturation và hue, một màu sáng sẽ &ldquo;nổi&rdquo; lên, một màu tối sẽ &ldquo;chìm&rdquo; xuống. Trong bố cục, luminance tạo ra phân cấp tự nhiên: vùng sáng thu hút mắt trước, vùng tối tạo chiều sâu.
        </p>

        <div className="comparison-grid my-4">
          <div className="comp-card">
            <span className="sub-label">HIGH LUMINANCE</span>
            <h4>Màu sáng — Thu hút</h4>
            <p>
              Vùng màu có luminance cao tự nhiên trở thành focal point. Mắt di chuyển tới đây trước. Trong portrait, mặt và tay (luminance cao trên nền tối) tự động trở thành trung tâm ảnh.
            </p>
          </div>
          <div className="comp-card" style={{ borderColor: '#fb718533' }}>
            <span className="sub-label" style={{ color: '#fb7185', background: 'rgba(251,113,133,0.1)' }}>LOW LUMINANCE</span>
            <h4>Màu tối — Chiều sâu</h4>
            <p>
              Vùng luminance thấp tạo cảm giác khoảng cách, trọng lượng, và bí ẩn. Shadow areas không phải là &ldquo;thiếu màu&rdquo; — chúng là nền tảng tạo chiều sâu cho toàn bộ bức ảnh.
            </p>
          </div>
        </div>

        <hr className="doc-divider" />

        {/* 1.4 */}
        <h3 id="sec-1-4" className="scroll-mt-20">
          4. Cách chúng ta nhận thức màu sắc
        </h3>

        <p>
          Nhận thức màu sắc không phải là quá trình thụ động ghi nhận ánh sáng — nó là quá trình <span className="key-concept">xây dựng tích cực</span> của não bộ. Ba hiện tượng quan trọng nhất mà nhiếp ảnh gia cần hiểu:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
          <div className="hotspot-card text-center">
            <div className="text-[#7c8aff] mb-2">
              <Eye size={22} className="mx-auto" />
            </div>
            <p className="text-sm font-semibold text-[#e4e4ed] mb-1">Adaptation</p>
            <p className="text-xs text-[#9d9db5]">Mắt tự điều chỉnh theo ánh sáng môi trường. Ở ánh sáng nến, giấy trắng trông hơi vàng — nhưng não bộ &ldquo;hiệu chỉnh&rdquo; lại để bạn vẫn thấy nó trắng. Máy ảnh không có cơ chế này.</p>
          </div>
          <div className="hotspot-card text-center">
            <div className="text-[#ffcb6b] mb-2">
              <Brain size={22} className="mx-auto" />
            </div>
            <p className="text-sm font-semibold text-[#e4e4ed] mb-1">Simultaneous Contrast</p>
            <p className="text-xs text-[#9d9db5]">Cùng một màu sắc đặt trên nền khác nhau sẽ trông khác nhau. Xám trên nền đỏ trông hơi xanh; xám trên nền xanh trông hơi đỏ. Đây là cơ sở của color grading.</p>
          </div>
          <div className="hotspot-card text-center">
            <div className="text-emerald-400 mb-2">
              <Droplets size={22} className="mx-auto" />
            </div>
            <p className="text-sm font-semibold text-[#e4e4ed] mb-1">Color Constancy</p>
            <p className="text-xs text-[#9d9db5]">Chúng ta có xu hướng giữ &ldquo;nhận thức màu&rdquo; ổn định dù điều kiện ánh sáng thay đổi. Cái áo đỏ vẫn là đỏ trong bóng râm — nhưng máy ảnh ghi nhận nó rất khác.</p>
          </div>
        </div>

        <hr className="doc-divider" />

        {/* 1.5 */}
        <h3 id="sec-1-5" className="scroll-mt-20">
          5. Pha màu cộng và pha màu trừ
        </h3>

        <div className="comparison-grid my-4">
          <div className="comp-card">
            <span className="sub-label" style={{ color: '#7c8aff', background: 'rgba(124,138,255,0.1)' }}>ADDITIVE (PHA MÀU CỘNG)</span>
            <h4>Ánh sáng — RGB</h4>
            <p>
              Ánh sáng hoạt động theo nguyên tắc cộng: càng thêm ánh sáng, càng sáng. Ba màu gốc là Đỏ, Xanh lam, Xanh lục (RGB). Khi trộn cả ba ở cường độ tối đa — bạn có ánh sáng trắng. Đây là hệ thống mà màn hình, máy chiếu, và cảm biến máy ảnh hoạt động.
            </p>
          </div>
          <div className="comp-card" style={{ borderColor: '#ffcb6b44' }}>
            <span className="sub-label" style={{ color: '#ffcb6b', background: 'rgba(255,203,107,0.1)' }}>SUBTRACTIVE (PHA MÀU TRỪ)</span>
            <h4>Pigment — CMYK</h4>
            <p>
              Màu in hoạt động theo nguyên tắc trừ: càng thêm mực, càng ít ánh sáng phản xạ. Ba màu gốc là Cyan, Magenta, Yellow (CMY). Khi trộn cả ba — lý thuyết cho màu đen, thực tế cho màu nâu bùn. Hệ thống này áp dụng cho in ấn và hội họa.
            </p>
          </div>
        </div>

        <div className="callout callout-warning">
          <div className="callout-title">
            <AlertTriangle size={13} className="inline mr-1" />
            Tại sao nhiếp ảnh gia cần biết điều này?
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Bởi vì từ lúc chụp (ánh sáng, additive) qua chỉnh sửa (màn hình RGB, additive) đến in ấn (CMYK, subtractive) — màu sắc của bạn phải chuyển đổi giữa hai hệ thống. Màu rực rỡ trên màn hình có thể &ldquo;ụ&rdquo; khi in. Đây là lý do gamut (phạm vi màu tái tạo được) của mỗi hệ thống khác nhau và ảnh hưởng trực tiếp đến tác phẩm cuối cùng.
          </p>
        </div>

        {/* ============================================================ */}
        {/*  SECTION II                                                   */}
        {/* ============================================================ */}
        <h2 id="sec-2" className="scroll-mt-20">
          <span className="section-num">Ⅱ</span>
          Bánh xe màu sắc và hòa hợp
        </h2>

        <hr className="doc-divider" />

        {/* 2.1 */}
        <h3 id="sec-2-1" className="scroll-mt-20">
          1. Bánh xe màu sắc (Color Wheel)
        </h3>

        <p>
          Bánh xe màu sắc, được Isaac Newton phát triển lần đầu năm 1666 và Johann Wolfgang von Goethe mở rộng năm 1810, là công cụ nền tảng để hiểu mối quan hệ giữa các màu. Nó sắp xếp các sắc độ theo vòng tròn, nơi màu liền kề có quan hệ họ hàng và màu đối diện có quan hệ tương phản.
        </p>

        <p>Trong nhiếp ảnh, bánh xe màu không chỉ là lý thuyết — nó là bản đồ quyết định:</p>
        <ul className="factor-list">
          <li>
            <strong>Quyết định chọn trang phục:</strong> Portrait photographer chọn áo bổ sắc (complementary) với phông nền để chủ thể nổi bật.
          </li>
          <li>
            <strong>Quyết định hậu kỳ:</strong> Color grading dựa trên complementary pairs để tạo chiều sâu thị giác.
          </li>
          <li>
            <strong>Quyết định thời điểm chụp:</strong> Giờ hoàng hôn tự nhiên tạo complementary contrast giữa trời xanh lam và ánh vàng cam.
          </li>
        </ul>

        <hr className="doc-divider" />

        {/* 2.2 */}
        <h3 id="sec-2-2" className="scroll-mt-20">
          2. Các hệ thống hòa hợp màu sắc
        </h3>

        <div className="overflow-x-auto my-4 rounded-lg border border-[#1e1e2a]">
          <table className="doc-table">
            <thead>
              <tr>
                <th>Hệ thống hòa hợp</th>
                <th>Nguyên lý</th>
                <th>Cảm xúc tạo ra</th>
                <th>Ví dụ trong nhiếp ảnh</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Complementary (Bổ sắc)</td>
                <td>Hai màu đối diện trên bánh xe (đỏ-xanh lá, cam-xanh lam, vàng-tím)</td>
                <td>Căng thẳng thị giác, năng lượng, kịch tính</td>
                <td>Hoàng hôn: trời xanh lam + ánh vàng cam; đỏ áo trên nền xanh lục</td>
              </tr>
              <tr>
                <td>Analogous (Cận sắc)</td>
                <td>2–4 màu liền kề trên bánh xe (vàng-cam-đỏ, xanh lục-xanh lam)</td>
                <td>Thống nhất, êm ái, tự nhiên</td>
                <td>Rừng thu: vàng-cam-đỏ; biển: xanh lục-xanh lam</td>
              </tr>
              <tr>
                <td>Triadic (Tam giác)</td>
                <td>Ba màu cách đều trên bánh xe (đỏ-xanh lam-vàng)</td>
                <td>Sôi động, cân bằng, vui tươi</td>
                <td>Festival, carnival, street photography đầy màu sắc</td>
              </tr>
              <tr>
                <td>Split-Complementary</td>
                <td>Một màu + hai màu kề bên màu bổ sắc</td>
                <td>Tương phản mềm hơn complementary, đa dạng hơn</td>
                <td>Xanh lam chính + vàng cam và đỏ cam phụ</td>
              </tr>
              <tr>
                <td>Monochromatic (Đơn sắc)</td>
                <td>Một hue duy nhất, thay đổi saturation và luminance</td>
                <td>Tinh tế, thanh lịch, lắng đọng</td>
                <td>Ảnh xanh lam toàn ảnh (blue hour), ảnh sepia, cyanotype</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="callout callout-brain">
          <div className="callout-title">
            <Brain size={13} className="inline mr-1" />
            Nguyên lý quan trọng
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Hòa hợp màu sắc (color harmony) không phải là &ldquo;quy tắc&rdquo; — nó là công cụ. Nhiếp ảnh giỏi không phải là người luôn tuân thủ harmony, mà là người hiểu rõ khi nào cần harmony (tạo sự thống nhất, dễ chịu) và khi nào cần phá vỡ nó (tạo căng thẳng, bất ngờ). Wes Anderson là bậc thầy color harmony; David LaChapelle là bậc thầy color chaos.
          </p>
        </div>

        {/* ============================================================ */}
        {/*  SECTION III                                                  */}
        {/* ============================================================ */}
        <h2 id="sec-3" className="scroll-mt-20">
          <span className="section-num">Ⅲ</span>
          Nhiệt độ màu sắc
        </h2>

        <hr className="doc-divider" />

        {/* 3.1 */}
        <h3 id="sec-3-1" className="scroll-mt-20">
          1. Màu ấm và màu lạnh
        </h3>

        <p>
          Bánh xe màu sắc có thể được chia thành hai nửa theo nhiệt độ: nửa ấm (đỏ, cam, vàng) và nửa lạnh (xanh lam, xanh lục, tím). Sự phân chia này không chỉ là quy ước — nó phản ánh cách não bộ phản ứng với màu sắc dựa trên trải nghiệm tiến hóa: lửa và mặt trời (ấm, gần) vs. nước và băng (lạnh, xa).
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
          <div className="hotspot-card" style={{ borderColor: '#ff9a5c44' }}>
            <div className="flex items-center gap-2 mb-2">
              <Thermometer size={16} className="text-[#ff9a5c]" />
              <span className="text-sm font-semibold text-[#ff9a5c]">Màu ấm (Warm Colors)</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Đỏ, cam, vàng — tạo cảm giác gần gũi, năng động, ấm áp. Trong bố cục, màu ấm có xu hướng &ldquo;tiến về phía&rdquo; người xem. Nhiếp ảnh gia portrait thường dùng ánh sáng ấm (golden hour) để tạo da thịt ấm áp, dễ chịu.
            </p>
          </div>
          <div className="hotspot-card" style={{ borderColor: '#7c8aff44' }}>
            <div className="flex items-center gap-2 mb-2">
              <Thermometer size={16} className="text-[#7c8aff]" />
              <span className="text-sm font-semibold text-[#7c8aff]">Màu lạnh (Cool Colors)</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Xanh lam, xanh lục, tím — tạo cảm giác xa cách, lắng đọng, tĩnh lặng. Màu lạnh có xu hướng &ldquo;lùi về phía&rdquo; hậu cảnh. Landscape photographer dùng blue hour để tạo không gian tĩnh mịch, vô tận.
            </p>
          </div>
        </div>

        <hr className="doc-divider" />

        {/* 3.2 */}
        <h3 id="sec-3-2" className="scroll-mt-20">
          2. Tác động cảm xúc của nhiệt độ màu
        </h3>

        <p>
          Nhiệt độ màu là công cụ định hình tâm trạng mạnh nhất trong nhiếp ảnh — mạnh hơn cả bố cục, mạnh hơn cả góc chụp. Lý do: nhiệt độ màu tác động lên hệ limbic (cảm xúc) trước khi vỏ não trước trán (phân tích) kịp xử lý.
        </p>

        <ul className="factor-list">
          <li>
            <strong>Ảnh ấm toàn phần:</strong> Cảm giác thân thuộc, an toàn, hoài niệm. Phong cách vintage, film simulation, golden hour.
          </li>
          <li>
            <strong>Ảnh lạnh toàn phần:</strong> Cảm giác cô đơn, thanh khiết, hoặc dystopia. Cyberpunk neon, blue hour, Scandinavian minimalism.
          </li>
          <li>
            <strong>Tương phản ấm-lạnh:</strong> Cảm xúc phức tạp nhất — sự xung đột, kịch tính, chiều sâu. Chủ thể ấm trên nền lạnh (hoặc ngược lại) tạo depth và separation tự nhiên.
          </li>
        </ul>

        <div className="callout callout-photo">
          <div className="callout-title">
            <Camera size={13} className="inline mr-1" />
            Case Study: Steve McCurry — Warm-Cool Mastery
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Trong Afghan Girl (1984), McCurry tận dụng tương phản ấm-lạnh hoàn hảo: khăn choàng đỏ ấm trên nền xanh lục lạnh, da thịt ấm sáng trên bóng tối lạnh. Không phải ngẫu nhiên — McCurry chờ đợi khoảnh khắc ánh sáng tự nhiên tạo ra sự phân tách nhiệt độ này.
          </p>
        </div>

        <hr className="doc-divider" />

        {/* 3.3 */}
        <h3 id="sec-3-3" className="scroll-mt-20">
          3. Nhiệt độ màu trong Kelvin
        </h3>

        <p>
          Nhiệt độ màu được đo bằng thang Kelvin (K), dựa trên ánh sáng phát ra bởi vật đen tuyệt đối khi bị nung nóng. Hiểu thang Kelvin giúp nhiếp ảnh gia kiểm soát và nhân tạo bất kỳ nhiệt độ màu nào:
        </p>

        <div className="overflow-x-auto my-4 rounded-lg border border-[#1e1e2a]">
          <table className="doc-table">
            <thead>
              <tr>
                <th>Nhiệt độ (K)</th>
                <th>Loại ánh sáng</th>
                <th>Đặc điểm màu</th>
                <th>Ứng dụng nhiếp ảnh</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2000–3000K</td>
                <td>Nến, đèn dầu, ánh sáng hoàng hôn</td>
                <td>Rất ấm, vàng cam đậm</td>
                <td>Romantic, vintage, intimate portrait</td>
              </tr>
              <tr>
                <td>3000–4000K</td>
                <td>Đèn sợi đốt, tungsten, đèn đường</td>
                <td>Ấm, vàng nhẹ</td>
                <td>Indoor portrait, street night, film look</td>
              </tr>
              <tr>
                <td>4000–5000K</td>
                <td>Đèn huỳnh quang, ánh sáng bình minh</td>
                <td>Trung tính hơi ấm</td>
                <td>Documentary, editorial, natural indoor</td>
              </tr>
              <tr>
                <td>5000–5500K</td>
                <td>Ánh sáng ban ngày, flash</td>
                <td>Trung tính, trắng tinh</td>
                <td>Product, studio, commercial</td>
              </tr>
              <tr>
                <td>5500–6500K</td>
                <td>Ánh sáng ngày nhiều mây, bóng râm</td>
                <td>Hơi lạnh, xanh nhẹ</td>
                <td>Portrait ngoài trời, landscape overcast</td>
              </tr>
              <tr>
                <td>6500–10000K</td>
                <td>Blue hour, trời nhiều mây dày</td>
                <td>Lạnh, xanh lam rõ rệt</td>
                <td>Mood shot, cinematic, dystopian</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ============================================================ */}
        {/*  SECTION IV                                                   */}
        {/* ============================================================ */}
        <h2 id="sec-4" className="scroll-mt-20">
          <span className="section-num">Ⅳ</span>
          Tâm lý học màu sắc
        </h2>

        <p>
          Mỗi màu sắc mang theo một hệ thống liên tưởng cảm xúc được xây dựng qua hàng triệu năm tiến hóa và hàng nghìn năm văn hóa. Hiểu tâm lý học màu sắc không phải để &ldquo;thao túng&rdquo; người xem — mà là để nói đúng ngôn ngữ cảm xúc mà người xem đã hiểu sẵn.
        </p>

        <div className="overflow-x-auto my-4 rounded-lg border border-[#1e1e2a]">
          <table className="doc-table">
            <thead>
              <tr>
                <th>Màu sắc</th>
                <th>Cảm xúc tích cực</th>
                <th>Cảm xúc tiêu cực</th>
                <th>Ứng dụng nhiếp ảnh</th>
                <th>Nhiệt độ</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ color: '#ff6b6b', fontWeight: 600 }}>Đỏ</td>
                <td>Đam mê, sức sống, tình yêu, can đảm</td>
                <td>Nguy hiểm, giận dữ, bạo lực, cấm kỵ</td>
                <td>Focal point mạnh nhất; áo đỏ trong đám đông; ánh sáng đỏ tạo tension</td>
                <td>Ấm</td>
              </tr>
              <tr>
                <td style={{ color: '#7c8aff', fontWeight: 600 }}>Xanh lam</td>
                <td>Bình yên, tin tưởng, ổn định, sâu thẳm</td>
                <td>Lạnh lùng, cô đơn, trầm cảm, xa cách</td>
                <td>Blue hour landscape; corporate portrait; underwater; cyanotype</td>
                <td>Lạnh</td>
              </tr>
              <tr>
                <td style={{ color: '#ffcb6b', fontWeight: 600 }}>Vàng</td>
                <td>Niềm vui, lạc quan, trí tuệ, ấm áp</td>
                <td>Cảnh báo, ghen tuông, cheottieu, bệnh hoạn</td>
                <td>Golden hour; highlight; tâm điểm hạnh phúc; đen trắng + yellow filter</td>
                <td>Ấm</td>
              </tr>
              <tr>
                <td style={{ color: '#4ade80', fontWeight: 600 }}>Xanh lá</td>
                <td>Thiên nhiên, phát triển, tươi mới, sức khỏe</td>
                <td>Ghen tị, bệnh tật (xanh xao), độc hại</td>
                <td>Nature photography; environmental portrait; nền tự nhiên</td>
                <td>Lạnh/Trung tính</td>
              </tr>
              <tr>
                <td style={{ color: '#a855f7', fontWeight: 600 }}>Tím</td>
                <td>Vương giả, tâm linh, sáng tạo, bí ẩn</td>
                <td>Ảo giác, bất ổn, phù phiếm, bi lụy</td>
                <td>Fine art; twilight; moody portrait; fashion editorial</td>
                <td>Lạnh</td>
              </tr>
              <tr>
                <td style={{ color: '#ff9a5c', fontWeight: 600 }}>Cam</td>
                <td>Năng lượng, nhiệt huyết, ấm áp, sáng tạo</td>
                <td>Thiếu kiên nhẫn, hời hợt, phô trương</td>
                <td>Sunset; autumn; street photography; food photography</td>
                <td>Ấm</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="callout callout-warning">
          <div className="callout-title">
            <AlertTriangle size={13} className="inline mr-1" />
            Tâm lý học màu sắc không phổ quát
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Bảng trên phản ánh chủ yếu tâm lý học phương Tây. Trắng = tang lễ ở Đông Á nhưng = đám cưới ở phương Tây. Đỏ = may mắn ở Trung Quốc nhưng = nguy hiểm ở phương Tây. Nhiếp ảnh gia làm việc xuyên văn hóa phải luôn kiểm tra ngữ cảnh văn hóa của màu sắc.
          </p>
        </div>

        {/* ============================================================ */}
        {/*  SECTION V                                                    */}
        {/* ============================================================ */}
        <h2 id="sec-5" className="scroll-mt-20">
          <span className="section-num">Ⅴ</span>
          Màu sắc trong hậu kỳ
        </h2>

        <p>
          Hậu kỳ màu sắc không phải là bước &ldquo;chỉnh sửa&rdquo; — nó là quá trình <span className="key-concept">hoàn thiện ngôn ngữ cảm xúc</span> mà bạn đã bắt đầu định hình lúc bấm máy. Mọi quyết định hậu kỳ đều là quyết định ngữ nghĩa: tăng saturation ấm = tăng cảm giác ấm áp; shift hue xanh lá về teal = tăng cảm giác cinematic.
        </p>

        <hr className="doc-divider" />

        {/* 5.1 */}
        <h3 id="sec-5-1" className="scroll-mt-20">
          1. Cân bằng trắng (White Balance)
        </h3>

        <p>
          White balance là quyết định hậu kỳ màu sắc cơ bản nhất — và cũng có tác động lớn nhất. Nó xác định điểm trung lập mà từ đó tất cả các màu khác được diễn giải. Chọn white balance ấm = đẩy toàn bộ ảnh về ấm; chọn white balance lạnh = đẩy toàn bộ ảnh về lạnh.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <Sun size={16} className="text-[#ff9a5c]" />
              <span className="text-sm font-semibold text-[#e4e4ed]">Warm WB (3500K)</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Tạo cảm giác ấm áp, hoài niệm. Phù hợp portrait, lifestyle, food. Cẩn thận với da thịt — quá ấm làm da trông đỏ bừng.
            </p>
          </div>
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <SlidersHorizontal size={16} className="text-[#9d9db5]" />
              <span className="text-sm font-semibold text-[#e4e4ed]">Neutral WB (5200K)</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Phản ánh chính xác nhất điều kiện chụp. Phù hợp product, documentary, architectural — nơi trung thực màu sắc là ưu tiên.
            </p>
          </div>
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <Contrast size={16} className="text-[#7c8aff]" />
              <span className="text-sm font-semibold text-[#e4e4ed]">Cool WB (7000K)</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Tạo cảm giác lạnh lùng, cinematic. Phù hợp moody landscape, noir portrait, cyberpunk. Cẩn thận với da — quá lạnh tạo corpse-like effect.
            </p>
          </div>
        </div>

        <hr className="doc-divider" />

        {/* 5.2 */}
        <h3 id="sec-5-2" className="scroll-mt-20">
          2. Color Grading
        </h3>

        <p>
          Color grading là nghệ thuật điều chỉnh màu sắc có chủ đích để tạo ra một <span className="key-concept">phong cách thị giác nhất quán</span>. Khác với color correction (sửa sai), color grading là hành động sáng tạo — thêm lớp ngữ nghĩa cảm xúc lên trên bức ảnh.
        </p>

        <p>Hai phương pháp chính:</p>
        <ul className="factor-list">
          <li>
            <strong>Global grading:</strong> Áp dụng một look tổng thể cho toàn bộ ảnh (ví dụ: teal-orange look trong cinema). Tạo thống nhất nhưng có thể đơn điệu.
          </li>
          <li>
            <strong>Selective grading:</strong> Điều chỉnh từng vùng màu riêng biệt (HSL panel). Phức tạp hơn nhưng cho phép kiểm soát tinh tế — ví dụ: chỉ shift hue của xanh lam về teal trong shadow, giữ highlight vàng ấm.
          </li>
        </ul>

        <hr className="doc-divider" />

        {/* 5.3 */}
        <h3 id="sec-5-3" className="scroll-mt-20">
          3. Split Toning
        </h3>

        <p>
          Split toning là kỹ thuật color grading tinh tế nhất: áp dụng một màu cho vùng sáng (highlight) và một màu khác cho vùng tối (shadow). Kỹ thuật này tạo ra chiều sâu cảm xúc phức tạp — mỗi vùng ảnh &ldquo;nói&rdquo; một sắc thái khác nhau.
        </p>

        <div className="overflow-x-auto my-4 rounded-lg border border-[#1e1e2a]">
          <table className="doc-table">
            <thead>
              <tr>
                <th>Phong cách</th>
                <th>Shadow Color</th>
                <th>Highlight Color</th>
                <th>Cảm xúc</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Teal &amp; Orange</td>
                <td>Teal (xanh lơ)</td>
                <td>Cam ấm</td>
                <td>Cinematic, Hollywood blockbuster</td>
              </tr>
              <tr>
                <td>Cross Process</td>
                <td>Xanh lam</td>
                <td>Vàng xanh</td>
                <td>Thời trang, experimental, vintage film</td>
              </tr>
              <tr>
                <td>Faded Film</td>
                <td>Tím nhạt</td>
                <td>Xanh nhạt</td>
                <td>Hoài niệm, mộng mơ, Instagram aesthetic</td>
              </tr>
              <tr>
                <td>Noir Chrome</td>
                <td>Xanh lam đậm</td>
                <td>Trắng xanh</td>
                <td>Lạnh lùng, dystopia, Blade Runner</td>
              </tr>
            </tbody>
          </table>
        </div>

        <hr className="doc-divider" />

        {/* 5.4 */}
        <h3 id="sec-5-4" className="scroll-mt-20">
          4. LUT (Look-Up Table)
        </h3>

        <p>
          LUT là bảng tra cứu ánh xạ màu đầu vào thành màu đầu ra. Nó cho phép áp dụng một color grade phức tạp chỉ bằng một click — thay vì điều chỉnh hàng chục slider. LUT được sử dụng rộng rãi trong điện ảnh và ngày càng phổ biến trong nhiếp ảnh.
        </p>

        <div className="callout callout-key">
          <div className="callout-title">
            <Lightbulb size={13} className="inline mr-1" />
            Sử dụng LUT đúng cách
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            LUT là điểm khởi đầu, không phải điểm kết thúc. Đừng áp dụng LUT và gọi là xong — hãy dùng LUT như base, sau đó tinh chỉnh opacity và điều chỉnh theo từng ảnh. LUT áp dụng 100% opacity trông &ldquo;giả&rdquo;; LUT ở 40–60% opacity kết hợp với tinh chỉnh manual tạo ra kết quả chuyên nghiệp.
          </p>
        </div>

        {/* ============================================================ */}
        {/*  SUMMARY                                                      */}
        {/* ============================================================ */}
        <h2 id="summary" className="scroll-mt-20">
          Tóm tắt 8 điểm chính
        </h2>
        <div className="space-y-3 my-4">
          <div className="key-point">
            <div className="key-point-num">01</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Màu sắc là trải nghiệm cảm giác do não bộ tạo ra — không phải thuộc tính vật lý của vật thể.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">02</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Ba thuộc tính cốt lõi: Hue (danh tính), Saturation (cường độ cảm xúc), Luminance (trọng lực thị giác).
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">03</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Não bộ xây dựng nhận thức màu sắc chủ động — thông qua adaptation, simultaneous contrast, và color constancy.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">04</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Bánh xe màu sắc là bản đồ quyết định: complementary = kịch tính, analogous = thống nhất, monochromatic = tinh tế.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">05</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Nhiệt độ màu là công cụ định hình tâm trạng mạnh nhất: ấm = gần gũi, lạnh = xa cách, tương phản ấm-lạnh = chiều sâu.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">06</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Mỗi màu sắc mang hệ thống liên tưởng cảm xúc riêng — nhưng tâm lý học màu sắc không phổ quát, nó phụ thuộc văn hóa.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">07</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Hậu kỳ màu sắc là hoàn thiện ngôn ngữ cảm xúc — White Balance, Color Grading, Split Toning, LUT là bốn công cụ trung tâm.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">08</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Hòa hợp màu sắc là công cụ, không phải quy tắc — biết khi nào dùng và khi nào phá vỡ mới là bậc thầy.
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
              Màu sắc nói chuyện với người xem <strong>trước khi họ kịp nhìn vào chủ thể</strong>. 80% ấn tượng đầu tiên của một bức ảnh được quyết định bởi palette màu dominant. Đây là lý do tại sao color grading trong hậu kỳ không phải là "trang điểm" — nó là <em>viết lại ngôn ngữ</em> của tấm ảnh. Người master màu sắc không nghĩ về màu cụ thể mà nghĩ về <em>nhiệt độ cảm xúc</em>: ảnh này cần ấm hay lạnh, bão hòa hay kiệt màu, rực rỡ hay trầm mặc?
            </p>
          </div>
          <div className="callout callout-pitfall">
            <div className="callout-title">⚠ Bẫy chuyên gia</div>
            <p style={{ marginBottom: 0, lineHeight: 1.75 }}>
              Dùng <strong>saturation quá cao</strong> để "bù đắp" cho ảnh nhàm chán là lỗi phổ biến nhất trong hậu kỳ. Màu sắc bão hòa cực cao thực ra làm <em>giảm</em> sức mạnh cảm xúc — nó bão hòa cả người xem. Màu có tác động nhất thường là màu tinh tế, không phải màu chói. Cinematic color grading luôn dựa trên sự kiềm chế chiến lược, không phải sự phô trương.
            </p>
          </div>
          <div className="practice-exercise">
            <div className="practice-header">⬥ Bài tập thực chiến — Color Story Tuần</div>
            <div className="practice-body">
              <p>Xây dựng nhạy cảm màu sắc qua thực hành theo chủ đề tuần:</p>
              <ol className="practice-steps">
                <li><strong>Tuần 1 — Analogous:</strong> Chỉ chụp cảnh có màu gần nhau trên bánh xe màu (xanh lá + vàng, hay cam + đỏ). Cảm giác: hài hòa, nhất quán.</li>
                <li><strong>Tuần 2 — Complementary:</strong> Tìm và chụp các cặp màu đối lập (đỏ/xanh lá, cam/xanh lam). Cảm giác: tension, năng lượng, drama.</li>
                <li><strong>Tuần 3 — Monochrome + 1 Accent:</strong> Ảnh gần như chỉ có một màu, nhưng có một điểm accent màu đối lập. Cảm giác: tinh tế, có chủ đích, editorial.</li>
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
          <Link href="/anh-sang" className="group nav-card">
            <div className="nav-card-label">← Bài trước</div>
            <div className="nav-card-title">7. Ánh sáng bóng tối</div>
            <div className="nav-card-desc">Ngôn ngữ thị giác</div>
          </Link>
          <Link href="/tuong-phan" className="group nav-card text-right">
            <div className="nav-card-label">Bài tiếp →</div>
            <div className="nav-card-title">9. Tương phản màu sắc</div>
            <div className="nav-card-desc">Ngôn ngữ thị giác</div>
          </Link>
        </div>

        {/* Enhanced Footer */}
        <div className="mt-16 pt-8 border-t border-[#1e1e2a]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-gradient-to-br from-[#7c8aff] to-[#5a6aff] flex items-center justify-center text-white text-[8px] font-bold">α</div>
              <span className="text-xs text-[#6b6b80]">Alpha Photography</span>
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

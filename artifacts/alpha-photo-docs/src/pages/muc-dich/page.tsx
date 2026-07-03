

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
  ShieldAlert,
  Target,
  Eye,
  Compass,
  Heart,
  Sparkles,
  FlaskConical,
  BookOpen,
  Check,
} from 'lucide-react';
import DocsLayout from '@/components/docs-layout';

/* ------------------------------------------------------------------ */
/*  TOC Data                                                          */
/* ------------------------------------------------------------------ */
const tocSections = [
  { id: 'sec-1', label: 'Ⅰ. Hệ thống phân loại mục đích hình ảnh', level: 1 },
  { id: 'sec-1-1', label: '1. Ghi lại (Documentary Intent)', level: 2 },
  { id: 'sec-1-2', label: '2. Truyền đạt (Communicative Intent)', level: 2 },
  { id: 'sec-1-3', label: '3. Khơi gợi (Evocative Intent)', level: 2 },
  { id: 'sec-1-4', label: '4. Thuyết phục (Persuasive Intent)', level: 2 },
  { id: 'sec-1-5', label: '5. Khám phá (Exploratory Intent)', level: 2 },
  { id: 'sec-2', label: 'Ⅱ. Mục đích và mối quan hệ với kỹ thuật', level: 1 },
  { id: 'sec-2-1', label: '1. Kỹ thuật không có mục đích', level: 2 },
  { id: 'sec-2-2', label: '2. Mục đích định nghĩa kỹ thuật', level: 2 },
  { id: 'sec-2-3', label: '3. Xung đột mục đích', level: 2 },
  { id: 'sec-3', label: 'Ⅲ. Mục đích và người nhận', level: 1 },
  { id: 'sec-3-1', label: '1. Intent vs. Reception', level: 2 },
  { id: 'sec-3-2', label: '2. Xác định người nhận mục tiêu', level: 2 },
  { id: 'sec-3-3', label: '3. Vòng phản hồi mục đích', level: 2 },
  { id: 'sec-4', label: 'Ⅳ. Mục đích trong quá trình sáng tác', level: 1 },
  { id: 'sec-4-1', label: '1. Pre-visualization', level: 2 },
  { id: 'sec-4-2', label: '2. Nhất quán trong portfolio', level: 2 },
  { id: 'sec-4-3', label: '3. Khi mục đích thay đổi', level: 2 },
  { id: 'summary', label: 'Tóm tắt 7 điểm chính', level: 1 },
];

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */
export default function MucDichPage() {
  const [isRead, setIsRead] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('alpha-doc-read');
      if (saved) {
        const readPages: string[] = JSON.parse(saved);
        if (readPages.includes('/muc-dich')) setIsRead(true);
      }
    } catch {}
  }, []);

  const toggleRead = () => {
    try {
      const saved = localStorage.getItem('alpha-doc-read');
      const readPages: string[] = saved ? JSON.parse(saved) : [];
      if (isRead) {
        const updated = readPages.filter((p) => p !== '/muc-dich');
        localStorage.setItem('alpha-doc-read', JSON.stringify(updated));
        setIsRead(false);
      } else {
        const updated = [...readPages, '/muc-dich'];
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
          <a href="#">Nền tảng hình ảnh</a>
          <ChevronRight size={12} />
          <span className="text-[#9d9db5]">Mục đích của hình ảnh</span>
        </div>

        {/* Badges */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold font-mono px-2 py-0.5 rounded bg-[rgba(124,138,255,0.1)] text-[#7c8aff]">
            HA2
          </span>
          <span className="text-[11px] text-[#6b6b80]">16 phút đọc · #MucDich #TuDuyHinhAnh</span>
          <span className="elite-badge">
            <GraduationCap size={11} />
            Nâng cao
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-[#e4e4ed] leading-tight mb-3 border-none pb-0">
          Mục đích của hình ảnh
        </h1>

        {/* Subtitle */}
        <p className="text-base text-[#9d9db5] leading-relaxed mb-6" style={{ marginTop: 0 }}>
          Nền tảng hình ảnh · Bài 2 — Tại sao một hình ảnh tồn tại — và nó phải làm được gì?
        </p>

        {/* Hero image */}
        <div className="rounded-xl overflow-hidden border border-[#1e1e2a] mb-8">
          <img
            src="/hero-muc-dich.png"
            alt="Mục đích của hình ảnh - Ảnh minh họa"
            className="w-full h-auto object-cover"
            loading="eager"
          />
        </div>

        {/* Opening Quote */}
        <div className="quote-block">
          <p>
            Trước khi đặt máy lên, trước khi chọn ống kính, trước khi nghĩ đến bố cục — một câu hỏi duy nhất phân biệt nhiếp ảnh gia tư duy với người bấm máy phản xạ: &ldquo;Hình ảnh này tồn tại để làm gì?&rdquo;
          </p>
        </div>

        {/* ============================================================ */}
        {/*  SECTION I                                                    */}
        {/* ============================================================ */}
        <h2 id="sec-1" className="scroll-mt-20">
          <span className="section-num">Ⅰ</span>
          Hệ thống phân loại mục đích hình ảnh
        </h2>

        <p className="drop-cap">
          Trước khi đi vào từng mục đích cụ thể, cần hiểu rằng mục đích của hình ảnh không phải là một lựa chọn đơn thuần — nó là một{' '}
          <span className="key-concept">hệ thống phân tầng</span>. Một bức ảnh có thể phục vụ nhiều mục đích cùng lúc, nhưng luôn có một mục đích chủ đạo (primary intent) định hướng toàn bộ các quyết định sáng tác.
        </p>

        <hr className="doc-divider" />

        {/* 1.1 */}
        <h3 id="sec-1-1" className="scroll-mt-20">
          1. Ghi lại (Documentary Intent) — Chứng nhân trung thực của thực tế
        </h3>

        <p>
          Đây là mục đích cổ xưa nhất và nền tảng nhất của hình ảnh. Từ những bức ảnh chiến trường của Matthew Brady trong Nội chiến Mỹ (1861) đến ảnh báo chí hiện đại — nhiếp ảnh tư liệu đặt nền tảng đạo đức lên trên thẩm mỹ.
        </p>

        <p>Các nguyên tắc cốt lõi:</p>
        <ul className="factor-list">
          <li>
            <strong>Tính xác thực (Authenticity)</strong> — Không dàn dựng, không chỉnh sửa làm sai lệch sự kiện. Nhiếp ảnh gia là người quan sát, không phải đạo diễn.
          </li>
          <li>
            <strong>Tính bối cảnh (Contextualization)</strong> — Một khoảnh khắc bị tách khỏi ngữ cảnh có thể bóp méo sự thật nguy hiểm hơn là không có ảnh.
          </li>
          <li>
            <strong>Tính trách nhiệm (Accountability)</strong> — Ảnh tư liệu mang trọng lượng pháp lý và lịch sử. Người chụp là nhân chứng có đạo đức.
          </li>
          <li>
            <strong>Tính liên tục (Continuity)</strong> — Một khoảnh khắc đơn lẻ hiếm khi kể đủ câu chuyện. Series ảnh có chiều sâu hơn đơn ảnh.
          </li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">
            <AlertTriangle size={13} className="inline mr-1" />
            Mâu thuẫn nội tại của Documentary
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Không có ảnh nào hoàn toàn khách quan — ngay cả trong nhiếp ảnh tư liệu. Quyết định đứng ở đâu, chụp khoảnh khắc nào, crop như thế nào đều là hành động chủ quan. Nhiếp ảnh gia tư liệu giỏi không phủ nhận sự chủ quan này — họ nhận thức nó và quản lý nó một cách có đạo đức.
          </p>
        </div>

        <hr className="doc-divider" />

        {/* 1.2 */}
        <h3 id="sec-1-2" className="scroll-mt-20">
          2. Truyền đạt (Communicative Intent) — Hình ảnh như ngôn ngữ thông tin
        </h3>

        <p>
          Khi mục đích là truyền đạt thông tin cụ thể, hình ảnh trở thành một hệ thống ký hiệu có cấu trúc. Hiệu quả được đo bằng mức độ thông điệp đến đúng người nhận — không bị hiểu sai, không bị bỏ qua.
        </p>

        <p>Ba điều kiện để truyền đạt hiệu quả:</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
          <div className="hotspot-card text-center">
            <div className="text-[#7c8aff] mb-2">
              <Eye size={22} className="mx-auto" />
            </div>
            <p className="text-sm font-semibold text-[#e4e4ed] mb-1">Clarity</p>
            <p className="text-xs text-[#9d9db5]">Sự rõ ràng thị giác — Chủ thể chính phải được nhận dạng ngay lập tức. Nếu người xem cần hơn 3 giây để hiểu hình ảnh đang nói về điều gì — hình ảnh đó thất bại.</p>
          </div>
          <div className="hotspot-card text-center">
            <div className="text-[#ffcb6b] mb-2">
              <Target size={22} className="mx-auto" />
            </div>
            <p className="text-sm font-semibold text-[#e4e4ed] mb-1">Relevance</p>
            <p className="text-xs text-[#9d9db5]">Tính liên quan với người nhận — Thông điệp thị giác không tồn tại trong chân không. Màu đỏ mang ý nghĩa khác trong văn hóa phương Tây và phương Đông.</p>
          </div>
          <div className="hotspot-card text-center">
            <div className="text-emerald-400 mb-2">
              <Brain size={22} className="mx-auto" />
            </div>
            <p className="text-sm font-semibold text-[#e4e4ed] mb-1">Memorability</p>
            <p className="text-xs text-[#9d9db5]">Khả năng ghi nhớ — Hình ảnh có tính ghi nhớ cao thường có: một yếu tố bất ngờ, một màu sắc/hình dạng đặc trưng, hoặc một cảm xúc đủ mạnh.</p>
          </div>
        </div>

        <p>Ứng dụng thực tiễn:</p>
        <ul className="factor-list">
          <li>
            <strong>Nhiếp ảnh thương mại:</strong> Sản phẩm phải là nhân vật chính.
          </li>
          <li>
            <strong>Editorial photography:</strong> Hình ảnh phải tóm gọn được nội dung bài viết dài.
          </li>
          <li>
            <strong>Infographic visual:</strong> Dữ liệu phức tạp được chuyển thành pattern thị giác.
          </li>
        </ul>

        <hr className="doc-divider" />

        {/* 1.3 */}
        <h3 id="sec-1-3" className="scroll-mt-20">
          3. Khơi gợi (Evocative Intent) — Hình ảnh như cảm xúc được vật chất hóa
        </h3>

        <p>
          Đây là lãnh địa của fine art photography, portrait nghệ thuật, và landscape photography đỉnh cao. Mục đích không phải là cho người xem biết điều gì — mà là khiến họ <strong>cảm thấy</strong> điều gì đó mà ngôn ngữ không diễn đạt được.
        </p>

        <div className="callout callout-key">
          <div className="callout-title">
            <Lightbulb size={13} className="inline mr-1" />
            Nghịch lý của Evocative Intent
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Bạn không thể kiểm soát hoàn toàn cảm xúc người xem cảm thấy — nhưng bạn có thể thiết kế một môi trường thị giác làm tăng xác suất họ cảm nhận theo một hướng nhất định. Đây là sự khác biệt giữa <strong>manipulation</strong> (thao túng) và <strong>invitation</strong> (mời gọi).
          </p>
        </div>

        <p>Bảng vector cảm xúc:</p>
        <div className="overflow-x-auto my-4 rounded-lg border border-[#1e1e2a]">
          <table className="doc-table">
            <thead>
              <tr>
                <th>Vector cảm xúc</th>
                <th>Ngôn ngữ thị giác</th>
                <th>Nhiếp ảnh gia tham khảo</th>
                <th>Kỹ thuật chủ đạo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Cô đơn / Xa cách</td>
                <td>Negative space lớn, figure nhỏ, tông lạnh</td>
                <td>Michael Kenna, Fan Ho</td>
                <td>Long exposure, sương mù, bình minh</td>
              </tr>
              <tr>
                <td>Ấm áp / Thuộc về</td>
                <td>Ánh vàng, khoảng cách gần, bokeh mềm</td>
                <td>Sally Mann, Henri Cartier-Bresson</td>
                <td>Natural light, 50-85mm, giờ vàng</td>
              </tr>
              <tr>
                <td>Hùng vĩ / Choáng ngợp</td>
                <td>Tỷ lệ người vs cảnh, đường chân trời thấp</td>
                <td>Ansel Adams, Peter Lik</td>
                <td>Wide angle, panorama, ND filter</td>
              </tr>
              <tr>
                <td>Bí ẩn / Căng thẳng</td>
                <td>Bóng tối, khuôn mặt không rõ, motion blur</td>
                <td>Saul Leiter, Daido Moriyama</td>
                <td>Grain cao, đen trắng cứng, tele dài</td>
              </tr>
              <tr>
                <td>Hoài niệm / Ký ức</td>
                <td>Tông faded, grain phim, ánh sáng rò</td>
                <td>Vivian Maier, William Eggleston</td>
                <td>Film simulation, light leak, vintage lens</td>
              </tr>
            </tbody>
          </table>
        </div>

        <hr className="doc-divider" />

        {/* 1.4 */}
        <h3 id="sec-1-4" className="scroll-mt-20">
          4. Thuyết phục (Persuasive Intent) — Hình ảnh như công cụ hành động
        </h3>

        <p>
          Ảnh thuyết phục không chỉ muốn người xem hiểu hay cảm nhận — nó muốn họ <strong>thay đổi hành vi</strong>: mua hàng, ủng hộ một quan điểm, tham gia một phong trào, hoặc thay đổi nhận thức về một vấn đề.
        </p>

        <p>Ba cơ chế thuyết phục:</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[#7c8aff]"><Sparkles size={16} /></span>
              <span className="text-sm font-semibold text-[#e4e4ed]">Social Proof</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Hình ảnh đám đông hạnh phúc sử dụng một sản phẩm tác động lên cơ chế &ldquo;bằng chứng xã hội&rdquo; của não bộ.
            </p>
          </div>
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[#ffcb6b]"><Heart size={16} /></span>
              <span className="text-sm font-semibold text-[#e4e4ed]">Emotional Transfer</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Đặt sản phẩm trong bối cảnh cảm xúc tích cực khiến não bộ &ldquo;chuyển&rdquo; cảm xúc đó sang sản phẩm.
            </p>
          </div>
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-emerald-400"><ShieldAlert size={16} /></span>
              <span className="text-sm font-semibold text-[#e4e4ed]">Authority Signaling</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Ánh sáng studio sạch, góc chụp chuyên nghiệp — tất cả đều gửi tín hiệu về sự chuyên nghiệp và đáng tin cậy.
            </p>
          </div>
        </div>

        <div className="callout callout-warning">
          <div className="callout-title">
            <AlertTriangle size={13} className="inline mr-1" />
            Ranh giới đạo đức
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Persuasive photography trở thành vấn đề khi nó khai thác cognitive bias của người xem để dẫn đến quyết định có hại cho họ, hoặc khi nó tạo ra hình ảnh sai lệch về thực tế (body image trong thời trang, lifestyle không thực tế trong mạng xã hội).
          </p>
        </div>

        <hr className="doc-divider" />

        {/* 1.5 */}
        <h3 id="sec-1-5" className="scroll-mt-20">
          5. Khám phá (Exploratory Intent) — Hình ảnh như quá trình tư duy
        </h3>

        <p>
          Đây là mục đích ít được nói đến nhất nhưng lại là nền tảng phát triển của mọi nhiếp ảnh gia nghiêm túc. Khi chụp ảnh như một hành động khám phá, bạn không biết mình đang tìm gì — và đó chính là điểm mấu chốt.
        </p>

        <p>Cách hoạt động:</p>
        <ul className="factor-list">
          <li>
            <strong>Personal project như phòng thí nghiệm:</strong> Thử nghiệm không có áp lực kết quả.
          </li>
          <li>
            <strong>Shooting without agenda:</strong> Ra đường mà không có concept định sẵn.
          </li>
          <li>
            <strong>Archive và phân tích:</strong> Nhìn lại một lượng lớn ảnh đã chụp để tìm pattern.
          </li>
          <li>
            <strong>Failure as data:</strong> Ảnh hỏng kỹ thuật nhưng thú vị thẩm mỹ là dữ liệu quý.
          </li>
        </ul>

        <p>
          Nhiều kỹ thuật nhiếp ảnh biểu tượng ngày nay xuất phát từ Exploratory Intent: double exposure, intentional camera movement (ICM), infrared photography — đều bắt đầu như những thử nghiệm không có mục đích rõ ràng.
        </p>

        {/* ============================================================ */}
        {/*  SECTION II                                                   */}
        {/* ============================================================ */}
        <h2 id="sec-2" className="scroll-mt-20">
          <span className="section-num">Ⅱ</span>
          Mục đích và mối quan hệ với kỹ thuật
        </h2>

        <hr className="doc-divider" />

        {/* 2.1 */}
        <h3 id="sec-2-1" className="scroll-mt-20">
          1. Kỹ thuật không có mục đích = Ngôn ngữ không có câu chuyện
        </h3>

        <div className="callout callout-key">
          <div className="callout-title">
            <Lightbulb size={13} className="inline mr-1" />
            Liên hệ ngôn ngữ
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Một người nói tiếng Anh hoàn hảo — ngữ pháp chính xác, từ vựng phong phú, phát âm chuẩn — nhưng không có gì để nói thực sự. Kỹ thuật nhiếp ảnh hoàn hảo mà không có mục đích cũng vậy.
          </p>
        </div>

        <p>Ba loại nhiếp ảnh gia:</p>
        <div className="comparison-grid my-4">
          <div className="comp-card">
            <span className="sub-label" style={{ color: '#22c55e', background: 'rgba(34,197,94,0.1)' }}>LOẠI 1 — IDEAL</span>
            <h4>Kỹ thuật phục vụ mục đích</h4>
            <p>
              Họ học kỹ thuật vì một mục đích cụ thể. Kỹ thuật là phương tiện, không phải đích đến.
            </p>
          </div>
          <div className="comp-card">
            <span className="sub-label" style={{ color: '#ffcb6b', background: 'rgba(255,203,107,0.1)' }}>LOẠI 2 — PHỔ BIẾN</span>
            <h4>Kỹ thuật như mục tiêu</h4>
            <p>
              Họ học kỹ thuật vì kỹ thuật. Ảnh của họ kỹ thuật tốt nhưng thiếu lý do tồn tại.
            </p>
          </div>
        </div>
        <div className="comp-card my-4">
          <span className="sub-label" style={{ color: '#fb7185', background: 'rgba(251,113,133,0.1)' }}>LOẠI 3 — GIAI ĐOẠN ĐẦU</span>
          <h4>Mục đích không có kỹ thuật</h4>
          <p>
            Họ có nhiều điều muốn nói nhưng không có công cụ để nói.
          </p>
        </div>

        <hr className="doc-divider" />

        {/* 2.2 */}
        <h3 id="sec-2-2" className="scroll-mt-20">
          2. Mục đích định nghĩa kỹ thuật — Bản đồ quyết định
        </h3>

        <div className="overflow-x-auto my-4 rounded-lg border border-[#1e1e2a]">
          <table className="doc-table">
            <thead>
              <tr>
                <th>Mục đích chủ đạo</th>
                <th>Aperture ưu tiên</th>
                <th>Shutter speed ưu tiên</th>
                <th>Ánh sáng ưu tiên</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Documentary</td>
                <td>f/8–f/11 (everything in focus)</td>
                <td>1/250s+ (freeze action)</td>
                <td>Natural, available light</td>
              </tr>
              <tr>
                <td>Communicative</td>
                <td>Tùy theo thông điệp</td>
                <td>Tùy theo chủ thể</td>
                <td>Kiểm soát, có kịch bản</td>
              </tr>
              <tr>
                <td>Evocative</td>
                <td>f/1.4–f/2.8 (isolation/mood)</td>
                <td>Tùy cảm xúc muốn tạo</td>
                <td>Golden hour, magic hour</td>
              </tr>
              <tr>
                <td>Persuasive</td>
                <td>f/2–f/4 (chủ thể nổi bật)</td>
                <td>Fast, crisp, professional</td>
                <td>Studio, flash, kiểm soát hoàn toàn</td>
              </tr>
              <tr>
                <td>Exploratory</td>
                <td>Thử nghiệm tất cả</td>
                <td>Thử nghiệm tất cả</td>
                <td>Thử nghiệm mọi điều kiện</td>
              </tr>
            </tbody>
          </table>
        </div>

        <hr className="doc-divider" />

        {/* 2.3 */}
        <h3 id="sec-2-3" className="scroll-mt-20">
          3. Xung đột mục đích — Khi một hình ảnh phục vụ nhiều chủ nhân
        </h3>

        <p>
          Thực tế nhiếp ảnh nghề nghiệp thường đặt ra tình huống một hình ảnh phải phục vụ nhiều mục đích cùng lúc — và chúng có thể mâu thuẫn nhau.
        </p>

        <div className="callout callout-photo">
          <div className="callout-title">
            <Camera size={13} className="inline mr-1" />
            Case Study: Eddie Adams, 1968
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Bức ảnh tướng Nguyễn Ngọc Loan xử bắn tù binh Việt Cộng giữa đường phố Sài Gòn. Bức ảnh giành Pulitzer, nhưng Adams suốt đời day dứt vì nó bóp méo bối cảnh và phá hủy danh dự một người. Ông nói: &ldquo;Ảnh nói lên sự thật, nhưng không phải toàn bộ sự thật.&rdquo;
          </p>
        </div>

        {/* ============================================================ */}
        {/*  SECTION III                                                  */}
        {/* ============================================================ */}
        <h2 id="sec-3" className="scroll-mt-20">
          <span className="section-num">Ⅲ</span>
          Mục đích và người nhận — Tam giác ảnh hưởng
        </h2>

        <hr className="doc-divider" />

        {/* 3.1 */}
        <h3 id="sec-3-1" className="scroll-mt-20">
          1. Photographer&apos;s Intent vs. Viewer&apos;s Reception
        </h3>

        <p>
          Không có hình ảnh nào được tiếp nhận chính xác như ý đồ của người tạo ra. Khoảng cách giữa intent và reception là không thể xóa bỏ — và đây không phải là thất bại. Đây là bản chất của nghệ thuật thị giác.
        </p>

        <p>Lý do khoảng cách không thể xóa bỏ:</p>
        <ul className="factor-list">
          <li>
            <strong>Kinh nghiệm cá nhân:</strong> Người xem mang vào hình ảnh toàn bộ ký ức, văn hóa, và trạng thái cảm xúc cá nhân.
          </li>
          <li>
            <strong>Năng lực đọc hình ảnh:</strong> Visual literacy không đồng đều.
          </li>
          <li>
            <strong>Ngữ cảnh trình bày:</strong> Gallery vs mạng xã hội tạo ra những cách đọc khác nhau.
          </li>
          <li>
            <strong>Khoảng cách thời gian:</strong> Ý nghĩa thay đổi theo thời gian.
          </li>
        </ul>

        <hr className="doc-divider" />

        {/* 3.2 */}
        <h3 id="sec-3-2" className="scroll-mt-20">
          2. Xác định người nhận mục tiêu (Target Viewer)
        </h3>

        <p>Framework với 3 chiều:</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <Eye size={16} className="text-[#7c8aff]" />
              <span className="text-sm font-semibold text-[#e4e4ed]">Chiều 1 — Năng lực thị giác</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Đại chúng / Có kiến thức / Chuyên môn
            </p>
          </div>
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <Brain size={16} className="text-[#ffcb6b]" />
              <span className="text-sm font-semibold text-[#e4e4ed]">Chiều 2 — Nhu cầu cảm xúc</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Giải trí, học hỏi, kết nối, khám phá, xác nhận
            </p>
          </div>
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <Compass size={16} className="text-emerald-400" />
              <span className="text-sm font-semibold text-[#e4e4ed]">Chiều 3 — Bối cảnh tiếp nhận</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Mobile scroll (0.5s impact) / Print Gallery / Editorial / Portfolio
            </p>
          </div>
        </div>

        <hr className="doc-divider" />

        {/* 3.3 */}
        <h3 id="sec-3-3" className="scroll-mt-20">
          3. Vòng phản hồi mục đích (Intent Feedback Loop)
        </h3>

        <p>
          Khi hình ảnh đã được tạo và tiếp nhận, phản hồi của người xem cung cấp thông tin quan trọng để tinh chỉnh mục đích:
        </p>
        <ul className="factor-list">
          <li>
            <strong>Phản ứng &ldquo;wow&rdquo; nhưng không hành động:</strong> Cần thêm call-to-action.
          </li>
          <li>
            <strong>Người xem hiểu sai thông điệp:</strong> Vấn đề nằm ở clarity.
          </li>
          <li>
            <strong>Phản ứng tích cực nhưng nhàm:</strong> Cần thêm unexpected element.
          </li>
          <li>
            <strong>Không có phản ứng:</strong> Hình ảnh không tạo được điểm tiếp xúc cảm xúc.
          </li>
        </ul>

        {/* ============================================================ */}
        {/*  SECTION IV                                                   */}
        {/* ============================================================ */}
        <h2 id="sec-4" className="scroll-mt-20">
          <span className="section-num">Ⅳ</span>
          Mục đích trong quá trình sáng tác
        </h2>

        <hr className="doc-divider" />

        {/* 4.1 */}
        <h3 id="sec-4-1" className="scroll-mt-20">
          1. Pre-visualization
        </h3>

        <p>Quy trình 5 bước:</p>
        <div className="space-y-2 my-4">
          <div className="flex gap-3 items-start p-3 rounded-lg bg-[#111118] border border-[#1e1e2a]">
            <span className="section-num text-xs" style={{ width: 24, height: 24, fontSize: '0.7rem' }}>1</span>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Xác định cảm xúc/thông điệp đích
            </p>
          </div>
          <div className="flex gap-3 items-start p-3 rounded-lg bg-[#111118] border border-[#1e1e2a]">
            <span className="section-num text-xs" style={{ width: 24, height: 24, fontSize: '0.7rem' }}>2</span>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Xác định ngôn ngữ thị giác phù hợp
            </p>
          </div>
          <div className="flex gap-3 items-start p-3 rounded-lg bg-[#111118] border border-[#1e1e2a]">
            <span className="section-num text-xs" style={{ width: 24, height: 24, fontSize: '0.7rem' }}>3</span>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Phân tích điều kiện thực tế
            </p>
          </div>
          <div className="flex gap-3 items-start p-3 rounded-lg bg-[#111118] border border-[#1e1e2a]">
            <span className="section-num text-xs" style={{ width: 24, height: 24, fontSize: '0.7rem' }}>4</span>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Lựa chọn kỹ thuật
            </p>
          </div>
          <div className="flex gap-3 items-start p-3 rounded-lg bg-[#111118] border border-[#1e1e2a]">
            <span className="section-num text-xs" style={{ width: 24, height: 24, fontSize: '0.7rem' }}>5</span>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Hậu kỳ có chủ đích
            </p>
          </div>
        </div>

        <div className="callout callout-key">
          <div className="callout-title">
            <Lightbulb size={13} className="inline mr-1" />
            Thực hành
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Trước mỗi buổi chụp, viết ra một câu hoàn chỉnh: &ldquo;Tôi muốn tạo ra hình ảnh khiến [người xem cụ thể] cảm thấy [cảm xúc cụ thể] thông qua [ngôn ngữ thị giác cụ thể].&rdquo; Câu này là bộ lọc cho mọi quyết định kỹ thuật.
          </p>
        </div>

        <hr className="doc-divider" />

        {/* 4.2 */}
        <h3 id="sec-4-2" className="scroll-mt-20">
          2. Nhất quán trong portfolio
        </h3>

        <p>
          Có hai loại nhất quán mà nhiếp ảnh gia cần phân biệt:
        </p>
        <div className="comparison-grid my-4">
          <div className="comp-card">
            <span className="sub-label">STYLISTIC CONSISTENCY</span>
            <h4>Nhất quán phong cách</h4>
            <p>
              Cùng một cách xử lý màu, cùng một loại ánh sáng, cùng một góc nhìn. Dễ nhận diện nhưng có thể hạn chế sự phát triển.
            </p>
          </div>
          <div className="comp-card" style={{ borderColor: '#fb718533' }}>
            <span className="sub-label" style={{ color: '#fb7185', background: 'rgba(251,113,133,0.1)' }}>
              INTENT CONSISTENCY
            </span>
            <h4>Nhất quán mục đích</h4>
            <p>
              Saul Leiter chụp trên nhiều định dạng khác nhau, qua nhiều thập kỷ — nhưng luôn có một câu hỏi xuyên suốt về vẻ đẹp ẩn sau bề mặt cuộc sống đô thị. Đây là nhất quán sâu hơn và bền vững hơn.
            </p>
          </div>
        </div>

        <hr className="doc-divider" />

        {/* 4.3 */}
        <h3 id="sec-4-3" className="scroll-mt-20">
          3. Khi mục đích thay đổi trong quá trình chụp
        </h3>

        <div className="quote-block">
          <p>
            Henri Cartier-Bresson: Ông đến để chụp một buổi lễ — nhưng nhận ra rằng khoảnh khắc thực sự đang xảy ra ở một góc khác. Sự linh hoạt của ông không phải là thiếu mục đích — đó là mục đích ở cấp độ cao hơn.
          </p>
        </div>

        <p>
          Mục đích có thể thay đổi trong quá trình chụp — và đó không phải là thiếu kỷ luật. Nó là dấu hiệu của một nhiếp ảnh gia có khả năng đọc tình huống và điều chỉnh mục đích theo cấp độ cao hơn.
        </p>

        <hr className="doc-divider" />

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
              Mục đích không phải là thứ thêm vào sau kỹ thuật — nó là nền tảng định nghĩa mọi quyết định kỹ thuật.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">02</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Có 5 tầng mục đích hình ảnh: Documentary, Communicative, Evocative, Persuasive, Exploratory.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">03</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Kỹ thuật không có mục đích là ngôn ngữ không có câu chuyện.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">04</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Khoảng cách giữa ý đồ và cảm nhận là không thể xóa bỏ.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">05</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Xác định người nhận mục tiêu không giới hạn sức mạnh — nó tập trung sức mạnh đó.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">06</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Pre-visualization là kỹ năng trung tâm.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">07</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Visual voice đến từ nhất quán mục đích qua nhiều năm.
            </p>
          </div>
        </div>

        {/* Intent Classification Table */}
        <div className="overflow-x-auto my-4 rounded-lg border border-[#1e1e2a]">
          <table className="doc-table">
            <thead>
              <tr>
                <th>Tầng mục đích</th>
                <th>Câu hỏi định nghĩa</th>
                <th>Ví dụ điển hình</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Ghi lại (Document)</td>
                <td>Điều gì đã xảy ra?</td>
                <td>Báo chí, ảnh tư liệu, ảnh gia đình</td>
              </tr>
              <tr>
                <td>Truyền đạt (Communicate)</td>
                <td>Tôi muốn người xem hiểu điều gì?</td>
                <td>Quảng cáo, editorial, infographic</td>
              </tr>
              <tr>
                <td>Khơi gợi (Evoke)</td>
                <td>Tôi muốn người xem cảm thấy điều gì?</td>
                <td>Fine art, portrait, landscape</td>
              </tr>
              <tr>
                <td>Thuyết phục (Persuade)</td>
                <td>Tôi muốn người xem làm điều gì?</td>
                <td>Ảnh chiến dịch, advocacy, thương mại</td>
              </tr>
              <tr>
                <td>Khám phá (Explore)</td>
                <td>Tôi đang tìm kiếm điều gì?</td>
                <td>Thực nghiệm, personal project</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ============================================================ */}
        {/*  TINH HOA CHUYÊN GIA                                         */}
        {/* ============================================================ */}
        <div className="elite-master-section">
          <div className="callout callout-master">
            <div className="callout-title">✦ Tinh hoa 20 năm</div>
            <p style={{ marginBottom: 0, lineHeight: 1.75 }}>
              Câu hỏi không phải "ảnh này đẹp không?" mà là <strong>"ảnh này muốn nói gì và liệu nó có nói được không?"</strong> Mục đích rõ ràng là thứ duy nhất cho phép bạn biết khi nào một tấm ảnh là "đủ tốt" — không cần ai khác phán xét. Trước mỗi buổi chụp, hãy viết một câu hoàn chỉnh về mục đích. Nó sẽ là kim chỉ nam mỗi khi bạn phân vân trước máy.
            </p>
          </div>
          <div className="callout callout-pitfall">
            <div className="callout-title">⚠ Bẫy chuyên gia</div>
            <p style={{ marginBottom: 0, lineHeight: 1.75 }}>
              Chụp với mindset "sẽ xử lý sau" là cái bẫy chết người. Cảm xúc và ý định <strong>không thể thêm vào trong hậu kỳ</strong>. Những thứ thiếu khi bấm máy sẽ mãi thiếu — Lightroom không có slider nào cho "ý nghĩa" hay "kết nối cảm xúc". Hậu kỳ chỉ có thể nâng cao những gì đã có sẵn trong ảnh gốc.
            </p>
          </div>
          <div className="practice-exercise">
            <div className="practice-header">⬥ Bài tập thực chiến — Mục đích trước khi ra khỏi nhà</div>
            <div className="practice-body">
              <p>Thực hành "Intent Statement" — tuyên bố ý định — trong 30 ngày liên tiếp:</p>
              <ol className="practice-steps">
                <li><strong>Trước khi ra khỏi nhà:</strong> Viết một câu: "Tôi muốn tấm ảnh này khiến người xem cảm thấy _____ bởi vì _____."</li>
                <li><strong>Trong lúc chụp:</strong> Mỗi khi phân vân, đọc lại câu đó. Nếu cảnh trước mắt không phục vụ câu đó, bỏ qua.</li>
                <li><strong>Sau khi về:</strong> So sánh ảnh với intent statement. Chênh lệch giữa ý định và kết quả chính là bài học quan trọng nhất.</li>
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
          <Link href="/" className="group nav-card">
            <div className="nav-card-label">← Bài trước</div>
            <div className="nav-card-title">1. Sức mạnh của hình ảnh</div>
            <div className="nav-card-desc">Nền tảng hình ảnh</div>
          </Link>
          <Link href="/bieu-tuong" className="group nav-card text-right">
            <div className="nav-card-label">Bài tiếp →</div>
            <div className="nav-card-title">3. Biểu tượng văn hóa</div>
            <div className="nav-card-desc">Nền tảng hình ảnh</div>
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

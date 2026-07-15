

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
  Grid3X3,
  Sparkles,
  Layers,
  Target,
  Eye,
  Aperture,
  RotateCcw,
  BookOpen,
  Check,
  Move,
  Frame,
  Triangle,
} from 'lucide-react';
import DocsLayout from '@/components/docs-layout';

/* ------------------------------------------------------------------ */
/*  TOC Data                                                          */
/* ------------------------------------------------------------------ */
const tocSections = [
  { id: 'sec-1', label: 'Ⅰ. Bố cục là gì', level: 1 },
  { id: 'sec-1-1', label: '1. Sắp xếp như ngôn ngữ thị giác', level: 2 },
  { id: 'sec-1-2', label: '2. Tại sao bố cục quan trọng', level: 2 },
  { id: 'sec-1-3', label: '3. Bố cục và hỗn loạn', level: 2 },
  { id: 'sec-2', label: 'Ⅱ. Quy tắc bố cục', level: 1 },
  { id: 'sec-2-1', label: '1. Quy tắc 1/3 (Rule of Thirds)', level: 2 },
  { id: 'sec-2-2', label: '2. Tỷ lệ vàng (Golden Ratio)', level: 2 },
  { id: 'sec-2-3', label: '3. Đường xoắn ốc vàng (Golden Spiral)', level: 2 },
  { id: 'sec-2-4', label: '4. Bố cục trung tâm', level: 2 },
  { id: 'sec-2-5', label: '5. Đối xứng (Symmetry)', level: 2 },
  { id: 'sec-2-6', label: '6. Khung trong khung (Frame within Frame)', level: 2 },
  { id: 'sec-2-7', label: '7. Đường dẫn (Leading Lines)', level: 2 },
  { id: 'sec-3', label: 'Ⅲ. Phá vỡ quy tắc', level: 1 },
  { id: 'sec-3-1', label: '1. Khi nào nên phá vỡ', level: 2 },
  { id: 'sec-3-2', label: '2. Mất cân bằng có chủ đích', level: 2 },
  { id: 'sec-3-3', label: '3. Dutch Angle và căng thẳng', level: 2 },
  { id: 'sec-3-4', label: '4. Trung tâm hóa cho quyền lực', level: 2 },
  { id: 'sec-3-5', label: '5. Lệch tâm cho nghịch lý', level: 2 },
  { id: 'sec-4', label: 'Ⅳ. Bố cục nâng cao', level: 1 },
  { id: 'sec-4-1', label: '1. Bố cục phân tầng (Layered)', level: 2 },
  { id: 'sec-4-2', label: '2. Bố cục chữ J và chữ L', level: 2 },
  { id: 'sec-4-3', label: '3. Bố cục đường chéo', level: 2 },
  { id: 'sec-4-4', label: '4. Bố cục tròn tâm (Radial)', level: 2 },
  { id: 'sec-4-5', label: '5. Bố cục không gian âm (Negative Space)', level: 2 },
  { id: 'summary', label: 'Tóm tắt 8 điểm chính', level: 1 },
];

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */
export default function BoCucPage() {
  const [isRead, setIsRead] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('alpha-doc-read');
      if (saved) {
        const readPages: string[] = JSON.parse(saved);
        if (readPages.includes('/bo-cuc')) setIsRead(true);
      }
    } catch {}
  }, []);

  const toggleRead = () => {
    try {
      const saved = localStorage.getItem('alpha-doc-read');
      const readPages: string[] = saved ? JSON.parse(saved) : [];
      if (isRead) {
        const updated = readPages.filter((p) => p !== '/bo-cuc');
        localStorage.setItem('alpha-doc-read', JSON.stringify(updated));
        setIsRead(false);
      } else {
        const updated = [...readPages, '/bo-cuc'];
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
          <a href="#">Bố cục & Góc nhìn</a>
          <ChevronRight size={12} />
          <span className="text-[#9d9db5]">Bố cục</span>
        </div>

        {/* Badges */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold font-mono px-2 py-0.5 rounded bg-[rgba(124,138,255,0.1)] text-[#7c8aff]">
            HA13
          </span>
          <span className="text-[11px] text-[#6b6b80]">20 phút đọc · #BoCuc #Composition #NguonLucThiGiac</span>
          <span className="elite-badge">
            <GraduationCap size={11} />
            Nâng cao
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-[#e4e4ed] leading-tight mb-3 border-none pb-0">
          Bố cục
        </h1>

        {/* Subtitle */}
        <p className="text-base text-[#9d9db5] leading-relaxed mb-6" style={{ marginTop: 0 }}>
          Bố cục & Góc nhìn · Bài 13 — Nghệ thuật sắp xếp yếu tố thị giác thành một câu chuyện có cấu trúc
        </p>

        {/* Hero image */}
        <div className="color-overview-hero rounded-xl overflow-hidden border border-[#1e1e2a] mb-8">
          <img
            src="/hero-bo-cuc.webp"
            alt="Infographic tổng quan về bố cục trong nhiếp ảnh: rule of thirds, golden ratio, leading lines, negative space và nguyên tắc cốt lõi"
            className="w-full h-auto object-contain"
            loading="eager"
          />
        </div>

        {/* Video bài học */}
        <LessonVideoPlayer video={lessonVideos['/bo-cuc']} />

        {/* Opening Quote */}
        <div className="quote-block">
          <p>
            &ldquo;Bố cục là thứ duy nhất phân biệt một bức ảnh với một khoảnh khắc ngẫu nhiên. Không có bố cục, nhiếp ảnh chỉ là sự ghi lại. Có bố cục, nhiếp ảnh trở thành ngôn ngữ.&rdquo;
          </p>
        </div>

        {/* ============================================================ */}
        {/*  SECTION I                                                    */}
        {/* ============================================================ */}
        <h2 id="sec-1" className="scroll-mt-20">
          <span className="section-num">Ⅰ</span>
          Bố cục là gì
        </h2>

        <p className="drop-cap">
          Bố cục (composition) là hành động sắp xếp các yếu tố thị giác bên trong khung hình theo một trật tự có chủ đích. Nó là quá trình quyết định điều gì xuất hiện trong ảnh, ở đâu, lớn hay nhỏ, và tương quan với các yếu tố khác ra sao. Bố cục không đơn thuần là &ldquo;đặt chủ thể vào đúng vị trí&rdquo; — nó là cách bạn kể câu chuyện bằng ngôn ngữ không gian.
        </p>

        <hr className="doc-divider" />

        {/* 1.1 */}
        <h3 id="sec-1-1" className="scroll-mt-20">
          1. Sắp xếp như ngôn ngữ thị giác
        </h3>

        <p>
          Hãy nghĩ về bố cục như ngữ pháp của một câu nói. Một câu không có cấu trúc — dù có những từ đẹp — vẫn vô nghĩa. Tương tự, một bức ảnh có ánh sáng đẹp, chủ thể hay, nhưng không có bố cục thì chỉ là tập hợp các yếu tố rời rạc, không truyền tải được thông điệp.
        </p>

        <p>Bố cục thực hiện ba chức năng cốt lõi:</p>
        <ul className="factor-list">
          <li>
            <strong>Hướng dẫn mắt (Visual Flow):</strong> Cho người xem biết nên nhìn đâu trước, đâu sau, và khi nào dừng lại.
          </li>
          <li>
            <strong>Tạo cấu trúc (Structure):</strong> Biến hỗn loạn thành trật tự — hoặc biến trật tự thành căng thẳng có chủ đích.
          </li>
          <li>
            <strong>Truyền tải ý nghĩa (Meaning):</strong> Vị trí, tỷ lệ, và mối quan hệ giữa các yếu tố đều mang ý nghĩa. Một người nhỏ bé trước tòa nhà cao lớn kể câu chuyện về sự bé nhỏ — mà không cần một lời nào.
          </li>
        </ul>

        <hr className="doc-divider" />

        {/* 1.2 */}
        <h3 id="sec-1-2" className="scroll-mt-20">
          2. Tại sao bố cục quan trọng
        </h3>

        <div className="callout callout-key">
          <div className="callout-title">
            <Lightbulb size={13} className="inline mr-1" />
            Sự khác biệt quyết định
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Hai nhiếp ảnh gia đứng cạnh nhau, chụp cùng một chủ thể, cùng một ánh sáng, cùng một thời điểm — nhưng hai bức ảnh hoàn toàn khác nhau. Điểm khác biệt duy nhất: bố cục. Quyết định đặt chủ thể ở đâu, bao gồm gì, loại bỏ gì — đó là dấu ấn cá nhân đích thực nhất của nhiếp ảnh gia.
          </p>
        </div>

        <p>Năm lý do bố cục là kỹ năng then chốt:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <Eye size={16} className="text-[#7c8aff]" />
              <span className="text-sm font-semibold text-[#e4e4ed]">Kiểm soát trải nghiệm xem</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Bố cục quyết định con đường mắt người xem di chuyển qua bức ảnh — và đó chính là trải nghiệm mà bạn thiết kế.
            </p>
          </div>
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <Target size={16} className="text-[#ffcb6b]" />
              <span className="text-sm font-semibold text-[#e4e4ed]">Nhấn mạnh thông điệp</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Cùng một chủ thể nhưng đặt ở vị trí khác sẽ tạo ra câu chuyện khác. Bố cục là công cụ nhấn mạnh mạnh mẽ nhất.
            </p>
          </div>
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <Layers size={16} className="text-emerald-400" />
              <span className="text-sm font-semibold text-[#e4e4ed]">Tạo chiều sâu 2D</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Bố cục phân tầng tạo ra ảo giác chiều sâu trên mặt phẳng 2D — biến hình ảnh phẳng thành không gian sống động.
            </p>
          </div>
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={16} className="text-[#a855f7]" />
              <span className="text-sm font-semibold text-[#e4e4ed]">Dấu ấn phong cách</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Cách bạn sắp xếp yếu tố trong khung hình chính là chữ ký thị giác của bạn — phân biệt bạn với hàng triệu người chụp khác.
            </p>
          </div>
        </div>

        <hr className="doc-divider" />

        {/* 1.3 */}
        <h3 id="sec-1-3" className="scroll-mt-20">
          3. Bố cục và hỗn loạn — Hai mặt của một đồng xu
        </h3>

        <p>
          Bố cục không phải lúc nào cũng đồng nghĩa với trật tự. Có những tình huống mà sự hỗn loạn (chaos) chính là câu chuyện — và nhiệm vụ của nhiếp ảnh gia là tổ chức hỗn loạn đó thành một trật tự ẩn. Bức ảnh chợ truyền thống đông đúc có thể vừa hỗn loạn vừa có bố cục — nếu nhiếp ảnh gia tìm được cấu trúc bên trong mớ bòng bong.
        </p>

        <div className="comparison-grid my-4">
          <div className="comp-card">
            <span className="sub-label">BỐ CỤC CÓ TRẬT TỰ</span>
            <h4>Khi sự rõ ràng là mục tiêu</h4>
            <p>
              Kiến trúc, sản phẩm, chân dung studio — khi thông điệp cần rõ ràng và trực tiếp, bố cục có trật tự giúp người xem tiếp nhận ngay lập tức.
            </p>
          </div>
          <div className="comp-card" style={{ borderColor: '#fb718533' }}>
            <span className="sub-label" style={{ color: '#fb7185', background: 'rgba(251,113,133,0.1)' }}>BỐ CỤC HỖN LOẠN</span>
            <h4>Khi sự căng thẳng là câu chuyện</h4>
            <p>
              Street photography, phóng sự chiến tranh, biểu tình — khi bản thân sự hỗn loạn là thông điệp, bố cục &ldquo;hỗn loạn có kiểm soát&rdquo; tạo ra trải nghiệm chân thực hơn bất kỳ sự sắp xếp ngăn nắp nào.
            </p>
          </div>
        </div>

        {/* ============================================================ */}
        {/*  SECTION II                                                   */}
        {/* ============================================================ */}
        <h2 id="sec-2" className="scroll-mt-20">
          <span className="section-num">Ⅱ</span>
          Quy tắc bố cục
        </h2>

        <p>
          Các quy tắc bố cục không phải là luật — chúng là những pattern đã được chứng minh qua hàng thế kỷ nghệ thuật thị giác. Hiểu chúng trước khi phá vỡ chúng.
        </p>

        <hr className="doc-divider" />

        {/* 2.1 */}
        <h3 id="sec-2-1" className="scroll-mt-20">
          1. Quy tắc 1/3 (Rule of Thirds)
        </h3>

        <p>
          Quy tắc phổ biến nhất và dễ áp dụng nhất. Khung hình được chia thành 9 phần bằng nhau bằng 2 đường ngang và 2 đường dọc. Các điểm giao nhau — gọi là <span className="key-concept">điểm mạnh</span> (power points) — là vị trí đặt chủ thể tạo cảm giác tự nhiên và cân bằng nhất.
        </p>

        <div className="hotspot-card my-4">
          <div className="flex items-center gap-2 mb-2">
            <Grid3X3 size={16} className="text-[#7c8aff]" />
            <span className="text-sm font-semibold text-[#e4e4ed]">Cách áp dụng Rule of Thirds</span>
          </div>
          <p className="text-xs text-[#9d9db5] leading-relaxed">
            Đặt chủ thể chính tại một trong 4 điểm mạnh. Đường chân trời nên nằm trên một trong hai đường ngang. Đường dẫn (đường sông, con đường, hàng cây) nên đi dọc theo một trong hai đường dọc. Không bao giờ đặt chủ thể ngay giữa — trừ khi bạn có lý do cụ thể.
          </p>
        </div>

        <div className="callout callout-key">
          <div className="callout-title">
            <Lightbulb size={13} className="inline mr-1" />
            Tại sao Rule of Thirds hoạt động
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Mắt người không tự nhiên dừng lại ở trung tâm. Khi chủ thể nằm ngoài trung tâm, mắt phải di chuyển để tìm nó — và chính hành trình mắt di chuyển đó tạo ra sự tương tác với hình ảnh. Sự không hoàn hảo nhẹ này khiến hình ảnh &ldquo;sống&rdquo; hơn.
          </p>
        </div>

        <hr className="doc-divider" />

        {/* 2.2 */}
        <h3 id="sec-2-2" className="scroll-mt-20">
          2. Tỷ lệ vàng (Golden Ratio)
        </h3>

        <p>
          Tỷ lệ vàng (<span className="key-concept">φ = 1.618</span>) là tỷ lệ toán học xuất hiện trong tự nhiên, nghệ thuật, và kiến trúc suốt hàng ngàn năm. Khi áp dụng vào bố cục, khung hình được chia theo tỷ lệ vàng thay vì chia đều như Rule of Thirds — tạo ra sự phân chia tinh tế và tự nhiên hơn.
        </p>

        <p>So sánh hai tỷ lệ:</p>
        <div className="overflow-x-auto my-4 rounded-lg border border-[#1e1e2a]">
          <table className="doc-table">
            <thead>
              <tr>
                <th>Đặc điểm</th>
                <th>Rule of Thirds</th>
                <th>Golden Ratio</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Tỷ lệ chia</td>
                <td>1:1:1 (chia đều)</td>
                <td>1:1.618:1 (tỷ lệ vàng)</td>
              </tr>
              <tr>
                <td>Vị trí điểm mạnh</td>
                <td>Gần trung tâm hơn</td>
                <td>Xa trung tâm hơn một chút</td>
              </tr>
              <tr>
                <td>Cảm giác</td>
                <td>Cân bằng, dễ tiếp nhận</td>
                <td>Tự nhiên, tinh tế, thanh lịch</td>
              </tr>
              <tr>
                <td>Phù hợp</td>
                <td>Hầu hết mọi tình huống</td>
                <td>Khi cần sự thanh lịch cao</td>
              </tr>
              <tr>
                <td>Độ khó</td>
                <td>Dễ áp dụng</td>
                <td>Cần luyện tập nhiều hơn</td>
              </tr>
            </tbody>
          </table>
        </div>

        <hr className="doc-divider" />

        {/* 2.3 */}
        <h3 id="sec-2-3" className="scroll-mt-20">
          3. Đường xoắn ốc vàng (Golden Spiral)
        </h3>

        <p>
          Phiên bản tinh xảo nhất của tỷ lệ vàng. Xoắn ốc vàng (Fibonacci Spiral) dẫn mắt người xem theo một đường cong tự nhiên — từ ngoài vào trong, dừng lại tại tâm điểm của xoắn ốc. Đây là bố cục mà tự nhiên sử dụng: vỏ ốc, hoa hướng dương, dải Ngân Hà.
        </p>

        <div className="hotspot-card my-4">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={16} className="text-[#ffcb6b]" />
            <span className="text-sm font-semibold text-[#e4e4ed]">Khi nào dùng Golden Spiral</span>
          </div>
          <p className="text-xs text-[#9d9db5] leading-relaxed">
            Khi hình ảnh có dòng chảy tự nhiên — một con sông uốn lượn, một đường bờ biển cong, một cánh tay đưa theo hướng cong. Đặt chủ thể chính tại tâm xoắn ốc và để các yếu tố khác nằm dọc theo đường cong của xoắn ốc.
          </p>
        </div>

        <hr className="doc-divider" />

        {/* 2.4 */}
        <h3 id="sec-2-4" className="scroll-mt-20">
          4. Bố cục trung tâm (Center Composition)
        </h3>

        <p>
          Đặt chủ thể ngay giữa khung hình — quy tắc này thường bị chỉ trích là &ldquo;nhàm chán&rdquo; nhưng thực tế nó là một trong những bố cục mạnh mẽ nhất khi được sử dụng đúng lúc. Bố cục trung tâm tuyên bố: &ldquo;Nhìn vào đây. Chỉ vào đây. Không cần giải thích thêm.&rdquo;
        </p>

        <p>Khi nào nên dùng bố cục trung tâm:</p>
        <ul className="factor-list">
          <li>
            <strong>Chủ thể đối xứng tự nhiên:</strong> Kiến trúc, hoa, khuôn mặt — những thứ có trục đối xứng tự nhiên.
          </li>
          <li>
            <strong>Tuyên bố quyền lực:</strong> Khi bạn muốn chủ thể thống trị hoàn toàn khung hình không chia sẻ.
          </li>
          <li>
            <strong>Chân dung trực diện:</strong> Khuôn mặt nhìn thẳng vào ống kính — tạo kết nối mạnh mẽ với người xem.
          </li>
          <li>
            <strong>Kết hợp với đối xứng:</strong> Khi bối cảnh xung quanh cũng đối xứng, trung tâm hóa tạo ra hình ảnh gần như thiền định.
          </li>
        </ul>

        <hr className="doc-divider" />

        {/* 2.5 */}
        <h3 id="sec-2-5" className="scroll-mt-20">
          5. Đối xứng (Symmetry)
        </h3>

        <p>
          Đối xứng tạo ra cảm giác hoàn hảo, trật tự, và bình yên. Nó rất phổ biến trong kiến trúc, nội thất, và phong cảnh phản chiếu. Nhưng đối xứng hoàn toàn cũng có thể tạo ra cảm giác tĩnh — thiếu động lực — và đó vừa là điểm mạnh vừa là điểm yếu tùy ngữ cảnh.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
          <div className="hotspot-card text-center">
            <div className="text-[#7c8aff] mb-2">
              <Frame size={22} className="mx-auto" />
            </div>
            <p className="text-sm font-semibold text-[#e4e4ed] mb-1">Đối xứng phản chiếu</p>
            <p className="text-xs text-[#9d9db5]">Nước phản chiếu, gương — đường phân chia nằm giữa, tạo hiệu ứng nhân đôi thị giác mạnh mẽ.</p>
          </div>
          <div className="hotspot-card text-center">
            <div className="text-[#ffcb6b] mb-2">
              <Move size={22} className="mx-auto" />
            </div>
            <p className="text-sm font-semibold text-[#e4e4ed] mb-1">Đối xứng tịnh tiến</p>
            <p className="text-xs text-[#9d9db5]">Lặp lại pattern — hàng cây, cột kiến trúc — tạo nhịp điệu thị giác.</p>
          </div>
          <div className="hotspot-card text-center">
            <div className="text-emerald-400 mb-2">
              <RotateCcw size={22} className="mx-auto" />
            </div>
            <p className="text-sm font-semibold text-[#e4e4ed] mb-1">Đối xứng quay</p>
            <p className="text-xs text-[#9d9db5]">Pattern hoa, bánh xe, đền thờ — quay quanh một tâm điểm.</p>
          </div>
        </div>

        <hr className="doc-divider" />

        {/* 2.6 */}
        <h3 id="sec-2-6" className="scroll-mt-20">
          6. Khung trong khung (Frame within Frame)
        </h3>

        <p>
          Sử dụng một yếu tố foreground — cửa sổ, cửa vòm, cành cây, bóng đổ — để tạo ra một khung hình thứ hai bên trong khung hình chính. Kỹ thuật này tạo chiều sâu ngay lập tức, thu hút mắt vào chủ thể, và thêm một tầng ngữ nghĩa cho hình ảnh.
        </p>

        <div className="hotspot-card my-4">
          <div className="flex items-center gap-2 mb-2">
            <Layers size={16} className="text-emerald-400" />
            <span className="text-sm font-semibold text-[#e4e4ed]">Yếu tố khung phổ biến</span>
          </div>
          <p className="text-xs text-[#9d9db5] leading-relaxed">
            Cửa vòm kiến trúc (tạo cảm giác thiêng liêng), cửa sổ (tạo cảm giác quan sát bí mật), cành cây (tạo cảm giác tự nhiên), bóng đổ (tạo cảm giác kịch tính), hành lang (tạo chiều sâu tuyến tính). Mỗi loại khung mang một ý nghĩa cảm xúc khác nhau.
          </p>
        </div>

        <hr className="doc-divider" />

        {/* 2.7 */}
        <h3 id="sec-2-7" className="scroll-mt-20">
          7. Đường dẫn (Leading Lines Composition)
        </h3>

        <p>
          Đường dẫn là bất kỳ đường nào trong hình ảnh dẫn mắt người xem từ điểm này sang điểm khác — thường là từ foreground vào chủ thể chính. Đây là công cụ bố cục mạnh mẽ nhất để tạo chiều sâu và hướng sự chú ý.
        </p>

        <div className="overflow-x-auto my-4 rounded-lg border border-[#1e1e2a]">
          <table className="doc-table">
            <thead>
              <tr>
                <th>Loại đường dẫn</th>
                <th>Hiệu ứng cảm xúc</th>
                <th>Ví dụ điển hình</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Đường hội tụ</td>
                <td>Sức hút mạnh, tập trung tuyệt đối</td>
                <td>Đường ray tàu, hành lang, cầu thang</td>
              </tr>
              <tr>
                <td>Đường cong S</td>
                <td>Nhẹ nhàng, thanh lịch, quyến rũ</td>
                <td>Con đường quanh co, dòng sông, bờ biển</td>
              </tr>
              <tr>
                <td>Đường chéo</td>
                <td>Năng động, căng thẳng, chuyển động</td>
                <td>Cầu thang chéo, ánh sáng chéo, bóng đổ</td>
              </tr>
              <tr>
                <td>Đường ngang</td>
                <td>Bình yên, ổn định, tĩnh lặng</td>
                <td>Đường chân trời, mặt nước phẳng</td>
              </tr>
              <tr>
                <td>Đường dọc</td>
                <td>Quyền lực, phát triển, kiêu hãnh</td>
                <td>Cột kiến trúc, thân cây, tòa nhà cao tầng</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ============================================================ */}
        {/*  SECTION III                                                  */}
        {/* ============================================================ */}
        <h2 id="sec-3" className="scroll-mt-20">
          <span className="section-num">Ⅲ</span>
          Phá vỡ quy tắc
        </h2>

        <p>
          Picasso từng nói: &ldquo;Học quy tắc như một chuyên gia, để phá vỡ chúng như một nghệ sĩ.&rdquo; Phá vỡ quy tắc không phải là thiếu kỷ luật — nó là sự hiểu biết sâu sắc đủ để biết khi nào quy tắc không phục vụ mục đích của bạn.
        </p>

        <hr className="doc-divider" />

        {/* 3.1 */}
        <h3 id="sec-3-1" className="scroll-mt-20">
          1. Khi nào nên phá vỡ quy tắc
        </h3>

        <div className="callout callout-warning">
          <div className="callout-title">
            <AlertTriangle size={13} className="inline mr-1" />
            Điều kiện tiên quyết
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Chỉ phá vỡ quy tắc khi bạn hiểu rõ tại sao quy tắc đó tồn tại và bạn có thể giải thích rõ ràng tại sao không dùng nó trong tình huống này sẽ tạo ra hình ảnh mạnh hơn. Phá vỡ quy tắc vì không biết quy tắc là lỗi — phá vỡ vì lựa chọn có ý thức là nghệ thuật.
          </p>
        </div>

        <p>Bốn tình huống nên xem xét phá vỡ quy tắc:</p>
        <ul className="factor-list">
          <li>
            <strong>Khi quy tắc làm yếu thông điệp:</strong> Rule of Thirds có thể phân tán sự chú ý khi bạn cần tuyên bố quyền lực tuyệt đối.
          </li>
          <li>
            <strong>Khi bạn muốn tạo căng thẳng:</strong> Sự không thoải mái thị giác có thể chính là mục đích.
          </li>
          <li>
            <strong>Khi chủ thể đòi hỏi:</strong> Một số chủ thể &ldquo;từ chối&rdquo; bố cục truyền thống và đòi hỏi cách tiếp cận khác biệt.
          </li>
          <li>
            <strong>Khi bạn đã thành thạo:</strong> Khi quy tắc đã trở thành phản xạ, bạn tự do chọn tuân theo hay không.
          </li>
        </ul>

        <hr className="doc-divider" />

        {/* 3.2 */}
        <h3 id="sec-3-2" className="scroll-mt-20">
          2. Mất cân bằng có chủ đích (Intentional Imbalance)
        </h3>

        <p>
          Bình thường, mắt người tìm kiếm cân bằng. Khi bố cục cố tình mất cân bằng, nó tạo ra phản ứng tâm lý: bồn chồn, tò mò, hoặc cấp bách. Đây là công cụ mạnh mẽ khi câu chuyện bạn kể liên quan đến sự bất ổn, xung đột, hoặc biến động.
        </p>

        <div className="comparison-grid my-4">
          <div className="comp-card">
            <span className="sub-label">CÂN BẰNG</span>
            <h4>An toàn và hài hòa</h4>
            <p>
              Chủ thể ở vị trí quy tắc, negative space cân bằng, mắt thoải mái. Thích hợp cho phong cảnh yên bình, kiến trúc thanh lịch, chân dung trang trọng.
            </p>
          </div>
          <div className="comp-card" style={{ borderColor: '#fb718533' }}>
            <span className="sub-label" style={{ color: '#fb7185', background: 'rgba(251,113,133,0.1)' }}>MẤT CÂN BẰNG</span>
            <h4>Bất ổn và kích thích</h4>
            <p>
              Chủ thể bị đẩy sát mép, negative space không đều, mắt bồn chồn. Thích hợp cho phóng sự xã hội, street photography, nghệ thuật thực nghiệm.
            </p>
          </div>
        </div>

        <hr className="doc-divider" />

        {/* 3.3 */}
        <h3 id="sec-3-3" className="scroll-mt-20">
          3. Dutch Angle và căng thẳng
        </h3>

        <p>
          Dutch Angle (góc nghiêng) là khi máy ảnh được nghiêng so với đường chân trời, tạo ra một cảm giác bất ổn và căng thẳng ngay lập tức. Mắt người phản ứng mạnh với đường chân trời nghiêng vì nó vi phạm giả định về trọng lực.
        </p>

        <div className="hotspot-card my-4">
          <div className="flex items-center gap-2 mb-2">
            <Triangle size={16} className="text-[#fb7185]" />
            <span className="text-sm font-semibold text-[#e4e4ed]">Sử dụng Dutch Angle đúng cách</span>
          </div>
          <p className="text-xs text-[#9d9db5] leading-relaxed">
            Nghiêng nhẹ (3-5°): tạo cảm giác bí ẩn, không thoải mái tinh tế. Nghiêng vừa (10-15°): tạo căng thẳng rõ ràng, cảm giác bất ổn. Nghiêng mạnh (20°+): cực đoan, nên dùng rất hạn chế cho hiệu ứng đặc biệt. Lỗi phổ biến nhất: nghiêng máy mà không có mục đích — kết quả là ảnh trông &ldquo;lệch&rdquo; chứ không phải &ldquo;nghệ thuật&rdquo;.
          </p>
        </div>

        <hr className="doc-divider" />

        {/* 3.4 */}
        <h3 id="sec-3-4" className="scroll-mt-20">
          4. Trung tâm hóa cho quyền lực
        </h3>

        <p>
          Đặt chủ thể ở giữa — phá vỡ Rule of Thirds — khi bạn muốn tuyên bố quyền lực tuyệt đối. Bố cục trung tâm nói: &ldquo;Đây là thứ quan trọng nhất. Không cần bàn cãi.&rdquo; Nó đặc biệt hiệu quả trong chân dung trực diện, kiến trúc đối xứng, và hình ảnh biểu tượng.
        </p>

        <hr className="doc-divider" />

        {/* 3.5 */}
        <h3 id="sec-3-5" className="scroll-mt-20">
          5. Lệch tâm cho nghịch lý (Off-center for Tension)
        </h3>

        <p>
          Đẩy chủ thể quá xa khỏi các điểm mạnh quy tắc — gần sát mép khung hình — tạo ra cảm giác nguy hiểm, cô lập, hoặc nghịch lý. Người xem cảm thấy chủ thể sắp &ldquo;rơi ra khỏi khung hình&rdquo; — và chính sự lo âu đó tạo ra sức hút.
        </p>

        <div className="callout callout-photo">
          <div className="callout-title">
            <Camera size={13} className="inline mr-1" />
            Case Study: Fan Ho — Hồng Kông những năm 1950
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Fan Ho thường đặt chủ thể ở sát mép khung hình — một người đi bộ gầy guộc ở góc dưới cùng, với negative space khổng lồ của bầu trời và kiến trúc Hồng Kông. Sự mất cân bằng này không phải ngẫu nhiên — nó kể câu chuyện về sự cô đơn trong thành phố đông đúc, về con người nhỏ bé trước đô thị vĩ đại.
          </p>
        </div>

        {/* ============================================================ */}
        {/*  SECTION IV                                                   */}
        {/* ============================================================ */}
        <h2 id="sec-4" className="scroll-mt-20">
          <span className="section-num-elite">Ⅳ</span>
          Bố cục nâng cao
        </h2>

        <p>
          Vượt qua các quy tắc cơ bản, bố cục nâng cao là lãnh địa của nhiếp ảnh gia đã thành thạo và bắt đầu tìm kiếm tiếng nói riêng. Đây là nơi bố cục không chỉ sắp xếp mà còn kiến tạo.
        </p>

        <hr className="doc-divider" />

        {/* 4.1 */}
        <h3 id="sec-4-1" className="scroll-mt-20">
          1. Bố cục phân tầng (Layered Composition)
        </h3>

        <p>
          Thay vì một chủ thể trên một nền, bố cục phân tầng tạo ra nhiều &ldquo;lớp&rdquo; không gian — foreground, midground, background — mỗi lớp chứa đựng thông tin và tương tác với nhau. Đây là kỹ thuật của Alex Webb, Jonas Bendiksen, và nhiều bậc thầy street photography.
        </p>

        <p>Ba nguyên tắc của bố cục phân tầng:</p>
        <ul className="factor-list">
          <li>
            <strong>Mỗi lớp phải có nội dung:</strong> Không có lớp nào trống rỗng. Foreground có yếu tố, midground có chủ thể, background có ngữ cảnh.
          </li>
          <li>
            <strong>Mỗi lớp phải liên kết:</strong> Các lớp không tồn tại độc lập — chúng tương tác về mặt câu chuyện, màu sắc, hoặc dòng chảy.
          </li>
          <li>
            <strong>Độ sâu phải rõ ràng:</strong> Người xem phải nhận ra ngay rằng có nhiều lớp — nếu không, hình ảnh chỉ trông &ldquo;lộn xộn&rdquo;.
          </li>
        </ul>

        <hr className="doc-divider" />

        {/* 4.2 */}
        <h3 id="sec-4-2" className="scroll-mt-20">
          2. Bố cục chữ J và chữ L
        </h3>

        <p>
          Bố cục chữ J đặt chủ thể dọc theo một đường cong hình chữ J — bắt đầu từ một góc, vòng quanh và kết thúc tại điểm mạnh. Bố cục chữ L tương tự nhưng với góc vuông. Cả hai tạo ra dòng chảy tự nhiên, dẫn mắt người xem theo một hành trình có chủ đích.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[#7c8aff] font-bold text-lg">J</span>
              <span className="text-sm font-semibold text-[#e4e4ed]">Bố cục chữ J</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Phù hợp khi có đường dẫn cong kết hợp với một điểm nhấn ở cuối. Ví dụ: con đường vòng cung với người đi bộ ở cuối, bờ biển cong với ngọn hải đăng.
            </p>
          </div>
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[#ffcb6b] font-bold text-lg">L</span>
              <span className="text-sm font-semibold text-[#e4e4ed]">Bố cục chữ L</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Phù hợp khi có hai hướng dẫn vuông góc với nhau. Ví dụ: mặt nước ngang kết hợp với cột dọc, hàng rào ngang với thân cây dọc.
            </p>
          </div>
        </div>

        <hr className="doc-divider" />

        {/* 4.3 */}
        <h3 id="sec-4-3" className="scroll-mt-20">
          3. Bố cục đường chéo (Diagonal Composition)
        </h3>

        <p>
          Đường chéo là hướng năng động nhất trong nhiếp ảnh. Trong khi đường ngang tĩnh lặng và đường dọc ổn định, đường chéo luôn ngụ ý chuyển động — vì nó không thể tồn tại trong trạng thái nghỉ. Bố cục đường chéo cho phép bạn tiêm năng lượng vào bất kỳ hình ảnh nào.
        </p>

        <p>Hai loại đường chéo chính:</p>
        <div className="comparison-grid my-4">
          <div className="comp-card">
            <span className="sub-label">CHÉO TỪ TRÁI-DƯỚI ĐẾN PHẢI-TRÊN</span>
            <h4>Chuyển động tự nhiên</h4>
            <p>
              Theo chiều đọc của hầu hết ngôn ngữ (trái sang phải), đường chéo này tạo cảm giác tiến lên, phát triển, tích cực. Mắt di chuyển thoải mái dọc theo nó.
            </p>
          </div>
          <div className="comp-card" style={{ borderColor: '#fb718533' }}>
            <span className="sub-label" style={{ color: '#fb7185', background: 'rgba(251,113,133,0.1)' }}>CHÉO TỪ PHẢI-DƯỚI ĐẾN TRÁI-TRÊN</span>
            <h4>Chuyển động chống lại</h4>
            <p>
              Ngược chiều đọc tự nhiên, đường chéo này tạo sức cản, căng thẳng, cảm giác đấu tranh. Sử dụng khi câu chuyện cần sự khó khăn, nỗ lực.
            </p>
          </div>
        </div>

        <hr className="doc-divider" />

        {/* 4.4 */}
        <h3 id="sec-4-4" className="scroll-mt-20">
          4. Bố cục tròn tâm (Radial Composition)
        </h3>

        <p>
          Tất cả các yếu tố tỏa ra từ hoặc hội tụ về một tâm điểm duy nhất — như bánh xe, hoa, hoặc vòng tròn sóng. Bố cục tròn tâm tạo ra sức hút tuyệt đối vào tâm điểm — mắt không thể thoát ra — và tạo cảm giác trọn vẹn, toàn diện.
        </p>

        <p>
          Ứng dụng đặc biệt hiệu quả trong kiến trúc (vòm, mái vờm), tự nhiên (hoa, vỏ ốc), và khi chụp từ góc trên cao xuống (bàn ăn tròn, đài phun nước, vòng tròn người).
        </p>

        <hr className="doc-divider" />

        {/* 4.5 */}
        <h3 id="sec-4-5" className="scroll-mt-20">
          5. Bố cục không gian âm (Negative Space Composition)
        </h3>

        <p>
          Không gian âm (negative space) — vùng trống xung quanh chủ thể — không phải là &ldquo;không có gì&rdquo;. Nó là một yếu tố tích cực trong bố cục. Khi không gian âm chiếm phần lớn khung hình, nó tạo ra cảm xúc: cô đơn, tự do, tĩnh lặng, hoặc áp lực — tùy thuộc vào bối cảnh và cách sử dụng.
        </p>

        <div className="callout callout-brain">
          <div className="callout-title">
            <Eye size={13} className="inline mr-1" />
            Tâm lý học của không gian trống
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Mắt người có xu hướng tìm kiếm thông tin trong không gian trống. Khi bạn để lại nhiều negative space, mắt người xem sẽ &ldquo;điền vào&rdquo; — bổ sung bằng trí tưởng tượng và ký ức cá nhân. Đây là lý do tại sao hình ảnh nhiều không gian âm thường có tính gợi mở cao hơn hình ảnh kín đặc — chúng &ldquo;mời gọi&rdquo; người xem tham gia vào quá trình sáng tạo ý nghĩa.
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
              Bố cục là ngữ pháp của ngôn ngữ thị giác — không có nó, hình ảnh chỉ là sự ghi lại ngẫu nhiên.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">02</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Bố cục thực hiện ba chức năng: hướng dẫn mắt, tạo cấu trúc, và truyền tải ý nghĩa.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">03</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Rule of Thirds là điểm bắt đầu — Golden Ratio và Golden Spiral là bước tiến hóa tự nhiên.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">04</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Đường dẫn (leading lines) là công cụ mạnh nhất để tạo chiều sâu và hướng sự chú ý.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">05</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Chỉ phá vỡ quy tắc khi hiểu rõ tại sao quy tắc đó tồn tại và tại sao không dùng nó tạo ra kết quả tốt hơn.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">06</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Dutch Angle, mất cân bằng, và lệch tâm là công cụ tạo căng thẳng — không phải lỗi kỹ thuật.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">07</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Bố cục nâng cao (phân tầng, đường chéo, tròn tâm) là lãnh vực của nhiếp ảnh gia đã thành thạo quy tắc cơ bản.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">08</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Negative space không phải là &ldquo;không có gì&rdquo; — nó là yếu tố tích cực mời gọi người xem tham gia vào quá trình sáng tạo ý nghĩa.
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
              Quy tắc 1/3 là <strong>bánh xe tập xe đạp</strong> — cần thiết khi học nhưng phải bỏ đi khi thành thạo. Bố cục thực sự không đến từ quy tắc mà từ việc hiểu <em>tại sao</em> quy tắc tồn tại. Rule of thirds tạo ra visual tension. Centering tạo ra stability và power. Frame trong frame tạo ra depth và intimacy. Khi bạn hiểu mục đích, bạn mới biết khi nào phá vỡ quy tắc để tạo ra điều gì đó chưa từng thấy.
            </p>
          </div>
          <div className="callout callout-pitfall">
            <div className="callout-title">⚠ Bẫy chuyên gia</div>
            <p style={{ marginBottom: 0, lineHeight: 1.75 }}>
              Áp dụng quy tắc bố cục một cách <strong>cứng nhắc mà không hiểu mục đích</strong>. Rule of thirds tạo ra tension — nếu bạn muốn peaceful và timeless, centering đôi khi là lựa chọn đúng. Nhiều nhiếp ảnh gia tránh centered compositions vì "nhàm" — nhưng đây chính xác là lý do tại sao một centered portrait có thể cực kỳ mạnh khi tất cả người khác đang dùng rule of thirds.
            </p>
          </div>
          <div className="practice-exercise">
            <div className="practice-header">⬥ Bài tập thực chiến — 20 ảnh · 4 bố cục</div>
            <div className="practice-body">
              <p>Trong một buổi chụp 1 giờ, áp dụng tuần tự 4 hệ thống bố cục:</p>
              <ol className="practice-steps">
                <li><strong>5 ảnh Rule of Thirds:</strong> Chủ thể tại 4 điểm giao của lưới 1/3. Mỗi ảnh phải có visual tension rõ ràng.</li>
                <li><strong>5 ảnh Centered + Symmetry:</strong> Chủ thể ở trung tâm với yếu tố đối xứng. Cảm giác phải trang trọng, vĩnh cửu.</li>
                <li><strong>5 ảnh Leading Lines:</strong> Đường dẫn mắt từ góc frame đến chủ thể. Depth phải cảm nhận được.</li>
                <li><strong>5 ảnh Negative Space dominant:</strong> Khoảng trống chiếm hơn 60% frame. Cô đơn hoặc tự do phải cảm nhận được ngay.</li>
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
          <Link href="/kich-thuoc" className="group nav-card">
            <div className="nav-card-label">← Bài trước</div>
            <div className="nav-card-title">11. Kích thước tỷ lệ</div>
            <div className="nav-card-desc">Chất liệu & Tỷ lệ</div>
          </Link>
          <Link href="/goc-chup" className="group nav-card text-right">
            <div className="nav-card-label">Bài tiếp →</div>
            <div className="nav-card-title">13. Góc chụp</div>
            <div className="nav-card-desc">Bố cục & Góc nhìn</div>
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

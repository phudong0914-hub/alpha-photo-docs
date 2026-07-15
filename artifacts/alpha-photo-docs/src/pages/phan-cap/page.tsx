

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
  Eye,
  Target,
  Sparkles,
  BookOpen,
  Check,
  Layers,
  Focus,
  Zap,
  Crosshair,
  Diamond,
} from 'lucide-react';
import DocsLayout from '@/components/docs-layout';

/* ------------------------------------------------------------------ */
/*  TOC Data                                                          */
/* ------------------------------------------------------------------ */
const tocSections = [
  { id: 'sec-1', label: 'Ⅰ. Phân cấp thị giác', level: 1 },
  { id: 'sec-1-1', label: '1. Phân cấp thị giác là gì', level: 2 },
  { id: 'sec-1-2', label: '2. Dominant vs. Subordinate', level: 2 },
  { id: 'sec-1-3', label: '3. Tại sao phân cấp quan trọng', level: 2 },
  { id: 'sec-1-4', label: '4. Đường mắt qua hình ảnh', level: 2 },
  { id: 'sec-2', label: 'Ⅱ. Tạo điểm nhấn', level: 1 },
  { id: 'sec-2-1', label: '1. Tương phản (Contrast)', level: 2 },
  { id: 'sec-2-2', label: '2. Vị trí (Position)', level: 2 },
  { id: 'sec-2-3', label: '3. Kích thước (Size)', level: 2 },
  { id: 'sec-2-4', label: '4. Màu sắc (Color)', level: 2 },
  { id: 'sec-2-5', label: '5. Độ nét (Sharpness)', level: 2 },
  { id: 'sec-2-6', label: '6. Sự cô lập (Isolation)', level: 2 },
  { id: 'sec-3', label: 'Ⅲ. Phân cấp nhiều tầng', level: 1 },
  { id: 'sec-3-1', label: '1. Điểm nhấn chính (Primary Focal Point)', level: 2 },
  { id: 'sec-3-2', label: '2. Điểm nhấn phụ (Secondary Focal Points)', level: 2 },
  { id: 'sec-3-3', label: '3. Yếu tố hỗ trợ (Supporting Elements)', level: 2 },
  { id: 'sec-3-4', label: '4. Nền (Background)', level: 2 },
  { id: 'sec-4', label: 'Ⅳ. Điểm nhấn và câu chuyện', level: 1 },
  { id: 'sec-4-1', label: '1. Điểm nhấn như công cụ kể chuyện', level: 2 },
  { id: 'sec-4-2', label: '2. Mắt đi đâu trước quan trọng', level: 2 },
  { id: 'sec-4-3', label: '3. Kiểm soát câu chuyện qua phân cấp', level: 2 },
  { id: 'sec-4-4', label: '4. Phân cấp trong loạt ảnh', level: 2 },
  { id: 'sec-5', label: 'Ⅴ. Khi không có điểm nhấn', level: 1 },
  { id: 'sec-5-1', label: '1. Sự mơ hồ có chủ đích', level: 2 },
  { id: 'sec-5-2', label: '2. Nhiều điểm nhấn cạnh tranh', level: 2 },
  { id: 'sec-5-3', label: '3. Bố cục dân chủ', level: 2 },
  { id: 'sec-5-4', label: '4. Khi mọi thứ đều bình đẳng', level: 2 },
  { id: 'summary', label: 'Tóm tắt 7 điểm chính', level: 1 },
];

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */
export default function PhanCapPage() {
  const [isRead, setIsRead] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('alpha-doc-read');
      if (saved) {
        const readPages: string[] = JSON.parse(saved);
        if (readPages.includes('/phan-cap')) setIsRead(true);
      }
    } catch {}
  }, []);

  const toggleRead = () => {
    try {
      const saved = localStorage.getItem('alpha-doc-read');
      const readPages: string[] = saved ? JSON.parse(saved) : [];
      if (isRead) {
        const updated = readPages.filter((p) => p !== '/phan-cap');
        localStorage.setItem('alpha-doc-read', JSON.stringify(updated));
        setIsRead(false);
      } else {
        const updated = [...readPages, '/phan-cap'];
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
          <span className="text-[#9d9db5]">Phân cấp & Điểm nhấn</span>
        </div>

        {/* Badges */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold font-mono px-2 py-0.5 rounded bg-[rgba(124,138,255,0.1)] text-[#7c8aff]">
            HA18
          </span>
          <span className="text-[11px] text-[#6b6b80]">18 phút đọc · #PhanCap #DiemNhan #BoCuc</span>
          <span className="elite-badge">
            <GraduationCap size={11} />
            Nâng cao
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-[#e4e4ed] leading-tight mb-3 border-none pb-0">
          Phân cấp & Điểm nhấn
        </h1>

        {/* Subtitle */}
        <p className="text-base text-[#9d9db5] leading-relaxed mb-6" style={{ marginTop: 0 }}>
          Nguyên lý vận hành · Bài 18 — Kiểm soát con mắt người xem thông qua hệ thống phân cấp thị giác
        </p>

        {/* Hero image */}
        <div className="color-overview-hero rounded-xl overflow-hidden border border-[#1e1e2a] mb-8">
          <img
            src="/hero-phan-cap.webp"
            alt="Infographic tổng quan về phân cấp và điểm nhấn trong nhiếp ảnh: dominant, subordinate, eye path, contrast, position, size, color, light và focus"
            className="w-full h-auto object-contain"
            loading="eager"
          />
        </div>

        {/* Video bài học */}
        <LessonVideoPlayer video={lessonVideos['/phan-cap']} />

        {/* Opening Quote */}
        <div className="quote-block">
          <p>
            Một hình ảnh không có điểm nhấn giống như một câu nói không có động từ chính — mọi từ đều quan trọng như nhau, và kết quả là không từ nào thực sự được nghe. Phân cấp thị giác là ngữ pháp của hình ảnh.
          </p>
        </div>

        {/* ============================================================ */}
        {/*  SECTION I                                                    */}
        {/* ============================================================ */}
        <h2 id="sec-1" className="scroll-mt-20">
          <span className="section-num">Ⅰ</span>
          Phân cấp thị giác
        </h2>

        <p className="drop-cap">
          Khi bạn nhìn vào một bức ảnh, mắt bạn không &ldquo;nhìn thấy&rdquo; tất cả các yếu tố cùng lúc. Thay vào đó, nó di chuyển theo một đường dẫn — từ điểm quan trọng nhất đến ít quan trọng nhất — và trải nghiệm thị giác của bạn phụ thuộc hoàn toàn vào thứ tự đó. <span className="key-concept">Phân cấp thị giác</span> (visual hierarchy) là nghệ thuật quyết định con đường ấy.
        </p>

        <hr className="doc-divider" />

        {/* 1.1 */}
        <h3 id="sec-1-1" className="scroll-mt-20">
          1. Phân cấp thị giác là gì
        </h3>

        <p>
          Phân cấp thị giác là hệ thống sắp xếp các yếu tố thị giác theo mức độ quan trọng, sao cho mắt người xem tiếp nhận chúng theo một thứ tự có chủ đích. Trong nhiếp ảnh, điều này có nghĩa là: người xem nên nhìn thấy gì trước, gì sau, và gì cuối cùng — và tất cả đều do nhiếp ảnh gia quyết định.
        </p>

        <p>
          Không có phân cấp = không có câu chuyện. Khi mọi yếu tố cùng cạnh tranh cho sự chú ý, mắt bối rối và não bộ từ bỏ cố gắng đọc hình ảnh. Kết quả: người xem lướt qua mà không dừng lại.
        </p>

        <hr className="doc-divider" />

        {/* 1.2 */}
        <h3 id="sec-1-2" className="scroll-mt-20">
          2. Dominant vs. Subordinate — Hai cực của phân cấp
        </h3>

        <div className="comparison-grid my-4">
          <div className="comp-card">
            <span className="sub-label" style={{ color: '#7c8aff', background: 'rgba(124,138,255,0.1)' }}>DOMINANT</span>
            <h4>Yếu tố chi phối</h4>
            <p>
              Yếu tố đầu tiên mắt nhìn thấy. Nó &ldquo;đòi hỏi&rdquo; sự chú ý — bằng kích thước lớn hơn, màu sắc tương phản hơn, vị trí chiến lược hơn, hoặc độ nét cao hơn. Mọi yếu tố khác phải phục vụ nó.
            </p>
          </div>
          <div className="comp-card" style={{ borderColor: '#ffcb6b44' }}>
            <span className="sub-label" style={{ color: '#ffcb6b', background: 'rgba(255,203,107,0.1)' }}>SUBORDINATE</span>
            <h4>Yếu tố phụ thuộc</h4>
            <p>
              Các yếu tố hỗ trợ, bổ sung, và làm phong phú ý nghĩa của dominant element. Chúng không cạnh tranh — chúng phục vụ. Như nhạc cụ đệm cho giọng ca chính.
            </p>
          </div>
        </div>

        <hr className="doc-divider" />

        {/* 1.3 */}
        <h3 id="sec-1-3" className="scroll-mt-20">
          3. Tại sao phân cấp quan trọng
        </h3>

        <p>Phân cấp thị giác ảnh hưởng đến bốn khía cạnh cốt lõi:</p>
        <ul className="factor-list">
          <li>
            <strong>Tốc độ đọc:</strong> Người xem quyết định có tiếp tục nhìn hay lướt qua trong 0.3 giây đầu tiên. Nếu phân cấp rõ ràng, họ biết ngay có gì đáng xem — và ở lại.
          </li>
          <li>
            <strong>Độ sâu đọc:</strong> Hình ảnh có phân cấp tốt giữ người xem lâu hơn — vì mắt có nhiều tầng để khám phá sau khi đã &ldquo;giải quyết&rdquo; tầng đầu tiên.
          </li>
          <li>
            <strong>Độ nhớ:</strong> Người xem nhớ hình ảnh có điểm nhấn rõ ràng tốt hơn hình ảnh mà mọi thứ cùng quan trọng. Não bộ nhớ &ldquo;cái nổi bật&rdquo; — không phải &ldquo;cái có mặt&rdquo;.
          </li>
          <li>
            <strong>Kể chuyện:</strong> Thứ tự mắt tiếp nhận = thứ tự câu chuyện. Phân cấp cho phép bạn kiểm soát câu chuyện mà không cần chữ viết.
          </li>
        </ul>

        <hr className="doc-divider" />

        {/* 1.4 */}
        <h3 id="sec-1-4" className="scroll-mt-20">
          4. Đường mắt qua hình ảnh (Eye Path)
        </h3>

        <p>
          Khi phân cấp hoạt động, mắt di chuyển theo một <span className="key-concept">đường dẫn</span> (eye path) từ điểm nhấn chính qua các điểm nhấn phụ đến các yếu tố hỗ trợ. Eye tracking research đã chỉ ra rằng mắt không quét hình ảnh một cách ngẫu nhiên — nó tìm kiếm điểm có tương phản cao nhất trước, rồi di chuyển theo đường dẫn thị giác tự nhiên.
        </p>

        <div className="callout callout-brain">
          <div className="callout-title">
            <Brain size={13} className="inline mr-1" />
            Eye tracking facts
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Nghiên cứu eye tracking cho thấy: mắt dừng lâu nhất ở khuôn mặt người (đặc biệt là mắt và miệng), vùng có tương phản cao, và các điểm giao cắt của đường dẫn thị giác. Mắt cũng có xu hướng di chuyển từ trái sang phải, từ trên xuống dưới — phản ánh thói quen đọc. Bạn có thể sử dụng kiến thức này để thiết kế eye path có chủ đích.
          </p>
        </div>

        {/* ============================================================ */}
        {/*  SECTION II                                                   */}
        {/* ============================================================ */}
        <h2 id="sec-2" className="scroll-mt-20">
          <span className="section-num">Ⅱ</span>
          Tạo điểm nhấn — Sáu kỹ thuật nền tảng
        </h2>

        <p>
          Có sáu công cụ chính để tạo điểm nhấn trong nhiếp ảnh. Mỗi công cụ hoạt động theo một cơ chế tâm lý khác nhau — và khi kết hợp, chúng tạo ra điểm nhấn không thể bỏ qua.
        </p>

        <hr className="doc-divider" />

        {/* 2.1 */}
        <h3 id="sec-2-1" className="scroll-mt-20">
          1. Tương phản (Contrast)
        </h3>

        <div className="hotspot-card my-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[#7c8aff]"><Zap size={16} /></span>
            <span className="text-sm font-semibold text-[#e4e4ed]">Tương phản — Kích hoạt phản ứng thị giác nhanh nhất</span>
          </div>
          <p className="text-xs text-[#9d9db5] leading-relaxed">
            Não bộ tiến hóa để nhận ra sự khác biệt — đó là cơ chế sinh tồn. Con mèo trong bụi rậm, quả đỏ trên cây xanh, khuôn mặt trong đám đông. Tương phản chính là &ldquo;sự khác biệt&rdquo; đó dưới dạng thị giác: sáng tối, nóng lạnh, lớn nhỏ, sắc mờ.
          </p>
        </div>

        <p>Các loại tương phản tạo điểm nhấn:</p>
        <ul className="factor-list">
          <li>
            <strong>Tương phản tone:</strong> Đối tượng sáng trên nền tối (hoặc ngược lại) là cách tạo điểm nhấn mạnh mẽ nhất. Caravaggio xây dựng toàn bộ sự nghiệp trên nguyên lý này.
          </li>
          <li>
            <strong>Tương phản màu:</strong> Màu bổ sung (complementary) tạo rung thị giác (vibration) mà mắt không thể bỏ qua. Đỏ trên xanh lá, cam trên xanh lam.
          </li>
          <li>
            <strong>Tương phản sắc thái:</strong> Vùng sắc nét giữa vùng mờ — aperture và depth of field là công cụ chính ở đây.
          </li>
        </ul>

        <hr className="doc-divider" />

        {/* 2.2 */}
        <h3 id="sec-2-2" className="scroll-mt-20">
          2. Vị trí (Position)
        </h3>

        <div className="hotspot-card my-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[#ffcb6b]"><Crosshair size={16} /></span>
            <span className="text-sm font-semibold text-[#e4e4ed]">Vị trí — Vị trí chiến lược = Trọng lượng chiến lược</span>
          </div>
          <p className="text-xs text-[#9d9db5] leading-relaxed">
            Không phải mọi vị trí trong khung hình đều có trọng lượng như nhau. Các điểm giao phần ba, trung tâm, và các góc đều có sức hút thị giác khác nhau — và hiểu điều này cho phép bạn đặt điểm nhấn ở vị trí tối ưu.
          </p>
        </div>

        <ul className="factor-list">
          <li>
            <strong>Trung tâm:</strong> Điểm mạnh nhất về quyền lực thị giác — nhưng cũng dễ tạo cảm giác nhàm chán nhất. Dùng khi bạn muốn nói &ldquo;đây là thứ duy nhất quan trọng&rdquo;.
          </li>
          <li>
            <strong>Điểm phần ba:</strong> Vị trí tối ưu cho cân bằng + điểm nhấn. Mắt dừng lại tại đây tự nhiên.
          </li>
          <li>
            <strong>Góc:</strong> Góc trái trên = nơi mắt bắt đầu quét. Góc phải dưới = nơi mắt kết thúc. Sử dụng để tạo eye path có chủ đích.
          </li>
        </ul>

        <hr className="doc-divider" />

        {/* 2.3 */}
        <h3 id="sec-2-3" className="scroll-mt-20">
          3. Kích thước (Size)
        </h3>

        <div className="hotspot-card my-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-emerald-400"><Layers size={16} /></span>
            <span className="text-sm font-semibold text-[#e4e4ed]">Kích thước — Lớn hơn = Quan trọng hơn</span>
          </div>
          <p className="text-xs text-[#9d9db5] leading-relaxed">
            Đây là nguyên lý trực quan nhất: vật lớn hơn thu hút sự chú ý nhiều hơn. Nhưng nghịch lý: vật nhỏ nhất trong khung hình cũng có thể trở thành điểm nhấn — nếu nó khác biệt đủ lớn so với môi trường xung quanh.
          </p>
        </div>

        <hr className="doc-divider" />

        {/* 2.4 */}
        <h3 id="sec-2-4" className="scroll-mt-20">
          4. Màu sắc (Color)
        </h3>

        <div className="hotspot-card my-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[#fb7185]"><Diamond size={16} /></span>
            <span className="text-sm font-semibold text-[#e4e4ed]">Màu sắc — Công cụ điểm nhấn tinh tế và mạnh mẽ nhất</span>
          </div>
          <p className="text-xs text-[#9d9db5] leading-relaxed">
            Một điểm đỏ nhỏ trong khung hình xanh xám sẽ hút mắt như nam châm. Màu ấm &ldquo;tiến về phía&rdquo; người xem, màu lạnh &ldquo;lùi về phía&rdquo; nền. Màu bão hòa nổi bật, màu nhạt chìm vào. Trong nhiếp ảnh đen trắng, bạn phải dựa vào tone contrast thay vì màu — và đó là bài tập tuyệt vời cho kỹ năng phân cấp.
          </p>
        </div>

        <hr className="doc-divider" />

        {/* 2.5 */}
        <h3 id="sec-2-5" className="scroll-mt-20">
          5. Độ nét (Sharpness)
        </h3>

        <div className="hotspot-card my-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[#a855f7]"><Focus size={16} /></span>
            <span className="text-sm font-semibold text-[#e4e4ed]">Độ nét — Kiểm soát phân cấp qua độ sâu trường ảnh</span>
          </div>
          <p className="text-xs text-[#9d9db5] leading-relaxed">
            Đây là công cụ phân cấp độc quyền của nhiếp ảnh — hội họa không có. Khi bạn mở aperture lớn (f/1.4–f/2.8), bạn tạo ra một mặt phẳng nét duy nhất trong hình ảnh 3D. Mọi thứ ngoài mặt phẳng này đều mờ — và sự mờ nhạt đó tự động tạo phân cấp: sắc nét = quan trọng, mờ = phụ.
          </p>
        </div>

        <hr className="doc-divider" />

        {/* 2.6 */}
        <h3 id="sec-2-6" className="scroll-mt-20">
          6. Sự cô lập (Isolation)
        </h3>

        <div className="hotspot-card my-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[#22c55e]"><Target size={16} /></span>
            <span className="text-sm font-semibold text-[#e4e4ed]">Sự cô lập — Vật thể đơn độc là vật thể mạnh nhất</span>
          </div>
          <p className="text-xs text-[#9d9db5] leading-relaxed">
            Một vật thể tách biệt khỏi nhóm — dù nhỏ, dù màu nhạt, dù ở vị trí yếu — vẫn thu hút mắt mạnh hơn một vật thể lớn nằm trong đám đông. Sự cô lập tạo ra trọng lượng tâm lý vượt qua mọi yếu tố khác. Đây là lý do tại sao nhiếp ảnh minimalism hiệu quả: cô lập = điểm nhấn tự động.
          </p>
        </div>

        <div className="callout callout-key">
          <div className="callout-title">
            <Lightbulb size={13} className="inline mr-1" />
            Kết hợp sáu kỹ thuật
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Điểm nhấn mạnh nhất không đến từ một kỹ thuật đơn lẻ — nó đến từ sự hội tụ. Một chủ thể ở điểm phần ba, có màu tương phản, sắc nét, và cô lập — đó là điểm nhấn không thể cưỡng. Mỗi kỹ thuật bạn thêm vào, điểm nhấn mạnh thêm một bậc.
          </p>
        </div>

        {/* ============================================================ */}
        {/*  SECTION III                                                  */}
        {/* ============================================================ */}
        <h2 id="sec-3" className="scroll-mt-20">
          <span className="section-num">Ⅲ</span>
          Phân cấp nhiều tầng — Kiến trúc thị giác
        </h2>

        <p>
          Hình ảnh phức tạp không chỉ có một điểm nhấn — chúng có một <span className="key-concept">hệ thống phân cấp nhiều tầng</span> (layered hierarchy), giống như kiến trúc một tòa nhà: móng, tường, mái — mỗi tầng phục vụ một chức năng khác nhau nhưng tất cả cùng tạo nên một cấu trúc thống nhất.
        </p>

        <hr className="doc-divider" />

        {/* 3.1 */}
        <h3 id="sec-3-1" className="scroll-mt-20">
          1. Điểm nhấn chính (Primary Focal Point)
        </h3>

        <p>
          Đây là ngôi sao của hình ảnh — thứ đầu tiên mắt nhìn thấy và thứ cuối cùng mắt rời đi. Điểm nhấn chính phải đủ mạnh để &ldquo;đòi hỏi&rdquo; sự chú ý ngay lập tức, nhưng không được mạnh đến mức làm người xem không muốn khám phá phần còn lại.
        </p>

        <p>Tiêu chí cho điểm nhấn chính hiệu quả:</p>
        <ul className="factor-list">
          <li>
            <strong>Duy nhất:</strong> Chỉ nên có một điểm nhấn chính. Nếu có hai yếu tố cạnh tranh cùng mức độ, mắt bối rối.
          </li>
          <li>
            <strong>Rõ ràng:</strong> Người xem phải nhận diện được ngay lập tức — không cần &ldquo;tìm&rdquo; điểm nhấn.
          </li>
          <li>
            <strong>Có ý nghĩa:</strong> Điểm nhấn chính phải mang ý nghĩa quan trọng nhất của hình ảnh — không chỉ là thứ nổi bật nhất.
          </li>
        </ul>

        <hr className="doc-divider" />

        {/* 3.2 */}
        <h3 id="sec-3-2" className="scroll-mt-20">
          2. Điểm nhấn phụ (Secondary Focal Points)
        </h3>

        <p>
          Sau khi mắt &ldquo;giải quyết&rdquo; điểm nhấn chính, nó cần có nơi để đi — và đó là vai trò của điểm nhấn phụ. Chúng tạo chiều sâu cho trải nghiệm đọc hình ảnh và giữ người xem ở lại lâu hơn.
        </p>

        <p>
          Mối quan hệ giữa điểm nhấn chính và phụ giống như chủ ngữ và bổ ngữ trong câu: &ldquo;Người phụ nữ (chính) đứng bên cửa sổ (phụ), ánh sáng chiếu qua rèm (phụ).&rdquo; — Ba yếu tố, ba tầng quan trọng, một câu chuyện.
        </p>

        <hr className="doc-divider" />

        {/* 3.3 */}
        <h3 id="sec-3-3" className="scroll-mt-20">
          3. Yếu tố hỗ trợ (Supporting Elements)
        </h3>

        <p>
          Yếu tố hỗ trợ không thu hút sự chú ý độc lập — chúng làm phong phú bối cảnh, tạo không khí, và cung cấp thông tin ngữ cảnh. Đây là: mô hình đám mây tạo không khí, bóng đổ tạo chiều sâu, đường nét dẫn mắt từ điểm nhấn này sang điểm nhấn khác.
        </p>

        <hr className="doc-divider" />

        {/* 3.4 */}
        <h3 id="sec-3-4" className="scroll-mt-20">
          4. Nền (Background)
        </h3>

        <p>
          Nền không phải là &ldquo;không gian trống&rdquo; — nó là sân khấu mà trên đó mọi diễn viên khác biểu diễn. Nền tốt phục vụ ba chức năng: cung cấp ngữ cảnh, tạo chiều sâu, và không cạnh tranh với điểm nhấn.
        </p>

        <div className="overflow-x-auto my-4 rounded-lg border border-[#1e1e2a]">
          <table className="doc-table">
            <thead>
              <tr>
                <th>Tầng phân cấp</th>
                <th>Vai trò</th>
                <th>Công cụ thị giác</th>
                <th>Tỷ lệ chú ý ước tính</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Điểm nhấn chính</td>
                <td>Thu hút đầu tiên, mang ý nghĩa cốt lõi</td>
                <td>Tương phản cao + vị trí chiến lược + sắc nét</td>
                <td>~50%</td>
              </tr>
              <tr>
                <td>Điểm nhấn phụ</td>
                <td>Bổ sung ý nghĩa, tạo chiều sâu</td>
                <td>Tương phản trung bình + đường dẫn</td>
                <td>~30%</td>
              </tr>
              <tr>
                <td>Yếu tố hỗ trợ</td>
                <td>Ngữ cảnh, không khí, kết nối</td>
                <td>Tương phản thấp + đồng nhất với chủ đề</td>
                <td>~15%</td>
              </tr>
              <tr>
                <td>Nền</td>
                <td>Sân khấu, chiều sâu, không cạnh tranh</td>
                <td>Đồng nhất, mờ, tone nhẹ</td>
                <td>~5%</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ============================================================ */}
        {/*  SECTION IV                                                   */}
        {/* ============================================================ */}
        <h2 id="sec-4" className="scroll-mt-20">
          <span className="section-num">Ⅳ</span>
          Điểm nhấn và câu chuyện
        </h2>

        <hr className="doc-divider" />

        {/* 4.1 */}
        <h3 id="sec-4-1" className="scroll-mt-20">
          1. Điểm nhấn như công cụ kể chuyện
        </h3>

        <p>
          Mọi quyết định về phân cấp đều là quyết định kể chuyện. Khi bạn chọn một người làm điểm nhấn chính và biến người kia thành nền, bạn đang kể một câu chuyện về ai là nhân vật chính. Khi bạn đặt hai người ở cùng mức độ sắc nét, bạn đang nói họ bình đẳng. Khi bạn để một vật thể lớn ở nền mờ nhạt nhưng sắc nét, và một vật thể nhỏ ở foreground mờ, bạn đang tạo ra một sự căng thẳng giữa &ldquo;nhìn thấy gì&rdquo; và &ldquo;cái gì thực sự quan trọng&rdquo;.
        </p>

        <hr className="doc-divider" />

        {/* 4.2 */}
        <h3 id="sec-4-2" className="scroll-mt-20">
          2. Mắt đi đâu trước — quan trọng hơn bạn nghĩ
        </h3>

        <div className="callout callout-key">
          <div className="callout-title">
            <Lightbulb size={13} className="inline mr-1" />
            Quy luật tiếp nhận
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Khoảnh khắc đầu tiên quyết định toàn bộ trải nghiệm đọc. Nếu mắt nhìn thấy một nụ cười trước — câu chuyện là về niềm vui. Nếu mắt nhìn thấy đôi mắt đẫm lệ trước — câu chuyện là về nỗi buồn. Cùng một bức ảnh, cùng một nội dung — nhưng thứ tự tiếp nhận thay đổi câu chuyện hoàn toàn.
          </p>
        </div>

        <hr className="doc-divider" />

        {/* 4.3 */}
        <h3 id="sec-4-3" className="scroll-mt-20">
          3. Kiểm soát câu chuyện qua phân cấp
        </h3>

        <p>Bốn cách phân cấp kiểm soát câu chuyện:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
          <div className="conn-card" style={{ borderLeftColor: '#7c8aff' }}>
            <p className="text-sm font-semibold text-[#e4e4ed] mb-1">Nhấn mạnh chủ thể</p>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Chân dung với background mờ hoàn toàn — mọi thứ phục vụ khuôn mặt. Câu chuyện: &ldquo;Người này quan trọng hơn mọi thứ xung quanh.&rdquo;
            </p>
          </div>
          <div className="conn-card" style={{ borderLeftColor: '#ffcb6b' }}>
            <p className="text-sm font-semibold text-[#e4e4ed] mb-1">Nhấn mạnh bối cảnh</p>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Chủ thể nhỏ trong cảnh lớn, sắc nét từ trước ra sau — landscape với người làm yếu tố tỷ lệ. Câu chuyện: &ldquo;Con người nhỏ bé trước thiên nhiên.&rdquo;
            </p>
          </div>
          <div className="conn-card" style={{ borderLeftColor: '#22c55e' }}>
            <p className="text-sm font-semibold text-[#e4e4ed] mb-1">Nhấn mạnh mối quan hệ</p>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Hai chủ thể ở hai điểm nhấn phụ, kết nối bằng đường dẫn thị giác — mắt di chuyển qua lại. Câu chuyện: &ldquo;Mối quan hệ giữa hai người này là thứ quan trọng.&rdquo;
            </p>
          </div>
          <div className="conn-card" style={{ borderLeftColor: '#fb7185' }}>
            <p className="text-sm font-semibold text-[#e4e4ed] mb-1">Nhấn mạnh chi tiết</p>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Macro hoặc close-up chỉ thấy chi tiết — bàn tay, đôi mắt, một giọt nước. Câu chuyện: &ldquo;Chi tiết này chứa đựng toàn bộ ý nghĩa.&rdquo;
            </p>
          </div>
        </div>

        <hr className="doc-divider" />

        {/* 4.4 */}
        <h3 id="sec-4-4" className="scroll-mt-20">
          4. Phân cấp trong loạt ảnh (Photo Series)
        </h3>

        <p>
          Khi từ đơn ảnh mở rộng sang loạt ảnh, phân cấp không chỉ hoạt động trong từng hình ảnh — nó hoạt động xuyên suốt toàn bộ series. Ảnh mở đầu (lead image) là điểm nhấn chính của series. Các ảnh tiếp theo là điểm nhấn phụ. Sequence — thứ tự trình bày — là công cụ phân cấp mạnh mẽ nhất của nhiếp ảnh gia.
        </p>

        <div className="callout callout-photo">
          <div className="callout-title">
            <Camera size={13} className="inline mr-1" />
            Case Study: Robert Frank — The Americans
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Trong The Americans (1958), Frank sắp xếp 83 bức ảnh theo một trình tự có phân cấp rõ ràng: mở đầu bằng hình ảnh biểu tượng (cờ Mỹ qua cửa sổ xe buýt), phát triển qua các chủ đề (đường phố, xe cộ, tôn giáo, chủng tộc), và kết thúc bằng hình ảnh tổng hợp. Sequence này không phải ngẫu nhiên — nó là phân cấp thị giác ở cấp độ cuốn sách.
          </p>
        </div>

        {/* ============================================================ */}
        {/*  SECTION V                                                    */}
        {/* ============================================================ */}
        <h2 id="sec-5" className="scroll-mt-20">
          <span className="section-num">Ⅴ</span>
          Khi không có điểm nhấn — Nghịch lý của sự vắng mặt
        </h2>

        <p>
          Mọi nguyên lý trong chương này đều giả định rằng bạn <em>có</em> điểm nhấn. Nhưng điều gì xảy ra khi bạn cố ý không có? Khi mọi yếu tố trong hình ảnh đều quan trọng như nhau — hoặc đều không quan trọng như nhau?
        </p>

        <hr className="doc-divider" />

        {/* 5.1 */}
        <h3 id="sec-5-1" className="scroll-mt-20">
          1. Sự mơ hồ có chủ đích (Intentional Ambiguity)
        </h3>

        <p>
          Khi không có điểm nhấn rõ ràng, người xem buộc phải tự quyết định cái gì quan trọng — và quá trình quyết định đó chính là trải nghiệm. Hình ảnh mơ hồ không phải hình ảnh yếu — nó là hình ảnh cần người xem hoàn thành.
        </p>

        <hr className="doc-divider" />

        {/* 5.2 */}
        <h3 id="sec-5-2" className="scroll-mt-20">
          2. Nhiều điểm nhấn cạnh tranh
        </h3>

        <p>
          Khi hai hay nhiều yếu tố cạnh tranh cho sự chú ý ở cùng mức độ, kết quả không phải là &ldquo;không có điểm nhấn&rdquo; — mà là <span className="key-concept">căng thẳng thị giác</span>. Mắt bật qua lại giữa các điểm nhấn, không thể giải quyết, và cảm xúc sinh ra là bồn chồn, bối rối, hoặc kích động. Đây chính là mục đích của nhiều nhiếp ảnh gia biểu hiện.
        </p>

        <hr className="doc-divider" />

        {/* 5.3 */}
        <h3 id="sec-5-3" className="scroll-mt-20">
          3. Bố cục dân chủ (Democratic Composition)
        </h3>

        <p>
          Bố cục dân chủ là khi mọi yếu tố trong khung hình được đối xử bình đẳng — không có cái nào nổi bật hơn cái nào. Đây là chiến lược của Becher School (Andreas Gursky, Thomas Struth, Candida Höfer): chụp kiến trúc và không gian sao cho mọi chi tiết đều sắc nét, đều quan trọng, đều xứng đáng được nhìn.
        </p>

        <hr className="doc-divider" />

        {/* 5.4 */}
        <h3 id="sec-5-4" className="scroll-mt-20">
          4. Khi mọi thứ đều bình đẳng — và khi đó nên
        </h3>

        <div className="callout callout-warning">
          <div className="callout-title">
            <AlertTriangle size={13} className="inline mr-1" />
            Phân biệt: cố ý vs. vô ý
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Bố cục không có điểm nhấn chỉ hiệu quả khi nó là <strong>lựa chọn có chủ đích</strong>. Hầu hết nhiếp ảnh gia mới học tạo ra hình ảnh không có điểm nhấn — nhưng đó không phải lựa chọn, đó là thiếu kiểm soát. Sự khác biệt giữa bậc thầy và người mới học không phải ở việc có điểm nhấn hay không — mà ở việc đó là quyết định hay tai nạn.
          </p>
        </div>

        <p>Khi nào nên dùng bố cục không có điểm nhấn:</p>
        <ul className="factor-list">
          <li>
            <strong>Khi bạn muốn tạo sự kích động:</strong> Nhiều điểm nhấn cạnh tranh tạo ra năng lượng thị giác mà không thể đạt được bằng cách khác.
          </li>
          <li>
            <strong>Khi bạn muốn buộc người xem chậm lại:</strong> Không có điểm nhấn = không có &ldquo;shortcut&rdquo; thị giác. Người xem phải dò từng phần hình ảnh.
          </li>
          <li>
            <strong>Khi nội dung đòi hỏi sự bình đẳng:</strong> Chụp đám đông, chợ, cảnh đô thị — nơi không ai quan trọng hơn ai.
          </li>
          <li>
            <strong>Khi bạn muốn người xem tự viết câu chuyện:</strong> Không có điểm nhấn = không có câu chuyện định sẵn. Người xem tự quyết định.
          </li>
        </ul>

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
              Phân cấp thị giác quyết định thứ tự mắt tiếp nhận — và thứ tự đó chính là câu chuyện.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">02</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Sáu kỹ thuật tạo điểm nhấn: tương phản, vị trí, kích thước, màu sắc, độ nét, sự cô lập — kết hợp để tạo sức mạnh nhân lên.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">03</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Phân cấp nhiều tầng (chính → phụ → hỗ trợ → nền) tạo chiều sâu trải nghiệm và giữ người xem lâu hơn.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">04</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Khoảnh khắc đầu tiên mắt nhìn thấy quyết định toàn bộ trải nghiệm đọc hình ảnh.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">05</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Phân cấp không chỉ hoạt động trong đơn ảnh — nó hoạt động xuyên suốt loạt ảnh và portfolio.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">06</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Không có điểm nhấn có thể là lựa chọn mạnh mẽ — nhưng phải là quyết định có chủ đích, không phải tai nạn.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">07</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Mỗi quyết định phân cấp đều là quyết định kể chuyện: nhấn mạnh ai, giảm nhẹ cái gì, và tại sao.
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
              Trong <strong>3 giây đầu tiên</strong>, người xem phải tự trả lời được: (1) nhìn đâu trước, (2) nhìn đâu tiếp theo, (3) đây là ảnh về cái gì. Nếu họ không tự tìm được câu trả lời trong 3 giây đó, bạn đã mất họ — họ sẽ scroll qua. Visual hierarchy không phải là kỹ thuật đẹp — nó là <em>bản đồ dẫn đường vô thức</em> mà bạn vẽ để mắt người xem biết đi đâu mà không cần suy nghĩ.
            </p>
          </div>
          <div className="callout callout-pitfall">
            <div className="callout-title">⚠ Bẫy chuyên gia</div>
            <p style={{ marginBottom: 0, lineHeight: 1.75 }}>
              Dùng nhiều kỹ thuật để tạo hierarchy <strong>cùng lúc</strong> — màu sắc + kích thước + ánh sáng + độ sắc nét — đến mức tạo ra noise thay vì hierarchy rõ ràng. Hierarchy mạnh nhất thường chỉ dùng <em>MỘT công cụ</em>, nhưng dùng nó triệt để. Một điểm sáng duy nhất trong bóng tối tạo hierarchy mạnh hơn mười kỹ thuật cùng lúc. Sức mạnh đến từ sự tập trung, không phải từ sự phức tạp.
            </p>
          </div>
          <div className="practice-exercise">
            <div className="practice-header">⬥ Bài tập thực chiến — Hierarchy bằng một công cụ duy nhất</div>
            <div className="practice-body">
              <p>Tạo visual hierarchy với một cảnh phức tạp (chợ, đường phố đông), nhưng chỉ dùng MỘT công cụ hierarchy mỗi lần:</p>
              <ol className="practice-steps">
                <li><strong>Chỉ dùng Ánh sáng:</strong> Chỉ vị trí đứng và thời gian. Chủ thể phải là vật/người sáng nhất trong frame. Không crop, không hậu kỳ heavy.</li>
                <li><strong>Chỉ dùng Kích thước:</strong> Điều chỉnh vị trí sao cho chủ thể là đối tượng lớn nhất trong frame. Chủ thể không nhất thiết phải sáng nhất.</li>
                <li><strong>Chỉ dùng Tương phản màu:</strong> Chủ thể là đối tượng có màu sắc nổi bật nhất so với nền. Kích thước và ánh sáng có thể bình thường.</li>
                <li><strong>So sánh 3 ảnh:</strong> Cái nào dẫn mắt rõ ràng nhất? Đó là "ngôn ngữ hierarchy" tự nhiên nhất của bạn.</li>
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
          <Link href="/can-bang" className="group nav-card">
            <div className="nav-card-label">← Bài trước</div>
            <div className="nav-card-title">16. Cân bằng thị giác</div>
            <div className="nav-card-desc">Nguyên lý vận hành</div>
          </Link>
          <Link href="/tinh-thong-nhat" className="group nav-card text-right">
            <div className="nav-card-label">Bài tiếp →</div>
            <div className="nav-card-title">18. Tính Thống Nhất</div>
            <div className="nav-card-desc">Nguyên lý vận hành</div>
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
              <a href="/duong-net" className="block hover:text-[#7c8aff] transition-colors">Đường nét cảm xúc</a>
              <a href="/anh-sang" className="block hover:text-[#7c8aff] transition-colors">Ánh sáng bóng tối</a>
              <a href="/mau-sac" className="block hover:text-[#7c8aff] transition-colors">Màu sắc</a>
            </div>
            <div>
              <p className="font-semibold text-[#9d9db5] mb-2">Bố cục & Góc nhìn</p>
              <a href="/bo-cuc" className="block hover:text-[#7c8aff] transition-colors">Bố cục</a>
              <a href="/goc-chup" className="block hover:text-[#7c8aff] transition-colors">Góc chụp</a>
              <a href="/tieu-diem" className="block hover:text-[#7c8aff] transition-colors">Tiêu điểm & Độ sâu</a>
            </div>
            <div>
              <p className="font-semibold text-[#9d9db5] mb-2">Nguyên lý vận hành</p>
              <a href="/can-bang" className="block hover:text-[#7c8aff] transition-colors">Cân bằng thị giác</a>
              <a href="/phan-cap" className="block hover:text-[#7c8aff] transition-colors">Phân cấp & Điểm nhấn</a>
              <a href="/tinh-thong-nhat" className="block hover:text-[#7c8aff] transition-colors">Tính Thống Nhất</a>
            </div>
          </div>
        </div>
      </article>
    </DocsLayout>
  );
}

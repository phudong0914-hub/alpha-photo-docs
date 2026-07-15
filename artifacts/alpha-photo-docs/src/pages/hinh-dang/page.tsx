

import { useState, useEffect } from 'react';
import { LessonVideoPlayer } from '@/components/lesson-video-player';
import { lessonVideos } from '@/lib/video-config';
import { Link } from 'wouter';
import {
  ChevronRight,
  GraduationCap,
  Lightbulb,
  Camera,
  AlertTriangle,
  BookOpen,
  Check,
  Triangle,
  Square,
  Circle,
  Box,
  Eye,
  Layers,
} from 'lucide-react';
import DocsLayout from '@/components/docs-layout';
import { VisualDeconstructionLab } from '@/components/visual-deconstruction-lab';

/* ------------------------------------------------------------------ */
/*  TOC Data                                                          */
/* ------------------------------------------------------------------ */
const tocSections = [
  { id: 'sec-1', label: 'Ⅰ. Hình dạng cơ bản', level: 1 },
  { id: 'sec-1-1', label: '1. Hình tròn — Sự thống nhất và mềm mại', level: 2 },
  { id: 'sec-1-2', label: '2. Hình tam giác — Sự căng thẳng và hướng đi', level: 2 },
  { id: 'sec-1-3', label: '3. Hình vuông/chữ nhật — Sự ổn định và cứng rắn', level: 2 },
  { id: 'sec-2', label: 'Ⅱ. Từ hình dạng đến hình khối', level: 1 },
  { id: 'sec-2-1', label: '1. Ánh sáng tiết lộ hình khối', level: 2 },
  { id: 'sec-2-2', label: '2. Hình dạng hữu cơ vs hình học', level: 2 },
  { id: 'sec-3', label: 'Ⅲ. Hình dạng trong bố cục', level: 1 },
  { id: 'sec-3-1', label: '1. Hình dạng như cấu trúc', level: 2 },
  { id: 'sec-3-2', label: '2. Lặp lại và tương phản hình dạng', level: 2 },
  { id: 'sec-3-3', label: '3. Hình dạng dương và âm', level: 2 },
  { id: 'sec-4', label: 'Ⅳ. Gestalt và nhận thức hình dạng', level: 1 },
  { id: 'sec-4-1', label: '1. Closure — Hoàn thiện hình dạng', level: 2 },
  { id: 'sec-4-2', label: '2. Proximity — Gần nhau tạo nhóm', level: 2 },
  { id: 'sec-4-3', label: '3. Similarity — Giống nhau tạo nhóm', level: 2 },
  { id: 'sec-4-4', label: '4. Continuation — Tiếp tục hướng đi', level: 2 },
  { id: 'summary', label: 'Tóm tắt 7 điểm chính', level: 1 },
];

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */
export default function HinhDangPage() {
  const [isRead, setIsRead] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('alpha-doc-read');
      if (saved) {
        const readPages: string[] = JSON.parse(saved);
        if (readPages.includes('/hinh-dang')) setIsRead(true);
      }
    } catch {}
  }, []);

  const toggleRead = () => {
    try {
      const saved = localStorage.getItem('alpha-doc-read');
      const readPages: string[] = saved ? JSON.parse(saved) : [];
      if (isRead) {
        const updated = readPages.filter((p) => p !== '/hinh-dang');
        localStorage.setItem('alpha-doc-read', JSON.stringify(updated));
        setIsRead(false);
      } else {
        const updated = [...readPages, '/hinh-dang'];
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
          <span className="text-[#9d9db5]">Hình dạng hình khối</span>
        </div>

        {/* Badges */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold font-mono px-2 py-0.5 rounded bg-[rgba(124,138,255,0.1)] text-[#7c8aff]">
            HA5
          </span>
          <span className="text-[11px] text-[#6b6b80]">16 phút đọc · #HinhDang #HinhKhoi #Shape #Form #Gestalt #Geometry</span>
          <span className="elite-badge">
            <GraduationCap size={11} />
            Nâng cao
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-[#e4e4ed] leading-tight mb-3 border-none pb-0">
          Hình dạng hình khối
        </h1>

        {/* Subtitle */}
        <p className="text-base text-[#9d9db5] leading-relaxed mb-6" style={{ marginTop: 0 }}>
          Ngôn ngữ thị giác · Bài 5 — Từ hình học phẳng đến hình khối không gian: cách não bộ đọc hình và nhiếp ảnh gia sử dụng nó
        </p>

        {/* Hero image */}
        <div className="rounded-xl overflow-hidden border border-[#1e1e2a] mb-8">
          <img
            src="/hero-hinh-dang.webp"
            alt="Hình dạng hình khối - Ảnh minh họa"
            className="w-full h-auto object-cover"
            loading="eager"
          />
        </div>

        {/* Video bài học */}
        <LessonVideoPlayer video={lessonVideos['/hinh-dang']} />

        {/* Opening Quote */}
        <div className="quote-block">
          <p>
            &ldquo;Mọi bức ảnh đều là sự sắp xếp của các hình dạng — cho dù bạn có muốn hay không. Câu hỏi không phải là có sử dụng hình dạng hay không, mà là bạn có kiểm soát được chúng hay không.&rdquo;
          </p>
          <p className="quote-attr">— Rudolf Arnheim, Art and Visual Perception</p>
        </div>

        <p className="drop-cap">
          Khi bạn nhìn vào một bức ảnh trong chớp mắt — trước khi nhận ra đó là cái gì — não bộ đã phân giải nó thành các hình dạng. Một khuôn mặt là hình bầu dục, một tòa nhà là hình chữ nhật, một ngọn núi là hình tam giác. Quá trình này diễn ra trong chưa tới 100 mili-giây, và nó định hình toàn bộ cảm xúc đầu tiên của bạn về hình ảnh. <span className="key-concept">Hình dạng là đơn vị nhận thức cơ bản nhất</span> mà não bộ sử dụng để diễn giải thế giới thị giác — và hiểu cách nó hoạt động là chìa khóa để kiểm soát bố cục.
        </p>

        {/* ============================================================ */}
        {/*  SECTION I                                                    */}
        {/* ============================================================ */}
        <h2 id="sec-1" className="scroll-mt-20">
          <span className="section-num">Ⅰ</span>
          Hình dạng cơ bản
        </h2>

        <hr className="doc-divider" />

        {/* 1.1 */}
        <h3 id="sec-1-1" className="scroll-mt-20">
          1. Hình tròn — Sự thống nhất và mềm mại
        </h3>

        <p>
          Hình tròn là hình dạng hoàn hảo nhất — không có điểm bắt đầu, không có điểm kết thúc, không có góc nhọn. Trong tâm lý học thị giác, hình tròn gắn liền với sự <strong>thống nhất</strong> (unity), <strong>mềm mại</strong> (softness), và <strong>trọn vẹn</strong> (wholeness). Đó là lý do tại sao mặt trời, mặt trăng, và đồng hồ — những biểu tượng vĩnh cửu — đều là hình tròn.
        </p>

        <p>Trong nhiếp ảnh, hình tròn xuất hiện ở:</p>
        <ul className="factor-list">
          <li>
            <strong>Mắt và khuôn mặt:</strong> Hai hình tròn nhỏ trong khuôn mặt — mắt — là điểm hút thị giác mạnh nhất trong bất kỳ bức ảnh nào có người. Não bộ tiến hóa để tìm kiếm hình tròn của đôi mắt.
          </li>
          <li>
            <strong>Kiến trúc vòm:</strong> Cửa vòm, mái vòm, cửa sổ tròn — tất cả tạo ra sự mềm mại trong kiến trúc vốn nhiều góc cạnh.
          </li>
          <li>
            <strong>Vòng tròn nhân tạo:</strong> Bánh xe, đĩa, đồng hồ, cốc — hình tròn nhân tạo tạo điểm nhấn thị giác mạnh vì nó khác biệt với thế giới tự nhiên vốn nhiều đường thẳng.
          </li>
        </ul>

        <div className="callout callout-key">
          <div className="callout-title">
            <Lightbulb size={13} className="inline mr-1" />
            Tính chất tâm lý của hình tròn
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Nghiên cứu của Rudolf Arnheim cho thấy hình tròn được nhận thức là &ldquo;an toàn&rdquo; và &ldquo;thân thiện&rdquo; hơn bất kỳ hình dạng nào khác — vì nó không có góc nhọn để &ldquo;tấn công&rdquo; mắt. Ngược lại, khi hình tròn bị cắt xén một phần, nó ngay lập tức tạo ra cảm giác &ldquo;thiếu vắng&rdquo; — như một mặt trăng khuyết.
          </p>
        </div>

        <hr className="doc-divider" />

        {/* 1.2 */}
        <h3 id="sec-1-2" className="scroll-mt-20">
          2. Hình tam giác — Sự căng thẳng và hướng đi
        </h3>

        <p>
          Hình tam giác là hình dạng năng động nhất — nó có hướng đi rõ ràng (đỉnh tam giác), có sự căng thẳng nội tại (ba góc), và có khả năng tạo chiều sâu (tam giác phối cảnh). Trong nhiếp ảnh, tam giác là công cụ bố cục linh hoạt nhất.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <Triangle size={16} className="text-[#7c8aff]" />
              <span className="text-sm font-semibold text-[#e4e4ed]">Tam giác hướng lên</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Ổn định, vững chãi, thăng hoa. Như kim tự tháp — tam giác hướng lên truyền tải sức mạnh, sự kiên định, và tinh thần hướng thượng. Thường thấy trong kiến trúc tôn giáo và chân dung quyền lực.
            </p>
          </div>
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <Triangle size={16} className="text-[#fb7185]" style={{ transform: 'rotate(180deg)' }} />
              <span className="text-sm font-semibold text-[#e4e4ed]">Tam giác hướng xuống</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Bất ổn, lấp lửng, đè nén. Cảm giác như vật thể sắp rơi — tam giác ngược tạo ra sự căng thẳng, nguy hiểm tiềm ẩn, và đôi khi là sự tập trung áp lực vào một điểm.
            </p>
          </div>
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <Triangle size={16} className="text-[#ffcb6b]" style={{ transform: 'rotate(90deg)' }} />
              <span className="text-sm font-semibold text-[#e4e4ed]">Tam giác nghiêng</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Chuyển động, bất ổn, năng động. Tam giác bị nghiêng mất sự ổn định — tạo ra cảm giác hành động đang diễn ra, như một mũi tên đang bay.
            </p>
          </div>
        </div>

        <hr className="doc-divider" />

        {/* 1.3 */}
        <h3 id="sec-1-3" className="scroll-mt-20">
          3. Hình vuông/chữ nhật — Sự ổn định và cứng rắn
        </h3>

        <p>
          Hình vuông và chữ nhật là hình dạng của trật tự — bốn góc vuông, bốn cạnh bằng, không có sự bất ngờ. Trong nhiếp ảnh, chúng truyền tải <strong>sự ổn định</strong>, <strong>tính cấu trúc</strong>, và đôi khi là <strong>sự cứng nhắc</strong> hoặc <strong>đóng kín</strong>.
        </p>

        <p>
          Khung hình ảnh bản thân nó đã là một hình chữ nhật — và mọi hình dạng chữ nhật bên trong khung hình tự động tạo ra &ldquo;khung trong khung&rdquo;, một lớp cấu trúc lồng nhau. Cửa sổ, màn hình, gương — tất cả là những hình chữ nhật mà nhiếp ảnh gia có thể sử dụng để tạo chiều sâu thông qua sub-framing.
        </p>

        <div className="comparison-grid my-4">
          <div className="comp-card">
            <span className="sub-label">TÍNH CẤU TRÚC</span>
            <h4>Hình vuông</h4>
            <p>
              Cân bằng hoàn hảo, không thiên vị hướng nào. Tạo cảm giác ổn định tuyệt đối nhưng có thể nhàm chán. Khi muốn truyền tải sự cân bằng vĩnh cửu — như trong kiến trúc tối giản — hình vuông là lựa chọn đúng.
            </p>
          </div>
          <div className="comp-card" style={{ borderColor: '#ffcb6b44' }}>
            <span className="sub-label" style={{ color: '#ffcb6b', background: 'rgba(255,203,107,0.1)' }}>TÍNH ĐỊNH HƯỚNG</span>
            <h4>Hình chữ nhật</h4>
            <p>
              Chữ nhật ngang tạo cảm giác bình yên (như cảnh quan), chữ nhật dọc tạo cảm giác sức mạnh (như tòa nhà). Hướng dài hơn định hình hướng cảm xúc — đây là lý do chọn khung ngang hay dọc ảnh hưởng tâm trạng bức ảnh.
            </p>
          </div>
        </div>

        {/* ============================================================ */}
        {/*  SECTION II                                                   */}
        {/* ============================================================ */}
        <h2 id="sec-2" className="scroll-mt-20">
          <span className="section-num">Ⅱ</span>
          Từ hình dạng đến hình khối
        </h2>

        <hr className="doc-divider" />

        {/* 2.1 */}
        <h3 id="sec-2-1" className="scroll-mt-20">
          1. Ánh sáng tiết lộ hình khối
        </h3>

        <p>
          Trên mặt phẳng hai chiều của bức ảnh, hình khối 3D chỉ tồn tại nhờ ánh sáng. Không có ánh sáng, mọi thứ đều phẳng. Ánh sáng tạo ra <span className="key-concept">gradient từ sáng đến tối</span> — và gradient này là thứ mà não bộ đọc như &ldquo;chiều sâu&rdquo; và &ldquo;thể tích&rdquo;.
        </p>

        <div className="overflow-x-auto my-4 rounded-lg border border-[#1e1e2a]">
          <table className="doc-table">
            <thead>
              <tr>
                <th>Loại ánh sáng</th>
                <th>Hiệu ứng trên hình khối</th>
                <th>Cảm xúc tạo ra</th>
                <th>Ứng dụng</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Ánh sáng bên (Side light)</td>
                <td>Tạo gradient rõ rệt, hình khối nổi bật</td>
                <td>Kịch tính, mạnh mẽ, xác định</td>
                <td>Chân dung, tĩnh vật, kiến trúc</td>
              </tr>
              <tr>
                <td>Ánh sáng trước (Front light)</td>
                <td>Làm phẳng hình khối, giảm gradient</td>
                <td>Bình phẳng, trung thực, thiếu chiều</td>
                <td>Ảnh thẻ, thời trang, tư liệu</td>
              </tr>
              <tr>
                <td>Ánh sáng sau (Back light)</td>
                <td>Tạo viền sáng, hình khối thành silhouette</td>
                <td>Bí ẩn, kịch tính, đồ họa</td>
                <td>Hình silhouét, hoàng hôn, chân dung nghệ thuật</td>
              </tr>
              <tr>
                <td>Ánh sáng trên (Top light)</td>
                <td>Tạo bóng dưới, hình khối bất tự nhiên</td>
                <td>Đáng sợ, bí ẩn, siêu thực</td>
                <td>Phim kinh dị, ảnh thực nghiệm</td>
              </tr>
              <tr>
                <td>Ánh sáng dưới (Bottom light)</td>
                <td>Đảo ngược gradient tự nhiên</td>
                <td>Bất thường, đáng sợ, kỳ dị</td>
                <td>Hiệu ứng rùng rợn, kể chuyện ma</td>
              </tr>
            </tbody>
          </table>
        </div>

        <hr className="doc-divider" />

        {/* 2.2 */}
        <h3 id="sec-2-2" className="scroll-mt-20">
          2. Hình dạng hữu cơ vs hình học
        </h3>

        <p>
          Trong nhiếp ảnh, tất cả hình dạng rơi vào hai nhóm lớn: <strong>hình học</strong> (geometric) — do con người tạo ra, có quy luật, sắc nét, dự đoán được — và <strong>hữu cơ</strong> (organic) — do tự nhiên tạo ra, tự do, mềm mại, bất đối xứng.
        </p>

        <div className="comparison-grid my-4">
          <div className="comp-card">
            <span className="sub-label">HÌNH HỌC</span>
            <h4>Geometric Shapes</h4>
            <p>
              Tòa nhà, đường phố, nội thất, đồ vật sản xuất — hình dạng hình học truyền tải sự trật tự, kiểm soát, văn minh. Chúng tạo cảm giác an toàn nhưng có thể lạnh lùng. Nhiếp ảnh kiến trúc và minimalism sống nhờ hình học.
            </p>
          </div>
          <div className="comp-card" style={{ borderColor: '#22c55e44' }}>
            <span className="sub-label" style={{ color: '#22c55e', background: 'rgba(34,197,94,0.1)' }}>HỮU CƠ</span>
            <h4>Organic Shapes</h4>
            <p>
              Cây cối, đám mây, dòng nước, cơ thể người — hình dạng hữu cơ truyền tải sự tự do, tự nhiên, và sinh động. Chúng tạo cảm giác ấm áp nhưng có thể hỗn loạn. Nhiếp ảnh thiên nhiên và chân dung sống nhờ hữu cơ.
            </p>
          </div>
        </div>

        <div className="callout callout-photo">
          <div className="callout-title">
            <Camera size={13} className="inline mr-1" />
            Sự tương phản mạnh nhất: Hình học vs Hữu cơ
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Một người đứng trước bức tường bê tông. Một cái cây mọc lên từ khe đường nhựa. Một cơ thể cong nằm trên giường thẳng. Khi hình học và hữu cơ tồn tại trong cùng một khung hình, sự tương phản tạo ra năng lượng thị giác cực lớn — và đây là một trong những kỹ thuật bố cục mạnh mẽ nhất mà nhiếp ảnh gia đường phố thường khai thác.
          </p>
        </div>

        {/* ============================================================ */}
        {/*  SECTION III                                                  */}
        {/* ============================================================ */}
        <h2 id="sec-3" className="scroll-mt-20">
          <span className="section-num">Ⅲ</span>
          Hình dạng trong bố cục
        </h2>

        <hr className="doc-divider" />

        {/* 3.1 */}
        <h3 id="sec-3-1" className="scroll-mt-20">
          1. Hình dạng như cấu trúc
        </h3>

        <p>
          Trong bất kỳ bức ảnh nào, hình dạng hoạt động ở hai tầng: <strong>tầng biểu đạt</strong> (hình dạng của chính chủ thể — khuôn mặt, tòa nhà, cái cây) và <strong>tầng cấu trúc</strong> (hình dạng mà các chủ thể tạo ra khi kết hợp với nhau). Tầng cấu trúc thường quan trọng hơn — vì nó quyết định cách mắt di chuyển qua bức ảnh.
        </p>

        <p>
          Khi squint mắt (nheo mắt) nhìn vào một bức ảnh, bạn sẽ thấy tầng cấu trúc rõ ràng hơn — tất cả chi tiết nhỏ biến mất, chỉ còn lại những khối hình dạng lớn. Đây là cách nhiều nhiếp ảnh gia chuyên nghiệp kiểm tra bố cục: nếu bố cục không hoạt động khi squint, nó sẽ không hoạt động khi nhìn bình thường.
        </p>

        <div className="callout callout-key">
          <div className="callout-title">
            <Lightbulb size={13} className="inline mr-1" />
            Bài tập squint test
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Nheo mắt nhìn vào ảnh của bạn. Nếu bạn chỉ thấy 2-3 hình dạng lớn với trọng lượng thị giác rõ ràng — bố cục tốt. Nếu bạn thấy mảng xám hỗn độn không có cấu trúc — cần đơn giản hóa. Bài tập này giúp bạn tư duy bằng hình dạng thay vì chi tiết.
          </p>
        </div>

        {/* Visual Deconstruction Lab - Portrait Preset */}
        <VisualDeconstructionLab defaultPreset="portrait" />

        <hr className="doc-divider" />

        {/* 3.2 */}
        <h3 id="sec-3-2" className="scroll-mt-20">
          2. Lặp lại và tương phản hình dạng
        </h3>

        <p>
          Sự lặp lại hình dạng tạo ra <span className="key-concept">pattern</span> — một trong những công cụ thị giác mạnh nhất vì não bộ tự động tìm kiếm và tận hưởng sự lặp lại. Nhưng pattern thuần túy có thể nhàm chán. Điều khiến pattern thú vị là <strong>sự gián đoạn</strong> — khi một hình dạng khác phá vỡ quy luật.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <Layers size={16} className="text-[#7c8aff]" />
              <span className="text-sm font-semibold text-[#e4e4ed]">Lặp lại cùng loại</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Nhiều hình tròn, nhiều hình chữ nhật, nhiều tam giác — tạo sự hài hòa, trật tự, và nhịp điệu. Hàng cột trong đền Hy Lạp, hàng cây dọc đường, dãy cửa sổ trên tòa nhà — tất cả đều là lặp lại cùng loại hình dạng.
            </p>
          </div>
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <Eye size={16} className="text-[#fb7185]" />
              <span className="text-sm font-semibold text-[#e4e4ed]">Tương phản hình dạng</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Hình tròn cạnh hình vuông, hình hữu cơ cạnh hình học — sự tương phản tạo ra năng lượng thị giác. Một bóng bay tròn trên nền tường vuông vức, một thân cây mềm mại bên cạnh cột bê tông — tương phản hình dạng là chất xúc tác cho sự chú ý.
            </p>
          </div>
        </div>

        <hr className="doc-divider" />

        {/* 3.3 */}
        <h3 id="sec-3-3" className="scroll-mt-20">
          3. Hình dạng dương và âm
        </h3>

        <p>
          Trong mọi bức ảnh, hình dạng tồn tại ở hai dạng: <strong>dương</strong> (positive shape — chủ thể, vật thể chiếm không gian) và <strong>âm</strong> (negative shape — không gian xung quanh, khoảng trống giữa các chủ thể). Đa số người chỉ nhìn hình dạng dương — nhưng nhiếp ảnh gia giỏi thiết kế hình dạng âm với cùng mức độ kiểm soát.
        </p>

        <p>
          Khi hình dạng âm trở nên thú vị như hình dạng dương — khi nó có đường nét rõ ràng, có trọng lượng thị giác, và &ldquo;kể chuyện&rdquo; — bức ảnh đạt đến một cấp độ mới của tinh tế. Fan Ho là bậc thầy của hình dạng âm: trong ảnh của ông, bóng tối không phải là sự thiếu vắng ánh sáng — nó là một hình dạng có ý nghĩa riêng.
        </p>

        <div className="callout callout-warning">
          <div className="callout-title">
            <AlertTriangle size={13} className="inline mr-1" />
            Lỗi phổ biến: Bỏ qua hình dạng âm
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Khi chỉ tập trung vào chủ thể (hình dương) mà bỏ qua khoảng trống (hình âm), hình dạng âm thường vô tình tạo ra những hình thù kỳ lạ — mũi tên chỉ hướng sai, hình dáng giống mặt người, hoặc khoảng trống không đều — gây nhiễu thị giác mà nhiếp ảnh gia không nhận ra.
          </p>
        </div>

        {/* ============================================================ */}
        {/*  SECTION IV                                                   */}
        {/* ============================================================ */}
        <h2 id="sec-4" className="scroll-mt-20">
          <span className="section-num-elite section-num">Ⅳ</span>
          Gestalt và nhận thức hình dạng
        </h2>

        <hr className="doc-divider" />

        <p>
          Tâm lý học Gestalt (chủ nghĩa hình thái) giải thích cách não bộ tổ chức các phần tử thị giác thành toàn thể có ý nghĩa. Bốn nguyên lý Gestalt quan trọng nhất đối với nhiếp ảnh gia:
        </p>

        {/* 4.1 */}
        <h3 id="sec-4-1" className="scroll-mt-20">
          1. Closure — Hoàn thiện hình dạng
        </h3>

        <p>
          Khi não bộ nhìn thấy một hình dạng không hoàn chỉnh — một vòng tròn bị hở, một tam giác thiếu cạnh — nó tự động &ldquo;hoàn thiện&rdquo; hình dạng trong tâm trí. Đây là nguyên lý <span className="key-concept">closure</span>, và nó là nền tảng của nhiếp ảnh tinh tế.
        </p>

        <p>
          Bức ảnh không cần phải cho người xem thấy tất cả. Khi bạn chỉ nhìn thấy một phần của khuôn mặt sau góc tường — não bộ tự động hoàn thiện phần còn lại — và quá trình đó khiến người xem tham gia tích cực vào hình ảnh, khiến nó ghi nhớ sâu hơn.
        </p>

        <hr className="doc-divider" />

        {/* 4.2 */}
        <h3 id="sec-4-2" className="scroll-mt-20">
          2. Proximity — Gần nhau tạo nhóm
        </h3>

        <p>
          Khi các phần tử ở gần nhau, não bộ tự động nhóm chúng thành một đơn vị nhận thức. Ba người đứng gần nhau được đọc là &ldquo;một nhóm&rdquo;, không phải &ldquo;ba cá nhân riêng biệt&rdquo;. Nhiếp ảnh gia sử dụng proximity để tạo hoặc phá vỡ nhóm — và qua đó, kiểm soát cách người xem đọc bức ảnh.
        </p>

        <hr className="doc-divider" />

        {/* 4.3 */}
        <h3 id="sec-4-3" className="scroll-mt-20">
          3. Similarity — Giống nhau tạo nhóm
        </h3>

        <p>
          Các phần tử có hình dạng, màu sắc, hoặc kích thước tương tự được não bộ nhóm lại — ngay cả khi chúng ở xa nhau. Đây là lý do tại sao một chiếc áo đỏ trong đám đông tạo ra sự kết nối thị giác mạnh: não bộ tìm kiếm và nhóm tất cả các hình dạng đỏ lại với nhau.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <Circle size={16} className="text-[#7c8aff]" />
              <span className="text-sm font-semibold text-[#e4e4ed]">Similarity hình dạng</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Nhiều hình tròn trong cùng khung hình tự động tạo ra nhóm — dù chúng là vật thể hoàn toàn khác nhau. Mắt, bánh xe, quả bóng — tất cả kết nối vì hình dạng.
            </p>
          </div>
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <Box size={16} className="text-[#ffcb6b]" />
              <span className="text-sm font-semibold text-[#e4e4ed]">Similarity màu sắc</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Các vật thể cùng màu được nhóm lại dù hình dạng khác nhau — đây là cơ sở của color coding trong thiết kế và sử dụng màu chủ đạo trong portfolio.
            </p>
          </div>
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <Square size={16} className="text-emerald-400" />
              <span className="text-sm font-semibold text-[#e4e4ed]">Similarity kích thước</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Các vật thể cùng kích thước tạo nhóm — dù nội dung khác. Điều này đặc biệt quan trọng trong bố cục nhiều chủ thể.
            </p>
          </div>
        </div>

        <hr className="doc-divider" />

        {/* 4.4 */}
        <h3 id="sec-4-4" className="scroll-mt-20">
          4. Continuation — Tiếp tục hướng đi
        </h3>

        <p>
          Khi mắt bắt đầu di chuyển theo một hướng — theo một đường nét, một hàng phần tử, một gradient — nó có xu hướng tiếp tục theo hướng đó cho đến khi gặp trở ngại. Nguyên lý <span className="key-concept">continuation</span> là nền tảng của leading lines và visual flow — và nó cho phép nhiếp ảnh gia điều khiển mắt người xem mà họ không hề hay biết.
        </p>

        <div className="quote-block">
          <p>
            &ldquo;Hình dạng không phải là thứ bạn nhìn thấy — nó là thứ bạn nhận thức. Và sự khác biệt giữa nhìn và nhận thức chính là khoảng cách giữa một bức ảnh và một tác phẩm nghệ thuật.&rdquo;
          </p>
          <p className="quote-attr">— Rudolf Arnheim</p>
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
              Hình dạng là đơn vị nhận thức cơ bản nhất — não bộ phân giải hình ảnh thành hình dạng trước khi nhận diện nội dung.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">02</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Ba hình dạng cơ bản: tròn (thống nhất/mềm mại), tam giác (căng thẳng/hướng đi), vuông/chữ nhật (ổn định/cứng rắn).
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">03</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Hình khối 3D chỉ tồn tại trên ảnh nhờ ánh sáng — side light tiết lộ hình khối mạnh nhất, front light làm phẳng.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">04</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Tương phản hình học vs hữu cơ là một trong những kỹ thuật bố cục mạnh mẽ nhất — tạo năng lượng thị giác cực lớn.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">05</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Squint test (nheo mắt) giúp kiểm tra tầng cấu trúc của bố cục — nếu không hoạt động khi squint, nó sẽ không hoạt động.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">06</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Hình dạng âm (negative shape) quan trọng ngang hình dạng dương — thiết kế nó với cùng mức độ kiểm soát.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">07</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Bốn nguyên lý Gestalt: Closure (hoàn thiện), Proximity (gần nhau), Similarity (giống nhau), Continuation (tiếp tục).
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
              Squint test không chỉ để kiểm tra composition — nó là cách bạn nhìn ảnh như <strong>não bộ tầng đầu tiên</strong> nhìn: chỉ thấy hình dạng lớn và tương phản. Nếu ảnh không "đọc" được khi squinting — nếu bạn không thể mô tả nó chỉ bằng vài hình dạng cơ bản — nó sẽ không tác động được ở mức vô thức. Tất cả kỹ thuật tinh tế khác đều vô nghĩa nếu bước này thất bại.
            </p>
          </div>
          <div className="callout callout-pitfall">
            <div className="callout-title">⚠ Bẫy chuyên gia</div>
            <p style={{ marginBottom: 0, lineHeight: 1.75 }}>
              Cố gắng đặt chủ thể vào frame theo hình dạng đẹp nhưng quên rằng <strong>hình dạng của KHOẢNG TRỐNG xung quanh</strong> cũng quan trọng không kém. Negative space shape quyết định cảm giác "thở" của ảnh. Một tam giác chủ thể đẹp bên trong một khoảng trống lộn xộn vẫn tạo ra ảnh tệ. Luôn nhìn cả hai: hình dạng chủ thể VÀ hình dạng khoảng trống.
            </p>
          </div>
          <div className="practice-exercise">
            <div className="practice-header">⬥ Bài tập thực chiến — Giải phẫu hình dạng</div>
            <div className="practice-body">
              <p>Học cách "đọc" bố cục như một kiến trúc sư thị giác:</p>
              <ol className="practice-steps">
                <li><strong>Chọn 5 ảnh yêu thích</strong> của bất kỳ nhiếp ảnh gia nào bạn ngưỡng mộ.</li>
                <li><strong>Phác thảo bằng bút chì:</strong> Vẽ lại mỗi ảnh chỉ bằng các khối hình học đơn giản — tam giác, hình tròn, chữ nhật. Không chi tiết.</li>
                <li><strong>Nhận diện cấu trúc:</strong> Hình dạng nào dominant? Hình dạng khoảng trống là gì? Có đường chéo không?</li>
                <li><strong>Kết luận:</strong> Bạn sẽ hiểu tại sao những ảnh đó "cảm giác đúng" — không phải vì kỹ thuật mà vì cấu trúc hình học.</li>
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
          <Link href="/duong-net" className="group nav-card">
            <div className="nav-card-label">← Bài trước</div>
            <div className="nav-card-title">4. Đường nét cảm xúc</div>
            <div className="nav-card-desc">Ngôn ngữ thị giác</div>
          </Link>
          <Link href="/khong-gian" className="group nav-card text-right">
            <div className="nav-card-label">Bài tiếp →</div>
            <div className="nav-card-title">6. Không gian âm dương</div>
            <div className="nav-card-desc">Ngôn ngữ thị giác</div>
          </Link>
        </div>

        {/* Footer */}
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
              <a href="/hinh-dang" className="block hover:text-[#7c8aff] transition-colors">Hình dạng hình khối</a>
              <a href="/khong-gian" className="block hover:text-[#7c8aff] transition-colors">Không gian âm dương</a>
              <a href="/anh-sang" className="block hover:text-[#7c8aff] transition-colors">Ánh sáng bóng tối</a>
            </div>
            <div>
              <p className="font-semibold text-[#9d9db5] mb-2">Bố cục</p>
              <span className="block text-[#3a3a4a]">Bố cục</span>
              <span className="block text-[#3a3a4a]">Góc chụp</span>
              <span className="block text-[#3a3a4a]">Tiêu điểm & Độ sâu</span>
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

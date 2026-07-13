

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
  Scale,
  Eye,
  Target,
  Sparkles,
  BookOpen,
  Check,
  Layers,
  Move,
  Zap,
  Grid3X3,
} from 'lucide-react';
import DocsLayout from '@/components/docs-layout';

/* ------------------------------------------------------------------ */
/*  TOC Data                                                          */
/* ------------------------------------------------------------------ */
const tocSections = [
  { id: 'sec-1', label: 'Ⅰ. Trọng lượng thị giác', level: 1 },
  { id: 'sec-1-1', label: '1. Visual Weight là gì', level: 2 },
  { id: 'sec-1-2', label: '2. Các yếu tố quyết định Visual Weight', level: 2 },
  { id: 'sec-2', label: 'Ⅱ. Cân bằng Tĩnh', level: 1 },
  { id: 'sec-2-1', label: '1. Định nghĩa và đặc điểm', level: 2 },
  { id: 'sec-2-2', label: '2. Đối xứng — Dạng cân bằng tĩnh mạnh nhất', level: 2 },
  { id: 'sec-2-3', label: '3. Khi nào nên dùng cân bằng tĩnh', level: 2 },
  { id: 'sec-3', label: 'Ⅲ. Cân bằng Động', level: 1 },
  { id: 'sec-3-1', label: '1. Định nghĩa và bản chất', level: 2 },
  { id: 'sec-3-2', label: '2. Cơ chế của cân bằng động', level: 2 },
  { id: 'sec-3-3', label: '3. Bất cân bằng có chủ đích', level: 2 },
  { id: 'sec-4', label: 'Ⅳ. Cân bằng trong thực hành', level: 1 },
  { id: 'sec-4-1', label: '1. Đọc visual weight trước khi bấm máy', level: 2 },
  { id: 'sec-4-2', label: '2. Công cụ tạo cân bằng thị giác', level: 2 },
  { id: 'sec-4-3', label: '3. Cân bằng trong các thể loại nhiếp ảnh', level: 2 },
  { id: 'sec-5', label: 'Ⅴ. Cân bằng và Cảm xúc', level: 1 },
  { id: 'sec-5-1', label: '1. Tâm lý học của cân bằng tĩnh', level: 2 },
  { id: 'sec-5-2', label: '2. Tâm lý học của cân bằng động', level: 2 },
  { id: 'sec-5-3', label: '3. Cân bằng và sự chuyển động — Frozen Motion', level: 2 },
  { id: 'sec-6', label: 'Ⅵ. Cân bằng nâng cao', level: 1 },
  { id: 'sec-6-1', label: '1. Cân bằng đa lớp', level: 2 },
  { id: 'sec-6-2', label: '2. Cân bằng theo thời gian — Series và Narrative', level: 2 },
  { id: 'sec-7', label: 'Ⅶ. Ứng dụng thực hành', level: 1 },
  { id: 'sec-7-1', label: '1. Bài tập "Phân tích cân bằng"', level: 2 },
  { id: 'sec-7-2', label: '2. Bài tập "Tái tạo cân bằng"', level: 2 },
  { id: 'sec-7-3', label: '3. Bài tập "Chụp cùng chủ thể với hai loại cân bằng"', level: 2 },
  { id: 'summary', label: 'Tóm tắt 8 điểm chính', level: 1 },
];

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */
export default function CanBangPage() {
  const [isRead, setIsRead] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('alpha-doc-read');
      if (saved) {
        const readPages: string[] = JSON.parse(saved);
        if (readPages.includes('/can-bang')) setIsRead(true);
      }
    } catch {}
  }, []);

  const toggleRead = () => {
    try {
      const saved = localStorage.getItem('alpha-doc-read');
      const readPages: string[] = saved ? JSON.parse(saved) : [];
      if (isRead) {
        const updated = readPages.filter((p) => p !== '/can-bang');
        localStorage.setItem('alpha-doc-read', JSON.stringify(updated));
        setIsRead(false);
      } else {
        const updated = [...readPages, '/can-bang'];
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
          <a href="#">Nguyên tắc vận hành</a>
          <ChevronRight size={12} />
          <span className="text-[#9d9db5]">Cân bằng Tĩnh & Động</span>
        </div>

        {/* Badges */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold font-mono px-2 py-0.5 rounded bg-[rgba(124,138,255,0.1)] text-[#7c8aff]">
            HA17
          </span>
          <span className="text-[11px] text-[#6b6b80]">16 phút đọc · #CanBang #TinhDong #BoCuc #NguyenTacVanHanh</span>
          <span className="elite-badge">
            <GraduationCap size={11} />
            Nâng cao
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-[#e4e4ed] leading-tight mb-3 border-none pb-0">
          Cân bằng Tĩnh & Động
        </h1>

        {/* Subtitle */}
        <p className="text-base text-[#9d9db5] leading-relaxed mb-6" style={{ marginTop: 0 }}>
          Nguyên tắc vận hành · Bài 17 — Khi hình ảnh đứng yên — nhưng năng lượng không bao giờ ngừng chảy
        </p>

        {/* Hero image */}
        <div className="color-overview-hero rounded-xl overflow-hidden border border-[#1e1e2a] mb-8">
          <img
            src="/hero-can-bang.png"
            alt="Infographic tổng quan về cân bằng tĩnh và động trong nhiếp ảnh: trọng lượng thị giác, cân bằng tĩnh, cân bằng động và cách kiểm tra cân bằng"
            className="w-full h-auto object-contain"
            loading="eager"
          />
        </div>

        {/* Video bài học */}
        <LessonVideoPlayer video={lessonVideos['/can-bang']} />

        {/* Opening Quote */}
        <div className="quote-block">
          <p>
            &ldquo;Nghệ thuật là việc tìm thấy trật tự trong sự hỗn độn.&rdquo; — Henri Matisse
          </p>
        </div>

        {/* Introduction */}
        <p className="drop-cap">
          Có một câu hỏi mà mọi người chụp ảnh đều đối mặt, dù không phải lúc nào cũng đặt ra một cách có ý thức: Hình ảnh này có cảm giác &ldquo;đúng&rdquo; không? Không phải về mặt kỹ thuật. Không phải về mặt thông điệp. Mà về một cảm giác sâu hơn — cảm giác rằng mọi thứ trong khung hình đang ở đúng chỗ, đang hoạt động đúng chức năng, và toàn bộ đang nói cùng một ngôn ngữ.
        </p>

        <p>
          Cảm giác &ldquo;đúng&rdquo; đó, phần lớn, là sản phẩm của sự cân bằng — không phải cân bằng toán học, không phải đối xứng hoàn hảo, mà là sự cân bằng thị giác sống động: trạng thái mà các lực lượng trong khung hình đang tương tác với nhau theo cách tạo ra hoặc sự ổn định (tĩnh) hoặc sự chuyển động có kiểm soát (động).
        </p>

        <p>
          Đây là chương Nguyên tắc vận hành — và cân bằng là nguyên tắc đầu tiên vì nó là nền tảng của tất cả những nguyên tắc còn lại. Không có cân bằng, không có bố cục. Chỉ có sự hỗn độn.
        </p>

        {/* ============================================================ */}
        {/*  SECTION I                                                    */}
        {/* ============================================================ */}
        <h2 id="sec-1" className="scroll-mt-20">
          <span className="section-num">Ⅰ</span>
          Trọng lượng thị giác — Nền tảng của mọi cân bằng
        </h2>

        <hr className="doc-divider" />

        {/* 1.1 */}
        <h3 id="sec-1-1" className="scroll-mt-20">
          1. Visual Weight là gì — Và tại sao nó không phải là kích thước vật lý
        </h3>

        <p>
          Trọng lượng thị giác (visual weight) là mức độ thu hút sự chú ý mà một yếu tố trong khung hình tạo ra — và nó không nhất thiết tương quan với kích thước vật lý hay diện tích chiếm giữ. Một điểm đỏ nhỏ trong khung hình trung tính có thể có visual weight lớn hơn một khối xám lớn chiếm nửa khung. Một khuôn mặt người nhỏ ở góc ảnh có thể nặng hơn cả một tảng đá lớn ở trung tâm.
        </p>

        <p>
          Não người không phân bổ sự chú ý đồng đều — nó bị kéo về phía những yếu tố có visual weight cao hơn, và toàn bộ cảm giác về sự cân bằng của hình ảnh phụ thuộc vào cách các visual weight được phân bổ trong khung hình. Khi phân bổ đó tạo ra cảm giác ổn định — cân bằng. Khi nó tạo ra cảm giác căng thẳng có hệ thống — cân bằng động. Khi nó hỗn độn và không có hệ thống — mất cân bằng.
        </p>

        <hr className="doc-divider" />

        {/* 1.2 */}
        <h3 id="sec-1-2" className="scroll-mt-20">
          2. Các yếu tố quyết định Visual Weight
        </h3>

        <p>Năm yếu tố quyết định trọng lượng thị giác:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[#7c8aff]"><Layers size={16} /></span>
              <span className="text-sm font-semibold text-[#e4e4ed]">Kích thước (Size)</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Vật lớn hơn nặng hơn. Một ngọn núi chiếm 60% khung hình sẽ nặng hơn một con người ở góc đối diện. Đây là yếu tố trực quan và dễ nhận biết nhất.
            </p>
          </div>
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[#ffcb6b]"><Eye size={16} /></span>
              <span className="text-sm font-semibold text-[#e4e4ed]">Màu sắc (Color)</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Màu ấm (đỏ, cam, vàng) nặng hơn màu lạnh (xanh lam, xanh lục). Màu bão hòa nặng hơn màu nhạt. Một điểm đỏ nhỏ có thể cân bằng một vùng xanh lớn.
            </p>
          </div>
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-emerald-400"><Target size={16} /></span>
              <span className="text-sm font-semibold text-[#e4e4ed]">Vị trí (Position)</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Yếu tố ở rìa khung hình nặng hơn yếu tố ở trung tâm. Yếu tố ở nửa trên nặng hơn nửa dưới. Yếu tố ở bên phải thường nặng hơn bên trái (do thói quen đọc từ trái sang phải).
            </p>
          </div>
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[#a855f7]"><Sparkles size={16} /></span>
              <span className="text-sm font-semibold text-[#e4e4ed]">Độ phức tạp (Complexity)</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Vùng chi tiết dày đặc nặng hơn vùng đơn giản. Một khu rừng với nhiều chi tiết sẽ nặng hơn một bầu trời đồng nhất cùng kích thước.
            </p>
          </div>
          <div className="hotspot-card sm:col-span-2">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[#fb7185]"><Scale size={16} /></span>
              <span className="text-sm font-semibold text-[#e4e4ed]">Sự cô lập (Isolation)</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Một vật thể đứng một mình trong không gian âm nặng hơn một vật thể cùng kích thước bị bao quanh bởi các yếu tố khác. Sự cô lập tạo ra trọng lượng tâm lý.
            </p>
          </div>
        </div>

        {/* ============================================================ */}
        {/*  SECTION II                                                   */}
        {/* ============================================================ */}
        <h2 id="sec-2" className="scroll-mt-20">
          <span className="section-num">Ⅱ</span>
          Cân bằng Tĩnh — Ổn định, Trang trọng, Hoàn chỉnh
        </h2>

        <hr className="doc-divider" />

        {/* 2.1 */}
        <h3 id="sec-2-1" className="scroll-mt-20">
          1. Định nghĩa và đặc điểm
        </h3>

        <p>
          Cân bằng tĩnh (static balance) là trạng thái khi visual weight được phân bổ đều đặn và đối xứng trong khung hình, tạo ra cảm giác ổn định, nghỉ ngơi, và hoàn chỉnh. Đây là cân bằng của sự yên tĩnh — không có lực lượng nào đang &ldquo;thắng&rdquo; hay &ldquo;thua&rdquo;, không có năng lượng nào đang di chuyển theo một hướng cụ thể.
        </p>

        <p>
          Cân bằng tĩnh không đồng nghĩa với nhàm chán hay thiếu sức sống — khi được sử dụng đúng ngữ cảnh, nó tạo ra cảm giác trang trọng, thiêng liêng, vĩnh cửu, và sự hoàn chỉnh tuyệt đối. Kiến trúc cổ điển, chân dung quyền uy, ảnh thiền định — tất cả khai thác cân bằng tĩnh như ngôn ngữ chính.
        </p>

        <hr className="doc-divider" />

        {/* 2.2 */}
        <h3 id="sec-2-2" className="scroll-mt-20">
          2. Đối xứng — Dạng cân bằng tĩnh mạnh nhất
        </h3>

        <div className="comparison-grid my-4">
          <div className="comp-card">
            <span className="sub-label" style={{ color: '#7c8aff', background: 'rgba(124,138,255,0.1)' }}>DỌC</span>
            <h4>Đối xứng dọc (Vertical Symmetry)</h4>
            <p>
              Đối xứng dọc — trái và phải giống nhau qua trục dọc — là dạng đối xứng phổ biến nhất và mạnh nhất trong hình ảnh. Nó tạo ra cảm giác trang trọng, uy quyền, và sự hoàn chỉnh tuyệt đối. Mặt tiền đền thờ, khuôn mặt người nhìn thẳng, phản chiếu trên mặt nước — đây là những biểu hiện tự nhiên của đối xứng dọc. Trong nhiếp ảnh kiến trúc, đối xứng dọc được sử dụng để nhấn mạnh sự hoàn hảo của thiết kế và ý chí kiến tạo của con người.
            </p>
          </div>
          <div className="comp-card" style={{ borderColor: '#ffcb6b44' }}>
            <span className="sub-label" style={{ color: '#ffcb6b', background: 'rgba(255,203,107,0.1)' }}>NGANG</span>
            <h4>Đối xứng ngang (Horizontal Symmetry)</h4>
            <p>
              Đối xứng ngang — trên và dưới giống nhau qua trục ngang — thường xuất hiện trong ảnh phản chiếu: bầu trời phản chiếu trên mặt nước, tòa nhà phản chiếu trong hồ. Nó tạo ra cảm giác vô hạn và thiền định — thực tế và phản chiếu cùng tồn tại trong một sự hoàn chỉnh mà không phần nào ưu việt hơn phần kia. Hiroshi Sugimoto và nhiều nhiếp ảnh gia phong cảnh fine art khai thác đối xứng ngang như công cụ triết học.
            </p>
          </div>
          <div className="comp-card" style={{ borderColor: '#a855f744' }}>
            <span className="sub-label" style={{ color: '#a855f7', background: 'rgba(168,85,247,0.1)' }}>XUYÊN TÂM</span>
            <h4>Đối xứng xuyên tâm (Radial Symmetry)</h4>
            <p>
              Đối xứng xuyên tâm — các yếu tố tỏa ra từ một trung tâm theo tất cả các hướng đều nhau — tạo ra cảm giác trung tâm rất mạnh và sự chuyển động hướng vào (hoặc ra) từ điểm đó. Bông tuyết, mắt nhìn thẳng, vòm nhà thờ nhìn từ dưới lên — đây là những ví dụ đối xứng xuyên tâm tự nhiên và mạnh mẽ.
            </p>
          </div>
        </div>

        <hr className="doc-divider" />

        {/* 2.3 */}
        <h3 id="sec-2-3" className="scroll-mt-20">
          3. Khi nào nên dùng cân bằng tĩnh
        </h3>

        <ul className="factor-list">
          <li>
            <strong>Portrait trang trọng và quyền uy:</strong> Người nhìn thẳng vào camera, đặt ở trung tâm khung hình với đối xứng dọc — tạo ra cảm giác họ đang nhìn thẳng vào mắt người xem với sự tự tin hoàn toàn.
          </li>
          <li>
            <strong>Kiến trúc và không gian thiết kế:</strong> Khi muốn tôn vinh sự hoàn hảo của thiết kế và tính đối xứng có chủ đích của công trình.
          </li>
          <li>
            <strong>Ảnh thiên nhiên tĩnh lặng:</strong> Phản chiếu trên mặt hồ lúc bình minh, cánh đồng mùa tuyết — khi sự yên bình và vô tận là thông điệp chính.
          </li>
          <li>
            <strong>Still life và product photography:</strong> Sắp xếp đối xứng tạo ra cảm giác trật tự, sang trọng, và kiểm soát hoàn hảo.
          </li>
          <li>
            <strong>Fine art tối giản:</strong> Khi sự hoàn chỉnh và tính tuyệt đối là ngôn ngữ nghệ thuật.
          </li>
        </ul>

        {/* ============================================================ */}
        {/*  SECTION III                                                  */}
        {/* ============================================================ */}
        <h2 id="sec-3" className="scroll-mt-20">
          <span className="section-num">Ⅲ</span>
          Cân bằng Động — Năng lượng, Chuyển động, Căng thẳng có kiểm soát
        </h2>

        <hr className="doc-divider" />

        {/* 3.1 */}
        <h3 id="sec-3-1" className="scroll-mt-20">
          1. Định nghĩa và bản chất
        </h3>

        <p>
          Cân bằng động (dynamic balance) là trạng thái khi visual weight được phân bổ bất đối xứng nhưng vẫn tạo ra cảm giác cân bằng tổng thể — vì các lực lượng khác nhau đang tương tác với nhau theo cách có hệ thống. Đây là cân bằng của sự chuyển động: không có gì đang đứng yên, nhưng không có gì đang rơi hay vỡ.
        </p>

        <p>
          Cân bằng động là ngôn ngữ của sự sống — vì cuộc sống không đối xứng, không tĩnh lặng. Một người đang bước đi, một cành cây trong gió, một con sóng sắp vỡ — tất cả đều ở trạng thái cân bằng động. Đây là lý do phần lớn nhiếp ảnh nghệ thuật và tư liệu mạnh nhất hoạt động trong cân bằng động, không phải cân bằng tĩnh.
        </p>

        <hr className="doc-divider" />

        {/* 3.2 */}
        <h3 id="sec-3-2" className="scroll-mt-20">
          2. Cơ chế của cân bằng động — Cách các lực tương tác
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[#7c8aff]"><Scale size={16} /></span>
              <span className="text-sm font-semibold text-[#e4e4ed]">Cơ chế 1 — Bù đắp visual weight bằng vị trí (Lever Principle)</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Giống như một cái cân đòn: yếu tố nặng hơn ở gần trung tâm có thể được cân bằng bởi yếu tố nhẹ hơn ở xa trung tâm hơn. Trong nhiếp ảnh, một chủ thể lớn ở 1/3 phía trái có thể được cân bằng bởi một yếu tố nhỏ hơn nhưng có visual weight cao ở góc phía phải xa hơn. Đây chính là cơ chế đằng sau Rule of Thirds: khi chủ thể không ở trung tâm, phần negative space còn lại không phải là &ldquo;khoảng trống&rdquo; — nó là counterweight tạo ra cân bằng động.
            </p>
          </div>
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[#ffcb6b]"><Zap size={16} /></span>
              <span className="text-sm font-semibold text-[#e4e4ed]">Cơ chế 2 — Căng thẳng hướng về (Tension and Pull)</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Cân bằng động cũng xuất hiện khi hai yếu tố trong khung hình tạo ra căng thẳng thị giác hướng về nhau — như hai cực của một từ trường. Hai người nhìn về phía nhau từ hai góc khung hình tạo ra cân bằng động qua axis implied line nối hai hướng nhìn. Hai vật thể ở hai góc đối diện tạo ra đường chéo căng thẳng là trục cân bằng của toàn bộ hình ảnh.
            </p>
          </div>
          <div className="hotspot-card sm:col-span-2">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-emerald-400"><Grid3X3 size={16} /></span>
              <span className="text-sm font-semibold text-[#e4e4ed]">Cơ chế 3 — Nhịp điệu và lặp lại (Rhythm and Repetition)</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Khi các yếu tố nhỏ lặp lại theo một nhịp điệu trong khung hình, chúng tạo ra cân bằng động qua tính liên tục và nhịp điệu — không phải qua sự cân bằng của từng cặp yếu tố riêng lẻ. Hàng cây trong sương mù, bậc thang xoắn ốc, sóng biển — tất cả tạo ra cân bằng động qua lặp lại có biến thể.
            </p>
          </div>
        </div>

        <hr className="doc-divider" />

        {/* 3.3 */}
        <h3 id="sec-3-3" className="scroll-mt-20">
          3. Bất cân bằng có chủ đích — Khi mất cân bằng là thông điệp
        </h3>

        <div className="callout callout-warning">
          <div className="callout-title">
            <AlertTriangle size={13} className="inline mr-1" />
            Bất cân bằng có chủ đích vs. Bố cục yếu
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Không phải mọi hình ảnh đều cần cân bằng. Đôi khi, sự mất cân bằng có chủ đích là chính xác là cảm xúc mà hình ảnh cần tạo ra: lo lắng, bất ổn, sụp đổ, hay sự áp đảo. Một chủ thể bị đẩy sang một góc cực đoan của khung hình với negative space áp đảo có thể nói về sự cô đơn và cô lập mạnh hơn bất kỳ từ ngữ nào.
          </p>
          <p style={{ marginBottom: 0, lineHeight: 1.7, marginTop: '0.75rem' }}>
            Sự khác biệt giữa &ldquo;bất cân bằng có chủ đích&rdquo; và &ldquo;bố cục yếu&rdquo; là: bất cân bằng có chủ đích tạo ra cảm giác căng thẳng hoặc cảm xúc cụ thể có ý nghĩa trong ngữ cảnh của hình ảnh. Bố cục yếu tạo ra cảm giác khó chịu không giải thích được.
          </p>
        </div>

        {/* ============================================================ */}
        {/*  SECTION IV                                                   */}
        {/* ============================================================ */}
        <h2 id="sec-4" className="scroll-mt-20">
          <span className="section-num">Ⅳ</span>
          Cân bằng trong thực hành — Công cụ và kỹ thuật
        </h2>

        <hr className="doc-divider" />

        {/* 4.1 */}
        <h3 id="sec-4-1" className="scroll-mt-20">
          1. Đọc visual weight trước khi bấm máy
        </h3>

        <p>
          Kỹ năng cốt lõi của cân bằng thị giác là khả năng đọc và đánh giá visual weight của từng yếu tố trong cảnh trước khi bấm máy. Đây không phải là quá trình tính toán có ý thức — nó là phản xạ được xây dựng qua thực hành. Người mới học cần dừng lại và tự hỏi: &ldquo;Mắt tôi bị kéo về đâu trước? Phần nào của khung hình cảm thấy nặng nhất? Có gì đang tạo ra sự mất cân bằng không?&rdquo;
        </p>

        <p>
          Sau đủ thời gian thực hành, câu hỏi này trở thành phản xạ tức thì — bạn cảm nhận được sự mất cân bằng trước khi phân tích được nguyên nhân. Đây là dấu hiệu của Giai đoạn 2 trong hành trình phát triển nhãn quan.
        </p>

        <hr className="doc-divider" />

        {/* 4.2 */}
        <h3 id="sec-4-2" className="scroll-mt-20">
          2. Công cụ tạo cân bằng thị giác
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[#7c8aff]"><Move size={16} /></span>
              <span className="text-sm font-semibold text-[#e4e4ed]">Công cụ 1 — Di chuyển vị trí chụp</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Đây là công cụ đơn giản nhất và hiệu quả nhất: một bước sang trái, sang phải, lên hay xuống có thể thay đổi hoàn toàn cách visual weight được phân bổ trong khung hình. Trước khi nghĩ đến bất kỳ kỹ thuật nào khác, hãy di chuyển.
            </p>
          </div>
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[#ffcb6b]"><Eye size={16} /></span>
              <span className="text-sm font-semibold text-[#e4e4ed]">Công cụ 2 — Thay đổi focal length</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Focal length thay đổi tỷ lệ không gian và do đó thay đổi visual weight tương đối của các yếu tố. Wide angle tăng visual weight của tiền cảnh; telephoto nén không gian và làm visual weight của các lớp cảnh trở nên tương đương hơn.
            </p>
          </div>
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-emerald-400"><Lightbulb size={16} /></span>
              <span className="text-sm font-semibold text-[#e4e4ed]">Công cụ 3 — Kiểm soát ánh sáng</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Ánh sáng và bóng tối trực tiếp tạo ra và thay đổi visual weight. Làm sáng một vùng tăng visual weight của nó; làm tối một vùng giảm visual weight. Trong studio, bạn kiểm soát hoàn toàn phân bổ ánh sáng. Ngoài tự nhiên, bạn chờ đợi hoặc tìm góc chụp tận dụng ánh sáng có sẵn.
            </p>
          </div>
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[#a855f7]"><Grid3X3 size={16} /></span>
              <span className="text-sm font-semibold text-[#e4e4ed]">Công cụ 4 — Crop và Framing</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Quyết định về frame — những gì được đưa vào và những gì bị loại ra — là quyết định về visual weight. Loại bỏ một yếu tố có visual weight cao khỏi khung hình thay đổi hoàn toàn cân bằng của toàn bộ hình ảnh. Thêm một yếu tố counterweight vào phía trống của khung hình tạo ra cân bằng động.
            </p>
          </div>
          <div className="hotspot-card sm:col-span-2">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[#fb7185]"><Sparkles size={16} /></span>
              <span className="text-sm font-semibold text-[#e4e4ed]">Công cụ 5 — Hậu kỳ có chủ đích</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Trong hậu kỳ, visual weight có thể được điều chỉnh qua: dodge/burn (tăng/giảm độ sáng của vùng cụ thể), selective saturation (tăng/giảm màu sắc của yếu tố cụ thể), và vignette (giảm visual weight của các vùng rìa khung hình để tập trung vào trung tâm). Đây là những công cụ tinh chỉnh sau khi bố cục cơ bản đã được thiết lập trong lúc chụp.
            </p>
          </div>
        </div>

        <hr className="doc-divider" />

        {/* 4.3 */}
        <h3 id="sec-4-3" className="scroll-mt-20">
          3. Cân bằng trong các thể loại nhiếp ảnh
        </h3>

        <div className="overflow-x-auto my-4 rounded-lg border border-[#1e1e2a]">
          <table className="doc-table">
            <thead>
              <tr>
                <th>Thể loại</th>
                <th>Loại cân bằng chính</th>
                <th>Đặc điểm</th>
                <th>Nhiếp ảnh gia tham khảo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Portrait</td>
                <td>Cân bằng tĩnh + động</td>
                <td>Chân dung trang trọng: đối xứng. Chân dung tự nhiên: bất đối xứng</td>
                <td>Richard Avedon, Seydou Keïta</td>
              </tr>
              <tr>
                <td>Landscape</td>
                <td>Cân bằng động + tĩnh</td>
                <td>Phong cảnh rộng: bất đối xứng. Phản chiếu: đối xứng ngang</td>
                <td>Ansel Adams, Michael Kenna</td>
              </tr>
              <tr>
                <td>Street</td>
                <td>Cân bằng động</td>
                <td>Bất đối xứng gần như luôn. Tìm counterweight trong khoảnh khắc</td>
                <td>Henri Cartier-Bresson, Fan Ho</td>
              </tr>
              <tr>
                <td>Architecture</td>
                <td>Cân bằng tĩnh</td>
                <td>Đối xứng dọc là mặc định. Tìm điểm bất đối xứng nhỏ</td>
                <td>Andreas Gursky, Hiroshi Sugimoto</td>
              </tr>
              <tr>
                <td>Still Life</td>
                <td>Cả hai</td>
                <td>Đối xứng: sang trọng, kiểm soát. Bất đối xứng: tự nhiên, sống động</td>
                <td>Irving Penn, Edward Weston</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ============================================================ */}
        {/*  SECTION V                                                    */}
        {/* ============================================================ */}
        <h2 id="sec-5" className="scroll-mt-20">
          <span className="section-num">Ⅴ</span>
          Cân bằng và Cảm xúc — Ngôn ngữ của sự ổn định và chuyển động
        </h2>

        <hr className="doc-divider" />

        {/* 5.1 */}
        <h3 id="sec-5-1" className="scroll-mt-20">
          1. Tâm lý học của cân bằng tĩnh
        </h3>

        <p>
          Não người phản ứng với cân bằng tĩnh bằng cảm giác an toàn, ổn định, và hoàn chỉnh. Điều này có cơ sở tiến hóa: môi trường cân bằng và đối xứng thường an toàn hơn — không có gì đang rơi, không có gì đang bất ổn, không có nguy hiểm tiềm ẩn. Bộ não thư giãn khi nhìn vào hình ảnh cân bằng tĩnh.
        </p>

        <p>
          Hệ quả thực tiễn: cân bằng tĩnh phù hợp với hình ảnh muốn tạo ra cảm giác an toàn, uy quyền, vĩnh cửu, hoặc thiêng liêng. Không phù hợp với hình ảnh muốn tạo ra cảm giác chuyển động, căng thẳng, hay sự không chắc chắn — vì cân bằng tĩnh không cho phép người xem &ldquo;cảm&rdquo; được sự chuyển động.
        </p>

        <hr className="doc-divider" />

        {/* 5.2 */}
        <h3 id="sec-5-2" className="scroll-mt-20">
          2. Tâm lý học của cân bằng động
        </h3>

        <p>
          Cân bằng động tạo ra căng thẳng thị giác nhỏ — não người cảm nhận sự mất đối xứng và bắt đầu &ldquo;tìm kiếm&rdquo; cân bằng. Quá trình tìm kiếm đó là nguồn gốc của năng lượng và sức sống trong hình ảnh. Não người không thụ động ngắm nhìn — nó đang chủ động tham gia vào việc &ldquo;giải quyết&rdquo; sự căng thẳng thị giác đó.
        </p>

        <p>
          Đây là lý do nhiều hình ảnh mạnh về mặt cảm xúc sử dụng cân bằng động thay vì cân bằng tĩnh: người xem không chỉ nhìn — họ tham gia. Và sự tham gia đó tạo ra kết nối cảm xúc sâu hơn.
        </p>

        <hr className="doc-divider" />

        {/* 5.3 */}
        <h3 id="sec-5-3" className="scroll-mt-20">
          3. Cân bằng và sự chuyển động — Frozen Motion
        </h3>

        <div className="callout callout-photo">
          <div className="callout-title">
            <Camera size={13} className="inline mr-1" />
            Case Study: Frozen Motion và cân bằng động
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Một trong những thách thức đặc thù của nhiếp ảnh là nó đóng băng một khoảnh khắc trong thời gian — nhưng hình ảnh mạnh thường tạo ra cảm giác về chuyển động và thời gian ngay cả trong một khung hình tĩnh. Cân bằng động là công cụ chính để tạo ra cảm giác đó.
          </p>
          <p style={{ marginBottom: 0, lineHeight: 1.7, marginTop: '0.75rem' }}>
            Khi chủ thể đang chuyển động được chụp với looking room (khoảng trống phía trước hướng chuyển động), cân bằng động giữa visual weight của chủ thể và visual weight của không gian phía trước tạo ra cảm giác chuyển động sắp xảy ra. Não người &ldquo;hoàn thành&rdquo; chuyển động đó trong tưởng tượng — và hình ảnh tĩnh trở nên sống động.
          </p>
        </div>

        {/* ============================================================ */}
        {/*  SECTION VI                                                   */}
        {/* ============================================================ */}
        <h2 id="sec-6" className="scroll-mt-20">
          <span className="section-num">Ⅵ</span>
          Cân bằng nâng cao — Hệ thống phức hợp
        </h2>

        <hr className="doc-divider" />

        {/* 6.1 */}
        <h3 id="sec-6-1" className="scroll-mt-20">
          1. Cân bằng đa lớp — Khi nhiều hệ thống cùng hoạt động
        </h3>

        <p>
          Hình ảnh phức tạp có nhiều lớp visual weight hoạt động cùng lúc — và cân bằng tổng thể là kết quả của sự tương tác giữa tất cả các lớp đó. Một bức ảnh đường phố phức tạp có thể có: cân bằng màu sắc (cam vs. xanh lam), cân bằng tông màu (sáng vs. tối), cân bằng kích thước (người lớn vs. người nhỏ), và cân bằng chuyển động (người đứng yên vs. người đang di chuyển) — tất cả đang hoạt động đồng thời.
        </p>

        <p>
          Đọc và kiểm soát cân bằng đa lớp là kỹ năng nâng cao nhất trong bố cục nhiếp ảnh. Nó không thể được học chỉ qua lý thuyết — nó đòi hỏi hàng nghìn giờ nhìn, phân tích, và thực hành.
        </p>

        <hr className="doc-divider" />

        {/* 6.2 */}
        <h3 id="sec-6-2" className="scroll-mt-20">
          2. Cân bằng theo thời gian — Series và Narrative
        </h3>

        <p>
          Trong nhiếp ảnh series và photo essay, cân bằng không chỉ tồn tại trong từng khung hình đơn lẻ — nó tồn tại theo thời gian qua toàn bộ series. Hình ảnh nặng (về mặt cảm xúc và visual weight) cần được cân bằng bởi hình ảnh nhẹ hơn trong series. Khoảng lặng (hình ảnh trống hoặc tối giản) cân bằng với những hình ảnh dày đặc thông tin.
        </p>

        <p>
          Đây là nguyên tắc mà các photo editor và art director hiểu rõ nhất: thứ tự và nhịp điệu của hình ảnh trong một series tạo ra cân bằng theo thời gian — và cân bằng đó quyết định trải nghiệm cảm xúc tổng thể của người xem khi đi qua toàn bộ tác phẩm.
        </p>

        {/* ============================================================ */}
        {/*  SECTION VII                                                  */}
        {/* ============================================================ */}
        <h2 id="sec-7" className="scroll-mt-20">
          <span className="section-num">Ⅶ</span>
          Ứng dụng thực hành — Rèn luyện ý thức cân bằng
        </h2>

        <hr className="doc-divider" />

        {/* 7.1 */}
        <h3 id="sec-7-1" className="scroll-mt-20">
          1. Bài tập &ldquo;Phân tích cân bằng&rdquo;
        </h3>

        <div className="callout callout-photo">
          <div className="callout-title">
            <Camera size={13} className="inline mr-1" />
            Bài tập thực hành
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Chọn 10 bức ảnh — 5 bức bạn cho là có bố cục mạnh, 5 bức bạn cho là bố cục yếu. Với mỗi bức, xác định: (1) Các yếu tố có visual weight cao nhất là gì? (2) Loại cân bằng nào đang được sử dụng (tĩnh/động/mất cân bằng)? (3) Cân bằng đó có phục vụ cảm xúc tổng thể của hình ảnh không? Sau đó hỏi: sự khác biệt giữa 5 bức mạnh và 5 bức yếu có liên quan đến cân bằng không?
          </p>
        </div>

        <hr className="doc-divider" />

        {/* 7.2 */}
        <h3 id="sec-7-2" className="scroll-mt-20">
          2. Bài tập &ldquo;Tái tạo cân bằng&rdquo;
        </h3>

        <p>
          Lấy một bức ảnh bạn đã chụp mà cảm giác &ldquo;có gì đó không đúng&rdquo;. Phân tích visual weight của từng yếu tố trong khung hình. Sau đó trong hậu kỳ (hoặc bằng cách chụp lại), thử tạo ra ít nhất hai phiên bản: một với cân bằng tĩnh và một với cân bằng động. So sánh ba phiên bản (gốc + hai phiên bản mới) và phân tích sự khác biệt về cảm xúc.
        </p>

        <hr className="doc-divider" />

        {/* 7.3 */}
        <h3 id="sec-7-3" className="scroll-mt-20">
          3. Bài tập &ldquo;Chụp cùng chủ thể với hai loại cân bằng&rdquo;
        </h3>

        <p>
          Chọn một chủ thể đơn giản và chụp nó hai lần: lần đầu với cân bằng tĩnh hoàn hảo (đối xứng, trung tâm, hoặc cân bằng đối xứng), lần hai với cân bằng động rõ ràng (bất đối xứng nhưng có hệ thống). Phân tích: câu chuyện của hai bức ảnh khác nhau như thế nào? Cảm xúc khác nhau như thế nào? Loại cân bằng nào phù hợp hơn với bản chất của chủ thể đó?
        </p>

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
              Visual weight là mức độ thu hút chú ý — không phải kích thước vật lý. Điểm đỏ nhỏ có thể nặng hơn khối xám lớn.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">02</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Năm yếu tố quyết định visual weight: kích thước, màu sắc, vị trí, độ phức tạp, sự cô lập.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">03</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Cân bằng tĩnh = đối xứng = ổn định, trang trọng, hoàn chỉnh. Dùng cho chân dung quyền uy, kiến trúc, thiền định.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">04</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Cân bằng động = bất đối xứng có hệ thống = năng lượng, chuyển động, sự sống. Đây là ngôn ngữ của hầu hết nhiếp ảnh nghệ thuật.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">05</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Ba cơ chế cân bằng động: bù đắp vị trí (lever), căng thẳng hướng về (tension), nhịp điệu lặp lại (rhythm).
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">06</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Năm công cụ tạo cân bằng: di chuyển, focal length, ánh sáng, crop/framing, hậu kỳ.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">07</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Cân bằng đa lớp và cân bằng theo thời gian — kỹ năng nâng cao nhất trong bố cục.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">08</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Bất cân bằng có chủ đích là công cụ cảm xúc mạnh mẽ — khi mất cân bằng tạo ra ý nghĩa, không phải lỗi.
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
              Bất cân bằng <em>có chủ đích</em> mạnh hơn cân bằng hoàn hảo — vì nó tạo ra <strong>TENSION</strong>. Não bộ luôn muốn cân bằng, nên khi bạn cố tình phá vỡ, bạn tạo ra sức căng không thể tháo gỡ. Sức căng đó là cảm xúc. Cảm xúc là sự kết nối. Tuy nhiên, bất cân bằng vô tình (do thiếu kỹ năng) và bất cân bằng chủ đích (do hiểu biết sâu) tạo ra hai loại ảnh hoàn toàn khác nhau — người xem cảm nhận sự khác biệt ngay lập tức.
            </p>
          </div>
          <div className="callout callout-pitfall">
            <div className="callout-title">⚠ Bẫy chuyên gia</div>
            <p style={{ marginBottom: 0, lineHeight: 1.75 }}>
              Nghĩ rằng <strong>cân bằng đồng nghĩa với đối xứng</strong>. Đây là nhầm lẫn phổ biến nhất và dẫn đến những bố cục stiff, predictable. Cân bằng thực sự là <em>visual weight equilibrium</em> — hoàn toàn có thể đạt được với bố cục bất đối xứng mạnh. Một người nhỏ bên phải được "cân" bởi khoảng không gian tối bên trái. Đây là nguyên lý đòn bẩy thị giác — khác hoàn toàn với đối xứng học.
            </p>
          </div>
          <div className="practice-exercise">
            <div className="practice-header">⬥ Bài tập thực chiến — Ba câu chuyện của cân bằng</div>
            <div className="practice-body">
              <p>Cùng một chủ thể, ba triết học bố cục khác nhau:</p>
              <ol className="practice-steps">
                <li><strong>Symmetry — Trang nghiêm &amp; Vĩnh cửu:</strong> Chân dung hoàn toàn đối xứng. Người xem cảm thấy gì? Khi nào loại ảnh này phù hợp? (đền thờ, lăng tẩm, sức mạnh)</li>
                <li><strong>Asymmetric Balance — Cân bằng động:</strong> Rule of thirds với visual weight được cân bằng bởi khoảng trống hay màu sắc. Tự nhiên, đời thường, có chiều sâu.</li>
                <li><strong>Intentional Imbalance — Tension chủ đích:</strong> Chủ thể ở cạnh frame, không có gì cân bằng phía đối diện. Câu chuyện của cô đơn, bất an, hay khoảnh khắc chưa kết thúc.</li>
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
          <Link href="/nhip-dieu" className="group nav-card">
            <div className="nav-card-label">← Bài trước</div>
            <div className="nav-card-title">15. Nhịp điệu thị giác</div>
            <div className="nav-card-desc">Nguyên lý vận hành</div>
          </Link>
          <Link href="/phan-cap" className="group nav-card text-right">
            <div className="nav-card-label">Bài tiếp →</div>
            <div className="nav-card-title">17. Phân cấp & Điểm nhấn</div>
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
              <a href="/can-bang" className="block hover:text-[#7c8aff] transition-colors">Cân bằng Tĩnh & Động</a>
              <a href="/phan-cap" className="block hover:text-[#7c8aff] transition-colors">Phân cấp & Điểm nhấn</a>
              <a href="/tinh-thong-nhat" className="block hover:text-[#7c8aff] transition-colors">Tính Thống Nhất</a>
            </div>
          </div>
        </div>
      </article>
    </DocsLayout>
  );
}



import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import {
  ChevronRight,
  GraduationCap,
  Lightbulb,
  Camera,
  AlertTriangle,
  BookOpen,
  Check,
  Sun,
  Moon,
  Sunrise,
  Lamp,
  Eye,
  Sparkles,
} from 'lucide-react';
import DocsLayout from '@/components/docs-layout';

/* ------------------------------------------------------------------ */
/*  TOC Data                                                          */
/* ------------------------------------------------------------------ */
const tocSections = [
  { id: 'sec-1', label: 'Ⅰ. Định nghĩa ánh sáng trong nhiếp ảnh', level: 1 },
  { id: 'sec-1-1', label: '1. Ánh sáng như chất liệu nhiếp ảnh', level: 2 },
  { id: 'sec-1-2', label: '2. Không có ánh sáng, không có nhiếp ảnh', level: 2 },
  { id: 'sec-2', label: 'Ⅱ. Phương hướng ánh sáng', level: 1 },
  { id: 'sec-2-1', label: '1. Năm hướng ánh sáng và tính cách', level: 2 },
  { id: 'sec-2-2', label: '2. Chọn hướng ánh sáng theo mục đích', level: 2 },
  { id: 'sec-3', label: 'Ⅲ. Chất lượng ánh sáng', level: 1 },
  { id: 'sec-3-1', label: '1. Hard light vs Soft light', level: 2 },
  { id: 'sec-3-2', label: '2. Khi nào dùng hard light, khi nào dùng soft light', level: 2 },
  { id: 'sec-3-3', label: '3. Công cụ điều chỉnh chất lượng ánh sáng', level: 2 },
  { id: 'sec-4', label: 'Ⅳ. Ánh sáng tự nhiên vs nhân tạo', level: 1 },
  { id: 'sec-4-1', label: '1. Golden hour và Blue hour', level: 2 },
  { id: 'sec-4-2', label: '2. Ánh sáng studio và kiểm soát', level: 2 },
  { id: 'sec-5', label: 'Ⅴ. Bóng tối như yếu tố sáng tác', level: 1 },
  { id: 'sec-5-1', label: '1. Bóng tối như công cụ bố cục', level: 2 },
  { id: 'sec-5-2', label: '2. Silhouette — Nghệ thuật hình bóng', level: 2 },
  { id: 'sec-5-3', label: '3. Chiaroscuro — Ánh sáng bóng tối tương phản', level: 2 },
  { id: 'sec-5-4', label: '4. High key vs Low key', level: 2 },
  { id: 'summary', label: 'Tóm tắt 8 điểm chính', level: 1 },
];

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */
export default function AnhSangPage() {
  const [isRead, setIsRead] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('alpha-doc-read');
      if (saved) {
        const readPages: string[] = JSON.parse(saved);
        if (readPages.includes('/anh-sang')) setIsRead(true);
      }
    } catch {}
  }, []);

  const toggleRead = () => {
    try {
      const saved = localStorage.getItem('alpha-doc-read');
      const readPages: string[] = saved ? JSON.parse(saved) : [];
      if (isRead) {
        const updated = readPages.filter((p) => p !== '/anh-sang');
        localStorage.setItem('alpha-doc-read', JSON.stringify(updated));
        setIsRead(false);
      } else {
        const updated = [...readPages, '/anh-sang'];
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
          <span className="text-[#9d9db5]">Ánh sáng bóng tối</span>
        </div>

        {/* Badges */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold font-mono px-2 py-0.5 rounded bg-[rgba(124,138,255,0.1)] text-[#7c8aff]">
            HA7
          </span>
          <span className="text-[11px] text-[#6b6b80]">18 phút đọc · #AnhSang #BongToi #Light #Shadow #GoldenHour #Chiaroscuro</span>
          <span className="elite-badge">
            <GraduationCap size={11} />
            Nâng cao
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-[#e4e4ed] leading-tight mb-3 border-none pb-0">
          Ánh sáng bóng tối
        </h1>

        {/* Subtitle */}
        <p className="text-base text-[#9d9db5] leading-relaxed mb-6" style={{ marginTop: 0 }}>
          Ngôn ngữ thị giác · Bài 7 — Hành trình từ vật lý ánh sáng đến nghệ thuật sáng tác với light and shadow
        </p>

        {/* Hero image */}
        <div className="rounded-xl overflow-hidden border border-[#1e1e2a] mb-8">
          <img
            src="/anh-sang-hero.png"
            alt="Ánh sáng bóng tối - Ảnh minh họa"
            className="w-full h-auto object-cover"
            loading="eager"
          />
        </div>

        {/* Opening Quote */}
        <div className="quote-block">
          <p>
            &ldquo;Nhiếp ảnh là nghệ thuật vẽ bằng ánh sáng. Nhưng điều ít ai nói là: bóng tối mới là thứ cho ánh sáng ý nghĩa.&rdquo;
          </p>
          <p className="quote-attr">— George Eastman</p>
        </div>

        <p className="drop-cap">
          Từ &ldquo;photography&rdquo; bắt nguồn từ tiếng Hy Lạp: <em>phos</em> (ánh sáng) + <em>graphê</em> (vẽ viết). Nhiếp ảnh, theo đúng nghĩa đen, là <span className="key-concept">vẽ bằng ánh sáng</span>. Và giống như họa sĩ cần biết pha màu, nhiếp ảnh gia cần biết đọc ánh sáng — hướng, chất lượng, nhiệt độ màu, và quan trọng nhất: bóng tối mà ánh sáng tạo ra. Bởi vì không có bóng tối, ánh sáng chỉ là một mảng sáng phẳng, vô nghĩa. Bóng tối định hình hình khối, tạo chiều sâu, và mang lại cảm xúc. Ánh sáng và bóng tối là cặp song sinh không thể tách rời — và hiểu mối quan hệ của chúng là bước ngoặt từ chụp ảnh đến sáng tác ảnh.
        </p>

        {/* ============================================================ */}
        {/*  SECTION I                                                    */}
        {/* ============================================================ */}
        <h2 id="sec-1" className="scroll-mt-20">
          <span className="section-num">Ⅰ</span>
          Định nghĩa ánh sáng trong nhiếp ảnh
        </h2>

        <hr className="doc-divider" />

        {/* 1.1 */}
        <h3 id="sec-1-1" className="scroll-mt-20">
          1. Ánh sáng như chất liệu nhiếp ảnh
        </h3>

        <p>
          Họa sĩ vẽ bằng sơn, điêu khắc gia nắn bằng đất, nhạc sĩ sáng tác bằng âm thanh — nhiếp ảnh gia sáng tác bằng ánh sáng. Ánh sáng không chỉ là điều kiện cần để chụp ảnh — nó là <strong>chất liệu nghệ thuật</strong> chính. Cùng một cảnh vật, cùng một góc chụp, nhưng ánh sáng khác nhau tạo ra hai bức ảnh hoàn toàn khác nhau — về tâm trạng, ý nghĩa, và giá trị nghệ thuật.
        </p>

        <p>Trong nhiếp ảnh, ánh sáng có bốn thuộc tính cơ bản:</p>
        <ul className="factor-list">
          <li>
            <strong>Hướng (Direction):</strong> Ánh sáng đến từ đâu — trước, sau, bên, trên, dưới? Mỗi hướng tạo ra bóng đổ khác nhau — và bóng đổ định hình hình khối và tâm trạng.
          </li>
          <li>
            <strong>Chất lượng (Quality):</strong> Ánh sáng cứng (hard) hay mềm (soft)? Hard light tạo bóng sắc, soft light tạo bóng mờ — mỗi loại phù hợp với mục đích khác nhau.
          </li>
          <li>
            <strong>Nhiệt độ màu (Color temperature):</strong> Ánh sáng ấm (vàng) hay lạnh (xanh)? Nhiệt độ màu ảnh hưởng trực tiếp đến tâm trạng — ấm = gần gũi, lãng mạn; lạnh = xa cách, cô đơn.
          </li>
          <li>
            <strong>Cường độ (Intensity):</strong> Ánh sáng mạnh hay yếu? Cường độ quyết định tương phản — và tương phản quyết định kịch tính.
          </li>
        </ul>

        <hr className="doc-divider" />

        {/* 1.2 */}
        <h3 id="sec-1-2" className="scroll-mt-20">
          2. Không có ánh sáng, không có nhiếp ảnh
        </h3>

        <p>
          Câu nói này có vẻ hiển nhiên — nhưng hàm ý sâu hơn nhiều. Không chỉ về mặt vật lý (sensor cần ánh sáng để ghi nhận hình ảnh), mà còn về mặt nghệ thuật: <strong>ánh sáng quyết định hình khối, màu sắc, kết cấu, và chiều sâu</strong> — mọi thứ mà bức ảnh &ldquo;là&rdquo;. Thay đổi ánh sáng, bạn thay đổi toàn bộ bản chất của hình ảnh.
        </p>

        <div className="callout callout-key">
          <div className="callout-title">
            <Lightbulb size={13} className="inline mr-1" />
            Quy tắc vàng
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Không có &ldquo;ánh sáng xấu&rdquo; — chỉ có ánh sáng không phù hợp với mục đích. Ánh sáng giữa trưa gắt gỏng, tạo bóng sâu, là &ldquo;ánh sáng xấu&rdquo; cho chân dung lãng mạn — nhưng là ánh sáng hoàn hảo cho ảnh kiến trúc đồ họa. Ánh sáng âm u, thấp thoáng là &ldquo;ánh sáng xấu&rdquo; cho ảnh sản phẩm — nhưng là ánh sáng lý tưởng cho bức ảnh bí ẩn.
          </p>
        </div>

        {/* ============================================================ */}
        {/*  SECTION II                                                   */}
        {/* ============================================================ */}
        <h2 id="sec-2" className="scroll-mt-20">
          <span className="section-num">Ⅱ</span>
          Phương hướng ánh sáng
        </h2>

        <hr className="doc-divider" />

        {/* 2.1 */}
        <h3 id="sec-2-1" className="scroll-mt-20">
          1. Năm hướng ánh sáng và tính cách
        </h3>

        <p>
          Hướng ánh sáng — tương quan giữa vị trí nguồn sáng và máy ảnh — là yếu tố đơn giản nhất để kiểm soát nhưng có tác động lớn nhất. Mỗi hướng ánh sáng tạo ra một &ldquo;tính cách&rdquo; riêng:
        </p>

        <div className="overflow-x-auto my-4 rounded-lg border border-[#1e1e2a]">
          <table className="doc-table">
            <thead>
              <tr>
                <th>Hướng ánh sáng</th>
                <th>Đặc điểm bóng</th>
                <th>Tính cách</th>
                <th>Ứng dụng</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Front light (Trước)</td>
                <td>Bóng phía sau chủ thể, không thấy</td>
                <td>Bình phẳng, trung thực, thiếu chiều sâu</td>
                <td>Ảnh thẻ, thời trang, tư liệu</td>
              </tr>
              <tr>
                <td>Side light (Bên)</td>
                <td>Bóng đổ sang một bên, gradient rõ</td>
                <td>Kịch tính, mạnh mẽ, tiết lộ hình khối</td>
                <td>Chân dung nghệ thuật, tĩnh vật, kiến trúc</td>
              </tr>
              <tr>
                <td>Back light (Sau)</td>
                <td>Chủ thể trong bóng, viền sáng quanh</td>
                <td>Bí ẩn, kịch tính, đồ họa</td>
                <td>Silhouette, hoàng hôn, chân dung nghệ thuật</td>
              </tr>
              <tr>
                <td>Top light (Trên)</td>
                <td>Bóng đổ thẳng xuống, lõm vào mắt</td>
                <td>Áp đảo, bất thường, siêu thực</td>
                <td>Ảnh thực nghiệm, hiệu ứng rùng rợn</td>
              </tr>
              <tr>
                <td>Bottom light (Dưới)</td>
                <td>Bóng đổ lên trên, đảo ngược tự nhiên</td>
                <td>Kỳ dị, đáng sợ, phi tự nhiên</td>
                <td>Kể chuyện ma, hiệu ứng đặc biệt</td>
              </tr>
            </tbody>
          </table>
        </div>

        <hr className="doc-divider" />

        {/* 2.2 */}
        <h3 id="sec-2-2" className="scroll-mt-20">
          2. Chọn hướng ánh sáng theo mục đích
        </h3>

        <p>
          Lựa chọn hướng ánh sáng không phải là quyết định kỹ thuật — nó là quyết định sáng tác. Hãy bắt đầu từ câu hỏi: &ldquo;Tôi muốn người xem cảm thấy điều gì?&rdquo; — rồi chọn hướng ánh sáng phù hợp:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <Sun size={16} className="text-[#7c8aff]" />
              <span className="text-sm font-semibold text-[#e4e4ed]">Muốn trung thực, rõ ràng</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Front light — ánh sáng đều, ít bóng, chi tiết đầy đủ. Ảnh báo chí, ảnh sản phẩm, ảnh tư liệu pháp y — nơi sự thật quan trọng hơn nghệ thuật.
            </p>
          </div>
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <Moon size={16} className="text-[#ffcb6b]" />
              <span className="text-sm font-semibold text-[#e4e4ed]">Muốn kịch tính, sâu sắc</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Side light — bóng đổ mạnh, gradient từ sáng đến tối, hình khối nổi bật. Rembrandt lighting trong chân dung, low key trong fine art — nơi nghệ thuật quan trọng hơn sự thật.
            </p>
          </div>
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={16} className="text-emerald-400" />
              <span className="text-sm font-semibold text-[#e4e4ed]">Muốn bí ẩn, đồ họa</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Back light — chủ thể thành silhouette, viền sáng phân tách figure-ground, màu trời làm phông. Hoàng hôn, bình minh, cửa sổ sáng — nơi hình dạng quan trọng hơn chi tiết.
            </p>
          </div>
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <Eye size={16} className="text-[#a855f7]" />
              <span className="text-sm font-semibold text-[#e4e4ed]">Muốn bất thường, siêu thực</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Top light hoặc bottom light — bóng đổ trái với tự nhiên, tạo cảm giác bất an và kỳ lạ. Sử dụng có chủ đích để tạo hiệu ứng tâm lý — không dùng vô tình.
            </p>
          </div>
        </div>

        {/* ============================================================ */}
        {/*  SECTION III                                                  */}
        {/* ============================================================ */}
        <h2 id="sec-3" className="scroll-mt-20">
          <span className="section-num">Ⅲ</span>
          Chất lượng ánh sáng
        </h2>

        <hr className="doc-divider" />

        {/* 3.1 */}
        <h3 id="sec-3-1" className="scroll-mt-20">
          1. Hard light vs Soft light
        </h3>

        <p>
          Chất lượng ánh sáng — hard hay soft — được quyết định bởi <span className="key-concept">kích thước tương đối của nguồn sáng so với chủ thể</span>. Nguồn sáng nhỏ so với chủ thể (mặt trời giữa trưa, flash trực tiếp, đèn trần trơ) tạo hard light. Nguồn sáng lớn so với chủ thể (trời nhiều mây, softbox lớn, cửa sổ lớn) tạo soft light.
        </p>

        <div className="comparison-grid my-4">
          <div className="comp-card">
            <span className="sub-label">HARD LIGHT</span>
            <h4>Ánh sáng cứng</h4>
            <p>
              Bóng sắc nét, ranh giới sáng-tối rõ ràng, tương phản cao. Hard light mạnh mẽ, quyết đoán, không nhân nhượng. Nó tiết lộ mọi khuyết điểm, nhấn mạnh kết cấu, và tạo ra hình khối đồ họa rõ ràng. Mặt trời giữa trưa, flash trực tiếp, đèn điểm — tất cả tạo hard light.
            </p>
          </div>
          <div className="comp-card" style={{ borderColor: '#ffcb6b44' }}>
            <span className="sub-label" style={{ color: '#ffcb6b', background: 'rgba(255,203,107,0.1)' }}>SOFT LIGHT</span>
            <h4>Ánh sáng mềm</h4>
            <p>
              Bóng mờ nhạt, gradient từ sáng đến tối êm ái, tương phản thấp. Soft light bao bọc, dịu dàng, che giấu khuyết điểm. Nó tạo ra cảm giác ấm áp, lãng mạn, và tự nhiên. Trời nhiều mây, softbox, cửa sổ khuếch tán — tất cả tạo soft light.
            </p>
          </div>
        </div>

        <hr className="doc-divider" />

        {/* 3.2 */}
        <h3 id="sec-3-2" className="scroll-mt-20">
          2. Khi nào dùng hard light, khi nào dùng soft light
        </h3>

        <div className="overflow-x-auto my-4 rounded-lg border border-[#1e1e2a]">
          <table className="doc-table">
            <thead>
              <tr>
                <th>Loại ánh sáng</th>
                <th>Phù hợp khi</th>
                <th>Tránh khi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Hard light</td>
                <td>Ảnh kiến trúc đồ họa, sản phẩm nam tính, chân dung character, street photography, fine art đen trắng</td>
                <td>Chân dung làm đẹp, ảnh em bé, sản phẩm mỹ phẩm (trừ khi muốn tạo hiệu ứng đặc biệt)</td>
              </tr>
              <tr>
                <td>Soft light</td>
                <td>Chân dung làm đẹp, ảnh em bé, sản phẩm mỹ phẩm, cảnh lãng mạn, food photography</td>
                <td>Ảnh cần kịch tính, ảnh kiến trúc cần đồ họa, ảnh cần nhấn mạnh kết cấu</td>
              </tr>
            </tbody>
          </table>
        </div>

        <hr className="doc-divider" />

        {/* 3.3 */}
        <h3 id="sec-3-3" className="scroll-mt-20">
          3. Công cụ điều chỉnh chất lượng ánh sáng
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <Lamp size={16} className="text-[#7c8aff]" />
              <span className="text-sm font-semibold text-[#e4e4ed]">Softbox / Diffuser</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Khuếch tán ánh sáng, biến hard light thành soft light. Softbox trong studio, mây trong tự nhiên, rèm mỏng trên cửa sổ — tất cả là diffuser. Càng lớn càng mềm.
            </p>
          </div>
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <Lamp size={16} className="text-[#ffcb6b]" />
              <span className="text-sm font-semibold text-[#e4e4ed]">Grid / Snoot</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Tập trung ánh sáng, biến soft light thành hard light có hướng. Grid trên softbox, snoot trên flash — tạo chùm sáng hẹp, kiểm soát spill. Dùng khi muốn chiếu sáng chọn lọc.
            </p>
          </div>
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <Lamp size={16} className="text-emerald-400" />
              <span className="text-sm font-semibold text-[#e4e4ed]">Reflector / Bounce</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Phản xạ ánh sáng, điền bóng (fill shadow). Reflector trắng, tường trắng, trần nhà — tất cả dội ánh sáng vào bóng, giảm tương phản. Kỹ thuật đơn giản nhưng hiệu quả cao.
            </p>
          </div>
        </div>

        {/* ============================================================ */}
        {/*  SECTION IV                                                   */}
        {/* ============================================================ */}
        <h2 id="sec-4" className="scroll-mt-20">
          <span className="section-num">Ⅳ</span>
          Ánh sáng tự nhiên vs nhân tạo
        </h2>

        <hr className="doc-divider" />

        {/* 4.1 */}
        <h3 id="sec-4-1" className="scroll-mt-20">
          1. Golden hour và Blue hour
        </h3>

        <p>
          Hai khoảng thời gian quyền lực nhất trong nhiếp ảnh tự nhiên — khi ánh sáng đạt đến chất lượng mà studio phải tốn hàng nghìn đô la để mô phỏng:
        </p>

        <div className="comparison-grid my-4">
          <div className="comp-card" style={{ borderColor: '#ffcb6b44' }}>
            <span className="sub-label" style={{ color: '#ffcb6b', background: 'rgba(255,203,107,0.1)' }}>GOLDEN HOUR</span>
            <h4>Giờ vàng</h4>
            <p>
              Khoảng 30-60 phút sau bình minh và trước hoàng hôn. Ánh sáng ấm vàng, góc thấp tạo side light tự nhiên, bóng dài và mềm. Nhiệt độ màu khoảng 3000-4000K. Đây là thời điểm lý tưởng cho chân dung, cảnh quan, và kiến trúc — ánh sáng &ldquo;thần thánh&rdquo; mà mọi nhiếp ảnh gia tranh giành.
            </p>
          </div>
          <div className="comp-card" style={{ borderColor: '#7c8aff44' }}>
            <span className="sub-label">BLUE HOUR</span>
            <h4>Giờ xanh</h4>
            <p>
              Khoảng 20-30 phút trước bình minh và sau hoàng hôn. Bầu trời xanh thẫm, ánh sáng lạnh và êm, thành phố lên đèn tạo tương phản ấm-lạnh. Nhiệt độ màu khoảng 6000-8000K. Lý tưởng cho cảnh đô thị, kiến trúc ban đêm, và ảnh có cả trời và đèn nhân tạo.
            </p>
          </div>
        </div>

        <div className="callout callout-photo">
          <div className="callout-title">
            <Camera size={13} className="inline mr-1" />
            Mẹo thực hành: Đừng chờ, hãy chuẩn bị
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Golden hour kéo dài chưa tới một giờ — và ánh sáng thay đổi liên tục. Hãy đến vị trí sớm, set up xong, và sẵn sàng chụp trước khi giờ vàng bắt đầu. Mỗi phút trôi qua, góc ánh sáng thay đổi, bóng dài thêm, và nhiệt độ màu ấm dần. Bức ảnh chụp ở phút đầu tiên khác hoàn toàn phút cuối cùng — và cả hai đều đẹp theo cách riêng.
          </p>
        </div>

        <hr className="doc-divider" />

        {/* 4.2 */}
        <h3 id="sec-4-2" className="scroll-mt-20">
          2. Ánh sáng studio và kiểm soát
        </h3>

        <p>
          Studio là phòng thí nghiệm của ánh sáng — nơi bạn kiểm soát mọi biến số: hướng, chất lượng, cường độ, nhiệt độ màu, và tỷ lệ sáng-tối. Nhưng kiểm soát tuyệt đối không có nghĩa là kết quả tốt hơn — nó có nghĩa là bạn có thể tạo ra chính xác những gì bạn tưởng tượng.
        </p>

        <p>Bốn sơ đồ ánh sáng cơ bản trong studio:</p>
        <ul className="factor-list">
          <li>
            <strong>Rembrandt lighting:</strong> Key light ở 45° bên và trên — tạo tam giác sáng trên má khuôn mặt bên kia. Được đặt theo tên họa sĩ vì ông thường dùng sơ đồ này. Kịch tính, cổ điển, nhiều chiều sâu.
          </li>
          <li>
            <strong>Loop lighting:</strong> Key light ở 30° bên và trên — tạo bóng nhỏ bên cạnh mũi. Phổ biến nhất trong chân dung thương mại vì vừa đủ chiều sâu mà không quá kịch tính.
          </li>
          <li>
            <strong>Butterfly lighting:</strong> Key light trực tiếp trên và trước — tạo bóng bướm dưới mũi. Thường dùng trong ảnh làm đẹp (beauty) vì nhấn mạnh xương gò má và tạo cảm giác sang trọng.
          </li>
          <li>
            <strong>Split lighting:</strong> Key light ở 90° bên — chia khuôn mặt thành nửa sáng nửa tối. Cực kỳ kịch tính, dùng trong fine art portrait và ảnh character.
          </li>
        </ul>

        {/* ============================================================ */}
        {/*  SECTION V                                                    */}
        {/* ============================================================ */}
        <h2 id="sec-5" className="scroll-mt-20">
          <span className="section-num-elite section-num">Ⅴ</span>
          Bóng tối như yếu tố sáng tác
        </h2>

        <hr className="doc-divider" />

        {/* 5.1 */}
        <h3 id="sec-5-1" className="scroll-mt-20">
          1. Bóng tối như công cụ bố cục
        </h3>

        <p>
          Bóng tối (shadow) không phải là sự thiếu vắng ánh sáng — nó là <span className="key-concept">yếu tố sáng tác tích cực</span>. Trong tay nhiếp ảnh gia có ý thức, bóng tối thực hiện nhiều chức năng: định hình hình khối (form shadow), tạo chiều sâu (cast shadow), che giấu chi tiết (shadow as negative space), và truyền tải cảm xúc (shadow as mood).
        </p>

        <p>Hai loại bóng trong nhiếp ảnh:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <Sun size={16} className="text-[#7c8aff]" />
              <span className="text-sm font-semibold text-[#e4e4ed]">Form shadow (Bóng hình khối)</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Phần tối trên chính bề mặt vật thể — nơi ánh sáng không chiếu tới. Form shadow tiết lộ hình khối 3D, tạo gradient từ sáng đến tối, và là thứ khiến một quả cam trông tròn thay vì phẳng.
            </p>
          </div>
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <Moon size={16} className="text-[#ffcb6b]" />
              <span className="text-sm font-semibold text-[#e4e4ed]">Cast shadow (Bóng đổ)</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Bóng mà vật thể đổ lên bề mặt khác. Cast shadow xác nhận vị trí vật thể trong không gian, tạo chiều sâu, và có thể trở thành yếu tố đồ họa mạnh mẽ — đặc biệt khi ánh sáng thấp (golden hour).
            </p>
          </div>
        </div>

        <hr className="doc-divider" />

        {/* 5.2 */}
        <h3 id="sec-5-2" className="scroll-mt-20">
          2. Silhouette — Nghệ thuật hình cắt
        </h3>

        <p>
          Silhouette là cực hạn của bóng tối — khi chủ thể hoàn toàn trong bóng, chỉ còn hình dáng đồ họa trên nền sáng. Đây là một trong những kỹ thuật thị giác mạnh mẽ nhất vì nó tước bỏ tất cả chi tiết — chỉ còn lại hình dạng thuần túy, và hình dạng phải đủ mạnh để gánh cả bức ảnh.
        </p>

        <p>Điều kiện tạo silhouette hiệu quả:</p>
        <ul className="factor-list">
          <li>
            <strong>Nền sáng hơn chủ thể ít nhất 3 stop:</strong> Measure light từ nền, exposure theo nền — chủ thể tự động tối đen. Đừng cố giữ chi tiết trong chủ thể — silhouette cần hình khối hoàn toàn đen.
          </li>
          <li>
            <strong>Hình dạng nhận diện ngay lập tức:</strong> Vì không có chi tiết bên trong, hình dáng phải đủ đặc trưng để nhận biết trong chưa tới 1 giây. Tư thế người, hình dáng cây, đường cong kiến trúc — phải &ldquo;nói&rdquo; chỉ bằng hình dạng.
          </li>
          <li>
            <strong>Không chồng lấp phức tạp:</strong> Nhiều chủ thể chồng lên nhau tạo ra hình dáng hỗn độn không đọc được. Silhouette tốt nhất khi các hình dáng tách biệt rõ ràng.
          </li>
        </ul>

        <hr className="doc-divider" />

        {/* 5.3 */}
        <h3 id="sec-5-3" className="scroll-mt-20">
          3. Chiaroscuro — Ánh sáng bóng tối tương phản
        </h3>

        <p>
          Chiaroscuro (Ý: sáng-tối) là kỹ thuật sử dụng tương phản mạnh giữa ánh sáng và bóng tối — có nguồn gốc từ hội họa Phục hưng (Caravaggio, Rembrandt) và đã trở thành một trong những ngôn ngữ thị giác quyền lực nhất trong nhiếp ảnh.
        </p>

        <p>
          Trong chiaroscuro, bóng tối không phải là nền — nó là <strong>chủ thể ngang hàng với ánh sáng</strong>. Không gian tối chiếm phần lớn khung hình, ánh sáng chỉ chiếu sáng những vùng cần thiết — và sự khan hiếm của ánh sáng khiến nó trở nên quý giá, thu hút mọi sự chú ý.
        </p>

        <div className="callout callout-elite">
          <div className="callout-title">
            <Sparkles size={13} className="inline mr-1" />
            Bí quyết của chiaroscuro
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Bí quyết không phải là ánh sáng — mà là bóng tối. Hãy bắt đầu từ bóng tối toàn bộ, rồi thêm ánh sáng chỉ ở những nơi bạn muốn người xem nhìn. Mỗi centimet vuông ánh sáng phải có lý do tồn tại. Nếu bạn không biết tại sao một vùng được chiếu sáng — hãy để nó tối.
          </p>
        </div>

        <hr className="doc-divider" />

        {/* 5.4 */}
        <h3 id="sec-5-4" className="scroll-mt-20">
          4. High key vs Low key
        </h3>

        <p>
          High key và Low key là hai phong cách ánh sáng đối lập — một trắng sáng, một tối đen — mỗi phong cách truyền tải một thế giới cảm xúc hoàn toàn khác:
        </p>

        <div className="comparison-grid my-4">
          <div className="comp-card" style={{ borderColor: '#e4e4ed44' }}>
            <span className="sub-label" style={{ color: '#e4e4ed', background: 'rgba(228,228,237,0.1)' }}>HIGH KEY</span>
            <h4>Ánh sáng chủ đạo sáng</h4>
            <p>
              Tông sáng chiếm 80-90% khung hình, bóng tối tối thiểu, cảm xúc nhẹ nhàng, trong sáng, lạc quan. High key khó hơn low key vì bạn phải tạo độ sáng đều mà không làm phẳng — vẫn cần gradient tinh tế để giữ hình khối. Thường thấy trong ảnh em bé, thời trang, sản phẩm mỹ phẩm, và nhiếp ảnh thực phẩm.
            </p>
          </div>
          <div className="comp-card" style={{ borderColor: '#1e1e2a' }}>
            <span className="sub-label" style={{ color: '#fb7185', background: 'rgba(251,113,133,0.1)' }}>LOW KEY</span>
            <h4>Ánh sáng chủ đạo tối</h4>
            <p>
              Tông tối chiếm 70-90% khung hình, ánh sáng chọn lọc, cảm xúc kịch tính, bí ẩn, mạnh mẽ. Low key dễ hơn high key vì bóng tối &ldquo;che&rdquo; nhiều lỗi — nhưng khó ở chỗ bạn phải kiểm soát chính xác vùng ánh sáng, nếu không bức ảnh sẽ trông như chụp thiếu sáng chứ không phải do ý đồ. Thường thấy trong fine art portrait, ảnh phim noir, và nhiếp ảnh sản phẩm xa xỉ.
            </p>
          </div>
        </div>

        <div className="quote-block">
          <p>
            &ldquo;Ánh sáng là ngôn từ đầu tiên của nhiếp ảnh. Bóng tối là khoảng lặng giữa các ngôn từ — và trong âm nhạc cũng như nhiếp ảnh, khoảng lặng mới là thứ tạo nên ý nghĩa.&rdquo;
          </p>
          <p className="quote-attr">— W. Eugene Smith</p>
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
              Nhiếp ảnh = vẽ bằng ánh sáng. Ánh sáng không chỉ là điều kiện kỹ thuật — nó là chất liệu nghệ thuật chính.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">02</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Bốn thuộc tính ánh sáng: hướng (direction), chất lượng (quality), nhiệt độ màu (color temperature), cường độ (intensity).
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">03</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Năm hướng ánh sáng — trước (phẳng), bên (kịch tính), sau (bí ẩn), trên (áp đảo), dưới (kỳ dị) — mỗi hướng một tính cách.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">04</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Hard light = nguồn sáng nhỏ, bóng sắc, tương phản cao. Soft light = nguồn sáng lớn, bóng mờ, tương phản thấp.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">05</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Golden hour (ấm vàng, góc thấp) và Blue hour (lạnh xanh, đèn lên) — hai khoảng thời gian quyền lực nhất.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">06</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Bóng tối là yếu tố sáng tác tích cực — form shadow tiết lộ hình khối, cast shadow tạo chiều sâu.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">07</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Chiaroscuro: bắt đầu từ bóng tối, thêm ánh sáng chỉ ở nơi cần — mỗi centimet ánh sáng phải có lý do.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">08</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              High key = sáng chủ đạo (nhẹ nhàng, lạc quan). Low key = tối chủ đạo (kịch tính, bí ẩn). Chọn theo cảm xúc đích.
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
              Nhiếp ảnh gia giỏi không chụp ánh sáng — họ chụp <strong>bóng tối</strong>. Ánh sáng định nghĩa hình dạng, nhưng bóng tối mang lại cảm xúc, chiều sâu và bí ẩn. Chiaroscuro — kỹ thuật tương phản sáng tối từ hội họa cổ điển — là nền tảng của mọi nhiếp ảnh có chiều sâu. Hãy học cách "đọc" bóng tối trước khi lo về nguồn sáng. Câu hỏi không phải "ánh sáng từ đâu?" mà là "bóng tối rơi vào đâu và nói gì?"
            </p>
          </div>
          <div className="callout callout-pitfall">
            <div className="callout-title">⚠ Bẫy chuyên gia</div>
            <p style={{ marginBottom: 0, lineHeight: 1.75 }}>
              Nghĩ rằng <strong>golden hour là "ánh sáng tốt nhất"</strong> là một niềm tin sai lầm lan rộng. Ánh sáng tốt nhất là ánh sáng phù hợp với câu chuyện bạn muốn kể. Ánh sáng buổi trưa khắc nghiệt là hoàn hảo cho ảnh về sức mạnh, khốc liệt, hay sự vô nhân đạo. Ánh sáng âm u mưa xám là hoàn hảo cho cô đơn và nặng nề. Đừng để "giờ đẹp" quyết định khi nào bạn được phép chụp.
            </p>
          </div>
          <div className="practice-exercise">
            <div className="practice-header">⬥ Bài tập thực chiến — Bản đồ ánh sáng & cảm xúc cá nhân</div>
            <div className="practice-body">
              <p>Xây dựng từ điển ánh sáng-cảm xúc riêng của bạn — không ai có thể làm điều này thay bạn:</p>
              <ol className="practice-steps">
                <li><strong>6:00 sáng — Golden hour sáng:</strong> Chụp cùng một chủ thể. Dùng một từ mô tả cảm xúc bức ảnh tạo ra.</li>
                <li><strong>12:00 trưa — Ánh sáng đỉnh:</strong> Cùng chủ thể, cùng vị trí. Một từ cảm xúc.</li>
                <li><strong>6:00 chiều — Golden hour chiều:</strong> Lặp lại. Một từ cảm xúc.</li>
                <li><strong>10:00 tối — Ánh sáng nhân tạo:</strong> Lặp lại. Một từ. Sau đó nhìn 4 từ cạnh nhau — đó là bản đồ cảm xúc ánh sáng của bạn.</li>
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
          <Link href="/khong-gian" className="group nav-card">
            <div className="nav-card-label">← Bài trước</div>
            <div className="nav-card-title">6. Không gian âm dương</div>
            <div className="nav-card-desc">Ngôn ngữ thị giác</div>
          </Link>
          <Link href="/mau-sac" className="group nav-card text-right">
            <div className="nav-card-label">Bài tiếp →</div>
            <div className="nav-card-title">8. Màu sắc</div>
            <div className="nav-card-desc">Ngôn ngữ thị giác</div>
          </Link>
        </div>

        {/* Footer */}
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

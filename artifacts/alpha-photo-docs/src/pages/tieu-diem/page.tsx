

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
  Aperture,
  Focus,
  Target,
  Circle,
  Layers,
  Sparkles,
  BookOpen,
  Check,
  Ruler,
  Wind,
  Scan,
} from 'lucide-react';
import DocsLayout from '@/components/docs-layout';

/* ------------------------------------------------------------------ */
/*  TOC Data                                                          */
/* ------------------------------------------------------------------ */
const tocSections = [
  { id: 'sec-1', label: 'Ⅰ. Tiêu điểm trong nhiếp ảnh', level: 1 },
  { id: 'sec-1-1', label: '1. Tiêu điểm là gì', level: 2 },
  { id: 'sec-1-2', label: '2. Sắc nét và mềm mại', level: 2 },
  { id: 'sec-1-3', label: '3. Tự động và thủ công', level: 2 },
  { id: 'sec-1-4', label: '4. Tiêu điểm như công cụ kể chuyện', level: 2 },
  { id: 'sec-2', label: 'Ⅱ. Độ sâu trường ảnh (DOF)', level: 1 },
  { id: 'sec-2-1', label: '1. DOF là gì', level: 2 },
  { id: 'sec-2-2', label: '2. Khẩu độ và DOF', level: 2 },
  { id: 'sec-2-3', label: '3. DOF nông và DOF sâu', level: 2 },
  { id: 'sec-2-4', label: '4. Khoảng cách siêu tiêu', level: 2 },
  { id: 'sec-3', label: 'Ⅲ. Kiểm soát DOF', level: 1 },
  { id: 'sec-3-1', label: '1. Khẩu độ', level: 2 },
  { id: 'sec-3-2', label: '2. Khoảng cách chủ thể', level: 2 },
  { id: 'sec-3-3', label: '3. Tiêu cự ống kính', level: 2 },
  { id: 'sec-3-4', label: '4. Kích thước cảm biến', level: 2 },
  { id: 'sec-4', label: 'Ⅳ. Bokeh và chất lượng vùng mờ', level: 1 },
  { id: 'sec-4-1', label: '1. Bokeh là gì', level: 2 },
  { id: 'sec-4-2', label: '2. Bokeh tốt và bokeh kém', level: 2 },
  { id: 'sec-4-3', label: '3. Số cánh cánh và bokeh', level: 2 },
  { id: 'sec-4-4', label: '4. Bokeh như yếu tố thẩm mỹ', level: 2 },
  { id: 'sec-5', label: 'Ⅴ. Tiêu điểm chọn lọc', level: 1 },
  { id: 'sec-5-1', label: '1. Selective Focus như bố cục', level: 2 },
  { id: 'sec-5-2', label: '2. Rack Focus', level: 2 },
  { id: 'sec-5-3', label: '3. Focus Stacking', level: 2 },
  { id: 'sec-5-4', label: '4. Zone Focusing cho đường phố', level: 2 },
  { id: 'summary', label: 'Tóm tắt 8 điểm chính', level: 1 },
];

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */
export default function TieuDiemPage() {
  const [isRead, setIsRead] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('alpha-doc-read');
      if (saved) {
        const readPages: string[] = JSON.parse(saved);
        if (readPages.includes('/tieu-diem')) setIsRead(true);
      }
    } catch {}
  }, []);

  const toggleRead = () => {
    try {
      const saved = localStorage.getItem('alpha-doc-read');
      const readPages: string[] = saved ? JSON.parse(saved) : [];
      if (isRead) {
        const updated = readPages.filter((p) => p !== '/tieu-diem');
        localStorage.setItem('alpha-doc-read', JSON.stringify(updated));
        setIsRead(false);
      } else {
        const updated = [...readPages, '/tieu-diem'];
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
          <span className="text-[#9d9db5]">Tiêu điểm & Độ sâu</span>
        </div>

        {/* Badges */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold font-mono px-2 py-0.5 rounded bg-[rgba(124,138,255,0.1)] text-[#7c8aff]">
            HA15
          </span>
          <span className="text-[11px] text-[#6b6b80]">18 phút đọc · #TieuDiem #DOF #Bokeh #NguonLucThiGiac</span>
          <span className="elite-badge">
            <GraduationCap size={11} />
            Nâng cao
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-[#e4e4ed] leading-tight mb-3 border-none pb-0">
          Tiêu điểm & Độ sâu
        </h1>

        {/* Subtitle */}
        <p className="text-base text-[#9d9db5] leading-relaxed mb-6" style={{ marginTop: 0 }}>
          Bố cục & Góc nhìn · Bài 15 — Kiểm soát thứ người xem nhìn thấy — và thứ họ không thấy
        </p>

        {/* Hero image */}
        <div className="color-overview-hero rounded-xl overflow-hidden border border-[#1e1e2a] mb-8">
          <img
            src="/hero-tieu-diem.png"
            alt="Infographic tổng quan về tiêu điểm và độ sâu trường ảnh: focus, DOF, khẩu độ, bokeh, hyperfocal và ứng dụng thực tế"
            className="w-full h-auto object-contain"
            loading="eager"
          />
        </div>

        {/* Opening Quote */}
        <div className="quote-block">
          <p>
            &ldquo;Tiêu điểm không chỉ quyết định điều gì sắc nét — nó quyết định điều gì quan trọng. Mọi thứ sắc nét là không có gì quan trọng. Chỉ có một thứ sắc nét là sự lựa chọn.&rdquo;
          </p>
        </div>

        {/* ============================================================ */}
        {/*  SECTION I                                                    */}
        {/* ============================================================ */}
        <h2 id="sec-1" className="scroll-mt-20">
          <span className="section-num">Ⅰ</span>
          Tiêu điểm trong nhiếp ảnh
        </h2>

        <p className="drop-cap">
          Tiêu điểm (focus) là nền tảng kỹ thuật quan trọng nhất của nhiếp ảnh — vì nó xác định trực tiếp điều gì sắc nét trong bức ảnh, và điều gì không. Nhưng vượt xa kỹ thuật, tiêu điểm còn là công cụ kể chuyện: bạn chọn làm sắc nét điều gì, là bạn chọn nhấn mạnh điều gì. Trong một thế giới mà mắt người chỉ có thể nhìn sắc nét tại một điểm duy nhất tại một thời điểm, sự lựa chọn tiêu điểm chính là sự lựa chọn ưu tiên.
        </p>

        <hr className="doc-divider" />

        {/* 1.1 */}
        <h3 id="sec-1-1" className="scroll-mt-20">
          1. Tiêu điểm là gì
        </h3>

        <p>
          Tiêu điểm là quá trình điều chỉnh ống kính sao cho ánh sáng từ một khoảng cách cụ thể hội tụ chính xác trên cảm biến (hoặc phim), tạo ra hình ảnh sắc nét nhất tại điểm đó. Mọi khoảng cách khác — gần hơn hoặc xa hơn — sẽ ở các mức độ mềm mại (soft) khác nhau.
        </p>

        <div className="callout callout-key">
          <div className="callout-title">
            <Lightbulb size={13} className="inline mr-1" />
            Sắc nét là tương đối
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Không có khoảng nào trong ảnh là &ldquo;hoàn toàn sắc nét&rdquo; hay &ldquo;hoàn toàn mờ&rdquo;. Sắc nét tồn tại trên một phổ liên tục — từ sắc nét tuyệt đối tại điểm tiêu chuẩn, dần mềm mại khi xa hơn. Độ sâu trường ảnh (DOF) chính là phạm vi mà trong đó độ sắc nét được xem là &ldquo;chấp nhận được&rdquo; theo tiêu chí mắt người.
          </p>
        </div>

        <hr className="doc-divider" />

        {/* 1.2 */}
        <h3 id="sec-1-2" className="scroll-mt-20">
          2. Sắc nét và mềm mại — Hai ngôn ngữ khác nhau
        </h3>

        <p>
          Sắc nét (sharp) và mềm mại (soft) không phải là &ldquo;tốt&rdquo; và &ldquo;xấu&rdquo; — chúng là hai ngôn ngữ khác nhau:
        </p>

        <div className="comparison-grid my-4">
          <div className="comp-card">
            <span className="sub-label">SẮC NÉT</span>
            <h4>Chi tiết, hiện thực, cụ thể</h4>
            <p>
              Sắc nét nói: &ldquo;Hãy nhìn kỹ. Mọi chi tiết đều quan trọng.&rdquo; Nó đòi hỏi sự chú ý, tạo cảm giác hiện thực, chính xác, và cụ thể. Phù hợp cho kiến trúc, sản phẩm, tài liệu.
            </p>
          </div>
          <div className="comp-card" style={{ borderColor: '#a855f733' }}>
            <span className="sub-label" style={{ color: '#a855f7', background: 'rgba(168,85,247,0.1)' }}>MỀM MẠI</span>
            <h4>Cảm xúc, mơ mộng, trừu tượng</h4>
            <p>
              Mềm mại nói: &ldquo;Hãy cảm nhận. Không cần nhìn rõ mọi thứ.&rdquo; Nó tạo không gian cho trí tưởng tượng, cảm giác mơ mộng, hoài niệm. Phù hợp cho chân dung nghệ thuật, phong cảnh ám ảnh, fine art.
            </p>
          </div>
        </div>

        <hr className="doc-divider" />

        {/* 1.3 */}
        <h3 id="sec-1-3" className="scroll-mt-20">
          3. Tự động tiêu điểm và thủ công tiêu điểm
        </h3>

        <p>
          Autofocus (AF) hiện đại cực kỳ nhanh và chính xác — nhưng nó không biết bạn muốn nhấn mạnh điều gì. Nó tìm &ldquo;điểm sắc nét nhất&rdquo; theo thuật toán, không theo câu chuyện. Manual Focus (MF) chậm hơn nhưng cho phép bạn kiểm soát hoàn toàn — và trong nhiều tình huống, đó là sự khác biệt giữa một bức ảnh &ldquo;đúng&rdquo; và một bức ảnh &ldquo;có ý nghĩa&rdquo;.
        </p>

        <p>Khi nào dùng Manual Focus:</p>
        <ul className="factor-list">
          <li>
            <strong>Macro photography:</strong> DOF cực nông, AF thường lấy sai điểm.
          </li>
          <li>
            <strong>Low light:</strong> AF không tìm được contrast đủ để focus.
          </li>
          <li>
            <strong>Khi chủ thể không phải điểm gần nhất:</strong> AF mặc định focus vào vật gần nhất — không phải lúc nào cũng đúng.
          </li>
          <li>
            <strong>Fine art và creative blur:</strong> Khi bạn cố tình muốn mềm mại một phần nhất định.
          </li>
        </ul>

        <hr className="doc-divider" />

        {/* 1.4 */}
        <h3 id="sec-1-4" className="scroll-mt-20">
          4. Tiêu điểm như công cụ kể chuyện
        </h3>

        <p>
          Tiêu điểm là cách đơn giản và trực tiếp nhất để nói &ldquo;điều này quan trọng, điều kia không&rdquo;. Khi bạn làm sắc nét một yếu tố và mềm mại phần còn lại, bạn đang tạo ra phân cấp thị giác (visual hierarchy) — và phân cấp thị giác chính là cấu trúc của câu chuyện.
        </p>

        <div className="callout callout-photo">
          <div className="callout-title">
            <Camera size={13} className="inline mr-1" />
            Ví dụ thực tế
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Một bữa tiệc sinh nhật: Focus vào ngọn nến trên bánh = câu chuyện về lời ước. Focus vào khuôn mặt người thổi nến = câu chuyện về niềm vui. Focus vào tay người mẹ đang cầm dao cắt bánh = câu chuyện về sự chăm sóc. Cùng một khoảnh khắc, ba câu chuyện hoàn toàn khác nhau — chỉ vì tiêu điểm khác nhau.
          </p>
        </div>

        {/* ============================================================ */}
        {/*  SECTION II                                                   */}
        {/* ============================================================ */}
        <h2 id="sec-2" className="scroll-mt-20">
          <span className="section-num">Ⅱ</span>
          Độ sâu trường ảnh (DOF)
        </h2>

        <p>
          Độ sâu trường ảnh (Depth of Field — DOF) là phạm vi khoảng cách mà trong đó chủ thể xuất hiện sắc nét chấp nhận được trong bức ảnh. Nó là khái niệm trung tâm nhất của nhiếp ảnh kỹ thuật — và cũng là công cụ sáng tạo mạnh mẽ nhất.
        </p>

        <hr className="doc-divider" />

        {/* 2.1 */}
        <h3 id="sec-2-1" className="scroll-mt-20">
          1. DOF là gì
        </h3>

        <p>
          Khi bạn focus tại một điểm, có một vùng trước và sau điểm đó vẫn sắc nét &ldquo;chấp nhận được&rdquo; — đó là DOF. Vùng trước điểm focus gọi là <span className="key-concept">near limit</span>, vùng sau gọi là <span className="key-concept">far limit</span>. Đặc điểm quan trọng: DOF không phân bố đều — khoảng 1/3 DOF nằm trước điểm focus, 2/3 nằm sau.
        </p>

        <hr className="doc-divider" />

        {/* 2.2 */}
        <h3 id="sec-2-2" className="scroll-mt-20">
          2. Khẩu độ và DOF — Mối quan hệ cốt lõi
        </h3>

        <p>
          Khẩu độ (aperture) là yếu tố ảnh hưởng lớn nhất đến DOF. Quy tắc cơ bản: khẩu độ lớn (số f nhỏ như f/1.4, f/2.0) = DOF nông; khẩu độ nhỏ (số f lớn như f/11, f/16) = DOF sâu.
        </p>

        <div className="overflow-x-auto my-4 rounded-lg border border-[#1e1e2a]">
          <table className="doc-table">
            <thead>
              <tr>
                <th>Khẩu độ</th>
                <th>DOF</th>
                <th>Ứng dụng điển hình</th>
                <th>Đặc điểm</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>f/1.4 – f/2.8</td>
                <td>Rất nông</td>
                <td>Chân dung, low-light, isolation</td>
                <td>Chủ thể sắc nét, nền cực mờ, bokeh mạnh</td>
              </tr>
              <tr>
                <td>f/4 – f/5.6</td>
                <td>Nông vừa</td>
                <td>Thời trang, sản phẩm, lifestyle</td>
                <td>Chủ thể sắc nét, nền nhận dạng được nhưng mềm</td>
              </tr>
              <tr>
                <td>f/8 – f/11</td>
                <td>Trung bình</td>
                <td>Street, documentary, kiến trúc</td>
                <td>Hầu hết sắc nét, nền vẫn có chút mềm</td>
              </tr>
              <tr>
                <td>f/16 – f/22</td>
                <td>Rất sâu</td>
                <td>Phong cảnh, hyperfocal, group photo</td>
                <td>Tất cả sắc nét từ trước ra sau</td>
              </tr>
            </tbody>
          </table>
        </div>

        <hr className="doc-divider" />

        {/* 2.3 */}
        <h3 id="sec-2-3" className="scroll-mt-20">
          3. DOF nông và DOF sâu — Hai triết lý
        </h3>

        <div className="comparison-grid my-4">
          <div className="comp-card">
            <span className="sub-label">DOF NÔNG (SHALLOW)</span>
            <h4>Cô lập và nhấn mạnh</h4>
            <p>
              Tách chủ thể khỏi bối cảnh bằng cách làm nền cực mờ. Phong cách phổ biến trong chân dung hiện đại, product photography, và fine art. DOF nông nói: &ldquo;Chỉ nhìn vào điều này. Mọi thứ khác không quan trọng.&rdquo;
            </p>
          </div>
          <div className="comp-card" style={{ borderColor: '#22c55e44' }}>
            <span className="sub-label" style={{ color: '#22c55e', background: 'rgba(34,197,94,0.1)' }}>DOF SÂU (DEEP)</span>
            <h4>Ngữ cảnh và toàn cảnh</h4>
            <p>
              Mọi thứ sắc nét từ trước ra sau, cho người xem thấy mối quan hệ giữa chủ thể và bối cảnh. Phong cách của Ansel Adams, Group f/64, và nhiếp ảnh phong cảnh đỉnh cao. DOF sâu nói: &ldquo;Mọi thứ đều quan trọng. Mối quan hệ giữa chúng là câu chuyện.&rdquo;
            </p>
          </div>
        </div>

        <hr className="doc-divider" />

        {/* 2.4 */}
        <h3 id="sec-2-4" className="scroll-mt-20">
          4. Khoảng cách siêu tiêu (Hyperfocal Distance)
        </h3>

        <p>
          Khoảng cách siêu tiêu là khoảng cách focus gần nhất mà tại đó mọi thứ từ một nửa khoảng cách đó đến vô cực đều sắc nét chấp nhận được. Đây là kỹ thuật tối quan trọng cho nhiếp ảnh phong cảnh — nó cho phép bạn có DOF sâu nhất có thể.
        </p>

        <div className="hotspot-card my-4">
          <div className="flex items-center gap-2 mb-2">
            <Ruler size={16} className="text-[#7c8aff]" />
            <span className="text-sm font-semibold text-[#e4e4ed]">Cách tìm hyperfocal distance</span>
          </div>
          <p className="text-xs text-[#9d9db5] leading-relaxed">
            Công thức: H = (f² × N) / (c × 1000) + f. Trong đó: f = tiêu cự (mm), N = số f, c = circle of confusion (0.03mm cho full-frame). Ví dụ: ống 24mm ở f/11 → H ≈ 1.75m. Focus tại 1.75m → mọi thứ từ 0.88m đến ∞ đều sắc nét. Thực tế: nhiều ứng dụng điện thoại (PhotoPills, DOF Calculator) tính sẵn cho bạn.
          </p>
        </div>

        {/* ============================================================ */}
        {/*  SECTION III                                                  */}
        {/* ============================================================ */}
        <h2 id="sec-3" className="scroll-mt-20">
          <span className="section-num">Ⅲ</span>
          Kiểm soát DOF
        </h2>

        <p>
          Bốn yếu tố kiểm soát DOF — hiểu rõ từng yếu tố cho phép bạn kiểm soát chính xác vùng sắc nét trong bức ảnh.
        </p>

        <hr className="doc-divider" />

        {/* 3.1 */}
        <h3 id="sec-3-1" className="scroll-mt-20">
          1. Khẩu độ — Yếu tố mạnh nhất
        </h3>

        <div className="hotspot-card my-4">
          <div className="flex items-center gap-2 mb-2">
            <Aperture size={16} className="text-[#7c8aff]" />
            <span className="text-sm font-semibold text-[#e4e4ed]">Khẩu độ và DOF</span>
          </div>
          <p className="text-xs text-[#9d9db5] leading-relaxed">
            Khẩu độ là &ldquo;công tắc chính&rdquo; của DOF. Mỗi bước dừng khẩu độ (f-stop) thay đổi DOF đáng kể. Từ f/2.8 xuống f/4: DOF tăng khoảng 40%. Từ f/4 xuống f/5.6: tăng thêm 40% nữa. Quy tắc ngón tay cái: muốn DOF nông → mở khẩu (số f nhỏ), muốn DOF sâu → thu khẩu (số f lớn).
          </p>
        </div>

        <hr className="doc-divider" />

        {/* 3.2 */}
        <h3 id="sec-3-2" className="scroll-mt-20">
          2. Khoảng cách chủ thể — Yếu tố bị bỏ qua nhiều nhất
        </h3>

        <div className="hotspot-card my-4">
          <div className="flex items-center gap-2 mb-2">
            <Target size={16} className="text-[#ffcb6b]" />
            <span className="text-sm font-semibold text-[#e4e4ed]">Khoảng cách và DOF</span>
          </div>
          <p className="text-xs text-[#9d9db5] leading-relaxed">
            Càng lại gần chủ thể, DOF càng nông — bất kể khẩu độ. Ở f/2.8, focus ở 1m cho DOF khoảng 10cm, nhưng focus ở 5m cho DOF khoảng 2.5m. Đây là lý do tại sao macro photography có DOF cực nông — vì khoảng cách focus cực gần. Ngược lại, focus ở xa (20m+) cho DOF rất sâu ngay cả ở khẩu độ lớn.
          </p>
        </div>

        <hr className="doc-divider" />

        {/* 3.3 */}
        <h3 id="sec-3-3" className="scroll-mt-20">
          3. Tiêu cự ống kính — Yếu tố nhạy cảm nhất
        </h3>

        <div className="hotspot-card my-4">
          <div className="flex items-center gap-2 mb-2">
            <Focus size={16} className="text-emerald-400" />
            <span className="text-sm font-semibold text-[#e4e4ed]">Tiêu cự và DOF</span>
          </div>
          <p className="text-xs text-[#9d9db5] leading-relaxed">
            Ống kính dài (tele) = DOF nông hơn. Ống kính ngắn (wide) = DOF sâu hơn. Ở cùng f/2.8 và cùng khoảng cách, ống 200mm cho DOF nông hơn ống 50mm rất nhiều. Đây là lý do chân dung thường dùng 85mm f/1.8 — kết hợp tele ngắn với khẩu độ lớn cho DOF nông hoàn hảo.
          </p>
        </div>

        <hr className="doc-divider" />

        {/* 3.4 */}
        <h3 id="sec-3-4" className="scroll-mt-20">
          4. Kích thước cảm biến — Yếu tố hệ thống
        </h3>

        <div className="hotspot-card my-4">
          <div className="flex items-center gap-2 mb-2">
            <Scan size={16} className="text-[#a855f7]" />
            <span className="text-sm font-semibold text-[#e4e4ed]">Cảm biến và DOF</span>
          </div>
          <p className="text-xs text-[#9d9db5] leading-relaxed">
            Cảm biến lớn hơn (full-frame, medium format) = DOF nông hơn ở cùng góc nhìn và khẩu độ. Cảm biến nhỏ hơn (APS-C, Micro 4/3) = DOF sâu hơn. Đây là lý do tại sao điện thoại (cảm biến cực nhỏ) hầu như không có DOF nông tự nhiên — và phải dùng tính năng &ldquo;portrait mode&rdquo; giả lập. Ngược lại, medium format cho DOF nông tự nhiên cực kỳ đẹp.
          </p>
        </div>

        <div className="overflow-x-auto my-4 rounded-lg border border-[#1e1e2a]">
          <table className="doc-table">
            <thead>
              <tr>
                <th>Yếu tố</th>
                <th>Thay đổi</th>
                <th>Hiệu ứng DOF</th>
                <th>Mức ảnh hưởng</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Khẩu độ</td>
                <td>Mở khẩu (số f ↓)</td>
                <td>DOF nông hơn</td>
                <td>Mạnh nhất</td>
              </tr>
              <tr>
                <td>Khoảng cách</td>
                <td>Lại gần chủ thể</td>
                <td>DOF nông hơn</td>
                <td>Rất mạnh</td>
              </tr>
              <tr>
                <td>Tiêu cự</td>
                <td>Ống dài hơn (tele)</td>
                <td>DOF nông hơn</td>
                <td>Mạnh</td>
              </tr>
              <tr>
                <td>Cảm biến</td>
                <td>Cảm biến lớn hơn</td>
                <td>DOF nông hơn</td>
                <td>Trung bình</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ============================================================ */}
        {/*  SECTION IV                                                   */}
        {/* ============================================================ */}
        <h2 id="sec-4" className="scroll-mt-20">
          <span className="section-num">Ⅳ</span>
          Bokeh và chất lượng vùng mờ
        </h2>

        <p>
          Bokeh (từ tiếng Nhật &ldquo;boke&rdquo; — mờ nhạt) là chất lượng thẩm mỹ của vùng mờ ngoài tiêu điểm. Không phải mọi vùng mờ đều có bokeh đẹp — và sự khác biệt giữa bokeh tốt và bokeh kém là ranh giới giữa một bức ảnh hấp dẫn và một bức ảnh khó chịu.
        </p>

        <hr className="doc-divider" />

        {/* 4.1 */}
        <h3 id="sec-4-1" className="scroll-mt-20">
          1. Bokeh là gì
        </h3>

        <p>
          Bokeh không phải là &ldquo;mờ nền&rdquo; — đó là DOF nông. Bokeh là <span className="key-concept">chất lượng</span> của vùng mờ đó. Hãy tưởng tượng hai bức ảnh cùng DOF nông: một bức có bokeh mịn màng, cream-like, dễ chịu — bức kia có bokeh giật, nervous, khó chịu. Cùng một mức độ mờ, nhưng trải nghiệm thị giác hoàn toàn khác.
        </p>

        <hr className="doc-divider" />

        {/* 4.2 */}
        <h3 id="sec-4-2" className="scroll-mt-20">
          2. Bokeh tốt và bokeh kém
        </h3>

        <div className="comparison-grid my-4">
          <div className="comp-card">
            <span className="sub-label">BOKEH TỐT (CREAM)</span>
            <h4>Mịn màng, dễ chịu, hòa quyện</h4>
            <p>
              Vùng sáng mờ tròn trịa, mịn màng, chuyển đổi mượt mà từ sắc nét sang mềm. Điểm sáng ngoài focus trở thành những vòng tròn mềm, hòa vào nhau. Bokeh cream tạo cảm giác êm ái, lãng mạn.
            </p>
          </div>
          <div className="comp-card" style={{ borderColor: '#fb718533' }}>
            <span className="sub-label" style={{ color: '#fb7185', background: 'rgba(251,113,133,0.1)' }}>BOKEH KÉM (NERVOUS)</span>
            <h4>Giật, khó chịu, phân tán</h4>
            <p>
              Vùng sáng mờ có viền rõ (ring bokeh), không đều, hoặc có hình dạng kỳ lạ. Điểm sáng ngoài focus trở thành vòng tròn có viền sáng bên ngoài — tạo ra &ldquo;donut bokeh&rdquo; phân tán sự chú ý thay vì hòa quyện.
            </p>
          </div>
        </div>

        <hr className="doc-divider" />

        {/* 4.3 */}
        <h3 id="sec-4-3" className="scroll-mt-20">
          3. Số cánh cánh và hình dạng bokeh
        </h3>

        <p>
          Số cánh cánh (blade) của khẩu độ quyết định hình dạng bokeh khi khẩu độ không mở hoàn toàn:
        </p>

        <ul className="factor-list">
          <li>
            <strong>5-6 cánh:</strong> Bokeh hình ngũ/lục giác — trông &ldquo;cheap&rdquo;, viền rõ, nervous.
          </li>
          <li>
            <strong>7-8 cánh:</strong> Bokeh gần tròn hơn — viền mượt hơn, chất lượng tốt.
          </li>
          <li>
            <strong>9+ cánh (circular aperture):</strong> Bokeh gần như tròn hoàn hảo — cream, mịn, cao cấp.
          </li>
          <li>
            <strong>Khẩu độ mở hoàn toàn:</strong> Hình dạng bokeh phụ thuộc vào thiết kế thấu kính, không phải cánh khẩu — nên ống f/1.4 có bokeh khác nhau tùy thiết kế.
          </li>
        </ul>

        <hr className="doc-divider" />

        {/* 4.4 */}
        <h3 id="sec-4-4" className="scroll-mt-20">
          4. Bokeh như yếu tố thẩm mỹ
        </h3>

        <p>
          Bokeh không chỉ là &ldquo;nền mờ&rdquo; — nó có thể là chủ đề chính của bức ảnh. Nhiều nhiếp ảnh gia fine art sử dụng bokeh như một yếu tố sáng tác: vòng tròn bokeh lớn từ đèn đường, dải bokeh từ ánh sáng phản chiếu, hoặc swirly bokeh từ vintage lens.
        </p>

        <div className="callout callout-key">
          <div className="callout-title">
            <Lightbulb size={13} className="inline mr-1" />
            Vintage Lens và Swirly Bokeh
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Ống kính cổ (Helios 44-2, Biotar) nổi tiếng với &ldquo;swirly bokeh&rdquo; — bokeh xoắn ốc ở vùng ngoài tâm. Trước đây được coi là &ldquo;lỗi&rdquo;, nay nó trở thành phong cách artistic độc đáo. Điều này nhắc nhở chúng ta: &ldquo;lỗi&rdquo; kỹ thuật trong một ngữ cảnh có thể là &ldquo;đặc trưng nghệ thuật&rdquo; trong ngữ cảnh khác.
          </p>
        </div>

        {/* ============================================================ */}
        {/*  SECTION V                                                    */}
        {/* ============================================================ */}
        <h2 id="sec-5" className="scroll-mt-20">
          <span className="section-num-elite">Ⅴ</span>
          Tiêu điểm chọn lọc
        </h2>

        <p>
          Tiêu điểm chọn lọc (selective focus) là kỹ thuật sử dụng DOF một cách có chủ đích để điều hướng sự chú ý của người xem. Nó không chỉ là &ldquo;làm mờ nền&rdquo; — nó là cách bạn kể câu chuyện bằng cách quyết định người xem được thấy gì và không được thấy gì.
        </p>

        <hr className="doc-divider" />

        {/* 5.1 */}
        <h3 id="sec-5-1" className="scroll-mt-20">
          1. Selective Focus như kỹ thuật bố cục
        </h3>

        <p>
          Selective focus là một trong những công cụ bố cục mạnh nhất vì nó hoạt động ở cấp độ sinh học: mắt người tự động bị thu hút vào vùng sắc nét nhất trong hình ảnh. Bạn không cần &ldquo;nhìn vào đây&rdquo; — sự sắc nét đã làm việc đó.
        </p>

        <p>Các chiến lược selective focus:</p>
        <ul className="factor-list">
          <li>
            <strong>Focus-forward:</strong> Focus vào foreground, làm mờ background — tạo chiều sâu, nhấn mạnh foreground.
          </li>
          <li>
            <strong>Focus-through:</strong> Focus vào background, làm mờ foreground — tạo cảm giác quan sát qua rào cản, bí ẩn.
          </li>
          <li>
            <strong>Mid-focus:</strong> Focus vào midground — foreground và background đều mờ — tạo cảm giác cô lập.
          </li>
        </ul>

        <hr className="doc-divider" />

        {/* 5.2 */}
        <h3 id="sec-5-2" className="scroll-mt-20">
          2. Rack Focus — Chuyển tiêu điểm
        </h3>

        <p>
          Rack focus là kỹ thuật chuyển tiêu điểm từ yếu tố này sang yếu tố khác trong cùng một khung hình — thường dùng trong video nhưng cũng áp dụng được cho nhiếp ảnh (shooting burst với focus shift). Nó tạo ra sự chuyển dịch câu chuyện: điều quan trọng thay đổi — và người xem phải điều chỉnh theo.
        </p>

        <hr className="doc-divider" />

        {/* 5.3 */}
        <h3 id="sec-5-3" className="scroll-mt-20">
          3. Focus Stacking — Vượt qua giới hạn DOF
        </h3>

        <p>
          Focus stacking là kỹ thuật chụp nhiều ảnh cùng bố cục nhưng focus ở các khoảng cách khác nhau, sau đó ghép (stack) lại trong hậu kỳ để tạo ra DOF sâu hơn bất kỳ ảnh đơn lẻ nào có thể đạt được. Kỹ thuật này đặc biệt quan trọng trong:
        </p>

        <ul className="factor-list">
          <li>
            <strong>Macro photography:</strong> DOF tự nhiên cực nông — focus stacking là cách duy nhất để có toàn bộ chủ thể sắc nét.
          </li>
          <li>
            <strong>Phong cảnh cận cảnh:</strong> Khi foreground rất gần và background rất xa — một DOF duy nhất không thể bao quát.
          </li>
          <li>
            <strong>Sản phẩm:</strong> Khi cần toàn bộ sản phẩm sắc nét nhưng vẫn muốn khẩu độ lớn cho chất lượng ảnh tốt nhất.
          </li>
        </ul>

        <hr className="doc-divider" />

        {/* 5.4 */}
        <h3 id="sec-5-4" className="scroll-mt-20">
          4. Zone Focusing cho đường phố
        </h3>

        <p>
          Zone focusing là kỹ thuật thiết lập trước khoảng cách focus và khẩu độ để tạo ra một &ldquo;vùng sắc nét&rdquo; (zone) nhất định — không cần autofocus hay nhìn vào viewfinder. Đây là kỹ thuật then chốt của street photography, nơi tốc độ phản ứng quyết định sự thành bại.
        </p>

        <div className="hotspot-card my-4">
          <div className="flex items-center gap-2 mb-2">
            <Wind size={16} className="text-[#ffcb6b]" />
            <span className="text-sm font-semibold text-[#e4e4ed]">Cài đặt Zone Focus điển hình</span>
          </div>
          <p className="text-xs text-[#9d9db5] leading-relaxed">
            Ống 28mm hoặc 35mm, khẩu độ f/8 hoặc f/11, focus trước ở khoảng cách 2-3m. Với cài đặt này, mọi thứ từ khoảng 1.5m đến 5m sẽ sắc nét chấp nhận được. Khi chụp, chỉ cần bước vào khoảng cách đó và bấm — không cần nhìn viewfinder, không cần AF. Henri Cartier-Bresson đã dùng phương pháp này để tạo ra những khoảnh khắc &ldquo;decisive moment&rdquo; huyền thoại.
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
              Tiêu điểm không chỉ quyết định điều gì sắc nét — nó quyết định điều gì quan trọng.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">02</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              DOF (độ sâu trường ảnh) là phạm vi sắc nét chấp nhận được — không phải nhị phân sắc/mờ.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">03</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Bốn yếu tố kiểm soát DOF: khẩu độ (mạnh nhất), khoảng cách, tiêu cự, kích thước cảm biến.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">04</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              DOF nông = cô lập và nhấn mạnh. DOF sâu = ngữ cảnh và toàn cảnh. Cả hai đều hợp lệ.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">05</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Bokeh là chất lượng vùng mờ — không phải lượng mờ. Bokeh cream ≠ bokeh nervous.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">06</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Số cánh khẩu ảnh hưởng hình dạng bokeh: 9+ cánh cho bokeh gần tròn, cream-like.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">07</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Selective focus là công cụ bố cục hoạt động ở cấp độ sinh học — mắt tự động bị thu hút vào vùng sắc nét.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">08</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Zone focusing cho phép chụp mà không cần AF — kỹ thuật then chốt của street photography.
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
              Shallow DOF không phải là "nhiếp ảnh nghệ thuật" — nó là một <strong>công cụ</strong>. Dùng sai, nó trở thành cách che giấu sự thiếu tư duy về bố cục. Ảnh thực sự mạnh có thể được chụp f/8 — mọi thứ sắc nét, không có chỗ ẩn nấp, và vẫn khiến bạn không thể nhìn đi chỗ khác. Câu hỏi thực sự: <em>"Nếu xóa bokeh đi, ảnh này còn đủ mạnh không?"</em> Nếu câu trả lời là không, vấn đề không phải là f-stop.
            </p>
          </div>
          <div className="callout callout-pitfall">
            <div className="callout-title">⚠ Bẫy chuyên gia</div>
            <p style={{ marginBottom: 0, lineHeight: 1.75 }}>
              Nhầm <strong>"bokeh đẹp" với "ảnh đẹp."</strong> Bokeh là công cụ tách biệt chủ thể khỏi nền — không hơn không kém. Nếu không có subject mạnh, bokeh chỉ là nền mờ không có ý nghĩa. Tệ hơn: shallow DOF quá nông với chân dung có thể khiến một mắt sắc nét còn một mắt mờ — đây là lỗi phổ biến nhất trong portrait photography và phá vỡ kết nối với người xem ngay lập tức.
            </p>
          </div>
          <div className="practice-exercise">
            <div className="practice-header">⬥ Bài tập thực chiến — 5 Ngôn ngữ f-stop</div>
            <div className="practice-body">
              <p>Khám phá rằng mỗi f-stop là một ngôn ngữ kể chuyện khác nhau:</p>
              <ol className="practice-steps">
                <li><strong>f/1.8 — Intimacy &amp; Mystery:</strong> Chụp chân dung gần. Chỉ đôi mắt sắc nét. Cảm giác: bí ẩn, gần gũi tuyệt đối, thế giới thu lại còn một điểm.</li>
                <li><strong>f/2.8 — Subject &amp; Context:</strong> Chủ thể sắc nét, nền nhận biết được. Cân bằng giữa chủ thể và môi trường.</li>
                <li><strong>f/5.6 — Relationship:</strong> Cả chủ thể lẫn bối cảnh gần sắc nét. Mối quan hệ giữa người và không gian trở nên rõ ràng.</li>
                <li><strong>f/8-f/11 — Environment:</strong> Toàn bộ frame sắc nét. Street, documentary, landscape. Không có chỗ ẩn nấp cho chủ thể hay người chụp.</li>
                <li><strong>f/16+ — Everything:</strong> Hyperfocal. Bức tranh toàn cảnh. Khi câu chuyện là về thế giới, không phải về ai trong đó.</li>
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
          <Link href="/goc-chup" className="group nav-card">
            <div className="nav-card-label">← Bài trước</div>
            <div className="nav-card-title">13. Góc chụp</div>
            <div className="nav-card-desc">Bố cục & Góc nhìn</div>
          </Link>
          <Link href="/nhip-dieu" className="group nav-card text-right">
            <div className="nav-card-label">Bài tiếp →</div>
            <div className="nav-card-title">15. Nhịp điệu thị giác</div>
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



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
  Eye,
  Scale,
  Sparkles,
  BookOpen,
  Check,
  Maximize2,
  Minimize2,
  Ruler,
  Triangle,
  Mountain,
  Users,
  Flower2,
} from 'lucide-react';
import DocsLayout from '@/components/docs-layout';

/* ------------------------------------------------------------------ */
/*  TOC Data                                                          */
/* ------------------------------------------------------------------ */
const tocSections = [
  { id: 'sec-1', label: 'Ⅰ. Kích thước và tỷ lệ', level: 1 },
  { id: 'sec-1-1', label: '1. Kích thước vs Tỷ lệ — Sự khác biệt quan trọng', level: 2 },
  { id: 'sec-1-2', label: '2. Tỷ lệ như mối quan hệ', level: 2 },
  { id: 'sec-1-3', label: '3. Tỷ lệ tuyệt đối và tương đối', level: 2 },
  { id: 'sec-2', label: 'Ⅱ. Tỷ lệ vàng và các hệ thống tỷ lệ', level: 1 },
  { id: 'sec-2-1', label: '1. Tỷ lệ vàng (Golden Ratio) 1:1.618', level: 2 },
  { id: 'sec-2-2', label: '2. Fibonacci Spiral', level: 2 },
  { id: 'sec-2-3', label: '3. Rule of Thirds — Tỷ lệ vàng đơn giản hóa', level: 2 },
  { id: 'sec-2-4', label: '4. Dynamic Symmetry', level: 2 },
  { id: 'sec-2-5', label: '5. Sử dụng tỷ lệ trong lịch sử nghệ thuật', level: 2 },
  { id: 'sec-3', label: 'Ⅲ. Kích thước trong bố cục', level: 1 },
  { id: 'sec-3-1', label: '1. Chủ thể lớn = Thống trị', level: 2 },
  { id: 'sec-3-2', label: '2. Chủ thể nhỏ = Dễ bị tổn thương / Cô lập', level: 2 },
  { id: 'sec-3-3', label: '3. Đối tượng tham chiếu tỷ lệ', level: 2 },
  { id: 'sec-3-4', label: '4. Forced Perspective', level: 2 },
  { id: 'sec-3-5', label: '5. Phóng đại tỷ lệ với ống kính góc rộng', level: 2 },
  { id: 'sec-4', label: 'Ⅳ. Tỷ lệ và cảm xúc', level: 1 },
  { id: 'sec-4-1', label: '1. Tỷ lệ hoành tráng = Kinh ngạc', level: 2 },
  { id: 'sec-4-2', label: '2. Tỷ lệ con người = Đồng cảm', level: 2 },
  { id: 'sec-4-3', label: '3. Tỷ lệ thu nhỏ = Tò mò / Quyến rũ', level: 2 },
  { id: 'sec-4-4', label: '4. Tỷ lệ biến dạng = Bất an / Siêu thực', level: 2 },
  { id: 'summary', label: 'Tóm tắt 7 điểm chính', level: 1 },
];

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */
export default function KichThuocPage() {
  const [isRead, setIsRead] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('alpha-doc-read');
      if (saved) {
        const readPages: string[] = JSON.parse(saved);
        if (readPages.includes('/kich-thuoc')) setIsRead(true);
      }
    } catch {}
  }, []);

  const toggleRead = () => {
    try {
      const saved = localStorage.getItem('alpha-doc-read');
      const readPages: string[] = saved ? JSON.parse(saved) : [];
      if (isRead) {
        const updated = readPages.filter((p) => p !== '/kich-thuoc');
        localStorage.setItem('alpha-doc-read', JSON.stringify(updated));
        setIsRead(false);
      } else {
        const updated = [...readPages, '/kich-thuoc'];
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
          <a href="#">Chất liệu & Tỷ lệ</a>
          <ChevronRight size={12} />
          <span className="text-[#9d9db5]">Kích thước tỷ lệ</span>
        </div>

        {/* Badges */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold font-mono px-2 py-0.5 rounded bg-[rgba(34,197,94,0.1)] text-emerald-400">
            HA11
          </span>
          <span className="text-[11px] text-[#6b6b80]">17 phút đọc · #KichThuoc #TyLe #GoldenRatio #BoCuc #NgonNguThiGiac</span>
          <span className="elite-badge">
            <GraduationCap size={11} />
            Nâng cao
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-[#e4e4ed] leading-tight mb-3 border-none pb-0">
          Kích thước tỷ lệ
        </h1>

        {/* Subtitle */}
        <p className="text-base text-[#9d9db5] leading-relaxed mb-6" style={{ marginTop: 0 }}>
          Chất liệu & Tỷ lệ · Bài 11 — Tỷ lệ không chỉ là số học — nó là cách não bộ đo lường ý nghĩa của mọi thứ trong khung hình
        </p>

        {/* Hero image */}
        <div className="color-overview-hero rounded-xl overflow-hidden border border-[#1e1e2a] mb-8">
          <img
            src="/hero-kich-thuoc-ty-le.png"
            alt="Infographic tổng quan về kích thước và tỷ lệ trong nhiếp ảnh: tỷ lệ vàng, Fibonacci, rule of thirds, tỷ lệ khung hình và ứng dụng sáng tác"
            className="w-full h-auto object-contain"
            loading="eager"
          />
        </div>

        {/* Opening Quote */}
        <div className="quote-block">
          <p>
            &ldquo;Trong nghệ thuật, tỷ lệ không phải là phép đo — nó là cảm giác. Khi bạn cảm thấy một thứ gì đó &ldquo;đúng&rdquo;, đó là tỷ lệ đang nói chuyện với bạn ở tần số mà lý trí không nghe được.&rdquo;
          </p>
          <p className="quote-attr">— Le Corbusier, The Modulor</p>
        </div>

        <p className="drop-cap">
          Kích thước và tỷ lệ là ngôn ngữ vô thức mạnh nhất trong nhiếp ảnh. Bạn có thể không biết tên &ldquo;tỷ lệ vàng&rdquo;, nhưng khi một bức ảnh &ldquo;cảm thấy đúng&rdquo; — rất có thể nó đang exploit tỷ lệ mà não bộ bạn đã được lập trình để ưa chuộng qua hàng triệu năm tiến hóa. Ngược lại, khi một bức ảnh tạo ra sự khó chịu mơ hồ mà bạn không giải thích được — thường là do tỷ lệ bị phá vỡ. Bài này sẽ đi sâu vào khoa học, lịch sử, và ứng dụng thực tiễn của kích thước tỷ lệ trong nhiếp ảnh.
        </p>

        {/* ============================================================ */}
        {/*  SECTION I                                                    */}
        {/* ============================================================ */}
        <h2 id="sec-1" className="scroll-mt-20">
          <span className="section-num">Ⅰ</span>
          Kích thước và tỷ lệ
        </h2>

        <hr className="doc-divider" />

        {/* 1.1 */}
        <h3 id="sec-1-1" className="scroll-mt-20">
          1. Kích thước vs Tỷ lệ — Sự khác biệt quan trọng
        </h3>

        <p>
          Kích thước (size) là phép đo tuyệt đối — vật này cao 2 mét. Tỷ lệ (scale/proportion) là mối quan hệ — vật này cao gấp đôi vật kia. Trong nhiếp ảnh, kích thước tuyệt đối gần như vô nghĩa (vì cùng một vật có thể chiếm 1% hay 90% khung hình), trong khi <span className="key-concept">tỷ lệ là thứ định nghĩa ý nghĩa</span>.
        </p>

        <div className="comparison-grid my-4">
          <div className="comp-card">
            <span className="sub-label">SIZE (KÍCH THƯỚC)</span>
            <h4>Đo lường tuyệt đối</h4>
            <p>
              Tòa nhà cao 100m, người cao 1.7m. Trong nhiếp ảnh, kích thước tuyệt đối bị phá vỡ — cùng một người có thể là điểm nhỏ trong landscape hoặc chiếm toàn bộ frame trong portrait. Kích thước không có ý nghĩa nếu không có ngữ cảnh.
            </p>
          </div>
          <div className="comp-card" style={{ borderColor: '#22c55e44' }}>
            <span className="sub-label" style={{ color: '#22c55e', background: 'rgba(34,197,94,0.1)' }}>SCALE/PROPORTION (TỶ LỆ)</span>
            <h4>Mối quan hệ tương đối</h4>
            <p>
              Người đứng trước tòa nhà — bạn thấy họ nhỏ, tòa nhà lớn. Tỷ lệ người:tòa nhà tạo ra cảm xúc (vẻ vĩ đại của kiến trúc, sự nhỏ bé của con người). Tỷ lệ có ý nghĩa ngay cả khi bạn không biết kích thước tuyệt đối.
            </p>
          </div>
        </div>

        <hr className="doc-divider" />

        {/* 1.2 */}
        <h3 id="sec-1-2" className="scroll-mt-20">
          2. Tỷ lệ như mối quan hệ
        </h3>

        <p>
          Tỷ lệ trong nhiếp ảnh luôn là <span className="key-concept">tỷ lệ giữa các yếu tố</span> — không phải giá trị tuyệt đối của một yếu tố. Điều này có nghĩa:
        </p>

        <ul className="factor-list">
          <li>
            <strong>Tỷ lệ chủ thể-nền:</strong> Chủ thể lớn so với nền = thống trị, quyền lực. Chủ thể nhỏ so với nền = cô lập, dễ bị tổn thương.
          </li>
          <li>
            <strong>Tỷ lệ các phần trong chủ thể:</strong> Đầu so với thân, mắt so với mặt — portrait photographer kiểm soát tỷ lệ này thông qua góc chụp và ống kính.
          </li>
          <li>
            <strong>Tỷ lệ foreground-midground-background:</strong> Tỷ lệ giữa các lớp không gian tạo ra chiều sâu narrative — không chỉ chiều sâu thị giác.
          </li>
          <li>
            <strong>Tỷ lệ positive-negative space:</strong> Tỷ lệ giữa vùng có nội dung và vùng trống tạo ra breathing room — hoặc sự ngột ngạt.
          </li>
        </ul>

        <hr className="doc-divider" />

        {/* 1.3 */}
        <h3 id="sec-1-3" className="scroll-mt-20">
          3. Tỷ lệ tuyệt đối và tương đối
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <Ruler size={16} className="text-[#7c8aff]" />
              <span className="text-sm font-semibold text-[#e4e4ed]">Tỷ lệ tuyệt đối (Absolute Scale)</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Khi khung hình chứa một đối tượng quen thuộc (người, xe, nhà), não bộ tự động thiết lập tỷ lệ tuyệt đối — bạn biết cảnh này lớn hay nhỏ thực sự. Không có reference object = tỷ lệ tuyệt đối bị mất = ambiguity.
            </p>
          </div>
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <Scale size={16} className="text-[#ffcb6b]" />
              <span className="text-sm font-semibold text-[#e4e4ed]">Tỷ lệ tương đối (Relative Scale)</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Khi có hai đối tượng trong khung hình, tỷ lệ giữa chúng tạo ra relative scale — ngay cả khi bạn không biết kích thước thật của cả hai. Relative scale luôn tạo được narrative, kể cả khi absolute scale bị che giấu.
            </p>
          </div>
        </div>

        <div className="callout callout-key">
          <div className="callout-title">
            <Lightbulb size={13} className="inline mr-1" />
            Kỹ thuật che giấu tỷ lệ
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Nhiếp ảnh abstract và minimalism thường cố tình loại bỏ reference objects để che giấu absolute scale — biến cảnh thực thành hình ảnh gần trừu tượng. Một góc nhà máy có thể trông giống mô hình thu nhỏ; một mô hình thu nhỏ có thể trông như cảnh thật. Ambiguity tỷ lệ là công cụ sáng tạo mạnh mẽ.
          </p>
        </div>

        {/* ============================================================ */}
        {/*  SECTION II                                                   */}
        {/* ============================================================ */}
        <h2 id="sec-2" className="scroll-mt-20">
          <span className="section-num">Ⅱ</span>
          Tỷ lệ vàng và các hệ thống tỷ lệ
        </h2>

        <p>
          Tỷ lệ vàng (golden ratio) là hệ thống tỷ lệ nổi tiếng nhất — và cũng gây tranh cãi nhất — trong lịch sử nghệ thuật. Dù bạn tin vào &ldquo;phép màu&rdquo; của nó hay coi nó là confirmation bias, hiểu tỷ lệ vàng là hiểu cách tư duy về tỷ lệ đã định hình nghệ thuật phương Tây suốt 2500 năm.
        </p>

        <hr className="doc-divider" />

        {/* 2.1 */}
        <h3 id="sec-2-1" className="scroll-mt-20">
          1. Tỷ lệ vàng (Golden Ratio) — 1:1.618
        </h3>

        <p>
          Tỷ lệ vàng, ký hiệu φ (phi), là số vô tỷ xấp xỉ 1.618. Nó xuất hiện khi một đường được chia thành hai phần sao cho tỷ lệ giữa phần dài và phần ngắn bằng tỷ lệ giữa toàn bộ đường và phần dài. Công thức: <span className="key-concept">(a+b)/a = a/b = φ ≈ 1.618</span>.
        </p>

        <p>Tỷ lệ vàng trong nhiếp ảnh:</p>
        <ul className="factor-list">
          <li>
            <strong>Golden rectangle:</strong> Khung hình có tỷ lệ 1:1.618. Nhiều format phim cổ điển (như 35mm ở tỷ lệ 3:2 ≈ 1.5) gần với tỷ lệ vàng hơn 16:9 (≈ 1.78).
          </li>
          <li>
            <strong>Golden point:</strong> Điểm chia khung hình theo tỷ lệ vàng — vị trí đặt focal point lý tưởng theo lý thuyết. Nằm gần nhưng không trùng với intersection points của rule of thirds.
          </li>
          <li>
            <strong>Golden section:</strong> Chia khung hình thành phần lớn (61.8%) và phần nhỏ (38.2%) — tạo ra phân cấp thị giác tự nhiên.
          </li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">
            <AlertTriangle size={13} className="inline mr-1" />
            Cẩn thận với pseudoscience
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Nhiều tuyên bố về tỷ lệ vàng bị phóng đại — đặc biệt là &ldquo;nó xuất hiện ở khắp nơi trong tự nhiên&rdquo; (nautilus shell không thực sự tuân theo golden spiral) và &ldquo;con người tự nhiên ưa chuộng nó&rdquo; (nghiên cứu thực nghiệm cho kết quả mixed). Tỷ lệ vàng là công cụ hữu ích, không phải chân lý vũ trụ.
          </p>
        </div>

        <hr className="doc-divider" />

        {/* 2.2 */}
        <h3 id="sec-2-2" className="scroll-mt-20">
          2. Fibonacci Spiral
        </h3>

        <p>
          Fibonacci spiral (còn gọi là golden spiral) là đường cong được tạo ra bằng cách nối các góc phần tư của các golden rectangle lồng nhau. Nó là biểu diễn hình học trực quan nhất của tỷ lệ vàng — và cũng là công cụ bố cục phổ biến nhất dựa trên tỷ lệ.
        </p>

        <p>Ứng dụng trong nhiếp ảnh:</p>
        <ul className="factor-list">
          <li>
            <strong>Leading curve:</strong> Spiral cung cấp một đường dẫn mắt tự nhiên — từ tâm spiral ra ngoài, hoặc ngược lại. Khác với leading lines (thẳng), spiral tạo ra movement mềm mại, hữu cơ.
          </li>
          <li>
            <strong>Placement:</strong> Đặt focal point ở tâm spiral (vùng có mật độ curvature cao nhất) — mắt tự nhiên dừng lại ở đây vì nó là điểm &ldquo;đặc biệt&rdquo; nhất trên đường cong.
          </li>
          <li>
            <strong>Overlay trong Lightroom:</strong> Lightroom cung cấp Fibonacci spiral overlay trong crop tool — giúp bạn đánh giá xem bố cục có align với spiral không.
          </li>
        </ul>

        <hr className="doc-divider" />

        {/* 2.3 */}
        <h3 id="sec-2-3" className="scroll-mt-20">
          3. Rule of Thirds — Tỷ lệ vàng đơn giản hóa
        </h3>

        <p>
          Rule of thirds chia khung hình thành 9 phần bằng nhau (1:1:1 thay vì 1:1.618:1). Nó là <span className="key-concept">phiên bản thực dụng</span> của tỷ lệ vàng — dễ nhớ, dễ áp dụng, và cho kết quả tốt trong đa số trường hợp.
        </p>

        <div className="comparison-grid my-4">
          <div className="comp-card">
            <span className="sub-label">RULE OF THIRDS</span>
            <h4>Đơn giản, dễ áp dụng</h4>
            <p>
              Chia 1:1:1. Intersection points ở 33% và 67%. Dễ nhớ, nhanh áp dụng trong thực địa. Phù hợp cho 90% tình huống. Hạn chế: cơ học, thiếu tinh tế, dễ trở thành công thức.
            </p>
          </div>
          <div className="comp-card" style={{ borderColor: '#a855f744' }}>
            <span className="sub-label" style={{ color: '#a855f7', background: 'rgba(168,85,247,0.1)' }}>GOLDEN RATIO</span>
            <h4>Tinh tế, hữu cơ hơn</h4>
            <p>
              Chia theo 1:1.618. Golden point ở 38.2% và 61.8%. Khó nhớ hơn, nhưng tạo ra bố cục &ldquo;mềm&rdquo; hơn, ít cơ học hơn. Phù hợp khi rule of thirds trông &ldquo;quá đều&rdquo;.
            </p>
          </div>
        </div>

        <hr className="doc-divider" />

        {/* 2.4 */}
        <h3 id="sec-2-4" className="scroll-mt-20">
          4. Dynamic Symmetry
        </h3>

        <p>
          Dynamic symmetry, được phát triển bởi Jay Hambidge (1920), là hệ thống tỷ lệ dựa trên <span className="key-concept">đường chéo và reciprocal</span> — thay vì chia ngang/dọc. Nó tạo ra cấu trúc phức tạp hơn, năng động hơn, và gần với cách các bậc thầy Phục Hưng thực sự bố cục hơn là rule of thirds đơn giản.
        </p>

        <p>Nguyên lý cơ bản:</p>
        <ul className="factor-list">
          <li>
            <strong>Đường chéo chính:</strong> Nối hai góc đối diện — tạo trục năng lượng chính.
          </li>
          <li>
            <strong>Reciprocal line:</strong> Đường vuông góc với đường chéo chính, đi qua một góc — tạo trục năng lượng phụ.
          </li>
          <li>
            <strong>Giao điểm:</strong> Nơi đường chéo chính và reciprocal gặp nhau — vị trí đặt focal point lý tưởng.
          </li>
          <li>
            <strong>Root rectangles:</strong> Các hình chữ nhật có tỷ lệ đặc biệt (√2, √3, √4, √5) — mỗi loại tạo ra cấu trúc dynamic symmetry khác nhau.
          </li>
        </ul>

        <hr className="doc-divider" />

        {/* 2.5 */}
        <h3 id="sec-2-5" className="scroll-mt-20">
          5. Sử dụng tỷ lệ trong lịch sử nghệ thuật
        </h3>

        <div className="overflow-x-auto my-4 rounded-lg border border-[#1e1e2a]">
          <table className="doc-table">
            <thead>
              <tr>
                <th>Thời kỳ</th>
                <th>Hệ thống tỷ lệ</th>
                <th>Nghệ sĩ tiêu biểu</th>
                <th>Ứng dụng</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Cổ đại Hy Lạp</td>
                <td>Golden Ratio (Parthenon)</td>
                <td>Phidias, Ictinus</td>
                <td>Kiến trúc đền thờ, điêu khắc</td>
              </tr>
              <tr>
                <td>Phục Hưng</td>
                <td>Divine Proportion</td>
                <td>Leonardo da Vinci, Botticelli</td>
                <td>Vitruvian Man, Birth of Venus</td>
              </tr>
              <tr>
                <td>Baroque</td>
                <td>Dynamic composition</td>
                <td>Caravaggio, Rubens</td>
                <td>Chiaroscuro + tỷ lệ phi đối xứng</td>
              </tr>
              <tr>
                <td>Hiện đại</td>
                <td>Modulor (Le Corbusier)</td>
                <td>Le Corbusier, Mondrian</td>
                <td>Kiến trúc, grid system, minimal</td>
              </tr>
              <tr>
                <td>Đương đại</td>
                <td>Rule of Thirds (simplified)</td>
                <td>—</td>
                <td>Nhiếp ảnh phổ thông, camera grid</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="callout callout-brain">
          <div className="callout-title">
            <Brain size={13} className="inline mr-1" />
            Tại sao Rule of Thirds thay thế Golden Ratio?
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Rule of thirds (1:2 ≈ 0.5) là xấp xỉ gần đúng của golden ratio (1:1.618 ≈ 0.618). Nó phổ biến không phải vì tốt hơn — mà vì dễ nhớ, dễ áp dụng, và &ldquo;đủ tốt&rdquo; cho hầu hết mục đích. Nhưng nếu bạn muốn thoát khỏi cái nhìn &ldquo;giống mọi người&rdquo; — hãy thử golden ratio hoặc dynamic symmetry. Sự khác biệt tinh tế, nhưng mắt chuyên nghiệp sẽ nhận ra.
          </p>
        </div>

        {/* ============================================================ */}
        {/*  SECTION III                                                  */}
        {/* ============================================================ */}
        <h2 id="sec-3" className="scroll-mt-20">
          <span className="section-num">Ⅲ</span>
          Kích thước trong bố cục
        </h2>

        <p>
          Kích thước tương đối của các yếu tố trong khung hình không chỉ là quyết định bố cục — nó là <span className="key-concept">quyết định narrative</span>. Chủ thể lớn = quyền lực; chủ thể nhỏ = dễ bị tổn thương. Mỗi lựa chọn kích thước kể một câu chuyện khác nhau.
        </p>

        <hr className="doc-divider" />

        {/* 3.1 */}
        <h3 id="sec-3-1" className="scroll-mt-20">
          1. Chủ thể lớn = Thống trị (Dominance)
        </h3>

        <p>
          Khi chủ thể chiếm phần lớn khung hình, nó tự động trở thành trung tâm quyền lực. Mắt không thể tránh né; cảm xúc không thể pha loãng. Đây là lý do close-up và extreme close-up tạo impact mạnh nhất — chúng loại bỏ mọi thứ ngoại trừ chủ thể, buộc người xem đối diện trực tiếp.
        </p>

        <ul className="factor-list">
          <li>
            <strong>Portrait close-up:</strong> Mặt chiếm 80%+ frame — không thể trốn tránh, cảm xúc raw, trực diện. Platon, Steve Pyke exploit kích thước này.
          </li>
          <li>
            <strong>Architectural dominance:</strong> Tòa nhà chiếm gần toàn bộ frame — vẻ vĩ đại, áp đảo, hoặc đè nén. Michael Kenna, Hiroshi Sugimoto.
          </li>
          <li>
            <strong>Nature dominance:</strong> Cây cổ thụ chiếm trọn frame — sức sống nguyên thủy, thời gian, vĩnh cửu. Sebastião Salgado, Ansel Adams.
          </li>
        </ul>

        <hr className="doc-divider" />

        {/* 3.2 */}
        <h3 id="sec-3-2" className="scroll-mt-20">
          2. Chủ thể nhỏ = Dễ bị tổn thương / Cô lập
        </h3>

        <p>
          Khi chủ thể chiếm phần nhỏ khung hình, nó trở thành <span className="key-concept">nhân vật yếu</span> trong narrative — cô đơn giữa không gian bao la, dễ bị tổn thương trước thế giới lớn hơn. Đây là kỹ thuật mà nhiếp ảnh landscape và environmental portrait sử dụng thường xuyên.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <Minimize2 size={16} className="text-[#7c8aff]" />
              <span className="text-sm font-semibold text-[#e4e4ed]">Figure in Landscape</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Người nhỏ giữa cảnh quan lớn — vẻ đẹp của sự nhỏ bé, cô đơn, hoặc hòa mình. Fan Ho là bậc thầy: hình người nhỏ giữa sương mù Hồng Kông, vừa cô đơn vừa thiêng liêng.
            </p>
          </div>
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <Minimize2 size={16} className="text-[#fb7185]" />
              <span className="text-sm font-semibold text-[#e4e4ed]">Small Subject, Big Emptiness</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Chủ thể nhỏ trong không gian trống — sự cô lập tột cùng. Michael Kenna: một cây đơn độc giữa tuyết trắng. Ai cũng từng cảm thấy như cái cây đó.
            </p>
          </div>
        </div>

        <hr className="doc-divider" />

        {/* 3.3 */}
        <h3 id="sec-3-3" className="scroll-mt-20">
          3. Đối tượng tham chiếu tỷ lệ (Scale Reference Objects)
        </h3>

        <p>
          Đối tượng tham chiếu tỷ lệ là yếu tố quen thuộc (người, xe, bàn ghế) đặt trong cảnh để <span className="key-concept">thiết lập tỷ lệ tuyệt đối</span>. Không có reference, cảnh có thể trông lớn hoặc nhỏ tùy imagination — có reference, cảnh được &ldquo;đóng đinh&rdquo; vào thực tại.
        </p>

        <ul className="factor-list">
          <li>
            <strong>Người như reference:</strong> Phổ biến nhất — ai cũng biết kích thước người. Một người đứng trước vách đá lập tức cho biết đá lớn bao nhiêu.
          </li>
          <li>
            <strong>Xe, nhà, động vật:</strong> Reference thứ cấp — cũng quen thuộc nhưng ít chính xác hơn người.
          </li>
          <li>
            <strong>Không có reference:</strong> Ambiguity tỷ lệ — cảnh có thể là mô hình hoặc cảnh thật. Abstract photography exploit ambiguity này.
          </li>
          <li>
            <strong>Reference sai lệch:</strong> Forced perspective (xem mục 3.4) — reference có nhưng tạo ra tỷ lệ giả.
          </li>
        </ul>

        <hr className="doc-divider" />

        {/* 3.4 */}
        <h3 id="sec-3-4" className="scroll-mt-20">
          4. Forced Perspective — Xóa bỏ ranh giới tỷ lệ
        </h3>

        <p>
          Forced perspective là kỹ thuật sử dụng <span className="key-concept">điểm mù của nhận thức tỷ lệ</span> — não bộ giả định rằng vật gần hơn sẽ lớn hơn, và khi giả định này bị exploit, bạn có thể tạo ra ảo giác tỷ lệ mà không cần hậu kỳ.
        </p>

        <p>Kỹ thuật forced perspective:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
          <div className="conn-card" style={{ borderLeftColor: '#7c8aff' }}>
            <p className="text-sm font-semibold text-[#e4e4ed] mb-1">Nhấn mạnh Cận cảnh (Vật gần hóa lớn)</p>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Người đứng gần camera, vật nhỏ ở xa — người trông khổng lồ. Hiệu ứng &ldquo;Godzilla&rdquo;. Tourist photo phổ biến.
            </p>
          </div>
          <div className="conn-card" style={{ borderLeftColor: '#ffcb6b' }}>
            <p className="text-sm font-semibold text-[#e4e4ed] mb-1">Nhấn mạnh Viễn cảnh (Vật xa hóa nhỏ)</p>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Vật nhỏ ở gần camera, vật lớn ở xa — vật nhỏ trông bằng vật lớn. &ldquo;Đang nâng tháp Eiffel&rdquo; — cliche nhưng hiệu quả.
            </p>
          </div>
          <div className="conn-card" style={{ borderLeftColor: '#22c55e' }}>
            <p className="text-sm font-semibold text-[#e4e4ed] mb-1">Merge foreground + background</p>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Đặt foreground subject đúng vị trí để nó &ldquo;hòa&rdquo; vào background — tạo ra juxtaposition tỷ lệ bất ngờ. Rene Maltete, Ray Metzker.
            </p>
          </div>
          <div className="conn-card" style={{ borderLeftColor: '#a855f7' }}>
            <p className="text-sm font-semibold text-[#e4e4ed] mb-1">Miniature effect (tilt-shift)</p>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Tilt-shift lens hoặc hậu kỳ tạo shallow DOF toàn cảnh — biến cảnh thật thành mô hình thu nhỏ. Não bộ thấy shallow DOF = macro = miniature.
            </p>
          </div>
        </div>

        <hr className="doc-divider" />

        {/* 3.5 */}
        <h3 id="sec-3-5" className="scroll-mt-20">
          5. Phóng đại tỷ lệ với ống kính góc rộng
        </h3>

        <p>
          Ống kính góc rộng (wide-angle) không chỉ &ldquo;thấy nhiều hơn&rdquo; — nó <span className="key-concept">biến dạng tỷ lệ</span>. Vật gần ống kính trông lớn bất thường; vật xa trông nhỏ bất thường. Sự biến dạng này tăng theo độ rộng: 24mm ít biến dạng, 16mm nhiều, 11mm cực đoan.
        </p>

        <div className="callout callout-photo">
          <div className="callout-title">
            <Camera size={13} className="inline mr-1" />
            Case Study: Bruce Gilden — Wide-Angle Street
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Gilden chụp street portrait bằng 28mm và flash gần — tạo ra tỷ lệ khuôn mặt phóng đại, gần như caricature. Mũi lớn, tai nhỏ, mắt trồi. Đây không phải &ldquo;lỗi&rdquo; — nó là quyết định nghệ thuật: tỷ lệ biến dạng tạo ra cảm giác trực diện, xâm phạm, không thể phớt lờ — hoàn toàn phù hợp với chủ đề xã hội của Gilden.
          </p>
        </div>

        {/* ============================================================ */}
        {/*  SECTION IV                                                   */}
        {/* ============================================================ */}
        <h2 id="sec-4" className="scroll-mt-20">
          <span className="section-num">Ⅳ</span>
          Tỷ lệ và cảm xúc
        </h2>

        <p>
          Tỷ lệ không chỉ là công cụ bố cục — nó là <span className="key-concept">ngôn ngữ cảm xúc</span>. Não bộ phản ứng với tỷ lệ trước khi phân tích nội dung: một cảnh rộng lớn = kinh ngạc; một chủ thể vừa vặn = an toàn; một tỷ lệ sai lệch = bất an. Hiểu hệ thống cảm xúc của tỷ lệ cho phép nhiếp ảnh gia chọn đúng tỷ lệ cho đúng câu chuyện.
        </p>

        <hr className="doc-divider" />

        {/* 4.1 */}
        <h3 id="sec-4-1" className="scroll-mt-20">
          1. Tỷ lệ hoành tráng (Monumental Scale) = Kinh ngạc (Awe)
        </h3>

        <p>
          Khi cảnh quan hoặc kiến trúc vượt xa kích thước con người — khi người chỉ là một điểm nhỏ giữa vẻ vĩ đại — cảm xúc kinh ngạc (awe) xuất hiện. Awe là cảm xúc phức tạp nhất: vừa sợ hãi (sự nhỏ bé), vừa tôn kính (sự vĩ đại), vừa hạnh phúc (sự kết nối với thứ lớn hơn mình).
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
          <div className="hotspot-card text-center">
            <div className="text-[#7c8aff] mb-2">
              <Mountain size={22} className="mx-auto" />
            </div>
            <p className="text-sm font-semibold text-[#e4e4ed] mb-1">Landscape Awe</p>
            <p className="text-xs text-[#9d9db5]">Núi, biển, sa mạc — cảnh quan vượt tầm kiểm soát con người. Ansel Adams, Galen Rowell.</p>
          </div>
          <div className="hotspot-card text-center">
            <div className="text-[#ffcb6b] mb-2">
              <Maximize2 size={22} className="mx-auto" />
            </div>
            <p className="text-sm font-semibold text-[#e4e4ed] mb-1">Architectural Awe</p>
            <p className="text-xs text-[#9d9db5]">Nhà thờ Gothic, tòa nhà chọc trời — con người xây dựng vượt quá chính mình. Andrew Prokos.</p>
          </div>
          <div className="hotspot-card text-center">
            <div className="text-emerald-400 mb-2">
              <Sparkles size={22} className="mx-auto" />
            </div>
            <p className="text-sm font-semibold text-[#e4e4ed] mb-1">Cosmic Awe</p>
            <p className="text-xs text-[#9d9db5]">Bầu trời đêm, Milky Way — cảnh quan vượt khỏi hành tinh. Astrophotography tạo awe sâu nhất.</p>
          </div>
        </div>

        <hr className="doc-divider" />

        {/* 4.2 */}
        <h3 id="sec-4-2" className="scroll-mt-20">
          2. Tỷ lệ con người (Human Scale) = Đồng cảm (Empathy)
        </h3>

        <p>
          Khi chủ thể ở tỷ lệ &ldquo;ngang tầm&rdquo; — khuôn mặt vừa vặn trong khung hình, cơ thể ở khoảng cách giao tiếp bình thường — cảm xúc chủ đạo là đồng cảm (empathy). Bạn không nhìn xuống (như monumental) hay nhìn vào (như miniature) — bạn nhìn cùng tầm. Đây là lý do portrait ở tỷ lệ 1:1 (vừa vặn trong frame) tạo connection mạnh nhất.
        </p>

        <ul className="factor-list">
          <li>
            <strong>Portrait environmental:</strong> Người + bối cảnh ở tỷ lệ cân bằng — bạn thấy người trong thế giới của họ, empathize với cả hai.
          </li>
          <li>
            <strong>Street photography:</strong> Người ở tỷ lệ giao tiếp bình thường — bạn &ldquo;đứng cạnh&rdquo; họ, share khoảnh khắc. Henri Cartier-Bresson.
          </li>
          <li>
            <strong>Documentary intimate:</strong> Tỷ lệ gần — bạn &ldquo;ngồi cạnh&rdquo; chủ thể. Mary Ellen Mark, Dorothea Lange.
          </li>
        </ul>

        <hr className="doc-divider" />

        {/* 4.3 */}
        <h3 id="sec-4-3" className="scroll-mt-20">
          3. Tỷ lệ thu nhỏ (Miniature Scale) = Tò mò / Quyến rũ
        </h3>

        <p>
          Khi chủ thể trông nhỏ hơn thực tế — do tilt-shift, macro, hoặc đơn giản là bối cảnh thu nhỏ — cảm xúc chủ đạo là tò mò (curiosity) pha lẫn quyến rũ (charm). Não bộ phản ứng với miniature bằng niềm vui trẻ thơ — muốn chạm vào, muốn bảo vệ, muốn sở hữu.
        </p>

        <div className="callout callout-key">
          <div className="callout-title">
            <Lightbulb size={13} className="inline mr-1" />
            Tại sao miniature quyến rũ?
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Kindchenschema (baby schema) của Konrad Lorenz: não bộ được lập trình để phản ứng tích cực với thứ nhỏ — đầu lớn so với thân, mắt lớn so với mặt, chân ngắn so với người. Miniature photography exploit schema này, tạo ra phản ứng &ldquo;aww&rdquo; tự động. Đây là lý do miniature food, miniature architecture, và diorama luôn thu hút.
          </p>
        </div>

        <hr className="doc-divider" />

        {/* 4.4 */}
        <h3 id="sec-4-4" className="scroll-mt-20">
          4. Tỷ lệ biến dạng (Distorted Proportion) = Bất an / Siêu thực
        </h3>

        <p>
          Khi tỷ lệ bị phá vỡ một cách có chủ đích — đầu quá lớn, tay quá dài, chân quá ngắn — cảm xúc chủ đạo là bất an (unease). Não bộ phát hiện &ldquo;cái gì đó không đúng&rdquo; mà không thể xác định chính xác — và uncertainty tạo ra anxiety mạnh hơn certainty.
        </p>

        <div className="overflow-x-auto my-4 rounded-lg border border-[#1e1e2a]">
          <table className="doc-table">
            <thead>
              <tr>
                <th>Tỷ lệ cảm xúc</th>
                <th>Cảm xúc chính</th>
                <th>Kỹ thuật tạo ra</th>
                <th>Thể loại nhiếp ảnh</th>
                <th>Nghệ sĩ tham khảo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Monumental</td>
                <td>Kinh ngạc, tôn kính</td>
                <td>Chủ thể nhỏ trong cảnh lớn, wide angle từ thấp</td>
                <td>Landscape, architecture</td>
                <td>Ansel Adams, Michael Kenna</td>
              </tr>
              <tr>
                <td>Human Scale</td>
                <td>Đồng cảm, kết nối</td>
                <td>Chủ thể ở tỷ lệ giao tiếp, normal lens</td>
                <td>Portrait, street, documentary</td>
                <td>Cartier-Bresson, Mary Ellen Mark</td>
              </tr>
              <tr>
                <td>Miniature</td>
                <td>Tò mò, quyến rũ</td>
                <td>Tilt-shift, shallow DOF toàn cảnh, macro</td>
                <td>Abstract, toy, miniature</td>
                <td>Olivia Parker, Vincent Laforet</td>
              </tr>
              <tr>
                <td>Distorted</td>
                <td>Bất an, siêu thực</td>
                <td>Wide angle gần, lensbaby, hậu kỳ biến dạng</td>
                <td>Fine art, fashion, experimental</td>
                <td>Bruce Gilden, Guy Bourdin</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="quote-block">
          <p>
            &ldquo;Nghệ thuật không phải là tạo ra thứ đúng tỷ lệ — nó là tạo ra thứ đúng cảm xúc. Đôi khi cảm xúc đòi hỏi tỷ lệ hoàn hảo; đôi khi nó đòi hỏi sự phá vỡ.&rdquo;
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
              Kích thước là đo lường tuyệt đối; tỷ lệ là mối quan hệ — trong nhiếp ảnh, tỷ lệ mới là thứ định nghĩa ý nghĩa.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">02</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Tỷ lệ vàng (1:1.618) là hệ thống tỷ lệ nổi tiếng nhất — nhưng là công cụ hữu ích, không phải chân lý vũ trụ.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">03</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Fibonacci spiral tạo movement mềm mại, hữu cơ — thay vì cơ học như rule of thirds.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">04</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Kích thước chủ thể = quyết định narrative: lớn = thống trị, nhỏ = cô lập, vừa = đồng cảm.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">05</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Đối tượng tham chiếu tỷ lệ thiết lập absolute scale — không có reference = ambiguity, có reference = narrative cụ thể.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">06</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Bốn tỷ lệ cảm xúc: monumental = awe, human = empathy, miniature = curiosity, distorted = unease.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">07</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Forced perspective và wide-angle distortion là công cụ phá vỡ tỷ lệ tự nhiên — sử dụng có chủ đích để tạo ra narrative cụ thể.
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
              Scale không phải là kích thước vật lý — nó là <strong>kích thước tương đối</strong> và điều đó quyết định tất cả. Một người nhỏ bé trước một ngọn núi không cho thấy núi to hay người nhỏ — nó cho thấy <em>mối quan hệ</em>. Và mối quan hệ là thứ chúng ta kể chuyện về. Khi bạn thay đổi scale, bạn không thay đổi kích thước — bạn thay đổi câu chuyện về quyền lực, sự phụ thuộc, và vị trí của con người trong thế giới.
            </p>
          </div>
          <div className="callout callout-pitfall">
            <div className="callout-title">⚠ Bẫy chuyên gia</div>
            <p style={{ marginBottom: 0, lineHeight: 1.75 }}>
              Sử dụng người như "vật tham chiếu" để cho thấy kích thước cảnh quan, nhưng không suy nghĩ về <strong>vị trí của người đó</strong> trong frame. Người ở trung tâm = bị áp đảo nhưng cân bằng. Người ở góc frame = cô đơn và bị thiên nhiên "đẩy ra." Người ở đường chân trời = hòa tan vào thiên nhiên. Cùng tỷ lệ scale, vị trí hoàn toàn thay đổi câu chuyện.
            </p>
          </div>
          <div className="practice-exercise">
            <div className="practice-header">⬥ Bài tập thực chiến — Scale & Câu chuyện quyền lực</div>
            <div className="practice-body">
              <p>Khám phá scale như ngôn ngữ của quyền lực và ý nghĩa:</p>
              <ol className="practice-steps">
                <li><strong>Chọn cảnh rộng lớn:</strong> Biển, núi, cánh đồng, tòa nhà cao. Không có người trong frame đầu tiên — chụp "landscape thuần túy."</li>
                <li><strong>Thêm người, 5 vị trí khác nhau:</strong> Giữa frame, góc trái, góc phải, gần camera, xa camera ở đường chân trời.</li>
                <li><strong>Viết một câu:</strong> Mỗi phiên bản người ở đó đang làm gì / cảm thấy gì? Không mô tả kỹ thuật — mô tả trạng thái nội tâm.</li>
                <li><strong>Kết luận:</strong> Vị trí nào tạo ra câu chuyện mạnh nhất? Đó là điểm giao giữa scale và narrative của bạn.</li>
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
          <Link href="/chat-lieu" className="group nav-card">
            <div className="nav-card-label">← Bài trước</div>
            <div className="nav-card-title">10. Chất liệu bề mặt</div>
            <div className="nav-card-desc">Chất liệu & Tỷ lệ</div>
          </Link>
          <Link href="/bo-cuc" className="group nav-card text-right">
            <div className="nav-card-label">Bài tiếp →</div>
            <div className="nav-card-title">12. Bố cục</div>
            <div className="nav-card-desc">Bố cục & Góc nhìn</div>
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

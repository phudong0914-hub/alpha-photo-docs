

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
  ArrowUp,
  ArrowDown,
  RotateCcw,
  Binoculars,
  Target,
  Brain,
  Sparkles,
  BookOpen,
  Check,
  Mountain,
  User,
  Crosshair,
} from 'lucide-react';
import DocsLayout from '@/components/docs-layout';

/* ------------------------------------------------------------------ */
/*  TOC Data                                                          */
/* ------------------------------------------------------------------ */
const tocSections = [
  { id: 'sec-1', label: 'Ⅰ. Góc chụp là gì', level: 1 },
  { id: 'sec-1-1', label: '1. Điểm nhìn như ngôn ngữ quyền lực', level: 2 },
  { id: 'sec-1-2', label: '2. Góc chụp thay đổi ý nghĩa', level: 2 },
  { id: 'sec-1-3', label: '3. Góc chụp và động lực quyền lực', level: 2 },
  { id: 'sec-2', label: 'Ⅱ. Các góc chụp cơ bản', level: 1 },
  { id: 'sec-2-1', label: '1. Mức mắt (Eye Level)', level: 2 },
  { id: 'sec-2-2', label: '2. Góc thấp (Low Angle)', level: 2 },
  { id: 'sec-2-3', label: '3. Góc cao (High Angle)', level: 2 },
  { id: 'sec-2-4', label: '4. Góc chim (Bird&apos;s Eye)', level: 2 },
  { id: 'sec-2-5', label: '5. Góc sâu (Worm&apos;s Eye)', level: 2 },
  { id: 'sec-2-6', label: '6. Góc nghiêng (Dutch Angle)', level: 2 },
  { id: 'sec-3', label: 'Ⅲ. Góc chụp và tâm lý', level: 1 },
  { id: 'sec-3-1', label: '1. Nhìn lên = Quyền lực và kính sợ', level: 2 },
  { id: 'sec-3-2', label: '2. Nhìn xuống = Dễ bị tổn thương và xa cách', level: 2 },
  { id: 'sec-3-3', label: '3. Mức mắt = Đồng cảm và bình đẳng', level: 2 },
  { id: 'sec-4', label: 'Ⅳ. Khoảng cách và ống kính', level: 1 },
  { id: 'sec-4-1', label: '1. Ống rộng và biến dạng', level: 2 },
  { id: 'sec-4-2', label: '2. Ống tele và nén', level: 2 },
  { id: 'sec-4-3', label: '3. Ống tiêu chuẩn và trung lập', level: 2 },
  { id: 'sec-4-4', label: '4. Tiêu cự thay đổi phối cảnh', level: 2 },
  { id: 'sec-5', label: 'Ⅴ. Chọn góc chụp', level: 1 },
  { id: 'sec-5-1', label: '1. Phù hợp góc chụp với ý đồ', level: 2 },
  { id: 'sec-5-2', label: '2. Góc chụp và câu chuyện', level: 2 },
  { id: 'sec-5-3', label: '3. Thử nghiệm góc chụp', level: 2 },
  { id: 'summary', label: 'Tóm tắt 7 điểm chính', level: 1 },
];

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */
export default function GocChupPage() {
  const [isRead, setIsRead] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('alpha-doc-read');
      if (saved) {
        const readPages: string[] = JSON.parse(saved);
        if (readPages.includes('/goc-chup')) setIsRead(true);
      }
    } catch {}
  }, []);

  const toggleRead = () => {
    try {
      const saved = localStorage.getItem('alpha-doc-read');
      const readPages: string[] = saved ? JSON.parse(saved) : [];
      if (isRead) {
        const updated = readPages.filter((p) => p !== '/goc-chup');
        localStorage.setItem('alpha-doc-read', JSON.stringify(updated));
        setIsRead(false);
      } else {
        const updated = [...readPages, '/goc-chup'];
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
          <span className="text-[#9d9db5]">Góc chụp</span>
        </div>

        {/* Badges */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold font-mono px-2 py-0.5 rounded bg-[rgba(124,138,255,0.1)] text-[#7c8aff]">
            HA14
          </span>
          <span className="text-[11px] text-[#6b6b80]">16 phút đọc · #GocChup #Perspective #NguonLucThiGiac</span>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold font-mono px-2 py-0.5 rounded bg-[rgba(34,197,94,0.1)] text-emerald-400">
            Cơ bản
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-[#e4e4ed] leading-tight mb-3 border-none pb-0">
          Góc chụp
        </h1>

        {/* Subtitle */}
        <p className="text-base text-[#9d9db5] leading-relaxed mb-6" style={{ marginTop: 0 }}>
          Bố cục & Góc nhìn · Bài 14 — Cách vị trí máy ảnh thay đổi mọi thứ bạn kể bằng hình ảnh
        </p>

        {/* Hero image */}
        <div className="color-overview-hero rounded-xl overflow-hidden border border-[#1e1e2a] mb-8">
          <img
            src="/hero-goc-chup.png"
            alt="Infographic tổng quan về góc chụp trong nhiếp ảnh: eye level, high angle, low angle, dutch angle, over the shoulder, framing và cảm xúc thị giác"
            className="w-full h-auto object-contain"
            loading="eager"
          />
        </div>

        {/* Opening Quote */}
        <div className="quote-block">
          <p>
            &ldquo;Thay đổi góc chụp, thay đổi thế giới. Cùng một con người, cùng một khoảnh khắc — nhưng nhìn từ dưới lên hay nhìn từ trên xuống là hai câu chuyện hoàn toàn khác nhau.&rdquo;
          </p>
        </div>

        {/* ============================================================ */}
        {/*  SECTION I                                                    */}
        {/* ============================================================ */}
        <h2 id="sec-1" className="scroll-mt-20">
          <span className="section-num">Ⅰ</span>
          Góc chụp là gì
        </h2>

        <p className="drop-cap">
          Góc chụp (camera angle) là vị trí và hướng của máy ảnh so với chủ thể. Nó xác định mối quan hệ không gian giữa người nhìn và đối tượng bị nhìn — và trong nhiếp ảnh, mối quan hệ không gian luôn đồng nghĩa với mối quan hệ quyền lực. Bạn không bao giờ chụp &ldquo;trung lập&rdquo; — ngay cả mức mắt cũng là một lựa chọn có chủ đích.
        </p>

        <hr className="doc-divider" />

        {/* 1.1 */}
        <h3 id="sec-1-1" className="scroll-mt-20">
          1. Điểm nhìn như ngôn ngữ quyền lực
        </h3>

        <p>
          Trong điện ảnh, quy tắc bất thành văn là: &ldquo;Người nhìn xuống chủ thể nắm quyền lực. Người nhìn lên chủ thể trao quyền lực.&rdquo; Quy tắc này không chỉ đúng trong phim — nó là nền tảng tâm lý học nhận thức. Chúng ta đã tiến hóa để liên kết vị trí vật lý với vị trí xã hội: người cao hơn có quyền lực hơn, người thấp hơn phải phục tùng.
        </p>

        <div className="callout callout-key">
          <div className="callout-title">
            <Lightbulb size={13} className="inline mr-1" />
            Góc chụp = Quyền lực
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Mọi góc chụp đều là một tuyên bố về quyền lực. Không có góc chụp nào &ldquo;trung lập&rdquo; hoàn toàn. Ngay cả khi bạn cố gắng khách quan nhất có thể — đứng mức mắt, ống tiêu chuẩn — bạn vẫn đang tạo ra một quan điểm cụ thể. Nhận thức này là bước đầu tiên để sử dụng góc chụp một cách có chủ đích thay vì ngẫu nhiên.
          </p>
        </div>

        <hr className="doc-divider" />

        {/* 1.2 */}
        <h3 id="sec-1-2" className="scroll-mt-20">
          2. Góc chụp thay đổi ý nghĩa
        </h3>

        <p>
          Cùng một người, cùng một khoảnh khắc, nhưng ba góc chụp khác nhau tạo ra ba câu chuyện khác nhau:
        </p>

        <div className="comparison-grid my-4">
          <div className="comp-card">
            <span className="sub-label">NHÌN TỪ DƯỚI</span>
            <h4>Anh hùng</h4>
            <p>
              Người này mạnh mẽ, tự tin, uy nghiêm. Chúng ta cảm thấy kính trọng hoặc e sợ.
            </p>
          </div>
          <div className="comp-card">
            <span className="sub-label" style={{ color: '#22c55e', background: 'rgba(34,197,94,0.1)' }}>MỨC MẮT</span>
            <h4>Bình đẳng</h4>
            <p>
              Người này giống chúng ta. Chúng ta cảm thấy đồng cảm, kết nối, tin tưởng.
            </p>
          </div>
          <div className="comp-card" style={{ borderColor: '#fb718533' }}>
            <span className="sub-label" style={{ color: '#fb7185', background: 'rgba(251,113,133,0.1)' }}>NHÌN TỪ TRÊN</span>
            <h4>Nạn nhân</h4>
            <p>
              Người này nhỏ bé, dễ bị tổn thương, bất lực. Chúng ta cảm thấy thương hại hoặc thống trị.
            </p>
          </div>
        </div>

        <hr className="doc-divider" />

        {/* 1.3 */}
        <h3 id="sec-1-3" className="scroll-mt-20">
          3. Góc chụp và động lực quyền lực
        </h3>

        <p>
          Trong nhiếp ảnh chân dung và phóng sự, góc chụp quyết định người xem đứng ở đâu trong mối quan hệ với chủ thể — và đó là quyết định có hệ quả đạo đức. Chụp người nghèo từ góc cao = thống trị. Chụp lãnh đạo từ góc thấp = tâng bốc. Nhận thức này không chỉ là kỹ thuật — nó là đạo đức thị giác.
        </p>

        {/* ============================================================ */}
        {/*  SECTION II                                                   */}
        {/* ============================================================ */}
        <h2 id="sec-2" className="scroll-mt-20">
          <span className="section-num">Ⅱ</span>
          Các góc chụp cơ bản
        </h2>

        <p>
          Sáu góc chụp tạo thành hệ thống cơ bản mà mọi nhiếp ảnh gia cần thành thạo. Mỗi góc mang một cảm xúc và ý nghĩa riêng.
        </p>

        <div className="overflow-x-auto my-4 rounded-lg border border-[#1e1e2a]">
          <table className="doc-table">
            <thead>
              <tr>
                <th>Góc chụp</th>
                <th>Vị trí máy</th>
                <th>Tác động cảm xúc</th>
                <th>Ứng dụng điển hình</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Mức mắt (Eye Level)</td>
                <td>Cùng tầm với mắt chủ thể</td>
                <td>Đồng cảm, bình đẳng, khách quan</td>
                <td>Chân dung, phóng sự, documentary</td>
              </tr>
              <tr>
                <td>Góc thấp (Low Angle)</td>
                <td>Dưới mắt chủ thể, nhìn lên</td>
                <td>Quyền lực, kính sợ, anh hùng</td>
                <td>Chân dung lãnh đạo, kiến trúc, thể thao</td>
              </tr>
              <tr>
                <td>Góc cao (High Angle)</td>
                <td>Trên mắt chủ thể, nhìn xuống</td>
                <td>Dễ tổn thương, nhỏ bé, thống trị</td>
                <td>Phóng sự xã hội, tâm lý, cô đơn</td>
              </tr>
              <tr>
                <td>Góc chim (Bird&apos;s Eye)</td>
                <td>Thẳng đứng trên đầu</td>
                <td>Toàn cảnh, trừu tượng, xa cách</td>
                <td>Drone, kiến trúc, pattern tự nhiên</td>
              </tr>
              <tr>
                <td>Góc sâu (Worm&apos;s Eye)</td>
                <td>Sát mặt đất, nhìn thẳng lên</td>
                <td>Kỳ vĩ, phi thường, siêu thực</td>
                <td>Kiến trúc, cây cối, thể thao mạo hiểm</td>
              </tr>
              <tr>
                <td>Góc nghiêng (Dutch Angle)</td>
                <td>Nghiêng so với chân trời</td>
                <td>Bất ổn, căng thẳng, bất thường</td>
                <td>Thể loại kinh dị, thực nghiệm, âm mưu</td>
              </tr>
            </tbody>
          </table>
        </div>

        <hr className="doc-divider" />

        {/* 2.1 */}
        <h3 id="sec-2-1" className="scroll-mt-20">
          1. Mức mắt (Eye Level) — Góc chụp trung thực nhất
        </h3>

        <p>
          Máy ảnh ở cùng độ cao với mắt chủ thể. Đây là góc chụp &ldquo;trung thực&rdquo; nhất — không tâng bốc, không hạ thấp — tạo ra cảm giác đồng cảm và bình đẳng. Mức mắt nói: &ldquo;Tôi đang nói chuyện với bạn, ngang hàng với bạn.&rdquo;
        </p>

        <div className="hotspot-card my-4">
          <div className="flex items-center gap-2 mb-2">
            <User size={16} className="text-[#7c8aff]" />
            <span className="text-sm font-semibold text-[#e4e4ed]">Lưu ý về mức mắt</span>
          </div>
          <p className="text-xs text-[#9d9db5] leading-relaxed">
            Mức mắt không phải là &ldquo;mức mắt của bạn&rdquo; — nó là mức mắt của chủ thể. Khi chụp trẻ em, mức mắt của bạn phải hạ xuống. Khi chụp người ngồi xe lăn, bạn cũng nên ngồi. Sự khác biệt nhỏ này tạo ra sự tôn trọng to lớn trong hình ảnh.
          </p>
        </div>

        <hr className="doc-divider" />

        {/* 2.2 */}
        <h3 id="sec-2-2" className="scroll-mt-20">
          2. Góc thấp (Low Angle) — Nhìn lên quyền lực
        </h3>

        <p>
          Máy ảnh thấp hơn mắt chủ thể, hướng nhìn lên. Góc thấp làm chủ thể cao hơn, lớn hơn, mạnh mẽ hơn. Nó khai thác phản ứng tiến hóa: chúng ta có xu hướng liên kết kích thước lớn với quyền lực.
        </p>

        <p>Ứng dụng hiệu quả:</p>
        <ul className="factor-list">
          <li>
            <strong>Chân dung lãnh đạo:</strong> Góc thấp nhẹ (chỉ cần 10-15°) đủ tạo cảm giác uy quyền mà không phóng đại.
          </li>
          <li>
            <strong>Kiến trúc:</strong> Tòa nhà trông hùng vĩ hơn, cột trụ cao hơn, vòm rộng hơn.
          </li>
          <li>
            <strong>Thể thao:</strong> Vận động viên nhảy cao trông cao hơn thực tế — tăng cảm xúc kỳ vĩ.
          </li>
        </ul>

        <hr className="doc-divider" />

        {/* 2.3 */}
        <h3 id="sec-2-3" className="scroll-mt-20">
          3. Góc cao (High Angle) — Nhìn xuống yếu đuối
        </h3>

        <p>
          Máy ảnh cao hơn mắt chủ thể, hướng nhìn xuống. Góc cao làm chủ thể nhỏ hơn, yếu hơn, dễ bị tổn thương hơn. Nó tạo ra cảm giác thống trị — hoặc thương hại — tùy thuộc vào ngữ cảnh.
        </p>

        <div className="callout callout-warning">
          <div className="callout-title">
            <AlertTriangle size={13} className="inline mr-1" />
            Cẩn trọng với góc cao
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Góc cao khi chụp người — đặc biệt trong phóng sự xã hội — có thể tạo ra cảm giác thống trị không mong muốn. Chụp người nghèo, người vô gia cư, hoặc người yếu thế từ góc cao không chỉ là lựa chọn kỹ thuật — nó là một tuyên bố về quyền lực mà bạn có thể không chủ đích.
          </p>
        </div>

        <hr className="doc-divider" />

        {/* 2.4 */}
        <h3 id="sec-2-4" className="scroll-mt-20">
          4. Góc chim (Bird&apos;s Eye) — Toàn cảnh và trừu tượng
        </h3>

        <p>
          Máy ảnh nhìn thẳng xuống từ trên cao — thường từ drone, máy bay, hoặc tòa nhà cao tầng. Góc chim xóa bỏ đường chân trời và biến thế giới 3D thành mặt phẳng 2D, tạo ra hiệu ứng trừu tượng mạnh mẽ. Mọi thứ trở thành pattern, hình dạng, và texture.
        </p>

        <hr className="doc-divider" />

        {/* 2.5 */}
        <h3 id="sec-2-5" className="scroll-mt-20">
          5. Góc sâu (Worm&apos;s Eye) — Phi thường và siêu thực
        </h3>

        <p>
          Máy ảnh đặt sát mặt đất, nhìn thẳng lên. Đây là góc chụp ít được sử dụng nhất nhưng tạo ra hiệu ứng mạnh nhất. Mọi thứ phía trên — cây cối, tòa nhà, bầu trời — trở nên kỳ vĩ và phi thường.
        </p>

        <div className="hotspot-card my-4">
          <div className="flex items-center gap-2 mb-2">
            <Mountain size={16} className="text-[#ffcb6b]" />
            <span className="text-sm font-semibold text-[#e4e4ed]">Worm&apos;s Eye trong thực hành</span>
          </div>
          <p className="text-xs text-[#9d9db5] leading-relaxed">
            Đặt máy ảnh sát mặt đất (hoặc thấp hơn) và sử dụng màn hình lật hoặc live view. Ống góc rộng (16-24mm) tăng hiệu ứng biến dạng, làm chủ thể cao hơn thực tế. Chú ý foreground — cỏ, lá, sỏi — có thể thêm chiều sâu cho hình ảnh.
          </p>
        </div>

        <hr className="doc-divider" />

        {/* 2.6 */}
        <h3 id="sec-2-6" className="scroll-mt-20">
          6. Góc nghiêng (Dutch Angle) — Bất ổn và bất thường
        </h3>

        <p>
          Máy ảnh nghiêng so với đường chân trời. Dutch Angle vi phạm quy tắc cơ bản nhất của thị giác: đường chân trời phải ngang. Khi phá vỡ quy tắc này, nó tạo ra cảm giác bất ổn, căng thẳng, hoặc bất thường ngay lập tức — mắt người phát hiện sự &ldquo;sai&rdquo; này trong vòng mili-giây.
        </p>

        {/* ============================================================ */}
        {/*  SECTION III                                                  */}
        {/* ============================================================ */}
        <h2 id="sec-3" className="scroll-mt-20">
          <span className="section-num">Ⅲ</span>
          Góc chụp và tâm lý
        </h2>

        <p>
          Góc chụp không chỉ thay đổi hình thức — nó thay đổi tâm lý. Mỗi góc kích hoạt những phản ứng tâm lý khác nhau, dựa trên tiến hóa, văn hóa, và kinh nghiệm cá nhân.
        </p>

        <hr className="doc-divider" />

        {/* 3.1 */}
        <h3 id="sec-3-1" className="scroll-mt-20">
          1. Nhìn lên = Quyền lực và kính sợ
        </h3>

        <p>
          Khi máy ảnh nhìn lên, nó kích hoạt phản ứng tiến hóa: cái gì to hơn, cao hơn thì mạnh hơn. Đây là lý do tại sao bức tượng luôn đặt trên bệ cao, tại sao ngai vàng luôn cao hơn mặt đất, tại sao chúng ta &ldquo;ngước nhìn&rdquo; người mình kính trọng.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
          <div className="hotspot-card text-center">
            <div className="text-[#7c8aff] mb-2">
              <ArrowUp size={22} className="mx-auto" />
            </div>
            <p className="text-sm font-semibold text-[#e4e4ed] mb-1">Quyền lực</p>
            <p className="text-xs text-[#9d9db5]">Chủ thể trông hùng vĩ, uy nghiêm, không thể chống lại.</p>
          </div>
          <div className="hotspot-card text-center">
            <div className="text-[#ffcb6b] mb-2">
              <Sparkles size={22} className="mx-auto" />
            </div>
            <p className="text-sm font-semibold text-[#e4e4ed] mb-1">Kính sợ</p>
            <p className="text-xs text-[#9d9db5]">Cảm giác e sợ tôn kính, không dám lại gần.</p>
          </div>
          <div className="hotspot-card text-center">
            <div className="text-emerald-400 mb-2">
              <Mountain size={22} className="mx-auto" />
            </div>
            <p className="text-sm font-semibold text-[#e4e4ed] mb-1">Anh hùng</p>
            <p className="text-xs text-[#9d9db5]">Chủ thể trông như siêu nhân, vượt lên trên hoàn cảnh.</p>
          </div>
        </div>

        <hr className="doc-divider" />

        {/* 3.2 */}
        <h3 id="sec-3-2" className="scroll-mt-20">
          2. Nhìn xuống = Dễ bị tổn thương và xa cách
        </h3>

        <p>
          Khi máy ảnh nhìn xuống, nó đặt người xem ở vị trí thống trị — và chủ thể ở vị trí bị thống trị. Cảm xúc đi kèm: thương hại, xa cách, hoặc kiểm soát. Nhưng cũng có thể là sự bảo vệ, che chở — khi góc cao nhẹ và bối cảnh ấm áp.
        </p>

        <div className="comparison-grid my-4">
          <div className="comp-card">
            <span className="sub-label">GÓC CAO NHẸ</span>
            <h4>Bảo vệ và che chở</h4>
            <p>
              Nhìn xuống nhẹ tạo cảm giác chăm sóc, bảo vệ — như cha mẹ nhìn con. Phù hợp cho ảnh gia đình, trẻ em trong vòng tay.
            </p>
          </div>
          <div className="comp-card" style={{ borderColor: '#fb718533' }}>
            <span className="sub-label" style={{ color: '#fb7185', background: 'rgba(251,113,133,0.1)' }}>GÓC CAO MẠNH</span>
            <h4>Thống trị và xa cách</h4>
            <p>
              Nhìn xuống gắt tạo cảm giác thống trị, thiếu nhân phẩm. Phù hợp cho thể loại kinh dị, phim về tội phạm, hoặc khi cần tạo phản ứng bất an.
            </p>
          </div>
        </div>

        <hr className="doc-divider" />

        {/* 3.3 */}
        <h3 id="sec-3-3" className="scroll-mt-20">
          3. Mức mắt = Đồng cảm và bình đẳng
        </h3>

        <p>
          Mức mắt là góc chụp của sự đồng cảm. Nó nói: &ldquo;Tôi ở đây với bạn. Chúng ta như nhau.&rdquo; Đây là lý do tại sao hầu hết chân dung và phóng sự mạnh nhất được chụp ở mức mắt — chúng tạo kết nối cảm xúc trực tiếp mà không có rào cản quyền lực.
        </p>

        <div className="callout callout-key">
          <div className="callout-title">
            <Lightbulb size={13} className="inline mr-1" />
            Mức mắt không phải là tự động
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Nhiều nhiếp ảnh gia nghĩ rằng đứng thẳng và chụp là &ldquo;mức mắt&rdquo; — nhưng mức mắt phải được điều chỉnh theo chủ thể. Chụp trẻ em? Hạ xuống. Chụp người ngồi? Ngồi xuống. Chụp thú cưng? Quỳ xuống. Mức mắt đúng là khi ống kính ở cùng độ cao với mắt chủ thể — bất kể chủ thể ở đâu.
          </p>
        </div>

        {/* ============================================================ */}
        {/*  SECTION IV                                                   */}
        {/* ============================================================ */}
        <h2 id="sec-4" className="scroll-mt-20">
          <span className="section-num">Ⅳ</span>
          Khoảng cách và ống kính
        </h2>

        <p>
          Góc chụp không chỉ là hướng — nó còn là khoảng cách, và khoảng cách liên quan chặt chẽ đến tiêu cự ống kính. Ống kính khác nhau không chỉ &ldquo;zoom vào/ra&rdquo; — chúng thay đổi hoàn toàn phối cảnh và mối quan hệ không gian giữa các yếu tố.
        </p>

        <hr className="doc-divider" />

        {/* 4.1 */}
        <h3 id="sec-4-1" className="scroll-mt-20">
          1. Ống rộng và biến dạng phối cảnh
        </h3>

        <p>
          Ống góc rộng (16-35mm) tạo ra <span className="key-concept">biến dạng phối cảnh</span>: vật gần trông lớn hơn thực tế, vật xa trông nhỏ hơn. Hiệu ứng này càng mạnh khi ống càng rộng và khoảng cách càng gần. Nó không phải là &ldquo;lỗi&rdquo; — nó là công cụ biểu đạt.
        </p>

        <p>Ứng dụng sáng tạo của biến dạng rộng:</p>
        <ul className="factor-list">
          <li>
            <strong>Kiến trúc kỳ vĩ:</strong> Ống rộng làm tòa nhà cao hơn, hùng vĩ hơn.
          </li>
          <li>
            <strong>Foreground mạnh:</strong> Đặt yếu tố gần ống kính để tạo chiều sâu cực mạnh.
          </li>
          <li>
            <strong>Caricature:</strong> Chân dung với ống rộng cực tạo ra biến dạng hài hước hoặc ám ảnh.
          </li>
        </ul>

        <hr className="doc-divider" />

        {/* 4.2 */}
        <h3 id="sec-4-2" className="scroll-mt-20">
          2. Ống tele và nén phối cảnh
        </h3>

        <p>
          Ống tele (85-300mm) tạo ra hiệu ứng ngược lại: <span className="key-concept">nén phối cảnh</span> (perspective compression). Các lớp không gian bị &ldquo;nén&rdquo; lại, foreground và background trông gần nhau hơn thực tế. Điều này tạo ra hiệu ứng thị giác đặc biệt — đồi núi trông cao hơn ngay sau chủ thể, đám đông trông đông đúc hơn.
        </p>

        <hr className="doc-divider" />

        {/* 4.3 */}
        <h3 id="sec-4-3" className="scroll-mt-20">
          3. Ống tiêu chuẩn và trung lập thị giác
        </h3>

        <p>
          Ống tiêu chuẩn (35-50mm trên full-frame) tạo ra phối cảnh gần giống mắt người nhất — không biến dạng, không nén. Đây là lý do tại sao nó được coi là &ldquo;trung lập&rdquo; — nhưng trung lập không có nghĩa là nhàm chán. 50mm buộc bạn phải di chuyển, phải tiếp cận, phải chọn vị trí — và chính sự cam kết vật lý đó tạo ra hình ảnh chân thực hơn.
        </p>

        <hr className="doc-divider" />

        {/* 4.4 */}
        <h3 id="sec-4-4" className="scroll-mt-20">
          4. Tiêu cự thay đổi phối cảnh
        </h3>

        <div className="overflow-x-auto my-4 rounded-lg border border-[#1e1e2a]">
          <table className="doc-table">
            <thead>
              <tr>
                <th>Tiêu cự</th>
                <th>Phối cảnh</th>
                <th>Hiệu ứng không gian</th>
                <th>Phù hợp</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>16-24mm (Rộng)</td>
                <td>Mở rộng, biến dạng gần</td>
                <td>Foreground lớn, background nhỏ, chiều sâu mạnh</td>
                <td>Kiến trúc, phong cảnh, interior</td>
              </tr>
              <tr>
                <td>35-50mm (Tiêu chuẩn)</td>
                <td>Tự nhiên, gần mắt người</td>
                <td>Cân bằng giữa các lớp, trung thực</td>
                <td>Street, documentary, chân dung môi trường</td>
              </tr>
              <tr>
                <td>85-135mm (Tele ngắn)</td>
                <td>Nén nhẹ, tách nền</td>
                <td>Chủ thể nổi bật, nền mờ nhẹ</td>
                <td>Chân dung, thời trang, chi tiết</td>
              </tr>
              <tr>
                <td>200-600mm (Tele dài)</td>
                <td>Nén mạnh, dẹt không gian</td>
                <td>Các lớp bị nén sát, hiệu ứng wallpaper</td>
                <td>Thể thao, thiên nhiên, Mặt Trăng</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="callout callout-key">
          <div className="callout-title">
            <Lightbulb size={13} className="inline mr-1" />
            Quy tắc quan trọng
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Tiêu cự thay đổi phối cảnh — không phải khoảng cách. Nếu bạn đứng yên và zoom từ 24mm lên 200mm, phối cảnh không thay đổi — chỉ có góc nhìn thay đổi. Phối cảnh thay đổi khi bạn di chuyển: lại gần chủ thể với ống rộng = phối cảnh mở rộng. Lùi xa với ống tele = phối cảnh bị nén. Hãy di chuyển chân trước khi xoay vòng zoom.
          </p>
        </div>

        {/* ============================================================ */}
        {/*  SECTION V                                                    */}
        {/* ============================================================ */}
        <h2 id="sec-5" className="scroll-mt-20">
          <span className="section-num">Ⅴ</span>
          Chọn góc chụp
        </h2>

        <hr className="doc-divider" />

        {/* 5.1 */}
        <h3 id="sec-5-1" className="scroll-mt-20">
          1. Phù hợp góc chụp với ý đồ
        </h3>

        <p>
          Góc chụp không bao giờ nên là lựa chọn ngẫu nhiên. Trước khi nâng máy lên, hãy hỏi: &ldquo;Tôi muốn người xem cảm thấy gì khi nhìn vào chủ thể này?&rdquo; Câu trả lời sẽ quyết định góc chụp.
        </p>

        <p>Quy trình chọn góc chụp:</p>
        <div className="space-y-2 my-4">
          <div className="flex gap-3 items-start p-3 rounded-lg bg-[#111118] border border-[#1e1e2a]">
            <span className="section-num text-xs" style={{ width: 24, height: 24, fontSize: '0.7rem' }}>1</span>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Xác định cảm xúc đích — bạn muốn tạo ra cảm giác gì?
            </p>
          </div>
          <div className="flex gap-3 items-start p-3 rounded-lg bg-[#111118] border border-[#1e1e2a]">
            <span className="section-num text-xs" style={{ width: 24, height: 24, fontSize: '0.7rem' }}>2</span>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Chọn góc chụp phù hợp với cảm xúc đó (nhìn lên = quyền lực, mức mắt = đồng cảm, nhìn xuống = tổn thương).
            </p>
          </div>
          <div className="flex gap-3 items-start p-3 rounded-lg bg-[#111118] border border-[#1e1e2a]">
            <span className="section-num text-xs" style={{ width: 24, height: 24, fontSize: '0.7rem' }}>3</span>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Điều chỉnh độ mạnh của góc (góc nhẹ = tinh tế, góc mạnh = cực đoan).
            </p>
          </div>
          <div className="flex gap-3 items-start p-3 rounded-lg bg-[#111118] border border-[#1e1e2a]">
            <span className="section-num text-xs" style={{ width: 24, height: 24, fontSize: '0.7rem' }}>4</span>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Kiểm tra: góc chụp này có nhất quán với các quyết định khác (ánh sáng, màu sắc, DOF) không?
            </p>
          </div>
        </div>

        <hr className="doc-divider" />

        {/* 5.2 */}
        <h3 id="sec-5-2" className="scroll-mt-20">
          2. Góc chụp và câu chuyện
        </h3>

        <div className="callout callout-photo">
          <div className="callout-title">
            <Camera size={13} className="inline mr-1" />
            Case Study: Sebastião Salgado
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Trong dự án &ldquo;Workers&rdquo;, Salgado gần như luôn chụp ở mức mắt hoặc hơi thấp — ngay cả khi chủ thể là người lao động chân tay. Ông không nhìn xuống họ. Ông nhìn ngang — hoặc hơi ngước lên — trao cho họ phẩm giá và sự tôn trọng mà xã hội thường từ chối. Góc chụp của ông không chỉ là kỹ thuật — nó là tuyên bố đạo đức.
          </p>
        </div>

        <hr className="doc-divider" />

        {/* 5.3 */}
        <h3 id="sec-5-3" className="scroll-mt-20">
          3. Thử nghiệm góc chụp
        </h3>

        <p>
          Cách tốt nhất để hiểu góc chụp là thử nghiệm. Quy tắc &ldquo;10 góc&rdquo;: với mỗi chủ thể, đừng chỉ chụp một góc. Hãy chụp ít nhất 10 góc khác nhau trước khi chọn. Bạn sẽ ngạc nhiên thấy góc nào kể câu chuyện hay nhất — thường không phải góc đầu tiên.
        </p>

        <ul className="factor-list">
          <li>
            <strong>Quỳ xuống:</strong> Hạ thấp góc — bạn sẽ thấy thế giới từ góc nhìn hoàn toàn khác.
          </li>
          <li>
            <strong>Lên cao:</strong> Tìm cầu thang, ban công, ghế — bất cứ thứ gì nâng bạn lên.
          </li>
          <li>
            <strong>Nghiêng máy:</strong> Thử Dutch Angle nhẹ — xem nó thay đổi cảm xúc như thế nào.
          </li>
          <li>
            <strong>Quay vòng:</strong> Đi vòng quanh chủ thể — mặt trước, mặt bên, mặt sau — mỗi mặt là một câu chuyện khác.
          </li>
          <li>
            <strong>Lại gần và lùi xa:</strong> Cùng một góc nhưng khoảng cách khác tạo ra câu chuyện khác.
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
              Góc chụp = mối quan hệ quyền lực. Không có góc chụp nào trung lập hoàn toàn.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">02</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Nhìn lên = quyền lực, kính sợ, anh hùng. Nhìn xuống = tổn thương, xa cách, thống trị. Mức mắt = đồng cảm, bình đẳng.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">03</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Sáu góc cơ bản: mức mắt, góc thấp, góc cao, góc chim, góc sâu, Dutch Angle — mỗi góc có hệ quả tâm lý riêng.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">04</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Mức mắt phải được điều chỉnh theo chủ thể — không phải theo bạn.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">05</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Ống rộng biến dạng, ống tele nén, ống tiêu chuẩn trung lập — tiêu cự thay đổi phối cảnh khi bạn di chuyển.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">06</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Góc chụp có hệ quả đạo đức — đặc biệt khi chụp người yếu thế. Chọn góc chụp là chọn vị trí quyền lực.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">07</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Thử nghiệm với quy tắc &ldquo;10 góc&rdquo; — góc đầu tiên hiếm khi là góc hay nhất.
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
              Mỗi góc chụp là một <strong>tuyên bố về quan hệ quyền lực</strong> giữa người xem và chủ thể. Bạn không chỉ chọn góc nhìn đẹp — bạn đang chọn <em>vị trí người xem</em> đứng trong câu chuyện: bên trên (thống trị/thương hại), ngang bằng (đồng hành/đồng cảm), bên dưới (tôn sùng/bị áp đảo). Đây là quyền lực và trách nhiệm lớn nhất của người cầm máy — đặc biệt khi chụp người dễ bị tổn thương.
            </p>
          </div>
          <div className="callout callout-pitfall">
            <div className="callout-title">⚠ Bẫy chuyên gia</div>
            <p style={{ marginBottom: 0, lineHeight: 1.75 }}>
              Luôn chụp từ chiều cao mắt vì "tự nhiên" và "an toàn." Chiều cao mắt không phải là trung lập — nó chỉ là <strong>quen thuộc</strong>. Sự quen thuộc đôi khi là kẻ thù của cảm xúc mạnh. Những nhiếp ảnh gia xuất sắc luôn hỏi: "Tôi đang đứng ở đây vì đây là góc tốt nhất, hay vì đây là góc dễ nhất?" Đây là câu hỏi tách biệt nhiếp ảnh gia khỏi người chụp ảnh.
            </p>
          </div>
          <div className="practice-exercise">
            <div className="practice-header">⬥ Bài tập thực chiến — 10 góc không bao giờ thử</div>
            <div className="practice-body">
              <p>Buổi chụp chỉ có một mục tiêu: chụp những góc bạn CHƯA BAO GIỜ thử:</p>
              <ol className="practice-steps">
                <li><strong>Chọn một chủ thể tĩnh:</strong> Tòa nhà, cây cổ thụ, hay bất kỳ vật thể quen thuộc nào bạn đã chụp nhiều lần.</li>
                <li><strong>Liệt kê 10 góc:</strong> Trước khi chụp, viết 10 góc bạn CHƯA BÀO GIỜ thử — không phải "góc đẹp" mà là "góc mới." Worm's eye, bird's eye, Dutch angle, từ phía sau, từ bên trong qua cửa sổ…</li>
                <li><strong>Không được xóa ảnh trong buổi đó:</strong> Chụp hết 10 góc. Dù xấu cũng giữ.</li>
                <li><strong>Về nhà, xác định:</strong> Góc nào kể câu chuyện mà bạn chưa từng thấy trước đây? Đó là phát hiện của buổi hôm nay.</li>
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
          <Link href="/bo-cuc" className="group nav-card">
            <div className="nav-card-label">← Bài trước</div>
            <div className="nav-card-title">12. Bố cục</div>
            <div className="nav-card-desc">Bố cục & Góc nhìn</div>
          </Link>
          <Link href="/tieu-diem" className="group nav-card text-right">
            <div className="nav-card-label">Bài tiếp →</div>
            <div className="nav-card-title">14. Tiêu điểm & Độ sâu</div>
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

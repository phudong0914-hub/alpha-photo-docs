

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
  Minus,
  ArrowUpRight,
  TrendingUp,
  Spline,
  Zap,
  MoveRight,
  Circle,
} from 'lucide-react';
import DocsLayout from '@/components/docs-layout';

/* ------------------------------------------------------------------ */
/*  TOC Data                                                          */
/* ------------------------------------------------------------------ */
const tocSections = [
  { id: 'sec-1', label: 'Ⅰ. Bản chất của đường nét', level: 1 },
  { id: 'sec-1-1', label: '1. Đường nét như ngôn ngữ thị giác', level: 2 },
  { id: 'sec-1-2', label: '2. Phân loại đường nét', level: 2 },
  { id: 'sec-2', label: 'Ⅱ. Đường nét và cảm xúc', level: 1 },
  { id: 'sec-2-1', label: '1. Tính chất cảm xúc của từng loại đường', level: 2 },
  { id: 'sec-2-2', label: '2. Sự kết hợp đường nét tạo phức cảm', level: 2 },
  { id: 'sec-3', label: 'Ⅲ. Ứng dụng trong nhiếp ảnh', level: 1 },
  { id: 'sec-3-1', label: '1. Leading lines — Đường dẫn mắt', level: 2 },
  { id: 'sec-3-2', label: '2. Framing với đường nét', level: 2 },
  { id: 'sec-3-3', label: '3. Đường nét và phối cảnh', level: 2 },
  { id: 'sec-4', label: 'Ⅳ. Đường nét nâng cao', level: 1 },
  { id: 'sec-4-1', label: '1. Implied lines — Đường nét ngầm', level: 2 },
  { id: 'sec-4-2', label: '2. Broken lines — Đường đứt', level: 2 },
  { id: 'sec-4-3', label: '3. Đường nét và nhịp điệu', level: 2 },
  { id: 'summary', label: 'Tóm tắt 7 điểm chính', level: 1 },
];

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */
export default function DuongNetPage() {
  const [isRead, setIsRead] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('alpha-doc-read');
      if (saved) {
        const readPages: string[] = JSON.parse(saved);
        if (readPages.includes('/duong-net')) setIsRead(true);
      }
    } catch {}
  }, []);

  const toggleRead = () => {
    try {
      const saved = localStorage.getItem('alpha-doc-read');
      const readPages: string[] = saved ? JSON.parse(saved) : [];
      if (isRead) {
        const updated = readPages.filter((p) => p !== '/duong-net');
        localStorage.setItem('alpha-doc-read', JSON.stringify(updated));
        setIsRead(false);
      } else {
        const updated = [...readPages, '/duong-net'];
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
          <span className="text-[#9d9db5]">Đường nét cảm xúc</span>
        </div>

        {/* Badges */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold font-mono px-2 py-0.5 rounded bg-[rgba(124,138,255,0.1)] text-[#7c8aff]">
            HA4
          </span>
          <span className="text-[11px] text-[#6b6b80]">15 phút đọc · #DuongNet #CamXuc #LeadingLines #Composition</span>
          <span className="elite-badge">
            <GraduationCap size={11} />
            Cơ bản
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-[#e4e4ed] leading-tight mb-3 border-none pb-0">
          Đường nét cảm xúc
        </h1>

        {/* Subtitle */}
        <p className="text-base text-[#9d9db5] leading-relaxed mb-6" style={{ marginTop: 0 }}>
          Ngôn ngữ thị giác · Bài 4 — Cách đường nét dẫn dắt mắt và định hình cảm xúc trong bức ảnh
        </p>

        {/* Hero image */}
        <div className="rounded-xl overflow-hidden border border-[#1e1e2a] mb-8">
          <img
            src="/hero-duong-net.png"
            alt="Đường nét cảm xúc - Ảnh minh họa"
            className="w-full h-auto object-cover"
            loading="eager"
          />
        </div>

        {/* Video bài học */}
        <LessonVideoPlayer video={lessonVideos['/duong-net']} />

        {/* Opening Quote */}
        <div className="quote-block">
          <p>
            &ldquo;Đường nét là hệ thần kinh của bố cục — chúng truyền tải cảm xúc từ hình ảnh vào mắt và tâm trí người xem trước khi ý thức kịp can thiệp.&rdquo;
          </p>
          <p className="quote-attr">— Andrew Loomis, Creative Illustration</p>
        </div>

        <p className="drop-cap">
          Hãy nhìn vào một bức ảnh đường ray tàu hỏa biến mất ở chân trời — bạn sẽ cảm thấy chiều sâu, khoảng cách, và một nỗi khắc khoái nào đó. Nhìn vào một con sông uốn lượn qua thung lũng — bạn sẽ thấy sự êm đềm, thanh thoát, như một lời ru. Nhìn vào những đường chéo sắc lẹm của một tòa nhà chọc trời — bạn sẽ thấy sức mạnh, chiều cao, và đôi khi là sự đe dọa. Đường nét không chỉ là ranh giới giữa các hình dạng — chúng là <span className="key-concept">ngôn ngữ cảm xúc nguyên thủy nhất</span> của thị giác.
        </p>

        {/* ============================================================ */}
        {/*  SECTION I                                                    */}
        {/* ============================================================ */}
        <h2 id="sec-1" className="scroll-mt-20">
          <span className="section-num">Ⅰ</span>
          Bản chất của đường nét
        </h2>

        <hr className="doc-divider" />

        {/* 1.1 */}
        <h3 id="sec-1-1" className="scroll-mt-20">
          1. Đường nét như ngôn ngữ thị giác
        </h3>

        <p>
          Trong nhiếp ảnh, đường nét (line) là phần tử thị giác cơ bản nhất — nó tồn tại trước hình dạng, trước màu sắc, trước kết cấu. Một đường nét đơn lẻ đã đủ để tạo ra hướng nhìn, chuyển động, và cảm xúc. Nhiếp ảnh gia sử dụng đường nét như một người viết sử dụng câu — để dẫn dắt, nhấn mạnh, và tạo nhịp điệu.
        </p>

        <p>
          Đường nét trong nhiếp ảnh có thể là <strong>đường thực</strong> (vật lý có thật trong khung hình: đường chân trời, rãnh đường, cành cây) hoặc <strong>đường ẩn</strong> (được tạo ra bởi ánh mắt, hướng chuyển động, hay sự sắp xếp của các phần tử). Cả hai đều có sức mạnh định hướng thị giác như nhau — nhưng đường ẩn thường tinh tế và gây ấn tượng sâu hơn vì nó hoạt động ở tầng vô thức.
        </p>

        <div className="callout callout-key">
          <div className="callout-title">
            <Lightbulb size={13} className="inline mr-1" />
            Nguyên tắc cơ bản
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Đường nét trong nhiếp ảnh có ba chức năng cốt lõi: <strong>dẫn dắt mắt</strong> (leading the eye), <strong>phân chia không gian</strong> (dividing space), và <strong>truyền tải cảm xúc</strong> (conveying emotion). Khi cả ba chức năng hoạt động đồng bộ, đường nét trở thành xương sống của toàn bộ bố cục.
          </p>
        </div>

        <hr className="doc-divider" />

        {/* 1.2 */}
        <h3 id="sec-1-2" className="scroll-mt-20">
          2. Phân loại đường nét
        </h3>

        <p>Sáu loại đường nét cơ bản trong nhiếp ảnh:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <Minus size={16} className="text-[#7c8aff]" />
              <span className="text-sm font-semibold text-[#e4e4ed]">Đường ngang (Horizontal)</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Ổn định, bình yên, tĩnh lặng. Đường chân trời là đường ngang quyền lực nhất — nó phân chia đất và trời, tạo cảm giác vô tận và bình nguyên. Sử dụng khi muốn truyền tải sự thanh bình hoặc vĩ đại tĩnh lặng.
            </p>
          </div>
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <ArrowUpRight size={16} className="text-[#ffcb6b]" />
              <span className="text-sm font-semibold text-[#e4e4ed]">Đường dọc (Vertical)</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Sức mạnh, quyền lực, tăng trưởng. Cột cây, tòa nhà, hình người đứng đều tạo đường dọc. Đường dọc kéo mắt lên trên — tạo cảm giác về chiều cao, sự kiên định, và đôi khi là sự đe dọa áp đảo.
            </p>
          </div>
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={16} className="text-[#fb7185]" />
              <span className="text-sm font-semibold text-[#e4e4ed]">Đường chéo (Diagonal)</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Căng thẳng, chuyển động, bất ổn. Đường chéo là đường có năng lượng cao nhất — nó phá vỡ sự tĩnh lặng của ngang và dọc, tạo chiều sâu và động lực. Đường chéo là dấu hiệu của hành động đang diễn ra.
            </p>
          </div>
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <Spline size={16} className="text-emerald-400" />
              <span className="text-sm font-semibold text-[#e4e4ed]">Đường cong S (S-curve)</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Thanh lịch, uyển chuyển, tự nhiên. S-curve là đường của dòng sông, đường cong cơ thể, lối mòn qua rừng. Nó đưa mắt di chuyển chậm rãi qua khung hình — tạo cảm giác êm ái, quyến rũ và tự nhiên.
            </p>
          </div>
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <MoveRight size={16} className="text-[#a855f7]" />
              <span className="text-sm font-semibold text-[#e4e4ed]">Đường hội tụ (Converging)</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Chiều sâu, hướng đi, điểm đến. Khi hai hay nhiều đường song song hội tụ về một điểm — mắt người xem buộc phải theo đến cuối. Đây là công cụ mạnh nhất để tạo chiều sâu trong ảnh hai chiều.
            </p>
          </div>
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <Zap size={16} className="text-[#fb7185]" />
              <span className="text-sm font-semibold text-[#e4e4ed]">Đường chữ chi (Zigzag)</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Năng lượng, sự kích thích, nhiễu động. Zigzag tạo ra sự gián đoạn liên tục — mắt không thể trượt mượt mà phải nhảy từng đoạn. Tạo cảm giác hỗn loạn có kiểm soát hoặc năng lượng điện từ.
            </p>
          </div>
        </div>

        {/* ============================================================ */}
        {/*  SECTION II                                                   */}
        {/* ============================================================ */}
        <h2 id="sec-2" className="scroll-mt-20">
          <span className="section-num">Ⅱ</span>
          Đường nét và cảm xúc
        </h2>

        <hr className="doc-divider" />

        {/* 2.1 */}
        <h3 id="sec-2-1" className="scroll-mt-20">
          1. Tính chất cảm xúc của từng loại đường
        </h3>

        <p>
          Mỗi loại đường nét mang một &ldquo;chữ ký cảm xúc&rdquo; riêng — được hình thành qua hàng nghìn năm tiến hóa thị giác và trải nghiệm văn hóa. Bảng dưới đây tổng hợp các tính chất cảm xúc chủ yếu:
        </p>

        <div className="overflow-x-auto my-4 rounded-lg border border-[#1e1e2a]">
          <table className="doc-table">
            <thead>
              <tr>
                <th>Loại đường</th>
                <th>Cảm xúc chủ đạo</th>
                <th>Cảm xúc phụ</th>
                <th>Ứng dụng điển hình</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Ngang</td>
                <td>Bình yên, ổn định</td>
                <td>Tĩnh lặng, vô tận, nghỉ ngơi</td>
                <td>Cảnh biển, đồng cỏ, đường chân trời</td>
              </tr>
              <tr>
                <td>Dọc</td>
                <td>Sức mạnh, quyền lực</td>
                <td>Tăng trưởng, kiên định, áp đặt</td>
                <td>Kiến trúc, rừng cây, chân dung đứng</td>
              </tr>
              <tr>
                <td>Chéo</td>
                <td>Chuyển động, căng thẳng</td>
                <td>Bất ổn, nguy hiểm, tốc độ</td>
                <td>Thể thao, đường phố, hành động</td>
              </tr>
              <tr>
                <td>S-curve</td>
                <td>Thanh lịch, êm ái</td>
                <td>Quyến rũ, tự nhiên, sinh động</td>
                <td>Dòng sông, đường cong cơ thể, lối đi</td>
              </tr>
              <tr>
                <td>Hội tụ</td>
                <td>Chiều sâu, hướng đi</td>
                <td>Tập trung, khao khát, hy vọng</td>
                <td>Đường ray, hành lang, con đường</td>
              </tr>
              <tr>
                <td>Zigzag</td>
                <td>Năng lượng, kích thích</td>
                <td>Hỗn loạn, gián đoạn, sấm sét</td>
                <td>Cảnh đô thị, sét, núi đá nhọn</td>
              </tr>
            </tbody>
          </table>
        </div>

        <hr className="doc-divider" />

        {/* 2.2 */}
        <h3 id="sec-2-2" className="scroll-mt-20">
          2. Sự kết hợp đường nét tạo phức cảm
        </h3>

        <p>
          Hiếm khi một bức ảnh chỉ chứa một loại đường nét. Sức mạnh thực sự của đường nét nằm ở sự <span className="key-concept">tương tác giữa các loại đường</span> — khi chúng hòa hợp hoặc xung đột, tạo ra những cảm xúc phức tạp hơn nhiều so với từng đường riêng lẻ.
        </p>

        <div className="comparison-grid my-4">
          <div className="comp-card">
            <span className="sub-label">HÒA HỢP</span>
            <h4>Ngang + S-curve</h4>
            <p>
              Sự bình yên của đường ngang kết hợp với sự uyển chuyển của S-curve tạo ra cảm giác thanh bình có chiều sâu — như dòng sông êm đềm chảy qua đồng cỏ. Ansel Adams thường dùng tổ hợp này trong cảnh quan.
            </p>
          </div>
          <div className="comp-card" style={{ borderColor: '#fb718544' }}>
            <span className="sub-label" style={{ color: '#fb7185', background: 'rgba(251,113,133,0.1)' }}>XUNG ĐỘT</span>
            <h4>Ngang + Chéo</h4>
            <p>
              Sự ổn định của đường ngang bị phá vỡ bởi đường chéo — tạo ra sự bất an, căng thẳng, như một vết nứt trên mặt nước tĩnh. Tổ hợp này rất hiệu quả trong nhiếp ảnh chiến tranh hoặc phim kinh dị.
            </p>
          </div>
        </div>

        <div className="comparison-grid my-4">
          <div className="comp-card">
            <span className="sub-label" style={{ color: '#22c55e', background: 'rgba(34,197,94,0.1)' }}>CÂN BẰNG</span>
            <h4>Dọc + S-curve</h4>
            <p>
              Sức mạnh của đường dọc được làm mềm bởi sự uyển chuyển của S-curve — như một người đứng vững nhưng không cứng nhắc. Thường thấy trong chân dung nghệ thuật và kiến trúc cổ điển.
            </p>
          </div>
          <div className="comp-card" style={{ borderColor: '#a855f744' }}>
            <span className="sub-label" style={{ color: '#a855f7', background: 'rgba(168,85,247,0.1)' }}>NĂNG LƯỢNG</span>
            <h4>Chéo + Hội tụ</h4>
            <p>
              Hai đường chéo hội tụ tạo ra năng lượng cực mạnh — như mũi tên chỉ thẳng vào chủ thể. Đây là tổ hợp phổ biến nhất trong nhiếp ảnh thể thao và hành động, đưa mắt người xem thẳng đến điểm nhấn.
            </p>
          </div>
        </div>

        <div className="callout callout-warning">
          <div className="callout-title">
            <AlertTriangle size={13} className="inline mr-1" />
            Lỗi phổ biến
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Nhiều nhiếp ảnh gia mới chỉ tập trung vào &ldquo;leading lines&rdquo; mà bỏ qua cảm xúc mà đường nét truyền tải. Một đường dẫn mắt vào chủ thể là tốt — nhưng nếu đường đó truyền tải cảm xúc sai với thông điệp bức ảnh, nó sẽ tạo ra sự bất hòa nội tại mà người xem cảm nhận được nhưng không giải thích được.
          </p>
        </div>

        {/* ============================================================ */}
        {/*  SECTION III                                                  */}
        {/* ============================================================ */}
        <h2 id="sec-3" className="scroll-mt-20">
          <span className="section-num">Ⅲ</span>
          Ứng dụng trong nhiếp ảnh
        </h2>

        <hr className="doc-divider" />

        {/* 3.1 */}
        <h3 id="sec-3-1" className="scroll-mt-20">
          1. Leading lines — Đường dẫn mắt
        </h3>

        <p>
          Leading lines là kỹ thuật sử dụng đường nét để dẫn mắt người xem từ điểm này sang điểm khác trong khung hình — thường là từ foreground đến chủ thể chính, hoặc từ rìa ảnh vào trung tâm. Đây là một trong những công cụ bố cục quyền lực nhất vì nó hoạt động ở cấp độ vô thức: người xem không tự chủ mà bị dẫn dắt.
        </p>

        <p>Bốn nguyên tắc của leading lines hiệu quả:</p>
        <ul className="factor-list">
          <li>
            <strong>Nguyên tắc hướng vào:</strong> Đường nét nên dẫn vào chủ thể chứ không dẫn ra khỏi khung hình. Đường ray dẫn về một nhân vật ở chân trời mạnh hơn đường ray dẫn ra ngoài rìa ảnh.
          </li>
          <li>
            <strong>Nguyên tắc gradient:</strong> Đường nét càng rõ ở foreground càng hiệu quả — vì mắt bắt đầu di chuyển từ gần đến xa, từ sắc nét đến mờ nhạt.
          </li>
          <li>
            <strong>Nguyên tắc đơn nhất:</strong> Quá nhiều đường dẫn khác hướng tạo ra sự nhiễu. Tối ưu là 1-3 đường dẫn hội tụ về cùng một điểm.
          </li>
          <li>
            <strong>Nguyên tắc phù hợp cảm xúc:</strong> Leading line không chỉ dẫn mắt — nó còn định hình tâm trạng. Chọn loại đường phù hợp với cảm xúc đích.
          </li>
        </ul>

        <div className="callout callout-photo">
          <div className="callout-title">
            <Camera size={13} className="inline mr-1" />
            Case Study: Fan Ho và Hồng Kông
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Fan Ho là bậc thầy của leading lines trong nhiếp ảnh đường phố. Bức ảnh &ldquo;Approaching Shadow&rdquo; (1954) sử dụng đường chéo của bức tường và bóng tối để dẫn mắt từ góc ảnh đến nhân vật — đồng thời đường chéo truyền tải cảm xúc cô đơn và thời gian trôi qua. Đường nét trong ảnh của Fan Ho không chỉ dẫn mắt — nó kể chuyện.
          </p>
        </div>

        <hr className="doc-divider" />

        {/* 3.2 */}
        <h3 id="sec-3-2" className="scroll-mt-20">
          2. Framing với đường nét
        </h3>

        <p>
          Đường nét có thể được sử dụng để tạo khung (frame) trong khung hình — bao quanh chủ thể, cô lập nó khỏi phông nền, và tạo chiều sâu. Kỹ thuật này được gọi là <span className="key-concept">sub-framing</span> — khung trong khung.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <Circle size={16} className="text-[#7c8aff]" />
              <span className="text-sm font-semibold text-[#e4e4ed]">Khung tự nhiên</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Cành cây tạo vòm, hang động tạo cửa sổ, khe núi tạo khung — tự nhiên cung cấp vô số đường nét sẵn có để framing. Tìm và sử dụng chúng thay vì tạo ra.
            </p>
          </div>
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <Circle size={16} className="text-[#ffcb6b]" />
              <span className="text-sm font-semibold text-[#e4e4ed]">Khung kiến trúc</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Cửa sổ, hành lang, cầu thang, cột — kiến trúc nhân tạo cung cấp những đường nét thẳng và định hình rõ ràng, tạo khung hình học sắc bén quanh chủ thể.
            </p>
          </div>
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <Circle size={16} className="text-emerald-400" />
              <span className="text-sm font-semibold text-[#e4e4ed]">Khung ánh sáng</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Ranh giới giữa sáng và tối cũng là đường nét — và nó tạo ra khung thị giác mạnh mẽ nhất vì nó vừa dẫn mắt vừa tạo tương phản cảm xúc.
            </p>
          </div>
        </div>

        <hr className="doc-divider" />

        {/* 3.3 */}
        <h3 id="sec-3-3" className="scroll-mt-20">
          3. Đường nét và phối cảnh
        </h3>

        <p>
          Đường nét là công cụ chính để tạo ảo giác chiều sâu trên mặt phẳng hai chiều. Ba loại phối cảnh sử dụng đường nét:
        </p>

        <div className="overflow-x-auto my-4 rounded-lg border border-[#1e1e2a]">
          <table className="doc-table">
            <thead>
              <tr>
                <th>Loại phối cảnh</th>
                <th>Đường nét sử dụng</th>
                <th>Hiệu ứng thị giác</th>
                <th>Ví dụ</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Phối cảnh tuyến tính</td>
                <td>Đường hội tụ về vanishing point</td>
                <td>Chiều sâu rõ ràng, không gian có cấu trúc</td>
                <td>Đường ray, hành lang, đường phố</td>
              </tr>
              <tr>
                <td>Phối cảnh không khí</td>
                <td>Đường nét mờ dần theo khoảng cách</td>
                <td>Chiều sâu tinh tế, không gian mở</td>
                <td>Dãy núi xa, thành phố trong sương</td>
              </tr>
              <tr>
                <td>Phối cảnh thu nhỏ</td>
                <td>Đường nét nhỏ dần theo khoảng cách</td>
                <td>Cảm giác tỷ lệ, vĩ mô trong vi mô</td>
                <td>Hàng cây dọc đường, rào chắn</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="callout callout-key">
          <div className="callout-title">
            <Lightbulb size={13} className="inline mr-1" />
            Mẹo thực hành
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Khi tìm vanishing point, hãy nhớ rằng nó không phải lúc nào cũng ở giữa ảnh. Đặt vanishing point ở Rule of Thirds — vị trí 1/3 hoặc 2/3 — sẽ tạo bố cục năng động hơn là trung tâm. Đồng thời, góc chụp thấp làm tăng hiệu ứng hội tụ, góc chụp cao làm giảm nó.
          </p>
        </div>

        {/* ============================================================ */}
        {/*  SECTION IV                                                   */}
        {/* ============================================================ */}
        <h2 id="sec-4" className="scroll-mt-20">
          <span className="section-num">Ⅳ</span>
          Đường nét nâng cao
        </h2>

        <hr className="doc-divider" />

        {/* 4.1 */}
        <h3 id="sec-4-1" className="scroll-mt-20">
          1. Implied lines — Đường nét ngầm
        </h3>

        <p>
          Implied lines (đường ngầm) là những đường không tồn tại vật lý nhưng mắt người xem tự động tạo ra do cách não bộ xử lý thông tin thị giác. Đây là loại đường tinh tế và quyền lực nhất vì nó hoạt động hoàn toàn ở tầng vô thức.
        </p>

        <p>Bốn loại đường ngầm phổ biến nhất:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
          <div className="conn-card" style={{ borderLeftColor: '#7c8aff' }}>
            <p className="text-sm font-semibold text-[#e4e4ed] mb-1">Đường ánh mắt (Gaze line)</p>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Khi một nhân vật nhìn về một hướng, mắt người xem tự động theo hướng đó. Đây là implied line mạnh nhất — nó kết nối nhân vật với điểm họ đang nhìn, tạo ra câu chuyện thị giác không cần lời.
            </p>
          </div>
          <div className="conn-card" style={{ borderLeftColor: '#ffcb6b' }}>
            <p className="text-sm font-semibold text-[#e4e4ed] mb-1">Đường chuyển động (Motion line)</p>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Một vật thể đang di chuyển tạo ra đường ngầm theo hướng chuyển động — ngay cả khi nó đứng yên trong khung hình. Xe hơi, người đi bộ, chim bay — não bộ tự động dự đoán quỹ đạo.
            </p>
          </div>
          <div className="conn-card" style={{ borderLeftColor: '#22c55e' }}>
            <p className="text-sm font-semibold text-[#e4e4ed] mb-1">Đường chỉ hướng (Pointing line)</p>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Một ngón tay chỉ, một cánh tay vươn, một cây gậy hướng — tất cả tạo ra implied line dẫn mắt về mục tiêu. Kỹ thuật này được dùng nhiều trong nhiếp ảnh chân dung và quảng cáo.
            </p>
          </div>
          <div className="conn-card" style={{ borderLeftColor: '#a855f7' }}>
            <p className="text-sm font-semibold text-[#e4e4ed] mb-1">Đường nối (Connection line)</p>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Khi hai hay nhiều phần tử trong ảnh có mối quan hệ — về màu sắc, kích thước, hoặc vị trí — mắt tự động nối chúng bằng đường ngầm. Đây là nền tảng của Gestalt principle of continuation.
            </p>
          </div>
        </div>

        <hr className="doc-divider" />

        {/* 4.2 */}
        <h3 id="sec-4-2" className="scroll-mt-20">
          2. Broken lines — Đường đứt
        </h3>

        <p>
          Broken lines (đường đứt) là đường nét bị gián đoạn — nhưng não bộ vẫn đọc nó như một đường liên tục, nhờ nguyên lý <span className="key-concept">closure</span> của Gestalt. Đường đứt tạo ra sự thú vị thị giác lớn hơn đường liên tục vì nó buộc não bộ phải &ldquo;hoàn thiện&rdquo; đường — quá trình này tạo ra sự tham gia tích cực từ người xem.
        </p>

        <p>
          Ví dụ: một hàng cây cách quãng dọc đường, một hàng cột trong đền thờ, những tảng đá tạo thành đường dẫn đến bờ biển — tất cả đều là đường đứt. Khi sử dụng broken lines, hãy đảm bảo các đoạn đủ gần để não bộ có thể nối chúng — nếu quá xa, đường ngầm sẽ bị mất.
        </p>

        <div className="callout callout-brain">
          <div className="callout-title">
            <Lightbulb size={13} className="inline mr-1" />
            Tại sao đường đứt lại mạnh hơn đường liên tục?
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Não bộ ưu tiên xử lý thông tin chưa hoàn chỉnh — vì trong tự nhiên, thông tin chưa hoàn chỉnh thường cần được chú ý hơn. Khi bạn nhìn thấy một con rắn ẩn sau lá (đường đứt), bản năng sinh tồn yêu cầu bạn phải nhận diện nó nhanh hơn một con rắn hoàn toàn hiện hình. Đường đứt đánh thức cơ chế này — khiến người xem chú ý hơn.
          </p>
        </div>

        <hr className="doc-divider" />

        {/* 4.3 */}
        <h3 id="sec-4-3" className="scroll-mt-20">
          3. Đường nét và nhịp điệu
        </h3>

        <p>
          Khi đường nét lặp lại với khoảng cách đều, nó tạo ra <span className="key-concept">nhịp điệu thị giác</span> (visual rhythm) — giống như nhịp đập trong âm nhạc. Nhịp điệu tạo ra sự dễ chịu và dự đoán được — nhưng sự biến tấu (variation) trong nhịp điệu mới là thứ tạo ra sự thú vị.
        </p>

        <p>Bốn cách tạo nhịp điệu với đường nét:</p>
        <ul className="factor-list">
          <li>
            <strong>Nhịp đều (Regular rhythm):</strong> Lặp lại đều đặn — hàng cột, hàng cây, bậc thang. Tạo sự trật tự, bình yên, nhưng có thể nhàm chán nếu không có biến tấu.
          </li>
          <li>
            <strong>Nhịp tiến (Progressive rhythm):</strong> Lặp lại nhưng thay đổi dần — khoảng cách giảm dần, kích thước lớn dần. Tạo chiều sâu và cảm giác tiến về phía trước.
          </li>
          <li>
            <strong>Nhịp ngắt (Staccato rhythm):</strong> Đường đứt cách quãng không đều — tạo năng lượng, sự bất ngờ, như tiếng trống ngắt quãng.
          </li>
          <li>
            <strong>Nhịp tự do (Flowing rhythm):</strong> Đường cong lặp lại tự nhiên — sóng biển, cồn cát, nếp vải. Tạo cảm giác hữu cơ, tự nhiên, thư thái.
          </li>
        </ul>

        <div className="quote-block">
          <p>
            &ldquo;Trong nhiếp ảnh, đường nét không chỉ dẫn mắt — nó dẫn cảm xúc. Chọn đúng đường nét là chọn đúng giọng điệu cho câu chuyện bạn muốn kể.&rdquo;
          </p>
          <p className="quote-attr">— Michael Freeman, The Photographer&apos;s Eye</p>
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
              Đường nét là phần tử thị giác cơ bản nhất — nó tồn tại trước hình dạng, trước màu sắc, trước kết cấu.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">02</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Sáu loại đường cơ bản: ngang (bình yên), dọc (sức mạnh), chéo (căng thẳng), S-curve (thanh lịch), hội tụ (chiều sâu), zigzag (năng lượng).
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">03</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Đường nét có ba chức năng cốt lõi: dẫn dắt mắt, phân chia không gian, và truyền tải cảm xúc.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">04</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Sự kết hợp đường nét tạo phức cảm — hòa hợp tạo chiều sâu, xung đột tạo căng thẳng.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">05</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Leading lines hiệu quả khi: dẫn vào chủ thể, rõ ở foreground, ít đường cùng hướng, và phù hợp cảm xúc.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">06</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Implied lines (đường ngầm) — ánh mắt, chuyển động, chỉ hướng, kết nối — mạnh hơn đường thực vì hoạt động ở tầng vô thức.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">07</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Đường đứt mạnh hơn đường liên tục vì não bộ phải chủ động hoàn thiện — tạo sự tham gia tích cực từ người xem.
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
              Quy tắc vàng: trước khi nhìn vào chủ thể, hãy nhìn xem các đường nét trong khung hình đang <strong>"nói" gì</strong>. Nếu đường nét và chủ thể mâu thuẫn — ảnh sẽ gây bất ổn cho dù chủ thể đẹp đến đâu. Ngược lại, khi đường nét và chủ thể cộng hưởng, bạn tạo ra một thứ mà người xem không thể rời mắt nhưng không biết tại sao. Đó là khi ngôn ngữ thị giác hoạt động ở tầng vô thức.
            </p>
          </div>
          <div className="callout callout-pitfall">
            <div className="callout-title">⚠ Bẫy chuyên gia</div>
            <p style={{ marginBottom: 0, lineHeight: 1.75 }}>
              Nhầm giữa <strong>đường nét vật lý</strong> và <strong>đường nét ẩn (implied lines)</strong>. Ánh mắt của chủ thể tạo ra đường nét mạnh hơn một đường thẳng thực sự — vì não bộ luôn theo dõi <em>hướng nhìn</em> của người khác như một phản xạ sinh tồn. Bỏ qua implied lines là bỏ qua 50% ngôn ngữ đường nét và tại sao bố cục "cảm giác" đúng hay sai.
            </p>
          </div>
          <div className="practice-exercise">
            <div className="practice-header">⬥ Bài tập thực chiến — 5 Ngôn ngữ đường nét</div>
            <div className="practice-body">
              <p>Chụp một người đứng trong không gian trống. Tạo 5 phiên bản với 5 loại đường nét khác nhau:</p>
              <ol className="practice-steps">
                <li><strong>Horizontal:</strong> Người nằm ngang (hoặc đặt trước đường chân trời). Cảm giác: bình yên, tĩnh lặng.</li>
                <li><strong>Vertical:</strong> Người đứng thẳng với cột, cây, tòa nhà. Cảm giác: sức mạnh, vươn lên.</li>
                <li><strong>Diagonal:</strong> Người ở góc nghiêng, hoặc dưới cầu thang. Cảm giác: căng thẳng, chuyển động.</li>
                <li><strong>S-Curve:</strong> Người trên con đường uốn lượn, bờ biển. Cảm giác: thanh thoát, dẫn dắt.</li>
                <li><strong>Converging:</strong> Người đứng ở điểm hội tụ đường ray, hành lang. Cảm giác: mục tiêu, số phận.</li>
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
          <Link href="/bieu-tuong" className="group nav-card">
            <div className="nav-card-label">← Bài trước</div>
            <div className="nav-card-title">3. Biểu tượng văn hóa</div>
            <div className="nav-card-desc">Nền tảng hình ảnh</div>
          </Link>
          <Link href="/hinh-dang" className="group nav-card text-right">
            <div className="nav-card-label">Bài tiếp →</div>
            <div className="nav-card-title">5. Hình dạng hình khối</div>
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

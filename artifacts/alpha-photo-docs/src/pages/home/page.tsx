

import { useState, useEffect } from 'react';
import { LessonVideoPlayer } from '@/components/lesson-video-player';
import { lessonVideos } from '@/lib/video-config';
import { Link } from 'wouter';
import {
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Eye,
  Sun,
  Contrast,
  MoveRight,
  Maximize2,
  GraduationCap,
  ShieldAlert,
  X,
  Brain,
  AlertTriangle,
  Lightbulb,
  Aperture,
  Target,
  Scan,
  Zap,
  Layers,
  PenTool,
  Camera,
  Check,
  BookOpen,
} from 'lucide-react';
import DocsLayout from '@/components/docs-layout';

/* ------------------------------------------------------------------ */
/*  TOC Data                                                          */
/* ------------------------------------------------------------------ */
const tocSections = [
  { id: 'sec-1', label: 'Ⅰ. Định nghĩa và bản chất', level: 1 },
  { id: 'sec-1-1', label: '1. Hình ảnh là gì?', level: 2 },
  { id: 'sec-1-1a', label: 'a. Bản chất của sự sao chép', level: 3 },
  { id: 'sec-1-1b', label: 'b. Hình ảnh vs. Thực tế', level: 3 },
  { id: 'sec-1-1c', label: 'c. Sự giống nhau chọn lọc', level: 3 },
  { id: 'sec-1-2', label: '2. Tính phản trắc', level: 2 },
  { id: 'sec-1-3', label: '3. Giới hạn và khoảng trống', level: 2 },
  { id: 'sec-2', label: 'Ⅱ. Tác động lên hệ thần kinh', level: 1 },
  { id: 'sec-2-1', label: '1. Đi thẳng vào tiềm thức', level: 2 },
  { id: 'sec-2-2', label: '2. Khả năng khơi gợi cảm xúc', level: 2 },
  { id: 'sec-2-3', label: '3. Trọng lực thị giác', level: 2 },
  { id: 'sec-3', label: 'Ⅲ. Ứng dụng sức mạnh', level: 1 },
  { id: 'sec-3-1', label: '1. Kể chuyện (Storytelling)', level: 2 },
  { id: 'sec-3-2', label: '2. Kết nối hình ảnh', level: 2 },
  { id: 'sec-3-3', label: '3. Nghệ thuật chắt lọc', level: 2 },
  { id: 'sec-4', label: 'Ⅳ. Triết học thị giác', level: 1 },
  { id: 'sec-4-1', label: '1. Semiotics', level: 2 },
  { id: 'sec-4-2', label: '2. Studium và Punctum', level: 2 },
  { id: 'sec-4-3', label: '3. Indexicality', level: 2 },
  { id: 'sec-4-4', label: '4. Susan Sontag', level: 2 },
  { id: 'sec-5', label: 'Ⅴ. Kỷ nguyên Post-Truth', level: 1 },
  { id: 'sec-5-1', label: '1. Post-indexical', level: 2 },
  { id: 'sec-5-2', label: '2. Deepfake và Punctum', level: 2 },
  { id: 'sec-5-3', label: '3. Sự phân hóa mới', level: 2 },
  { id: 'sec-5-4', label: '4. Visual Literacy', level: 2 },
  { id: 'summary', label: 'Tóm tắt 10 điểm chính', level: 1 },
];

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */
export default function AlphaDocsPage() {
  const [isRead, setIsRead] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('alpha-doc-read');
      if (saved) {
        const readPages: string[] = JSON.parse(saved);
        if (readPages.includes('/')) setIsRead(true);
      }
    } catch {}
  }, []);

  const toggleRead = () => {
    try {
      const saved = localStorage.getItem('alpha-doc-read');
      const readPages: string[] = saved ? JSON.parse(saved) : [];
      if (isRead) {
        const updated = readPages.filter((p) => p !== '/');
        localStorage.setItem('alpha-doc-read', JSON.stringify(updated));
        setIsRead(false);
      } else {
        const updated = [...readPages, '/'];
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
          <span className="text-[#9d9db5]">Sức mạnh của hình ảnh</span>
        </div>

        {/* Badges */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold font-mono px-2 py-0.5 rounded bg-[rgba(124,138,255,0.1)] text-[#7c8aff]">
            HA1
          </span>
          <span className="text-[11px] text-[#6b6b80]">14 phút đọc · #HinhAnh</span>
          <span className="elite-badge">
            <GraduationCap size={11} />
            Nâng cao
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-[#e4e4ed] leading-tight mb-3 border-none pb-0">
          Sức mạnh của hình ảnh
        </h1>

        {/* Subtitle */}
        <p className="text-base text-[#9d9db5] leading-relaxed mb-6" style={{ marginTop: 0 }}>
          Nền tảng hình ảnh · Bài 1 — Hiểu bản chất, cơ chế thần kinh và cách ứng dụng sức
          mạnh truyền tải của hình ảnh trong nhiếp ảnh.
        </p>

        {/* Hero image */}
        <div className="rounded-xl overflow-hidden border border-[#1e1e2a] mb-8">
          <img
            src="/hero-tab1.webp"
            alt="Sức mạnh của hình ảnh - Ảnh minh họa"
            className="w-full h-auto object-cover"
            loading="eager"
          />
        </div>

        {/* Video bài học */}
        <LessonVideoPlayer video={lessonVideos['/']} />

        {/* ============================================================ */}
        {/*  SECTION I                                                    */}
        {/* ============================================================ */}
        <h2 id="sec-1" className="scroll-mt-20">
          <span className="section-num">Ⅰ</span>
          Định nghĩa và bản chất thực sự của hình ảnh
        </h2>

        {/* 1.1 */}
        <h3 id="sec-1-1" className="scroll-mt-20">
          1. Hình ảnh là gì?
        </h3>

        <p className="drop-cap">
          Trước khi khai thác sức mạnh của hình ảnh, chúng ta cần trả lời một câu hỏi tưởng
          đơn giản nhưng lại là nền tảng của mọi thực hành nhiếp ảnh:{' '}
          <strong>Hình ảnh thực chất là gì?</strong>
        </p>

        {/* 1.1a */}
        <h4 id="sec-1-1a" className="scroll-mt-20">
          a. Bản chất của sự sao chép
        </h4>
        <p>
          Từ <em>imago</em> trong tiếng Latin mang nghĩa &ldquo;bản sao&rdquo; hay{' '}
          &ldquo;phản ánh&rdquo;. Hình ảnh, ở mức căn bản nhất, là một sự sao chép thị giác
          của thực tại — nhưng không bao giờ là bản sao hoàn hảo.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">Định nghĩa cốt lõi</div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Hình ảnh là một <strong>sự biểu diễn thị giác</strong> được tạo ra thông qua việc
            sao chép có chọn lọc các đặc tính của đối tượng gốc, thông qua một trung gian (ánh
            sáng, mực, pixel...) và một hệ thống quy ước (góc nhìn, khung hình, tỷ lệ...).
          </p>
        </div>

        {/* 1.1b */}
        <h4 id="sec-1-1b" className="scroll-mt-20">
          b. Hình ảnh vs. Thực tế: Thông tin bị lược bỏ
        </h4>
        <p>
          Khi chuyển từ thực tại 3 chiều sang hình ảnh 2 chiều, một lượng lớn thông tin bị
          lược bỏ — đây là{' '}
          <span className="key-concept">
            khoảng cách không thể xóa giữa hình ảnh và thực tế
          </span>
          :
        </p>
        <ul className="factor-list">
          <li>
            <strong>Độ sâu (Depth)</strong> — bị nén thành các tương phản và góc nghiêng
          </li>
          <li>
            <strong>Kết cấu (Texture)</strong> — chỉ còn lại gợi ý qua ánh sáng và bóng
          </li>
          <li>
            <strong>Mùi hương (Smell)</strong> — hoàn toàn mất
          </li>
          <li>
            <strong>Âm thanh (Sound)</strong> — hoàn toàn mất
          </li>
          <li>
            <strong>Chuyển động (Movement)</strong> — bị đóng băng hoặc giả lập
          </li>
        </ul>
        <p>
          Chính sự mất mát này lại là nguồn gốc của sức mạnh: hình ảnh buộc người xem phải{' '}
          <strong>tự điền vào khoảng trống</strong>, kích thích trí tưởng tượng và cảm xúc.
        </p>

        {/* 1.1c */}
        <h4 id="sec-1-1c" className="scroll-mt-20">
          c. Sự giống nhau chọn lọc
        </h4>
        <p>
          Mỗi loại hình ảnh ưu tiên một khía cạnh &ldquo;giống nhau&rdquo; khác nhau với
          thực tại:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
          <div className="hotspot-card text-center">
            <div className="text-[#7c8aff] mb-2">
              <Aperture size={22} className="mx-auto" />
            </div>
            <p className="text-sm font-semibold text-[#e4e4ed] mb-1">Nhiếp ảnh</p>
            <p className="text-xs text-[#9d9db5]">Ưu tiên ánh sáng</p>
          </div>
          <div className="hotspot-card text-center">
            <div className="text-[#ffcb6b] mb-2">
              <PenTool size={22} className="mx-auto" />
            </div>
            <p className="text-sm font-semibold text-[#e4e4ed] mb-1">Hội họa</p>
            <p className="text-xs text-[#9d9db5]">Ưu tiên màu sắc</p>
          </div>
          <div className="hotspot-card text-center">
            <div className="text-emerald-400 mb-2">
              <Layers size={22} className="mx-auto" />
            </div>
            <p className="text-sm font-semibold text-[#e4e4ed] mb-1">Đồ họa</p>
            <p className="text-xs text-[#9d9db5]">Ưu tiên hình dạng</p>
          </div>
        </div>

        <hr className="doc-divider" />

        {/* 1.2 */}
        <h3 id="sec-1-2" className="scroll-mt-20">
          2. Tính phản trắc
        </h3>
        <p>
          Cùng một sự kiện, hai nhiếp ảnh gia có thể tạo ra hai hình ảnh hoàn toàn khác nhau.
          Hình ảnh không phản ánh thực tại — nó{' '}
          <strong>phản trắc thực tại qua một chủ thể</strong>. Năm yếu tố quyết định sự phản
          trắc:
        </p>
        <ul className="factor-list">
          <li>
            <strong>Góc nhìn (Perspective)</strong> — Đứng ở đâu, nhìn từ độ cao nào, hướng
            nào
          </li>
          <li>
            <strong>Thời điểm (Moment)</strong> — Bấm chụp khi nào trong chuỗi sự kiện
          </li>
          <li>
            <strong>Ánh sáng (Light)</strong> — Nguồn sáng tự nhiên hay nhân tạo, hướng và
            chất lượng
          </li>
          <li>
            <strong>Khung hình (Framing)</strong> — Gì được đưa vào, gì bị loại bỏ
          </li>
          <li>
            <strong>Hậu kỳ (Post-processing)</strong> — Mọi chỉnh sửa sau khi chụp
          </li>
        </ul>
        <div className="callout callout-warning">
          <div className="callout-title">
            <AlertTriangle size={13} className="inline mr-1" />
            Lưu ý quan trọng
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            &ldquo;Hình ảnh không nói dối&rdquo; là một quan niệm sai lầm. Hình ảnh luôn nói
            một phần sự thật — và sự thật nào được nói là quyết định của người cầm máy.
          </p>
        </div>

        <hr className="doc-divider" />

        {/* 1.3 */}
        <h3 id="sec-1-3" className="scroll-mt-20">
          3. Giới hạn và khoảng trống
        </h3>
        <p>
          Hình ảnh có những giới hạn cố hữu mà người nhiếp ảnh phải nhận thức rõ:
        </p>
        <ul className="factor-list">
          <li>
            <strong>Thời gian và ngữ cảnh</strong> — Hình ảnh tách đoạn thời gian khỏi dòng
            chảy, mất ngữ cảnh trước-sau
          </li>
          <li>
            <strong>Ý đồ (Intent)</strong> — Không thể hiện trực tiếp ý đồ của người chụp
          </li>
          <li>
            <strong>Nhân quả (Cause/Effect)</strong> — Chỉ ghi nhận kết quả, không hiển thị
            nguyên nhân
          </li>
          <li>
            <strong>Tỷ lệ (Scale)</strong> — Khó đánh giá kích thước thực nếu không có vật
            tham chiếu
          </li>
        </ul>
        <p>
          Nhận thức được các giới hạn này giúp nhiếp ảnh gia{' '}
          <span className="key-concept">
            chủ động bù đắp hoặc tận dụng khoảng trống
          </span>{' '}
          để tạo hình ảnh có sức mạnh truyền tải cao hơn.
        </p>

        {/* ============================================================ */}
        {/*  SECTION II                                                   */}
        {/* ============================================================ */}
        <h2 id="sec-2" className="scroll-mt-20">
          <span className="section-num">Ⅱ</span>
          Tác động của hình ảnh lên hệ thần kinh
        </h2>

        {/* 2.1 */}
        <h3 id="sec-2-1" className="scroll-mt-20">
          1. Đi thẳng vào tiềm thức
        </h3>
        <p>
          Hình ảnh không cần sự cho phép của ý thức để tác động. Não bộ xử lý hình ảnh qua
          hai đường dẫn thần kinh:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <Zap size={16} className="text-[#a855f7]" />
              <span className="text-sm font-semibold text-[#e4e4ed]">Fast Pathway</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              <strong className="text-[#e4e4ed]">12–20ms</strong> · Thông tin thị giác đi
              thẳng từ thị giác sang hạch hạnh nhân (amygdala), kích hoạt phản ứng cảm xúc
              tức thì trước khi bạn kịp nhận thức.
            </p>
          </div>
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <Brain size={16} className="text-[#7c8aff]" />
              <span className="text-sm font-semibold text-[#e4e4ed]">Slow Pathway</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              <strong className="text-[#e4e4ed]">~150ms</strong> · Thông tin đi qua vỏ não
              thị giác (visual cortex), được phân tích chi tiết rồi mới chuyển đến amygdala.
              Đây là đường dẫn nhận thức có chủ đích.
            </p>
          </div>
        </div>
        <div className="callout callout-brain">
          <div className="callout-title">
            <Brain size={13} className="inline mr-1" />
            Nghiên cứu MIT (2014)
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Nghiên cứu của MIT cho thấy não có thể nhận diện một cảnh tượng chỉ trong{' '}
            <strong>13 milliseconds</strong> — nhanh hơn cả thời gian bạn chớp mắt. Điều này
            giải thích tại sao hình ảnh có thể gây phản ứng cảm xúc gần như tức thời.
          </p>
        </div>

        <hr className="doc-divider" />

        {/* 2.2 */}
        <h3 id="sec-2-2" className="scroll-mt-20">
          2. Khả năng khơi gợi cảm xúc
        </h3>
        <p>
          Các yếu tố thị giác trong hình ảnh có thể trực tiếp kích hoạt các phản ứng cảm xúc
          cụ thể:
        </p>
        <div className="overflow-x-auto my-4 rounded-lg border border-[#1e1e2a]">
          <table className="doc-table">
            <thead>
              <tr>
                <th>Yếu tố thị giác</th>
                <th>Cảm xúc kích hoạt</th>
                <th>Ví dụ ứng dụng</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Màu đỏ/cam</td>
                <td>Sự cấp bách, nhiệt huyết, nguy hiểm</td>
                <td>Báo chí chiến trường, quảng cáo thời trang</td>
              </tr>
              <tr>
                <td>Màu xanh lam</td>
                <td>Sự tĩnh lặng, tin cậy, cô đơn</td>
                <td>Nhiếp ảnh cảnh quan, thương hiệu</td>
              </tr>
              <tr>
                <td>Tông tối (Low-key)</td>
                <td>Bí ẩn, nguy hiểm, u buồn</td>
                <td>Chân dung nghệ thuật, phim noir</td>
              </tr>
              <tr>
                <td>Ánh sáng tự nhiên</td>
                <td>Sự chân thực, ấm áp, hy vọng</td>
                <td>Street photography, lifestyle</td>
              </tr>
              <tr>
                <td>Đường chéo</td>
                <td>Sự bất ổn, chuyển động, căng thẳng</td>
                <td>Thể thao, hành động, drama</td>
              </tr>
              <tr>
                <td>Khoảng trống</td>
                <td>Sự cô đơn, tự do, chiêm nghiệm</td>
                <td>Fine art, minimalism</td>
              </tr>
            </tbody>
          </table>
        </div>

        <hr className="doc-divider" />

        {/* 2.3 */}
        <h3 id="sec-2-3" className="scroll-mt-20">
          3. Trọng lực thị giác
        </h3>
        <p>
          Mắt người không nhìn ảnh một cách đều đặn — nó bị thu hút bởi các{' '}
          <strong>&ldquo;điểm nóng&rdquo; thị giác</strong> (visual hotspots). Hiểu và kiểm
          soát các điểm nóng này là kỹ năng cốt lõi của nhiếp ảnh gia:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <Eye size={16} className="text-[#7c8aff]" />
              <span className="text-sm font-semibold text-[#e4e4ed]">
                Khuôn mặt & mắt
              </span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed mb-2">
              Vùng FFA (Fusiform Face Area) trong não chuyên xử lý khuôn mặt. Người xem luôn
              nhìn vào mắt trước, rồi mới đến các phần khác.
            </p>
            <span className="tech-tag">FFA</span>
          </div>
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <Sun size={16} className="text-[#ffcb6b]" />
              <span className="text-sm font-semibold text-[#e4e4ed]">Vùng sáng nhất</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed mb-2">
              Mắt tự động gravitat về vùng sáng nhất trong khung hình. Đây là lý do ánh sáng
              quyết định trọng tâm của ảnh.
            </p>
            <span className="tech-tag">Exposure</span>
          </div>
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <Contrast size={16} className="text-[#fb7185]" />
              <span className="text-sm font-semibold text-[#e4e4ed]">Tương phản cao</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed mb-2">
              Các cạnh tương phản cao tự động thu hút sự chú ý. Đặc biệt quan trọng trong
              ảnh đen trắng.
            </p>
            <span className="tech-tag">Contrast</span>
          </div>
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <MoveRight size={16} className="text-emerald-400" />
              <span className="text-sm font-semibold text-[#e4e4ed]">
                Chuyển động & hướng nhìn
              </span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed mb-2">
              Bất kỳ sự chuyển động nào (thậm chí hướng nhìn của chủ thể) đều dẫn mắt người
              xem theo.
            </p>
            <span className="tech-tag">Leading</span>
          </div>
          <div className="hotspot-card sm:col-span-2">
            <div className="flex items-center gap-2 mb-2">
              <Maximize2 size={16} className="text-[#a855f7]" />
              <span className="text-sm font-semibold text-[#e4e4ed]">
                Kích thước tương đối
              </span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed mb-2">
              Đối tượng lớn hơn trong khung hình nhận được nhiều sự chú ý hơn, bất kể vị trí
              của nó. Kết hợp với vị trí và ánh sáng, kích thước tạo ra thứ bậc thị giác mạnh
              mẽ.
            </p>
            <span className="tech-tag">Scale</span>
          </div>
        </div>
        <div className="callout callout-photo">
          <div className="callout-title">
            <Camera size={13} className="inline mr-1" />
            Ứng dụng nhiếp ảnh
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Khi cấu trúc ảnh, hãy đặt chủ thể quan trọng nhất vào một &ldquo;điểm nóng&rdquo;
            thị giác. Nếu có nhiều điểm nóng cạnh tranh, người xem sẽ bị rối — trừ khi đó
            chính là ý đồ của bạn.
          </p>
        </div>

        {/* ============================================================ */}
        {/*  SECTION III                                                  */}
        {/* ============================================================ */}
        <h2 id="sec-3" className="scroll-mt-20">
          <span className="section-num">Ⅲ</span>
          Ứng dụng sức mạnh của hình ảnh
        </h2>

        {/* 3.1 */}
        <h3 id="sec-3-1" className="scroll-mt-20">
          1. Kể chuyện (Storytelling)
        </h3>
        <p>
          Mỗi hình ảnh có thể kể một câu chuyện ở nhiều tầng:
        </p>
        <div className="space-y-3 my-4">
          <div className="hotspot-card">
            <span className="sub-label">LAYER 1 — What</span>
            <p className="text-sm text-[#9d9db5] leading-relaxed" style={{ marginBottom: 0 }}>
              <strong className="text-[#e4e4ed]">Lớp bề mặt:</strong> Cái gì đang xảy ra? Ai
              ở trong ảnh? Gì đang được hiển thị? — Đây là lớp dễ đọc nhất.
            </p>
          </div>
          <div className="hotspot-card">
            <span className="sub-label">LAYER 2 — Where / When</span>
            <p className="text-sm text-[#9d9db5] leading-relaxed" style={{ marginBottom: 0 }}>
              <strong className="text-[#e4e4ed]">Lớp ngữ cảnh:</strong> Ở đâu? Khi nào? Bối
              cảnh xã hội/lịch sử? — Yêu cầu kiến thức nền tảng từ người xem.
            </p>
          </div>
          <div className="hotspot-card">
            <span className="sub-label">LAYER 3 — Why it matters</span>
            <p className="text-sm text-[#9d9db5] leading-relaxed" style={{ marginBottom: 0 }}>
              <strong className="text-[#e4e4ed]">Lớp ý nghĩa:</strong> Tại sao quan trọng?
              Câu chuyện sâu hơn là gì? — Đây là lớp tạo ra sức mạnh thực sự của hình ảnh.
            </p>
          </div>
        </div>
        <p>
          <strong>Single vs. Series:</strong> Một ảnh đơn có thể kể câu chuyện đầy đủ nếu đủ
          tầng (ví dụ: ảnh Nick Ut — &ldquo;Napalm Girl&rdquo;). Nhưng series ảnh cho phép
          kể chuyện phức tạp hơn với ngữ cảnh phong phú hơn.
        </p>

        <hr className="doc-divider" />

        {/* 3.2 */}
        <h3 id="sec-3-2" className="scroll-mt-20">
          2. Kết nối hình ảnh
        </h3>
        <p>
          Hiệu ứng Kuleshov (lấy tên từ Lev Kuleshov, 1920s) chứng minh rằng ý nghĩa của
          hình ảnh không nằm trong bản thân hình ảnh — mà trong{' '}
          <span className="key-concept">mối quan hệ giữa các hình ảnh</span>.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
          <div className="conn-card" style={{ borderLeftColor: '#7c8aff' }}>
            <p className="text-sm font-semibold text-[#e4e4ed] mb-1">Tương phản</p>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Đặt hai hình ảnh đối lập cạnh nhau tạo ra ý nghĩa mới mà không ảnh đơn lẻ nào
              có.
            </p>
          </div>
          <div className="conn-card" style={{ borderLeftColor: '#ffcb6b' }}>
            <p className="text-sm font-semibold text-[#e4e4ed] mb-1">Tương đồng</p>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Lặp lại motif, màu sắc hoặc hình dạng qua nhiều ảnh tạo sự gắn kết và nhịp điệu.
            </p>
          </div>
          <div className="conn-card" style={{ borderLeftColor: '#22c55e' }}>
            <p className="text-sm font-semibold text-[#e4e4ed] mb-1">Nhân quả</p>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Trình tự trước-sau gợi ra mối quan hệ nguyên nhân-kết quả trong đầu người xem.
            </p>
          </div>
          <div className="conn-card" style={{ borderLeftColor: '#a855f7' }}>
            <p className="text-sm font-semibold text-[#e4e4ed] mb-1">Cảm xúc leo thang</p>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Mỗi ảnh đẩy cảm xúc lên cao hơn, tạo đỉnh cảm xúc ở ảnh cuối cùng.
            </p>
          </div>
        </div>
        <div className="callout callout-key">
          <div className="callout-title">
            <Lightbulb size={13} className="inline mr-1" />
            Nguyên tắc
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Khi chọn và sắp xếp ảnh trong một series, luôn tự hỏi: &ldquo;Ảnh thứ hai thay
            đổi ý nghĩa của ảnh thứ nhất như thế nào?&rdquo; — Nếu câu trả lời là &ldquo;không
            thay đổi&rdquo;, bạn chưa tận dụng hiệu ứng Kuleshov.
          </p>
        </div>

        <hr className="doc-divider" />

        {/* 3.3 */}
        <h3 id="sec-3-3" className="scroll-mt-20">
          3. Nghệ thuật chắt lọc
        </h3>
        <p>
          Sức mạnh của hình ảnh không nằm ở việc thêm vào — mà nằm ở việc{' '}
          <strong>lược bỏ</strong>. Chắt lọc là quá trình loại bỏ mọi yếu tố nhiễu, chỉ giữ
          lại những gì phục vụ câu chuyện:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <Target size={16} className="text-[#7c8aff]" />
              <span className="text-sm font-semibold text-[#e4e4ed]">DOF</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed mb-2">
              Độ sâu trường ảnh mỏng — làm mờ nền để tách chủ thể, hướng sự chú ý chính xác
              vào nơi bạn muốn.
            </p>
            <span className="tech-tag">f/1.4–2.8</span>
          </div>
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <MoveRight size={16} className="text-[#ffcb6b]" />
              <span className="text-sm font-semibold text-[#e4e4ed]">Leading Lines</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed mb-2">
              Đường dẫn — sử dụng các đường thực hoặc ảo để dẫn mắt người xem từ viền ảnh đến
              chủ thể chính.
            </p>
            <span className="tech-tag">Composition</span>
          </div>
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <Scan size={16} className="text-emerald-400" />
              <span className="text-sm font-semibold text-[#e4e4ed]">Frame in Frame</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed mb-2">
              Khung trong khung — sử dụng cửa sổ, vòm cây, cửa arch... để tạo khung thứ hai
              bên trong khung hình.
            </p>
            <span className="tech-tag">Framing</span>
          </div>
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <Maximize2 size={16} className="text-[#a855f7]" />
              <span className="text-sm font-semibold text-[#e4e4ed]">Negative Space</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed mb-2">
              Khoảng không gian trống — tạo &ldquo;không gian thở&rdquo; cho chủ thể, nhấn
              mạnh sự cô đơn, tự do hoặc giản lược.
            </p>
            <span className="tech-tag">Minimalism</span>
          </div>
          <div className="hotspot-card sm:col-span-2">
            <div className="flex items-center gap-2 mb-2">
              <Contrast size={16} className="text-[#fb7185]" />
              <span className="text-sm font-semibold text-[#e4e4ed]">Tonal Contrast</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed mb-2">
              Tương phản tông — sự khác biệt giữa vùng sáng và tối trong ảnh. Tương phản cao
              tạo kịch tính; tương phản thấp tạo sự êm dịu, hoài niệm.
            </p>
            <span className="tech-tag">Zone System</span>
          </div>
        </div>

        {/* ============================================================ */}
        {/*  SECTION IV — ELITE                                           */}
        {/* ============================================================ */}
        <h2 id="sec-4" className="scroll-mt-20">
          <span className="section-num section-num-elite">Ⅳ</span>
          Triết học thị giác: Từ Semiotics đến Punctum
        </h2>

        {/* 4.1 */}
        <h3 id="sec-4-1" className="scroll-mt-20">
          1. Semiotics — Ba tầng ý nghĩa
        </h3>
        <p>
          Semiotics (Ký hiệu học) — khởi phát từ Ferdinand de Saussure và Charles Sanders
          Peirce — cho chúng ta công cụ phân tích hình ảnh thành ba tầng ý nghĩa:
        </p>
        <div className="comparison-grid my-4">
          <div className="comp-card">
            <span className="sub-label">LAYER 1</span>
            <h4>Denotation</h4>
            <p>
              Cái gì <em>đang có</em> trong ảnh? — Mô tả thuần túy các yếu tố thị giác mà
              không diễn giải. Ví dụ: &ldquo;Một người phụ nữ đang ngồi trên ghế gỗ.&rdquo;
            </p>
          </div>
          <div className="comp-card">
            <span className="sub-label">LAYER 2</span>
            <h4>Connotation</h4>
            <p>
              Cái gì <em>được gợi ra</em>? — Ý nghĩa văn hóa, cảm xúc, biểu tượng được kích
              hoạt. Ví dụ: &ldquo;Sự cô đơn, tĩnh lặng, hoài niệm.&rdquo;
            </p>
          </div>
        </div>
        <div className="comp-card my-4" style={{ borderColor: '#fb718533' }}>
          <span className="sub-label" style={{ color: '#fb7185', background: 'rgba(251,113,133,0.1)' }}>
            LAYER 3
          </span>
          <h4>Myth (Thần thoại)</h4>
          <p>
            Ý nghĩa <em>được tự nhiên hóa</em> đến mức người xem không còn nhận ra nó là một
            cấu trúc văn hóa. Ảnh quảng cáo thường hoạt động ở tầng này — biến giá trị tiêu
            dùng thành &ldquo;điều hiển nhiên.&rdquo;
          </p>
        </div>
        <div className="callout callout-elite">
          <div className="callout-title">
            <ShieldAlert size={13} className="inline mr-1" />
            Elite Insight
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Nhiếp ảnh gia giỏi không chỉ chụp ở Layer 1 — họ thiết kế Layer 2 và kiểm soát
            khả năng kích hoạt Layer 3. Mỗi lựa chọn bố cục, ánh sáng, màu sắc đều là một quyết
            định ký hiệu học.
          </p>
        </div>

        <hr className="doc-divider" />

        {/* 4.2 */}
        <h3 id="sec-4-2" className="scroll-mt-20">
          2. Studium và Punctum
        </h3>
        <p>
          Trong &ldquo;Camera Lucida&rdquo; (1980), Roland Barthes phân chia trải nghiệm hình
          ảnh thành hai cực:
        </p>
        <div className="comparison-grid my-4">
          <div className="comp-card">
            <span className="sub-label">STUDIUM</span>
            <h4>Lĩnh vực chung</h4>
            <p>
              Sự quan tâm có chủ đích, văn hóa, lý trí. Là những gì bạn đọc được nhờ kiến
              thức và kinh nghiệm — bối cảnh, thể loại, kỹ thuật.
            </p>
          </div>
          <div className="comp-card" style={{ borderColor: '#fb718533' }}>
            <span className="sub-label" style={{ color: '#fb7185', background: 'rgba(251,113,133,0.1)' }}>
              PUNCTUM
            </span>
            <h4>Điểm đâm xuyên</h4>
            <p>
              Chi tiết bất ngờ, không dự đoán được, &ldquo;đâm xuyên&rdquo; người xem. Nó nằm
              ngoài ý đồ của nhiếp ảnh gia và chỉ tồn tại trong trải nghiệm cá nhân.
            </p>
          </div>
        </div>
        <div className="quote-block">
          <p>
            &ldquo;Punctum là: ta bị đâm. Đó là cái gì nhắm vào tôi, không phải tôi nhắm vào
            nó.&rdquo;
          </p>
          <p className="quote-attr">— Roland Barthes, Camera Lucida, 1980</p>
        </div>
        <p>
          <span className="key-concept">Hệ quả thực hành:</span> Bạn không thể &ldquo;chụp&rdquo;
          Punctum — nó không nằm dưới sự kiểm soát của người chụp. Nhưng bạn có thể tạo điều
          kiện cho nó xuất hiện: chụp nhiều, chụp chân thực, để ngỏ các chi tiết &ldquo;phi
          chức năng&rdquo; trong khung hình.
        </p>

        <hr className="doc-divider" />

        {/* 4.3 */}
        <h3 id="sec-4-3" className="scroll-mt-20">
          3. Indexicality — Sức mạnh bằng chứng
        </h3>
        <p>
          Khái niệm &ldquo;indexicality&rdquo; (tính chỉ dẫn) từ triết học Peirce cho rằng
          nhiếp ảnh có một mối quan hệ vật lý trực tiếp với thực tại — ánh sáng phản xạ từ
          đối tượng rơi lên film/sensor. Đây là nguồn gốc sức mạnh bằng chứng của nhiếp ảnh.
        </p>
        <div className="quote-block">
          <p>
            &ldquo;Mỗi bức ảnh là một chứng nhận sự tồn tại. Ảnh không đại diện cho cái gì —
            nó chứng nhận rằng cái gì đó đã tồn tại.&rdquo;
          </p>
          <p className="quote-attr">— Jean-Marie Schaeffer, L&apos;image précaire, 1987</p>
        </div>
        <p>
          Chính indexicality khiến người xem &ldquo;tin&rdquo; ảnh nhiếp ảnh hơn là ảnh hội
          họa hay đồ họa — dù cả ba đều là hình ảnh. Nhưng kỷ nguyên số đang làm rung chuyển
          niềm tin này.
        </p>

        <hr className="doc-divider" />

        {/* 4.4 */}
        <h3 id="sec-4-4" className="scroll-mt-20">
          4. Susan Sontag và đạo đức nhìn
        </h3>
        <p>
          Susan Sontag, trong &ldquo;On Photography&rdquo; (1977) và &ldquo;Regarding the
          Pain of Others&rdquo; (2003), đặt ra những câu hỏi không thoải mái:
        </p>
        <ul className="factor-list">
          <li>
            <strong>Nhìn = chiếm hữu?</strong> — Sontag cho rằng nhiếp ảnh là hình thức thu
            thập thế giới, biến trải nghiệm thành vật sở hữu.
          </li>
          <li>
            <strong>Lặp lại làm tê liệt cảm xúc?</strong> — Xem quá nhiều ảnh đau khổ không
            làm ta hành động mà làm ta chai sạn.
          </li>
          <li>
            <strong>Ai được quyền nhìn? Ai bị nhìn?</strong> — Quyền lực nhiếp ảnh luôn bất
            đối xứng: người cầm máy có quyền, người trong ảnh thường không.
          </li>
        </ul>
        <div className="callout callout-elite">
          <div className="callout-title">
            <ShieldAlert size={13} className="inline mr-1" />
            Câu hỏi phản tư
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Khi bạn bấm chụp một người đang khổ đau — bạn đang làm gì? Ghi nhận sự thật?
            Khai thác nỗi đau? Hay chỉ đang &ldquo;thu thập&rdquo; một trải nghiệm không thuộc
            về mình? Mỗi nhiếp ảnh gia phải tự trả lời câu hỏi này.
          </p>
        </div>

        {/* ============================================================ */}
        {/*  SECTION V — ELITE                                            */}
        {/* ============================================================ */}
        <h2 id="sec-5" className="scroll-mt-20">
          <span className="section-num section-num-elite">Ⅴ</span>
          Hình ảnh trong kỷ nguyên Post-Truth
        </h2>

        {/* 5.1 */}
        <h3 id="sec-5-1" className="scroll-mt-20">
          1. Post-indexical — Sự kết thúc của indexicality?
        </h3>
        <p>
          Kỷ nguyên số đã phá vỡ mối liên kết vật lý giữa hình ảnh và thực tại. Hình ảnh số
          không còn &ldquo;dấu vết vật lý&rdquo; — nó là dữ liệu có thể chỉnh sửa, tái tạo
          hoàn toàn:
        </p>
        <div className="comparison-grid my-4">
          <div className="comp-card">
            <span className="sub-label">KỶ NGUYÊN INDEXICAL</span>
            <h4>Ảnh analog</h4>
            <p>
              Ánh sáng → Film → Bản in. Mỗi bước là một ràng buộc vật lý. Chỉnh sửa có giới
              hạn và để lại dấu vết. Niềm tin vào tính chân thực cao.
            </p>
          </div>
          <div className="comp-card" style={{ borderColor: '#fb718533' }}>
            <span className="sub-label" style={{ color: '#fb7185', background: 'rgba(251,113,133,0.1)' }}>
              KỶ NGUYÊN POST-INDEXICAL
            </span>
            <h4>Ảnh số & AI</h4>
            <p>
              Ánh sáng → Sensor → Dữ liệu số → Hiển thị. Mỗi bước đều có thể can thiệp,
              chỉnh sửa, tạo mới. Ranh giới giữa thật/giả bị xóa nhòa.
            </p>
          </div>
        </div>

        <hr className="doc-divider" />

        {/* 5.2 */}
        <h3 id="sec-5-2" className="scroll-mt-20">
          2. Deepfake và vũ khí hóa Punctum
        </h3>
        <p>
          Deepfake không chỉ tạo hình ảnh giả — nó{' '}
          <span className="key-concept">vũ khí hóa Punctum</span>. Bằng cách tạo ra chi tiết
          &ldquo;đâm xuyên&rdquo; giả, deepfake kích hoạt phản ứng cảm xúc chân thực từ người
          xem, dù nội dung hoàn toàn bịa đặt.
        </p>
        <p>
          Điều này đảo ngược mối quan hệ niềm tin truyền thống: trước đây, cảm xúc mạnh mẻ =
          bằng chứng chân thực. Nay, cảm xúc mạnh mẽ có thể = bằng chứng của sự lừa dối tinh
          vi.
        </p>

        <hr className="doc-divider" />

        {/* 5.3 */}
        <h3 id="sec-5-3" className="scroll-mt-20">
          3. Sự phân hóa mới
        </h3>
        <p>
          Trong bối cảnh post-truth, nhiếp ảnh phân hóa thành ba hướng chính:
        </p>
        <div className="space-y-3 my-4">
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <span className="sub-label">HƯỚNG I</span>
              <span className="text-sm font-semibold text-[#e4e4ed]">
                Evidential — Bằng chứng
              </span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Nhiếp ảnh báo chí, tài liệu, pháp y. Ưu tiên tính chân thực tuyệt đối. Sử dụng
              metadata, blockchain, chứng nhận nguồn gốc để bảo vệ indexicality.
            </p>
          </div>
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <span className="sub-label" style={{ color: '#ffcb6b', background: 'rgba(255,203,107,0.1)' }}>
                HƯỚNG II
              </span>
              <span className="text-sm font-semibold text-[#e4e4ed]">
                Fine Art — Nghệ thuật
              </span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Nhiếp ảnh nghệ thuật, ý niệm. Từ chối indexicality, xem hình ảnh là phương tiện
              biểu đạt, không phải bản sao thực tại. Chỉnh sửa sâu được chấp nhận và hoan
              nghênh.
            </p>
          </div>
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <span className="sub-label" style={{ color: '#fb7185', background: 'rgba(251,113,133,0.1)' }}>
                HƯỚNG III
              </span>
              <span className="text-sm font-semibold text-[#e4e4ed]">
                Hybrid — Lai ghép
              </span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Đa số nhiếp ảnh thực hành hiện nay. Kết hợp chân thực và biểu đạt, document và
              narrative. Đòi hỏi người xem có visual literacy để đánh giá.
            </p>
          </div>
        </div>

        <hr className="doc-divider" />

        {/* 5.4 */}
        <h3 id="sec-5-4" className="scroll-mt-20">
          4. Visual Literacy — Năng lực đọc hình ảnh
        </h3>
        <p>
          Trong kỷ nguyên post-truth, năng lực đọc hình ảnh (visual literacy) không còn là
          kỹ năng sang trọng — nó là kỹ năng sinh tồn. Một khung phân tích cơ bản:
        </p>
        <div className="space-y-2 my-4">
          <div className="flex gap-3 items-start p-3 rounded-lg bg-[#111118] border border-[#1e1e2a]">
            <span className="section-num text-xs" style={{ width: 24, height: 24, fontSize: '0.7rem' }}>1</span>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              <strong className="text-[#e4e4ed]">Ai tạo ra hình ảnh này?</strong> — Nguồn gốc,
              ý đồ, lập trường.
            </p>
          </div>
          <div className="flex gap-3 items-start p-3 rounded-lg bg-[#111118] border border-[#1e1e2a]">
            <span className="section-num text-xs" style={{ width: 24, height: 24, fontSize: '0.7rem' }}>2</span>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              <strong className="text-[#e4e4ed]">Kỹ thuật nào được sử dụng?</strong> — Góc
              nhìn, ánh sáng, hậu kỳ, framing.
            </p>
          </div>
          <div className="flex gap-3 items-start p-3 rounded-lg bg-[#111118] border border-[#1e1e2a]">
            <span className="section-num text-xs" style={{ width: 24, height: 24, fontSize: '0.7rem' }}>3</span>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              <strong className="text-[#e4e4ed]">Cảm xúc nào đang bị kích hoạt?</strong> —
              Fast pathway hay slow pathway?
            </p>
          </div>
          <div className="flex gap-3 items-start p-3 rounded-lg bg-[#111118] border border-[#1e1e2a]">
            <span className="section-num text-xs" style={{ width: 24, height: 24, fontSize: '0.7rem' }}>4</span>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              <strong className="text-[#e4e4ed]">Cái gì bị loại bỏ?</strong> — Khung hình che
              giấu điều gì?
            </p>
          </div>
          <div className="flex gap-3 items-start p-3 rounded-lg bg-[#111118] border border-[#1e1e2a]">
            <span className="section-num text-xs" style={{ width: 24, height: 24, fontSize: '0.7rem' }}>5</span>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              <strong className="text-[#e4e4ed]">Hình ảnh này muốn tôi làm gì?</strong> — Hành
              vi nào được hình ảnh hướng tới?
            </p>
          </div>
        </div>
        <div className="callout callout-elite">
          <div className="callout-title">
            <ShieldAlert size={13} className="inline mr-1" />
            Tương lai của hình ảnh
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Tương lai không thuộc về những ai chụp ảnh đẹp nhất — mà thuộc về những ai hiểu
            sâu nhất cách hình ảnh tác động lên con người. Trong thế giới mà AI có thể tạo ra
            bất kỳ hình ảnh nào, sự hiểu biết về cơ chế thị giác, cảm xúc và ký hiệu học là
            thứ duy nhất phân biệt người tạo hình ảnh có chủ đích và người tạo hình ảnh vô thức.
          </p>
        </div>

        <hr className="doc-divider" />

        {/* ============================================================ */}
        {/*  SUMMARY — 10 KEY POINTS                                      */}
        {/* ============================================================ */}
        <h2 id="summary" className="scroll-mt-20">
          Tóm tắt 10 điểm chính
        </h2>
        <div className="space-y-3 my-4">
          <div className="key-point">
            <div className="key-point-num">01</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Hình ảnh là sự sao chép có chọn lọc, không phải bản sao hoàn hảo của thực tại.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">02</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Chuyển từ 3D sang 2D làm mất depth, texture, smell, sound, movement — nhưng sự
              mất mát này tạo ra sức mạnh.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">03</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Hình ảnh phản trắc thực tại qua chủ thể, không phản ánh khách quan — góc nhìn,
              thời điểm, ánh sáng, khung hình, hậu kỳ.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">04</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Não xử lý hình ảnh qua hai đường: Fast (12–20ms, amygdala) và Slow (~150ms,
              visual cortex).
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">05</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Màu sắc, tông sáng tối, đường nét và khoảng trống đều kích hoạt cảm xúc cụ thể.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">06</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Trọng lực thị giác: mắt gravitat về khuôn mặt, vùng sáng, tương phản cao,
              chuyển động, kích thước.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">07</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Storytelling hiệu quả hoạt động ở 3 tầng: What, Where/When, Why it matters.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">08</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Hiệu ứng Kuleshov: ý nghĩa nằm trong mối quan hệ giữa các hình ảnh, không phải
              trong bản thân chúng.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">09</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Semiotics cho phép phân tích hình ảnh qua 3 tầng: Denotation, Connotation, Myth.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">10</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Visual literacy — năng lực đọc hình ảnh — là kỹ năng sinh tồn trong kỷ nguyên
              post-truth.
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
              20 năm cầm máy dạy tôi điều này: người xem không nhìn thấy ảnh của bạn — họ nhìn thấy <strong>bản thân họ</strong> trong ảnh của bạn. Khoảnh khắc một tấm ảnh không còn về chủ thể mà về người xem, đó là khi nó thực sự trở nên mạnh mẽ và không thể quên. Mọi kỹ thuật trong bộ tài liệu này đều phục vụ cho một mục tiêu duy nhất: tạo ra khoảng trống trong ảnh để người xem có thể bước vào.
            </p>
          </div>
          <div className="callout callout-pitfall">
            <div className="callout-title">⚠ Bẫy chuyên gia</div>
            <p style={{ marginBottom: 0, lineHeight: 1.75 }}>
              Nhiều nhiếp ảnh gia cố gắng "nói" quá nhiều trong một tấm ảnh. Một hình ảnh mạnh thường chỉ có <strong>MỘT điểm biểu đạt</strong> rõ ràng — tất cả những gì còn lại phục vụ cho điểm đó. Đây là nghệ thuật <em>trừ bỏ</em>, không phải cộng thêm. Ảnh có quá nhiều "điểm nhấn" thực ra không có điểm nhấn nào cả.
            </p>
          </div>
          <div className="practice-exercise">
            <div className="practice-header">⬥ Bài tập thực chiến — Phân tích thần kinh học</div>
            <div className="practice-body">
              <p>Chọn 10 ảnh bạn ngưỡng mộ từ bất kỳ nhiếp ảnh gia nào. Với mỗi ảnh, ghi ra hai phản ứng:</p>
              <ol className="practice-steps">
                <li><strong>Fast Pathway (2 giây đầu):</strong> Cảm xúc tức thì là gì? Đừng suy nghĩ — viết ngay từ đầu tiên nảy ra.</li>
                <li><strong>Slow Pathway (30 giây phân tích):</strong> Kỹ thuật nào tạo ra cảm xúc đó? Ánh sáng, bố cục, màu sắc, hay chủ thể?</li>
                <li><strong>So sánh:</strong> Fast và Slow có đồng thuận không? Khi chúng mâu thuẫn, đó là dấu hiệu ảnh có chiều sâu thực sự.</li>
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
          {/* No previous for first page */}
          <div />
          <Link href="/muc-dich" className="group nav-card text-right">
            <div className="nav-card-label">Bài tiếp →</div>
            <div className="nav-card-title">2. Mục đích của hình ảnh</div>
            <div className="nav-card-desc">Nền tảng hình ảnh</div>
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

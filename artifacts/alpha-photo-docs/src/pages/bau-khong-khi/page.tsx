

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
  Wind,
  Sun,
  Palette,
  Music,
  Heart,
} from 'lucide-react';
import DocsLayout from '@/components/docs-layout';

/* ------------------------------------------------------------------ */
/*  TOC Data                                                          */
/* ------------------------------------------------------------------ */
const tocSections = [
  { id: 'sec-1', label: 'Ⅰ. Bầu không khí là gì', level: 1 },
  { id: 'sec-1-1', label: '1. Định nghĩa — Tổng hòa không phải phép cộng', level: 2 },
  { id: 'sec-1-2', label: '2. Stimmung — Khái niệm không thể dịch', level: 2 },
  { id: 'sec-1-3', label: '3. Atmosphere là hệ quả, không phải mục tiêu', level: 2 },
  { id: 'sec-2', label: 'Ⅱ. Các yếu tố thị giác tạo nên Atmosphere', level: 1 },
  { id: 'sec-2-1', label: '1. Ánh sáng — Tâm trạng chủ đạo', level: 2 },
  { id: 'sec-2-2', label: '2. Màu sắc và Tương phản màu', level: 2 },
  { id: 'sec-2-3', label: '3. Không gian và Tỷ lệ', level: 2 },
  { id: 'sec-2-4', label: '4. Đường nét, Hình dạng và Texture', level: 2 },
  { id: 'sec-3', label: 'Ⅲ. Các yếu tố phi thị giác tạo nên Atmosphere', level: 1 },
  { id: 'sec-3-1', label: '1. Sự hiện diện của người chụp', level: 2 },
  { id: 'sec-3-2', label: '2. Thời gian và sự kiên nhẫn', level: 2 },
  { id: 'sec-3-3', label: '3. Khoảnh khắc quyết định', level: 2 },
  { id: 'sec-3-4', label: '4. Mối quan hệ với chủ thể', level: 2 },
  { id: 'sec-4', label: 'Ⅳ. Atmosphere trong các thể loại nhiếp ảnh', level: 1 },
  { id: 'sec-4-1', label: '1. Fine Art Photography', level: 2 },
  { id: 'sec-4-2', label: '2. Documentary Photography', level: 2 },
  { id: 'sec-4-3', label: '3. Portrait Photography', level: 2 },
  { id: 'sec-4-4', label: '4. Street Photography', level: 2 },
  { id: 'sec-5', label: 'Ⅴ. Từ nguyên lý đến bản năng', level: 1 },
  { id: 'sec-5-1', label: '1. Ba giai đoạn phát triển nhãn quan', level: 2 },
  { id: 'sec-5-2', label: '2. Không có đường tắt', level: 2 },
  { id: 'sec-5-3', label: '3. Visual voice — Tiếng nói thị giác cá nhân', level: 2 },
  { id: 'sec-6', label: 'Ⅵ. Ứng dụng thực hành', level: 1 },
  { id: 'sec-6-1', label: '1. Bài tập "Chụp cảm xúc, không chụp chủ thể"', level: 2 },
  { id: 'sec-6-2', label: '2. Bài tập "Chụp cùng một nơi qua thời gian"', level: 2 },
  { id: 'sec-6-3', label: '3. Bài tập "Giải phẫu atmosphere" của bậc thầy', level: 2 },
  { id: 'sec-6-4', label: '4. Bài tập cuối chương', level: 2 },
  { id: 'summary', label: 'Tóm tắt 8 điểm chính', level: 1 },
];

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */
export default function BauKhongKhiPage() {
  const [isRead, setIsRead] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('alpha-doc-read');
      if (saved) {
        const readPages: string[] = JSON.parse(saved);
        if (readPages.includes('/bau-khong-khi')) setIsRead(true);
      }
    } catch {}
  }, []);

  const toggleRead = () => {
    try {
      const saved = localStorage.getItem('alpha-doc-read');
      const readPages: string[] = saved ? JSON.parse(saved) : [];
      if (isRead) {
        const updated = readPages.filter((p) => p !== '/bau-khong-khi');
        localStorage.setItem('alpha-doc-read', JSON.stringify(updated));
        setIsRead(false);
      } else {
        const updated = [...readPages, '/bau-khong-khi'];
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
          <a href="#">Nguyên lý thị giác</a>
          <ChevronRight size={12} />
          <span className="text-[#9d9db5]">Bầu không khí &amp; Cảm xúc</span>
        </div>

        {/* Badges */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold font-mono px-2 py-0.5 rounded bg-[rgba(124,138,255,0.1)] text-[#7c8aff]">
            HA12
          </span>
          <span className="text-[11px] text-[#6b6b80]">18 phút đọc · #BauKhongKhi #CamXuc #Atmosphere #NguyenLyThiGiac</span>
          <span className="elite-badge">
            <GraduationCap size={11} />
            Nâng cao
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-[#e4e4ed] leading-tight mb-3 border-none pb-0">
          Bầu không khí &amp; Cảm xúc
        </h1>

        {/* Subtitle */}
        <p className="text-base text-[#9d9db5] leading-relaxed mb-6" style={{ marginTop: 0 }}>
          Nguyên lý thị giác · Bài 12 — Bài cuối chương
        </p>

        {/* Hero image */}
        <div className="color-overview-hero rounded-xl overflow-hidden border border-[#1e1e2a] mb-8">
          <img
            src="/hero-bau-khong-khi.png"
            alt="Infographic tổng quan về bầu không khí và cảm xúc trong nhiếp ảnh: atmosphere, yếu tố thị giác, ví dụ phân tích và nghệ thuật cảm nhận"
            className="w-full h-auto object-contain"
            loading="eager"
          />
        </div>

        {/* Video bài học */}
        <LessonVideoPlayer video={lessonVideos['/bau-khong-khi']} />

        {/* Opening Quote */}
        <div className="quote-block">
          <p>
            &ldquo;Nhiếp ảnh tốt nhất không cho bạn câu trả lời. Nó cho bạn một câu hỏi mà bạn sẽ mang theo suốt đời.&rdquo; — Sebastião Salgado
          </p>
        </div>

        {/* ============================================================ */}
        {/*  INTRODUCTION                                                 */}
        {/* ============================================================ */}
        <p className="drop-cap">
          Đây là bài học cuối cùng và khó nhất của chương Nguyên lý thị giác — không phải vì nó phức tạp về kỹ thuật, mà vì nó đòi hỏi một bước nhảy vọt từ tư duy phân tích sang tư duy tổng hợp.
        </p>

        <p>
          Mười một bài học trước đã trang bị cho bạn một bộ ngôn ngữ đầy đủ: đường nét, hình dạng, không gian âm/dương, ánh sáng, màu sắc, tương phản, texture, tỷ lệ. Bạn có thể phân tích bất kỳ hình ảnh nào thành các thành phần cấu tạo, đọc từng nguyên lý đang hoạt động, và dự đoán tác động cảm xúc của nó.
        </p>

        <p>
          Nhưng phân tích không phải là sáng tác. Biết tên từng nốt nhạc không làm bạn thành nhạc sĩ. <span className="key-concept">Bầu không khí — atmosphere</span> — là thứ xuất hiện khi tất cả các nguyên lý đó cộng hưởng với nhau trong một khoảnh khắc duy nhất, tạo ra một trạng thái cảm xúc tổng thể không thể giải thích bằng bất kỳ thành phần đơn lẻ nào.
        </p>

        {/* ============================================================ */}
        {/*  SECTION I                                                    */}
        {/* ============================================================ */}
        <h2 id="sec-1" className="scroll-mt-20">
          <span className="section-num">Ⅰ</span>
          Bầu không khí là gì — Và tại sao nó không thể được &lsquo;thiết kế&rsquo; trực tiếp
        </h2>

        <hr className="doc-divider" />

        {/* 1.1 */}
        <h3 id="sec-1-1" className="scroll-mt-20">
          1. Định nghĩa — Tổng hòa không phải phép cộng
        </h3>

        <p>
          Atmosphere trong nhiếp ảnh là cái cảm giác tổng thể mà hình ảnh để lại sau khi người xem đã quên đi mọi chi tiết kỹ thuật. Nó là thứ bạn nhớ về một bức ảnh dù không thể mô tả chính xác tại sao: &ldquo;Bức ảnh đó có gì đó buồn&rdquo;, &ldquo;Nó khiến tôi muốn ở đó&rdquo;, &ldquo;Nhìn vào nó tôi cảm thấy yên tĩnh hoàn toàn.&rdquo;
        </p>

        <p>
          Atmosphere không nằm trong bất kỳ yếu tố đơn lẻ nào — không phải ánh sáng, không phải màu sắc, không phải bố cục một mình. Nó xuất hiện từ <span className="key-concept">mối quan hệ giữa tất cả những yếu tố đó</span> và từ sự cộng hưởng giữa hình ảnh với ký ức và cảm xúc cá nhân của người xem. Đây là lý do cùng một bức ảnh có thể tạo ra các cảm xúc khác nhau với những người xem khác nhau — và đây không phải thất bại của hình ảnh, mà là bản chất của nó.
        </p>

        <hr className="doc-divider" />

        {/* 1.2 */}
        <h3 id="sec-1-2" className="scroll-mt-20">
          2. Stimmung — Khái niệm không thể dịch hoàn toàn
        </h3>

        <p>
          Tiếng Đức có một từ mô tả chính xác nhất điều mà nhiếp ảnh gia vĩ đại tìm kiếm: <span className="key-concept">Stimmung</span> — thường được dịch là &ldquo;bầu không khí&rdquo;, &ldquo;tâm trạng của không gian&rdquo;, hay &ldquo;sự hòa điệu giữa con người và môi trường xung quanh&rdquo;. Nhưng không bản dịch nào đủ đầy đủ.
        </p>

        <p>
          Stimmung mô tả trạng thái khi người và bối cảnh xung quanh cùng rung động trên một tần số cảm xúc — khi ánh sáng, không khí, chủ thể, thời gian, và khoảnh khắc đều nói cùng một ngôn ngữ. Đây không phải là điều có thể sắp xếp hay lên kế hoạch hoàn toàn — nó được nhận ra và bắt kịp.
        </p>

        <hr className="doc-divider" />

        {/* 1.3 */}
        <h3 id="sec-1-3" className="scroll-mt-20">
          3. Atmosphere là hệ quả, không phải mục tiêu
        </h3>

        <div className="callout callout-warning">
          <div className="callout-title">
            <AlertTriangle size={13} className="inline mr-1" />
            Nghịch lý quan trọng nhất: Càng cố tạo atmosphere, càng khó đạt được
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Đây là nghịch lý quan trọng nhất của bài học này: càng cố gắng tạo ra atmosphere, bạn càng ít có khả năng đạt được nó. Atmosphere xuất hiện tự nhiên từ việc thực hành đúng tất cả các nguyên lý đã học — khi mọi quyết định kỹ thuật và sáng tác được đưa ra với ý thức đầy đủ về mục đích cảm xúc.
          </p>
        </div>

        <p>
          Hình ảnh được tạo ra với suy nghĩ &ldquo;Tôi muốn tạo một bức ảnh có atmosphere&rdquo; thường thiếu atmosphere hoàn toàn — vì nó thiếu sự thật. Hình ảnh được tạo ra với suy nghĩ &ldquo;Tôi muốn kể câu chuyện trung thực về khoảnh khắc này&rdquo; — và được thực hiện với tất cả kỹ năng thị giác đã tích lũy — thường có atmosphere sâu sắc mà người chụp không cố gắng tạo ra.
        </p>

        <p>
          Henri Cartier-Bresson gọi đây là &ldquo;khoảnh khắc quyết định&rdquo; — không phải khoảnh khắc hành động đạt đỉnh điểm, mà khoảnh khắc tất cả các yếu tố hội tụ thành một hình thức hoàn chỉnh. Khoảnh khắc đó không được thiết kế — nó được nhận ra.
        </p>

        {/* ============================================================ */}
        {/*  SECTION II                                                   */}
        {/* ============================================================ */}
        <h2 id="sec-2" className="scroll-mt-20">
          <span className="section-num">Ⅱ</span>
          Các yếu tố thị giác tạo nên Atmosphere — Tổng hợp toàn bộ chương
        </h2>

        <p>
          Phần này không giới thiệu nguyên lý mới — nó tổng hợp tất cả mười một bài học trước để cho thấy chúng hoạt động cùng nhau như thế nào để tạo ra atmosphere. Đây là bài tập tư duy hệ thống quan trọng nhất của toàn chương.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[#ffcb6b]"><Sun size={16} /></span>
              <span className="text-sm font-semibold text-[#e4e4ed]">Ánh sáng — Tâm trạng chủ đạo</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Yếu tố quan trọng nhất tạo atmosphere. Ánh sáng thiết lập tâm trạng tổng thể trước khi bất kỳ yếu tố nào khác có cơ hội nói chuyện.
            </p>
          </div>
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[#fb7185]"><Palette size={16} /></span>
              <span className="text-sm font-semibold text-[#e4e4ed]">Màu sắc &amp; Tương phản</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Ngôn ngữ cảm xúc trực tiếp. Palette màu sắc thiết lập tầng cảm xúc thứ hai ngay sau ánh sáng.
            </p>
          </div>
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[#7c8aff]"><Scale size={16} /></span>
              <span className="text-sm font-semibold text-[#e4e4ed]">Không gian &amp; Tỷ lệ</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Cảm giác về vị trí và quy mô. Cách không gian được phân chia quyết định vị trí cảm xúc của người xem.
            </p>
          </div>
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-emerald-400"><Music size={16} /></span>
              <span className="text-sm font-semibold text-[#e4e4ed]">Đường nét &amp; Texture</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Nhịp điệu và chiều sâu cảm giác. Hệ thống đường nét tạo ra nhịp điệu cảm xúc như trong âm nhạc.
            </p>
          </div>
        </div>

        <hr className="doc-divider" />

        {/* 2.1 */}
        <h3 id="sec-2-1" className="scroll-mt-20">
          1. Ánh sáng — Tâm trạng chủ đạo
        </h3>

        <div className="callout callout-key">
          <div className="callout-title">
            <Lightbulb size={13} className="inline mr-1" />
            Ánh sáng là yếu tố quan trọng nhất tạo atmosphere
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Trong tất cả các yếu tố tạo atmosphere, ánh sáng là quan trọng nhất và tác động sâu nhất — vì nó là yếu tố đầu tiên não người xử lý và phân loại về mặt cảm xúc. Ánh sáng không chỉ chiếu sáng cảnh vật — nó thiết lập tâm trạng tổng thể trước khi bất kỳ yếu tố nào khác có cơ hội nói chuyện.
          </p>
        </div>

        <p>
          Ánh sáng vàng ấm của golden hour gợi lên hoài niệm và ấm áp không phải vì &ldquo;màu đẹp&rdquo; — mà vì nó kích hoạt hệ thống liên tưởng sâu nhất của não người với sự nghỉ ngơi, an toàn, và kết thúc của một ngày. Ánh sáng xanh lam lạnh của blue hour gợi lên sự bí ẩn vì nó liên kết với thế giới khi con người đã về nhà. Người nhiếp ảnh đỉnh cao không chụp trong &ldquo;ánh sáng đẹp&rdquo; — họ chụp trong <span className="key-concept">ánh sáng đúng</span>. Đúng có nghĩa là phục vụ chính xác cho atmosphere của câu chuyện đang được kể.
        </p>

        <hr className="doc-divider" />

        {/* 2.2 */}
        <h3 id="sec-2-2" className="scroll-mt-20">
          2. Màu sắc và Tương phản màu — Ngôn ngữ cảm xúc trực tiếp
        </h3>

        <p>
          Palette màu sắc thiết lập tầng cảm xúc thứ hai ngay sau ánh sáng. Cùng một cảnh, cùng một ánh sáng, nhưng với color grading ấm monochromatic so với lạnh desaturated: hai bức ảnh hoàn toàn khác nhau về atmosphere. Điều quan trọng không phải là màu nào &ldquo;đẹp nhất&rdquo; — mà là màu nào phù hợp nhất với câu chuyện.
        </p>

        <p>
          Tương phản màu sắc kiến trúc <span className="key-concept">visual hierarchy</span> — quyết định mắt người xem nhìn vào đâu trước và đâu sau. Khi hệ thống tương phản màu sắc nhất quán với atmosphere tổng thể, người xem không ý thức được điều đó — họ chỉ cảm nhận rằng hình ảnh &ldquo;đúng&rdquo;. Khi tương phản màu sắc mâu thuẫn với atmosphere mong muốn, người xem cảm nhận được sự không nhất quán dù không thể giải thích tại sao.
        </p>

        <hr className="doc-divider" />

        {/* 2.3 */}
        <h3 id="sec-2-3" className="scroll-mt-20">
          3. Không gian và Tỷ lệ — Cảm giác về vị trí và quy mô
        </h3>

        <p>
          Cách không gian được phân chia trong khung hình và tỷ lệ kích thước giữa các yếu tố tạo ra cảm giác về vị trí của người xem trong không gian đó. Negative space rộng lớn mời người xem bước vào và chiếm lĩnh không gian bằng cảm xúc của mình. Khung hình dày đặc đầy chi tiết không cho phép người xem &ldquo;thở&rdquo; — tạo ra cảm giác áp đảo hoặc ngột ngạt có chủ đích.
        </p>

        <p>
          Tỷ lệ con người với cảnh quan — nhỏ bé hay lớn lao — tạo ra câu chuyện về sức mạnh, khiêm tốn, hay cô đơn. Góc chụp quyết định vị trí của người xem so với chủ thể về mặt quyền lực và kết nối cảm xúc. <span className="key-concept">Atmosphere của sự hùng vĩ</span> đòi hỏi con người nhỏ bé trong không gian rộng lớn; <span className="key-concept">atmosphere của sự thân mật</span> đòi hỏi chủ thể lấp đầy khung hình và xóa bỏ khoảng cách.
        </p>

        <hr className="doc-divider" />

        {/* 2.4 */}
        <h3 id="sec-2-4" className="scroll-mt-20">
          4. Đường nét, Hình dạng và Texture — Nhịp điệu và chiều sâu cảm giác
        </h3>

        <p>
          Hệ thống đường nét tạo ra nhịp điệu cảm xúc — giống như nhịp điệu trong âm nhạc định hình cảm giác của người nghe trước khi giai điệu bắt đầu. Khi hệ thống đường nét nhất quán với cảm xúc tổng thể của hình ảnh, người xem không ý thức được — họ chỉ cảm thấy hình ảnh &ldquo;đúng&rdquo;.
        </p>

        <p>
          Texture đóng góp vào atmosphere bằng cách kết nối hình ảnh với trải nghiệm vật lý của người xem thông qua ký ức xúc giác. Hình ảnh có texture phong phú và được ánh sáng phù hợp tạo ra cảm giác &ldquo;có thể chạm vào được&rdquo; — người xem không chỉ nhìn thấy cảnh mà cảm thấy họ đang ở trong đó. Texture thô ráp của đá cổ và gỗ cũ mang theo toàn bộ trọng lượng của thời gian. Texture mịn của sương mù tạo ra sự huyền ảo và xa cách.
        </p>

        {/* ============================================================ */}
        {/*  SECTION III                                                  */}
        {/* ============================================================ */}
        <h2 id="sec-3" className="scroll-mt-20">
          <span className="section-num">Ⅲ</span>
          Các yếu tố phi thị giác tạo nên Atmosphere
        </h2>

        <div className="callout callout-brain">
          <div className="callout-title">
            <Brain size={13} className="inline mr-1" />
            Yếu tố vô hình nhưng quyết định
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Đây là phần quan trọng nhất và ít được dạy nhất: atmosphere không chỉ đến từ các nguyên lý thị giác. Nó đến từ những yếu tố không nhìn thấy được — nhưng được cảm nhận sâu sắc qua hình ảnh.
          </p>
        </div>

        <hr className="doc-divider" />

        {/* 3.1 */}
        <h3 id="sec-3-1" className="scroll-mt-20">
          1. Sự hiện diện của người chụp — Camera ghi lại thái độ
        </h3>

        <p>
          Đây là sự thật mà ít giáo trình nhiếp ảnh nào nói thẳng: camera ghi lại không chỉ ánh sáng và hình dạng — nó ghi lại thái độ của người chụp đối với chủ thể. Khi người chụp tôn trọng và kết nối thực sự với chủ thể, hình ảnh mang theo năng lượng đó. Khi người chụp khai thác chủ thể như một &ldquo;đối tượng&rdquo; thú vị, hình ảnh cũng mang theo năng lượng đó — và người xem nhạy cảm cảm nhận được sự khác biệt dù không thể giải thích tại sao.
        </p>

        <p>
          Sebastião Salgado sống cùng cộng đồng ông chụp trong nhiều tháng trước khi lấy máy ảnh ra. Dorothea Lange dừng xe, đi bộ trở lại bảy lần và hỏi thăm Florence Owens Thompson trước khi chụp &ldquo;Migrant Mother&rdquo;. Daido Moriyama đi bộ hàng chục km mỗi ngày trong nhiều thập kỷ để trở thành một phần không thể tách rời của đường phố Tokyo ông chụp. Tất cả đều hiểu rằng <span className="key-concept">chất lượng của mối quan hệ giữa người chụp và chủ thể</span> là thành phần vô hình nhưng quyết định của atmosphere.
        </p>

        <hr className="doc-divider" />

        {/* 3.2 */}
        <h3 id="sec-3-2" className="scroll-mt-20">
          2. Thời gian và sự kiên nhẫn — Atmosphere không thể vội vã
        </h3>

        <p>
          Nhiều nhiếp ảnh gia vĩ đại nhất mô tả quá trình làm việc của họ bằng một từ không ai nghĩ đến khi học nhiếp ảnh: kiên nhẫn. Michael Kenna đặt máy ảnh và chờ đợi trong nhiều giờ cho đến khi ánh sáng, sương mù, và không gian hội tụ thành đúng khoảnh khắc. Hiroshi Sugimoto thực hiện long exposure kéo dài cả buổi chiếu phim trong rạp — toàn bộ phim trở thành một vệt sáng trắng duy nhất trên màn hình. Việc chờ đợi không phải là thụ động — đó là hành động của sự tôn trọng đối với khoảnh khắc.
        </p>

        <p>
          Sự vội vã tạo ra hình ảnh. Sự kiên nhẫn tạo ra atmosphere. Không phải vì kiên nhẫn là đức tính tốt — mà vì chỉ khi bạn ở trong một không gian đủ lâu, bạn mới thực sự nhìn thấy nó. Những gì bạn thấy trong 30 giây đầu là những gì bất kỳ ai cũng thấy. <span className="key-concept">Những gì bạn thấy sau 30 phút là những gì chỉ người kiên nhẫn mới thấy được.</span>
        </p>

        <hr className="doc-divider" />

        {/* 3.3 */}
        <h3 id="sec-3-3" className="scroll-mt-20">
          3. Khoảnh khắc quyết định — Thời gian như chiều kích thị giác
        </h3>

        <div className="callout callout-photo">
          <div className="callout-title">
            <Camera size={13} className="inline mr-1" />
            Case Study: Henri Cartier-Bresson và &ldquo;Khoảnh khắc quyết định&rdquo;
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Henri Cartier-Bresson đề xuất khái niệm &ldquo;khoảnh khắc quyết định&rdquo; (decisive moment) — nhưng ít người hiểu đúng. Ông không chỉ nói về khoảnh khắc hành động đạt đỉnh điểm. Ông nói về khoảnh khắc mà tất cả các yếu tố thị giác và cảm xúc cùng hội tụ trong một sự hoàn chỉnh không thể lặp lại — và điều đó có thể xảy ra trong cả những khoảnh khắc rất tĩnh lặng.
          </p>
        </div>

        <p>
          Khoảnh khắc quyết định trong ảnh phong cảnh có thể là khi ánh sáng thay đổi trong 30 giây từ bình thường thành phi thường. Trong ảnh chân dung, nó có thể là khoảng lặng giữa hai nụ cười khi chủ thể trở về với chính mình. Trong street photography, nó có thể là sự hội tụ ngẫu nhiên tạo thành một hình học hoàn hảo trong một phần giây. Nhận ra khoảnh khắc đó đòi hỏi hai thứ: đủ kiến thức về ngôn ngữ thị giác để nhận ra khi tất cả các yếu tố đúng — và đủ hiện diện tâm lý để không bỏ lỡ nó.
        </p>

        <hr className="doc-divider" />

        {/* 3.4 */}
        <h3 id="sec-3-4" className="scroll-mt-20">
          4. Mối quan hệ với chủ thể — Ai đang được chụp và tại sao
        </h3>

        <p>
          Atmosphere cũng đến từ bản thân chủ thể và lý do người chụp bị thu hút. Khi người chụp thực sự bị xúc động, tò mò, hay ám ảnh bởi điều gì đó — hình ảnh mang theo năng lượng đó. Khi người chụp chụp &ldquo;vì cảnh đẹp&rdquo; mà không có kết nối thực sự với chủ thể, hình ảnh cũng mang theo sự thiếu kết nối đó.
        </p>

        <p>
          Gary Winogrand nói ông chụp ảnh để &ldquo;xem vật thể trông như thế nào khi được chụp ảnh&rdquo; — một mức độ tò mò thuần túy và không vụ lợi hiếm gặp. Vivian Maier chụp ảnh trong suốt 40 năm mà không bao giờ in hay triển lãm — vì với bà, hành động chụp ảnh chính là mục đích, không phải kết quả. Đây là những ví dụ cực đoan — nhưng chúng chỉ ra rằng <span className="key-concept">mối quan hệ nội tâm của người chụp với hành động nhiếp ảnh</span> là một phần không thể tách rời của atmosphere.
        </p>

        {/* ============================================================ */}
        {/*  SECTION IV                                                   */}
        {/* ============================================================ */}
        <h2 id="sec-4" className="scroll-mt-20">
          <span className="section-num">Ⅳ</span>
          Atmosphere trong các thể loại nhiếp ảnh
        </h2>

        <div className="comparison-grid my-4">
          <div className="comp-card">
            <span className="sub-label" style={{ color: '#7c8aff', background: 'rgba(124,138,255,0.1)' }}>FINE ART</span>
            <h4>Atmosphere như tuyên ngôn triết học</h4>
            <p>
              Nhiếp ảnh gia fine art xây dựng toàn bộ tác phẩm xung quanh một trạng thái cảm xúc hoặc triết học cụ thể, và mọi quyết định kỹ thuật phục vụ cho tuyên ngôn đó.
            </p>
          </div>
          <div className="comp-card" style={{ borderColor: '#22c55e44' }}>
            <span className="sub-label" style={{ color: '#22c55e', background: 'rgba(34,197,94,0.1)' }}>DOCUMENTARY</span>
            <h4>Atmosphere của sự thật sống</h4>
            <p>
              Atmosphere không được &ldquo;thiết kế&rdquo; — nó được nhận ra và ghi lại. Đòi hỏi khả năng cảm nhận khi một cảnh đang tự tạo ra ngôn ngữ thị giác của chính nó.
            </p>
          </div>
          <div className="comp-card" style={{ borderColor: '#ffcb6b44' }}>
            <span className="sub-label" style={{ color: '#ffcb6b', background: 'rgba(255,203,107,0.1)' }}>PORTRAIT</span>
            <h4>Atmosphere của kết nối người–người</h4>
            <p>
              Atmosphere đến từ chất lượng của mối quan hệ giữa người chụp và người được chụp — và không thể giả vờ. Khi người được chụp tin tưởng hoàn toàn, khoảnh khắc mang theo atmosphere không thể tạo ra bằng kỹ thuật.
            </p>
          </div>
          <div className="comp-card" style={{ borderColor: '#a855f744' }}>
            <span className="sub-label" style={{ color: '#a855f7', background: 'rgba(168,85,247,0.1)' }}>STREET</span>
            <h4>Atmosphere của cuộc sống đang diễn ra</h4>
            <p>
              Street photography tốt nhất ghi lại atmosphere của một thời điểm cụ thể trong lịch sử đô thị — không thể lên kế hoạch, chỉ có thể nhận ra và bắt kịp.
            </p>
          </div>
        </div>

        <hr className="doc-divider" />

        {/* 4.1 */}
        <h3 id="sec-4-1" className="scroll-mt-20">
          1. Fine Art Photography — Atmosphere như tuyên ngôn triết học
        </h3>

        <p>
          Trong fine art photography, atmosphere thường không phải là hệ quả — nó là tuyên ngôn. Nhiếp ảnh gia fine art xây dựng toàn bộ tác phẩm xung quanh một trạng thái cảm xúc hoặc triết học cụ thể, và mọi quyết định kỹ thuật phục vụ cho tuyên ngôn đó.
        </p>

        <p>
          Michael Kenna xây dựng atmosphere của sự tĩnh lặng siêu thực qua: long exposure xóa mọi chuyển động, tông ảnh đơn sắc loại bỏ sự phân tâm của màu sắc, negative space rộng lớn mời người xem điền vào bằng ký ức cá nhân, và đặc biệt là chụp trong điều kiện đặc biệt (sương mù, tuyết, bình minh) mà phần lớn người khác đã về nhà. Hiroshi Sugimoto xây dựng atmosphere của thời gian và vô thường qua: long exposure nén toàn bộ thời gian thành một khoảnh khắc duy nhất, cấu trúc hình học tối giản loại bỏ mọi yếu tố tự sự.
        </p>

        <hr className="doc-divider" />

        {/* 4.2 */}
        <h3 id="sec-4-2" className="scroll-mt-20">
          2. Documentary Photography — Atmosphere của sự thật sống
        </h3>

        <p>
          Trong nhiếp ảnh tư liệu, atmosphere không được &ldquo;thiết kế&rdquo; — nó được nhận ra và ghi lại. Điều này đòi hỏi một loại nhạy cảm đặc biệt: khả năng cảm nhận khi một cảnh đang tự tạo ra ngôn ngữ thị giác của chính nó — khi ánh sáng, không gian, và khoảnh khắc hội tụ để tạo ra điều gì đó vượt khỏi sự ghi lại đơn thuần.
        </p>

        <p>
          Eugène Atget chụp Paris từ 1898 đến 1927 — không phải để ghi lại lịch sử, mà vì ông bị ám ảnh bởi sự im lặng của thành phố lúc bình minh, trước khi con người thức dậy. Atmosphere của những bức ảnh đó — đường phố trống, ánh sáng sớm, thời gian như bị đóng băng — là sản phẩm của một mối quan hệ sâu sắc và lâu dài giữa người chụp và không gian ông sống trong đó suốt gần ba mươi năm.
        </p>

        <hr className="doc-divider" />

        {/* 4.3 */}
        <h3 id="sec-4-3" className="scroll-mt-20">
          3. Portrait Photography — Atmosphere của kết nối người–người
        </h3>

        <p>
          Trong portrait, atmosphere đến từ chất lượng của mối quan hệ giữa người chụp và người được chụp — và không thể giả vờ. Khi người được chụp tin tưởng người chụp hoàn toàn, khi họ quên mất máy ảnh và trở về với chính họ — những khoảnh khắc đó mang theo một loại atmosphere không thể tạo ra bằng kỹ thuật hay đạo diễn.
        </p>

        <p>
          Richard Avedon mất nhiều giờ, đôi khi nhiều ngày, để xây dựng mối quan hệ với chủ thể trước khi bấm máy. Seydou Keïta chụp chân dung ở Bamako, Mali từ 1948 đến 1977 như một thợ ảnh thương mại địa phương — nhưng atmosphere của những bức ảnh đó (phẩm giá, vui mừng, và sự hiện diện hoàn toàn của chủ thể) vượt xa phần lớn portrait studio đương đại. Lý do: Keïta quan tâm thực sự đến mỗi người ngồi trước ống kính của ông.
        </p>

        <hr className="doc-divider" />

        {/* 4.4 */}
        <h3 id="sec-4-4" className="scroll-mt-20">
          4. Street Photography — Atmosphere của cuộc sống đang diễn ra
        </h3>

        <p>
          Street photography tốt nhất không phải là ảnh ghi lại &ldquo;những điều thú vị trên đường phố&rdquo; — nó là ảnh ghi lại atmosphere của một thời điểm cụ thể trong lịch sử đô thị. Brassaï ghi lại Paris ban đêm thập niên 1930 — không phải như báo cáo địa lý mà như hành trình vào thế giới bóng tối của thành phố. Vivian Maier bị thu hút không thể cưỡng lại bởi những khoảnh khắc con người tự bộc lộ trong không gian công cộng — và chụp suốt 40 năm không phải vì sứ mệnh tư liệu mà vì đó là cách bà hiểu thế giới.
        </p>

        <p>
          Atmosphere trong street photography không thể lên kế hoạch — nó đến từ sự kết hợp của: kiến thức đủ sâu về ngôn ngữ thị giác để nhận ra khi các yếu tố hội tụ đúng, tốc độ phản xạ để bắt kịp khoảnh khắc, và sự hiện diện tâm lý đủ để không bỏ lỡ nó trong khi đang nghĩ về điều khác.
        </p>

        {/* ============================================================ */}
        {/*  SECTION V                                                    */}
        {/* ============================================================ */}
        <h2 id="sec-5" className="scroll-mt-20">
          <span className="section-num">Ⅴ</span>
          Từ nguyên lý đến bản năng — Hành trình nội hóa
        </h2>

        <hr className="doc-divider" />

        {/* 5.1 */}
        <h3 id="sec-5-1" className="scroll-mt-20">
          1. Ba giai đoạn phát triển nhãn quan
        </h3>

        <p>
          Chín bài học về Nguyên lý thị giác (Bài 4–12) đã trang bị cho bạn một hệ thống ngôn ngữ đầy đủ. Nhưng mục tiêu cuối cùng không phải là biết ngôn ngữ đó — mà là nội hóa nó đến mức nó trở thành một phần của cách bạn nhìn thế giới, không phải cách bạn phân tích hình ảnh.
        </p>

        <div className="comparison-grid my-4">
          <div className="comp-card">
            <span className="sub-label" style={{ color: '#ffcb6b', background: 'rgba(255,203,107,0.1)' }}>GIAI ĐOẠN 1</span>
            <h4>Nhận thức có ý thức (Conscious Competence)</h4>
            <p>
              Bạn nhìn vào một cảnh và phân tích từng bước: &ldquo;Đường nét ở đây tạo ra cảm giác gì? Ánh sáng đến từ đâu? Tỷ lệ negative space là bao nhiêu? Màu sắc tạo ra tương phản gì?&rdquo; Quá trình này chậm, đôi khi gượng gạo — nhưng hoàn toàn cần thiết. Đây là giai đoạn đọc ngữ pháp trước khi viết câu.
            </p>
          </div>
          <div className="comp-card" style={{ borderColor: '#7c8aff44' }}>
            <span className="sub-label" style={{ color: '#7c8aff', background: 'rgba(124,138,255,0.1)' }}>GIAI ĐOẠN 2</span>
            <h4>Nhận thức bán tự động (Unconscious Processing)</h4>
            <p>
              Các nguyên lý bắt đầu hoạt động ở tầng bán ý thức. Bạn cảm thấy &ldquo;có gì đó không đúng&rdquo; trước khi phân tích được là gì. Bạn di chuyển một bước sang trái một cách bản năng — và chỉ sau đó nhận ra rằng bước đó đã cải thiện leading line. Instinct đang được xây dựng trên nền tảng của kiến thức.
            </p>
          </div>
          <div className="comp-card" style={{ borderColor: '#22c55e44' }}>
            <span className="sub-label" style={{ color: '#22c55e', background: 'rgba(34,197,94,0.1)' }}>GIAI ĐOẠN 3</span>
            <h4>Bản năng thuần túy (Intuitive Mastery)</h4>
            <p>
              Bạn thấy, bạn cảm, bạn bấm. Không có bước phân tích nào ở giữa. Các nguyên lý đã trở thành một phần của cách bạn nhìn thế giới — không phải cách bạn nhìn hình ảnh. Ở giai đoạn này, người ta thường nói về &ldquo;nhãn quan&rdquo; hay &ldquo;mắt nghệ thuật&rdquo; như thể đó là bẩm sinh — nhưng không ai đến đây mà không qua Giai đoạn 1 và 2.
            </p>
          </div>
        </div>

        <hr className="doc-divider" />

        {/* 5.2 */}
        <h3 id="sec-5-2" className="scroll-mt-20">
          2. Không có đường tắt — Và tại sao điều đó là tin tốt
        </h3>

        <p>
          Khoảng cách giữa người mới và bậc thầy không phải là lượng kiến thức — mà là độ sâu mà kiến thức đó đã được nội hóa thành bản năng. Và không có đường tắt cho quá trình nội hóa này. Nó đòi hỏi thời gian, thực hành có ý thức, và quan trọng nhất — sự sẵn sàng nhìn thật kỹ vào hàng nghìn hình ảnh (của người khác và của chính mình) và tự hỏi tại sao.
        </p>

        <p>
          &ldquo;Tại sao bức ảnh này khiến tôi xúc động?&rdquo; là câu hỏi quan trọng hơn &ldquo;Bức ảnh này được chụp như thế nào?&rdquo; Câu hỏi đầu dẫn đến sự hiểu biết về ngôn ngữ thị giác. Câu hỏi sau chỉ dẫn đến thông tin kỹ thuật. Và đây thực ra là tin tốt: vì không có đường tắt, không ai có thể &ldquo;mua&rdquo; được nhãn quan bằng thiết bị đắt tiền hay khóa học nhanh. <span className="key-concept">Nhãn quan phát triển qua thời gian — và thời gian là thứ ai cũng có thể đầu tư.</span>
        </p>

        <hr className="doc-divider" />

        {/* 5.3 */}
        <h3 id="sec-5-3" className="scroll-mt-20">
          3. Visual voice — Tiếng nói thị giác cá nhân
        </h3>

        <div className="callout callout-key">
          <div className="callout-title">
            <Lightbulb size={13} className="inline mr-1" />
            Visual voice — Tiếng nói thị giác cá nhân
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Visual voice — tiếng nói thị giác cá nhân — là tập hợp nhất quán của các lựa chọn thẩm mỹ và cảm xúc mà người xem có thể nhận ra là của bạn, dù không thấy tên. Nó không phải là preset màu hay phong cách kỹ thuật — nó là cách bạn nhìn thế giới, những câu hỏi bạn liên tục đặt ra qua hình ảnh, và những khoảnh khắc bạn bị thu hút không thể cưỡng lại.
          </p>
        </div>

        <p>
          Visual voice không thể được quyết định hay thiết kế — nó phát triển tự nhiên qua nhiều năm thực hành thành thật. Người duy nhất có thể phát triển visual voice của bạn là bạn — thông qua việc liên tục chụp những gì thực sự khiến bạn xúc động, phân tích tại sao bạn bị thu hút bởi những thứ đó, và dần dần nhận ra những pattern lặp đi lặp lại trong cách bạn nhìn thế giới.
        </p>

        {/* ============================================================ */}
        {/*  SECTION VI                                                   */}
        {/* ============================================================ */}
        <h2 id="sec-6" className="scroll-mt-20">
          <span className="section-num">Ⅵ</span>
          Ứng dụng thực hành — Phát triển nhãn quan atmosphere
        </h2>

        <hr className="doc-divider" />

        {/* 6.1 */}
        <h3 id="sec-6-1" className="scroll-mt-20">
          1. Bài tập &ldquo;Chụp cảm xúc, không chụp chủ thể&rdquo;
        </h3>

        <div className="callout callout-photo">
          <div className="callout-title">
            <Camera size={13} className="inline mr-1" />
            Bài tập đảo ngược tư duy
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Đây là bài tập đảo ngược tư duy căn bản nhất: thay vì tìm chủ thể để chụp, tìm cảm xúc để ghi lại. Trước khi ra ngoài, xác định một cảm xúc cụ thể bạn muốn tạo ra trong hình ảnh: &ldquo;Tôi muốn tạo ra cảm giác của sự chờ đợi&rdquo; hay &ldquo;Tôi muốn ghi lại cảm giác của sự kết thúc một ngày&rdquo;. Sau đó ra ngoài và tìm bất kỳ chủ thể nào — người, nơi chốn, vật thể — có thể phục vụ cho cảm xúc đó.
          </p>
        </div>

        <p>
          Bài tập này đảo ngược thói quen thông thường của người mới học (tìm cảnh đẹp rồi chụp) và thay thế bằng tư duy mục đích (tìm cảm xúc đúng rồi tìm ngôn ngữ thị giác phù hợp). Đây là tư duy của người chụp ảnh có narrative.
        </p>

        <hr className="doc-divider" />

        {/* 6.2 */}
        <h3 id="sec-6-2" className="scroll-mt-20">
          2. Bài tập &ldquo;Chụp cùng một nơi qua thời gian&rdquo;
        </h3>

        <p>
          Chọn một địa điểm quen thuộc — có thể là góc phố gần nhà, một công viên, hay một không gian trong nhà. Chụp địa điểm đó mỗi tuần trong ba tháng — ở nhiều thời điểm khác nhau trong ngày, nhiều điều kiện thời tiết khác nhau, nhiều trạng thái cảm xúc khác nhau của bạn.
        </p>

        <p>
          Sau ba tháng, nhìn lại toàn bộ series: khi nào hình ảnh có atmosphere mạnh nhất? Điều gì tạo ra sự khác biệt — ánh sáng, thời điểm, trạng thái cảm xúc của bạn, hay sự kiên nhẫn? Đây là bài tập dạy bạn về mối quan hệ giữa thời gian, sự kiên nhẫn, và atmosphere mà không bài học lý thuyết nào có thể thay thế.
        </p>

        <hr className="doc-divider" />

        {/* 6.3 */}
        <h3 id="sec-6-3" className="scroll-mt-20">
          3. Bài tập &ldquo;Giải phẫu atmosphere&rdquo; của bậc thầy
        </h3>

        <p>
          Chọn 5 bức ảnh có atmosphere mạnh nhất mà bạn từng thấy — từ các nhiếp ảnh gia khác nhau, thể loại khác nhau. Với mỗi bức, viết một phân tích ngắn theo cấu trúc:
        </p>

        <ul className="factor-list">
          <li>
            <strong>(1) Mô tả atmosphere tổng thể bằng ngôn ngữ cảm xúc</strong> — không phải ngôn ngữ kỹ thuật.
          </li>
          <li>
            <strong>(2) Phân tích từng nguyên lý thị giác đang hoạt động</strong> và cách chúng cộng hưởng.
          </li>
          <li>
            <strong>(3) Xác định yếu tố phi thị giác nào có thể đóng vai trò</strong> (mối quan hệ người chụp–chủ thể, bối cảnh lịch sử).
          </li>
          <li>
            <strong>(4) Giải thích tại sao sự kết hợp đó tạo ra atmosphere đó.</strong>
          </li>
        </ul>

        <p>
          Sau 5 bức phân tích, bạn sẽ có một bản đồ cá nhân về cách atmosphere được tạo ra — không phải công thức chung, mà là sự hiểu biết sâu sắc về cơ chế tổng hợp của ngôn ngữ thị giác.
        </p>

        <hr className="doc-divider" />

        {/* 6.4 */}
        <h3 id="sec-6-4" className="scroll-mt-20">
          4. Bài tập cuối chương — Một series có atmosphere nhất quán
        </h3>

        <p>
          Đây là bài tập tổng hợp toàn bộ chương Nguyên lý thị giác: chụp một series gồm 10 bức ảnh về cùng một chủ đề hoặc cảm xúc, trong đó mọi quyết định kỹ thuật — ánh sáng, màu sắc, tỷ lệ, texture, đường nét — đều phục vụ cho một atmosphere duy nhất nhất quán xuyên suốt.
        </p>

        <p>
          Yêu cầu: không phải mọi ảnh đều phải giống nhau về kỹ thuật — chúng phải nhất quán về cảm xúc. Khi xem 10 bức ảnh cạnh nhau, người xem phải cảm nhận được rằng chúng thuộc về nhau, dù chủ thể có thể khác nhau. Đây là tiêu chuẩn của <span className="key-concept">visual voice thực sự</span> — và là đích đến của toàn bộ chương Nguyên lý thị giác.
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
              Atmosphere là tổng hòa cảm xúc — không phải phép cộng các nguyên lý. Nó nằm trong mối quan hệ giữa các yếu tố, không phải trong yếu tố đơn lẻ.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">02</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Stimmung: trạng thái khi người và bối cảnh cùng rung động trên một tần số cảm xúc — không thể sắp xếp, chỉ có thể nhận ra.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">03</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Atmosphere là hệ quả, không phải mục tiêu. Càng cố tạo ra, càng khó đạt được. Nó xuất hiện từ thực hành đúng.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">04</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Bốn yếu tố thị giác cốt lõi: ánh sáng (tâm trạng chủ đạo), màu sắc (ngôn ngữ cảm xúc), không gian/tỷ lệ (vị trí và quy mô), đường nét/texture (nhịp điệu và chiều sâu).
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">05</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Bốn yếu tố phi thị giác: sự hiện diện của người chụp, thời gian và kiên nhẫn, khoảnh khắc quyết định, mối quan hệ với chủ thể.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">06</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Ba giai đoạn nội hóa: nhận thức có ý thức → nhận thức bán tự động → bản năng thuần túy. Không có đường tắt.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">07</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Visual voice phát triển tự nhiên qua thực hành thành thật — không thể thiết kế hay quyết định.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">08</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Bốn thể loại, bốn cách tạo atmosphere: Fine Art (tuyên ngôn), Documentary (nhận ra), Portrait (kết nối), Street (sự sống đang diễn ra).
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
              Atmosphere không thể được <em>thiết kế</em> — nó chỉ có thể được <strong>thu vào</strong>. Nếu bạn đến một địa điểm và cố tạo atmosphere, bạn sẽ tạo ra sản phẩm giả tạo mà người xem cảm nhận được ngay lập tức. Nếu bạn đến với sự hiện diện thực sự — không vội vàng, không kế hoạch cứng nhắc, không ego — atmosphere sẽ tự xuất hiện. Đây là bài học cuối cùng, và là bài học không thể dạy qua kỹ thuật: <em>học cách biến mất vào khoảnh khắc</em>.
            </p>
          </div>
          <div className="callout callout-pitfall">
            <div className="callout-title">⚠ Bẫy chuyên gia</div>
            <p style={{ marginBottom: 0, lineHeight: 1.75 }}>
              Nghĩ rằng <strong>post-processing filter hay preset là atmosphere</strong>. Atmosphere có mặt TRƯỚC khi shutter được bấm — nó là sự kết hợp của ánh sáng, không gian, thời gian, sự hiện diện của người chụp và trạng thái tinh thần. "Cinematic look" trong Lightroom là hình thức, không phải bầu không khí. Người xem phân biệt được ngay: một ảnh có atmospheric filter trông giống ảnh có atmosphere thực sự như bản nhạc karaoke giống buổi biểu diễn sống.
            </p>
          </div>
          <div className="practice-exercise">
            <div className="practice-header">⬥ Bài tập thực chiến — Stimmung · Ba thời khắc</div>
            <div className="practice-body">
              <p>Bài tập cuối cùng trong bộ 19 bài — tổng hợp toàn bộ ngôn ngữ thị giác:</p>
              <ol className="practice-steps">
                <li><strong>Chọn MỘT địa điểm</strong> quen thuộc mà bạn biết rõ: góc phố, khoảng sân, cửa sổ quen. Không cần đi xa.</li>
                <li><strong>Đến 3 lần:</strong> Sáng sớm (trước 7am), giữa trưa, tối muộn (sau 9pm). Cùng thiết bị, cùng góc nhìn ban đầu.</li>
                <li><strong>Không cố chụp "ảnh đẹp":</strong> Chỉ đến, ngồi xuống, nhìn 15 phút trước khi chạm vào máy. Để địa điểm nói chuyện với bạn.</li>
                <li><strong>Mô tả Stimmung:</strong> Với mỗi bộ ảnh, dùng đúng 3 từ để mô tả bầu không khí. Sau đó hỏi: 18 bài học trước đó đã hiện diện như thế nào trong những tấm ảnh này?</li>
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
            <div className="nav-card-desc">Chất liệu &amp; Tỷ lệ</div>
          </Link>
          <Link href="/bo-cuc" className="group nav-card text-right">
            <div className="nav-card-label">Bài tiếp →</div>
            <div className="nav-card-title">12. Bố cục</div>
            <div className="nav-card-desc">Bố cục &amp; Góc nhìn</div>
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
              <p className="font-semibold text-[#9d9db5] mb-2">Bố cục &amp; Góc nhìn</p>
              <a href="/bo-cuc" className="block hover:text-[#7c8aff] transition-colors">Bố cục</a>
              <a href="/goc-chup" className="block hover:text-[#7c8aff] transition-colors">Góc chụp</a>
              <a href="/tieu-diem" className="block hover:text-[#7c8aff] transition-colors">Tiêu điểm &amp; Độ sâu</a>
            </div>
            <div>
              <p className="font-semibold text-[#9d9db5] mb-2">Nguyên lý vận hành</p>
              <a href="/can-bang" className="block hover:text-[#7c8aff] transition-colors">Cân bằng thị giác</a>
              <a href="/phan-cap" className="block hover:text-[#7c8aff] transition-colors">Phân cấp &amp; Điểm nhấn</a>
              <a href="/tinh-thong-nhat" className="block hover:text-[#7c8aff] transition-colors">Tính Thống Nhất</a>
            </div>
          </div>
        </div>
      </article>
    </DocsLayout>
  );
}

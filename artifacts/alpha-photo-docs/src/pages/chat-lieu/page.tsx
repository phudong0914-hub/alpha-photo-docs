

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
  Layers,
  Sun,
  Sparkles,
  BookOpen,
  Check,
  Gem,
  Hand,
  Droplets,
  Mountain,
  TreePine,
  Grid3X3,
  SlidersHorizontal,
  Aperture,
} from 'lucide-react';
import DocsLayout from '@/components/docs-layout';

/* ------------------------------------------------------------------ */
/*  TOC Data                                                          */
/* ------------------------------------------------------------------ */
const tocSections = [
  { id: 'sec-1', label: 'Ⅰ. Chất liệu là gì', level: 1 },
  { id: 'sec-1-1', label: '1. Chất liệu thị giác (Visual Texture)', level: 2 },
  { id: 'sec-1-2', label: '2. Chất liệu xúc giác (Tactile Texture)', level: 2 },
  { id: 'sec-1-3', label: '3. Vai trò của ánh sáng trong việc hiển lộ chất liệu', level: 2 },
  { id: 'sec-2', label: 'Ⅱ. Các loại chất liệu', level: 1 },
  { id: 'sec-2-1', label: '1. Nhẵn và thô ráp', level: 2 },
  { id: 'sec-2-2', label: '2. Bóng và mờ', level: 2 },
  { id: 'sec-2-3', label: '3. Mềm và cứng', level: 2 },
  { id: 'sec-2-4', label: '4. Hữu cơ và hình học', level: 2 },
  { id: 'sec-3', label: 'Ⅲ. Chất liệu và ánh sáng', level: 1 },
  { id: 'sec-3-1', label: '1. Ánh sáng bên (Side Lighting)', level: 2 },
  { id: 'sec-3-2', label: '2. Ánh sáng chính diện (Front Lighting)', level: 2 },
  { id: 'sec-3-3', label: '3. Ánh sáng rạch (Raking Light)', level: 2 },
  { id: 'sec-3-4', label: '4. Ánh sáng khuếch tán (Diffused Light)', level: 2 },
  { id: 'sec-4', label: 'Ⅳ. Chất liệu như yếu tố sáng tác', level: 1 },
  { id: 'sec-4-1', label: '1. Tương phản chất liệu', level: 2 },
  { id: 'sec-4-2', label: '2. Chất liệu như pattern', level: 2 },
  { id: 'sec-4-3', label: '3. Chất liệu và cảm xúc', level: 2 },
  { id: 'sec-4-4', label: '4. Macro photography và chất liệu', level: 2 },
  { id: 'sec-4-5', label: '5. Shallow DOF cô lập chất liệu', level: 2 },
  { id: 'sec-5', label: 'Ⅴ. Hậu kỳ chất liệu', level: 1 },
  { id: 'sec-5-1', label: '1. Sharpening cho chất liệu', level: 2 },
  { id: 'sec-5-2', label: '2. Clarity slider', level: 2 },
  { id: 'sec-5-3', label: '3. Texture slider trong Lightroom', level: 2 },
  { id: 'sec-5-4', label: '4. Thêm grain/film texture', level: 2 },
  { id: 'summary', label: 'Tóm tắt 7 điểm chính', level: 1 },
];

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */
export default function ChatLieuPage() {
  const [isRead, setIsRead] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('alpha-doc-read');
      if (saved) {
        const readPages: string[] = JSON.parse(saved);
        if (readPages.includes('/chat-lieu')) setIsRead(true);
      }
    } catch {}
  }, []);

  const toggleRead = () => {
    try {
      const saved = localStorage.getItem('alpha-doc-read');
      const readPages: string[] = saved ? JSON.parse(saved) : [];
      if (isRead) {
        const updated = readPages.filter((p) => p !== '/chat-lieu');
        localStorage.setItem('alpha-doc-read', JSON.stringify(updated));
        setIsRead(false);
      } else {
        const updated = [...readPages, '/chat-lieu'];
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
          <span className="text-[#9d9db5]">Chất liệu bề mặt</span>
        </div>

        {/* Badges */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold font-mono px-2 py-0.5 rounded bg-[rgba(34,197,94,0.1)] text-emerald-400">
            HA10
          </span>
          <span className="text-[11px] text-[#6b6b80]">15 phút đọc · #ChatLieu #Texture #Surface #BieuCamThiGiac</span>
          <span className="elite-badge" style={{ background: 'rgba(34,197,94,0.1)', color: '#22c55e' }}>
            <BookOpen size={11} />
            Cơ bản
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-[#e4e4ed] leading-tight mb-3 border-none pb-0">
          Chất liệu bề mặt
        </h1>

        {/* Subtitle */}
        <p className="text-base text-[#9d9db5] leading-relaxed mb-6" style={{ marginTop: 0 }}>
          Chất liệu & Tỷ lệ · Bài 10 — Chất liệu là làn da của hình ảnh — nó khiến người xem muốn chạm vào bức ảnh
        </p>

        {/* Hero image */}
        <div className="color-overview-hero rounded-xl overflow-hidden border border-[#1e1e2a] mb-8">
          <img
            src="/hero-chat-lieu.png"
            alt="Infographic tổng quan về chất liệu bề mặt trong nhiếp ảnh: visual texture, tactile texture, ánh sáng, các loại chất liệu và hậu kỳ"
            className="w-full h-auto object-contain"
            loading="eager"
          />
        </div>

        {/* Opening Quote */}
        <div className="quote-block">
          <p>
            &ldquo;Nhiếp ảnh là nghệ thuật duy nhất khiến người xem dùng mắt để chạm. Chất liệu là cầu nối giữa thị giác và xúc giác.&rdquo;
          </p>
        </div>

        <p className="drop-cap">
          Khi bạn nhìn thấy một bức ảnh vỏ cây sồi và ngón tay bạn tự động co lại như thể đang chạm vào bề mặt thô ráp đó — đó là sức mạnh của chất liệu trong nhiếp ảnh. Chất liệu (texture) là yếu tố thị giác duy nhất kích hoạt phản ứng xúc giác, tạo ra trải nghiệm đa giác quan trong một medium đơn giác quan. Nó là thứ biến bức ảnh từ cái nhìn thành trải nghiệm.
        </p>

        {/* ============================================================ */}
        {/*  SECTION I                                                    */}
        {/* ============================================================ */}
        <h2 id="sec-1" className="scroll-mt-20">
          <span className="section-num">Ⅰ</span>
          Chất liệu là gì
        </h2>

        <p>
          Chất liệu trong nhiếp ảnh có hai dạng: chất liệu thị giác (những gì bạn thấy) và chất liệu xúc giác (những gì bạn tưởng tượng mình chạm vào). Sự phân biệt này quan trọng vì nhiếp ảnh — một medium 2D — chỉ có thể trình bày chất liệu thị giác, nhưng sức mạnh thực sự nằm ở việc kích hoạt <span className="key-concept">trải nghiệm xúc giác</span> trong tâm trí người xem.
        </p>

        <hr className="doc-divider" />

        {/* 1.1 */}
        <h3 id="sec-1-1" className="scroll-mt-20">
          1. Chất liệu thị giác (Visual Texture) — Những gì mắt thấy
        </h3>

        <p>
          Visual texture là sự lặp lại của pattern nhỏ — những điểm, đường nét, và gradient tạo ra ảo giác về bề mặt. Trong nhiếp ảnh, visual texture được tạo ra bởi sự tương tác giữa ánh sáng và bề mặt vật thể: mỗi góc phản xạ, mỗi độ nhám, mỗi lớp sơn — tất cả đều tạo ra pattern riêng mà máy ảnh ghi nhận.
        </p>

        <p>
          Đặc điểm của visual texture trong nhiếp ảnh: nó không thể tách rời khỏi ánh sáng. Cùng một bề mặt, dưới ánh sáng khác nhau, sẽ cho ra visual texture hoàn toàn khác. Đây là lý do nhiếp ảnh gia luôn nói: &ldquo;Bạn không chụp chất liệu — bạn chụp ánh sáng trên chất liệu.&rdquo;
        </p>

        <hr className="doc-divider" />

        {/* 1.2 */}
        <h3 id="sec-1-2" className="scroll-mt-20">
          2. Chất liệu xúc giác (Tactile Texture) — Những gì tâm trí chạm
        </h3>

        <p>
          Tactile texture là <span className="key-concept">phản ứng xúc giác được kích hoạt bởi thị giác</span>. Khi bạn nhìn thấy ảnh lông thú và não bạn tự động &ldquo;cảm nhận&rdquo; độ mềm — đó là tactile texture. Nó dựa trên kinh nghiệm xúc giác tích lũy suốt đời: bạn đã chạm đủ nhiều bề mặt để não bộ tự động &ldquo;mô phỏng&rdquo; cảm giác khi nhìn thấy.
        </p>

        <div className="comparison-grid my-4">
          <div className="comp-card">
            <span className="sub-label">VISUAL TEXTURE</span>
            <h4>Chất liệu thị giác</h4>
            <p>
              Pattern, gradient, chi tiết bề mặt mà mắt ghi nhận. Khách quan hơn, đo lường được. Máy ảnh ghi nhận chính xác visual texture.
            </p>
          </div>
          <div className="comp-card" style={{ borderColor: '#a855f744' }}>
            <span className="sub-label" style={{ color: '#a855f7', background: 'rgba(168,85,247,0.1)' }}>TACTILE TEXTURE</span>
            <h4>Chất liệu xúc giác</h4>
            <p>
              Phản ứng xúc giác do thị giác kích hoạt. Chủ quan hơn, phụ thuộc kinh nghiệm người xem. Đây là mục tiêu thực sự của nhiếp ảnh chất liệu.
            </p>
          </div>
        </div>

        <hr className="doc-divider" />

        {/* 1.3 */}
        <h3 id="sec-1-3" className="scroll-mt-20">
          3. Vai trò của ánh sáng trong việc hiển lộ chất liệu
        </h3>

        <p>
          Ánh sáng không chỉ &ldquo;chiếu sáng&rdquo; chất liệu — nó <span className="key-concept">tạo ra</span> chất liệu trong nhiếp ảnh. Một bức tường gạch nhẵn dưới ánh sáng chính diện sẽ trông phẳng và vô hồn; cùng bức tường đó dưới ánh sáng bên sẽ hiện ra từng đường vân, từng khe mortar. Ánh sáng là bàn tay nhà điêu khắc đang nặn chất liệu từ bề mặt phẳng.
        </p>

        <div className="callout callout-key">
          <div className="callout-title">
            <Lightbulb size={13} className="inline mr-1" />
            Nguyên lý cơ bản
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Góc giữa ánh sáng và bề mặt quyết định mức độ chất liệu hiển lộ: góc càng nghiêng (raking light), bóng đổ càng dài, chất liệu càng rõ. Góc vuông (front light), bóng đổ tối thiểu, chất liệu bị san phẳng. Đây là lý do nhiếp ảnh gia kiến trúc luôn chụp building vào sớm mai hoặc chiều muộn — khi mặt trời tạo raking light dọc mặt tiền.
          </p>
        </div>

        {/* ============================================================ */}
        {/*  SECTION II                                                   */}
        {/* ============================================================ */}
        <h2 id="sec-2" className="scroll-mt-20">
          <span className="section-num">Ⅱ</span>
          Các loại chất liệu
        </h2>

        <p>
          Mỗi loại chất liệu mang một hệ thống liên tưởng cảm xúc riêng. Phân loại chất liệu không phải bài tập phân loại học — nó là bản đồ quyết định sáng tác: chọn chất liệu phù hợp = chọn đúng ngôn ngữ xúc giác.
        </p>

        <hr className="doc-divider" />

        {/* 2.1 */}
        <h3 id="sec-2-1" className="scroll-mt-20">
          1. Nhẵn (Smooth) và Thô ráp (Rough)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <Gem size={16} className="text-[#7c8aff]" />
              <span className="text-sm font-semibold text-[#e4e4ed]">Nhẵn (Smooth)</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Kính, kim loại đánh bóng, da người, nước tĩnh. Tạo cảm giác sang trọng, sạch sẽ, hiện đại, hoặc lạnh lùng. Ánh sáng phản chiếu mạnh — specular highlight là đặc trưng. Portrait beauty photography dựa trên smooth texture của da.
            </p>
          </div>
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <Mountain size={16} className="text-[#ff9a5c]" />
              <span className="text-sm font-semibold text-[#e4e4ed]">Thô ráp (Rough)</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Vỏ cây, đá tảng, bê tông, vải bố. Tạo cảm giác tự nhiên, nguyên thủy, chịu đựng, hoặcVintage. Ánh sáng tạo shadow rậm rạp — mỗi góc nổi bật. Landscape và documentary thường exploit rough texture.
            </p>
          </div>
        </div>

        <hr className="doc-divider" />

        {/* 2.2 */}
        <h3 id="sec-2-2" className="scroll-mt-20">
          2. Bóng (Glossy) và Mờ (Matte)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={16} className="text-[#ffcb6b]" />
              <span className="text-sm font-semibold text-[#e4e4ed]">Bóng (Glossy)</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Gương, chrome, nước, mồ hôi trên da. Bề mặt phản chiếu môi trường xung quanh — glossy texture mang thế giới vào trong vật thể. Tạo cảm giác năng động, sống động, hoặc hào nhoáng. Product photography gần như luôn exploit glossy texture.
            </p>
          </div>
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <Layers size={16} className="text-[#a855f7]" />
              <span className="text-sm font-semibold text-[#e4e4ed]">Mờ (Matte)</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Gỗ chưa đánh bóng, giấy, da thuộc, nhung. Bề mặt hấp thụ ánh sáng thay vì phản chiếu — tạo cảm giác ấm áp, riêng tư, khiêm tốn. Fine art photography và moody portrait thường ưa chuộng matte texture.
            </p>
          </div>
        </div>

        <hr className="doc-divider" />

        {/* 2.3 */}
        <h3 id="sec-2-3" className="scroll-mt-20">
          3. Mềm (Soft) và Cứng (Hard)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <Droplets size={16} className="text-[#fb7185]" />
              <span className="text-sm font-semibold text-[#e4e4ed]">Mềm (Soft)</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Lông thú, vải, mây, sương, khói. Chất liệu mềm tạo cảm giác an toàn, êm dịu, nữ tính, hoặc yếu đuối. Kỹ thuật: ánh sáng diffuse, shallow DOF, slight soft focus tăng cảm giác mềm.
            </p>
          </div>
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <Gem size={16} className="text-[#22c55e]" />
              <span className="text-sm font-semibold text-[#e4e4ed]">Cứng (Hard)</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Kim loại, đá, kính, bê tông. Chất liệu cứng tạo cảm giác vững chắc, công nghiệp, nam tính, hoặc lạnh lùng. Kỹ thuật: ánh sáng side/raking, sharp focus, high contrast tăng cảm giác cứng.
            </p>
          </div>
        </div>

        <hr className="doc-divider" />

        {/* 2.4 */}
        <h3 id="sec-2-4" className="scroll-mt-20">
          4. Hữu cơ (Organic) và Hình học (Geometric)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <TreePine size={16} className="text-emerald-400" />
              <span className="text-sm font-semibold text-[#e4e4ed]">Hữu cơ (Organic)</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Vân gỗ, lá, da, vân tay, bề mặt tự nhiên. Không có quy luật lặp lại chính xác — mỗi phần hơi khác một chút. Tạo cảm giác sống động, tự nhiên, ấm áp, con người. Nature và portrait photography được xây dựng trên organic texture.
            </p>
          </div>
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <Grid3X3 size={16} className="text-[#7c8aff]" />
              <span className="text-sm font-semibold text-[#e4e4ed]">Hình học (Geometric)</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Gạch, lưới, cửa sổ, tòa nhà, vi mạch. Lặp lại chính xác, có quy luật. Tạo cảm giác trật tự, kiểm soát, công nghiệp, hoặc siêu thực. Architectural và abstract photography exploit geometric texture.
            </p>
          </div>
        </div>

        {/* ============================================================ */}
        {/*  SECTION III                                                  */}
        {/* ============================================================ */}
        <h2 id="sec-3" className="scroll-mt-20">
          <span className="section-num">Ⅲ</span>
          Chất liệu và ánh sáng
        </h2>

        <p>
          Nếu chất liệu là người mẫu, thì ánh sáng là người nhiếp ảnh gia — nó quyết định chất liệu nào được hiển lộ, ở mức độ nào, và với cảm xúc gì. Hiểu mối quan hệ giữa chất liệu và ánh sáng là kỹ năng thực hành quan trọng nhất trong nhiếp ảnh chất liệu.
        </p>

        <div className="overflow-x-auto my-4 rounded-lg border border-[#1e1e2a]">
          <table className="doc-table">
            <thead>
              <tr>
                <th>Loại ánh sáng</th>
                <th>Góc với bề mặt</th>
                <th>Hiệu ứng lên chất liệu</th>
                <th>Phù hợp nhất cho</th>
                <th>Tránh dùng cho</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Side Lighting</td>
                <td>~90°</td>
                <td>Hiển lộ chất liệu mạnh nhất. Bóng đổ dài, mỗi chi tiết nổi bật.</td>
                <td>Vỏ cây, vải, bê tông, da người, đá</td>
                <td>Chất liệu glossy (tạo glare không đều)</td>
              </tr>
              <tr>
                <td>Front Lighting</td>
                <td>~0°</td>
                <td>San phẳng chất liệu. Bóng đổ tối thiểu, bề mặt trông phẳng.</td>
                <td>Glossy product, beauty, moda</td>
                <td>Rough texture (phá hủy chất liệu)</td>
              </tr>
              <tr>
                <td>Raking Light</td>
                <td>~10–20°</td>
                <td>Hiển lộ chất liệu cực mạnh. Ánh sáng &ldquo;rạch&rdquo; dọc bề mặt.</td>
                <td>Kiến trúc, điêu khắc, vách đá</td>
                <td>Portrait (tạo shadow quá mạnh)</td>
              </tr>
              <tr>
                <td>Diffused Light</td>
                <td>Mọi hướng</td>
                <td>Làm dịu chất liệu. Bóng mềm, chi tiết tinh tế nhưng không dramatic.</td>
                <td>Food, fabric, soft texture, macro</td>
                <td>Khí chất liệu cần dramatic</td>
              </tr>
              <tr>
                <td>Back Lighting</td>
                <td>~180°</td>
                <td>Chất liệu bán trong suốt phát sáng (translucency). Rim light trên viền.</td>
                <td>Lá, vải mỏng, lông thú, tóc</td>
                <td>Bề mặt opaque (không hiệu quả)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="callout callout-photo">
          <div className="callout-title">
            <Camera size={13} className="inline mr-1" />
            Case Study: Edward Weston — Pepper No. 30 (1930)
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Weston chụp quả ớt bằng ánh sáng bên tinh tế trong một thiết bị light-box tự chế. Kết quả: mọi nếp gấp, mọi độ bóng, mọi gradient trên bề mặt ớt đều được hiển lộ — biến một quả ớt bình thường thành tác phẩm điêu khắc thị giác. Bài học: side light + chất liệu organic + kiểm soát tuyệt đối = nhiếp ảnh chất liệu đỉnh cao.
          </p>
        </div>

        {/* ============================================================ */}
        {/*  SECTION IV                                                   */}
        {/* ============================================================ */}
        <h2 id="sec-4" className="scroll-mt-20">
          <span className="section-num">Ⅳ</span>
          Chất liệu như yếu tố sáng tác
        </h2>

        <hr className="doc-divider" />

        {/* 4.1 */}
        <h3 id="sec-4-1" className="scroll-mt-20">
          1. Tương phản chất liệu — Khi giác quan va chạm
        </h3>

        <p>
          Tương phản chất liệu là một trong những công cụ tạo <span className="key-concept">căng thẳng thị giác-xúc giác</span> mạnh nhất. Khi hai bề mặt đối lập đặt cạnh nhau — mềm bên cạnh cứng, nhẵn bên cạnh thô — mắt &ldquo;chạm&rdquo; vào cả hai và cảm nhận sự va chạm.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
          <div className="hotspot-card text-center">
            <div className="text-[#fb7185] mb-2">
              <Hand size={22} className="mx-auto" />
            </div>
            <p className="text-sm font-semibold text-[#e4e4ed] mb-1">Mềm vs Cứng</p>
            <p className="text-xs text-[#9d9db5]">Da thịt mềm trên kim loại lạnh — portrait noir. Lông thú trên bê tông — vulnerability.</p>
          </div>
          <div className="hotspot-card text-center">
            <div className="text-[#7c8aff] mb-2">
              <Gem size={22} className="mx-auto" />
            </div>
            <p className="text-sm font-semibold text-[#e4e4ed] mb-1">Nhẵn vs Thô</p>
            <p className="text-xs text-[#9d9db5]">Kính trên đá — modern vs primal. Da trẻ em trên vỏ cây — innocence vs experience.</p>
          </div>
          <div className="hotspot-card text-center">
            <div className="text-[#ffcb6b] mb-2">
              <Sparkles size={22} className="mx-auto" />
            </div>
            <p className="text-sm font-semibold text-[#e4e4ed] mb-1">Bóng vs Mờ</p>
            <p className="text-xs text-[#9d9db5]">Chrome trên nhung — luxury. Nước trên gỗ cũ — refresh vs decay.</p>
          </div>
        </div>

        <hr className="doc-divider" />

        {/* 4.2 */}
        <h3 id="sec-4-2" className="scroll-mt-20">
          2. Chất liệu như pattern
        </h3>

        <p>
          Khi chất liệu lặp lại đủ nhiều, nó trở thành pattern — và pattern tạo ra nhịp điệu thị giác (visual rhythm). Vân gỗ trên sàn, gạch trên tường, sóng trên mặt nước — tất cả đều là chất liệu đã chuyển hóa thành pattern. Nhiếp ảnh gia có thể exploit sự chuyển hóa này để tạo ra tác phẩm trừu tượng từ chất liệu đời thường.
        </p>

        <ul className="factor-list">
          <li>
            <strong>Pattern đồng nhất:</strong> Chất liệu lặp lại hoàn toàn — tạo sự thống nhất, thiền, trật tự. Ví dụ: cát sa mạc, gạch đồng nhất.
          </li>
          <li>
            <strong>Pattern bị phá vỡ:</strong> Chất liệu lặp lại với một điểm khác biệt — tạo focal point tự nhiên. Ví dụ: bức tường gạch với một viên khác màu.
          </li>
          <li>
            <strong>Pattern hữu cơ:</strong> Chất liệu lặp lại nhưng không hoàn hảo — tạo sự tự nhiên, sống động. Ví dụ: vân gỗ, rễ cây.
          </li>
        </ul>

        <hr className="doc-divider" />

        {/* 4.3 */}
        <h3 id="sec-4-3" className="scroll-mt-20">
          3. Chất liệu và cảm xúc
        </h3>

        <p>
          Chất liệu không chỉ là thông tin thị giác — nó là <span className="key-concept">chất xúc tác cảm xúc</span>. Não bộ liên kết xúc giác với cảm xúc chặt chẽ hơn bất kỳ giác quan nào khác (vùng somatosensory cortex liên kết trực tiếp với amygdala). Nhiếp ảnh exploit liên kết này:
        </p>

        <div className="overflow-x-auto my-4 rounded-lg border border-[#1e1e2a]">
          <table className="doc-table">
            <thead>
              <tr>
                <th>Chất liệu</th>
                <th>Cảm xúc tích cực</th>
                <th>Cảm xúc tiêu cực</th>
                <th>Ví dụ nhiếp ảnh</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Nhẵn, mềm</td>
                <td>An toàn, êm ái, sang trọng</td>
                <td>Nhạt nhẽo, thiếu cá tính</td>
                <td>Beauty, fashion, baby portrait</td>
              </tr>
              <tr>
                <td>Thô, cứng</td>
                <td>Chân thực, bền bỉ, nguyên thủy</td>
                <td>Thô lỗ, đe dọa, bất tiện</td>
                <td>Documentary, landscape, industrial</td>
              </tr>
              <tr>
                <td>Bóng, phản chiếu</td>
                <td>Hiện đại, năng động, hào nhoáng</td>
                <td>Giả tạo, hời hợt, lạnh lùng</td>
                <td>Commercial, automotive, luxury</td>
              </tr>
              <tr>
                <td>Mờ, hấp thụ</td>
                <td>Ấm áp, riêng tư, khiêm tốn</td>
                <td>Cũ kỹ, u ám, nhàm chán</td>
                <td>Fine art, moody portrait, vintage</td>
              </tr>
              <tr>
                <td>Hữu cơ</td>
                <td>Sống động, tự nhiên, ấm áp</td>
                <td>Hỗn loạn, không kiểm soát</td>
                <td>Nature, environmental, lifestyle</td>
              </tr>
              <tr>
                <td>Hình học</td>
                <td>Trật tự, kiểm soát, tinh sạch</td>
                <td>Lạnh lùng, vô hồn, giam cầm</td>
                <td>Architecture, abstract, minimal</td>
              </tr>
            </tbody>
          </table>
        </div>

        <hr className="doc-divider" />

        {/* 4.4 */}
        <h3 id="sec-4-4" className="scroll-mt-20">
          4. Macro photography và chất liệu
        </h3>

        <p>
          Macro photography là lãnh địa mà chất liệu trở thành chủ thể chính. Khi bạn tiến gần đủ, mọi bề mặt đều trở thành cảnh quan: da người trở thành đồi núi, vải trở thành rừng sợi, lá trở thành bản đồ. Ở tỷ lệ macro, chất liệu không còn là yếu tố phụ — nó là toàn bộ câu chuyện.
        </p>

        <p>Kỹ thuật macro cho chất liệu:</p>
        <ul className="factor-list">
          <li>
            <strong>Focus stacking:</strong> Ghép nhiều ảnh ở focus khác nhau để có độ nét sâu toàn bộ chất liệu — thiết yếu cho macro chất liệu ở magnification cao.
          </li>
          <li>
            <strong>Ánh sáng bên hoặc raking:</strong> Ngay cả ở khoảng cách macro, side light vẫn là vua hiển lộ chất liệu. Ring flash (front light) san phẳng chất liệu — tránh dùng trừ khi muốn hiệu ứng clinical.
          </li>
          <li>
            <strong>Tripod + remote shutter:</strong> Ở magnification cao, độ rung camera phá hủy chi tiết chất liệu. Tripod không phải lựa chọn — nó là bắt buộc.
          </li>
        </ul>

        <hr className="doc-divider" />

        {/* 4.5 */}
        <h3 id="sec-4-5" className="scroll-mt-20">
          5. Shallow DOF cô lập chất liệu
        </h3>

        <p>
          Shallow depth of field không chỉ là công cụ isolate chủ thể — nó là cách tạo ra <span className="key-concept">hierarchy chất liệu</span>. Vùng focus sharp hiển lộ chất liệu đầy đủ; vùng blur biến chất liệu thành impression, gợi ý thay vì chi tiết. Sự chuyển tiếp giữa hai vùng tạo ra narrative: từ cụ thể đến mơ hồ, từ hiện thực đến ký ức.
        </p>

        <div className="callout callout-key">
          <div className="callout-title">
            <Lightbulb size={13} className="inline mr-1" />
            Kỹ thuật cô lập
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Để cô lập chất liệu cụ thể: sử dụng ống kính tele dài (85–200mm), mở aperture tối đa (f/1.4–f/2.8), tiến gần chủ thể, và đẩy background ra xa. Kết quả: vùng chất liệu sharp nổi bật hoàn toàn trên nền mềm — tactile response mạnh nhất có thể.
          </p>
        </div>

        {/* ============================================================ */}
        {/*  SECTION V                                                    */}
        {/* ============================================================ */}
        <h2 id="sec-5" className="scroll-mt-20">
          <span className="section-num">Ⅴ</span>
          Hậu kỳ chất liệu
        </h2>

        <p>
          Hậu kỳ chất liệu là quá trình <span className="key-concept">điều chỉnh trải nghiệm xúc giác</span> — không chỉ là tăng giảm sharpness. Mỗi slider bạn kéo đều thay đổi cách người xem &ldquo;chạm&rdquo; vào bức ảnh.
        </p>

        <hr className="doc-divider" />

        {/* 5.1 */}
        <h3 id="sec-5-1" className="scroll-mt-20">
          1. Sharpening cho chất liệu
        </h3>

        <p>
          Sharpening tăng contrast ở các edge — và edge là nơi chất liệu được định nghĩa. Nhưng sharpening là con dao hai lưỡi: quá ít = chất liệu mềm xệ; quá nhiều = halos, noise, artifact.
        </p>

        <ul className="factor-list">
          <li>
            <strong>Capture sharpening:</strong> Bù đắp mất mát do anti-aliasing filter và demosaicing. Áp dụng nhẹ, ở mức vừa đủ để restore.
          </li>
          <li>
            <strong>Creative sharpening:</strong> Chỉ sharpen vùng cần nhấn mạnh chất liệu — selective sharpening. Dùng mask hoặc adjustment brush.
          </li>
          <li>
            <strong>Output sharpening:</strong> Áp dụng cuối cùng, phù hợp medium xuất (web, print). Print cần sharpening mạnh hơn web.
          </li>
        </ul>

        <hr className="doc-divider" />

        {/* 5.2 */}
        <h3 id="sec-5-2" className="scroll-mt-20">
          2. Clarity slider — Tăng midtone contrast
        </h3>

        <p>
          Clarity tăng contrast ở midtone — và midtone chính là nơi chất liệu &ldquo;sống&rdquo;. Tăng clarity = chất liệu rõ hơn, chi tiết hơn, &ldquo;thô hơn&rdquo;. Giảm clarity = chất liệu mềm hơn, mờ hơn, &ldquo;mơ hơn&rdquo;. Đây là slider ảnh hưởng trực tiếp nhất đến perception chất liệu.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <SlidersHorizontal size={16} className="text-[#7c8aff]" />
              <span className="text-sm font-semibold text-[#e4e4ed]">+Clarity</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Tăng chất liệu, làm rough texture rõ hơn. Landscape, architecture, documentary. Cẩn thận: quá nhiều tạo hiệu ứng HDR giả.
            </p>
          </div>
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <SlidersHorizontal size={16} className="text-[#9d9db5]" />
              <span className="text-sm font-semibold text-[#e4e4ed]">0 Clarity</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Giữ nguyên. Phù hợp khi chất liệu đã đúng mức — không cần push thêm. Đa số ảnh tốt nhất ở mức này.
            </p>
          </div>
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <SlidersHorizontal size={16} className="text-[#fb7185]" />
              <span className="text-sm font-semibold text-[#e4e4ed]">−Clarity</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Làm mềm chất liệu, tạo hiệu ứng dreamy, ethereal. Beauty, romance, baby, mist. Cẩn thận: quá nhiều tạo hiệu ứng plastic.
            </p>
          </div>
        </div>

        <hr className="doc-divider" />

        {/* 5.3 */}
        <h3 id="sec-5-3" className="scroll-mt-20">
          3. Texture slider trong Lightroom
        </h3>

        <p>
          Texture slider (giới thiệu trong Lightroom 2019) là công cụ hậu kỳ chất liệu tinh tế nhất. Khác với clarity (midtone contrast) và sharpening (edge contrast), texture target cụ thể <span className="key-concept">chi tiết bề mặt trung bình</span> — chính xác vùng mà perception chất liệu hoạt động.
        </p>

        <p>
          Texture +30–50: tăng chất liệu tự nhiên, không tạo halos. Texture −30–50: làm mềm chất liệu, không tạo hiệu ứng blur. Kết hợp texture với clarity cho phép kiểm soát cực kỳ tinh tế: texture cho chi tiết nhỏ, clarity cho cấu trúc lớn.
        </p>

        <hr className="doc-divider" />

        {/* 5.4 */}
        <h3 id="sec-5-4" className="scroll-mt-20">
          4. Thêm grain/film texture
        </h3>

        <p>
          Grain là chất liệu của chính bức ảnh — nó thêm một lớp texture lên trên mọi nội dung. Grain phim không phải &ldquo;noise cần loại bỏ&rdquo; — nó là chất liệu có chủ đích tạo ra bởi nhiếp ảnh gia:
        </p>

        <ul className="factor-list">
          <li>
            <strong>Grain tinh tế (+10–20):</strong> Thêm &ldquo;da&rdquo; cho digital file — loại bỏ cảm giác &ldquo;quá sạch&rdquo; của ảnh digital. Analog feel mà không mất chi tiết.
          </li>
          <li>
            <strong>Grain trung bình (+30–50):</strong> Tạo phong cách phim — cảm giác hoài niệm, hữu cơ. Phù hợp street, documentary, portrait art.
          </li>
          <li>
            <strong>Grain nặng (+60+):</strong> Tạo chất liệu rough — cảm giác raw, trực diện, punk. Daido Moriyama, Bruce Gilden exploit heavy grain như yếu tố sáng tác chính.
          </li>
        </ul>

        <div className="callout callout-warning">
          <div className="callout-title">
            <AlertTriangle size={13} className="inline mr-1" />
            Grain ≠ Noise
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Grain phim có cấu trúc (dễ chịu, organic) — noise digital có pattern (khó chịu, artificial). Thêm grain trong hậu kỳ (Lightroom, Silver Efex) cho kết quả đẹp hơn nhiều so với để ISO cao tạo noise. Nếu muốn grain — hãy chụp ở ISO thấp rồi thêm grain trong hậu kỳ.
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
              Chất liệu là yếu tố thị giác duy nhất kích hoạt phản ứng xúc giác — biến cái nhìn thành trải nghiệm chạm.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">02</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Visual texture (mắt thấy) vs Tactile texture (tâm trí chạm) — mục tiêu thực sự là kích hoạt tactile texture.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">03</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Ánh sáng tạo ra chất liệu trong nhiếp ảnh — side light và raking light là vua hiển lộ, front light san phẳng.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">04</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Tương phản chất liệu (mềm vs cứng, nhẵn vs thô) tạo căng thẳng xúc giác mạnh nhất — công cụ narrative quý giá.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">05</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Mỗi loại chất liệu mang hệ thống liên tưởng cảm xúc riêng — chọn chất liệu = chọn ngôn ngữ xúc giác.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">06</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Hậu kỳ chất liệu: texture slider tinh tế nhất, clarity cho cấu trúc, sharpening cho edge, grain cho analog feel.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">07</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Bạn không chụp chất liệu — bạn chụp ánh sáng trên chất liệu. Góc ánh sáng quyết định mọi thứ.
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
              Texture là thứ khiến người xem muốn <strong>"chạm" vào ảnh</strong>. Khi một tấm ảnh kích hoạt somatosensory cortex — vùng não xử lý xúc giác — người xem không chỉ nhìn mà còn "cảm." Đây là sự khác biệt giữa ảnh thông tin và ảnh nghệ thuật. Bí quyết: ánh sáng side hoặc raking ở góc 10–20° là "vũ khí bí mật" để biến một bề mặt bình thường thành một trải nghiệm xúc giác. Không có kỹ thuật hậu kỳ nào thay thế được ánh sáng đúng góc.
            </p>
          </div>
          <div className="callout callout-pitfall">
            <div className="callout-title">⚠ Bẫy chuyên gia</div>
            <p style={{ marginBottom: 0, lineHeight: 1.75 }}>
              Dùng <strong>Clarity slider quá mạnh</strong> để cố tạo texture. Clarity tạo ra midtone contrast — không phải texture thực sự. Nó làm ảnh trông "crispy" nhưng thiếu chiều sâu xúc giác thực. Texture thực phải được tạo ra bởi ánh sáng — cụ thể là side light hoặc raking light. Nếu texture không có trong ảnh gốc RAW, không slider nào tạo ra được.
            </p>
          </div>
          <div className="practice-exercise">
            <div className="practice-header">⬥ Bài tập thực chiến — Bộ sưu tập texture tự nhiên</div>
            <div className="practice-body">
              <p>Xây dựng thư viện texture cá nhân từ ánh sáng tự nhiên — bài tập 1 buổi chiều:</p>
              <ol className="practice-steps">
                <li><strong>10 vật liệu:</strong> Gỗ cũ, vải thô, đá nhám, da thuộc, kim loại gỉ, giấy nhàu, cát, vỏ cây, gốm thô, vải lụa.</li>
                <li><strong>Chỉ dùng cửa sổ tự nhiên:</strong> Đặt vật liệu gần cửa sổ. Xoay từng vật liệu từ 0° đến 90° so với nguồn sáng.</li>
                <li><strong>Quan sát điểm vàng:</strong> Góc nào khiến texture nổi rõ nhất? Ghi lại — đó là "texture angle" cho vật liệu đó.</li>
                <li><strong>So sánh:</strong> Nhìn vật liệu mịn (lụa) vs. thô (đá) cùng góc sáng. Cảm xúc khác nhau thế nào?</li>
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
          <Link href="/tuong-phan" className="group nav-card">
            <div className="nav-card-label">← Bài trước</div>
            <div className="nav-card-title">9. Tương phản màu sắc</div>
            <div className="nav-card-desc">Ngôn ngữ thị giác</div>
          </Link>
          <Link href="/kich-thuoc" className="group nav-card text-right">
            <div className="nav-card-label">Bài tiếp →</div>
            <div className="nav-card-title">11. Kích thước tỷ lệ</div>
            <div className="nav-card-desc">Chất liệu & Tỷ lệ</div>
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

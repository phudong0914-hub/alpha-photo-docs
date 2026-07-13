

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
  Layers,
  Eye,
  Maximize2,
  Minimize2,
  Mountain,
  TreePine,
  Wind,
} from 'lucide-react';
import DocsLayout from '@/components/docs-layout';
import { VisualDeconstructionLab } from '@/components/visual-deconstruction-lab';

/* ------------------------------------------------------------------ */
/*  TOC Data                                                          */
/* ------------------------------------------------------------------ */
const tocSections = [
  { id: 'sec-1', label: 'Ⅰ. Âm dương trong thị giác', level: 1 },
  { id: 'sec-1-1', label: '1. Positive space vs Negative space', level: 2 },
  { id: 'sec-1-2', label: '2. Figure-ground relationship', level: 2 },
  { id: 'sec-1-3', label: '3. Bình Ruben và sự lưỡng nghĩa', level: 2 },
  { id: 'sec-2', label: 'Ⅱ. Sức mạnh của khoảng trống', level: 1 },
  { id: 'sec-2-1', label: '1. Tại sao ít hơn lại nhiều hơn', level: 2 },
  { id: 'sec-2-2', label: '2. Negative space như nhịp thở', level: 2 },
  { id: 'sec-2-3', label: '3. Nhiếp ảnh tối giản', level: 2 },
  { id: 'sec-3', label: 'Ⅲ. Tạo chiều sâu', level: 1 },
  { id: 'sec-3-1', label: '1. Chồng lấp (Overlap)', level: 2 },
  { id: 'sec-3-2', label: '2. Phối cảnh không khí (Atmospheric perspective)', level: 2 },
  { id: 'sec-3-3', label: '3. Thu nhỏ kích thước (Size diminution)', level: 2 },
  { id: 'sec-3-4', label: '4. Phối cảnh tuyến tính (Linear perspective)', level: 2 },
  { id: 'sec-3-5', label: '5. Vị trí theo chiều cao (Vertical position)', level: 2 },
  { id: 'sec-3-6', label: '6. Gradient kết cấu (Texture gradient)', level: 2 },
  { id: 'sec-4', label: 'Ⅳ. Không gian phẳng vs không gian sâu', level: 1 },
  { id: 'sec-4-1', label: '1. Khi nào dùng không gian phẳng', level: 2 },
  { id: 'sec-4-2', label: '2. Khi nào dùng không gian sâu', level: 2 },
  { id: 'summary', label: 'Tóm tắt 7 điểm chính', level: 1 },
];

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */
export default function KhongGianPage() {
  const [isRead, setIsRead] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('alpha-doc-read');
      if (saved) {
        const readPages: string[] = JSON.parse(saved);
        if (readPages.includes('/khong-gian')) setIsRead(true);
      }
    } catch {}
  }, []);

  const toggleRead = () => {
    try {
      const saved = localStorage.getItem('alpha-doc-read');
      const readPages: string[] = saved ? JSON.parse(saved) : [];
      if (isRead) {
        const updated = readPages.filter((p) => p !== '/khong-gian');
        localStorage.setItem('alpha-doc-read', JSON.stringify(updated));
        setIsRead(false);
      } else {
        const updated = [...readPages, '/khong-gian'];
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
          <span className="text-[#9d9db5]">Không gian âm dương</span>
        </div>

        {/* Badges */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold font-mono px-2 py-0.5 rounded bg-[rgba(124,138,255,0.1)] text-[#7c8aff]">
            HA6
          </span>
          <span className="text-[11px] text-[#6b6b80]">17 phút đọc · #KhongGian #AmDuong #NegativeSpace #Depth #FigureGround</span>
          <span className="elite-badge">
            <GraduationCap size={11} />
            Nâng cao
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-[#e4e4ed] leading-tight mb-3 border-none pb-0">
          Không gian âm dương
        </h1>

        {/* Subtitle */}
        <p className="text-base text-[#9d9db5] leading-relaxed mb-6" style={{ marginTop: 0 }}>
          Ngôn ngữ thị giác · Bài 6 — Sức mạnh của khoảng trống, chiều sâu, và mối quan hệ figure-ground trong nhiếp ảnh
        </p>

        {/* Hero image */}
        <div className="rounded-xl overflow-hidden border border-[#1e1e2a] mb-8">
          <img
            src="/hero-khong-gian.png"
            alt="Không gian âm dương - Ảnh minh họa"
            className="w-full h-auto object-cover"
            loading="eager"
          />
        </div>

        {/* Video bài học */}
        <LessonVideoPlayer video={lessonVideos['/khong-gian']} />

        {/* Opening Quote */}
        <div className="quote-block">
          <p>
            &ldquo;Khoảng trống không phải là sự thiếu vắng — nó là sự hiện diện ở dạng tinh khiết nhất. Trong nhiếp ảnh, cái bạn không chụp quan trọng ngang cái bạn chụp.&rdquo;
          </p>
          <p className="quote-attr">— Michael Kenna</p>
        </div>

        <p className="drop-cap">
          Có một sự thật nghịch lý về không gian trong nhiếp ảnh: <span className="key-concept">cái không có mặt thường quyết định cái có mặt</span>. Một bức ảnh với figure nhỏ giữa khoảng trống mênh mông — một người đi bộ trên bãi biển rộng lớn, một con thuyền giữa mặt biển — thường mạnh mẽ hơn một bức ảnh lấp đầy chi tiết. Không phải vì chi tiết dư thừa, mà vì khoảng trống cho phép mắt nghỉ ngơi, cho phép cảm xúc nảy nở, và cho phép trí tưởng tượng của người xem tham gia vào việc tạo nghĩa.
        </p>

        {/* ============================================================ */}
        {/*  SECTION I                                                    */}
        {/* ============================================================ */}
        <h2 id="sec-1" className="scroll-mt-20">
          <span className="section-num">Ⅰ</span>
          Âm dương trong thị giác
        </h2>

        <hr className="doc-divider" />

        {/* 1.1 */}
        <h3 id="sec-1-1" className="scroll-mt-20">
          1. Positive space vs Negative space
        </h3>

        <p>
          Trong mọi bức ảnh, không gian được phân thành hai loại: <strong>positive space</strong> (không gian dương) — khu vực chiếm bởi chủ thể chính, hình dạng có trọng lượng thị giác — và <strong>negative space</strong> (không gian âm) — khu vực xung quanh, khoảng trống, phông nền. Sự phân chia này không phải là tuyệt đối — nó phụ thuộc vào cách người xem đọc hình ảnh.
        </p>

        <div className="comparison-grid my-4">
          <div className="comp-card">
            <span className="sub-label">POSITIVE SPACE</span>
            <h4>Không gian dương</h4>
            <p>
              Chủ thể, vật thể, con người — mọi thứ mà mắt dừng lại và đọc là &ldquo;cái gì đó&rdquo;. Positive space có đường nét rõ ràng, có trọng lượng thị giác, và thường là lý do bức ảnh tồn tại. Đó là nhân vật trong chân dung, tòa nhà trong cảnh đô thị, bông hoa trong ảnh macro.
            </p>
          </div>
          <div className="comp-card" style={{ borderColor: '#a855f744' }}>
            <span className="sub-label" style={{ color: '#a855f7', background: 'rgba(168,85,247,0.1)' }}>NEGATIVE SPACE</span>
            <h4>Không gian âm</h4>
            <p>
              Khoảng trống, phông nền, bầu trời, tường trống — mọi thứ mà mắt đi qua nhưng không dừng lại. Negative space không phải là &ldquo;không gì&rdquo; — nó là không gian nơi cảm xúc nảy nở, nơi mắt nghỉ ngơi, và nơi trọng lượng của positive space được định nghĩa.
            </p>
          </div>
        </div>

        <hr className="doc-divider" />

        {/* 1.2 */}
        <h3 id="sec-1-2" className="scroll-mt-20">
          2. Figure-ground relationship
        </h3>

        <p>
          Figure-ground (hình-nền) là khái niệm trung tâm của tâm lý học thị giác — cách não bộ phân biệt &ldquo;cái gì là chủ thể&rdquo; (figure) và &ldquo;cái gì là phông nền&rdquo; (ground). Quá trình này diễn ra gần như ngay lập tức, và nó quyết định cách người xem đọc bức ảnh.
        </p>

        <p>Bốn yếu tố giúp não bộ xác định figure vs ground:</p>
        <ul className="factor-list">
          <li>
            <strong>Đường nét rõ ràng:</strong> Phần tử có đường viền sắc nét hơn thường được đọc là figure. Đó là lý do tại sao sharpening chọn lọc trong hậu kỳ có thể &ldquo;đẩy&rdquo; chủ thể về phía figure.
          </li>
          <li>
            <strong>Tương phản cao:</strong> Phần tử có độ tương phản cao hơn so với xung quanh tự động trở thành figure. Một người mặc áo sáng trên nền tối — hoặc ngược lại — luôn là figure.
          </li>
          <li>
            <strong>Kích thước nhỏ hơn:</strong> Trong hầu hết trường hợp, phần tử nhỏ hơn được đọc là figure trên nền lớn hơn. Ngoại lệ: khi phần tử lớn bị &ldquo;cắt&rdquo; bởi khung hình, nó có thể trở thành ground.
          </li>
          <li>
            <strong>Vị trí thấp hơn:</strong> Trong văn hóa thị giác phương Tây, phần tử ở phía dưới thường được đọc là figure — vì &ldquo;ground&rdquo; (đất) ở dưới, &ldquo;figure&rdquo; (vật thể) đứng trên đất.
          </li>
        </ul>

        <hr className="doc-divider" />

        {/* 1.3 */}
        <h3 id="sec-1-3" className="scroll-mt-20">
          3. Bình Ruben và sự lưỡng nghĩa thị giác
        </h3>

        <p>
          Bình Ruben (Rubin&apos;s vase) là minh họa kinh điển cho sự lưỡng nghĩa figure-ground: khi bạn nhìn vào hình ảnh, bạn thấy hoặc một chiếc bình trắng, hoặc hai khuôn mặt đen nhìn nhau — nhưng không bao giờ thấy cả hai cùng lúc. Sự đảo chiều figure-ground này là một trong những công cụ mạnh mẽ nhất trong nhiếp ảnh.
        </p>

        <p>
          Khi nhiếp ảnh gia cố tình tạo ra sự lưỡng nghĩa figure-ground — khi negative space cũng có hình dạng có ý nghĩa — bức ảnh buộc người xem phải nhìn hai lần, mỗi lần với một cách đọc khác. Điều này tạo ra sự tham gia sâu hơn và thời gian xem lâu hơn.
        </p>

        <div className="callout callout-brain">
          <div className="callout-title">
            <Lightbulb size={13} className="inline mr-1" />
            Tại sao sự lưỡng nghĩa lại hấp dẫn?
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Não bộ coi sự lưỡng nghĩa như một &ldquo;câu đố&rdquo; — và con người tiến hóa để thích giải đố. Khi bạn nhìn thấy Rubin&apos;s vase, não bộ liên tục chuyển đổi giữa hai cách đọc — và mỗi lần chuyển đổi tạo ra một khoảnh khắc &ldquo;aha!&rdquo; nhỏ, giải phóng dopamine. Đây là lý do tại sao hình ảnh lưỡng nghĩa viral trên mạng xã hội.
          </p>
        </div>

        {/* ============================================================ */}
        {/*  SECTION II                                                   */}
        {/* ============================================================ */}
        <h2 id="sec-2" className="scroll-mt-20">
          <span className="section-num">Ⅱ</span>
          Sức mạnh của khoảng trống
        </h2>

        <hr className="doc-divider" />

        {/* 2.1 */}
        <h3 id="sec-2-1" className="scroll-mt-20">
          1. Tại sao ít hơn lại nhiều hơn
        </h3>

        <p>
          Nguyên lý &ldquo;less is more&rdquo; trong nhiếp ảnh không phải là triết lý thẩm mỹ suông — nó có nền tảng thần kinh học. Khi một bức ảnh có quá nhiều thông tin thị giác, não bộ phải phân bổ sự chú ý cho nhiều phần tử — và không phần tử nào nhận đủ chú ý để tạo ấn tượng sâu. Ngược lại, khi negative space chiếm phần lớn khung hình, toàn bộ sự chú ý tập trung vào figure — tạo ra ấn tượng mạnh mẽ và rõ ràng hơn.
        </p>

        <p>
          Hãy nghĩ về nó như một sân khấu: một diễn viên trên sân khấu trống thu hút mọi ánh nhìn. Cùng diễn viên đó trong đám đông — anh ta biến mất. Negative space chính là sân khấu trống khiến chủ thể của bạn trở thành ngôi sao.
        </p>

        <hr className="doc-divider" />

        {/* 2.2 */}
        <h3 id="sec-2-2" className="scroll-mt-20">
          2. Negative space như nhịp thở
        </h3>

        <p>
          Trong âm nhạc, khoảng lặng (rest) không phải là sự thiếu vắng âm thanh — nó là một phần của nhịp điệu, tạo khoảng cho tai &ldquo;tiêu hóa&rdquo; nốt trước đó và chuẩn bị cho nốt tiếp theo. Negative space trong nhiếp ảnh đóng vai trò tương tự: nó tạo <span className="key-concept">nhịp thở thị giác</span> — khoảng nghỉ cho mắt và tâm trí.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <Wind size={16} className="text-[#7c8aff]" />
              <span className="text-sm font-semibold text-[#e4e4ed]">Nhịp thở trước</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Negative space trước chủ thể — khoảng trống phía trước hướng nhìn hoặc chuyển động — tạo cảm giác chờ đợi, không gian mở, và tự do. Chủ thể có &ldquo;phòng để thở&rdquo; và di chuyển.
            </p>
          </div>
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <Mountain size={16} className="text-[#ffcb6b]" />
              <span className="text-sm font-semibold text-[#e4e4ed]">Nhịp thở sau</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Negative space phía sau chủ thể tạo cảm giác đã trải qua, ký ức, và đôi khi là bị dồn vào chân tường. Cảm xúc thay đổi hoàn toàn chỉ bằng cách đổi vị trí negative space.
            </p>
          </div>
          <div className="hotspot-card">
            <div className="flex items-center gap-2 mb-2">
              <Maximize2 size={16} className="text-emerald-400" />
              <span className="text-sm font-semibold text-[#e4e4ed]">Nhịp thở xung quanh</span>
            </div>
            <p className="text-xs text-[#9d9db5] leading-relaxed">
              Khi negative space bao quanh chủ thể từ mọi phía — cô lập, tĩnh lặng, và đôi khi cô đơn. Đây là công thức phổ biến trong nhiếp ảnh tối giản và fine art.
            </p>
          </div>
        </div>

        <hr className="doc-divider" />

        {/* 2.3 */}
        <h3 id="sec-2-3" className="scroll-mt-20">
          3. Nhiếp ảnh tối giản
        </h3>

        <p>
          Minimalist photography đẩy nguyên lý negative space đến cực hạn — khi negative space chiếm 70-90% khung hình, và chủ thể chỉ là một điểm nhỏ nhưng sắc bén. Phong cách này không phải là &ldquo;chụp ít hơn&rdquo; — nó là chụp chính xác hơn, vì khi chỉ có một chủ thể, nó phải hoàn hảo.
        </p>

        <p>Bốn nguyên tắc của nhiếp ảnh tối giản:</p>
        <ul className="factor-list">
          <li>
            <strong>Chủ thể mạnh:</strong> Khi chỉ có một yếu tố trong khung hình, nó phải đủ mạnh để gánh toàn bộ bức ảnh — về hình dạng, màu sắc, hoặc ý nghĩa.
          </li>
          <li>
            <strong>Negative space có chủ đích:</strong> Khoảng trống không phải là &ldquo;còn dư&rdquo; — nó phải có hình dạng, màu sắc, và kết cấu được kiểm soát.
          </li>
          <li>
            <strong>Loại bỏ nhiễu:</strong> Mọi phần tử không đóng góp vào thông điệp đều phải bị loại bỏ — không ngoại lệ.
          </li>
          <li>
            <strong>Tương phản rõ ràng:</strong> Figure và ground phải phân biệt rõ ràng — không có vùng &ldquo;lưng chừng&rdquo; khiến người xem bối rối.
          </li>
        </ul>

        <div className="callout callout-photo">
          <div className="callout-title">
            <Camera size={13} className="inline mr-1" />
            Case Study: Michael Kenna
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Michael Kenna là bậc thầy của nhiếp ảnh tối giản. Bức ảnh cây đơn độc giữa hồ nước trong sương — negative space là mặt nước phẳng lặng và sương mù — chiếm hơn 90% khung hình. Cây nhỏ bé nhưng sắc nét, là figure duy nhất. Kenna chứng minh rằng khi negative space được sử dụng đúng cách, nó không làm bức ảnh trống rỗng — nó làm bức ảnh đầy ắp cảm xúc.
          </p>
        </div>

        {/* ============================================================ */}
        {/*  SECTION III                                                  */}
        {/* ============================================================ */}
        <h2 id="sec-3" className="scroll-mt-20">
          <span className="section-num">Ⅲ</span>
          Tạo chiều sâu
        </h2>

        <hr className="doc-divider" />

        <p>
          Bức ảnh là mặt phẳng hai chiều — nhưng mắt người lại kỳ vọng thấy ba chiều. Sự mâu thuẫn này là thách thức cốt lõi của nhiếp ảnh: làm sao tạo ảo giác chiều sâu trên mặt phẳng? Sáu <span className="key-concept">manh mối chiều sâu</span> (depth cues) mà não bộ sử dụng:
        </p>

        {/* 3.1 */}
        <h3 id="sec-3-1" className="scroll-mt-20">
          1. Chồng lấp (Overlap)
        </h3>

        <p>
          Khi một vật thể che một phần vật thể khác, não bộ tự động xác định vật che là gần hơn và vật bị che là xa hơn. Đây là manh mối chiều sâu đơn giản và mạnh mẽ nhất — và nó hoạt động ngay cả khi không có bất kỳ manh mối nào khác.
        </p>

        <p>
          Trong nhiếp ảnh, overlap có thể tạo ra tự nhiên (người đứng trước cây) hoặc được sắp xếp có chủ đích (foreground element che một phần background). Khi sử dụng overlap có chủ đích, hãy đảm bảo vật che không che mất phần quan trọng của vật bị che — trừ khi đó chính là ý đồ sáng tác.
        </p>

        <hr className="doc-divider" />

        {/* 3.2 */}
        <h3 id="sec-3-2" className="scroll-mt-20">
          2. Phối cảnh không khí (Atmospheric perspective)
        </h3>

        <p>
          Trong tự nhiên, vật thể càng xa càng mất độ tương phản, độ bão hòa màu, và độ sắc nét — do các hạt trong không khí (sương, bụi, độ ẩm) phân tán ánh sáng. Não bộ đã học cách đọc sự giảm sắc nét và độ tương phản này như &ldquo;khoảng cách&rdquo;.
        </p>

        <div className="callout callout-key">
          <div className="callout-title">
            <Lightbulb size={13} className="inline mr-1" />
            Ứng dụng trong hậu kỳ
          </div>
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            Bạn có thể tăng cường phối cảnh không khí trong hậu kỳ bằng cách: giảm clarity và dehaze cho background, giảm saturation cho các layer xa, và thêm sương mù nhân tạo. Kỹ thuật này đặc biệt hiệu quả trong ảnh cảnh quan — tạo cảm giác chiều sâu mà không cần phối cảnh tuyến tính.
          </p>
        </div>

        <hr className="doc-divider" />

        {/* 3.3 */}
        <h3 id="sec-3-3" className="scroll-mt-20">
          3. Thu nhỏ kích thước (Size diminution)
        </h3>

        <p>
          Vật thể cùng kích thước thực tế nhưng xuất hiện nhỏ hơn trong khung hình được não bộ đọc là &ldquo;xa hơn&rdquo;. Đây là cơ sở của phối cảnh tuyến tính — và nó là lý do tại sao hai hàng cây hội tụ ở chân trời: cây gần thì lớn, cây xa thì nhỏ, mặc dù thực tế chúng giống hệt nhau.
        </p>

        <hr className="doc-divider" />

        {/* 3.4 */}
        <h3 id="sec-3-4" className="scroll-mt-20">
          4. Phối cảnh tuyến tính (Linear perspective)
        </h3>

        <p>
          Đường thẳng song song trong thực tế hội tụ về vanishing point trong ảnh — và sự hội tụ này tạo ra ảo giác chiều sâu mạnh mẽ nhất. Phối cảnh tuyến tính có thể là một điểm (one-point perspective, nhìn thẳng vào đường hầm), hai điểm (two-point perspective, nhìn vào góc tòa nhà), hoặc ba điểm (three-point perspective, nhìn lên từ dưới).
        </p>

        <div className="overflow-x-auto my-4 rounded-lg border border-[#1e1e2a]">
          <table className="doc-table">
            <thead>
              <tr>
                <th>Loại phối cảnh</th>
                <th>Vanishing point</th>
                <th>Hiệu ứng tâm lý</th>
                <th>Ứng dụng</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>One-point</td>
                <td>1 (trung tâm)</td>
                <td>Tập trung cao, chiều sâu mạnh, ổn định</td>
                <td>Hành lang, đường ray, cầu</td>
              </tr>
              <tr>
                <td>Two-point</td>
                <td>2 (hai bên)</td>
                <td>Năng động, kiến trúc, không gian mở</td>
                <td>Góc tòa nhà, ngã tư, phòng khách</td>
              </tr>
              <tr>
                <td>Three-point</td>
                <td>3 (hai bên + trên/dưới)</td>
                <td>Kịch tính, áp đảo, siêu thực</td>
                <td>Nhìn lên tòa nhà, drone shot, tilted</td>
              </tr>
            </tbody>
          </table>
        </div>

        <hr className="doc-divider" />

        {/* 3.5 */}
        <h3 id="sec-3-5" className="scroll-mt-20">
          5. Vị trí theo chiều cao (Vertical position)
        </h3>

        <p>
          Trong bức ảnh cảnh quan, vật thể nằm cao hơn trong khung hình được đọc là &ldquo;xa hơn&rdquo; — vì trong thực tế, vật thể xa nằm gần đường chân trời hơn (cao hơn trong khung hình). Đây là lý do tại sao đường chân trời là mốc tham chiếu quan trọng nhất cho chiều sâu.
        </p>

        <hr className="doc-divider" />

        {/* 3.6 */}
        <h3 id="sec-3-6" className="scroll-mt-20">
          6. Gradient kết cấu (Texture gradient)
        </h3>

        <p>
          Kết cấu bề mặt (texture) chi tiết khi ở gần và mờ nhạt khi ở xa. Não bộ đọc sự giảm chi tiết kết cấu theo khoảng cách như manh mối chiều sâu — và đây là công cụ đặc biệt mạnh trong nhiếp ảnh macro và cảnh quan, nơi foreground có kết cấu rõ ràng và background mờ nhạt.
        </p>

        <div className="overflow-x-auto my-4 rounded-lg border border-[#1e1e2a]">
          <table className="doc-table">
            <thead>
              <tr>
                <th>Depth cue</th>
                <th>Cách hoạt động</th>
                <th>Mạnh nhất khi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Overlap</td>
                <td>Vật che = gần hơn</td>
                <td>Có foreground element rõ ràng</td>
              </tr>
              <tr>
                <td>Atmospheric</td>
                <td>Xa = mờ hơn, nhạt hơn</td>
                <td>Sương mù, chiều sâu lớn</td>
              </tr>
              <tr>
                <td>Size</td>
                <td>Nhỏ hơn = xa hơn</td>
                <td>Có vật thể tương đồng để so sánh</td>
              </tr>
              <tr>
                <td>Linear</td>
                <td>Đường thẳng hội tụ</td>
                <td>Kiến trúc, đường sá</td>
              </tr>
              <tr>
                <td>Vertical position</td>
                <td>Cao hơn = xa hơn</td>
                <td>Cảnh quan có đường chân trời</td>
              </tr>
              <tr>
                <td>Texture gradient</td>
                <td>Kết cấu giảm theo khoảng cách</td>
                <td>Fore-ground chi tiết, back-ground mờ</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ============================================================ */}
        {/* Visual Deconstruction Lab - Dunes Preset */}
        <VisualDeconstructionLab defaultPreset="dunes" />

        {/*  SECTION IV                                                   */}
        {/* ============================================================ */}
        <h2 id="sec-4" className="scroll-mt-20">
          <span className="section-num-elite section-num">Ⅳ</span>
          Không gian phẳng vs không gian sâu
        </h2>

        <hr className="doc-divider" />

        {/* 4.1 */}
        <h3 id="sec-4-1" className="scroll-mt-20">
          1. Khi nào dùng không gian phẳng
        </h3>

        <p>
          Flat space (không gian phẳng) là khi bức ảnh cố tình từ bỏ ảo giác chiều sâu — mọi phần tử dường như nằm trên cùng một mặt phẳng. Kỹ thuật này tạo ra cảm giác đồ họa, trang trí, và đôi khi là siêu thực.
        </p>

        <p>Sử dụng không gian phẳng khi:</p>
        <ul className="factor-list">
          <li>
            <strong>Muốn nhấn mạnh pattern và hình dạng:</strong> Khi chiều sâu bị triệt tiêu, hình dạng và màu sắc trở thành yếu tố thị giác duy nhất — và chúng nổi bật mạnh mẽ hơn.
          </li>
          <li>
            <strong>Muốn tạo cảm giác đồ họa:</strong> Ảnh có tính poster, graphic design, và pop art thường sử dụng flat space.
          </li>
          <li>
            <strong>Muốn tạo sự bí ẩn:</strong> Flat space loại bỏ manh mối chiều sâu — khiến người xem không thể xác định khoảng cách, tạo cảm giác bất định và kỳ lạ.
          </li>
        </ul>

        <p>
          Kỹ thuật tạo flat space: chụp mặt phẳng (tường, cửa sổ) thẳng góc, sử dụng tele lens nén phối cảnh, tránh foreground, và loại bỏ bóng đổ.
        </p>

        <hr className="doc-divider" />

        {/* 4.2 */}
        <h3 id="sec-4-2" className="scroll-mt-20">
          2. Khi nào dùng không gian sâu
        </h3>

        <p>
          Deep space (không gian sâu) là khi bức ảnh tận dụng tối đa các manh mối chiều sâu — tạo ảo giác ba chiều mạnh mẽ, khiến người xem cảm thấy có thể &ldquo;bước vào&rdquo; bức ảnh.
        </p>

        <p>Sử dụng không gian sâu khi:</p>
        <ul className="factor-list">
          <li>
            <strong>Muốn tạo trải nghiệm nhập vai:</strong> Ảnh cảnh quan, kiến trúc nội thất, và street photography thường cần deep space để người xem cảm thấy &ldquo;đang ở đó&rdquo;.
          </li>
          <li>
            <strong>Muốn kể chuyện không gian:</strong> Khi câu chuyện liên quan đến khoảng cách, hành trình, hoặc quy mô — deep space là bắt buộc.
          </li>
          <li>
            <strong>Muốn tạo awe và wonder:</strong> Cảm giác choáng ngợp trước thiên nhiên vĩ đại yêu cầu deep space — vì nó cho phép thể hiện cả foreground gần và background xa.
          </li>
        </ul>

        <div className="comparison-grid my-4">
          <div className="comp-card">
            <span className="sub-label">FLAT SPACE</span>
            <h4>Không gian phẳng</h4>
            <p>
              Tele lens (85-200mm), góc chụp thẳng, không foreground, depth of field nông, bóng đổ tối thiểu. Tạo cảm giác đồ họa, trang trí, siêu thực.
            </p>
          </div>
          <div className="comp-card" style={{ borderColor: '#22c55e44' }}>
            <span className="sub-label" style={{ color: '#22c55e', background: 'rgba(34,197,94,0.1)' }}>DEEP SPACE</span>
            <h4>Không gian sâu</h4>
            <p>
              Wide lens (14-35mm), foreground mạnh, background xa, depth of field sâu, overlap nhiều layer. Tạo cảm giác nhập vai, vĩ đại, trải nghiệm.
            </p>
          </div>
        </div>

        <div className="quote-block">
          <p>
            &ldquo;Không gian trong nhiếp ảnh không phải là thứ bạn tìm thấy — nó là thứ bạn tạo ra. Mỗi quyết định kỹ thuật — ống kính, góc chụp, khẩu độ — đều là quyết định về không gian.&rdquo;
          </p>
          <p className="quote-attr">— Stephen Shore, The Nature of Photographs</p>
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
              Negative space không phải là sự thiếu vắng — nó là không gian nơi cảm xúc nảy nở và trí tưởng tượng tham gia.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">02</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Figure-ground relationship quyết định cách người xem đọc bức ảnh — đường nét, tương phản, kích thước, và vị trí xác định figure vs ground.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">03</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Sự lưỡng nghĩa figure-ground (như Bình Ruben) buộc người xem nhìn hai lần — tạo sự tham gia sâu và thời gian xem lâu.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">04</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              &ldquo;Less is more&rdquo; có nền tảng thần kinh học — ít thông tin thị giác = chú ý tập trung hơn = ấn tượng sâu hơn.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">05</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Sáu depth cues: overlap, atmospheric perspective, size diminution, linear perspective, vertical position, texture gradient.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">06</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Flat space nhấn mạnh hình dạng và đồ họa; deep space tạo trải nghiệm nhập vai và vĩ đại.
            </p>
          </div>
          <div className="key-point">
            <div className="key-point-num">07</div>
            <p className="text-sm text-[#9d9db5] leading-relaxed">
              Mỗi quyết định kỹ thuật — ống kính, góc chụp, khẩu độ — đều là quyết định về không gian.
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
              Khoảng trống không phải là phần "trống" của ảnh — nó là phần <strong>"im lặng" chủ động</strong>. Cũng như âm nhạc không có phần dừng thì chỉ là tiếng ồn, ảnh không có negative space thì chỉ là thông tin chứ không phải cảm xúc. Trong 20 năm, tôi nhận ra rằng những tấm ảnh tôi yêu nhất đều có nhiều không khí hơn tôi nghĩ là "đủ." Sự dũng cảm để để trống không gian là dấu hiệu của sự chín muồi.
            </p>
          </div>
          <div className="callout callout-pitfall">
            <div className="callout-title">⚠ Bẫy chuyên gia</div>
            <p style={{ marginBottom: 0, lineHeight: 1.75 }}>
              <strong>Horror vacui</strong> — sợ chân không thị giác — là căn bệnh của người mới học. Cố điền đầy mọi góc của frame vì sợ "lãng phí không gian." Thực ra, không gian trống <em>là nội dung</em>. Nó tạo ra sự tương phản với chủ thể, nhịp thở cho người xem, và cảm xúc không thể giải thích. Luyện tập ngược lại: mỗi ngày chụp 1 ảnh mà khoảng trống chiếm hơn 70% frame.
            </p>
          </div>
          <div className="practice-exercise">
            <div className="practice-header">⬥ Bài tập thực chiến — Ba mức độ của không gian</div>
            <div className="practice-body">
              <p>Chụp cùng một chủ thể, 3 phiên bản với tỷ lệ khoảng trống khác nhau:</p>
              <ol className="practice-steps">
                <li><strong>80% chủ thể:</strong> Fill the frame — chủ thể chiếm gần hết khung hình. Cảm xúc: áp đảo, gần gũi, chi tiết.</li>
                <li><strong>50/50:</strong> Chủ thể và khoảng trống cân bằng. Cảm xúc: tương tác, đối thoại giữa chủ thể và môi trường.</li>
                <li><strong>20% chủ thể:</strong> Chủ thể nhỏ bé trong không gian rộng lớn. Mô tả cảm xúc bằng một từ: đơn độc? Tự do? Hòa tan? Câu trả lời của bạn chính là visual intuition của bạn.</li>
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
          <Link href="/hinh-dang" className="group nav-card">
            <div className="nav-card-label">← Bài trước</div>
            <div className="nav-card-title">5. Hình dạng hình khối</div>
            <div className="nav-card-desc">Ngôn ngữ thị giác</div>
          </Link>
          <Link href="/anh-sang" className="group nav-card text-right">
            <div className="nav-card-label">Bài tiếp →</div>
            <div className="nav-card-title">7. Ánh sáng bóng tối</div>
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

import { Link } from 'wouter';
import { ArrowLeft, ArrowRight, Compass, Sparkles } from 'lucide-react';
import DocsLayout from '@/components/docs-layout';

const tocSections = [
  { id: 'ba-cau-hoi', label: 'Ba câu hỏi nền tảng', level: 1 },
  { id: 'nam-insight', label: 'Năm insight lớn', level: 1 },
  { id: 'roadmap', label: 'Roadmap phát triển', level: 1 },
];

const insights = [
  'Mọi quyết định kỹ thuật là một quyết định ngữ nghĩa.',
  'Não người đọc ý định trước khi đánh giá kỹ thuật.',
  'Các nguyên lý thị giác đều vận hành bằng sự khác biệt và tương phản.',
  'Mục tiêu của việc học nguyên lý là biến chúng thành bản năng.',
  'Nhiếp ảnh, ở tầng sâu nhất, là thực hành của sự chú ý.',
];

export default function CourseSummaryPage() {
  return (
    <DocsLayout tocSections={tocSections}>
      <article className="course-summary max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-24 fade-in">
        <div className="course-kicker">Bản đồ ngôn ngữ thị giác</div>
        <h1>Từ kỹ thuật rời rạc đến một cách nhìn thống nhất.</h1>
        <p className="course-summary-lead">
          Trang này không lặp lại 19 bài học. Nó đặt chúng lên cùng một bản đồ để bạn thấy
          cách từng nguyên lý kết nối và cùng phục vụ một ý định thị giác.
        </p>

        <section id="ba-cau-hoi">
          <div className="course-section-heading">
            <div>
              <span className="course-section-label">Khung tư duy</span>
              <h2>Ba câu hỏi nền tảng</h2>
            </div>
          </div>
          <div className="summary-question-grid">
            <div><span>01</span><strong>Tại sao hình ảnh có sức mạnh?</strong><small>Bài 1-3 xây nền tảng.</small></div>
            <div><span>02</span><strong>Ngôn ngữ thị giác hoạt động thế nào?</strong><small>Bài 4-12 cung cấp từ vựng.</small></div>
            <div><span>03</span><strong>Làm sao tổ chức thành câu chuyện?</strong><small>Bài 13-19 tạo cấu trúc.</small></div>
          </div>
        </section>

        <section id="nam-insight" className="summary-insights">
          <div className="course-section-heading">
            <div>
              <span className="course-section-label">Điều cần mang theo</span>
              <h2>Năm insight lớn</h2>
            </div>
          </div>
          {insights.map((insight, index) => (
            <div className="summary-insight" key={insight}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{insight}</p>
            </div>
          ))}
        </section>

        <section id="roadmap" className="summary-roadmap">
          <div className="course-section-heading">
            <div>
              <span className="course-section-label">Roadmap phát triển</span>
              <h2>Kiến thức dần biến thành trực giác</h2>
            </div>
          </div>
          <div className="summary-roadmap-grid">
            <div><span>Giai đoạn 1</span><strong>Nhận thức có ý thức</strong><p>Bạn gọi tên và áp dụng từng nguyên lý một cách chủ động.</p></div>
            <div><span>Giai đoạn 2</span><strong>Nhận thức bán tự động</strong><p>Bạn ra quyết định đúng trước khi kịp giải thích vì sao.</p></div>
            <div><span>Giai đoạn 3</span><strong>Bản năng thị giác</strong><p>Bạn tập trung vào khoảnh khắc; nguyên lý âm thầm làm phần việc còn lại.</p></div>
          </div>
        </section>

        <div className="summary-closing">
          <Compass size={24} />
          <p>
            Biết đủ về ngôn ngữ thị giác để không còn phải nghĩ về nó,
            rồi dành toàn bộ sự chú ý cho điều bạn thực sự muốn nói.
          </p>
          <Sparkles size={20} />
        </div>

        <div className="summary-actions">
          <Link href="/khoa-hoc"><ArrowLeft size={15} /> Tổng quan khóa học</Link>
          <Link href="/">Bắt đầu bài 1 <ArrowRight size={15} /></Link>
        </div>
      </article>
    </DocsLayout>
  );
}

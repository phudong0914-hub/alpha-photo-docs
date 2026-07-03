import { Link } from 'wouter';
import {
  ArrowRight,
  BookOpen,
  Camera,
  Check,
  Eye,
  Layers,
  Palette,
  Sparkles,
} from 'lucide-react';
import DocsLayout from '@/components/docs-layout';

const tocSections = [
  { id: 'hanh-trinh', label: 'Hành trình học', level: 1 },
  { id: 'chuong-trinh', label: 'Cấu trúc chương trình', level: 1 },
  { id: 'cach-hoc', label: 'Cách học hiệu quả', level: 1 },
];

const chapters = [
  {
    number: '01',
    title: 'Nền tảng hình ảnh',
    description: 'Hiểu sức mạnh, mục đích và trách nhiệm văn hóa của người tạo hình ảnh.',
    lessons: 'Bài 1-3',
    href: '/',
    color: '#7c8aff',
    icon: Camera,
  },
  {
    number: '02',
    title: 'Ngôn ngữ thị giác',
    description: 'Làm chủ đường nét, hình dạng, không gian, ánh sáng, màu sắc và tương phản.',
    lessons: 'Bài 4-9',
    href: '/duong-net',
    color: '#ffcb6b',
    icon: Palette,
  },
  {
    number: '03',
    title: 'Chất liệu và tỷ lệ',
    description: 'Biến bề mặt, kích thước và bầu không khí thành ngôn ngữ cảm xúc.',
    lessons: 'Bài 10-12',
    href: '/chat-lieu',
    color: '#5ce0a0',
    icon: Layers,
  },
  {
    number: '04',
    title: 'Bố cục và góc nhìn',
    description: 'Tổ chức khung hình, vị trí máy ảnh, tiêu điểm và chiều sâu có chủ đích.',
    lessons: 'Bài 13-15',
    href: '/bo-cuc',
    color: '#a78bfa',
    icon: Eye,
  },
  {
    number: '05',
    title: 'Nguyên tắc vận hành',
    description: 'Kết nối nhịp điệu, cân bằng, phân cấp và thống nhất thành một visual voice.',
    lessons: 'Bài 16-19',
    href: '/nhip-dieu',
    color: '#fb7185',
    icon: Sparkles,
  },
];

function getProgress() {
  try {
    const readPages: string[] = JSON.parse(localStorage.getItem('alpha-doc-read') || '[]');
    return Math.min(new Set(readPages).size, 19);
  } catch {
    return 0;
  }
}

export default function CourseOverviewPage() {
  const completed = typeof window === 'undefined' ? 0 : getProgress();
  const progress = Math.round((completed / 19) * 100);

  return (
    <DocsLayout tocSections={tocSections}>
      <article className="course-overview max-w-5xl mx-auto px-4 sm:px-6 lg:px-10 py-10 pb-24 fade-in">
        <section className="course-hero ambient-glow">
          <div className="course-kicker">Khóa học ngôn ngữ thị giác</div>
          <h1>
            Học cách <span>nhìn</span>, trước khi học cách chụp.
          </h1>
          <p>
            Một hành trình 19 bài từ bản chất của hình ảnh đến visual voice cá nhân.
            Không chỉ học quy tắc, bạn học cách ra quyết định có chủ đích trong từng khung hình.
          </p>
          <div className="course-actions">
            <Link href="/" className="course-primary-action">
              {completed > 0 ? 'Tiếp tục hành trình' : 'Bắt đầu bài 1'}
              <ArrowRight size={16} />
            </Link>
            <Link href="/tong-ket" className="course-text-action">
              Xem bản đồ khóa học
            </Link>
          </div>
          <div className="course-progress" aria-label={`Đã hoàn thành ${completed} trên 19 bài`}>
            <div>
              <span>Tiến độ của bạn</span>
              <strong>{completed}/19 bài · {progress}%</strong>
            </div>
            <div className="course-progress-track">
              <div style={{ width: `${progress}%` }} />
            </div>
          </div>
        </section>

        <section id="hanh-trinh" className="course-manifesto">
          <div>
            <span className="course-section-label">Luận đề trung tâm</span>
            <h2>Mọi quyết định kỹ thuật đều là một quyết định về ý nghĩa.</h2>
          </div>
          <p>
            Chọn tiêu cự, ánh sáng, màu sắc hay khoảng trống không chỉ là thao tác máy ảnh.
            Mỗi lựa chọn thay đổi cách người xem cảm, hiểu và ghi nhớ câu chuyện.
          </p>
        </section>

        <section id="chuong-trinh" className="course-curriculum">
          <div className="course-section-heading">
            <div>
              <span className="course-section-label">Cấu trúc chương trình</span>
              <h2>Năm chặng, một hệ thống tư duy</h2>
            </div>
            <span>19 bài · đọc theo nhịp riêng</span>
          </div>
          <div className="course-chapter-list">
            {chapters.map((chapter) => {
              const Icon = chapter.icon;
              return (
                <Link href={chapter.href} className="course-chapter" key={chapter.number}>
                  <span className="course-chapter-number">{chapter.number}</span>
                  <span className="course-chapter-icon" style={{ color: chapter.color }}>
                    <Icon size={20} />
                  </span>
                  <span className="course-chapter-copy">
                    <strong>{chapter.title}</strong>
                    <small>{chapter.description}</small>
                  </span>
                  <span className="course-chapter-lessons">{chapter.lessons}</span>
                  <ArrowRight size={18} />
                </Link>
              );
            })}
          </div>
        </section>

        <section id="cach-hoc" className="course-study-grid">
          <div className="course-study-intro">
            <span className="course-section-label">Cách học hiệu quả</span>
            <h2>Đọc ít hơn. Quan sát lâu hơn.</h2>
            <p>
              Mỗi bài nên kết thúc bằng một buổi chụp hoặc một lần phân tích ảnh.
              Kiến thức chỉ trở thành bản năng khi được dùng để nhìn thế giới thật.
            </p>
          </div>
          <div className="course-study-steps">
            <div><BookOpen size={17} /><span><strong>Đọc</strong> một bài, ghi lại một ý chính.</span></div>
            <div><Eye size={17} /><span><strong>Quan sát</strong> nguyên lý đó trong 10 bức ảnh.</span></div>
            <div><Camera size={17} /><span><strong>Thực hành</strong> một buổi chụp chỉ với nguyên lý ấy.</span></div>
            <div><Check size={17} /><span><strong>Đánh dấu hoàn thành</strong> và chuyển sang bài tiếp theo.</span></div>
          </div>
        </section>
      </article>
    </DocsLayout>
  );
}

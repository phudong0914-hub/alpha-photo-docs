/**
 * VIDEO CONFIG — Cấu hình YouTube cho 19 bài học
 * ================================================
 * Khi có link YouTube mới, chỉ cần paste vào đây.
 * Format youtubeId: phần sau ?v= hoặc youtu.be/
 * Để null nếu video chưa có.
 */

export interface LessonVideo {
  youtubeId: string | null;
  title: string;
  description?: string;
}

export const lessonVideos: Record<string, LessonVideo> = {
  '/': {
    youtubeId: 'MOJG5SNg7Q4', // Bài 1 — Sức mạnh của hình ảnh
    title: 'Bài 1 — Sức mạnh của hình ảnh',
    description: 'Hiểu bản chất, cơ chế thần kinh và cách ứng dụng sức mạnh truyền tải của hình ảnh.',
  },
  '/muc-dich': {
    youtubeId: 'kCruxaSbQts', // Bài 2 — Mục đích nhiếp ảnh
    title: 'Bài 2 — Mục đích nhiếp ảnh',
    description: 'Định hình mục tiêu cốt lõi của tác phẩm.',
  },
  '/bieu-tuong': {
    youtubeId: 'JrW7hck7WvA', // Bài 3 — Ngôn ngữ biểu tượng
    title: 'Bài 3 — Ngôn ngữ biểu tượng',
    description: 'Giải mã cách lồng ghép các biểu tượng văn hóa và ẩn dụ thị giác.',
  },
  '/duong-net': {
    youtubeId: 'F1dEn-I7N_w', // Bài 4 — Đường nét
    title: 'Bài 4 — Đường nét (Line)',
    description: 'Dẫn dắt mắt người xem di chuyển qua hướng đi của đường nét.',
  },
  '/hinh-dang': {
    youtubeId: 'x0nRoiH7XI8', // Bài 5 — Hình dạng
    title: 'Bài 5 — Hình dạng (Shape)',
    description: 'Sử dụng hình tròn, vuông, tam giác để tạo cảm xúc thị giác.',
  },
  '/khong-gian': {
    youtubeId: '7A_NzSoG8R0', // Bài 6 — Không gian
    title: 'Bài 6 — Không gian (Space)',
    description: 'Thiết lập mối quan hệ giữa positive space và negative space.',
  },
  '/anh-sang': {
    youtubeId: 't5BuiEBZGgs', // Bài 7 — Ánh sáng
    title: 'Bài 7 — Ánh sáng (Light)',
    description: 'Điêu khắc khối, tạo bóng đổ và định hình kết cấu thế giới.',
  },
  '/mau-sac': {
    youtubeId: 'grx2b5fJj3k', // Bài 8 — Màu sắc
    title: 'Bài 8 — Màu sắc (Color)',
    description: 'Ứng dụng bánh xe màu sắc để khơi gợi trạng thái tâm lý.',
  },
  '/tuong-phan': {
    youtubeId: 'OtNESRtvJJ8', // Bài 9 — Tương phản
    title: 'Bài 9 — Tương phản (Contrast)',
    description: 'Tạo lực kéo thị giác mạnh mẽ qua tương phản sáng tối, nóng lạnh.',
  },
  '/chat-lieu': {
    youtubeId: 'LTPJtJEQkpE', // Bài 10 — Chất liệu
    title: 'Bài 10 — Chất liệu (Texture)',
    description: 'Đánh thức xúc giác người xem qua độ mịn, thô, gai góc của bề mặt.',
  },
  '/kich-thuoc': {
    youtubeId: 'uuJ0v-A-7TE', // Bài 11 — Tỷ lệ & Kích thước
    title: 'Bài 11 — Tỷ lệ & Kích thước',
    description: 'So sánh kích thước để nhấn mạnh sự vĩ đại hay bé nhỏ.',
  },
  '/bau-khong-khi': {
    youtubeId: 'G6wsDdsOm_c', // Bài 12 — Bầu không khí
    title: 'Bài 12 — Bầu không khí',
    description: 'Tổng hòa sương mù, khói, độ ẩm để tạo môi trường cảm xúc.',
  },
  '/bo-cuc': {
    youtubeId: 'XzZOa0jC5vM', // Bài 13 — Bố cục
    title: 'Bài 13 — Bố cục (Composition)',
    description: 'Sắp xếp trật tự các vật thể trong khung để tạo sự mạch lạc.',
  },
  '/goc-chup': {
    youtubeId: 'bh2NAlmy6uA', // Bài 14 — Góc chụp
    title: 'Bài 14 — Góc chụp (Camera Angle)',
    description: 'Thay đổi góc cao, thấp, ngang để thiết lập mối quan hệ quyền lực.',
  },
  '/tieu-diem': {
    youtubeId: 'hFjo-pHYers', // Bài 15 — Tiêu điểm
    title: 'Bài 15 — Tiêu điểm & Độ sâu',
    description: 'Điều phối độ nông sâu trường ảnh để cô lập chủ thể.',
  },
  '/nhip-dieu': {
    youtubeId: 'dXZ1cf-A5yw', // Bài 16 — Nhịp điệu
    title: 'Bài 16 — Nhịp điệu (Rhythm)',
    description: 'Lặp đi lặp lại các yếu tố thị giác để tạo giai điệu hình ảnh.',
  },
  '/can-bang': {
    youtubeId: 'gPQiyIbFqJM', // Bài 17 — Cân bằng
    title: 'Bài 17 — Cân bằng (Balance)',
    description: 'Phân bổ trọng lượng thị giác để tạo cân bằng đối xứng hay bất đối xứng.',
  },
  '/phan-cap': {
    youtubeId: 'UwGMi8HFVzA', // Bài 18 — Phân cấp
    title: 'Bài 18 — Phân cấp (Hierarchy)',
    description: 'Thiết lập yếu tố chính, phụ để dẫn dắt tuyến đọc ảnh mạch lạc.',
  },
  '/tinh-thong-nhat': {
    youtubeId: 'TS_L_U6aeto', // Bài 19 — Tính thống nhất
    title: 'Bài 19 — Tính thống nhất (Unity)',
    description: 'Tổng hợp toàn bộ ngôn ngữ thị giác thành một tác phẩm hoàn chỉnh.',
  },
};

export function getYouTubeEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&color=white`;
}

export function getYouTubeThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}

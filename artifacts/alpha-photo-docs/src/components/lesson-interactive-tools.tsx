import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HelpCircle, Check, X, Upload, Image as ImageIcon, Sparkles, 
  RotateCw, AlertCircle, ThumbsUp, CheckCircle2, ChevronRight, Eye
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Types & Interfaces                                                 */
/* ------------------------------------------------------------------ */
interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface SavedSubmission {
  imageUrl: string;
  fileName: string;
  fileSize: string;
  submittedAt: string;
  colors: string[];
  critique: {
    score: number;
    strengths: string[];
    weaknesses: string[];
    tips: string[];
  };
}

/* ------------------------------------------------------------------ */
/*  19 Lessons Quiz Database                                           */
/* ------------------------------------------------------------------ */
const quizDatabase: Record<string, QuizQuestion> = {
  '/': {
    question: "Tại sao hình ảnh có khả năng truyền tải cảm xúc nhanh và mạnh mẽ hơn ngôn ngữ viết?",
    options: [
      "Vì hình ảnh có tính chân thực tuyệt đối mà không ngôn từ nào có được.",
      "Vì não bộ xử lý thông tin thị giác song song (parallel) và kết nối trực tiếp với hệ viền (limbic system) kiểm soát cảm xúc.",
      "Vì hình ảnh dễ nhớ hơn chữ viết thông thường."
    ],
    correctIndex: 1,
    explanation: "Não bộ con người tiến hóa để xử lý hình ảnh tức thời ở vỏ não thị giác và truyền tín hiệu trực tiếp đến hệ viền (nơi điều khiển cảm xúc và ký ức) trước khi lý trí kịp phân tích ngôn từ."
  },
  '/muc-dich': {
    question: "Kỹ thuật 'Pre-visualization' (Hình dung trước) của huyền thoại Ansel Adams được định nghĩa là gì?",
    options: [
      "Chỉnh sửa hậu kỳ kỹ thuật số để đạt được độ tương phản mong muốn.",
      "Khả năng nhìn và hình dung rõ ràng bức ảnh thành phẩm trong tâm trí trước khi bấm máy.",
      "Việc khảo sát thực địa kỹ lưỡng vào nhiều khung giờ khác nhau."
    ],
    correctIndex: 1,
    explanation: "Pre-visualization là khả năng tư duy trước về sắc độ, tương phản và cảm xúc của bức ảnh cuối cùng ngay từ trước khi bấm nút chụp, giúp người chụp làm chủ hoàn toàn thiết bị thay vì ăn may."
  },
  '/bieu-tuong': {
    question: "Khái niệm 'Punctum' của nhà lý luận Roland Barthes có ý nghĩa gì trong phân tích ảnh?",
    options: [
      "Điểm lấy nét chính xác nhất trên chủ thể ảnh.",
      "Ý nghĩa lịch sử, bối cảnh văn hóa chung của bức ảnh mà ai cũng nhận ra.",
      "Chi tiết mang tính đột phá, chạm mạnh vào cảm xúc cá nhân của người xem một cách bất ngờ."
    ],
    correctIndex: 2,
    explanation: "Ngược với 'Studium' (thông tin chung), 'Punctum' là một điểm, một vết cắt, chi tiết bất ngờ trong bức ảnh chọc thủng cảm xúc của người xem và mang tính cá nhân hóa cao."
  },
  '/duong-net': {
    question: "Đường cong dạng chữ S (S-Curve) trong bố cục thường gợi lên cảm xúc thị giác nào?",
    options: [
      "Sự cứng cáp, vững chãi, nam tính và kỷ luật.",
      "Sự mềm mại, uyển chuyển, dẫn dắt mắt người xem đi sâu vào không gian ảnh một cách tự nhiên.",
      "Sự kịch tính, xung đột mạnh mẽ và căng thẳng tinh thần."
    ],
    correctIndex: 1,
    explanation: "Đường cong S-Curve tạo nhịp điệu uyển chuyển mềm mại, làm dịu mắt và tạo ra một hành trình thị giác dẫn dắt người xem khám phá chiều sâu không gian ảnh."
  },
  '/hinh-dang': {
    question: "Trong tâm lý học thị giác, hình tam giác hướng lên (đế nằm ngang) biểu thị điều gì?",
    options: [
      "Sự bất ổn định, chuyển động nhanh và kịch tính.",
      "Sự vững chãi, ổn định, định hướng và tính trật tự tôn ty.",
      "Sự tự do, vô tận và tuần hoàn khép kín."
    ],
    correctIndex: 1,
    explanation: "Nhờ phần đế rộng vững vàng hướng lên đỉnh nhọn, hình tam giác cân/đều biểu thị tính vững chãi, an toàn, đồng thời gợi cảm giác định hướng và phân cấp rõ ràng."
  },
  '/khong-gian': {
    question: "Việc mở rộng diện tích của 'Không gian âm' (Negative Space) xung quanh chủ thể nhằm mục đích gì?",
    options: [
      "Làm cho bố cục ảnh đỡ bị rối mắt khi in ấn.",
      "Tập trung tối đa sự chú ý vào chủ thể chính, khơi gợi cảm giác tĩnh lặng, cô đơn, tự tại hoặc tôn nghiêm.",
      "Tiết kiệm dung lượng lưu trữ của tệp ảnh."
    ],
    correctIndex: 1,
    explanation: "Không gian âm cô lập chủ thể khỏi những nhiễu loạn xung quanh, tạo khoảng thở cho mắt và khơi gợi mạnh mẽ cảm giác cô độc, trang nghiêm hoặc chiêm nghiệm sâu sắc."
  },
  '/anh-sang': {
    question: "Kỹ thuật ánh sáng tương phản mạnh 'Chiaroscuro' thường được áp dụng nhằm mục đích gì?",
    options: [
      "Chiếu sáng đều toàn bộ chủ thể để không bị mất chi tiết vùng tối.",
      "Khắc họa khối ba chiều mạnh mẽ và tăng tính kịch tính, huyền bí của câu chuyện thị giác.",
      "Giảm thiểu độ nhiễu hạt (noise) khi chụp trong điều kiện thiếu sáng."
    ],
    correctIndex: 1,
    explanation: "Chiaroscuro (Tương phản sáng tối cực đại) mượn từ hội họa thời Phục Hưng để điêu khắc khối, tạo chiều sâu 3D trên bề mặt phẳng và tạo ra bầu không khí kịch tính, bí ẩn."
  },
  '/mau-sac': {
    question: "Trong nhiếp ảnh và thiết kế chuyên nghiệp, quy tắc phân bổ màu sắc 60-30-10 được hiểu là gì?",
    options: [
      "60% vùng sáng, 30% vùng trung tính, 10% vùng tối.",
      "60% màu chủ đạo (dominant), 30% màu hỗ trợ (supporting), 10% màu nhấn (accent).",
      "60% tông màu ấm, 30% tông màu lạnh, 10% màu nhấn trung tính."
    ],
    correctIndex: 1,
    explanation: "Quy tắc 60-30-10 tạo ra sự hài hòa thị giác: 60% diện tích dành cho màu nền chính, 30% cho màu thứ cấp tạo cấu trúc, và 10% màu tương phản/nổi bật để thu hút điểm nhìn (accent)."
  },
  '/tuong-phan': {
    question: "Hiện tượng 'Tương phản đồng thời' (Simultaneous Contrast) xảy ra khi nào?",
    options: [
      "Khi ta chụp hai vật thể có kích thước chênh lệch lớn đặt cạnh nhau.",
      "Khi mắt ta tự động sinh ra màu sắc đối lập bao quanh vùng màu tiếp giáp, làm thay đổi nhận thức màu sắc thực tế.",
      "Khi chụp ảnh đen trắng với độ tương phản cực kỳ cao."
    ],
    correctIndex: 1,
    explanation: "Mắt và não bộ luôn tìm kiếm sự cân bằng trung tính. Khi nhìn một màu sắc nổi bật, hệ thống thị giác tự động kích thích màu bổ sắc xung quanh nó, làm cho màu xám bên cạnh trông như có ánh màu đối lập."
  },
  '/chat-lieu': {
    question: "Làm thế nào để nhấn mạnh chất liệu gồ ghề (như vỏ cây, nếp nhăn bề mặt) bằng ánh sáng?",
    options: [
      "Chiếu nguồn sáng trực diện mạnh mẽ từ phía trước (front light).",
      "Sử dụng ánh sáng ven hoặc ánh sáng xiên góc thấp (side/grazing light) tạo bóng đổ trên từng chi tiết nhỏ.",
      "Sử dụng nguồn sáng tán xạ cực kỳ dịu (soft light)."
    ],
    correctIndex: 1,
    explanation: "Ánh sáng xiên (side light) hoặc grazing light quét sát bề mặt sẽ tạo ra những bóng đổ siêu nhỏ sau từng hạt chi tiết, làm nổi bật chất liệu và đánh thức xúc giác của người xem."
  },
  '/kich-thuoc': {
    question: "Tại sao việc đưa một yếu tố quen thuộc (như con người, ngôi nhà) vào ảnh phong cảnh bao la lại quan trọng?",
    options: [
      "Để biến yếu tố đó thành chủ thể lớn nhất của bức ảnh.",
      "Để làm điểm mốc tham chiếu kích thước (scale reference), giúp người xem cảm nhận chân thực sự vĩ đại của không gian.",
      "Để bức ảnh phong cảnh bớt đơn điệu và trống trải."
    ],
    correctIndex: 1,
    explanation: "Một điểm mốc quen thuộc mà não bộ đã biết rõ kích thước thực tế giúp người xem lập tức so sánh và cảm nhận được quy mô khổng lồ của ngọn núi, sa mạc hay vách đá xung quanh."
  },
  '/bau-khong-khi': {
    question: "Thuật ngữ 'Stimmung' trong thẩm mỹ nhiếp ảnh được hiểu là gì?",
    options: [
      "Góc chụp máy nghiêng tạo sự bất ổn định kịch tính.",
      "Bầu không khí cảm xúc bao trùm tác phẩm, kết nối tâm trạng của người xem với môi trường trong ảnh.",
      "Độ nét gai góc cực hạn đạt được nhờ khép khẩu sâu."
    ],
    correctIndex: 1,
    explanation: "Stimmung chỉ bầu không khí tinh thần, một trạng thái cảm xúc vô hình nhưng đậm đặc (sương mù, ánh sáng nhạt, khói bụi) đồng điệu hóa tâm trí người xem với tác phẩm."
  },
  '/bo-cuc': {
    question: "Nguyên lý hoạt động cốt lõi của kỹ thuật 'Đóng khung trong khung' (Framing) là gì?",
    options: [
      "Sử dụng các khung gỗ trang trí nghệ thuật khi trưng bày tác phẩm.",
      "Sử dụng các yếu tố tự nhiên hoặc kiến trúc trong cảnh để bao quanh chủ thể, tập trung điểm nhìn và tạo chiều sâu lớp.",
      "Chụp ảnh theo định dạng hình vuông 1:1."
    ],
    correctIndex: 1,
    explanation: "Framing sử dụng các vật thể có sẵn như khung cửa, vòm cây, ô kính để chắn bớt chi tiết thừa, đóng hộp chủ thể chính, từ đó đẩy mắt người xem tập trung thẳng vào trung tâm câu chuyện."
  },
  '/goc-chup': {
    question: "Góc chụp từ dưới lên (Low Angle) thường tạo ra hiệu ứng tâm lý nào cho chủ thể?",
    options: [
      "Cảm giác cô đơn, nhỏ bé, dễ bị tổn thương và bị cô lập.",
      "Cảm giác quyền lực, vĩ đại, uy nghiêm, thống trị hoặc đe dọa.",
      "Cảm giác chân thực, khách quan và trung lập như mắt nhìn thông thường."
    ],
    correctIndex: 1,
    explanation: "Góc thấp (trục ống kính hướng lên) làm chủ thể trông cao lớn hơn, chiếm lĩnh bầu trời hoặc trần nhà, tạo ra tâm lý tôn sùng, kính sợ hoặc cảm giác quyền lực mạnh mẽ."
  },
  '/tieu-diem': {
    question: "Phương án nào sau đây KHÔNG góp phần làm giảm độ sâu trường ảnh (tăng độ xóa phông)?",
    options: [
      "Mở khẩu độ lớn hết cỡ (ví dụ f/1.4 hoặc f/1.8).",
      "Di chuyển ống kính máy ảnh lại gần chủ thể hơn.",
      "Khép khẩu độ nhỏ lại (ví dụ f/11 hoặc f/16)."
    ],
    correctIndex: 2,
    explanation: "Khép khẩu nhỏ (f/11 - f/16) sẽ kéo rộng vùng rõ nét từ tiền cảnh đến hậu cảnh (độ sâu trường ảnh lớn), ngược lại với mục đích xóa phông cô lập chủ thể."
  },
  '/nhip-dieu': {
    question: "Làm thế nào để tạo ra 'nhịp điệu động' (dynamic rhythm) cuốn hút trong khung ảnh?",
    options: [
      "Sắp xếp các cột vật thể song song đối xứng hoàn hảo.",
      "Thay đổi khoảng cách, kích thước hoặc màu sắc tăng giảm tuần tiến của các yếu tố lặp lại.",
      "Chụp ảnh một đối tượng đang di chuyển với tốc độ màn trập nhanh."
    ],
    correctIndex: 1,
    explanation: "Sự thay đổi có quy luật và gia tốc (tiến gần lại, nhỏ dần đi, đậm dần lên) phá vỡ tính đơn điệu của nhịp điệu tĩnh, mô phỏng chuyển động tự nhiên của âm nhạc hoặc sóng nước."
  },
  '/can-bang': {
    question: "Cân bằng bất đối xứng (Asymmetric Balance) đạt được bằng cách nào?",
    options: [
      "Đặt chủ thể chính vào chính giữa đường trục trung tâm của ảnh.",
      "Đặt một vật thể lớn (trọng lượng thị giác nặng) ở một bên và đối trọng nó bằng một vật thể nhỏ hơn ở khoảng cách xa hơn hoặc bằng không gian trống rộng lớn bên đối diện.",
      "Làm mờ hoàn toàn hậu cảnh để mắt không bị phân tán trọng lượng."
    ],
    correctIndex: 1,
    explanation: "Cân bằng bất đối xứng giống như đòn bẩy bập bênh: một vật nặng gần tâm được cân bằng bởi một vật nhẹ nằm xa tâm, tạo ra sự cân bằng năng động đầy tính thẩm mỹ mà không nhàm chán."
  },
  '/phan-cap': {
    question: "Tuyến đọc ảnh (Visual Path) của người xem thường bị thu hút đầu tiên bởi yếu tố nào?",
    options: [
      "Góc dưới cùng bên phải khung hình theo thói quen đọc sách.",
      "Khu vực có độ tương phản mạnh nhất, độ sắc nét cao nhất hoặc màu sắc rực rỡ nhất (yếu tố Dominant).",
      "Tâm hình học chính xác của bức ảnh."
    ],
    correctIndex: 1,
    explanation: "Mắt người là cỗ máy săn tìm sự bất thường. Điểm sáng nhất trên nền tối, điểm nét nhất trên nền mờ, hoặc màu đỏ nổi bật giữa rừng xanh sẽ luôn là điểm chạm đầu tiên (dominant) thiết lập phân cấp thị giác."
  },
  '/tinh-thong-nhat': {
    question: "Theo thuyết Gestalt, tính thống nhất (Unity) trong tác phẩm nhiếp ảnh đạt được khi nào?",
    options: [
      "Khi bức ảnh chứa đựng tối đa các chi tiết phức tạp để thể hiện kỹ thuật chụp.",
      "Khi mọi yếu tố thị giác liên kết chặt chẽ với nhau, khiến người xem cảm nhận tác phẩm như một chỉnh thể trọn vẹn thay vì các mảnh vụn rời rạc.",
      "Khi tất cả các vật thể trong bức ảnh đều có chung một màu sắc và hình dáng hình học."
    ],
    correctIndex: 1,
    explanation: "Tính thống nhất là cái đích cuối cùng: các yếu tố tương hỗ, lặp lại, cân bằng lẫn nhau tạo nên một thông điệp mạch lạc duy nhất, nơi mà việc bớt đi bất kỳ chi tiết nào cũng làm hỏng cấu trúc tác phẩm."
  }
};

/* ------------------------------------------------------------------ */
/*  AI Critique Templates Database                                     */
/* ------------------------------------------------------------------ */
interface CritiqueFeedback {
  score: number;
  strengths: string[];
  weaknesses: string[];
  tips: string[];
}

const generateAICritique = (pathname: string, fileName: string, dominantColors: string[]): CritiqueFeedback => {
  const score = Math.floor(Math.random() * 20) / 10 + 7.8; // Score between 7.8 and 9.8
  const colorLabels = dominantColors.map(c => `<span style="display:inline-block; width:12px; height:12px; border-radius:2px; background:${c}; margin-right:4px; vertical-align:middle;"></span><code>${c}</code>`).join(', ');

  const database: Record<string, Omit<CritiqueFeedback, 'score'>> = {
    '/': {
      strengths: [
        `Tác phẩm nộp dưới tên tệp "${fileName}" thể hiện khả năng nắm bắt cảm xúc thị giác tốt.`,
        `Hệ màu chủ đạo [${colorLabels}] tạo cảm giác hài hòa và thiết lập được bầu không khí tâm lý ban đầu cho người xem.`
      ],
      weaknesses: [
        "Độ sâu thông điệp có thể bị loãng do bố cục vùng biên chưa được tinh chỉnh kỹ.",
        "Các yếu tố gây nhiễu thị giác ở hậu cảnh làm giảm bớt tính 'Punctum' (sức mạnh chọc thủng cảm xúc) của tác phẩm."
      ],
      tips: [
        "Hãy thử tiến gần hơn hoặc crop chặt khung hình để loại bỏ 30% chi tiết không cần thiết.",
        "Tập trung tìm kiếm một chi tiết đắt giá mang tính ẩn dụ để tạo điểm nhấn sâu sắc hơn."
      ]
    },
    '/muc-dich': {
      strengths: [
        "Bức ảnh định hình rõ ràng mục đích giao tiếp thị giác, giúp người xem nhận diện được ngay câu chuyện.",
        "Áp dụng kỹ thuật Pre-visualization tương đối tốt, sự phân bổ ánh sáng chứng tỏ sự chủ động thiết lập thông số."
      ],
      weaknesses: [
        "Tuyến kể chuyện hơi bị tranh chấp giữa chủ thể và một yếu tố sáng màu ở góc khung hình.",
        "Độ tương phản chưa thực sự hỗ trợ cho mục đích biểu đạt chính."
      ],
      tips: [
        "Trước khi bấm máy, hãy tự hỏi: 'Đâu là yếu tố duy nhất tôi muốn kể?', sau đó dọn sạch các yếu tố khác.",
        "Hãy thử chuyển ảnh sang đen trắng để đánh giá xem cấu trúc ánh sáng có thực sự làm bật lên mục đích cốt lõi hay chưa."
      ]
    },
    '/bieu-tuong': {
      strengths: [
        "Tác phẩm chứa đựng yếu tố biểu đạt văn hóa và ẩn dụ thị giác rất thú vị.",
        "Sử dụng các gam màu [${colorLabels}] tạo nên một hệ thống biểu tượng gắn kết, gợi cảm xúc xưa cũ/hiện đại."
      ],
      weaknesses: [
        "Yếu tố ẩn dụ hơi trực diện, thiếu khoảng lặng để người xem suy ngẫm.",
        "Studium (thông tin nền) chiếm diện tích lớn nhưng chưa tương trợ cho Punctum của bức ảnh."
      ],
      tips: [
        "Hãy lồng ghép biểu tượng một cách gián tiếp qua bóng đổ, hình chiếu hoặc góc phản xạ.",
        "Nghiên cứu thêm các cặp màu mang tính đối thoại văn hóa để tạo chiều sâu tri thức."
      ]
    },
    '/duong-net': {
      strengths: [
        "Đường dẫn hướng (leading lines) hoạt động cực kỳ hiệu quả, hút mắt người xem đi thẳng vào vùng tiêu điểm.",
        "Sự giao thoa của các nét dựng tạo ra cấu trúc hình học vững chãi cho bố cục."
      ],
      weaknesses: [
        "Đường nét vùng biên hơi bị đứt gãy đột ngột, làm gián đoạn dòng chảy thị giác.",
        "Một vài đường chéo vô tình cắt ngang đầu hoặc chia đôi chủ thể chính gây cảm giác bất an không chủ đích."
      ],
      tips: [
        "Hãy di chuyển máy ảnh sang trái/phải vài cm để các đường nét hậu cảnh hội tụ mượt mà phía sau chủ thể.",
        "Tận dụng đường cong mềm mại để cân bằng lại các đường thẳng kiến trúc thô cứng."
      ]
    },
    '/hinh-dang': {
      strengths: [
        "Sử dụng cấu trúc hình học cực kỳ ấn tượng, sự phân bổ các hình khối tạo ra nhịp điệu đồ họa sắc nét.",
        "Khối tam giác/tròn trong tác phẩm neo giữ điểm nhìn của người xem rất vững vàng."
      ],
      weaknesses: [
        "Các đường viền hình khối bị lấn át bởi ánh sáng quá tán xạ làm mất đi tính sắc sảo của hình học.",
        "Bố cục hình khối hơi bị lệch tâm không chủ đích, làm giảm tính đối xứng đồ họa."
      ],
      tips: [
        "Khép khẩu sâu hoặc chọn ánh sáng có hướng rõ ràng để tạo đường biên khối sắc nét.",
        "Hãy thử chụp từ góc chính diện (flat-lay hoặc thẳng hàng) để tôn vinh tối đa hình dáng đồ họa của vật thể."
      ]
    },
    '/khong-gian': {
      strengths: [
        "Tận dụng không gian âm (Negative Space) rất xuất sắc, tạo ra khoảng thở rộng lớn và cảm xúc tĩnh lặng sâu lắng.",
        "Sự tương phản diện tích giữa chủ thể nhỏ và khoảng trống xung quanh tạo lực kéo thị giác tốt."
      ],
      weaknesses: [
        "Có một vài đốm nhiễu hạt hoặc chi tiết nhỏ vùng biên không gian âm làm giảm tính tinh khiết của khoảng trống.",
        "Tỷ lệ phân chia không gian âm và dương hơi gần mức 50/50, dễ gây cảm giác tranh chấp cân bằng."
      ],
      tips: [
        "Hãy dọn sạch các chi tiết rác ở góc khung hình hoặc hậu cảnh bằng cách crop hoặc xóa mờ.",
        "Đẩy tỷ lệ không gian âm lên 70% hoặc hơn để tăng tính tối giản và độ kịch tính của sự cô độc."
      ]
    },
    '/anh-sang': {
      strengths: [
        "Chất lượng ánh sáng tuyệt vời, sự chuyển tiếp giữa vùng sáng và vùng tối tạo khối 3D sống động.",
        "Hướng sáng xiên làm nổi bật kết cấu và đổ bóng sâu, mang lại tính điện ảnh cao cho tác phẩm."
      ],
      weaknesses: [
        "Vùng cháy sáng (highlight clip) làm mất chi tiết ở vùng quan trọng.",
        "Vùng tối sâu (crushed shadows) bị bết lại, không giữ được chi tiết chuyển tiếp tinh tế."
      ],
      tips: [
        "Đo sáng vào vùng sáng nhất để bảo vệ chi tiết, sau đó nâng nhẹ vùng tối khi hậu kỳ.",
        "Tận dụng tấm hắt sáng hoặc ánh sáng phản xạ từ tường để làm dịu các vùng bóng đổ quá gắt."
      ]
    },
    '/mau-sac': {
      strengths: [
        "Phối màu xuất sắc! Sự xuất hiện của các màu [${colorLabels}] tạo ra một hòa âm thị giác rất nịnh mắt.",
        "Sự bão hòa màu sắc được kiểm soát có chủ đích, không bị rực rỡ quá mức gây mỏi mắt."
      ],
      weaknesses: [
        "Sự tranh chấp giữa hai màu có cùng độ bão hòa làm mắt người xem bị phân tán điểm tập trung.",
        "Màu sắc hậu cảnh quá sặc sỡ lấn át màu sắc của chủ thể chính."
      ],
      tips: [
        "Áp dụng quy tắc 60-30-10: giữ màu nền trung tính, dồn màu rực rỡ nhất vào đúng 10% diện tích chủ thể.",
        "Sử dụng độ bão hòa thấp cho các vùng phụ xung quanh để tôn vinh màu sắc chủ đạo."
      ]
    },
    '/tuong-phan': {
      strengths: [
        "Tương phản bổ sắc/nóng lạnh hoạt động cực kỳ kịch tính, chủ thể tách biệt hoàn toàn khỏi nền.",
        "Hệ màu tương phản [${colorLabels}] tạo ra rung động thị giác mạnh mẽ, giữ chân người xem lâu hơn."
      ],
      weaknesses: [
        "Độ tương phản quá gắt làm bức ảnh trông thô ráp và thiếu đi các tông màu trung gian tinh tế.",
        "Tương phản diện tích chưa cân xứng, hai màu đối lập chiếm diện tích ngang nhau gây nhiễu loạn thị giác."
      ],
      tips: [
        "Hãy giảm diện tích của màu tương phản phụ xuống dạng một đốm nhỏ (ví dụ đốm đỏ nhỏ giữa không gian xanh rộng lớn) để tạo điểm nhấn đắt giá.",
        "Sử dụng ánh sáng dịu để làm mềm các vùng biên của sự tương phản màu sắc gắt."
      ]
    },
    '/chat-lieu': {
      strengths: [
        "Độ nổi khối bề mặt cực kỳ chân thực, gần như có thể cảm nhận bằng xúc giác qua lớp ảnh mịn/thô gồ ghề.",
        "Khả năng kiểm soát độ nét chi tiết nhỏ tốt, tạo hiệu ứng thị giác ấn tượng."
      ],
      weaknesses: [
        "Ánh sáng trực diện (front light) làm bẹt chất liệu, khiến bề mặt trông phẳng lì mất đi chiều sâu xúc giác.",
        "Độ nhiễu hạt (noise) kỹ thuật số bị nhầm lẫn với chất liệu tự nhiên của vật thể."
      ],
      tips: [
        "Chờ đợi góc sáng xiên thấp (ví dụ nắng cuối chiều) để đổ bóng dài sau từng nếp nhăn, thớ gỗ.",
        "Tiến sát hơn nữa (chụp macro) và khép khẩu ở mức tối ưu (f/5.6 - f/8) để đạt độ nét chi tiết cao nhất của ống kính."
      ]
    },
    '/kich-thuoc': {
      strengths: [
        "Thiết lập tỷ lệ và mốc tham chiếu kích thước rất thông minh.",
        "Tạo được cảm xúc thị giác mạnh mẽ về sự vĩ đại của thiên nhiên/kiến trúc so với con người."
      ],
      weaknesses: [
        "Mốc tham chiếu (chủ thể phụ) đặt quá gần hoặc quá xa góc, làm người xem khó tìm kiếm để so sánh kích thước.",
        "Tiêu cự ống kính chưa tối ưu hóa được sự ép nén không gian để làm nổi bật tỷ lệ."
      ],
      tips: [
        "Đặt mốc tham chiếu vào vị trí giao điểm 1/3 để mắt dễ dàng quét qua sau khi nhìn tổng thể không gian.",
        "Thử sử dụng ống kính tiêu cự dài (telephoto) từ xa để nén phối cảnh, làm cho tiền cảnh và hậu cảnh xích lại gần nhau, phóng đại sự tương quan kích thước."
      ]
    },
    '/bau-khong-khi': {
      strengths: [
        "Tác phẩm có một bầu không khí (Stimmung) cực kỳ đậm đặc và giàu chất thơ.",
        "Sự hòa trộn các tông màu [${colorLabels}] với khói/sương/ánh sáng tạo cảm giác hoài niệm và sâu lắng."
      ],
      weaknesses: [
        "Độ nét kỹ thuật số quá gai góc làm hỏng đi bầu không khí bảng lảng, mềm mại của khung cảnh.",
        "Hậu kỳ quá đà làm sai lệch màu sắc tự nhiên của bầu không khí nguyên bản."
      ],
      tips: [
        "Giảm bớt thanh Clarity (độ rõ nét) hoặc Sharpness khi hậu kỳ để giữ sự mơ màng cho sương khói.",
        "Chụp vào những ngày thời tiết đặc biệt (mưa, sương mù, nắng quái) thay vì những ngày nắng gắt giữa trưa."
      ]
    },
    '/bo-cuc': {
      strengths: [
        "Áp dụng nguyên tắc bố cục khung hình rất chỉn chu. Đường phân chia bố cục tự nhiên tạo cấu trúc vững vàng.",
        "Kỹ thuật Framing (Đóng khung trong khung) lồng ghép khéo léo tạo chiều sâu 3 lớp rõ rệt."
      ],
      weaknesses: [
        "Đường chân trời hoặc đường thẳng kiến trúc bị nghiêng nhẹ 1-2 độ không chủ đích, tạo cảm giác bất ổn thị giác.",
        "Chủ thể chính bị đặt sát mép khung hình quá mức mà không có không gian hướng nhìn hướng đi."
      ],
      tips: [
        "Luôn bật lưới Grid (lưới 1/3) trên kính ngắm máy ảnh để căn thẳng đường chân trời khi chụp.",
        "Để lại một khoảng trống rộng hơn ở phía trước hướng nhìn hoặc hướng di chuyển của chủ thể chính."
      ]
    },
    '/goc-chup': {
      strengths: [
        "Lựa chọn góc máy độc đáo mang lại điểm nhìn mới lạ, thoát khỏi góc nhìn ngang tầm mắt tầm thường.",
        "Sử dụng góc máy thấp/cao biểu thị rõ rệt tâm lý quyền lực/nhỏ bé của nhân vật trong ảnh."
      ],
      weaknesses: [
        "Độ méo hình học (distortion) ở góc rộng làm biến dạng khuôn mặt hoặc tỷ lệ cơ thể nhân vật một cách kỳ cục.",
        "Góc máy lấp lửng chưa đủ cực đoan để tạo ra sức nặng thị giác cần thiết."
      ],
      tips: [
        "Nếu chọn góc thấp, hãy mạnh dạn hạ máy sát mặt đất. Nếu chọn góc cao, hãy tìm điểm tựa hẳn trên cao để tạo góc nhìn mắt chim (bird-eye).",
        "Chú ý tránh đặt các đường thẳng kiến trúc nghiêng ngả trừ khi bạn muốn tạo góc Dutch Angle kịch tính hẳn."
      ]
    },
    '/tieu-diem': {
      strengths: [
        "Kiểm soát độ sâu trường ảnh tốt. Vùng rõ nét (chủ thể) nổi bật hoàn hảo trên nền xóa phông bokeh mịn màng.",
        "Tiền cảnh mờ nhòe được đưa vào khéo léo để dẫn mắt vào vùng nét chính."
      ],
      weaknesses: [
        "Điểm nét bị lệch nhẹ ra sau hoặc ra trước mắt của chủ thể chính (out-of-focus nhẹ).",
        "Xóa phông quá đà làm biến mất hoàn toàn thông tin bối cảnh hậu cảnh hữu ích."
      ],
      tips: [
        "Luôn ưu tiên lấy nét chính xác vào mắt của chủ thể khi chụp chân dung.",
        "Khép nhẹ khẩu lại f/2.8 - f/4 thay vì mở tối đa f/1.4 để giữ lại một chút hình dáng hậu cảnh làm bối cảnh cho câu chuyện."
      ]
    },
    '/nhip-dieu': {
      strengths: [
        "Sự lặp lại của các chi tiết thị giác tạo ra nhịp điệu hình ảnh cực kỳ vui mắt.",
        "Tìm thấy quy luật hình học lặp lại trong môi trường tự nhiên/kiến trúc rất tinh tế."
      ],
      weaknesses: [
        "Nhịp điệu bị phá vỡ bởi một chi tiết rác thừa thãi cắt ngang làm mất đi tính tuần hoàn.",
        "Nhịp điệu quá đều đặn tăm tắp gây cảm giác đơn điệu và thiếu đi 'nốt nhấn' (accent)."
      ],
      tips: [
        "Hãy tạo ra một điểm phá vỡ nhịp điệu (ví dụ: một hàng ghế màu trắng có duy nhất một chiếc màu đỏ) để thu hút điểm nhìn tức thì.",
        "Thay đổi góc chụp xiên để tạo nhịp điệu phối cảnh nhỏ dần đi về phía chân trời."
      ]
    },
    '/can-bang': {
      strengths: [
        "Bức ảnh đạt được trạng thái cân bằng rất dễ chịu. Trọng lượng thị giác được phân bổ thông minh.",
        "Tận dụng khoảng trống âm để đối trọng hoàn hảo với khối màu tối đậm của chủ thể."
      ],
      weaknesses: [
        "Bố cục đối xứng bị lệch nhẹ làm bức ảnh mất đi tính trang nghiêm của sự đối xứng nhưng lại chưa đủ lệch để tạo đối xứng động.",
        "Phần dưới ảnh quá nặng nề trong khi phần trên trống trải thiếu liên kết."
      ],
      tips: [
        "Nếu chọn bố cục đối xứng, hãy căn chỉnh chính xác đến từng mm. Nếu chọn bất đối xứng, hãy đẩy mạnh chủ thể về 1/3 và dùng khoảng trống đối trọng.",
        "Sử dụng các đám mây, bóng đổ hoặc chi tiết nhỏ ở góc đối diện để kéo lại thăng bằng thị giác cho khung hình."
      ]
    },
    '/phan-cap': {
      strengths: [
        "Phân cấp thị giác cực kỳ rõ ràng! Mắt người xem lập tức va vào chủ thể chính trước khi duyệt qua các chi tiết phụ.",
        "Sử dụng độ nét và màu sắc tương phản nổi bật để tạo điểm nhấn (dominant element) rất chủ động."
      ],
      weaknesses: [
        "Các yếu tố phụ (subordinate elements) quá sáng hoặc quá nét tranh chấp vị trí dẫn đầu với chủ thể chính.",
        "Tuyến đọc ảnh bị đứt đoạn, không có sự liên kết dẫn dắt tuần tự từ yếu tố chính sang yếu tố phụ."
      ],
      tips: [
        "Dùng hiệu ứng vignette tối nhẹ bốn góc hoặc dìm sáng hậu cảnh để hạ cấp các chi tiết phụ.",
        "Sử dụng đường nét dẫn hướng hoặc ánh mắt của chủ thể để chỉ lối cho mắt người xem di chuyển đến yếu tố phụ thứ hai."
      ]
    },
    '/tinh-thong-nhat': {
      strengths: [
        "Bức ảnh là một chỉnh thể nghệ thuật trọn vẹn! Sự tương hỗ giữa ánh sáng, màu sắc [${colorLabels}] và bố cục tạo nên tiếng nói chung mạnh mẽ.",
        "Không có chi tiết nào bị thừa thãi, mọi yếu tố đều phục vụ đắc lực cho thông điệp cốt lõi."
      ],
      weaknesses: [
        "Màu sắc hậu cảnh lạc tông so với hệ màu chủ đạo của tác phẩm làm đứt gãy tính thống nhất.",
        "Bố cục bị phân rã thành hai nửa độc lập không có mối liên kết hữu cơ nào."
      ],
      tips: [
        "Hãy kiểm soát bảng màu chặt chẽ khi chụp và hậu kỳ đồng bộ tông màu (color grading).",
        "Áp dụng lý thuyết Gestalt (sự gần gũi, sự tương đồng) để nhóm các vật thể rời rạc thành một cụm thống nhất."
      ]
    }
  };

  const template = database[pathname] || database['/'];
  
  return {
    score,
    strengths: template.strengths,
    weaknesses: template.weaknesses,
    tips: template.tips
  };
};

/* ------------------------------------------------------------------ */
/*  Main Component: LessonInteractiveTools                            */
/* ------------------------------------------------------------------ */
interface LessonInteractiveToolsProps {
  pathname: string;
}

export default function LessonInteractiveTools({ pathname }: LessonInteractiveToolsProps) {
  // We only show these tools on actual lesson pages (paths in our database)
  const isLessonPage = pathname in quizDatabase;
  if (!isLessonPage) return null;

  const currentQuiz = quizDatabase[pathname];

  // Quiz state
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizSaved, setQuizSaved] = useState<boolean>(false);

  // AI Reviewer state
  const [file, setFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState<boolean>(false);
  const [analysisStep, setAnalysisStep] = useState<number>(0);
  const [dominantColors, setDominantColors] = useState<string[]>([]);
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [submission, setSubmission] = useState<SavedSubmission | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const analysisSteps = [
    "Đang tải và chuẩn hóa tệp ảnh...",
    "Đang quét đường biên hình học & tương phản...",
    "Đang phân tích cấu trúc lưới bố cục & tiêu điểm...",
    "Đang trích xuất bảng màu dominant bằng Canvas...",
    "Đang tính toán điểm thẩm định AEO/GEO...",
    "Đang biên soạn báo cáo phân tích chuyên gia..."
  ];

  // Load saved states from localStorage on path change
  useEffect(() => {
    // Reset transient states
    setSelectedOption(null);
    setQuizSubmitted(false);
    setQuizSaved(false);
    setFile(null);
    setImageSrc(null);
    setAnalyzing(false);
    setAnalysisStep(0);
    setDominantColors([]);
    setSubmission(null);

    try {
      // Load quiz state
      const savedQuizzes = JSON.parse(localStorage.getItem('alpha-quiz-answers') || '{}');
      if (savedQuizzes[pathname] !== undefined) {
        setSelectedOption(savedQuizzes[pathname]);
        setQuizSubmitted(true);
        setQuizSaved(true);
      }

      // Load AI submission state
      const savedSubmissions = JSON.parse(localStorage.getItem('alpha-submissions') || '{}');
      if (savedSubmissions[pathname]) {
        setSubmission(savedSubmissions[pathname]);
      }
    } catch (e) {
      console.error("Failed to load state:", e);
    }
  }, [pathname]);

  // Handle Quiz submit
  const handleQuizSubmit = () => {
    if (selectedOption === null) return;
    setQuizSubmitted(true);
    try {
      const savedQuizzes = JSON.parse(localStorage.getItem('alpha-quiz-answers') || '{}');
      savedQuizzes[pathname] = selectedOption;
      localStorage.setItem('alpha-quiz-answers', JSON.stringify(savedQuizzes));
      setQuizSaved(true);
      
      // Mark page as read when quiz is completed
      const savedRead = localStorage.getItem('alpha-doc-read');
      const readPages: string[] = savedRead ? JSON.parse(savedRead) : [];
      if (!readPages.includes(pathname)) {
        const updated = [...readPages, pathname];
        localStorage.setItem('alpha-doc-read', JSON.stringify(updated));
        // Force header update by dispatching custom event
        window.dispatchEvent(new Event('storage'));
      }
    } catch (e) {}
  };

  // Extract color palette when image is loaded
  const extractColors = () => {
    if (!imageRef.current) return;
    const img = imageRef.current;
    
    // Create temporary canvas to get dominant colors
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = 100;
    canvas.height = 100;
    
    try {
      ctx.drawImage(img, 0, 0, 100, 100);
      const data = ctx.getImageData(0, 0, 100, 100).data;
      
      // Simple color clustering: pick 5 distinct sample pixels
      const colors: string[] = [];
      const steps = [12, 35, 58, 77, 92]; // non-uniform sampling coordinates
      
      steps.forEach(s => {
        const idx = s * 4;
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];
        const hex = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        if (!colors.includes(hex)) colors.push(hex);
      });
      
      // Fill remaining if duplicates
      while (colors.length < 5) {
        const randomIdx = Math.floor(Math.random() * (data.length / 4)) * 4;
        const hex = '#' + ((1 << 24) + (data[randomIdx] << 16) + (data[randomIdx+1] << 8) + data[randomIdx+2]).toString(16).slice(1);
        if (!colors.includes(hex)) colors.push(hex);
      }
      
      setDominantColors(colors.slice(0, 5));
    } catch (e) {
      // Fallback colors if tainted canvas cross-origin
      setDominantColors(['#7c8aff', '#ffcb6b', '#5ce0a0', '#a78bfa', '#fb7185']);
    }
  };

  // Handle image upload change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    
    const reader = new FileReader();
    reader.onload = (event) => {
      setImageSrc(event.target?.result as string);
    };
    reader.readAsDataURL(selectedFile);
    
    // Clear old submission transiently
    setSubmission(null);
  };

  // Trigger file dialog
  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  // Perform AI Image analysis (simulated sequence of checks)
  const startAnalysis = () => {
    if (!imageSrc || !file) return;
    
    setAnalyzing(true);
    setAnalysisStep(0);
    
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < analysisSteps.length) {
        setAnalysisStep(currentStep);
      } else {
        clearInterval(interval);
        
        // Finalize critique
        const extractedPalette = dominantColors.length > 0 ? dominantColors : ['#1e1e2d', '#2e2e3d', '#3e3e4d', '#4e4e5d', '#5e5e6d'];
        const critiqueFeedback = generateAICritique(pathname, file.name, extractedPalette);
        
        const sizeString = (file.size / 1024 / 1024).toFixed(2) + ' MB';
        
        const newSubmission: SavedSubmission = {
          imageUrl: imageSrc,
          fileName: file.name,
          fileSize: sizeString,
          submittedAt: new Date().toLocaleString("vi-VN"),
          colors: extractedPalette,
          critique: critiqueFeedback
        };
        
        // Save to localStorage
        try {
          const savedSubmissions = JSON.parse(localStorage.getItem('alpha-submissions') || '{}');
          savedSubmissions[pathname] = newSubmission;
          localStorage.setItem('alpha-submissions', JSON.stringify(savedSubmissions));
        } catch (err) {}
        
        setSubmission(newSubmission);
        setAnalyzing(false);
      }
    }, 1500); // 1.5 seconds per analysis step
  };

  // Clear submission
  const clearSubmission = () => {
    if (confirm("Bạn có chắc chắn muốn xóa bài thực hành này để nộp lại ảnh mới?")) {
      try {
        const savedSubmissions = JSON.parse(localStorage.getItem('alpha-submissions') || '{}');
        delete savedSubmissions[pathname];
        localStorage.setItem('alpha-submissions', JSON.stringify(savedSubmissions));
      } catch (e) {}
      setSubmission(null);
      setFile(null);
      setImageSrc(null);
      setDominantColors([]);
    }
  };

  return (
    <div className="mt-16 pt-12 border-t border-[rgba(255,255,255,0.06)] space-y-12">
      
      {/* ========================================================================== */}
      {/*  SECTION 1: MINI INTERACTIVE QUIZ                                           */}
      {/* ========================================================================== */}
      <section className="bg-[rgba(15,15,24,0.4)] rounded-2xl border border-[rgba(255,255,255,0.04)] p-6 md:p-8 relative overflow-hidden" style={{ backdropFilter: 'blur(20px)' }}>
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#7c8aff]/5 rounded-full blur-[40px] pointer-events-none" />
        
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#7c8aff]/10 flex items-center justify-center text-[#7c8aff] flex-shrink-0">
            <HelpCircle size={20} />
          </div>
          <div className="space-y-1 flex-1">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#7c8aff] font-mono">
              Thử thách củng cố lý thuyết
            </span>
            <h3 className="text-lg font-serif font-semibold text-slate-100 leading-snug">
              Kiểm tra nhanh nhãn quan của bạn
            </h3>
            <p className="text-xs text-[#6b6b80] mt-0.5 font-sans leading-relaxed">
              Trả lời đúng câu hỏi trắc nghiệm dưới đây để hoàn tất bài học này vào tiến trình cá nhân.
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <p className="text-sm font-medium text-slate-200 leading-relaxed font-serif pl-1">
            {currentQuiz.question}
          </p>

          <div className="space-y-2.5">
            {currentQuiz.options.map((option, index) => {
              const isSelected = selectedOption === index;
              const isCorrect = currentQuiz.correctIndex === index;
              
              let optionClass = "w-full text-left p-4 rounded-xl text-xs sm:text-sm font-sans border transition-all duration-300 relative flex items-start gap-3 cursor-pointer bg-white/[0.01] border-[rgba(255,255,255,0.05)] hover:bg-white/[0.03] hover:border-white/10 text-slate-300";
              
              if (quizSubmitted) {
                if (isCorrect) {
                  optionClass = "w-full text-left p-4 rounded-xl text-xs sm:text-sm font-sans border transition-all duration-300 relative flex items-start gap-3 bg-[rgba(92,224,160,0.06)] border-[rgba(92,224,160,0.2)] text-[#5ce0a0] font-medium";
                } else if (isSelected) {
                  optionClass = "w-full text-left p-4 rounded-xl text-xs sm:text-sm font-sans border transition-all duration-300 relative flex items-start gap-3 bg-[rgba(251,113,133,0.06)] border-[rgba(251,113,133,0.2)] text-[#fb7185]";
                } else {
                  optionClass = "w-full text-left p-4 rounded-xl text-xs sm:text-sm font-sans border transition-all duration-300 relative flex items-start gap-3 bg-transparent border-[rgba(255,255,255,0.02)] opacity-40 text-slate-500 cursor-not-allowed";
                }
              } else if (isSelected) {
                optionClass = "w-full text-left p-4 rounded-xl text-xs sm:text-sm font-sans border transition-all duration-300 relative flex items-start gap-3 bg-[rgba(124,138,255,0.06)] border-[#7c8aff]/50 text-[#7c8aff] font-medium shadow-[0_0_15px_rgba(124,138,255,0.05)]";
              }

              return (
                <button
                  key={index}
                  className={optionClass}
                  disabled={quizSubmitted}
                  onClick={() => setSelectedOption(index)}
                >
                  <span className="w-5 h-5 rounded-lg border border-current/20 flex items-center justify-center font-mono text-xs flex-shrink-0 mt-0.5">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="flex-1 leading-relaxed">{option}</span>
                  {quizSubmitted && isCorrect && (
                    <CheckCircle2 size={16} className="text-[#5ce0a0] flex-shrink-0 mt-0.5 ml-auto" />
                  )}
                  {quizSubmitted && isSelected && !isCorrect && (
                    <X size={16} className="text-[#fb7185] flex-shrink-0 mt-0.5 ml-auto" />
                  )}
                </button>
              );
            })}
          </div>

          <AnimatePresence>
            {!quizSubmitted && selectedOption !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="pt-2 flex justify-end"
              >
                <button
                  onClick={handleQuizSubmit}
                  className="px-5 py-2.5 rounded-lg bg-[#7c8aff] text-slate-900 font-sans font-semibold text-xs transition-transform duration-300 hover:scale-[1.03] cursor-pointer"
                >
                  Gửi câu trả lời
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {quizSubmitted && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 p-4 rounded-xl border border-[rgba(255,255,255,0.04)] bg-white/[0.01] space-y-2 overflow-hidden"
              >
                <div className="flex items-center gap-2 text-[#7c8aff] font-mono text-[10px] font-semibold uppercase tracking-wider">
                  <Sparkles size={12} />
                  <span>Giải thích chuyên sâu</span>
                </div>
                <p className="text-xs sm:text-sm text-[#9a9ab0] leading-relaxed">
                  {currentQuiz.explanation}
                </p>
                {selectedOption === currentQuiz.correctIndex ? (
                  <div className="pt-2 flex items-center gap-1.5 text-[#5ce0a0] text-xs font-semibold">
                    <ThumbsUp size={13} />
                    <span>Chính xác! Tiến trình bài học đã được tự động lưu.</span>
                  </div>
                ) : (
                  <div className="pt-2 flex items-center gap-1.5 text-[#ffcb6b] text-xs font-semibold">
                    <AlertCircle size={13} />
                    <span>Sai một ly đi một dặm, nhưng không sao! Hãy đọc kỹ giải thích phía trên.</span>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ========================================================================== */}
      {/*  SECTION 2: AI REVIEWER & PRACTICE SUBMISSION                             */}
      {/* ========================================================================== */}
      <section className="bg-[rgba(15,15,24,0.4)] rounded-2xl border border-[rgba(255,255,255,0.04)] p-6 md:p-8 relative overflow-hidden" style={{ backdropFilter: 'blur(20px)' }}>
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#5ce0a0]/5 rounded-full blur-[40px] pointer-events-none" />

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#5ce0a0]/10 flex items-center justify-center text-[#5ce0a0] flex-shrink-0">
            <Sparkles size={20} />
          </div>
          <div className="space-y-1 flex-1">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#5ce0a0] font-mono">
              Phòng Lab Thẩm Định Tác Phẩm
            </span>
            <h3 className="text-lg font-serif font-semibold text-slate-100 leading-snug">
              Nộp bài thực hành & AI Mentor Phân tích
            </h3>
            <p className="text-xs text-[#6b6b80] mt-0.5 font-sans leading-relaxed">
              Tải lên tác phẩm chụp thực hành của bạn. AI Mentor sẽ quét và đưa ra báo cáo phân tích thẩm định chi tiết theo chủ đề của bài học hiện tại.
            </p>
          </div>
        </div>

        {/* Input hidden */}
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept="image/*" 
          className="hidden" 
        />

        {/* Submission UI states */}
        <div className="mt-8">
          
          {/* STATE 1: Uploader placeholder */}
          {!imageSrc && !submission && (
            <div 
              onClick={triggerFileSelect}
              className="border-2 border-dashed border-[rgba(255,255,255,0.08)] hover:border-[#5ce0a0]/40 rounded-xl p-8 text-center cursor-pointer transition-all duration-300 group hover:bg-white/[0.01]"
            >
              <Upload size={32} className="mx-auto text-[#5a5a72] group-hover:text-[#5ce0a0] transition-colors mb-3" />
              <p className="text-sm font-semibold text-slate-200">Chọn ảnh chụp thực hành của bạn</p>
              <p className="text-xs text-[#5a5a72] mt-1">Hỗ trợ định dạng JPG, PNG. Dung lượng tối đa 10MB.</p>
            </div>
          )}

          {/* STATE 2: Image loaded but not analyzed */}
          {imageSrc && !analyzing && !submission && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div className="relative rounded-xl overflow-hidden border border-[rgba(255,255,255,0.06)] bg-black/40">
                <img 
                  ref={imageRef}
                  src={imageSrc} 
                  alt="Ảnh chuẩn bị phân tích" 
                  className="w-full h-auto object-contain max-h-[350px] mx-auto"
                  onLoad={extractColors}
                />
                
                {/* Rules of thirds grid overlay */}
                {showGrid && (
                  <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none opacity-30">
                    <div className="border-r border-b border-white border-dashed" />
                    <div className="border-r border-b border-white border-dashed" />
                    <div className="border-b border-white border-dashed" />
                    <div className="border-r border-b border-white border-dashed" />
                    <div className="border-r border-b border-white border-dashed" />
                    <div className="border-b border-white border-dashed" />
                    <div className="border-r border-white border-dashed" />
                    <div className="border-r border-white border-dashed" />
                    <div className="bg-transparent" />
                  </div>
                )}

                <button
                  onClick={() => setShowGrid(!showGrid)}
                  className="absolute bottom-3 right-3 px-2 py-1 rounded bg-black/60 hover:bg-black/80 text-[10px] font-mono text-slate-300 flex items-center gap-1 border border-white/10"
                >
                  <Eye size={10} />
                  <span>{showGrid ? "Ẩn lưới 1/3" : "Hiện lưới 1/3"}</span>
                </button>
              </div>

              <div className="space-y-5">
                <div className="p-4 rounded-xl bg-white/[0.01] border border-[rgba(255,255,255,0.04)] space-y-2">
                  <p className="text-xs text-[#5a5a72] font-mono uppercase tracking-wider">Thông tin tệp tin</p>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-slate-200 truncate">{file?.name}</p>
                    <p className="text-xs text-[#6b6b80]">Kích thước: {file ? (file.size / 1024 / 1024).toFixed(2) + ' MB' : ''}</p>
                  </div>
                </div>

                {dominantColors.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs text-[#5a5a72] font-mono uppercase tracking-wider pl-1">Bảng màu dominant trích xuất</p>
                    <div className="flex gap-2">
                      {dominantColors.map((color, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center gap-1.5">
                          <div className="w-full h-8 rounded-lg shadow-inner border border-white/5" style={{ backgroundColor: color }} />
                          <span className="text-[10px] font-mono text-[#5a5a72]">{color}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => { setFile(null); setImageSrc(null); setDominantColors([]); }}
                    className="flex-1 py-3 rounded-lg border border-[rgba(255,255,255,0.06)] bg-transparent hover:bg-white/[0.02] text-xs font-semibold text-slate-300 cursor-pointer"
                  >
                    Chọn ảnh khác
                  </button>
                  <button
                    onClick={startAnalysis}
                    className="flex-1 py-3 rounded-lg bg-[#5ce0a0] text-slate-900 text-xs font-semibold transition-transform duration-300 hover:scale-[1.02] flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles size={13} />
                    <span>Bắt đầu phân tích AI</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STATE 3: Analyzing progress state */}
          {analyzing && (
            <div className="p-10 text-center space-y-6 max-w-md mx-auto">
              <div className="relative w-16 h-16 mx-auto">
                <div className="absolute inset-0 rounded-full border-2 border-[#5ce0a0]/20" />
                <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#5ce0a0] animate-spin" />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-semibold text-slate-200 animate-pulse">
                  {analysisSteps[analysisStep]}
                </p>
                <div className="w-full h-1 bg-[rgba(255,255,255,0.04)] rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-[#5ce0a0]" 
                    initial={{ width: '0%' }}
                    animate={{ width: `${((analysisStep + 1) / analysisSteps.length) * 100}%` }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* STATE 4: Analyzed feedback report */}
          {submission && (
            <div className="space-y-8 fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                
                {/* Left column: Image preview with metadata card */}
                <div className="space-y-4">
                  <div className="relative rounded-xl overflow-hidden border border-[rgba(255,255,255,0.06)] bg-black/40 shadow-xl">
                    <img 
                      src={submission.imageUrl} 
                      alt="Ảnh thực hành học viên" 
                      className="w-full h-auto object-contain max-h-[380px] mx-auto"
                    />
                    {showGrid && (
                      <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none opacity-30">
                        <div className="border-r border-b border-white border-dashed" />
                        <div className="border-r border-b border-white border-dashed" />
                        <div className="border-b border-white border-dashed" />
                        <div className="border-r border-b border-white border-dashed" />
                        <div className="border-r border-b border-white border-dashed" />
                        <div className="border-b border-white border-dashed" />
                        <div className="border-r border-white border-dashed" />
                        <div className="border-r border-white border-dashed" />
                        <div className="bg-transparent" />
                      </div>
                    )}
                    <button
                      onClick={() => setShowGrid(!showGrid)}
                      className="absolute bottom-3 right-3 px-2 py-1 rounded bg-black/60 hover:bg-black/80 text-[10px] font-mono text-slate-300 flex items-center gap-1 border border-white/10"
                    >
                      <Eye size={10} />
                      <span>{showGrid ? "Ẩn lưới 1/3" : "Hiện lưới 1/3"}</span>
                    </button>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.01] border border-[rgba(255,255,255,0.04)] text-xs space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[#5a5a72]">Thời điểm nộp:</span>
                      <span className="font-mono text-slate-300">{submission.submittedAt}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#5a5a72]">Tên tệp tin:</span>
                      <span className="font-semibold text-slate-300 max-w-[180px] truncate">{submission.fileName}</span>
                    </div>
                    <div className="flex items-center justify-between border-t border-white/[0.03] pt-2">
                      <span className="text-[#5a5a72]">Bảng màu dominant:</span>
                      <div className="flex gap-1.5">
                        {submission.colors.map((c, i) => (
                          <div 
                            key={i} 
                            className="w-4 h-4 rounded-full border border-white/20 shadow-sm" 
                            style={{ backgroundColor: c }}
                            title={c}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={clearSubmission}
                    className="w-full py-2.5 rounded-lg border border-[rgba(251,113,133,0.2)] bg-transparent hover:bg-[#fb7185]/5 text-xs font-semibold text-[#fb7185] transition-colors cursor-pointer"
                  >
                    Xóa & nộp ảnh thực hành mới
                  </button>
                </div>

                {/* Right column: AI Mentor Report */}
                <div className="space-y-6">
                  {/* Score badge & header */}
                  <div className="flex items-center justify-between border-b border-white/[0.05] pb-4">
                    <div>
                      <div className="flex items-center gap-1 text-[#5ce0a0] font-mono text-[10px] font-bold uppercase tracking-wider">
                        <Check size={12} />
                        <span>Thẩm định hoàn tất</span>
                      </div>
                      <h4 className="text-base font-serif font-semibold text-slate-200 mt-1">
                        Báo cáo từ AI Visual Mentor
                      </h4>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-[#5a5a72] font-mono uppercase">Điểm AEO</div>
                      <div className="text-2xl font-bold font-mono text-[#5ce0a0] leading-none mt-1">
                        {submission.critique.score.toFixed(1)}<span className="text-xs text-[#5a5a72]">/10</span>
                      </div>
                    </div>
                  </div>

                  {/* Strengths */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-slate-300 text-xs font-bold font-sans">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#5ce0a0]" />
                      <span>Ưu điểm nổi bật (Strengths)</span>
                    </div>
                    <ul className="space-y-2 pl-3">
                      {submission.critique.strengths.map((str, i) => (
                        <li key={i} className="text-xs sm:text-sm text-[#9a9ab0] leading-relaxed flex items-start gap-2">
                          <ChevronRight size={14} className="text-[#5ce0a0] flex-shrink-0 mt-0.5" />
                          <span dangerouslySetInnerHTML={{ __html: str }} />
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Weaknesses */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-slate-300 text-xs font-bold font-sans">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#ffcb6b]" />
                      <span>Điểm cần cải thiện (Weaknesses)</span>
                    </div>
                    <ul className="space-y-2 pl-3">
                      {submission.critique.weaknesses.map((weak, i) => (
                        <li key={i} className="text-xs sm:text-sm text-[#9a9ab0] leading-relaxed flex items-start gap-2">
                          <ChevronRight size={14} className="text-[#ffcb6b] flex-shrink-0 mt-0.5" />
                          <span>{weak}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actionable Tips */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-slate-300 text-xs font-bold font-sans">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#7c8aff]" />
                      <span>Gợi ý thực hành tiếp theo (Next Steps)</span>
                    </div>
                    <ul className="space-y-2 pl-3">
                      {submission.critique.tips.map((tip, i) => (
                        <li key={i} className="text-xs sm:text-sm text-[#9a9ab0] leading-relaxed flex items-start gap-2">
                          <ChevronRight size={14} className="text-[#7c8aff] flex-shrink-0 mt-0.5" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </div>
            </div>
          )}

        </div>
      </section>

    </div>
  );
}

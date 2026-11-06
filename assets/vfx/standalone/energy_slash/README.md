# Chém Năng Lượng (Energy Slash)

Nguồn: ảnh GIF lấy từ link tìm kiếm Bing (file gốc
trên i.pinimg.com), 960×640, 58 frame, 25 fps
(40 ms/frame), 2,32 giây.

## Nội dung

- Pack lấy **41 frame, 1,64 giây, giữ đúng 25 fps
  thật của GIF gốc** (không lấy 17 frame cuối —
  xem lý do bên dưới).
- Diễn biến: vệt chém mỏng bay vào từ trái → nở
  thành các đường chém chéo hình chữ X (cam/vàng/
  trắng, điểm xanh dương) → xoáy thành nút rồi
  quét thành 1 cung chém lớn ngang khung hình →
  mờ dần rồi tắt.
- Kích thước pixel: **192×128** (toàn khung).
- Hướng hiệu ứng: chém ngang, cung quét từ trái
  sang phải, gần như phủ hết chiều ngang khung.

## Cách làm (theo chuẩn mới, convert 2D pixel)

- **Pixel trước, tách nền sau:** xuống pixel bằng
  NEAREST trước cho ra ô vuông cứng, rồi mới tách
  nền trên ảnh pixel. **Không mờ alpha** — các
  đường chém đều là bậc thang pixel cứng, liền
  mạch, không đứt nét.
- **Nền phẳng tuyệt đối:** nền gốc là màu xám phẳng
  (51,51,51), đã kiểm chứng giống hệt nhau ở mọi
  frame (độ lệch bằng 0) nên trừ nền bằng đúng màu
  đó. Alpha = 0 khi lệch dưới 10, đủ khi lệch trên
  100. Đã đo kiểm: góc khung hình bằng 0 ở mọi
  frame mẫu (trừ 1 điểm sáng mờ ở góc trên-phải
  frame 36 — đó là đầu cung chém quét tới mép
  khung, là hiệu ứng thật, không phải nền rò).
- **Vệt chém mảnh được giữ liền:** các đường chém
  gốc chỉ dày vài điểm ảnh, xuống pixel 5x rất dễ
  rớt thành nét đứt nên vùng lệch được giãn nhẹ
  2px ở độ phân giải gốc trước khi xuống pixel —
  nhờ vậy đường chém vẫn liền 1–2px ở bản pixel.
- **Watermark:** ảnh gốc có chữ nhỏ ở giữa-dưới
  khung hình, tĩnh suốt video. Vùng chữ không có
  hiệu ứng chạm tới (hiệu ứng cao nhất tới y 585,
  chữ ở y 623–636) nên em ép alpha = 0 trong vùng
  chữ — đã đo kiểm: alpha bằng 0 ở mọi frame mẫu.
- **17 frame cuối bị cắt:** frame 42–58 của GIF gốc
  là đuôi tĩnh hoàn toàn (đã kiểm chứng: frame 42,
  43, 58 giống hệt nhau từng điểm ảnh, không có
  chuyển động) nên pack chỉ lấy tới frame 41, lúc
  cung chém vừa mờ dần xong. Giữ 17 frame tĩnh đó
  chỉ làm skill bị đứng hình 0,68 giây cuối.
- **Không dùng ảnh nền lấy từ đuôi:** đuôi GIF có
  1144 điểm ảnh tĩnh ở góc trên-phải (x 420–935,
  y 72–215) là phần còn sót của frame 41 do cách
  nén GIF, không phải hiệu ứng — nếu trừ nền bằng
  ảnh nền từ đuôi thì 1144 điểm đó sẽ thành bóng
  ma ở mọi frame trước. Dùng nền phẳng (51,51,51)
  thì không có nguy cơ này.

## File trong pack

- `frames/frame_001.png` … `frame_041.png` — PNG RGBA
  trong suốt, 192×128
- `atlas.png` — bảng ghép 7×6 (1344×768)
- `frames.json` — danh sách frame, fps, kích thước
- `preview.gif` — xem trước 576×384 (phóng 3x bằng
  NEAREST cho rõ ô pixel), 25 fps, 41 frame
  (GIF chỉ có alpha 1 bit: ngưỡng 64; bản PNG giữ
  đủ alpha)

## Gợi ý dùng trong Godot

- Chạy đúng 25 fps (40 ms/frame).
- Nên dùng Additive blending: chém năng lượng sáng
  trên nền tối sẽ rực và đúng chất anime nhất với
  Additive; Normal cũng dùng được nếu muốn giữ màu
  gốc trầm hơn.
- Anchor ở tâm nếu gắn vào nhân vật khi chém, hoặc
  ở mép trái nếu gắn vào điểm bắt đầu của cung quét.

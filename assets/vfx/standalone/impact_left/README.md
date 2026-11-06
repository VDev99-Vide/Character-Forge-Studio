# Va Chạm Trái (Impact Left)

Nguồn: ảnh GIF lấy từ link tìm kiếm Bing (file gốc
trên img.itch.zone), 1920×1080, 13 frame, 20 fps
(50 ms/frame). Bản này là hiệu ứng BÊN TRÁI trong
GIF (GIF có 2 hiệu ứng chạy song song trái/phải).
Giữ nguyên pixel gốc, không convert lại, chỉ xóa
phông nền.

## Nội dung

- Pack lấy **trọn bộ 13 frame, 0,65 giây, giữ đúng
  20 fps thật của GIF gốc**.
- Diễn biến: vụ va chạm vàng ở đỉnh (có vòng tròn
  và tia sáng ngang) → vỡ thành lửa cam rồi tàn
  dần gần như biến mất (frame 9 chỉ còn 1 chấm) →
  2 frame trống hoàn toàn (10–11) → đạn năng lượng
  xanh dương bay ngang (frame 12) → đạn chớp trắng
  (frame 13, GIF kết thúc tại đây).
- Kích thước: **790×600** (giữ nguyên độ phân giải
  gốc, không thu nhỏ — anh thu nhỏ trong Godot
  nếu cần).
- Neo: tâm vụ va chạm, giữ nguyên vị trí mọi frame.

## Cách tách

- GIF gốc có 2 hiệu ứng song song (trái và phải),
  cách nhau 1 khoảng trống nên em tách theo vị trí:
  bản này lấy nửa trái (x 110–900). Khoảng trống
  giữa 2 hiệu ứng không có điểm ảnh nào nên không
  mất gì, không lẫn hiệu ứng bên phải.
- Nền gốc là màu phẳng (34,28,26) nên tách nền
  bằng khóa màu chính xác: điểm ảnh bằng đúng màu
  nền → trong suốt, còn lại giữ nguyên 100% (alpha
  chỉ có 0 hoặc 255, không mờ).
- Lưu ý: 2 frame trống giữa pack (10–11) là nhịp
  nghỉ của GIF gốc, em giữ nguyên. Nếu anh chỉ
  muốn 1 lần va chạm thì lấy frame 1–9; còn frame
  12–13 dùng riêng được làm chớp đạn + chớp trắng
  khi trúng đích.

## File trong pack

- `frames/frame_001.png` … `frame_013.png` — PNG RGBA
  trong suốt, 790×600
- `atlas.png` — bảng ghép 4×4 (3160×2400)
- `frames.json` — danh sách frame, fps, kích thước
- `preview.gif` — xem trước đúng kích thước gốc,
  20 fps, 13 frame

## Gợi ý dùng trong Godot

- Chạy đúng 20 fps (50 ms/frame).
- Nên dùng Normal blending (vụ nổ có màu đặc).
- Anchor ở tâm vụ va chạm.

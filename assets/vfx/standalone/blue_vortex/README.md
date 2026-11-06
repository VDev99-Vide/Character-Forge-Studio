# Xoáy Nước Xanh (Blue Vortex)

Nguồn: ảnh GIF lấy từ link tìm kiếm Bing (file gốc
trên img.itch.zone), 1920×1080, 31 frame, 20 fps
(50 ms/frame). Bản này là 1 trong 2 hiệu ứng tách
ra từ GIF đó (hiệu ứng còn lại là cột sáng hồng).
Giữ nguyên pixel gốc, không convert lại.

## Nội dung

- Pack lấy **trọn bộ 31 frame, 1,55 giây, giữ đúng
  20 fps thật của GIF gốc**.
- Diễn biến (thứ tự đã sắp lại cho đúng chu kỳ
  kỹ năng, xem phần dưới): tia lửa vàng → sợi
  sáng trắng → tia sét hồng quanh lõi xanh → khối
  xoáy xanh hình thành → xoáy đầy đủ, giữ nguyên
  → chớp trắng toàn thân → tối sầm → xoáy trắng
  hình chữ S → vỡ thành mảnh xanh → tàn thành
  vụn nhỏ → nghỉ 3 frame trống.
- Kích thước: **780×860** (giữ nguyên độ phân giải
  gốc, không thu nhỏ — anh thu nhỏ trong Godot
  nếu cần).
- Neo: tâm xoáy, giữ nguyên vị trí mọi frame.

## Cách tách và thứ tự frame

- GIF gốc có 2 hiệu ứng ở 2 vị trí cố định
  (xoáy xanh bên trái, cột sáng hồng bên phải),
  cách nhau 1 khoảng trống 243 px nên em tách bằng
  vị trí, không cần tách màu. Lưu ý: 2 hiệu ứng
  dùng chung màu hồng (tia sét hồng của xoáy và
  thân cột sáng cùng tông) nên tách màu sẽ lẫn —
  tách theo vị trí là cách đúng duy nhất, và
  khoảng trống giữa chúng không có điểm ảnh hiệu
  ứng nào nên không mất gì.
- Nền gốc là màu phẳng (58,18,43) nên tách nền
  bằng khóa màu chính xác: điểm ảnh bằng đúng màu
  nền → trong suốt, còn lại giữ nguyên 100% (alpha
  chỉ có 0 hoặc 255, không mờ).
- Thứ tự frame ĐÃ ĐƯỢC XOAY: GIF gốc bắt đầu giữa
  chừng kỹ năng (xoáy đã đầy đủ ở frame gốc 1),
  rồi tàn (frame 6–13), nghỉ trống hoàn toàn
  (frame 14–16), rồi hình thành lại (frame 17–22).
  Pack này sắp lại thành: hình thành (frame gốc
  17–31) → đầy đủ (frame gốc 1–2) → chớp trắng
  (frame gốc 3) → tối sầm (frame gốc 4) → xoáy
  trắng chữ S (frame gốc 5) → vỡ mảnh (frame gốc
  6–13) → nghỉ trống (frame gốc 14–16). Bảng ánh
  xạ đầy đủ nằm trong `frames.json`
  (source_frames_rotated). Nếu anh muốn đúng thứ
  tự gốc thì đảo lại theo bảng đó.
- 3 frame trống cuối là nhịp nghỉ của vòng lặp
  gốc — giữ lại để chạy lặp đúng nhịp; nếu dùng
  làm kỹ năng 1 lần thì cắt 3 frame cuối cho gọn.

## File trong pack

- `frames/frame_001.png` … `frame_031.png` — PNG RGBA
  trong suốt, 780×860
- `atlas.png` — bảng ghép 6×6 (4680×5160)
- `frames.json` — danh sách frame, fps, kích thước,
  bảng ánh xạ frame gốc
- `preview.gif` — xem trước đúng kích thước gốc,
  20 fps, 31 frame

## Gợi ý dùng trong Godot

- Chạy đúng 20 fps (50 ms/frame).
- Nên dùng Normal blending (xoáy có màu đặc).
- Chạy đồng thời với pack cột sáng hồng (cùng
  20 fps, cùng thứ tự xoay) thì 2 hiệu ứng đồng bộ
  đúng như bản gốc — chớp trắng và tối sầm xảy ra
  cùng lúc ở cả 2 bản.

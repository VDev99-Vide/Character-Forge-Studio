# Cột Lửa Phải (hiệu ứng phải)

Nguồn: GIF itch (file img.itch.zone, image
3377951/24238294) lấy từ link ảnh Bing,
1920×1080, 14 frame, 20 fps. GIF gốc có 2 hiệu
ứng đứng cạnh nhau; đây là hiệu ứng bên phải,
đã tách riêng.

## Nội dung

- **14 frame, 730×600, 20 fps, 0,7 giây**.
- Diễn biến (thứ tự đã XOAY về đúng vòng kỹ
  năng, vì GIF gốc bắt đầu giữa chừng ở đoạn
  nổ): bầu dục trắng đứng → dẹt thành đế ngang
  → vòm trắng vàng trên đế → cột lửa trắng có
  ngón lửa trên đế → cột lửa trắng vàng trên đế
  đỏ cam (đỉnh) → cầu lửa vàng kèm 2 vòng xám
  → cầu lửa cam tàn dần → mảnh đỏ xám tan dần
  → 2 frame trống cuối (nhịp nghỉ nối lại được
  với bầu dục đầu khi lặp).
- Thứ tự frame trong pack: frame gốc 10, 11, 12,
  13, 14, 1, 2, 3, 4, 5, 6, 7, 8, 9 (bảng ánh xạ
  đầy đủ trong frames.json).
- Neo: tâm cột lửa, giữ nguyên vị trí mọi frame.

## Cách tách

- Đã là pixel sẵn nên KHÔNG convert, giữ nguyên
  pixel gốc 1:1, chỉ xóa nền phẳng (34,28,26)
  bằng khóa màu chính xác.
- Tách theo vị trí: vùng phải x1030–1760 (giữa
  2 hiệu ứng có khoảng trống 195 điểm ảnh, đã
  kiểm tra không có điểm ảnh nào của hiệu ứng
  đi qua ranh giới ở mọi frame).
- Đã kiểm tra: 4 góc mọi frame đều trong suốt
  hoàn toàn, không còn vệt nền nào.

## File trong pack

- `frames/frame_001.png` … `frame_014.png` — PNG
  RGBA trong suốt, 730×600
- `atlas.png` — bảng ghép 4×4 (2920×2400)
- `frames.json` — danh sách frame, fps, kích thước
- `preview.gif` — xem trước đúng kích thước gốc,
  20 fps, 14 frame

## Gợi ý dùng trong Godot

- Chạy đúng 20 fps (50 ms/frame).
- Nên dùng Normal (giữ vòng xám); thử Additive
  nếu muốn lửa sáng hơn trên nền tối.
- Anchor ở tâm cột lửa.

# Nổ Lửa Trái (VFX Collection Vol 8 — hiệu ứng trái)

Nguồn: GIF "VFX COLLECTION - VOL 8" của kiddolonk
lấy từ link ảnh Bing (file img.itch.zone),
1920×1080, 15 frame, 20 fps. GIF gốc có 3 hiệu
ứng đứng cạnh nhau; đây là hiệu ứng bên trái,
đã tách riêng.

## Nội dung

- **15 frame, 620×740, 20 fps, 0,75 giây**.
- Diễn biến (thứ tự đã XOAY về đúng vòng kỹ
  năng, vì GIF gốc bắt đầu giữa chừng ở đoạn
  nổ): vòm trắng hình thành → vòm sẫm lại →
  bùng thành ngọn lửa trắng vàng → cầu lửa vàng
  có sừng khói → cầu lửa đỏ cam đỉnh → nổ đỏ
  cam → khói đen tan dần → 2 frame trống cuối
  (nhịp nghỉ nối lại được với vòm đầu khi lặp).
- Thứ tự frame trong pack: frame gốc 10, 11, 12,
  13, 14, 15, 1, 2, 3, 4, 5, 6, 7, 8, 9 (bảng ánh
  xạ đầy đủ trong frames.json).
- Neo: tâm vụ nổ, giữ nguyên vị trí mọi frame.

## Cách tách

- Đã là pixel sẵn nên KHÔNG convert, giữ nguyên
  pixel gốc 1:1, chỉ xóa nền phẳng (34,28,26)
  bằng khóa màu chính xác.
- Tách theo vị trí: vùng trái x130–750 (giữa
  2 hiệu ứng có khoảng trống, không cắt vào
  hiệu ứng nào).
- Đã kiểm tra: 4 góc mọi frame đều trong suốt
  hoàn toàn, không còn vệt nền nào.

## File trong pack

- `frames/frame_001.png` … `frame_015.png` — PNG
  RGBA trong suốt, 620×740
- `atlas.png` — bảng ghép 4×4 (2480×2960)
- `frames.json` — danh sách frame, fps, kích thước
- `preview.gif` — xem trước đúng kích thước gốc,
  20 fps, 15 frame

## Gợi ý dùng trong Godot

- Chạy đúng 20 fps (50 ms/frame).
- Nên dùng Normal (giữ khói đen); thử Additive
  nếu muốn lửa sáng hơn trên nền tối.
- Anchor ở tâm vụ nổ.

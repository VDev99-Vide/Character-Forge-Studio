# Water Blob — pixel VFX pack (pin42)

Khối nước xanh dương dạng giọt/blob, nhấp nhô tại chỗ kèm giọt nước rơi xuống dưới,
trên nền nâu đậm gốc đã tách trong suốt. Animation gốc mượt (không phải pixel) nên
đã convert sang pixel trước khi tách nền, theo đúng chuẩn: pixelize NEAREST rồi
tách nền bằng hard alpha, không blur.

- Kích thước: 109×172, 8 frame, ~14,29 fps (70ms/frame), tổng 0,56s, lặp kín
  (frame 8 nối lại frame 1 — blob nhấp nhô liên tục, không phải one-shot).
- Hướng: blob đứng giữa khung, giọt rơi xuống dưới. Neo giữa khung hình.
- Cách dùng trong Godot: AnimatedSprite2D hoặc Sprite2D với SpriteFrames 8 frame,
  tốc độ ~14,29 fps. Dùng **Normal** để giữ màu nước xanh sáng (không dùng Additive
  vì nước không phải tia sáng).
- File: `frames/` (8 PNG trong suốt), `atlas.png` (lưới 4×2), `frames.json`,
  `preview.gif` (xem trước).
- Nguồn: GIF Pinterest (550×400, 8 frame). Không cắt frame nào, không xoay thứ tự.

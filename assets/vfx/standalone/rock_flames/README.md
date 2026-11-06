# Đá Lửa Tan (Rock Flames Dissolve)

Nguồn: ảnh GIF "VFX - MAGIC SPELLS VOL 3" lấy từ
link tìm kiếm Bing (file gốc trên img.itch.zone),
1920×1080, 26 frame, 20 fps (50 ms/frame).
Bản này là 1 trong 2 hiệu ứng tách ra từ GIF đó
(đoạn đầu, frame gốc 1–7). Giữ nguyên pixel gốc,
không convert lại, chỉ xóa phông nền.

## Nội dung

- Pack lấy **7 frame (frame gốc 1–7), 0,35 giây,
  giữ đúng 20 fps thật của GIF gốc**.
- Diễn biến: tảng đá xám với ngọn lửa xanh dương
  cao bốc lên trên, kèm gai năng lượng → lửa tàn
  dần, đá vỡ thành mảnh → mảnh nhỏ dần rồi biến
  mất hẳn.
- Kích thước: **640×880** (giữ nguyên độ phân giải
  gốc, không thu nhỏ — anh thu nhỏ trong Godot
  nếu cần).
- Neo: đáy tảng đá, giữ nguyên vị trí mọi frame
  (đá không di chuyển, chỉ có lửa tàn và đá vỡ).

## Cách tách

- GIF gốc có 2 đoạn hiệu ứng, cách nhau 3 frame
  trống hoàn toàn (frame gốc 8–10) nên em tách
  thành 2 bản theo thời gian. Bản này là đoạn đầu.
- Nền gốc là màu phẳng (58,18,43) nên tách nền
  bằng khóa màu chính xác: điểm ảnh bằng đúng màu
  nền → trong suốt, còn lại giữ nguyên 100% (alpha
  chỉ có 0 hoặc 255, không mờ).

## File trong pack

- `frames/frame_001.png` … `frame_007.png` — PNG RGBA
  trong suốt, 640×880
- `atlas.png` — bảng ghép 3×3 (1920×2640)
- `frames.json` — danh sách frame, fps, kích thước
- `preview.gif` — xem trước đúng kích thước gốc,
  20 fps, 7 frame

## Gợi ý dùng trong Godot

- Chạy đúng 20 fps (50 ms/frame).
- Nên dùng Normal blending (đá có màu đặc, lửa
  xanh sẽ nổi trên nền tối).
- Anchor ở đáy giữa (điểm đá chạm đất).

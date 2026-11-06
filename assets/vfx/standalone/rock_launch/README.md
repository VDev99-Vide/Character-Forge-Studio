# Đá Bay Nổ (Rock Launch Burst)

Nguồn: ảnh GIF "VFX - MAGIC SPELLS VOL 3" lấy từ
link tìm kiếm Bing (file gốc trên img.itch.zone),
1920×1080, 26 frame, 20 fps (50 ms/frame).
Bản này là 1 trong 2 hiệu ứng tách ra từ GIF đó
(đoạn sau, frame gốc 11–26). Giữ nguyên pixel gốc,
không convert lại, chỉ xóa phông nền.

## Nội dung

- Pack lấy **16 frame (frame gốc 11–26), 0,8 giây,
  giữ đúng 20 fps thật của GIF gốc**.
- Diễn biến: tảng đá xám viền xanh dương, hơi trôi
  sang phải trong lúc rung nhẹ → đá chuyển tím,
  bùng nổ tia trắng/xanh và lao sang phải để lại
  vệt dài → vệt mờ dần, đá ổn định lại, tiếp tục
  rung nhẹ → frame cuối đá chuyển tím và phun
  ngọn lửa trắng/xanh cao bốc lên trên.
- Kích thước: **720×940** (giữ nguyên độ phân giải
  gốc, không thu nhỏ — anh thu nhỏ trong Godot
  nếu cần).
- Lưu ý vị trí: tảng đá **trôi sang phải trong suốt
  pack** (từ trái sang phải khung hình) — đó là
  chuyển động của phép, không phải lỗi crop. Khi
  gắn vào game, anchor theo khung hình chứ không
  neo cố định 1 điểm.

## Cách tách

- GIF gốc có 2 đoạn hiệu ứng, cách nhau 3 frame
  trống hoàn toàn (frame gốc 8–10) nên em tách
  thành 2 bản theo thời gian. Bản này là đoạn sau.
- Nền gốc là màu phẳng (58,18,43) nên tách nền
  bằng khóa màu chính xác: điểm ảnh bằng đúng màu
  nền → trong suốt, còn lại giữ nguyên 100% (alpha
  chỉ có 0 hoặc 255, không mờ).
- Lưu ý: frame cuối (frame gốc 26) là lúc ngọn lửa
  vừa phun lên — GIF gốc cắt ngay tại đó nên diễn
  biến phun lửa tiếp theo không có trong pack.
  Nếu anh muốn vòng lặp kín thì pack này lặp từ
  frame cuối về frame đầu sẽ có nhịp nhảy (đá tím
  có lửa → đá xám đang rung).

## File trong pack

- `frames/frame_001.png` … `frame_016.png` — PNG RGBA
  trong suốt, 720×940
- `atlas.png` — bảng ghép 4×4 (2880×3760)
- `frames.json` — danh sách frame, fps, kích thước
- `preview.gif` — xem trước đúng kích thước gốc,
  20 fps, 16 frame

## Gợi ý dùng trong Godot

- Chạy đúng 20 fps (50 ms/frame).
- Nên dùng Normal blending (đá có màu đặc).
- Vì đá trôi sang phải, nếu anh muốn đá đứng yên
  thì đặt pack rồi cho node di chuyển ngược lại,
  hoặc chỉ dùng đoạn đá rung (frame 1–6) làm hiệu
  ứng chờ.

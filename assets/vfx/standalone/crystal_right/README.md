# Tinh Thể Phải (Crystal Right)

Nguồn: ảnh GIF lấy từ link tìm kiếm Bing (file gốc
trên img.itch.zone), 1920×1080, 34 frame, 16,67 fps
(60 ms/frame). Bản này là khối tinh thể BÊN PHẢI
trong GIF (GIF có 2 khối chạy song song trái/phải).
Giữ nguyên pixel gốc, không convert lại, chỉ xóa
phông nền.

## Nội dung

- Pack lấy **trọn bộ 34 frame, 2,04 giây, giữ đúng
  16,67 fps thật của GIF gốc** — đây là 1 vòng lặp
  hoàn chỉnh.
- Diễn biến: tinh thể tím viền xanh → chuyển nhạt
  rồi tím lại có tia sáng xanh → nứt vỡ thành
  mảnh xanh ngọc → tan thành hạt sáng rồi biến mất
  hoàn toàn (frame 23–25 trống) → tinh thể mọc lại
  qua bóng tối, bóng trắng, bóng xanh → trở về
  tinh thể tím đầy đủ ở frame cuối (nối lại được
  với frame 1 khi lặp).
- Kích thước: **730×850** (giữ nguyên độ phân giải
  gốc, không thu nhỏ — anh thu nhỏ trong Godot
  nếu cần).
- Neo: đáy khối tinh thể, giữ nguyên vị trí mọi frame.

## Cách tách

- GIF gốc có 2 khối song song (trái và phải),
  cách nhau 1 khoảng trống nên em tách theo vị trí:
  bản này lấy nửa phải (x 1090–1820). Khoảng trống
  giữa 2 khối không có điểm ảnh nào nên không mất
  gì, không lẫn khối bên trái.
- Nền gốc là màu phẳng (34,28,26) nên tách nền
  bằng khóa màu chính xác: điểm ảnh bằng đúng màu
  nền → trong suốt, còn lại giữ nguyên 100% (alpha
  chỉ có 0 hoặc 255, không mờ).
- Lưu ý: 3 frame trống giữa pack (23–25) là nhịp
  nghỉ của vòng lặp gốc, em giữ nguyên. Nếu anh
  chỉ muốn 1 lần tinh thể vỡ/mọc thì cắt bỏ 3 frame
  này hoặc lấy đoạn frame 1–22 (vỡ) hoặc 26–34
  (mọc lại).

## File trong pack

- `frames/frame_001.png` … `frame_034.png` — PNG RGBA
  trong suốt, 730×850
- `atlas.png` — bảng ghép 6×6 (4380×5100)
- `frames.json` — danh sách frame, fps, kích thước
- `preview.gif` — xem trước đúng kích thước gốc,
  16,67 fps, 34 frame

## Gợi ý dùng trong Godot

- Chạy đúng 16,67 fps (60 ms/frame).
- Nên dùng Normal blending (tinh thể có màu đặc);
  muốn phát sáng thì thử Additive cho các frame
  mảnh xanh.
- Anchor ở đáy khối tinh thể. Đặt cạnh pack Đá
  Trái (cùng dải y) sẽ tái hiện đúng cảnh gốc.

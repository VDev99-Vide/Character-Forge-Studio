# Nổ Phải (Burst Right)

Nguồn: ảnh GIF lấy từ link tìm kiếm Bing (file gốc
trên img.itch.zone), 1920×1080, 16 frame, 20 fps
(50 ms/frame). Bản này là hiệu ứng BÊN PHẢI trong
GIF (GIF có 2 hiệu ứng chạy song song trái/phải).
Giữ nguyên pixel gốc, không convert lại, chỉ xóa
phông nền.

## Nội dung

- Pack lấy **trọn bộ 16 frame, 0,8 giây, giữ đúng
  20 fps thật của GIF gốc**.
- Diễn biến: vụ nổ nấm cam ở đỉnh → vỡ thành mảnh
  đỏ và khói, tàn dần gần như biến mất (frame 10
  chỉ còn vài chấm) → cắt cứng sang quả cầu sáng
  trắng dạng dọc tích năng lượng → cầu chuyển tối,
  rồi đỏ có tia sét → chớp nhỏ → nấm cam mọc lại
  có vòng đỏ → vụ nổ nấm cam vàng lớn có 2 vòng
  ở đỉnh (frame cuối, GIF kết thúc tại đây).
- Kích thước: **700×810** (giữ nguyên độ phân giải
  gốc, không thu nhỏ — anh thu nhỏ trong Godot
  nếu cần).
- Neo: tâm vụ nổ, giữ nguyên vị trí mọi frame.

## Cách tách

- GIF gốc có 2 hiệu ứng song song (trái và phải),
  cách nhau 1 khoảng trống nên em tách theo vị trí:
  bản này lấy nửa phải (x 1100–1800). Khoảng trống
  giữa 2 hiệu ứng không có điểm ảnh nào nên không
  mất gì, không lẫn hiệu ứng bên trái.
- Nền gốc là màu phẳng (34,28,26) nên tách nền
  bằng khóa màu chính xác: điểm ảnh bằng đúng màu
  nền → trong suốt, còn lại giữ nguyên 100% (alpha
  chỉ có 0 hoặc 255, không mờ).
- Lưu ý nhịp: pack gồm 2 nhịp nối nhau bằng 1 cắt
  cứng (frame 10 gần trống → frame 11 cầu sáng).
  Nếu anh chỉ muốn 1 vụ nổ thì cắt pack thành
  frame 1–10 (nổ 1 + tàn) hoặc frame 11–16 (tích
  năng lượng + nổ 2).

## File trong pack

- `frames/frame_001.png` … `frame_016.png` — PNG RGBA
  trong suốt, 700×810
- `atlas.png` — bảng ghép 4×4 (2800×3240)
- `frames.json` — danh sách frame, fps, kích thước
- `preview.gif` — xem trước đúng kích thước gốc,
  20 fps, 16 frame

## Gợi ý dùng trong Godot

- Chạy đúng 20 fps (50 ms/frame).
- Nên dùng Normal blending (vụ nổ có màu đặc và
  khói đen).
- Anchor ở tâm vụ nổ.

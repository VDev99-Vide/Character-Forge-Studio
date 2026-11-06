# Chém Lửa (Fire Slash)

Nguồn: ảnh GIF lấy từ link tìm kiếm Bing (file gốc
trên i.pinimg.com), 320×320, 18 frame, 12,5 fps
(80 ms/frame), 1,44 giây.

## Nội dung

- Pack lấy trọn bộ **18 frame, 1,44 giây, giữ đúng
  12,5 fps thật của GIF gốc** (không đổi thành
  30 fps — GIF này vốn chạy chậm, đổi tốc độ sẽ
  làm lửa cháy sai nhịp).
- Diễn biến: 2 vệt lửa chéo bay xuống → chạm đất
  nổ thành đám lửa lớn ở dưới → lửa cháy kèm khói
  xám bay lên và tia lửa văng ra → lửa tắt dần,
  chỉ còn tàn lửa rồi hết hẳn.
- Kích thước pixel: **192×192** (toàn khung).
- Hướng hiệu ứng: chéo từ trên-phải xuống
  dưới-trái; điểm nổ ở dưới khung hình.

## Cách làm (theo chuẩn mới)

- **Pixel trước, tách nền sau:** xuống pixel bằng
  NEAREST trước cho ra ô vuông cứng, rồi mới tách
  nền trên ảnh pixel. **Không mờ alpha** — ngọn
  lửa, vệt khói và tia lửa đều là bậc thang pixel
  cứng.
- **Nền sạch tuyệt đối:** nền gốc là màu xám phẳng
  (~53) đã kiểm chứng đứng yên (vùng góc khung
  hình giống hệt nhau ở mọi frame) nên trừ nền bằng
  ảnh nền lấy từ 2 frame cuối (frame 17–18, lúc lửa
  đã tắt gần hết): lấy giá trị nhỏ nhất từng điểm
  ảnh của 2 frame đó — tàn lửa thưa bị loại, nền
  giữ nguyên. Alpha = 0 khi lệch dưới 10, đủ khi
  lệch trên 100. Đã đo kiểm: góc khung hình bằng 0
  ở mọi frame mẫu.
- **Watermark:** ảnh gốc có chữ "HYT制作" ở góc
  dưới-phải, tĩnh suốt video nên phép trừ nền đã
  xóa nó — đã đo kiểm vùng chữ: alpha bằng 0 ở
  mọi frame mẫu, phóng to kiểm tra không còn đọc
  được chữ.
- Khói xám giữ dạng mờ nửa trong (lệch 40–80) chứ
  không thành cục đen đặc, cũng không bị xóa mất.
  Vùng lệch được giãn nhẹ 1px trước khi xuống
  pixel để vệt lửa mảnh không bị rớt mất. Giữ
  nguyên màu, không rút gọn bảng màu.

## File trong pack

- `frames/frame_001.png` … `frame_018.png` — PNG RGBA
  trong suốt, 192×192
- `atlas.png` — bảng ghép 5×4 (960×768)
- `frames.json` — danh sách frame, fps, kích thước
- `preview.gif` — xem trước 576×576 (phóng 3x bằng
  NEAREST cho rõ ô pixel), 12,5 fps, 18 frame
  (GIF chỉ có alpha 1 bit: ngưỡng 64; bản PNG giữ
  đủ alpha)

## Gợi ý dùng trong Godot

- Chạy đúng 12,5 fps (80 ms/frame) — đừng ép về
  30 fps, lửa sẽ cháy nhanh gấp đôi trông rất giả.
- Nên dùng Normal blending: khói xám cần nền Normal
  mới thấy đúng; Additive làm khói biến mất và lửa
  bị chói quá.
- Anchor ở điểm nổ (dưới khung hình) nếu gắn vào
  vị trí chém trúng, hoặc ở tâm nếu gắn vào nhân
  vật.

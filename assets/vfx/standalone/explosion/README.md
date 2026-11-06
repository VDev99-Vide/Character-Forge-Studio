# Vụ Nổ Phong Cách (Stylized Explosion)

Nguồn: pin Pinterest 959477895589388328 — video native
của Pinterest ("VFX | Stylized Explosions"), gốc
1280×720, 30 fps, 266 frame, 8,87 giây.

## Nội dung

- Frame nguồn 101–189 = **89 frame, 2,97 giây, 30 fps**
- Kích thước pixel: **192×108** (toàn khung — tia
  vụ nổ bay tới tận mép khung hình)
- Diễn biến: viên đạn xanh rơi xuống → chạm đất
  nổ tung (ngôi sao tím, vòng xanh, tia mảnh bay
  ra) → vòng xung kích trắng lan rộng → khói đen
  + tàn lửa tím → tắt hẳn.
- Lưu ý về điểm cắt: anh dặn lấy từ giây số 3
  (frame 91), nhưng 11 frame đầu đó (3,0–3,33 giây)
  là cảnh đang chuyển từ nền sáng sang nền tối
  (đo được nền trên lệch tới 102), tách kiểu gì
  cũng lem cả mảng nền vào pack. Em bắt đầu từ
  frame 101 (3,33 giây) là frame đầu tiên nền đã
  tối và đứng yên — viên đạn vẫn còn nguyên,
  vụ nổ không mất frame nào.

## Cách làm (đã sửa theo góp ý của anh)

Anh nhắc 2 lỗi ở vài mẫu gần đây: nền không sạch
và hiệu ứng chưa về pixel. Nguyên nhân là các pack
đó dùng alpha mềm + mờ alpha để làm mịn vệt sáng,
nên viền bị mềm như video thường và nền còn sót
quầng mờ. Pack này đổi hẳn cách làm:

- **Pixel trước, tách nền sau:** xuống pixel bằng
  NEAREST trước cho ra ô vuông cứng, rồi mới tách
  nền trên ảnh pixel. **Không mờ alpha ở bất kỳ
  bước nào** — viền hiệu ứng là bậc thang pixel
  cứng, đúng chất pixel.
- **Nền sạch tuyệt đối:** nền sau vụ nổ đã kiểm
  chứng là đứng yên (frame 241 vs 261 lệch tối đa
  chỉ 2 mức sáng), nên trừ nền bằng ảnh nền trung
  vị từ frame trống cuối video. Alpha = 0 khi lệch
  dưới 8 (nhiễu nền tối đa là 2 nên nền về 0 thật),
  đủ khi lệch trên 100. Đã đo kiểm: góc khung hình
  ở các frame mẫu có alpha tối đa bằng 0, trừ vài
  điểm tia bay tới góc (đó là hiệu ứng thật).
- **Giữ tia mảnh:** trước khi xuống pixel, vùng
  lệch được giãn nhẹ 2px để tia mảnh (2–4px ở
  video gốc) không bị rớt thành nét đứt khi lấy
  mẫu điểm xuống 192px. Tia trong pack liền mạch,
  không đứt đoạn. Bước này chỉ giãn vùng lệch,
  không sửa màu RGB nên khói đen không bị mòn.
- Khói đen giữ dạng mờ nửa trong (lệch 10–30) chứ
  không thành cục đen đặc, cũng không bị xóa mất.
- Giữ nguyên màu, không rút gọn bảng màu; giữ đúng
  30 fps, không nhân tốc độ, không thêm bớt phase.

## File trong pack

- `frames/frame_001.png` … `frame_089.png` — PNG RGBA
  trong suốt, 192×108
- `atlas.png` — bảng ghép 10×9 (1920×972)
- `frames.json` — danh sách frame, fps, kích thước
- `preview.gif` — xem trước 768×432 (phóng 4x bằng
  NEAREST cho rõ ô pixel), 30 fps, 89 frame
  (GIF chỉ có alpha 1 bit: ngưỡng 64; bản PNG giữ
  đủ alpha)

## Gợi ý dùng trong Godot

- Chạy đúng 30 fps (33 ms/frame).
- Nên dùng Normal blending: khói đen và vòng xung
  kích xám cần nền Normal mới thấy đúng; Additive
  sẽ làm khói biến mất và vòng bị chói quá.
- Anchor ở tâm vụ nổ (giữa khung hình).

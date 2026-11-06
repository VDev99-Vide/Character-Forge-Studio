# Varus R Impact (Heartseeker Varus)

Nguồn: pin Pinterest 321655598386926132 — ảnh GIF gốc
400×400, 81 frame, 25 fps, 3,24 giây, tựa
"Mesmerizing Heartseeker Varus R Impact".

## Nội dung

- Pack lấy **1 chu kỳ duy nhất: frame nguồn 1–76
  = 76 frame, 3,04 giây, 25 fps**.
- Diễn biến: vụ nổ hồng/tím chạm đích (tua đỏ,
  lõi trắng, tia lửa) → vòng tua đỏ xoay thu hẹp
  dần → chỉ còn tia lửa tím bay → tắt hẳn.
- GIF gốc lặp vòng: từ frame 77 là vụ nổ của
  chu kỳ tiếp theo (đo được mật độ hiệu ứng nhảy
  từ 0,0000 lên 0,2726 ngay tại frame 77) nên
  không lấy thêm — pack này là 1 skill trọn vẹn,
  không dính 2 lần nổ.
- Kích thước pixel: **192×192** (toàn khung).
- Giữ đúng tốc độ thật của GIF gốc: **25 fps
  (40 ms/frame)**, không đổi thành 30 fps.

## Cách làm (theo chuẩn mới đã sửa cho anh)

- **Pixel trước, tách nền sau:** xuống pixel bằng
  NEAREST trước cho ra ô vuông cứng, rồi mới tách
  nền trên ảnh pixel. **Không mờ alpha** — viền
  hiệu ứng là bậc thang pixel cứng, đúng chất
  pixel.
- **Nền sạch tuyệt đối:** nền gốc là màu xám phẳng
  (~69) đã kiểm chứng đứng yên, nên trừ nền bằng
  ảnh nền trung vị từ frame cuối chu kỳ (60–72,
  lúc hiệu ứng chỉ còn vài tia lửa thưa). Alpha = 0
  khi lệch dưới 10 (nhiễu nền chỉ ±3–4 mức nên nền
  về 0 thật), đủ khi lệch trên 100.
- **Watermark:** ảnh gốc có chữ CGWELL.COM ở góc
  dưới-phải, tĩnh suốt video nên phép trừ nền đã
  xóa nó; riêng 2 frame đầu, quầng sáng vụ nổ chạm
  tới vùng đó làm chữ mờ hiện lại nên em đã xử lý
  riêng vùng chữ cho sạch hẳn (đã phóng to kiểm
  tra: không còn đọc được chữ).
- Vùng lệch được giãn nhẹ 1px trước khi xuống
  pixel để tia lửa và tua mảnh không bị rớt mất.
  Giữ nguyên màu, không rút gọn bảng màu.

## File trong pack

- `frames/frame_001.png` … `frame_076.png` — PNG RGBA
  trong suốt, 192×192
- `atlas.png` — bảng ghép 9×9 (1728×1728)
- `frames.json` — danh sách frame, fps, kích thước
- `preview.gif` — xem trước 576×576 (phóng 3x bằng
  NEAREST cho rõ ô pixel), 25 fps, 76 frame
  (GIF chỉ có alpha 1 bit: ngưỡng 64; bản PNG giữ
  đủ alpha)

## Gợi ý dùng trong Godot

- Chạy đúng 25 fps (40 ms/frame).
- Nên dùng Normal blending: quầng hồng mềm và tia
  lửa tím cần nền Normal mới thấy đúng; Additive
  làm quầng bị chói và cánh tua đỏ sẫm bị nhạt đi.
- Anchor ở tâm vụ nổ (giữa khung hình).

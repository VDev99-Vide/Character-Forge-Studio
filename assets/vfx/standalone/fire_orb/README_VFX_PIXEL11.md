# Quả cầu lửa nổ (fire orb blast) — bản 2D pixel
# (từ pin Pinterest 573786808766258935)

Nguồn là file GIF gốc (416×392, 15 frame, mỗi frame 60ms, vòng lặp
0,9 giây), không phải video.
Diễn biến: một tia lửa bay ngang kèm vòng nhỏ → chạm đích nở thành
vòng lửa → phình thành quả cầu năng lượng lớn với nhiều quả cầu sáng
bên trong và các vòng đen/trắng/vàng xoay quanh → quả cầu duy trì,
xoay và nhấp nháy → nguội dần thành các quả cầu đỏ sẫm → tàn thành
vệt khói mờ rồi biến mất.

## CHÚ Ý NHỊP — KHÁC CÁC PACK 30fps
Pack này chỉ có 15 frame, mỗi frame 60ms, tức khoảng 16,67fps —
KHÔNG phải 30fps. Khi đưa vào Godot AnimatedSprite2D/SpriteFrames
phải để tốc độ khoảng 16,67fps (hoặc thời lượng frame 60ms) mới đúng
nhịp gốc; nếu để 30fps thì vụ nổ sẽ chạy nhanh gần gấp 1,8 lần.

## Cách làm
- Nền GIF gốc là màu xám phẳng gần như tuyệt đối (góc frame nào cũng
  108,107,107, lệch chuẩn chỉ 0,43) nên tách nền bằng trừ nền với tấm
  nền xám phẳng đó: alpha = clip((kênh lệch lớn nhất − 16)/110).
  Dùng trừ nền chứ KHÔNG dùng ngưỡng độ sáng, vì như vậy các vòng đen
  xoay quanh quả cầu mới còn nguyên (vòng đen lệch khỏi nền xám tới
  ~108, ngang với lửa sáng) — dùng ngưỡng sáng thì vòng đen sẽ biến
  mất khỏi asset.
- Kênh alpha làm mờ nhẹ (Gaussian radius 3) để khử nhiễu dither của
  GIF 256 màu. Giữ nguyên cả 15 frame, không cắt bỏ frame nào (frame
  cuối là vệt khói mờ tự nhiên trước khi lặp lại).
- Cắt khung theo vùng hiệu ứng (x 20–411, y 45–351) rồi downscale
  NEAREST về 192×150.
- GIF phóng 3× NEAREST lên 576×450, nền trong suốt, lặp vô hạn, xuất
  bằng ffmpeg để đủ đúng 15 frame, mỗi frame đúng 60ms. GIF dùng
  ngưỡng alpha 64 thay vì 128 vì vệt khói cuối hiệu ứng vốn trong mờ
  — file PNG giữ nguyên dải alpha đầy đủ.

## File trong pack
- pixel_frames/frame_000.png … frame_014.png: 15 frame RGBA 192×150.
- vfx_fire_orb_sheet.png: atlas 5 cột × 3 hàng (960×450).
- frames.json: thông số frame, fps, kích thước, phương pháp.
- vfx_fire_orb_pixel.gif: 15 frame, 576×450, nền trong suốt, 60ms/frame.
- README_VFX_PIXEL11.md: file này.

## Cách dùng trong game
- Dùng bình thường với alpha (Normal blending); muốn lửa rực hơn thì
  dùng Additive blending.
- Quả cầu nở ra từ tâm khung hình, đặt tâm khung trùng vị trí trúng
  đòn là đúng.

# Chuỗi vụ nổ (burst chain) — bản 2D pixel
# (từ pin Pinterest 133137732722180047)

Nguồn là file GIF gốc (432×281, 7 frame, mỗi frame 90ms, vòng lặp
0,63 giây), không phải video.
Diễn biến: một vụ nổ sáng bùng lên → vụ nổ thứ hai nhập vào → chuỗi
vụ nổ lan dần sang phải kèm tia lửa văng tứ tung → chuỗi nổ đầy đủ
kèm khói → các vụ nổ tắt dần thành tàn lửa → chỉ còn tàn lửa đỏ mờ
rồi biến mất.

## CHÚ Ý NHỊP — KHÁC CÁC PACK 30fps
Pack này chỉ có 6 frame, mỗi frame 90ms, tức khoảng 11,11fps —
KHÔNG phải 30fps. Khi đưa vào Godot AnimatedSprite2D/SpriteFrames
phải để tốc độ khoảng 11fps (hoặc thời lượng frame 90ms) mới đúng
nhịp gốc; nếu để 30fps thì chuỗi nổ sẽ chạy nhanh gấp 2,7 lần.

## Cách làm
- Nền GIF gốc là đen tuyệt đối (góc frame nào cũng 0,0,0) nên tách
  nền bằng ngưỡng độ sáng: alpha = clip((kênh sáng nhất − 8)/160).
  Không cần làm mờ alpha vì nền đen chính xác, không có nhiễu dither
  để khử — nhờ vậy viền vụ nổ kiểu anime giữ được độ sắc nét.
- Giữ frame gốc 1–6 (0,54 giây); frame 7 gốc là frame đen hoàn toàn
  (mọi pixel bằng 0, chỉ là frame đệm cuối vòng lặp) nên đã bỏ.
- Cắt khung theo vùng hiệu ứng (x 4–417, y 4–267) rồi downscale
  NEAREST về 192×122. Kích thước khung cố định cho cả chuỗi nên các
  vụ nổ đầu (nhỏ, ở giữa) và chuỗi nổ sau (lan rộng) đều căn đúng vị
  trí khi phát liên tiếp.
- GIF phóng 3× NEAREST lên 576×366, nền trong suốt, lặp vô hạn, xuất
  bằng ffmpeg để đủ đúng 6 frame, mỗi frame đúng 90ms. GIF dùng
  ngưỡng alpha 64 thay vì 128 vì tàn lửa cuối chuỗi vốn trong mờ —
  file PNG giữ nguyên dải alpha đầy đủ.

## File trong pack
- pixel_frames/frame_000.png … frame_005.png: 6 frame RGBA 192×122.
- vfx_burst_chain_sheet.png: atlas 6 cột × 1 hàng (1152×122).
- frames.json: thông số frame, fps, kích thước, phương pháp.
- vfx_burst_chain_pixel.gif: 6 frame, 576×366, nền trong suốt, 90ms/frame.
- README_VFX_PIXEL12.md: file này.

## Cách dùng trong game
- Dùng bình thường với alpha (Normal blending); muốn lửa rực hơn thì
  dùng Additive blending.
- Chuỗi nổ lan từ trái sang phải, điểm nổ đầu tiên ở khoảng giữa-trái
  khung hình — đặt vị trí đó trùng điểm trúng đòn, chuỗi sẽ lan theo
  hướng phải.

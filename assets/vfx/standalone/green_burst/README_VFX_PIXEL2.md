# VFX vòng năng lượng xanh lá — bản 2D pixel (từ pin Pinterest 1109785533168499692)

Nguồn: skill_vfx_source2.mp4 (640×640, 30fps, 48 frame).
Hiệu ứng: vòng tròn rune xanh lá tích năng lượng, tia sáng bắn lên,
rồi bùng nổ thành vòm năng lượng kèm hạt bay, sau đó tan dần.
Giữ lại 44 frame dùng được (frame gốc 0–43); 4 frame cuối gần như trống
nên đã bỏ.

## Cách làm
- Nền video là xanh lá rất tối (kênh G khoảng 18), không phải đen tuyệt đối,
  nên tách nền bằng ngưỡng độ sáng: alpha = clip((max_channel − 24)/120).
  Nền tối về 0, tia sáng và vụ nổ giữ nguyên độ mờ dần.
- Chuyển pixel: downscale NEAREST về 128×128, không ép palette hẹp để
  giữ gradient phát sáng.
- GIF phóng 4× NEAREST lên 512×512 để nhìn rõ hạt pixel, nền trong suốt,
  lặp vô hạn, 30fps. Xuất bằng ffmpeg để đủ đúng 44 frame.

## File trong pack
- pixel_frames/frame_000.png … frame_043.png: 44 frame RGBA 128×128.
- vfx_green_burst_sheet.png: atlas 11 cột × 4 hàng (1408×512).
- frames.json: thông số frame, fps, kích thước, phương pháp.
- vfx_green_burst_pixel.gif: 44 frame, 512×512, nền trong suốt.
- README_VFX_PIXEL2.md: file này.

## Cách dùng trong game
- Dùng bình thường với alpha (Normal blending).
- Muốn năng lượng rực hơn thì dùng Additive blending.
- Asset vuông 128×128, đặt tâm hiệu ứng ở giữa khung.

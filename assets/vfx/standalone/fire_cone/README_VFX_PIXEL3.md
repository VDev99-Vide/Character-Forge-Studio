# VFX nón lửa (kiểu Annie W) — bản 2D pixel (từ pin Pinterest 1045538869723986488)

Nguồn: skill_vfx_source3.mp4 (256×144, 60fps, 519 frame, 8,7 giây).
Video lặp lại cùng một skill nón lửa 3 lần (các đoạn 0,05–1,55s,
2,23–3,73s, 4,42–7,48s). Pack này lấy đúng 1 chu kỳ đầu tiên đầy đủ
nhất: frame gốc 0–94, lấy cách 1 frame → 48 frame, 30fps, dài 1,6s.
Nếu anh muốn chu kỳ khác hoặc cả 3 chu kỳ thì bảo em xuất thêm.

## Cách làm
- Nền là sàn kẻ ô vuông xám, camera tĩnh, nên tách nền bằng trừ nền:
  nền chuẩn = trung vị 60 frame cuối (sàn trống).
- Vấn đề riêng của mẫu này: lửa làm sáng cả sàn xung quanh, nên trừ nền
  thường sẽ để lại cả mảng sàn kẻ ô phát sáng quanh lửa. Em xử lý thêm:
  alpha được làm mờ nhẹ (Gaussian radius 2) để mất viền ô vuông, và
  những pixel ít "ấm" (hiệu R−B thấp, tức sàn bị lửa hắt sáng) được
  pha dần về màu cam phát sáng (255,130,30) thay vì giữ màu sàn gốc.
  Kết quả: lửa giữ nguyên màu, vùng sáng quanh lửa thành quầng cam mịn,
  không còn thấy ô vuông sàn.
- Cắt khung theo vùng hiệu ứng (x 24–225, y 0–144) rồi downscale
  NEAREST về 128×92.
- GIF phóng 4× NEAREST lên 512×368, nền trong suốt, lặp vô hạn, 30fps.
  Xuất bằng ffmpeg để đủ đúng 48 frame.

## File trong pack
- pixel_frames/frame_000.png … frame_047.png: 48 frame RGBA 128×92.
- vfx_fire_cone_sheet.png: atlas 8 cột × 6 hàng (1024×552).
- frames.json: thông số frame, fps, kích thước, phương pháp.
- vfx_fire_cone_pixel.gif: 48 frame, 512×368, nền trong suốt.
- README_VFX_PIXEL3.md: file này.

## Cách dùng trong game
- Dùng bình thường với alpha (Normal blending).
- Muốn lửa rực hơn thì dùng Additive blending.
- Nón lửa phun từ trái sang phải, gốc lửa ở mép trái khung hình.

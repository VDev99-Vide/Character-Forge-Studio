# VFX sét đánh xuống vòng tròn (chỉ 5 giây đầu) — bản 2D pixel
# (từ pin Pinterest 825566175496380921, "Real-Time Magic Lightning VFX in Unity")

Nguồn: video dọc 720×1280, 60fps, dài 14,33 giây. Theo dặn của anh,
pack này CHỈ lấy 5 giây đầu tiên, phần sau video (các chu kỳ sét tiếp
theo) không lấy.
Diễn biến 5 giây đầu: tia beam mảnh từ trên trời xuống, vòng tròn xanh
hiện lên mặt đất, tia sét đánh xuống vòng, vòng bùng sáng xanh-trắng
rồi thêm một đợt nổ vàng, sau đó tàn dần. Ở đúng mốc 5 giây, vòng vẫn
đang tàn dở (chưa tắt hẳn) — đó là điểm cắt theo yêu cầu, không phải
lỗi thiếu frame.

## Cách lấy video gốc (khác các mẫu trước)
Trang pin này không có link mp4 trực tiếp trong HTML, chỉ có link HLS
(m3u8). Bản mp4 720p đoán theo mẫu cũ bị AccessDenied, còn ffmpeg đọc
thẳng playlist HLS thì lỗi TLS. Em lấy được video bằng cách tải file
fragmented-mp4 duy nhất của luồng 720w trong playlist HLS
(fd8648b2273a35d952d413ebe500418e_720w.cmfv, 720×1280, 60fps) rồi cắt
5 giây đầu bằng ffmpeg.

## Cách tách nền
- Camera tĩnh, sàn kẻ ô vuông không đổi, nên tách nền bằng trừ nền:
  nền chuẩn = trung vị 40 frame cuối video (từ 13,5 giây trở đi, sàn
  trống). Alpha mềm = clip((chênh lệch kênh lớn nhất − 16)/110).
- Hai icon tròn nhỏ ở góc trên-phải video gốc (icon lửa và icon sét)
  là UI tĩnh, nằm sẵn trong nền chuẩn nên bị loại cùng nền — pack chỉ
  còn đúng hiệu ứng sét, không dính icon. Nếu anh muốn giữ icon thì
  bảo em, lấy lại rất dễ vì chúng đứng yên.
- Cắt khung theo vùng hiệu ứng (x 93–700, y 0–1077) rồi downscale
  NEAREST về 192×341, giữ nguyên khung dọc.
- Video gốc 60fps, pack lấy cách 1 frame → 150 frame, 30fps, 5,0 giây.
- GIF phóng 2× NEAREST lên 384×682, nền trong suốt, lặp vô hạn, 30fps.
  Xuất bằng ffmpeg để đủ đúng 150 frame.

## File trong pack
- pixel_frames/frame_000.png … frame_149.png: 150 frame RGBA 192×341.
- vfx_lightning_strike_sheet.png: atlas 15 cột × 10 hàng (2880×3410).
- frames.json: thông số frame, fps, kích thước, phương pháp.
- vfx_lightning_strike_pixel.gif: 150 frame, 384×682, nền trong suốt.
- README_VFX_PIXEL6.md: file này.

## Cách dùng trong game
- Dùng bình thường với alpha (Normal blending).
- Muốn sét rực hơn thì dùng Additive blending.
- Sét đánh dọc từ trên xuống, vòng tròn nằm ở đáy khung hình — đặt
  đáy khung trùng mặt đất là đúng vị trí.

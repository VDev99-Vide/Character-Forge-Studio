# VFX tia beam chéo (lõi cam, hào tím, dải xanh) — bản 2D pixel
# (từ link video trực tiếp 3a2c7dce909e103fdc38865eb2942230.mp4)

Nguồn: skill_vfx_source5.mp4 (1280×720, 30fps, 152 frame, 5,07 giây).
Hiệu ứng duy nhất, không có nhân vật: quả cầu tích năng lượng ở góc
trên-trái kèm tia sét, chớp sáng, rồi phóng tia beam chéo xuống góc
dưới-phải (lõi cam-trắng, hào tím, dải xoắn xanh dương quấn quanh),
duy trì khoảng 2 giây rồi tàn dần thành vệt đốm sáng.

## Cách làm
- Camera tĩnh, nền tối gần như đen và không đổi (đo thực tế: frame đầu
  và frame cuối lệch nhau trung bình chỉ 0,13/255), nên tách nền bằng
  trừ nền: nền chuẩn = trung vị frame đầu + frame cuối trống.
  Alpha mềm = clip((chênh lệch kênh lớn nhất − 16)/110).
- Giữ frame gốc 8–112 → 105 frame, 30fps, 3,5 giây. Lưu ý nhịp gốc:
  frame 49 là 1 frame đen chớp đúng 1 khung hình giữa chớp tích năng
  lượng và tia beam — giữ nguyên để đúng nhịp, không phải frame lỗi.
  Vệt đốm rất mờ sau frame 112 đã bỏ.
- Downscale NEAREST về 192×108, giữ nguyên khung ngang.
- GIF phóng 3× NEAREST lên 576×324, nền trong suốt, lặp vô hạn, 30fps.
  Xuất bằng ffmpeg để đủ đúng 105 frame.

## File trong pack
- pixel_frames/frame_000.png … frame_104.png: 105 frame RGBA 192×108.
- vfx_diagonal_beam_sheet.png: atlas 15 cột × 7 hàng (2880×756).
- frames.json: thông số frame, fps, kích thước, phương pháp.
- vfx_diagonal_beam_pixel.gif: 105 frame, 576×324, nền trong suốt.
- README_VFX_PIXEL5.md: file này.

## Cách dùng trong game
- Dùng bình thường với alpha (Normal blending).
- Muốn tia beam rực hơn thì dùng Additive blending.
- Tia bay chéo từ góc trên-trái xuống góc dưới-phải; quả cầu tích
  năng lượng ở đầu trên-trái khung hình.

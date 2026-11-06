# VFX vụ nổ sức mạnh (tinh thể xanh-trắng) — bản 2D pixel
# (từ pin Pinterest 529947081132498636, "Power effect gif")

Nguồn KHÁC các mẫu trước: pin này không phải video mà là file GIF gốc
(358×312, chỉ 7 frame, mỗi frame 90ms, vòng lặp 0,63 giây).
Diễn biến: vụ nổ sao băng xanh-trắng kèm vòng tím phía sau, nở thành
mảnh tinh thể văng ra bốn phía, rồi tàn dần chỉ còn vài đốm mờ.

## Cách làm
- Nền GIF gốc là đen tuyệt đối (góc frame nào cũng 0,0,0) nên tách nền
  bằng ngưỡng độ sáng, không cần trừ nền: alpha = clip((kênh lớn nhất
  − 8)/160). Vòng tím ở frame đầu đủ sáng nên giữ nguyên.
- Giữ nguyên cả 7 frame, không cắt bỏ frame nào (frame đầu đã có vụ nổ,
  frame cuối là tàn dư mờ tự nhiên).
- Cắt khung theo vùng hiệu ứng (x 3–344, y 3–300) rồi downscale NEAREST
  về 128×111.
- GIF phóng 4× NEAREST lên 512×444, nền trong suốt, lặp vô hạn.
  Xuất bằng ffmpeg để đủ đúng 7 frame, mỗi frame đúng 90ms.

## CHÚ Ý NHỊP — KHÁC CÁC PACK TRƯỚC
Pack này chỉ có 7 frame, mỗi frame 90ms, tức khoảng 11fps — KHÔNG phải
30fps như các pack trước. Khi đưa vào Godot AnimatedSprite2D/SpriteFrames
phải để tốc độ khoảng 11fps (hoặc để thời lượng frame 90ms) mới đúng
nhịp gốc; nếu để 30fps thì vụ nổ sẽ chạy nhanh gấp 3 lần.

## File trong pack
- pixel_frames/frame_000.png … frame_006.png: 7 frame RGBA 128×111.
- vfx_power_blast_sheet.png: atlas 7 cột × 1 hàng (896×111).
- frames.json: thông số frame, fps, kích thước, phương pháp.
- vfx_power_blast_pixel.gif: 7 frame, 512×444, nền trong suốt, 90ms/frame.
- README_VFX_PIXEL7.md: file này.

## Cách dùng trong game
- Dùng bình thường với alpha (Normal blending).
- Muốn vụ nổ rực hơn thì dùng Additive blending.
- Hiệu ứng nở ra từ tâm khung hình, đặt tâm khung trùng vị trí trúng
  đòn là đúng.

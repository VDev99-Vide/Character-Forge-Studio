# Pin59 — Heal Aura (vòng hồi máu xanh lá, đã convert 2D pixel + tách nền)

Nguồn: ArtStation GIF (benjamin-b-fxheal), 506×411, 149 frame, nhịp biến đổi 20/30ms
(75 frame 20ms + 74 frame 30ms, tổng 3,72s, tb ~40 fps). md5 khớp mã cdnurl của link Bing,
đối chiếu INDEX chưa từng làm → file mới.

## Hiệu ứng
1 hiệu ứng duy nhất, không có nhân vật, không phải bảng nhiều hiệu ứng:
- Vòng tròn xanh lá nằm trên mặt đất (ellipse nghiêng, co giãn theo nhịp, có lúc 2 vòng đồng tâm).
- Dấu + xanh lá bay lơ lửng xung quanh + tia sọc dọc mảnh rơi/bay (hạt hồi máu).
- Nền gốc đen thuần (0,0,0). Không có nhân vật demo.

## Cách làm (đúng chuẩn pixel cứng)
1. Pixelate TRƯỚC bằng NEAREST 0,5× (506×411 → 253×206), không blur.
2. Tách nền sau: alpha cứng theo độ sáng (kênh sáng nhất > 30 thì giữ, ≤ 30 thì bỏ).
   Quầng xanh đen rất mờ quanh hiệu ứng (độ sáng 1–30, gần như đen, là nhiễu palette GIF)
   đã bỏ sạch để pack không bị ám đen khi đặt lên nền sáng.
3. Trước khi downscale đã giãn mask r1 (MaxFilter) để tia sọc mảnh 1–2px không bị
   rớt khi lấy mẫu điểm — tia sọc vẫn còn đủ trong pack (xem ảnh kiểm tra).
4. Crop theo bbox hợp nhất qua 149 frame → canvas 191×205, hiệu ứng phát tại chỗ.
5. Preview GIF xuất bằng ffmpeg (concat + -vsync 0), đếm đủ 149/149.
   Frame PNG + frames.json (nhịp 20/30ms từng frame) mới là bản chuẩn xác.

## Dùng trong Godot
- Chạy đúng nhịp 20/30ms từng frame (xem frames.json), đừng để mặc định 10 fps hay 30 fps.
- Dùng Additive để giữ ánh sáng xanh lá rực (nền gốc là đen).
- Lưu ý: đây là hiệu ứng hạt ngẫu nhiên (particle aura), frame cuối khác frame đầu nên
  nếu lặp lại trong Godot sẽ thấy 1 nhịp reset nhỏ ở điểm nối — đó là tính chất của nguồn,
  không phải lỗi tách. Dùng 1 lần (khi hồi máu) hoặc lặp làm aura nền đều được.
- Pack: 149 frame PNG + frames.json + atlas 13×12 + preview.gif.

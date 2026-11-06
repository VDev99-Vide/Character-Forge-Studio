# Vụn Nước Va Chạm (Water Impact)

Hiệu ứng va chạm nước xanh nhạt: tia va chạm nhỏ → khối nước xoáy phình to →
vỡ tung thành giọt → giọt văng ra rồi tan dần. Một đòn duy nhất (không lặp),
13 frame, 0,65 giây, tốc độ thật của GIF gốc 20 fps.

## Nguồn và cách làm

- Nguồn: GIF Pinterest 550×400, 13 frame, 20 fps (Pixel Art Impact Effect).
- Đây là animation mượt (không phải pixel sẵn) nên đã convert sang pixel trước
  rồi mới tách nền, đúng qui trình chuẩn: crop vùng hiệu ứng (70,5)-(455,320)
  rồi downscale NEAREST về 192×157, sau đó tách nền bằng độ lệch so với nền
  nâu phẳng (97,65,33), giãn r1 trước khi downscale để giọt nước nhỏ không bị
  mất, alpha cứng ramp 15-100, không blur.
- Nền gốc phẳng (97,65,33) ở toàn bộ vùng hiệu ứng, chỉ có viền 1px ở mép
  trên và mép trái khác màu nên crop đã loại bỏ 2 viền này.
- Giữ đủ 13 frame: frame 1 là tia va chạm, frame 13 là giọt cuối tan dần.
  Không xoay thứ tự (GIF gốc bắt đầu đúng từ lúc va chạm).

## Dùng trong game

- Điểm neo: tâm va chạm nằm giữa khung (khối nước phình ra quanh điểm chạm).
- Dùng Normal (không Additive) để giữ màu nước xanh nhạt; Additive sẽ làm
  nước sáng quá và mất vân xoáy.
- Đặt lên mặt đất hoặc điểm va chạm của đòn đánh, không cần xoay.

## File trong pack

- frames/frame_001.png … frame_013.png (192×157, RGBA)
- atlas.png (768×628, 4×4)
- frames.json (thông số pack, thứ tự frame, cách làm)
- preview.gif (13 frame, 20 fps)

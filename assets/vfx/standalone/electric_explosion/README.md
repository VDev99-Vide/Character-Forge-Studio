# Nổ Điện (Electric Explosion)

Nguồn: ảnh GIF lấy từ link Pinterest (file gốc
trên i.pinimg.com), 800×641, 88 frame, 25 fps
(40 ms/frame). Đây là animation điện 2D mượt
(không phải pixel sẵn) nên em convert sang pixel
rồi mới tách nền, theo đúng chuẩn đã chốt.

## Nội dung

- Pack lấy **1 vòng lặp hoàn chỉnh: 30 frame,
  1,2 giây, giữ đúng 25 fps thật của GIF gốc**.
- Diễn biến: tia sét đánh xuống → chớp sao trắng
  xanh ở đỉnh → tia điện lan ra kèm khói xám →
  tia và khói tàn dần → 9 frame trống cuối (nhịp
  nghỉ của vòng lặp, nối lại được với tia sét đầu
  khi lặp).
- GIF gốc dài 88 frame và lặp lại kỹ năng khoảng
  3,5 lần; pack chỉ lấy 1 vòng đầy đủ nhất (từ
  frame gốc 56 đến 85: tia sét 56, chớp 57–58, tia
  và khói 59–76, trống 77–85). Frame gốc 62 và 63
  là 1 frame giữ 2 nhịp trong animation gốc, em
  giữ cả 2 cho đúng nhịp.
- Kích thước: **192×161** (đã convert sang pixel
  từ vùng hiệu ứng 585×490, giữ đúng tỉ lệ).
- Neo: tâm vụ nổ điện, giữ nguyên vị trí mọi frame.

## Cách tách — vì sao khói xám gần màu nền mà vẫn tách được

- Nền gốc KHÔNG phải màu phẳng mà là 1 dải màu
  xanh xám chuyển dần từ giữa ra viền (gradient),
  nên khóa màu 1 màu duy nhất sẽ ăn mất khói (khói
  xám có tông gần giống nền). Em không dùng khóa
  màu mà dùng **trừ nền tĩnh**: lấy nền mẫu là
  trung vị của các frame trống hoàn toàn (frame
  gốc 77–85, nền ở đó không đổi), rồi đo từng
  điểm ảnh lệch khỏi nền mẫu tại đúng vị trí đó
  bao nhiêu.
- Đo được: điểm ảnh nền thật lệch tối đa 9, còn
  khói và tia điện lệch từ 30 trở lên — tức là
  khói tuy nhìn gần màu nền nhưng vẫn khác nền
  tại chỗ của nó đủ để tách sạch. Ngưỡng tách đặt
  ở 15 (trên nhiễu nền 9, dưới khói 30) nên nền về
  0 hoàn toàn, khói còn nguyên.
- Tia điện rất mảnh nên em giãn độ lệch 1 điểm
  trước khi thu nhỏ, để tia không bị mất khi
  chuyển sang pixel. Alpha theo dải 15–100 (không
  mờ): tia điện sáng đặc hoàn toàn, khói giữ mờ
  dần đúng bản chất khói.
- Đã kiểm tra: 4 góc mọi frame đều trong suốt
  hoàn toàn, không còn vệt nền gradient nào.

## File trong pack

- `frames/frame_001.png` … `frame_030.png` — PNG RGBA
  trong suốt, 192×161
- `atlas.png` — bảng ghép 6×5 (1152×805)
- `frames.json` — danh sách frame, fps, kích thước
- `preview.gif` — xem trước đúng kích thước gốc,
  25 fps, 30 frame (ngưỡng alpha 32 để khói mờ
  không bị mất trong GIF)

## Gợi ý dùng trong Godot

- Chạy đúng 25 fps (40 ms/frame).
- Nên dùng Additive blending (tia điện phát sáng
  sẽ đẹp nhất trên nền tối); muốn giữ khói xám
  thì dùng Normal.
- Anchor ở tâm vụ nổ.

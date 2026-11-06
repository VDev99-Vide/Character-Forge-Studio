# Tia Beam Hồng (Pink Beam, Unreal)

Nguồn: pin Pinterest 1017883953292983353 — video
native của Pinterest, 736×414, 60 fps, 908 frame,
15,19 giây, tựa "Give your thoughts on this VFX".

## Nội dung

- Video gốc lặp cùng 1 skill 3 lần. Pack lấy **1 chu
  kỳ đầy đủ: frame nguồn 314–588, lấy cách frame
  (bước 2) = 138 frame, 4,6 giây, 30 fps**.
- Diễn biến: tích lực (vòng hồng nhỏ ở điểm phát)
  → tia beam hồng bắn ngang → duy trì chớp nháy
  → mờ dần rồi tắt. Điểm phát ở giữa-trái khung,
  điểm đích ở quả cầu phải (trong pack chỉ còn
  tia và vụ nổ ở đích, quả cầu đã tách bỏ).
- Kích thước pixel: **192×108** (toàn khung).
- Tốc độ: video gốc 60 fps nhưng pack lấy cách
  frame về 30 fps cho đồng bộ với các pack khác
  trong game (tia beam chớp chậm nên 30 fps vẫn
  giữ nguyên nhịp chớp).

## Cách làm (theo chuẩn mới)

- **Pixel trước, tách nền sau:** xuống pixel bằng
  NEAREST trước cho ra ô vuông cứng, rồi mới tách
  nền trên ảnh pixel. **Không mờ alpha** — vòng
  tích lực, thân tia và vụ nổ ở đích đều là bậc
  thang pixel cứng.
- **Nền sạch tuyệt đối:** camera đứng yên (frame
  đầu vs frame cuối lệch trung bình chỉ 0,82) nên
  trừ nền bằng ảnh nền trung vị từ frame trống
  đầu video và khoảng trống giữa 2 chu kỳ (frame
  1–11 + 283–310). Alpha = 0 khi lệch dưới 10
  (nhiễu nền chỉ ±5 mức nên nền về 0 thật), đủ khi
  lệch trên 100. Đã đo kiểm: góc khung hình bằng 0
  ở mọi frame mẫu, kể cả lúc tia đang bắn.
- **Quả cầu mẫu:** video gốc có 2 quả cầu xám tĩnh
  (trái là vật đứng chơi, phải là đích của tia).
  Quả cầu phải bị tia chiếu sáng nên tách nền
  thường sẽ để lại bóng mờ — em đã đo đúng vòng
  tròn của nó từ ảnh nền (tâm (631,177) bán kính
  27) và chỉ áp ngưỡng 80 bên trong vòng đó: bóng
  mờ (lệch ~35–50) bị xóa, còn tia sáng và tia lửa
  ở đích (lệch 80+) vẫn giữ nguyên. Quả cầu trái
  không bao giờ bị chiếu sáng nên không cần xử lý
  mà nền vẫn sạch (đo được alpha 0 ở vùng đó).
- Không cần ngưỡng thích ứng cho frame chớp sáng
  như pack tia năng lượng v2: tia này màu hồng,
  độ phủ lệch tối đa chỉ 0,125 (lúc tia vừa bắn)
  so với ngưỡng chớp 0,25 nên sàn caro không bao
  giờ lộ ra — đã kiểm tra frame tia bắn và frame
  duy trì: không có sàn caro.
- Vùng lệch được giãn nhẹ 2px trước khi xuống
  pixel để mép tia mảnh không bị rớt mất. Giữ
  nguyên màu, không rút gọn bảng màu.

## File trong pack

- `frames/frame_001.png` … `frame_138.png` — PNG RGBA
  trong suốt, 192×108
- `atlas.png` — bảng ghép 12×12 (2304×1296)
- `frames.json` — danh sách frame, fps, kích thước
- `preview.gif` — xem trước 576×324 (phóng 3x bằng
  NEAREST cho rõ ô pixel), 30 fps, 138 frame
  (GIF chỉ có alpha 1 bit: ngưỡng 64; bản PNG giữ
  đủ alpha)

## Gợi ý dùng trong Godot

- Chạy đúng 30 fps (33 ms/frame).
- Nên dùng Additive blending cho tia beam này: tia
  hồng và vụ nổ sáng trên nền tối sẽ rực hơn; nếu
  game có nền sáng thì chuyển sang Normal.
- Anchor ở điểm phát (vòng tròn bên trái) nếu gắn
  tia vào tay nhân vật, hoặc ở tâm nếu gắn vào
  vị trí trúng đích.

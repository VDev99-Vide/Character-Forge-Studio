# Phun Lửa Đỏ (Fire Blast, bản đổi màu)

Nguồn: ảnh GIF lấy từ link tìm kiếm Bing (file gốc
trên i.pinimg.com), 768×432, 26 frame, 25 fps
(40 ms/frame), 1,04 giây, tựa "2D ANIMATION VFX
part 9".

**Đặc biệt theo yêu cầu của anh: bản này đã đổi
màu gốc (tím/hồng anime) thành ĐỎ LỬA.** Bản màu
tím gốc không có trong pack này — nếu anh muốn
cả bản tím thì bảo em, em xuất thêm.

## Nội dung

- Pack lấy trọn bộ **26 frame, 1,04 giây, giữ đúng
  25 fps thật của GIF gốc**.
- Diễn biến: đám khói lửa cuồn cuộn phun từ trái
  sang phải, càng lúc càng lớn, kèm bóng phản chiếu
  dưới mặt nước (giữ nguyên từ video gốc).
- Kích thước pixel: **192×108** (toàn khung).
- Hướng hiệu ứng: phun ngang từ trái sang phải.
- Lưu ý về vòng lặp: GIF gốc là 1 đoạn trích giữa
  chừng của vụ nổ (frame đầu đã thấy khói lớn,
  frame cuối khói còn đang lớn thêm) nên khi chạy
  lặp sẽ thấy 1 nhịp nhảy về ở điểm nối cuối → đầu.
  Đây là đặc tính của file gốc, không phải lỗi tách
  nền. Dùng làm skill phun lửa giữ nút thì nhịp nhảy
  này chìm trong khói hỗn loạn, vẫn dùng được.

## Cách làm (theo chuẩn mới + đổi màu)

- **Pixel trước, tách nền sau:** xuống pixel bằng
  NEAREST trước cho ra ô vuông cứng, rồi mới tách
  nền trên ảnh pixel. **Không mờ alpha** — các
  cuộn khói đều là bậc thang pixel cứng.
- **Tách nền bằng độ sáng:** video này không có
  frame trống nào (cả 26 frame đều đang nổ) nên
  không trừ nền bằng ảnh nền được. Nền gốc rất tối
  (độ sáng trung bình 21, cao nhất ~40) còn đám
  khói rất sáng (tới 255) nên alpha tính từ độ sáng:
  alpha = 0 khi độ sáng dưới 35, đủ khi trên 200.
  Đã đo kiểm: góc khung hình bằng 0 ở mọi frame
  mẫu. Khoảng tối giữa các cuộn khói về trong suốt
  (đúng: game sẽ thấy xuyên qua khe khói).
- **Đổi màu sang đỏ lửa:** màu mỗi điểm ảnh được
  tra từ độ sáng gốc qua bảng màu lửa (đỏ thẫm →
  đỏ → đỏ-cam → cam → vàng nhạt → trắng vàng).
  Lần đầu em tra theo bảng lửa chuẩn thì cả đám
  mây ra màu vàng nhạt (vì mây gốc quá sáng) nên
  em đã chỉnh lại: nén vùng vàng lên chỉ còn lõi
  nóng nhất (độ sáng trên 0,95), còn lại thân mây
  giữ đỏ và đỏ-cam — giờ nhìn là lửa đỏ phun ngang,
  lõi vàng trắng chỉ ở điểm nóng nhất. Cấu trúc
  sáng/tối của mây gốc được giữ nguyên nên hình
  dạng khói không đổi, chỉ đổi màu.
- Vùng sáng được giãn nhẹ 2px ở độ phân giải gốc
  trước khi xuống pixel để tua khói mảnh không bị
  rớt thành nét đứt.
- Bóng phản chiếu dưới mặt nước được GIỮ NGUYÊN
  (đổi sang đỏ thẫm luôn) vì đó là một phần của
  hiệu ứng gốc, không phải nền hay vật thể lạ. Nếu
  anh muốn bản phun lửa thuần không có bóng phản
  chiếu thì bảo em, em cắt phần dưới đường nước
  là xong.

## File trong pack

- `frames/frame_001.png` … `frame_026.png` — PNG RGBA
  trong suốt, 192×108
- `atlas.png` — bảng ghép 6×5 (1152×540)
- `frames.json` — danh sách frame, fps, kích thước
- `preview.gif` — xem trước 576×324 (phóng 3x bằng
  NEAREST cho rõ ô pixel), 25 fps, 26 frame
  (GIF chỉ có alpha 1 bit: ngưỡng 64; bản PNG giữ
  đủ alpha)

## Gợi ý dùng trong Godot

- Chạy đúng 25 fps (40 ms/frame).
- Nên dùng Normal blending: khói lửa đỏ cần nền
  Normal mới thấy đúng độ sâu; Additive làm khói
  bị chói và mất màu đỏ thẫm ở viền.
- Anchor ở điểm phun (mép trái) nếu gắn vào miệng
  hoặc tay nhân vật khi phun lửa.

import { Col, Container, Row } from "react-bootstrap";
import MyBreadcrumb from "../../../../components/MyBreadcrumb";

const ChinhSachVanChuyen = () => {
  return (
    <Container className="mb-3">
      <MyBreadcrumb />
      <h3 className="fw-bold">Chính sách vận chuyển - kiểm hàng</h3>
      <h6 className="fw-bold">
        MazicPC hỗ trợ giao hàng miễn phí trên toàn quốc!
      </h6>
      <Container fluid>
        <h6 className="fw-bold text-primary">1. Đơn hàng nội thành:</h6>
        <ul>
          <li>
            - Miễn phí giao hàng trong bán kính 10km kể từ vị trí của shop với
            những đơn hàng từ 3 triệu đồng.
          </li>
        </ul>
      </Container>

      <Container fluid>
        <h6 className="fw-bold text-primary">2. Đơn hàng COD sẽ bao gồm:</h6>
        <ul>
          <li>
            - Phí vận chuyển: <strong className="text-danger">Miễn phí</strong>
          </li>
          <li>
            - Phí bảo hiểm hàng hóa - thu hộ:{" "}
            <strong className="text-danger">1%</strong>giá trị máy (với máy có
            giá trị từ 20 triệu trở lên shop hỗ trợ để phí không quá 200.000đ)
          </li>
          <li>
            <strong className="fst-italic">
              * Đối với các sản phẩm hàng Hãng KH vui lòng thanh toán 100% phí.
            </strong>
          </li>
        </ul>
      </Container>

      <Container fluid>
        <h5 className="fw-bold text-success">
          HƯỚNG DẪN MUA HÀNG TỪ XA TẠI MazicPC
        </h5>
        <ul>
          <li>
            Kính chào quý khách! Để phục vụ quý khách hàng tốt hơn, MazicPC áp
            dụng mô hình bán hàng từ xa - Giao hàng trên toàn quốc - Quý khách
            nhận hàng và thanh toán trực tiếp tại nhà rất tiện dụng.
          </li>
          <li>
            <strong>Quy trình mua hàng như sau:</strong>
          </li>
          <ul>
            <li>
              - Bước 1: Quý khách chọn và đặt hàng sản phẩm muốn mua trên
              website
            </li>
            <li>
              - Bước 2: Quý khách liên hệ với nhân viên hỗ trợ qua chat ngay
              trên website hoặc số điện thoại 0825 233 233
            </li>
            <li>
              - Bước 3: MazicPC sẽ gửi mô tả chi tiết và hình ảnh thật sản phẩm
              qua Email, Facebook, Zalo cho quý khách
            </li>
            <li>- Bước 4: Quý khách xác nhận đồng ý mua</li>
            <li>- Bước 5:</li>
            <ul>
              <li>
                - Nếu Quý khách hàng mua sản phẩm Laptop cũ sẽ chuyển 500.000
                VNĐ vào tài khoản MazicPC để xác thực, tránh trường hợp đặt đơn
                hàng ảo với tên và địa chỉ giả gây thiệt hại cho MazicPC
              </li>
              <li>
                - Nếu Quý khách hàng mua sản phẩm Laptop mới sẽ chuyển 1.000.000
                VNĐ vào tài khoản MazicPC để xác thực, tránh trường hợp đặt đơn
                hàng ảo với tên và địa chỉ giả gây thiệt hại cho MazicPC
              </li>
              <li>
                - Nếu Quý khách hàng mua linh kiện, vui lòng chuyển toàn bộ giá
                trị linh kiện.
              </li>
              <li>
                - Khi chuyển quý khách ghi rõ nội dung bao gồm: "họ và tên" gửi
                về Số tài khoản:
              </li>
              <ul>
                <li>- Số tài khoản: 44666837</li>
                <li>- Tên chủ tài khoản: HOANG VAN KHOA</li>
                <li>
                  - Tên ngân hàng: ACB (Ngân hàng thương mại cổ phần Á Châu)
                </li>
                <li>- Chi nhánh: ACB - CN HOANG CAU</li>
                <li>- Swift Code: ASCBVNVX</li>
              </ul>
              <li>Bước 6:</li>
              <ul>
                <li>
                  Sau 2-7 ngày nhân viên giao hàng chuyển phát nhanh sẽ giao
                  hàng tại địa chỉ quý khách. Thời gian nhận hàng đối với khách
                  hàng ở các tỉnh miền Bắc tầm 2-3 ngày, miền Trung, miền Nam
                  3-7 ngày tùy vào vị trí từng tỉnh không kể thứ 7 chủ nhật và
                  ngày lễ.
                </li>
              </ul>
            </ul>
          </ul>
        </ul>
      </Container>

      <Container fluid>
        <h6 className="fw-bold text-primary">3. Chính sách kiểm tra hàng.</h6>
        <ul>
          <li>
            Khi khách hàng nhận hàng từ đơn vị vận chuyển. Quý khách hàng lưu ý:
          </li>
          <li>- Quay video trong quá trình mở hộp nhận hàng</li>
          <li>- Kiểm tra kĩ hình thức sản phẩm trước khi nhận</li>
          <li>- Bật máy, sử dụng thử các chức năng của máy</li>
          <li>
            - Nếu chất lượng máy đúng như mô tả, Quý khách nhận hàng và thanh
            toán tiền cho nhân viên giao hàng.
          </li>
          <li>
            - Nếu gặp vấn đề về lỗi kỹ thuật (phần cứng, phần mềm), không đúng
            như mô tả, Quý khách hãy phản hồi ngay cho nhân viên giao hàng.
            MazicPC sẽ tiến hành khắc phục, đổi cho khách hàng hoặc hoàn trả lại
            tiền đặt cọc xác thực cho quý khách và bồi thường thêm 100.000 VNĐ
            làm quà bồi thường.
          </li>
          <li>
            - Nếu sản phẩm gửi đến đúng như mô tả mà quý khách đổi ý không mua
            nữa, quý khách sẽ phải chịu hoàn toàn số tiền đặt cọc xác thực đã
            chuyển.
          </li>
        </ul>
      </Container>

      <Container fluid>
        <h5 className="fw-bold text-success">
          {" "}
          CHẾ ĐỘ BẢO HÀNH DÀNH CHO QUÝ KHÁCH Ở XA
        </h5>
        <ul>
          <li>
            Nhằm tạo điều kiện tốt nhất cho khách hàng ở xa, MazicPC áp dụng chế
            độ bảo hành 1 đổi 1 như sau:
          </li>
          <li>
            - Shop sẽ liên hệ với các đối tác gần khu vực khách hàng nhất để
            tiện hỗ trợ bảo hành nhanh nhất và tốt nhất.
          </li>
          <li>
            - Đối với KH mua từ xa trong vòng 30 ngày đầu từ khi nhận hàng. Nếu
            sản phẩm gặp lỗi phần cứng do Nhà Sản Xuất được hỗ trợ vận chuyển 2
            chiều miễn phí.
          </li>
          <li>
            - Hỗ trợ phần mềm miễn phí qua Team Viewer (trong giờ hành chính)
          </li>
        </ul>
      </Container>

      <Container fluid className="m-0 p-0">
        <Row className="p-3">
          <Col>
            <img
              src="/banner/10.jpg"
              alt="img"
              className="w-100"
              
            />
          </Col>
        </Row>
      </Container>

      <Container fluid className="m-0 p-0">
        <Row className="p-3">
          <Col>
            <img
              src="/banner/11.jpg"
              alt="img"
              className="w-100"
              
            />
          </Col>
        </Row>
      </Container>

      <Container fluid className="m-0 p-0">
        <Row className="p-3">
          <Col>
            <img
              src="/banner/12.jpg"
              alt="img"
              className="w-100"
              
            />
          </Col>
        </Row>
      </Container>

      <Container fluid className="m-0 p-0">
        <Row className="p-3">
          <Col>
            <img
              src="/banner/13.jpg"
              alt="img"
              className="w-100"
              
            />
          </Col>
        </Row>
      </Container>

      <Container fluid className="m-0 p-0">
        <Row className="p-3">
          <Col>
            <img
              src="/banner/14.jpg"
              alt="img"
              className="w-100"
              
            />
          </Col>
        </Row>
      </Container>

      <Container fluid className="m-0 p-0">
        <Row className="p-3">
          <Col>
            <img
              src="/banner/15.jpg"
              alt="img"
              className="w-100"
              
            />
          </Col>
        </Row>
      </Container>

      <h5 className="text-primary">
        Cảm ơn quý khách đã tin tưởng và ủng hộ MazicPC. Mọi thắc mắc xin liên
        hệ trực tiếp số điện thoại 0825.233.233 để được hỗ trợ trực tiếp
      </h5>

      <Container fluid className="m-0 p-0">
        <Row className="p-3">
          <Col>
            <img
              src="/banner/9.jpg"
              alt="img"
              className="w-100"
              
            />
          </Col>
        </Row>
      </Container>

      <Container fluid className="text-center">
        <strong className="d-block fw-bold fs-5">
          MazicPC.vn - Hệ thống mua bán Laptop uy tín tại Hà Nội và trên toàn
          quốc
        </strong>
        <strong className="d-block fw-bold fs-5">Hotline 0825 233 233</strong>
        <strong className="d-block fw-bold fs-5">
          Cơ sở 1: Số 18 Ngõ 121 Thái Hà - Đống Đa - Hà Nội
        </strong>
        <strong className="d-block fw-bold fs-5">
          Cơ sở 2: Số 56 Trần Phú - Hà Đông - Hà Nội
        </strong>
      </Container>
    </Container>
  );
};

export default ChinhSachVanChuyen;

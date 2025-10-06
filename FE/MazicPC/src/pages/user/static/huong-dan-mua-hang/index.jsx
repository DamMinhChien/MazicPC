import { Col, Container, Row } from "react-bootstrap";
import MyBreadcrumb from "../../../../components/MyBreadcrumb";

const HuongDanMuaHang = () => {
  return (
    <Container className="mb-3">
      <MyBreadcrumb />
      <h3 className="fw-bold text-uppercase">Hướng Dẫn Mua Hàng & Thanh Toán</h3>

      <h6 className="fw-bold">
        MazicPC.vn xin gửi tới quý khách hàng hướng dẫn chi tiết cách thức đặt
        hàng, thanh toán và nhận hàng một cách nhanh chóng và thuận tiện nhất.
      </h6>

      <Container fluid>
        <h6 className="fw-bold text-primary">
          1. Mua hàng trực tiếp tại cửa hàng
        </h6>
        <ul>
          <li>
            Quý khách có thể đến trực tiếp showroom của MazicPC để xem và lựa
            chọn sản phẩm phù hợp với nhu cầu của mình.
          </li>
          <li>
            Địa chỉ:
            <ul>
              <li>
                Cơ sở 1: Số 18 Ngõ 121 Thái Hà - Đống Đa - Hà Nội
              </li>
              <li>
                Cơ sở 2: Số 56 Trần Phú - Hà Đông - Hà Nội
              </li>
            </ul>
          </li>
          <li>Hotline hỗ trợ: 0825 233 233</li>
        </ul>
      </Container>

      <Container fluid>
        <h6 className="fw-bold text-primary">
          2. Mua hàng online qua website MazicPC.vn
        </h6>
        <ul>
          <li>Truy cập website: <strong>https://mazicpc.vn</strong></li>
          <li>Tìm sản phẩm bạn muốn mua, nhấn nút <strong>“Thêm vào giỏ hàng”</strong>.</li>
          <li>Kiểm tra giỏ hàng, nhấn <strong>“Đặt hàng”</strong> và điền đầy đủ thông tin nhận hàng.</li>
          <li>
            Sau khi xác nhận đơn, nhân viên MazicPC sẽ liên hệ lại để xác nhận
            thông tin và tiến hành giao hàng.
          </li>
        </ul>
      </Container>

      <Container fluid>
        <h6 className="fw-bold text-primary">3. Mua hàng qua điện thoại</h6>
        <ul>
          <li>
            Quý khách có thể gọi trực tiếp đến Hotline:{" "}
            <strong className="text-danger">0825 233 233</strong> để được nhân viên
            tư vấn, báo giá và đặt hàng nhanh chóng.
          </li>
          <li>
            Nhân viên sẽ hướng dẫn quý khách các bước xác nhận đơn và phương
            thức thanh toán thuận tiện nhất.
          </li>
        </ul>
      </Container>

      {/* ===== Ảnh minh họa 1 (banner) ===== */}
      <Container fluid className="m-0 p-0">
        <Row className="p-3">
          <Col>
            <img
              src="/banner/replace_this_1.jpg"
              alt="banner hướng dẫn mua hàng"
              className="w-100"
            />
          </Col>
        </Row>
      </Container>

      <Container fluid>
        <h6 className="fw-bold text-primary">4. Hình thức thanh toán</h6>
        <ul>
          <li>
            <strong>Thanh toán trực tiếp tại cửa hàng:</strong> Quý khách thanh
            toán bằng tiền mặt hoặc quẹt thẻ tại quầy.
          </li>
          <li>
            <strong>Thanh toán khi nhận hàng (COD):</strong> Áp dụng cho đơn
            giao tại nhà, quý khách trả tiền cho nhân viên giao hàng.
          </li>
          <li>
            <strong>Chuyển khoản ngân hàng:</strong> Áp dụng cho khách hàng ở
            xa, khi đã xác nhận đơn hàng.
          </li>
        </ul>
      </Container>

      {/* ===== Ảnh minh họa 2 (banner) ===== */}
      <Container fluid className="m-0 p-0">
        <Row className="p-3">
          <Col>
            <img
              src="/banner/replace_this_2.jpg"
              alt="banner thanh toán"
              className="w-100"
            />
          </Col>
        </Row>
      </Container>

      <Container fluid>
        <h6 className="fw-bold text-primary">
          5. Chính sách giao hàng toàn quốc
        </h6>
        <ul>
          <li>
            MazicPC hỗ trợ giao hàng toàn quốc thông qua các đơn vị vận chuyển
            uy tín.
          </li>
          <li>
            Thời gian giao hàng nội thành Hà Nội: từ <strong>1-2 tiếng</strong>{" "}
            tùy khu vực.
          </li>
          <li>
            Thời gian giao hàng toàn quốc: từ <strong>1-3 ngày</strong> tùy vị
            trí địa lý.
          </li>
          <li>
            Quý khách kiểm tra kỹ sản phẩm trước khi ký nhận hàng.
          </li>
        </ul>
      </Container>

      {/* ===== Ảnh minh họa 3 (banner) ===== */}
      <Container fluid className="m-0 p-0">
        <Row className="p-3">
          <Col>
            <img
              src="/banner/replace_this_3.jpg"
              alt="banner giao hàng"
              className="w-100"
            />
          </Col>
        </Row>
      </Container>

      <Container fluid>
        <h6 className="fw-bold text-danger">6. Lưu ý quan trọng</h6>
        <ul>
          <li>
            Vui lòng cung cấp đầy đủ thông tin chính xác để đảm bảo đơn hàng
            được xử lý nhanh nhất.
          </li>
          <li>
            Kiểm tra kỹ sản phẩm trước khi thanh toán hoặc ký nhận hàng.
          </li>
          <li>
            Trong trường hợp có thắc mắc hoặc vấn đề phát sinh, hãy liên hệ ngay
            với hotline hỗ trợ của MazicPC để được giải quyết nhanh chóng.
          </li>
        </ul>
      </Container>

      <Container fluid className="text-center mt-4">
        <strong className="d-block fw-bold fs-5">
          MazicPC.vn - Hệ thống mua bán Laptop uy tín tại Hà Nội và trên toàn
          quốc
        </strong>
        <strong className="d-block fw-bold fs-5">Hotline: 0825 233 233</strong>
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

export default HuongDanMuaHang;

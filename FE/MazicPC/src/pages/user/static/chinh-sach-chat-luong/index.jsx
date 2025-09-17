import { Col, Container, Row } from "react-bootstrap";
import MyBreadcrumb from "../../../../components/MyBreadcrumb";

const ChinhSachChatLuong = () => {
  return (
    <Container className="mb-3">
      <MyBreadcrumb />
      <h3 className="fw-bold">Chính sách chất lượng</h3>

      <Container fluid>
        <h6 className="fw-bold text-primary">
          1. Cam kết về chất lượng sản phẩm tại MazicPC
        </h6>
        <ul>
          <li>
            - Bảo đảm các sản phẩm nguyên bản 100%, chất lượng hoàn hảo nhất,
            cam kết không bán máy đã qua sửa chữa.
          </li>
          <li>
            - Với phương châm “Chất lượng hàng đầu" chúng tôi luôn luôn lắng
            nghe và sẵn sàng tiếp thu mọi ý kiến góp ý của quý khách hàng; không
            ngừng cải tiến, nâng cao chất lượng dịch vụ mang lại cho khách hàng
            nhiều sự lựa chọn với giá cả hợp lý nhất.
          </li>
        </ul>
      </Container>

      <Container fluid className="m-0 p-0">
        <Row className="p-3">
          <Col>
            <img src="/banner/1.jpg" alt="img" className="w-100" />
          </Col>
        </Row>
      </Container>

      <Container fluid className="m-0 p-0">
        <h6 className="fw-bold text-primary">
          2. Cam kết về chất lượng dịch vụ bán hàng tại MazicPC
        </h6>
        <ul>
          <li>
            - Cung cấp các sản phẩm theo đúng tiêu chuẩn với chất lượng tốt
            nhất.
          </li>
          <li>- Giá cả cạnh tranh phù hợp nhất.</li>
          <li>
            - Đáp ứng mọi yêu cầu của khách hàng trong thời gian ngắn nhất;
          </li>
          <li>- Tôn trọng tất cả các nhu cầu của khách hàng;</li>
          <li>
            - Đáp ứng mọi yêu cầu của khách hàng trong thời gian ngắn nhất;
          </li>
          <li>
            - Tư vấn miễn phí cho quý khách hàng về các sản phẩm của chúng tôi.
          </li>
          <li>
            - Mọi sản phẩm công ty chúng tôi cung cấp đều được bảo hành nghiêm
            túc và miễn phí trong suốt thời gian bảo hành.
          </li>
        </ul>
      </Container>

      <Container fluid className="m-0 p-0">
        <Row className="p-3">
          <Col>
            <img src="/banner/2.jpg" alt="img" className="w-100" />
          </Col>
        </Row>
      </Container>

      <Container fluid className="m-0 p-0">
        <h6 className="fw-bold text-primary">3. Mục tiêu</h6>
        <ul>
          <li>
            - MazicPC luôn mong muốn khách hàng tin tưởng và đều quay trở lại
            ủng hộ công ty.
          </li>
          <li>
            - Xác định chất lượng của sản phẩm và dịch vụ là mục tiêu hàng đầu,
            là sự tồn tại và phát triển, là sự thoả mãn yêu cầu của khách hàng
            và tạo được niềm tin của khách hàng với công ty.
          </li>
          <li>
            - Luôn luôn lắng nghe, luôn luôn cải tiến để chất lượng của sản phẩm
            và dịch vụ ngày càng tốt hơn.
          </li>
          <li>
            - Luôn hướng tới khách hàng: Mang tới những sản phẩm và dịch vụ tốt
            nhất với lợi ích của khách hàng luôn luôn là mục tiêu hàng đầu;
          </li>
          <li>
            - MazicPC hy vọng sẽ mang đến cho Quý khách hàng những sản phẩm và
            dịch vụ tốt nhất.
          </li>
        </ul>

        <Container fluid className="m-0 p-0">
          <Row className="p-3">
            <Col>
              <img src="/banner/9.jpg" alt="img" className="w-100" />
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
    </Container>
  );
};

export default ChinhSachChatLuong;

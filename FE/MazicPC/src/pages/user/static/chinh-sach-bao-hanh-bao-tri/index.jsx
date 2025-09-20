import { Col, Container, Row } from "react-bootstrap";
import MyBreadcrumb from "../../../../components/MyBreadcrumb";
//import "./style.css";

const ChinhSachBaoHanhBaoTri = () => {
  return (
    <Container className="mb-3">
      <MyBreadcrumb />
      <h3 className="fw-bold">
        Chính Sách Bảo Hành - Bảo Trì Máy Tại MazicPC
      </h3>

      <Container fluid>
        <h6 className="fw-bold text-primary">
          MazicPC áp dụng chế độ bảo hành linh hoạt nhằm giảm thiểu tối đa thời
          gian của khách hàng
        </h6>
        <ul>
          <li>
            Tất cả các sản phẩm MazicPC bán ra đều được bảo hành theo tiêu
            chuẩn của Hãng
          </li>
          <li>
            Đối với Laptop mới, trong vòng 15 ngày đầu kể từ khi mua máy, nếu
            máy phát sinh lỗi phần cứng (theo tiêu chuẩn của hãng) sẽ được 1 đổi
            1 sản phẩm tương tự.
          </li>
          <li>
            Đối với Laptop cũ qua sử dụng, Khách hàng mua máy về không ưng có
            thể đổi máy khác miễn phí trong vòng 15 ngày đầu.
          </li>
          <li>Pin và Sạc bảo hành 06 tháng</li>
          <li>
            MazicPC bán hàng tiêu chí hàng đầu là "bán hàng chất lượng tốt, uy
            tín, bảo hành nghiêm chỉnh, giá cả hợp lý"
          </li>
          <li>
            Khách hàng mua máy được hỗ trợ cài đặt phần mềm miễn phí trọn đời.
          </li>
          <li>
            Bảo hành lấy ngay đối với những linh kiện có sẵn để thay mới ngay
            như pin, bàn phím, màn hình, RAM, ổ cứng. Quý khách ngồi đợi lấy
            ngay.
          </li>
          <li>
            Đối với những máy mà linh kiện không có sẵn sẽ để lại tối đa 15 ngày
            (sau 15 ngày không khắc phục được khách hàng sẽ được đổi ngay máy
            khác tương đương)
          </li>
          <li>
            Đối với khách hàng mua từ xa trong vòng 30 ngày đầu từ khi nhận
            hàng. Nếu sản phẩm gặp lỗi phần cứng do Nhà Sản Xuất sẽ được hỗ trợ
            vận chuyển 2 chiều miễn phí.
          </li>
        </ul>
      </Container>

      <Container fluid className="m-0 p-0">
        <Row className="p-3">
          <Col>
            <img
              src="/banner/1.jpg"
              alt="img"
              className="w-100"
              
            />
          </Col>
        </Row>
      </Container>

      <Container fluid className="m-0 p-0">
        <h6 className="fw-bold text-primary">
          MazicPC áp dụng chế độ bảo hành linh hoạt nhằm giảm thiểu tối đa thời
          gian của khách hàng
        </h6>
        <ul>
          <li>
            Sản phẩm còn trong thời hạn bảo hành được tính kể từ ngày giao hàng
            hoặc được ghi trên Phiếu Bảo hành.
          </li>
          <li>
            Còn nguyên vẹn tem bảo hành của MazicPC (không bị rách, không bị
            tẩy xóa, không dán đè)
          </li>
          <li>
            Có phiếu bảo hành của MazicPC (trường hợp không có phiếu quý khách
            cung cấp đúng tên, số điện thoại mua hàng để được check thông tin
            bảo hành)
          </li>
        </ul>
      </Container>

      <Container fluid className="m-0 p-0">
        <h6 className="fw-bold text-primary">
          Những trường hợp được cài win, vệ sinh bảo dưỡng máy miễn phí:
        </h6>
        <ul>
          <li>
            Khách hàng mang máy qua trực tiếp cơ sở của MazicPC cài win và các
            phần mềm khác.
          </li>
          <li>
            Khách hàng bảo trì - vệ sinh máy tại các cơ sở của MazicPC (Khuyến
            nghị: thời gian từ 12-18 tháng sau khi mua máy lần đầu và sau 12
            tháng cho lần vệ sinh tiếp theo).
          </li>
        </ul>
      </Container>

      <Container fluid className="m-0 p-0">
        <Row className="p-3">
          <Col>
            <img
              src="/banner/2.jpg"
              alt="img"
              className="w-100"
              
            />
          </Col>
        </Row>
      </Container>

      <Container fluid className="m-0 p-0">
        <h6 className="fw-bold text-primary">
          Những trường hợp được cài win, vệ sinh bảo dưỡng máy miễn phí:
        </h6>
        <ul>
          <li>
            Khách hàng mang máy qua trực tiếp cơ sở của MazicPC cài win và các
            phần mềm khác.
          </li>
          <li>
            Khách hàng bảo trì - vệ sinh máy tại các cơ sở của MazicPC (Khuyến
            nghị: thời gian từ 12-18 tháng sau khi mua máy lần đầu và sau 12
            tháng cho lần vệ sinh tiếp theo).
          </li>
        </ul>
      </Container>

      <Container fluid className="m-0 p-0">
        <h6 className="fw-bold text-primary">
          Những trường hợp sau đây sẽ không được bảo hành:
        </h6>
        <ul>
          <li>
            Sản phẩm đã quá thời hạn bảo hành ghi trên phiếu Bảo hành hoặc tem
            Bảo hành.
          </li>
          <li>Tem bảo hành bị rách, vỡ, hoặc bị sửa đổi.​</li>
          <li>
            Sản phẩm bị hư hỏng do tác động cơ học làm rơi, vỡ, va đập, trầy
            xước, móp méo, ẩm ướt, hoen rỉ, chảy nước, chập cháy,...
          </li>
          <li>
            Sản phẩm có dấu hiệu hư hỏng do chuột bọ hoặc côn trùng xâm nhập
            hoặc do hỏa hoạn, thiên tai gây nên.
          </li>
          <li>Bản lề bị gãy hoặc hư hỏng.</li>
          <li>Tự ý tháo dỡ, sửa chữa.</li>
          <li className="mt-2">
            Những sản phẩm được mua tại MazicPC nhưng đã quá thời hạn bảo hành,
            Công ty chúng tôi sẽ hỗ trợ sửa chữa tính phí cho quí khách ưu đãi
            nhất
          </li>
        </ul>
      </Container>

      <Container fluid className="m-0 p-0">
        <Row className="p-3">
          <Col>
            <img
              src="/banner/3.jpg"
              alt="img"
              className="w-100"
              
            />
          </Col>
        </Row>
      </Container>

      <Container fluid className="m-0 p-0">
        <h6 className="fw-bold text-primary">
          Thông tin chi tiết về bảo hành Quý khách hàng có thể liên hệ đến số
          điện thoại: 0825.233.233 (nhánh số 3) hoặc trực tiếp tới:
        </h6>
        <ul>
          <li>
            MazicPC cơ sở Thái Hà - Số 18, ngõ 121, Thái Hà, Đống Đa, Hà Nội
          </li>
          <li>MazicPC cơ sở Hà Đông - Số 56 Trần Phú, Hà Đông, Hà Nội</li>
        </ul>
      </Container>

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

export default ChinhSachBaoHanhBaoTri;

import Countdown from "react-countdown";
import { Container, Row, Col, Badge } from "react-bootstrap";
import { FaBolt } from "react-icons/fa";

export default function FlashSaleBanner({ product }) {
  if (!product || !product.promotionName) return null;

  const start = new Date(product.startDate);
  const end = new Date(product.endDate);
  
  if (start.getTime() > Date.now() || Date.now() > end.getTime()) return null;

  const renderer = ({ days, hours, minutes, seconds }) => (
    <Container
      fluid
      className="bg-danger text-white py-2 rounded d-flex align-items-center justify-content-between"
    >
      {/* Bên trái: logo Flash Sale */}
      <div className="d-flex align-items-center fw-bold fs-5">
        <FaBolt className="me-2" />
        FLASH SALE
      </div>

      {/* Ở giữa: chữ “KẾT THÚC TRONG” */}
      <div className="text-uppercase fw-semibold">Kết thúc trong</div>

      {/* Bên phải: countdown */}
      <Row className="gx-1">
        <Col xs="auto">
          <TimeBox value={days} label="NGÀY" variant="danger" />
        </Col>
        <Col xs="auto">
          <TimeBox value={hours} label="GIỜ" variant="danger" />
        </Col>
        <Col xs="auto">
          <TimeBox value={minutes} label="PHÚT" variant="danger" />
        </Col>
        <Col xs="auto">
          <TimeBox value={seconds} label="GIÂY" variant="danger" />
        </Col>
      </Row>
    </Container>
  );

  return <Countdown date={end.getTime()} renderer={renderer} />;
}

// Component phụ hiển thị mỗi ô thời gian
function TimeBox({ value, label, variant = "danger" }) {
  return (
    <div className="bg-white text-center rounded px-2 py-1">
      <div className={`fw-bold text-${variant}`} style={{ fontSize: "1rem" }}>
        {String(value).padStart(2, "0")}
      </div>
      <small className={`text-${variant}`}>{label}</small>
    </div>
  );
}

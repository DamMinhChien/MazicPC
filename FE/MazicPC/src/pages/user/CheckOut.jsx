import { Card, Col, Container, Row } from "react-bootstrap";
import { FaMapMarkerAlt } from "react-icons/fa";
import Address from "./Address";

const CheckOut = () => {
  return (
    <>
      <h2 className="text-center">Thanh toán</h2>
      <h6 className="text-center">Xử lý đơn hàng nhanh chóng</h6>
      <Container className="mt-4">
        <Card>
            <Card.Title className="text-danger">
                <span className="me-2"><FaMapMarkerAlt />Địa chỉ nhận hàng</span>
            </Card.Title>
            <Card.Body>
                <Address/>
            </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default CheckOut;

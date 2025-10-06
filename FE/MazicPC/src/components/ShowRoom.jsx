import { Col, Container, Row } from "react-bootstrap";

const ShowRoom = () => {
  return (
    <Container className="p-2">
      <Row className="justify-content-center g-4">
        <Col lg={6} md>
          <a href="https://maps.app.goo.gl/Yc2CxJwJKoEWKSU76">
            <img src="/showroom/1.jpg" alt="showroom" className="w-100" />
          </a>
        </Col>
        <Col lg={6} md>
          <a href="https://maps.app.goo.gl/HKuraUSrJDQzVjJK7">
            <img src="/showroom/2.jpg" alt="showroom" className="w-100" />
          </a>
        </Col>
      </Row>
    </Container>
  );
};

export default ShowRoom;

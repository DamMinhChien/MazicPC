import { Container, Card, Button, Row, Col } from "react-bootstrap";
import MyFullSpinner from "../../components/MyFullSpinner";
import { useQuery } from "@tanstack/react-query";
import shippingAddressService from "../../apis/shippingAddressService";
import { IoAddCircleOutline } from "react-icons/io5";

const Address = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["Address"],
    queryFn: () => shippingAddressService.getShippingAddresses(),
  });

  return (
    <>
      <h2 className="text-center my-4">Địa chỉ nhận hàng</h2>
      <Container>
        <Row className="g-3">
          {data?.length > 0 ? (
            data.map((addr) => (
              <Col md={6} lg={4} key={addr.id}>
                <Card className="shadow-lg h-100">
                  <Card.Body>
                    <Card.Title className="mb-2">{addr.fullName}</Card.Title>
                    <Card.Subtitle className="text-muted mb-2">
                      {addr.phone}
                    </Card.Subtitle>
                    <Card.Text>
                      <div>{addr.detailAddress}</div>
                      <div>
                        {addr.ward}, {addr.district}, {addr.province}
                      </div>
                      {addr.note && (
                        <div className="mt-2 text-secondary">
                          <small>Ghi chú: {addr.note}</small>
                        </div>
                      )}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            !isLoading && (
              <p className="text-center text-muted">Chưa có địa chỉ nào.</p>
            )
          )}
        </Row>

        <div className="text-center my-4">
          <Button variant="outline-primary">
            <IoAddCircleOutline /> Thêm địa chỉ mới
          </Button>
        </div>
      </Container>

      <MyFullSpinner show={isLoading} />
    </>
  );
};

export default Address;

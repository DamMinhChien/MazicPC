import React, { useMemo, useState } from "react";
import {
  Card,
  Col,
  Container,
  Row,
  ListGroup,
  Image,
  Form,
  Button,
  Badge,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import {
  FaMapMarkerAlt,
  FaTruck,
  FaCcVisa,
  FaMoneyBillWave,
} from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import shippingAddressService from "../../apis/shippingAddressService";
import orderServices from "../../apis/orderServices";
import { IoAddCircleOutline } from "react-icons/io5";
import ROUTERS from "../../utils/router";

const formatPrice = (v) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    v || 0
  );

const CheckOut = () => {
  const navigate = useNavigate();
  const cart = useSelector((s) => s.cart?.items || []);
  const user = useSelector((s) => s.auth?.user);

  const { data: addresses = [], isLoading: addrLoading } = useQuery({
    queryKey: ["shippingAddresses"],
    queryFn: () => shippingAddressService.getShippingAddresses(),
  });

  const [selectedAddrId, setSelectedAddrId] = useState(
    () => addresses?.[0]?.id || null
  );
  const [shippingMethod, setShippingMethod] = useState("STANDARD");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [coupon, setCoupon] = useState("");
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");

  const addNewAddress = () => {
    navigate(ROUTERS.USER.ADDRESS);
  }
  // subtotal, shipping, discount, total
  const subtotal = useMemo(
    () =>
      cart.reduce((sum, it) => {
        const price = it?.product?.price ?? it?.price ?? 0;
        const qty = it?.quantity ?? it?.qty ?? 1;
        return sum + price * qty;
      }, 0),
    [cart]
  );

  const shippingFee = useMemo(
    () => (shippingMethod === "EXPRESS" ? 45000 : 20000),
    [shippingMethod]
  );

  const discount = useMemo(() => {
    // placeholder: coupon logic
    if (!coupon) return 0;
    if (coupon === "SALE10") return Math.round(subtotal * 0.1);
    return 0;
  }, [coupon, subtotal]);

  const total = subtotal + shippingFee - discount;

  const handlePlaceOrder = async () => {
    setError("");
    if (!selectedAddrId) {
      setError("Vui lòng chọn địa chỉ nhận hàng.");
      return;
    }
    if (!cart.length) {
      setError("Giỏ hàng trống.");
      return;
    }

    setPlacing(true);
    try {
      const payload = {
        items: cart.map((it) => ({
          productId: it.product?.id ?? it.id,
          quantity: it.quantity ?? it.qty ?? 1,
          price: it.product?.price ?? it.price,
        })),
        shippingAddressId: selectedAddrId,
        shippingMethod,
        paymentMethod,
        coupon: coupon || null,
        totalAmount: total,
        note: "",
      };

      const res = await orderServices.createOrder(payload);
      // nếu cổng trả về url -> redirect (VNPAY/MOMO)
      if (res?.paymentUrl) {
        window.location.href = res.paymentUrl;
        return;
      }

      // else navigate to order detail / success page
      navigate(`/orders/${res?.id ?? ""}`, { replace: true });
    } catch (err) {
      console.error(err);
      setError(err?.message || "Đặt hàng thất bại. Vui lòng thử lại.");
    } finally {
      setPlacing(false);
    }
  };

  return (
    <Container className="py-5">
      <Card className="shadow-lg p-4">
        <h2 className="text-center fw-bold">Thanh toán</h2>
        <p className="text-center text-muted">
          Hoàn tất đơn hàng trong vài bước — nhanh chóng và an toàn
        </p>
      </Card>

      <Row className="mt-4 g-4">
        {/* LEFT: address + shipping + payment */}
        <Col lg={7}>
          <Card className="p-3 shadow-sm">
            <div className="d-flex align-items-center mb-3">
              <FaMapMarkerAlt size={20} className="text-danger me-2" />
              <h5 className="mb-0">Địa chỉ nhận hàng</h5>
            </div>

            {addrLoading ? (
              <div className="text-center py-4">
                <Spinner animation="border" />
              </div>
            ) : addresses.length ? (
              <ListGroup>
                {addresses.map((a) => (
                  <ListGroup.Item
                    key={a.id}
                    action
                    onClick={() => setSelectedAddrId(a.id)}
                    active={selectedAddrId === a.id}
                    className="d-flex justify-content-between align-items-start"
                  >
                    <div>
                      <div className="fw-bold">
                        {a.fullName}{" "}
                        <small className="text-muted">· {a.phone}</small>
                      </div>
                      <div className="text-muted small">
                        {a.detailAddress}, {a.ward}, {a.district}, {a.province}
                      </div>
                      {a.note && (
                        <div className="small text-secondary">
                          Ghi chú: {a.note}
                        </div>
                      )}
                    </div>
                    <div>
                      {a.isDefault && <Badge bg="primary">Mặc định</Badge>}
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : (
              <div className="text-center py-4">
                <p className="text-muted mb-3">Không có địa chỉ nhận hàng</p>
                <Button onClick={addNewAddress} variant="outline-primary">
                  <IoAddCircleOutline className="me-2" />
                  Thêm địa chỉ mới
                </Button>
              </div>
            )}

            <div className="mt-4">
              <h6 className="mb-2">
                <FaTruck className="me-2" />
                Phương thức vận chuyển
              </h6>
              <Form>
                <Form.Check
                  type="radio"
                  id="ship-standard"
                  name="shipping"
                  label={`Giao tiêu chuẩn — ${formatPrice(20000)}`}
                  checked={shippingMethod === "STANDARD"}
                  onChange={() => setShippingMethod("STANDARD")}
                />
                <Form.Check
                  type="radio"
                  id="ship-express"
                  name="shipping"
                  label={`Giao nhanh — ${formatPrice(45000)}`}
                  checked={shippingMethod === "EXPRESS"}
                  onChange={() => setShippingMethod("EXPRESS")}
                />
              </Form>
            </div>

            <hr />

            <div>
              <h6 className="mb-2">Phương thức thanh toán</h6>
              <Form>
                <Form.Check
                  type="radio"
                  id="pay-cod"
                  name="payment"
                  label={
                    <>
                      <FaMoneyBillWave className="me-2" />
                      Thanh toán khi nhận hàng (COD)
                    </>
                  }
                  checked={paymentMethod === "COD"}
                  onChange={() => setPaymentMethod("COD")}
                />
                <Form.Check
                  type="radio"
                  id="pay-vnpay"
                  name="payment"
                  label={
                    <>
                      <FaCcVisa className="me-2" />
                      Thanh toán điện tử (VNPay)
                    </>
                  }
                  checked={paymentMethod === "VNPAY"}
                  onChange={() => setPaymentMethod("VNPAY")}
                />
                <Form.Text className="text-muted small">
                  Bạn có thể thanh toán trực tiếp hoặc qua cổng thanh toán.
                </Form.Text>
              </Form>
            </div>
          </Card>
        </Col>

        {/* RIGHT: order summary */}
        <Col lg={5}>
          <Card className="shadow-sm">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Đơn hàng</h5>
              <small className="text-muted d-block">
                Người mua: {user?.user?.fullName || "Khách"}
              </small>
            </Card.Header>

            <ListGroup variant="flush">
              {cart.length ? (
                cart.map((it) => {
                  const p = it.product ?? it;
                  const qty = it.quantity ?? it.qty ?? 1;
                  const img =
                    p.imageUrl || p.thumbnail || "/avatar_placeholder.jpg";
                  const price = p.price ?? it.price ?? 0;
                  return (
                    <ListGroup.Item
                      key={p.id || p.productId}
                      className="d-flex align-items-center"
                    >
                      <Image
                        src={img}
                        rounded
                        width={64}
                        height={64}
                        className="object-fit-cover me-3"
                      />
                      <div className="flex-grow-1">
                        <div className="fw-semibold">{p.name || p.title}</div>
                        <div className="text-muted small">Số lượng: {qty}</div>
                      </div>
                      <div className="text-end fw-bold">
                        {formatPrice(price * qty)}
                      </div>
                    </ListGroup.Item>
                  );
                })
              ) : (
                <ListGroup.Item className="text-center text-muted">
                  Giỏ hàng trống
                </ListGroup.Item>
              )}
            </ListGroup>

            <Card.Body>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Mã giảm giá (ví dụ: SALE10)"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                />
                <Button variant="outline-secondary" onClick={() => {}}>
                  Áp dụng
                </Button>
              </InputGroup>

              <div className="d-flex justify-content-between">
                <div className="text-muted">Tạm tính</div>
                <div className="fw-bold">{formatPrice(subtotal)}</div>
              </div>

              <div className="d-flex justify-content-between">
                <div className="text-muted">Phí vận chuyển</div>
                <div>{formatPrice(shippingFee)}</div>
              </div>

              <div className="d-flex justify-content-between">
                <div className="text-muted">Giảm giá</div>
                <div className="text-success">- {formatPrice(discount)}</div>
              </div>

              <hr />

              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="text-muted small">Tổng thanh toán</div>
                  <div className="text-muted small">
                    (Đã bao gồm VAT nếu có)
                  </div>
                </div>
                <div className="fs-4 text-primary fw-bold">
                  {formatPrice(total)}
                </div>
              </div>

              {error && <div className="text-danger mt-2">{error}</div>}

              <Button
                className="w-100 mt-3"
                variant="primary"
                size="lg"
                onClick={handlePlaceOrder}
                disabled={placing || !cart.length || addrLoading}
              >
                {placing ? (
                  <>
                    <Spinner animation="border" size="sm" /> Đang đặt...
                  </>
                ) : (
                  "Đặt hàng và Thanh toán"
                )}
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <style jsx>{`
        .object-fit-cover {
          object-fit: cover;
        }
        @media (max-width: 991px) {
          .card-header {
            text-align: center;
          }
        }
      `}</style>
    </Container>
  );
};

export default CheckOut;

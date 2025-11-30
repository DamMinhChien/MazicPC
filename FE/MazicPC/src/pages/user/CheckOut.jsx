import { useMemo, useState } from "react";
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
  FaCheckCircle,
} from "react-icons/fa";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import shippingAddressService from "../../apis/shippingAddressService";
import orderServices from "../../apis/orderServices";
import cartService from "../../apis/cartService";
import { IoAddCircleOutline } from "react-icons/io5";
import ROUTERS from "../../utils/router";
import shippingMethodServices from "../../apis/shippingMethodServices";
import couponServices from "../../apis/couponServices";
import momoService from "../../apis/momoService";
import MyToast from "../../components/MyToast";

const formatPrice = (v) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    v || 0
  );

// Add this helper function at the top level
const getErrorMessage = (error) => {
  if (!error) return "Có lỗi xảy ra";

  // Case 1: String error
  if (typeof error === "string") return error;

  // Case 2: FluentValidation error object
  if (error.errors) {
    // FluentValidation returns { errors: { propertyName: ["error1", "error2"] } }
    const firstError = Object.values(error.errors)[0];
    if (Array.isArray(firstError)) {
      return firstError[0];
    }
  }

  // Case 3: Axios error with response data
  if (error.response?.data) {
    const data = error.response.data;
    // Handle FluentValidation response
    if (data.errors) {
      const firstError = Object.values(data.errors)[0];
      if (Array.isArray(firstError)) {
        return firstError[0];
      }
    }
    // Handle string response
    if (typeof data === "string") return data;
    // Handle object with message
    if (data.message) return data.message;
  }

  // Case 4: Error with message property
  if (error.message) return error.message;

  // Fallback: try to stringify the error
  try {
    return JSON.stringify(error);
  } catch {
    return "Có lỗi xảy ra";
  }
};

const CheckOut = () => {
  const navigate = useNavigate();
  const addNewAddress = () => navigate(ROUTERS.USER.ADDRESS);
  const user = useSelector((s) => s.auth?.user);
  const { state } = useLocation();
  const queryClient = useQueryClient();

  // nhận items & from từ route
  const items = state?.items || [];
  const from = state?.from || "detail";

  // Fetch shipping methods
  const { data: shippingMethods = [], isLoading: loadingShipping } = useQuery({
    queryKey: ["shippingMethods"],
    queryFn: () => shippingMethodServices.getShippingMethods(),
  });

  // Fetch addresses
  const { data: addresses = [], isLoading: addrLoading } = useQuery({
    queryKey: ["shippingAddresses"],
    queryFn: () => shippingAddressService.getShippingAddresses(),
  });

  const [selectedAddrId, setSelectedAddrId] = useState(
    () => addresses?.[0]?.id || null
  );
  const [shippingMethod, setShippingMethod] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [couponCode, setCouponCode] = useState("");
  const [couponData, setCouponData] = useState(null);
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");
  const [couponMessage, setCouponMessage] = useState(null);

  // Add toast state
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "danger",
    title: "Lỗi",
  });

  // coupon validation mutation (gọi khi nhấn "Áp dụng")
  const validateCouponMutation = useMutation({
    mutationFn: (code) => couponServices.validateCoupon(code),
    onSuccess: (data) => {
      // server trả về { message, discount, isPercent, startDate, endDate }
      setCouponData(data);
      setToast({
        show: true,
        message: data.message || "Áp dụng mã giảm giá thành công",
        type: "success",
        title: "Thành công",
      });
      // nếu muốn refresh cart hoặc các query liên quan:
      queryClient.invalidateQueries(["cart"]);
    },
    onError: (err) => {
      setCouponData(null);
      setToast({
        show: true,
        message: getErrorMessage(err),
        type: "danger",
        title: "Lỗi",
      });
    },
  });

  // Price calculations
  const subtotal = useMemo(
    () =>
      items.reduce((sum, it) => {
        const price = it?.finalPrice ?? it?.price ?? 0;
        const qty = it?.quantity ?? it?.qty ?? 1;
        return sum + price * qty;
      }, 0),
    [items]
  );

  const shippingFee = useMemo(() => {
    const method = shippingMethods.find(
      (m) => String(m.id) === String(shippingMethod)
    );
    return method?.fee ?? 0;
  }, [shippingMethod, shippingMethods]);

  const discount = useMemo(() => {
    if (!couponData) return 0;
    // server returns { discount, isPercent }
    if (couponData.isPercent) {
      return Math.round(subtotal * (Number(couponData.discount) / 100));
    }
    return Number(couponData.discount) || 0;
  }, [couponData, subtotal]);

  const total = subtotal + shippingFee - discount;

  // Handle apply coupon
  const handleApplyCoupon = async () => {
    setCouponMessage(null);
    setCouponData(null);
    const code = (couponCode || "").trim();
    if (!code) {
      setCouponMessage({ text: "Vui lòng nhập mã giảm giá.", type: "error" });
      return;
    }
    validateCouponMutation.mutate(code);
  };

  // ✅ thanh toán
  const handlePlaceOrder = async () => {
    setError("");
    if (!selectedAddrId) {
      setError("Vui lòng chọn địa chỉ nhận hàng.");
      return;
    }
    if (!shippingMethod) {
      setError("Vui lòng chọn phương thức vận chuyển.");
      return;
    }
    if (!items.length) {
      setError("Không có sản phẩm để thanh toán.");
      return;
    }

    setPlacing(true);
    try {
      const payload = {
        shippingAddressId: Number(selectedAddrId),
        shippingMethodId: Number(shippingMethod),
        couponCode: couponCode || null,
        paymentMethod: paymentMethod, // "COD" or "MOMO"
        orderItems: items.map((it) => ({
          productId: Number(it.productId),
          quantity: Number(it.quantity ?? 1),
        })),
      };

      const res = await orderServices.createOrder(payload);

      // Clear cart if order from cart
      if (from === "cart") {
        const productIds = items.map((it) => it.productId);
        await cartService.deleteCarts(productIds);
      }

      if (paymentMethod === "MOMO") {
        const momoRes = await momoService.createPayment(res.id);
        // redirect to momo payment url
        if (momoRes && momoRes.payUrl) {
          window.location.href = momoRes.payUrl;
          return; // exit to avoid navigating to success page
        } else {
          throw new Error("Khởi tạo thanh toán MoMo thất bại");
        }
      }

      navigate(ROUTERS.COMMON.PAYMENT_SUCCESS, { replace: true });
    } catch (err) {
      setToast({
        show: true,
        message: getErrorMessage(err),
        type: "danger",
        title: "Lỗi đặt hàng",
      });
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
        {/* LEFT */}
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
                    </div>
                    {a.isDefault && <Badge bg="primary">Mặc định</Badge>}
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
              {loadingShipping ? (
                <div className="text-center py-2">
                  <Spinner animation="border" size="sm" />
                </div>
              ) : (
                <Form>
                  {shippingMethods.map((method) => (
                    <Form.Check
                      key={method.id}
                      type="radio"
                      id={`ship-${method.id}`}
                      name="shipping"
                      label={`${method.name} — ${formatPrice(method.fee)}`}
                      checked={String(shippingMethod) === String(method.id)}
                      onChange={() => setShippingMethod(method.id)}
                    />
                  ))}
                </Form>
              )}
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
                  id="pay-momo"
                  name="payment"
                  label={
                    <>
                      <FaCcVisa className="me-2" />
                      Thanh toán ví điện tử (MoMo)
                    </>
                  }
                  checked={paymentMethod === "MOMO"}
                  onChange={() => setPaymentMethod("MOMO")}
                />
              </Form>
            </div>
          </Card>
        </Col>

        {/* RIGHT */}
        <Col lg={5}>
          <Card className="shadow-sm">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Đơn hàng</h5>
              <small className="text-muted d-block">
                Người mua: {user?.user?.fullName || "Khách"}
              </small>
            </Card.Header>

            <ListGroup variant="flush">
              {items.length ? (
                items.map((it) => (
                  <ListGroup.Item
                    key={it.productId}
                    className="d-flex align-items-center"
                  >
                    <Image
                      src={it.imageUrl || "/avatar_placeholder.jpg"}
                      rounded
                      width={64}
                      height={64}
                      className="object-fit-cover me-3"
                    />
                    <div className="flex-grow-1">
                      <div className="fw-semibold">{it.name}</div>
                      <div className="small text-muted">
                        Số lượng: {it.quantity}
                      </div>
                      <div>
                        {it.finalPrice !== it.price && (
                          <span className="text-muted text-decoration-line-through me-2">
                            {formatPrice(it.price)}
                          </span>
                        )}
                        <span className="fw-bold text-primary">
                          {formatPrice(it.finalPrice)}
                        </span>
                      </div>
                    </div>
                    <div className="text-end fw-bold">
                      {formatPrice(it.finalPrice * it.quantity)}
                    </div>
                  </ListGroup.Item>
                ))
              ) : (
                <ListGroup.Item className="text-center text-muted">
                  Không có sản phẩm
                </ListGroup.Item>
              )}
            </ListGroup>

            <Card.Body>
              <InputGroup className="mb-1">
                <Form.Control
                  placeholder="Nhập mã giảm giá"
                  value={couponCode}
                  onChange={(e) => {
                    setCouponCode(e.target.value.toUpperCase());
                    // nếu user thay đổi mã, xóa thông báo/ket quả trước đó
                    setCouponMessage(null);
                    setCouponData(null);
                  }}
                  disabled={validateCouponMutation.isLoading}
                />
                <Button
                  variant="outline-secondary"
                  onClick={handleApplyCoupon}
                  disabled={validateCouponMutation.isLoading}
                >
                  {validateCouponMutation.isLoading ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    "Áp dụng"
                  )}
                </Button>
              </InputGroup>

              {couponMessage?.text && (
                <div
                  className={`small mb-3 ${
                    couponMessage.type === "error"
                      ? "text-danger"
                      : "text-success"
                  }`}
                >
                  {couponMessage.type === "success" && (
                    <FaCheckCircle className="me-1" />
                  )}
                  {couponMessage.text}
                </div>
              )}

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
                disabled={
                  placing || !items.length || addrLoading || !shippingMethod
                }
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

      {/* Replace the old toast with new implementation */}
      <MyToast
        show={toast.show}
        message={toast.message}
        bg={toast.type}
        title={toast.title}
        onClose={() => setToast((prev) => ({ ...prev, show: false }))}
      />

      <style jsx>{`
        .object-fit-cover {
          object-fit: cover;
        }

        /* ✅ Khi item được chọn (active) */
        .list-group-item.active {
          background-color: #ff4d4f !important; /* đỏ nổi bật */
          border-color: #ff4d4f !important;
          color: #fff !important; /* chữ trắng */
        }

        /* ✅ Đảm bảo text con (h5, div, small) cũng trắng */
        .list-group-item.active .fw-bold,
        .list-group-item.active .text-muted,
        .list-group-item.active small {
          color: #fff !important;
        }

        /* ✅ Hover nhẹ */
        .list-group-item:hover {
          background-color: #fff5f5;
        }
      `}</style>
    </Container>
  );
};

export default CheckOut;

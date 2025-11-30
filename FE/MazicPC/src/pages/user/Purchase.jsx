import { useState } from "react";
import {
  Container,
  Card,
  Badge,
  ListGroup,
  Button,
  Modal,
  Spinner,
} from "react-bootstrap";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaMapMarkerAlt, FaCreditCard } from "react-icons/fa";
import orderServices from "../../apis/orderServices";
import MyToast from "../../components/MyToast";
import momoService from "../../apis/momoService";

const getPaymentStatusLabel = (status) => {
  switch (status) {
    case "Completed":
      return "Đã thanh toán";

    case "Pending":
      return "Chờ thanh toán";

    case "Processing":
      return "Đang xử lý thanh toán";

    case "Failed":
      return "Thanh toán thất bại";

    case "Refunding":
      return "Đang hoàn tiền";

    case "Refunded":
      return "Đã hoàn tiền";

    case "Cancelled":
      return "Đã hủy thanh toán";

    default:
      return "Không xác định";
  }
};

// Helper function to format price
const formatPrice = (v) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    v || 0
  );

// Helper function to format date
const formatDate = (dateString) => {
  try {
    return new Date(dateString).toLocaleString("vi-VN");
  } catch {
    return dateString;
  }
};

// Status badge colors and labels
const STATUS_BADGES = {
  ALL: { bg: "secondary", text: "Tất cả" },
  PENDING: { bg: "warning", text: "Chờ xác nhận" },
  CONFIRMED: { bg: "info", text: "Đã xác nhận" },
  DELIVERING: { bg: "primary", text: "Đang giao" },
  COMPLETED: { bg: "success", text: "Đã giao" },
  CANCELLED: { bg: "danger", text: "Đã hủy" },
  RETURNING: { bg: "dark", text: "Đang trả hàng" },
  RETURNED: { bg: "secondary", text: "Đã trả hàng" },
};

// Chuẩn hóa status từ server
const normalizeStatus = (s) =>
  String(s ?? "")
    .trim()
    .toUpperCase();

const Purchase = () => {
  const queryClient = useQueryClient();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const [statusFilter, setStatusFilter] = useState("ALL");

  // Fetch orders
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: () => orderServices.getOrders(),
  });

  // Cancel order mutation
  const cancelMutation = useMutation({
    mutationFn: (orderId) => orderServices.cancelOrder(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
      setToast({
        show: true,
        message: "Đã hủy đơn hàng thành công",
        type: "success",
      });
      setShowCancelModal(false);
    },
    onError: (err) => {
      setToast({
        show: true,
        message: err?.message || "Hủy đơn hàng thất bại",
        type: "danger",
      });
    },
  });

  // Refund order mutation
  const refundMutation = useMutation({
    mutationFn: (orderId) => momoService.refundPayment(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
      setToast({
        show: true,
        message: "Hoàn tiền thành công",
        type: "success",
      });
      setShowRefundModal(false);
    },
    onError: (err) => {
      setToast({
        show: true,
        message: err?.response?.data || err?.message || "Hoàn tiền thất bại",
        type: "danger",
      });
    },
  });

  // Return order mutation
  const returnMutation = useMutation({
    mutationFn: (orderId) => orderServices.returnOrder(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
      setToast({
        show: true,
        message: "Yêu cầu trả hàng thành công",
        type: "success",
      });
      setShowReturnModal(false);
    },
    onError: (err) => {
      setToast({
        show: true,
        message: err?.message || "Yêu cầu trả hàng thất bại",
        type: "danger",
      });
    },
  });

  const handleCancel = (order) => {
    setSelectedOrder(order);
    setShowCancelModal(true);
  };

  const handleRefund = (order) => {
    setSelectedOrder(order);
    setShowRefundModal(true);
  };

  const handleReturn = (order) => {
    setSelectedOrder(order);
    setShowReturnModal(true);
  };

  // Filter orders by selected status
  const filteredOrders = orders.filter((order) => {
    const ordStatus = normalizeStatus(order.status);
    return (
      normalizeStatus(statusFilter) === "ALL" ||
      ordStatus === normalizeStatus(statusFilter)
    );
  });

  if (isLoading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  const statusForCancelButton = ["PENDING", "CONFIRMED"];
  const statusForRefundButton = ["CANCELLED", "RETURNED"];
  const statusForReturnButton = ["COMPLETED"];

  return (
    <Container className="py-5">
      <Card className="shadow-sm mb-4">
        <Card.Body>
          <h4 className="text-center fw-bold mb-4">Đơn hàng của tôi</h4>

          {/* Status filter buttons */}
          <div className="d-flex justify-content-center gap-2 flex-wrap">
            {Object.entries(STATUS_BADGES).map(([status, { bg, text }]) => (
              <Button
                key={status}
                variant={statusFilter === status ? bg : "outline-secondary"}
                onClick={() => setStatusFilter(status)}
                size="sm"
                className="px-3"
              >
                {text}
              </Button>
            ))}
          </div>
        </Card.Body>
      </Card>

      {filteredOrders.length === 0 ? (
        <Card className="text-center p-5">
          <div className="text-muted">
            {orders.length === 0
              ? "Chưa có đơn hàng nào"
              : "Không có đơn hàng nào ở trạng thái này"}
          </div>
        </Card>
      ) : (
        filteredOrders.map((order) => (
          <Card key={order.id} className="mb-4 shadow-sm">
            <Card.Header className="bg-white">
              <div className="d-flex justify-content-between align-items-center">
                <h6 className="mb-0">
                  Đơn hàng #{order.id}
                  <span className="text-muted ms-2">
                    · {formatDate(order.createdAt)}
                  </span>
                </h6>
                <Badge
                  bg={
                    STATUS_BADGES[normalizeStatus(order.status)]?.bg ||
                    "secondary"
                  }
                >
                  {STATUS_BADGES[normalizeStatus(order.status)]?.text ||
                    order.status}
                </Badge>
              </div>
            </Card.Header>

            <ListGroup variant="flush">
              {order.items.map((item) => (
                <ListGroup.Item key={item.productId}>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <div className="fw-semibold">{item.productName}</div>
                      <div className="text-muted small">
                        {formatPrice(item.price)} × {item.quantity}
                      </div>
                    </div>
                    <div className="fw-bold">{formatPrice(item.subTotal)}</div>
                  </div>
                </ListGroup.Item>
              ))}

              <ListGroup.Item>
                <div className="d-flex mb-2">
                  <FaMapMarkerAlt className="text-danger mt-1 me-2" />
                  <div>
                    <div className="fw-semibold">
                      {order.shippingAddress.fullName} ·{" "}
                      {order.shippingAddress.phone}
                    </div>
                    <div className="text-muted small">
                      {order.shippingAddress.detailAddress},{" "}
                      {order.shippingAddress.ward},{" "}
                      {order.shippingAddress.district},{" "}
                      {order.shippingAddress.province}
                    </div>
                  </div>
                </div>

                <div className="d-flex mb-2">
                  <FaCreditCard className="text-primary mt-1 me-2" />
                  <div>
                    <div className="fw-semibold">
                      {order.payment.paymentMethod === "COD"
                        ? "Thanh toán khi nhận hàng"
                        : `Thanh toán điện tử (${order.payment.paymentMethod})`}
                    </div>
                    <div className="text-muted small">
                      Trạng thái:{" "}
                      {getPaymentStatusLabel(order?.payment?.status)}
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center mt-3">
                  <div className="text-muted">Tổng tiền</div>
                  <div>
                    <span className="fs-5 fw-bold text-danger">
                      {formatPrice(order.totalAmount)}
                    </span>
                  </div>
                </div>

                {/* Nút hành động */}
                <div className="text-end mt-3">
                  {statusForCancelButton.includes(
                    normalizeStatus(order.status)
                  ) && (
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleCancel(order)}
                      className="me-2"
                    >
                      Hủy đơn hàng
                    </Button>
                  )}

                  {statusForReturnButton.includes(
                    normalizeStatus(order.status)
                  ) && (
                    <Button
                      variant="outline-warning"
                      size="sm"
                      onClick={() => handleReturn(order)}
                      className="me-2"
                    >
                      Trả hàng
                    </Button>
                  )}

                  {statusForRefundButton.includes(
                    normalizeStatus(order.status)
                  ) &&
                    order.payment.paymentMethod === "MOMO" && (
                      <Button
                        variant="outline-success"
                        size="sm"
                        onClick={() => handleRefund(order)}
                      >
                        Hoàn tiền
                      </Button>
                    )}
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        ))
      )}

      {/* Cancel Modal */}
      <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận hủy đơn</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Bạn có chắc chắn muốn hủy đơn hàng #{selectedOrder?.id}?</p>
          <p className="text-muted small mb-0">
            Lưu ý: Hành động này không thể hoàn tác.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCancelModal(false)}>
            Đóng
          </Button>
          <Button
            variant="danger"
            onClick={() => cancelMutation.mutate(selectedOrder?.id)}
            disabled={cancelMutation.isLoading}
          >
            {cancelMutation.isLoading ? (
              <>
                <Spinner animation="border" size="sm" /> Đang hủy...
              </>
            ) : (
              "Xác nhận hủy"
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Refund Modal */}
      <Modal show={showRefundModal} onHide={() => setShowRefundModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận hoàn tiền</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Bạn có chắc chắn muốn hoàn tiền cho đơn hàng #{selectedOrder?.id}?
          </p>
          <p className="text-muted small mb-0">
            Tiền hoàn sẽ được gửi về tài khoản của khách hàng.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRefundModal(false)}>
            Đóng
          </Button>
          <Button
            variant="success"
            onClick={() => refundMutation.mutate(selectedOrder?.id)}
            disabled={refundMutation.isLoading}
          >
            {refundMutation.isLoading ? (
              <>
                <Spinner animation="border" size="sm" /> Đang hoàn tiền...
              </>
            ) : (
              "Xác nhận hoàn tiền"
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Return Modal */}
      <Modal show={showReturnModal} onHide={() => setShowReturnModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận trả hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Bạn có chắc chắn muốn trả lại sản phẩm của đơn hàng #
            {selectedOrder?.id}?
          </p>
          <p className="text-muted small mb-0">
            Lưu ý: Vui lòng đảm bảo sản phẩm còn trong tình trạng tốt.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowReturnModal(false)}>
            Đóng
          </Button>
          <Button
            variant="warning"
            onClick={() => returnMutation.mutate(selectedOrder?.id)}
            disabled={returnMutation.isLoading}
          >
            {returnMutation.isLoading ? (
              <>
                <Spinner animation="border" size="sm" /> Đang xử lý...
              </>
            ) : (
              "Xác nhận trả hàng"
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast */}
      <MyToast
        show={toast.show}
        message={toast.message}
        bg={toast.type}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </Container>
  );
};

export default Purchase;

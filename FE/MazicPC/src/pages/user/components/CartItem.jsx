import { Row, Col, Button, InputGroup, FormControl } from "react-bootstrap";
import { useEffect, useState } from "react";
import { CiCircleRemove } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import ROUTERS from "../../../utils/router";
import ConfirmModal from "../../../components/ConfirmModal";

const CartItem = ({
  item,
  onIncrease,
  onDecrease,
  onRemove,
  onTotalChange,
  onSelectChange,
  selected,
}) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      onDecrease?.(item.productId);
    }
  };

  const handleIncrease = () => {
    if (quantity < item.stockQty) {
      setQuantity(quantity + 1);
      onIncrease?.(item.productId);
    }
  };

  const handleDelete = () => {
    setShowConfirm(true);
  };

  const handleConfirmRemove = () => {
    onRemove?.(item.productId);
    setShowConfirm(false);
  };

  const totalPrice = item.price * quantity;

  useEffect(() => {
    onTotalChange?.(item.productId, totalPrice);
  }, [quantity, item.price]);

  const handleNavigateToDetail = (productId) => {
    const path = ROUTERS.USER.PRODUCT_DETAIL.replace(":id", productId);
    navigate(path);
  };

  return (
    <div className="p-3 mb-3 shadow-sm rounded bg-white">
      <Row className="align-items-center gy-4 gy-md-0">
        {/* Checkbox chọn sản phẩm */}
        <Col xs={1} className="text-center">
          <input
            type="checkbox"
            checked={selected}
            onChange={(e) => onSelectChange?.(item.productId, e.target.checked)}
            style={{
              width: "18px",
              height: "18px",
              cursor: "pointer",
            }}
          />
        </Col>

        {/* Ảnh + tên sản phẩm */}
        <Col
          xs={11}
          md={4}
          className="d-flex align-items-center text-center text-md-start"
          onClick={() => handleNavigateToDetail(item.productId)}
          style={{ cursor: "pointer" }}
        >
          <img
            src={item.imageUrl}
            alt={item.name}
            className="img-thumbnail me-md-3 mx-auto mx-md-0"
            style={{
              width: "100px",
              height: "100px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
          <div className="mt-2 mt-md-0">
            <div
              className="fw-bold text-dark text-truncate"
              style={{
                fontSize: "1rem",
                lineHeight: "1.3",
                maxWidth: "220px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
                whiteSpace: "normal",
              }}
            >
              {item.name}
            </div>
            <div className="text-secondary small">
              Còn lại: {item.stockQty} sản phẩm
            </div>
          </div>
        </Col>

        {/* Ô số lượng */}
        <Col xs={6} md={2} className="text-center">
          <InputGroup
            className="justify-content-center mx-auto"
            style={{ width: "120px" }}
          >
            <Button
              variant="outline-secondary"
              onClick={handleDecrease}
              size="sm"
            >
              −
            </Button>
            <FormControl
              value={quantity}
              readOnly
              className="text-center fw-semibold text-dark"
              style={{ width: "40px" }}
            />
            <Button
              variant="outline-secondary"
              onClick={handleIncrease}
              size="sm"
            >
              +
            </Button>
          </InputGroup>
        </Col>

        {/* Giá */}
        <Col xs={6} md={2} className="text-center text-md-end">
          <div
            className="fw-semibold text-dark"
            style={{ fontSize: "0.95rem" }}
          >
            {item.price.toLocaleString()} ₫
          </div>
        </Col>

        {/* Tổng tiền */}
        <Col xs={6} md={2} className="text-center text-md-end">
          <div className="fw-bold text-success" style={{ fontSize: "1rem" }}>
            {totalPrice.toLocaleString()} ₫
          </div>
        </Col>

        {/* Nút xóa */}
        <Col xs={6} md={1} className="text-center text-md-end">
          <Button
            variant="link"
            className="text-danger p-0 small"
            onClick={handleDelete}
          >
            <CiCircleRemove size={30} />
          </Button>
        </Col>
      </Row>

      {/* Modal xác nhận xóa */}
      <ConfirmModal
        show={showConfirm}
        message={`Bạn có chắc muốn xóa "${item.name}" khỏi giỏ hàng không?`}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirmRemove}
      />
    </div>
  );
};

export default CartItem;

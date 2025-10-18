import { Row, Col, Button, InputGroup, FormControl, Badge } from "react-bootstrap";
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

  const handleDelete = () => setShowConfirm(true);

  const handleConfirmRemove = () => {
    onRemove?.(item.productId);
    setShowConfirm(false);
  };

  const totalPrice = (item.finalPrice ?? item.price) * quantity;

  useEffect(() => {
    onTotalChange?.(item.productId, totalPrice);
  }, [quantity, item.finalPrice, item.price]);

  const handleNavigateToDetail = () => {
    const path = ROUTERS.USER.PRODUCT_DETAIL.replace(":id", item.productId);
    navigate(path);
  };

  // Tính % giảm nếu có
  const discountPercent =
    item.discountValue && item.price
      ? Math.round((item.discountValue / item.price) * 100)
      : 0;

  return (
    <div className="p-3 mb-3 shadow-sm rounded bg-white">
      <Row className="align-items-center gy-4 gy-md-0">
        {/* Checkbox chọn sản phẩm */}
        <Col xs={1} className="text-center">
          <input
            type="checkbox"
            checked={selected}
            onChange={(e) =>
              onSelectChange?.(item.productId, e.target.checked)
            }
            style={{ width: "18px", height: "18px", cursor: "pointer" }}
          />
        </Col>

        {/* Ảnh + tên + badge promotion */}
        <Col
          xs={11}
          md={4}
          className="d-flex align-items-center text-center text-md-start position-relative"
          onClick={handleNavigateToDetail}
          style={{ cursor: "pointer" }}
        >
          <div style={{ position: "relative" }}>
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
            {discountPercent > 0 && (
              <Badge
                bg="danger"
                pill
                className="position-absolute top-0 end-0 p-1 fw-bold m-0"
              >
                -{discountPercent}%
              </Badge>
            )}
          </div>
          <div className="mt-2 mt-md-0 ms-md-3">
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
            <Button variant="outline-secondary" onClick={handleDecrease} size="sm">
              −
            </Button>
            <FormControl
              value={quantity}
              readOnly
              className="text-center fw-semibold text-dark"
              style={{ width: "40px" }}
            />
            <Button variant="outline-secondary" onClick={handleIncrease} size="sm">
              +
            </Button>
          </InputGroup>
        </Col>

        {/* Giá gốc + giá giảm + badge % */}
        <Col xs={6} md={2} className="text-center text-md-end">
          <div className="d-flex flex-column align-items-center align-items-md-end">
            <span className="fw-bold text-danger">
              {(item.finalPrice ?? item.price).toLocaleString()} ₫
            </span>
            {discountPercent > 0 && (
              <>
                <span className="text-muted text-decoration-line-through fs-6">
                  {item.price.toLocaleString()} ₫
                </span>
              </>
            )}
          </div>
        </Col>

        {/* Tổng tiền */}
        <Col xs={6} md={2} className="text-center text-md-end">
          <div className="fw-bold text-success fs-5">
            {totalPrice.toLocaleString()} ₫
          </div>
        </Col>

        {/* Nút xóa */}
        <Col xs={6} md={1} className="text-center text-md-end">
          <Button variant="link" className="text-danger p-0 small" onClick={handleDelete}>
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

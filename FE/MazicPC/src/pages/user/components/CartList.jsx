import { useDispatch } from "react-redux";
import CartItem from "./CartItem";
import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import {
  deleteCartItem,
  updateCartItem,
} from "../../../redux/slices/cartSlice";

const CartList = ({ items, onCartTotalChange, onSelectedItemsChange }) => {
  const dispatch = useDispatch();
  const [totals, setTotals] = useState({});
  const [selectedItems, setSelectedItems] = useState({});

  // ✅ Khi tổng từng item thay đổi
  const handleItemTotalChange = (productId, total) => {
    setTotals((prev) => ({ ...prev, [productId]: total }));
  };

  useEffect(() => {
    const selectedList = items
      .filter((item) => selectedItems[item.productId])
      .map((item) => ({
        productId: item.productId,
        name: item.name || "",
        price: item.price || 0,
        finalPrice: item.finalPrice || 0,
        imageUrl: item.imageUrl || "",
        quantity: item.quantity,
      }));
    onSelectedItemsChange?.(selectedList);
    console.log("Item từ con: ", selectedList);
  }, [selectedItems, items]);

  // ✅ Tính tổng tiền của các sản phẩm được chọn
  const cartTotal = Object.entries(totals)
    .filter(([productId]) => selectedItems[productId]) // chỉ tính sản phẩm được chọn
    .reduce((sum, [, val]) => sum + val, 0);

  // ✅ Gửi tổng tiền lên cha
  useEffect(() => {
    onCartTotalChange?.(cartTotal);
  }, [cartTotal]);

  // ✅ Cập nhật khi chọn / bỏ chọn sản phẩm
  const handleSelectChange = (productId, checked) => {
    setSelectedItems((prev) => ({
      ...prev,
      [productId]: checked,
    }));
  };

  // ✅ Chọn hoặc bỏ chọn tất cả
  const handleSelectAll = (checked) => {
    const newSelection = {};
    items.forEach((item) => {
      newSelection[item.productId] = checked;
    });
    setSelectedItems(newSelection);
  };

  // ✅ Thay đổi số lượng
  const handleChangeQty = (productId, newQty) => {
    dispatch(updateCartItem({ productId, quantity: newQty }));
  };

  const handleIncrease = (productId) => {
    const item = items.find((x) => x.productId === productId);
    if (item) {
      const newQuantity = item.quantity + 1;
      handleChangeQty(productId, newQuantity);
    }
  };

  const handleDecrease = (productId) => {
    const item = items.find((x) => x.productId === productId);
    if (item && item.quantity > 1) {
      const newQuantity = item.quantity - 1;
      handleChangeQty(productId, newQuantity);
    }
  };

  const handleRemove = (productId) => {
    dispatch(deleteCartItem(productId));

    setTotals((prev) => {
      const newTotals = { ...prev };
      delete newTotals[productId];
      return newTotals;
    });

    setSelectedItems((prev) => {
      const newSelected = { ...prev };
      delete newSelected[productId];
      return newSelected;
    });
  };

  // ✅ Kiểm tra xem có chọn hết chưa
  const isAllSelected =
    items.length > 0 && items.every((item) => selectedItems[item.productId]);

  return (
    <div className="bg-white p-3 rounded shadow-lg">
      {/* Thanh tiêu đề */}
      <Row className="fw-bold text-dark border-bottom pb-2 mb-3 align-items-center p-3">
        <Col xs={1} className="text-center">
          <input
            type="checkbox"
            checked={isAllSelected}
            onChange={(e) => handleSelectAll(e.target.checked)}
            style={{ width: "18px", height: "18px", cursor: "pointer" }}
          />
        </Col>
        <Col xs={12} md={4}>
          Sản phẩm
        </Col>
        <Col xs={6} md={2} className="text-center">
          Số lượng
        </Col>
        <Col xs={6} md={2} className="text-center text-md-end">
          Đơn giá
        </Col>
        <Col xs={6} md={2} className="text-center text-md-end">
          Thành tiền
        </Col>
        <Col xs={6} md={1} className="text-center text-md-end">
          Xóa
        </Col>
      </Row>

      {/* Danh sách sản phẩm */}
      {items.map((item) => (
        <CartItem
          key={item.productId}
          item={item}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
          onRemove={handleRemove}
          onTotalChange={handleItemTotalChange}
          onSelectChange={handleSelectChange}
          selected={selectedItems[item.productId] || false}
        />
      ))}

      {/* Tổng tiền */}
      <div className="text-end mt-3 pt-3 border-top">
        <span className="fw-bold fs-5 text-dark me-2">Tổng cộng:</span>
        <span className="fw-bold fs-5 text-primary">
          {cartTotal.toLocaleString()} ₫
        </span>
      </div>
    </div>
  );
};

export default CartList;

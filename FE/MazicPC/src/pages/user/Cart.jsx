import { Button, Col, Row } from "react-bootstrap";
import MyBreadcrumb from "../../components/MyBreadcrumb";
import CartList from "./components/CartList";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchCart } from "../../redux/slices/cartSlice";
import MyFullSpinner from "../../components/MyFullSpinner";
import { useNavigate } from "react-router-dom";
import ROUTERS from "../../utils/router";
import MyToast from "../../components/MyToast";

const Cart = () => {
  const dispatch = useDispatch();
  const { items, isLoading, error } = useSelector((state) => state.cart);
  const [cartTotal, setCartTotal] = useState(0);

  const navigate = useNavigate();
  const [emptyError, setEmptyError] = useState(false);

  useEffect(() => {
    dispatch(fetchCart());
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [dispatch]);

  if (!items || items.length === 0) {
    return (
      <div className="text-center py-5 fs-4 text-secondary">
        🛒 Giỏ hàng trống
      </div>
    );
  }

  const checkOut = () => {
    if (cartTotal > 0) {
      navigate(ROUTERS.USER.CHECKOUT);
    }
    else {
      setEmptyError(true);
    }
  };

  return (
    <main className="container bg-light p-4">
      <h2 className="text-center text-gradient fw-bold">Giỏ hàng</h2>
      <MyBreadcrumb />
      <Row className="p-3 fs-5">
        <Col lg={9}>
          <section className="my-2 text-center">
            <CartList items={items} onCartTotalChange={setCartTotal} />
          </section>
        </Col>
        <Col lg={3}>
          <section className="border border-2 border-secondary rounded-2 shadow-lg p-3">
            <h3 className="fw-bold">Tổng tiền</h3>
            <hr />
            <div className="d-flex justify-content-between">
              <div className="fw-bold ">Tạm tính: </div>
              <div className="text-secondary">
                {cartTotal.toLocaleString()} ₫
              </div>
            </div>
            {/* <div className="d-flex justify-content-between">
              <div className="fw-bold ">Phí vận chuyển: </div>
              <div className="text-secondary">0 đ</div>
            </div> */}
            <Button variant="danger" className="w-100 mt-2" onClick={checkOut}>
              Thanh toán
            </Button>
          </section>
        </Col>
      </Row>

      <MyToast
        title="Lỗi"
        bg="danger"
        show={!!error}
        message={error}
        onClose={() => {}}
      />

      <MyToast
        title="Lỗi"
        bg="danger"
        show={emptyError}
        message={"Giỏ hàng của bạn đang trống!"}
        onClose={() => setEmptyError(false)}
      />

      <MyFullSpinner show={isLoading} />
    </main>
  );
};

export default Cart;

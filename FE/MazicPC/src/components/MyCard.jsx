import { Badge, Card, Button } from "react-bootstrap";
import { IoCartOutline } from "react-icons/io5";
import styles from "@styles/MyCard.module.css";
import { useNavigate } from "react-router-dom";
import ROUTERS from "../utils/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCart } from "../redux/slices/cartSlice";
import { motion } from "framer-motion";

const MyCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClick = () => {
    const path = ROUTERS.USER.PRODUCT_DETAIL.replace(":id", product.id);
    navigate(path);
  };

  const hasDiscount =
    product.discountValue > 0 && product.finalPrice < product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.finalPrice) / product.price) * 100)
    : 0;

  const handleAddToCart = async () => {
    if (!user || user.role.toLowerCase() !== "user") {
      console.log("user: ", user);
      setShowConfirm(true);
      return;
    }

    try {
      setLoading(true);
      await dispatch(
        addToCart({
          productId: Number(product.id),
          quantity: 1,
        })
      ).unwrap();

      await dispatch(fetchCart());
      navigate(ROUTERS.USER.CART);
    } catch (err) {
      setError(err.message || "Thêm vào giỏ hàng thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      whileHover={{
        y: -20,
        scale: 1.05,
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
      }}
      transition={{type: "spring", stiffness: 100, damping: 10}}
    >
      <Card
        className={`h-100 p-4 d-flex flex-column justify-content-between shadow-lg ${styles.cardCard}`}
        style={{
          cursor: "pointer",
          minHeight: "300px",
          maxHeight: "400px",
        }}
      >
        <div className="position-relative" onClick={handleClick}>
          <Card.Img
            className={styles.cardImage}
            variant="top"
            src={product.imageUrl}
            alt={product.name}
            style={{
              height: "200px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
          {hasDiscount && (
            <Badge
              bg="danger"
              className="position-absolute top-0 end-0 m-0 p-2 rounded-pill fs-6 fw-bold"
            >
              Giảm {discountPercent}%
            </Badge>
          )}
        </div>

        <Card.Body className="d-flex flex-column justify-content-between">
          <Card.Title
            className={`text-truncate text-center fs-4 fw-semibold ${styles.cardTitle}`}
            style={{
              WebkitLineClamp: 2,
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {product.name}
          </Card.Title>

          {/* Giá và giỏ hàng */}
          <div className="d-flex justify-content-between align-items-center mt-3">
            <div>
              {hasDiscount ? (
                <>
                  <Card.Text className="text-muted text-decoration-line-through mb-0">
                    {product.price.toLocaleString()} đ
                  </Card.Text>
                  <Card.Text className="text-danger fw-bold fs-5 mb-0">
                    {product.finalPrice.toLocaleString()} đ
                  </Card.Text>
                </>
              ) : (
                <Card.Text className="text-danger fw-bold fs-5 mb-0">
                  {product.price.toLocaleString()} đ
                </Card.Text>
              )}
            </div>
            <Button
              variant="outline-primary"
              onClick={handleAddToCart}
              disabled={loading}
            >
              <IoCartOutline size={20} />
            </Button>
          </div>
        </Card.Body>
      </Card>
    </motion.div>
  );
};

export default MyCard;

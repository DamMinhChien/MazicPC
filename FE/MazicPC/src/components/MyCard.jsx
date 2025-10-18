import { Badge, Card } from "react-bootstrap";
import styles from "@styles/MyCard.module.css";
import { useNavigate } from "react-router-dom";
import ROUTERS from "../utils/router";
import { gradients } from "@utils/gradientColors";
import { useEffect } from "react";

const MyCard = ({ product }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    const path = ROUTERS.USER.PRODUCT_DETAIL.replace(":id", product.id);
    navigate(path);
  };

  const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];

  useEffect(() => {
    console.log("Từ Card: ", product);
  }, [product]);

  // Tính phần trăm giảm nếu có
  const hasDiscount =
    product.discountValue > 0 && product.finalPrice < product.price;

  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.finalPrice) / product.price) * 100)
    : 0;

  return (
    <Card
      onClick={handleClick}
      className={`h-100 p-4 d-flex flex-column justify-content-between shadow-sm ${styles.cardCard}`}
      style={{
        cursor: "pointer",
        minHeight: "300px",
        maxHeight: "400px",
        background: randomGradient,
      }}
    >
      <div className="position-relative">
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
          <Badge bg="danger" className="position-absolute top-0 end-0 m-0 p-2 rounded-pill fs-6 fw-bold">
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

        <div className="text-center">
          {hasDiscount ? (
            <>
              <Card.Text
                className={`text-muted text-decoration-line-through mb-1`}
              >
                {product.price.toLocaleString()} đ
              </Card.Text>
              <Card.Text
                className={`text-danger fw-bold fs-4 ${styles.cardText}`}
              >
                {product.finalPrice.toLocaleString()} đ
              </Card.Text>
            </>
          ) : (
            <Card.Text
              className={`text-danger fw-bold fs-4 ${styles.cardText}`}
            >
              {product.price.toLocaleString()} đ
            </Card.Text>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default MyCard;

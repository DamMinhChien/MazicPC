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

  useEffect(()=>{
console.log("Từ Card: ", product,)
  },[])

  return (
    <Card onClick={handleClick} className={`h-100 p-4 d-flex flex-column justify-content-between shadow-sm ${styles.cardCard}`} style={{ cursor: "pointer", minHeight: "300px", maxHeight: "400px", background: randomGradient }}>
  <div>
    <Card.Img 
    className={styles.cardImage}
      variant="top" 
      src={product.imageUrl} 
      alt={product.name} 
      style={{ height: "200px", objectFit: "cover", borderRadius: "8px" }} 
    />
    {product.discount && (
      <Badge bg="danger" className="position-absolute top-0 start-0 m-2">
        -{product.discount}%
      </Badge>
    )}
  </div>

  <Card.Body className="d-flex flex-column justify-content-between">
    <Card.Title className={`text-truncate text-center fs-4 fw-semibold ${styles.cardTitle}`} style={{ WebkitLineClamp: 2, display: "-webkit-box", WebkitBoxOrient: "vertical", overflow: "hidden" }}>
      {product.name}
    </Card.Title>
    <Card.Text className={`text-danger fw-bold text-center fs-4 ${styles.cardText}`}>{product.price.toLocaleString()} đ</Card.Text>
  </Card.Body>
</Card>

  );
};

export default MyCard;

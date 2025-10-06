import { Badge, Card } from "react-bootstrap";
import styles from "../styles/ProductCard.module.css";
import { useNavigate } from "react-router-dom";
import ROUTERS from "../utils/router";

const ProductCard = ({ product }) => {
  const navigate = useNavigate()
  const handleClick = () => {
    const path = ROUTERS.USER.PRODUCT_DETAIL.replace(":id", product.id);
    navigate(path)
  } 

  return (
    <Card className="h-100 shadow-sm" onClick={handleClick} style={{cursor: "pointer"}}>
      <div className="position-relative">
        {product.discount && (
          <Badge bg="danger" className="position-absolute top-0 start-0 m-2">
            -{product.discount}%
          </Badge>
        )}

        <Card.Img
          variant="top"
          src={product.imageUrl}
          alt={product.name}
          style={{ cursor: "pointer" }}
          className={styles.cardImage}
        />
      </div>

      <Card.Body className="text-center">
        <Card.Title className="cardTitle">{product.name}</Card.Title>
        <Card.Text className="text-danger fw-bold">
          {product.price.toLocaleString()} đ
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;

import { Badge, Card } from "react-bootstrap";
import styles from "../styles/ProductCard.module.css";

const ProductCard = ({ product }) => {
  return (
    <Card className="h-100 shadow-sm">
      <div className="position-relative">
        {product.discount && (
          <Badge bg="danger" className="position-absolute top-0 start-0 m-2">
            -{product.discount}%
          </Badge>
        )}

        <Card.Img
          variant="top"
          src={product.image}
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

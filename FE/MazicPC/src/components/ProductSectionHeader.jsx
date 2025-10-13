import { Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../styles/CategoryLabel.module.css";
import ROUTERS from "../utils/router";

const ProductSectionHeader = ({ title }) => {
  const category = title; // hoặc bạn có thể đổi tên prop cho rõ nghĩa hơn

  // Hàm build URL query
  const buildFilterUrl = (min, max) => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (min) params.set("priceMin", min);
    if (max) params.set("priceMax", max);
    return `${ROUTERS.USER.PRODUCTS}?${params.toString()}`;
  };

  return (
    <Stack
      direction="horizontal"
      className="justify-content-between align-items-center mb-3 bg-warning-subtle"
    >
      <div className={styles.categoryLabel}>
        <h4 className="fw-bold">{title}</h4>
      </div>
      <div className="text-muted small">
        <Link
          to={buildFilterUrl(5000000, 10000000)}
          className="mx-2 fw-bold fs-5 text-primary text-decoration-none"
        >
          5 - 10 triệu
        </Link>
        <Link
          to={buildFilterUrl(10000000, 20000000)}
          className="mx-2 fw-bold fs-5 text-primary text-decoration-none"
        >
          10 - 20 triệu
        </Link>
        <Link
          to={buildFilterUrl(20000000, 30000000)}
          className="mx-2 fw-bold fs-5 text-primary text-decoration-none"
        >
          20 - 30 triệu
        </Link>
        <Link
          to={buildFilterUrl(40000000, null)}
          className="mx-2 fw-bold fs-5 text-primary text-decoration-none"
        >
          Trên 40 triệu
        </Link>
      </div>
    </Stack>
  );
};

export default ProductSectionHeader;

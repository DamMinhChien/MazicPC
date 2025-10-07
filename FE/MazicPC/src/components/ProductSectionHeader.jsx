import { Stack } from "react-bootstrap";
import styles from "../styles/CategoryLabel.module.css";
const ProductSectionHeader = ({ title }) => {
  return (
    <>
      <Stack
        direction="horizontal"
        className="justify-content-between align-items-center mb-3 bg-warning-subtle"
      >
        <div className={styles.categoryLabel}>
          <h4 className="fw-bold">{title}</h4>
        </div>
        <div className="text-muted small">
          <a href="#" className="mx-2 fw-bold fs-5 text-primary">
            5 - 10 triệu
          </a>
          <a href="#" className="mx-2 fw-bold fs-5 text-primary">
            10 - 20 triệu
          </a>
          <a href="#" className="mx-2 fw-bold fs-5 text-primary">
            20 - 30 triệu
          </a>
          <a href="#" className="mx-2 fw-bold fs-5 text-primary">
            Trên 40 triệu
          </a>
        </div>
      </Stack>
    </>
  );
};

export default ProductSectionHeader;

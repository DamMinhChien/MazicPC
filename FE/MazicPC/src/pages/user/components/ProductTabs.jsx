import { Tabs, Tab } from "react-bootstrap";
import { FaInfoCircle, FaCogs, FaStar } from "react-icons/fa";
import ProductSpecsTable from "./ProductSpecsTable";

const ProductTabs = ({ product }) => {
  return (
    <div className="p-4 shadow-lg bg-light text-dark rounded-2">
      <Tabs
        defaultActiveKey="info"
        id="product-tabs"
        className="mb-4 border-0 justify-content-center"
        fill
      >
        <Tab
          eventKey="info"
          title={
            <span className="d-flex align-items-center justify-content-center gap-2 fw-semibold text-primary fs-5">
              <FaInfoCircle />
              Thông tin
            </span>
          }
        >
          <div className="p-4 text-dark">
            <h4 className="text-center fw-bold text-danger">{product.name}</h4>
            <h5
              className="mt-4 text-center"
              style={{ textIndent: "2em" }}
            >{`Thông số nổi bât: ${product.shortDescription}`}</h5>
            <div className="text-center my-3">
              <img
                src={product.images?.[0]?.imageUrl}
                alt={product.name}
                className="w-75 rounded-3"
              />
            </div>
            <p>{product.description}</p>
            {product.images
              ?.filter((img) => !img.isPrimary)
              .map((image, index) => (
                <img
                  key={index}
                  src={image.imageUrl}
                  alt={`image-${index}`}
                  className="w-100 mb-2"
                />
              ))}
          </div>
        </Tab>

        <Tab
          eventKey="specs"
          title={
            <span className="d-flex align-items-center justify-content-center gap-2 fw-semibold text-primary fs-5">
              <FaCogs />
              Cấu hình
            </span>
          }
        >
          <div className="p-4 text-dark">
            <h4 className="text-center fw-bold text-danger">{`Cấu hình chi tiết ${product.name}`}</h4>
            <ProductSpecsTable product={product} />
          </div>
        </Tab>

        <Tab
          eventKey="reviews"
          title={
            <span
              className="d-flex align-items-center justify-content-center gap-2 fw-semibold"
              style={{
                fontSize: "1.1rem",
                color: "#0d6efd",
              }}
            >
              <FaStar />
              Đánh giá
            </span>
          }
        >
          <div className="p-4 text-secondary">
            <h5>Đánh giá từ khách hàng</h5>
            <p>⭐⭐⭐⭐⭐ - “Hiệu năng cực mạnh, chơi game siêu mượt!”</p>
            <p>⭐⭐⭐⭐ - “Thiết kế đẹp, pin ổn, quạt êm.”</p>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default ProductTabs;

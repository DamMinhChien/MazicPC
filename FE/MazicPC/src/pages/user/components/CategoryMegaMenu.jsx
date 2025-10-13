import { Link } from "react-router-dom";
import { Row, Col, Image } from "react-bootstrap";
import ROUTERS from "../../../utils/router";
import { FaChevronRight } from "react-icons/fa";

const CategoryMegaMenu = ({ categories }) => {
  return (
    <div
      className="p-4 bg-white shadow-lg border rounded-3 mx-auto"
      style={{ maxWidth: "80%" }}
    >
      <Row>
        {categories.map((parent, index) => (
          <Col
            key={parent.id}
            xs={12}
            md={4}
            className={`mb-3 ${
              index !== categories.length - 1 ? "border-end" : ""
            }`}
            style={{
              borderColor: "#ddd",
            }}
          >
            <h6 className="fw-bold text-uppercase mb-3 fs-5 text-center">
              {parent.name} ↗
            </h6>
            <ul className="list-unstyled">
              {parent.children.map((child) => (
                <li
                  key={child.id}
                  className="category-item d-flex align-items-center justify-content-between mb-3 p-2 rounded hover-bg-light fs-5"
                >
                  <Link
                    to={`${ROUTERS.USER.PRODUCTS}?category=${child.slug}`}
                    className="d-flex align-items-center flex-grow-1 text-decoration-none text-dark"
                    style={{ gap: "10px" }}
                  >
                    <Image
                      src={child.imageUrl}
                      roundedCircle
                      width={44}
                      height={44}
                      className="object-fit-cover"
                    />
                    <span className="fw-medium arrow">{child.name}</span>
                  </Link>
                  <FaChevronRight size={20} className="text-secondary arrow" />
                </li>
              ))}
            </ul>
          </Col>
        ))}
      </Row>
      <style jsx>{`
        .category-item {
          transition: all 0.25s ease;
          cursor: pointer;
        }

        .category-item:hover {
          background-color: #f8f9fa; /* nền sáng nhẹ */
          transform: translateY(-2px); /* hơi nhấc lên */
        }

        .category-item:hover .arrow {
          color: #0d6efd !important; /* icon xanh dương */
          transform: translateX(4px); /* icon di chuyển nhẹ sang phải */
          transition: transform 0.25s ease, color 0.25s ease;
        }
      `}</style>
    </div>
  );
};

export default CategoryMegaMenu;

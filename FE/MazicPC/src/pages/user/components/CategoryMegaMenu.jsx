import { Link } from "react-router-dom";
import { Row, Col, Image } from "react-bootstrap";
import ROUTERS from "../../../utils/router";

const CategoryMegaMenu = ({ categories }) => {
  return (
    <div className="p-4 bg-white shadow-lg border rounded-3 mx-auto" style={{ maxWidth: "80%" }}>
      <Row>
        {categories.map((parent) => (
          <Col key={parent.id} xs={12} md={4} className="mb-3">
            <h6 className="fw-bold text-uppercase mb-3">{parent.name} ↗</h6>
            <ul className="list-unstyled">
              {parent.children.map((child) => (
                <li key={child.id} className="d-flex align-items-center mb-3">
                  <Image
                    src={child.imageUrl}
                    roundedCircle
                    width={40}
                    height={40}
                    className="me-3 object-fit-cover"
                  />
                  <Link
                    to={`${ROUTERS.USER.PRODUCTS}?category=${child.slug}`}
                    className="text-decoration-none text-dark"
                  >
                    {child.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CategoryMegaMenu;

import { useQuery } from "@tanstack/react-query";
import { Form, Row, Col } from "react-bootstrap";
import categoryServices from "../../../apis/categoryService";
import { toPascalCase } from "../../../utils/helper";
import manufacturerServices from "../../../apis/manufacturerService";

const ProductFilter = ({ filters, onFilterChange }) => {
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => categoryServices.getCategoriesNotRoot(),
  });

  const { data: manufacturers } = useQuery({
    queryKey: ["manufacturers"],
    queryFn: () => manufacturerServices.getManufacturers(),
  });

  return (
    <Form className="mb-4 p-3 bg-white rounded shadow-sm">
      <Row className="g-3 align-items-end">
        <Col md={3}>
          <Form.Label>Category</Form.Label>
          <Form.Select
            value={filters.category || ""}
            onChange={(e) => onFilterChange("category", e.target.value)}
          >
            <option value="">Tất cả</option>
            {categories?.map((cat) => (
              <option value={cat.name}>{toPascalCase(cat.name)}</option>
            ))}
          </Form.Select>
        </Col>

        <Col md={3}>
          <Form.Label>Manufacturer</Form.Label>
          <Form.Select
            value={filters.manufacturer || ""}
            onChange={(e) => onFilterChange("manufacturer", e.target.value)}
          >
            <option value="">Tất cả</option>
            {manufacturers?.map((manufacturer) => (
              <option value={manufacturer.name}>
                {toPascalCase(manufacturer.name)}
              </option>
            ))}
          </Form.Select>
        </Col>

        <Col md={2}>
          <Form.Label>Sort</Form.Label>
          <Form.Select
            value={filters.sort || "name"}
            onChange={(e) => onFilterChange("sort", e.target.value)}
          >
            <option value="name">Tên A-Z</option>
            <option value="priceAsc">Giá tăng dần</option>
            <option value="priceDesc">Giá giảm dần</option>
            <option value="newest">Mới nhất</option>
            <option value="oldest">Cũ nhất</option>
          </Form.Select>
        </Col>

        <Col md={2}>
          <Form.Label>Price Min</Form.Label>
          <Form.Control
            type="number"
            placeholder="0"
            value={filters.priceMin || ""}
            onChange={(e) => onFilterChange("priceMin", e.target.value)}
          />
        </Col>

        <Col md={2}>
          <Form.Label>Price Max</Form.Label>
          <Form.Control
            type="number"
            placeholder="0"
            value={filters.priceMax || ""}
            onChange={(e) => onFilterChange("priceMax", e.target.value)}
          />
        </Col>
      </Row>
    </Form>
  );
};

export default ProductFilter;

import { useQuery } from "@tanstack/react-query";
import { Form, Row, Col } from "react-bootstrap";
import categoryServices from "../../../apis/categoryService";
import manufacturerServices from "../../../apis/manufacturerService";
import { toPascalCase } from "../../../utils/helper";

// Icons
import {
  MdCategory,
  MdFactory,
  MdSort,
  MdPriceChange,
  MdAttachMoney,
} from "react-icons/md";

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
        {/* Danh mục */}
        <Col md={3}>
          <Form.Label className="fs-5 d-flex align-items-center">
            <MdCategory size={20} className="me-2" />
            Danh mục
          </Form.Label>
          <Form.Select
            value={filters.category || ""}
            onChange={(e) => onFilterChange("category", e.target.value)}
          >
            <option value="">Tất cả</option>
            {categories?.map((cat) => (
              <option key={cat.id} value={cat.slug}>
                {toPascalCase(cat.name)}
              </option>
            ))}
          </Form.Select>
        </Col>

        {/* Hãng sản xuất */}
        <Col md={3}>
          <Form.Label className="fs-5 d-flex align-items-center">
            <MdFactory size={20} className="me-2" />
            Hãng sản xuất
          </Form.Label>
          <Form.Select
            value={filters.manufacturer || ""}
            onChange={(e) => onFilterChange("manufacturer", e.target.value)}
          >
            <option value="">Tất cả</option>
            {manufacturers?.map((manufacturer) => (
              <option key={manufacturer.id} value={manufacturer.name}>
                {toPascalCase(manufacturer.name)}
              </option>
            ))}
          </Form.Select>
        </Col>

        {/* Sắp xếp */}
        <Col md={2}>
          <Form.Label className="fs-5 d-flex align-items-center">
            <MdSort size={20} className="me-2" />
            Sắp xếp
          </Form.Label>
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

        {/* Giá thấp nhất */}
        <Col md={2}>
          <Form.Label className="fs-5 d-flex align-items-center">
            <MdPriceChange size={20} className="me-2" />
            Giá thấp nhất
          </Form.Label>
          <Form.Control
            type="number"
            placeholder="0"
            value={filters.priceMin || ""}
            onChange={(e) => onFilterChange("priceMin", e.target.value)}
          />
        </Col>

        {/* Giá cao nhất */}
        <Col md={2}>
          <Form.Label className="fs-5 d-flex align-items-center">
            <MdAttachMoney size={20} className="me-2" />
            Giá cao nhất
          </Form.Label>
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

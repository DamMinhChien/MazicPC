import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import productServices from "../../apis/productService";
import MyBreadcrumb from "../../components/MyBreadcrumb";
import MyCard from "../../components/MyCard";
import MyToast from "@components/MyToast";
import MyFullSpinner from "@components/MyFullSpinner";
import { Col, Row } from "react-bootstrap";
import MyPagination from "../admin/components/MyPagination";
import ProductFilter from "./components/ProductFilter";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Lấy filter từ URL
  const filters = {
    search: searchParams.get("search") || "",
    category: searchParams.get("category") || "",
    manufacturer: searchParams.get("manufacturer") || "",
    sort: searchParams.get("sort") || "name",
    priceMin: searchParams.get("priceMin") || "",
    priceMax: searchParams.get("priceMax") || "",
    page: parseInt(searchParams.get("page") || "1"),
    limit: parseInt(searchParams.get("limit") || "12"),
  };

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["products", filters],
    queryFn: () => productServices.getProductsFiltered(filters),
    placeholderData: keepPreviousData,
    enabled: true,
  });

  const handleParamChange = (key, value) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      if (value) params.set(key, value);
      else params.delete(key);
      if (key !== "page") params.set("page", "1");
      return params;
    });
  };

  const handlePageChange = (page) => {
    handleParamChange("page", page);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <main className="container bg-light p-4">
        <MyBreadcrumb />
        <h2 className="text-danger text-center my-3">
          {data && data.pagination.totalItems > 0
            ? `Tìm thấy ${data.pagination.totalItems} sản phẩm`
            : "Không tìm thấy sản phẩm nào"}
        </h2>

        <ProductFilter filters={filters} onFilterChange={handleParamChange} />

        <div className="my-4">
          <Row className="g-4">
            {data?.data.map((product) => (
              <Col key={product.id} xs={6} md={4} lg={3}>
                <MyCard product={product} />
              </Col>
            ))}
          </Row>

          {data?.pagination && data.pagination.page > 1 && (
            <MyPagination
              currentPage={data.pagination.page}
              pageCount={data.pagination.totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </main>
      <MyToast
        title="Lỗi"
        bg="danger"
        show={isError}
        message={error?.message}
      />
      <MyFullSpinner show={isLoading} />
    </>
  );
};

export default Products;

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

import productServices from "../../apis/productService";
import MyBreadcrumb from "../../components/MyBreadcrumb";
import MyCard from "../../components/MyCard";
import MyToast from "@components/MyToast";
import MyFullSpinner from "@components/MyFullSpinner";
import MyPagination from "../admin/components/MyPagination";
import ProductFilter from "./components/ProductFilter";

import { Col, Row } from "react-bootstrap";
import { MdFilterAlt, MdFilterAltOff } from "react-icons/md";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFiltered, setIsFiltered] = useState(false);

  // Scroll lên đầu trang khi URL thay đổi
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [searchParams]);

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

  // Xác định có đang lọc hay không
  useEffect(() => {
    const hasFilter =
      filters.search ||
      filters.category ||
      filters.manufacturer ||
      filters.sort !== "name" ||
      filters.priceMin ||
      filters.priceMax;

    setIsFiltered(hasFilter);
  }, [filters]);

  // Gọi API sản phẩm
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["products", filters],
    queryFn: () => productServices.getProductsFiltered(filters),
    placeholderData: keepPreviousData,
    enabled: true,
  });

  // Thay đổi tham số URL
  const handleParamChange = (key, value) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      if (value) params.set(key, value);
      else params.delete(key);
      if (key !== "page") params.set("page", "1");
      return params;
    });
  };

  // Đổi trang
  const handlePageChange = (page) => {
    handleParamChange("page", page);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  // Reset bộ lọc
  const resetFilters = () => {
    setSearchParams({
      sort: "name",
      page: "1",
      limit: filters.limit.toString(),
    });
  };

  return (
    <>
      <main className="container bg-light p-4">
        <MyBreadcrumb />

        {/* Tiêu đề + nút reset lọc */}
        <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
          <h3 className="fw-bold m-0 text-center flex-grow-1 text-md-start text-center">
            {data && data.pagination.totalItems > 0
              ? `Tìm thấy ${data.pagination.totalItems} sản phẩm`
              : "Không tìm thấy sản phẩm nào"}
          </h3>

          <button
            className="btn btn-outline-secondary d-flex align-items-center mt-3 mt-md-0 ms-md-3"
            onClick={resetFilters}
            title="Đặt lại bộ lọc"
          >
            {isFiltered ? (
              <>
                <MdFilterAltOff className="me-1" />
                Xóa lọc
              </>
            ) : (
              <>
                <MdFilterAlt className="me-1" />
                Đang xem tất cả
              </>
            )}
          </button>
        </div>

        {/* Bộ lọc */}
        <ProductFilter filters={filters} onFilterChange={handleParamChange} />

        {/* Danh sách sản phẩm */}
        <div className="my-4">
          <Row className="g-4">
            {data?.data.map((product) => (
              <Col key={product.id} xs={6} md={4} lg={3}>
                <MyCard product={product} />
              </Col>
            ))}
          </Row>

          {/* Phân trang */}
          {data?.pagination && data.pagination.totalPages > 1 && (
            <MyPagination
              currentPage={data.pagination.page}
              pageCount={data.pagination.totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </main>

      {/* Thông báo lỗi + loading spinner */}
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

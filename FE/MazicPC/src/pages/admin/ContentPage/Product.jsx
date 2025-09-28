import React, { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import MyToast from "../../../components/MyToast";
import MyFullSpinner from "@components/MyFullSpinner";
import productServices from "../../../apis/productService";
const Product = () => {
  const [product, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetProducts = async () => {
      try {
        setLoading(true);
        const res = await productServices.getProducts();
        setProducts(res);
        
      } catch (err) {
        setLoading(false);
        setError(err.message || "Có lỗi xảy ra khi tải sản phẩm");
      } finally {
        setLoading(false);
      }
    };
    fetProducts();
  }, []);
  return (
    <>
      <AdminLayout title="Quản lý sản phẩm" data={product} />

      {/* Toast hiển thị lỗi */}
      <MyToast
        show={!!error}
        onClose={() => setError("")}
        message={error}
        title="Lỗi"
        bg="danger"
      />

      <MyFullSpinner show={loading} />
    </>
  );
};

export default Product;

import React, { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import MyToast from "../../../components/MyToast";
import MyFullSpinner from "@components/MyFullSpinner";
import categoryServices from "../../../apis/categoryService";
//categories
const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetCategories = async () => {
      try {
        setLoading(true);
        const res = await categoryServices.getCategories();
        setCategories(res);
      } catch (err) {
        setLoading(false);
        setError(err.message || "Có lỗi xảy ra khi tải tài khoản");
      } finally {
        setLoading(false);
      }
    };
    fetCategories();
  }, []);
  return (
    <>
      <AdminLayout title="Quản lý danh mục" data={categories} />

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

export default Category;

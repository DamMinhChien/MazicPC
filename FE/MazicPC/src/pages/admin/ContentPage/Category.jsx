import { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import categoryServices from "../../../apis/categoryService";
import MyToast from "../../../components/MyToast";
import MyFullSpinner from "@components/MyFullSpinner";
import SubmitContext from "@utils/SubmitContext";
import categorySchema from "../../../schemas/admin/categorySchema";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [categoryRoots, setCategoryRoot] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ------------------- Fetch API -------------------
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await categoryServices.getCategories();
      console.log("data fetchCategories:", res);
      setCategories(res);
    } catch (err) {
      setError(err.message || "Có lỗi xảy ra khi tải danh mục");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategoriesRoot = async () => {
    try {
      setLoading(true);
      const res = await categoryServices.getCategoriesRoot();
      setCategoryRoot(res);
    } catch (err) {
      setError(err.message || "Có lỗi xảy ra khi tải danh mục gốc");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchCategoriesRoot();
  }, []);

  const title = "danh mục";

  // ------------------- Các trường input -------------------
  const fields = [
    { name: "id", label: "ID", type: "hidden" },
    { name: "name", label: "Tên danh mục" },
    { name: "slug", label: "Slug" },
    { name: "file", label: "Ảnh", type: "file" },
    {
      name: "parentId",
      label: "Danh mục cha",
      type: "select",
      // load options từ chính categories
      loadOptions: async () =>
        categoryRoots.map((c) => ({ value: c.id, label: c.name })),
    },
  ];

  // --------------------- Logic Form ---------------------
  const handleAdd = async (category) => {
    try {
      setLoading(true);
      const res = await categoryServices.createCategory(category);
      setSuccess("Thêm danh mục thành công");
      setCategories((prev) => [...prev, res]);
      fetchCategories();
      fetchCategoriesRoot();
    } catch (error) {
      setLoading(false);
      const errors = error.response?.data || error.message;
      if (Array.isArray(errors)) {
        setError(errors.map((e) => e.message).join(", "));
      } else {
        setError(errors.message || error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (category) => {
    try {
      setLoading(true);
      await categoryServices.updateCategory(category);
      setSuccess("Cập nhật danh mục thành công");
      fetchCategories();
      fetchCategoriesRoot();
    } catch (error) {
      setLoading(false);
      const errors = error.response?.data || error.message;
      if (Array.isArray(errors)) {
        setError(errors.map((e) => e.message).join(", "));
      } else {
        setError(errors.message || error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDel = async (id) => {
    try {
      setLoading(true);
      await categoryServices.deleteCategory(id);
      setSuccess("Xóa danh mục thành công");
      fetchCategories();
    } catch (error) {
      setLoading(false);
      const errors = error.response?.data || error.message;
      if (Array.isArray(errors)) {
        setError(errors.map((e) => e.message).join(", "));
      } else {
        setError(errors.message || error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelMany = async (ids) => {
    try {
      setLoading(true);
      await categoryServices.deleteCategories(ids);
      setSuccess(`Xóa thành công ${ids.length} danh mục`);
      fetchCategories();
    } catch (error) {
      setLoading(false);
      const errors = error.response?.data || error.message;
      if (Array.isArray(errors)) {
        setError(errors.map((e) => e.message).join(", "));
      } else {
        setError(errors.message || error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SubmitContext.Provider
        value={{ title, handleAdd, handleEdit, handleDel, handleDelMany }}
      >
        <AdminLayout
          data={categories}
          fields={fields}
          postSchema={categorySchema.post}
          putSchema={categorySchema.put}
        />
      </SubmitContext.Provider>

      <MyToast
        title="Lỗi"
        bg="danger"
        show={!!error}
        message={error}
        onClose={() => setError("")}
      />
      <MyToast
        title="Thành công"
        bg="success"
        show={!!success}
        message={success}
        onClose={() => setSuccess("")}
      />

      <MyFullSpinner show={loading} />
    </>
  );
};

export default Category;

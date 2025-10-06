import { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import MyToast from "../../../components/MyToast";
import MyFullSpinner from "@components/MyFullSpinner";
import SubmitContext from "@utils/SubmitContext";
import productSchema from "../../../schemas/admin/productSchema";
import productService from "../../../apis/productService";
import manufacturerService from "../../../apis/manufacturerService";
import categoryServices from "../../../apis/categoryService";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [categoryNotRoot, setCategoryNotRoot] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ------------------- Fetch API -------------------
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await productService.getProducts();
      setProducts(res);
    } catch (err) {
      setError(err.message || "Có lỗi xảy ra khi tải sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategoriesNotRoot = async () => {
    try {
      setLoading(true);
      const res = await categoryServices.getCategoriesNotRoot();
      setCategoryNotRoot(res);
    } catch (err) {
      setError(err.message || "Có lỗi xảy ra khi tải danh mục gốc");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategoriesNotRoot();
    loadManufacturers();
  }, []);

  const title = "sản phẩm";

  // ------------------- Load options -------------------
  // const loadCategories = async () => {
  //   try {
  //     const res = await categoryService.getCategories();
  //     return res.map((c) => ({ value: c.id, label: c.name }));
  //   } catch (err) {
  //     setError("Không thể tải danh mục");
  //     return [];
  //   }
  // };

  const loadManufacturers = async () => {
    try {
      const res = await manufacturerService.getManufacturers();
      return res.map((m) => ({ value: m.id, label: m.name }));
    } catch (err) {
      setError("Không thể tải hãng sản xuất");
      return [];
    }
  };

  // ------------------- Các trường input -------------------
  const fields = [
    { name: "id", label: "ID", type: "hidden" },
    { name: "name", label: "Tên sản phẩm" },
    {
      name: "categoryId",
      label: "Danh mục",
      type: "select",
      loadOptions: async () =>
        categoryNotRoot.map((c) => ({ value: c.id, label: c.name })),
    },
    {
      name: "manufacturerId",
      label: "Hãng sản xuất",
      type: "select",
      loadOptions: loadManufacturers,
    },
    { name: "shortDescription", label: "Mô tả ngắn", type: "textarea" },
    { name: "description", label: "Mô tả chi tiết", type: "textarea" },
    { name: "price", label: "Giá", type: "number" },
    { name: "stockQty", label: "Số lượng tồn", type: "number" },
    { name: "warrantyMonths", label: "Bảo hành (tháng)", type: "number" },
    { name: "file", label: "Ảnh", type: "file" },

    // Thông số kỹ thuật
    { name: "cpu", label: "CPU" },
    { name: "ram", label: "RAM" },
    { name: "storage", label: "Ổ cứng" },
    { name: "display", label: "Màn hình" },
    { name: "gpu", label: "GPU" },
    { name: "os", label: "Hệ điều hành" },
    { name: "keyboard", label: "Bàn phím" },
    { name: "fingerprintReader", label: "Vân tay", type: "switch" },
    { name: "battery", label: "Pin" },
    { name: "camera", label: "Camera" },
    { name: "ports", label: "Cổng kết nối" },
    { name: "wireless", label: "Kết nối không dây" },
    { name: "dimensions", label: "Kích thước" },
    { name: "weight", label: "Trọng lượng" },
    { name: "color", label: "Màu sắc" },
    { name: "material", label: "Chất liệu" },
    { name: "condition", label: "Tình trạng" },
    { name: "manufactureYear", label: "Năm sản xuất", type: "number" },
    { name: "warrantyInfo", label: "Thông tin bảo hành" },
    { name: "brand", label: "Thương hiệu" },
    { name: "productType", label: "Loại sản phẩm" },
    { name: "origin", label: "Xuất xứ" },
  ];

  // --------------------- Logic Form ---------------------
  const handleAdd = async (product) => {
    try {
      setLoading(true);
      const res = await productService.createProduct(product);
      setSuccess("Thêm sản phẩm thành công");
      setProducts((prev) => [...prev, res]);
      fetchProducts();
      fetchCategoriesNotRoot();
      loadManufacturers();
    } catch (error) {
      let errMsg = "Đã xảy ra lỗi không xác định";

      if (error.response) {
        const data = error.response.data;

        if (typeof data === "string") {
          errMsg = data;
        } else if (Array.isArray(data)) {
          errMsg = data.map((e) => e.message || JSON.stringify(e)).join(", ");
        } else if (typeof data === "object" && data !== null) {
          errMsg = data.message || JSON.stringify(data);
        } else {
          errMsg = String(data);
        }
      } else {
        errMsg = error.message;
      }

      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (product) => {
    try {
      setLoading(true);
      console.log("đang sửa ở Product.jsx");

      await productService.updateProduct(product);
      setSuccess("Cập nhật sản phẩm thành công");
      fetchProducts();
      fetchCategoriesNotRoot();
      loadManufacturers();
    } catch (error) {
      let errMsg = "Đã xảy ra lỗi không xác định";

      if (error.response) {
        const data = error.response.data;

        if (typeof data === "string") {
          // server trả về text thuần
          errMsg = data;
        } else if (Array.isArray(data)) {
          // server trả về mảng lỗi
          errMsg = data.map((e) => e.message || JSON.stringify(e)).join(", ");
        } else if (typeof data === "object" && data !== null) {
          // server trả về JSON object
          errMsg = data.message || JSON.stringify(data);
        } else {
          errMsg = String(data);
        }
      } else {
        errMsg = error.message;
      }

      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleDel = async (id) => {
    try {
      setLoading(true);
      await productService.deleteProduct(id);
      setSuccess("Xóa sản phẩm thành công");
      fetchProducts();
      fetchCategoriesNotRoot();
      loadManufacturers();
    } catch (error) {
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
      await productService.deleteProducts(ids);
      setSuccess(`Xóa thành công ${ids.length} sản phẩm`);
      fetchProducts();
      fetchCategoriesNotRoot();
      loadManufacturers();
    } catch (error) {
      const errors = error.response?.data || error.message;
      if (Array.isArray(errors)) {
        setError(errors.map((e) => e.errorMessage).join(", "));
      } else {
        setError(errors.errorMessage || error.message);
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
          data={products}
          fields={fields}
          postSchema={productSchema.post}
          putSchema={productSchema.put}
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

export default Product;

import { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import MyToast from "../../../components/MyToast";
import MyFullSpinner from "@components/MyFullSpinner";
import SubmitContext from "@utils/SubmitContext";
import productImageSchema from "../../../schemas/admin/productImageSchema";
import productImageService from "../../../apis/productImageService";
import productService from "../../../apis/productService";

const ProductImage = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ------------------- Fetch API -------------------
  const fetchImages = async () => {
    try {
      setLoading(true);
      const res = await productImageService.getProductImages();
      setImages(res);
    } catch (err) {
      setError(err.message || "Có lỗi xảy ra khi tải ảnh sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const title = "ảnh sản phẩm";

  const handleLoadOptions = async () => {
    try {
      const products = await productService.getProducts();
      return products.map((p) => ({ value: p.id, label: p.name }));
    } catch (error) {
      setError("Có lỗi xảy ra khi tải sản phẩm");
      return [];
    }
  };

  // ------------------- Các trường input -------------------
  const fields = [
    { name: "id", label: "ID", type: "hidden" },
    {
      name: "productId",
      label: "Sản phẩm",
      type: "select",
      loadOptions: handleLoadOptions,
    },
    { name: "file", label: "Ảnh", type: "file" },
    { name: "isPrimary", label: "Ảnh chính", type: "switch" },
  ];

  // --------------------- Logic Form ---------------------
  const handleAdd = async (image) => {
    try {
      setLoading(true);
      const res = await productImageService.createProductImage(image);
      setSuccess("Thêm ảnh thành công");
      setImages((prev) => [...prev, res]);
      fetchImages();
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

  const handleEdit = async (image) => {
    try {
      setLoading(true);
      await productImageService.updateProductImage(image);
      setSuccess("Cập nhật ảnh thành công");
      fetchImages();
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

  const handleDel = async (id) => {
    try {
      setLoading(true);
      await productImageService.deleteProductImage(id);
      setSuccess("Xóa ảnh thành công");
      fetchImages();
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
      await productImageService.deleteProductImages(ids);
      setSuccess(`Xóa thành công ${ids.length} ảnh`);
      fetchImages();
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

  return (
    <>
      <SubmitContext.Provider
        value={{ title, handleAdd, handleEdit, handleDel, handleDelMany }}
      >
        <AdminLayout
          data={images}
          fields={fields}
          postSchema={productImageSchema.post}
          putSchema={productImageSchema.put}
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

export default ProductImage;

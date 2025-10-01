import { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import bannerServices from "../../../apis/bannerService";
import MyToast from "../../../components/MyToast";
import MyFullSpinner from "@components/MyFullSpinner";
import SubmitContext from "@utils/SubmitContext";
import bannerSchema from "../../../schemas/admin/bannerSchema";
import productService from "../../../apis/productService";

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ------------------- Fetch API -------------------
  const fetchBanners = async () => {
    try {
      setLoading(true);
      const res = await bannerServices.getBanners();
      setBanners(res);
    } catch (err) {
      setError(err.message || "Có lỗi xảy ra khi tải banner");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const title = "banner";

  const handleLoadOptions = async () => {
    try {
      const products = await productService.getProducts();
      console.log("products:", products);
      return products.map((p) => ({ value: p.id, label: p.name }));
    } catch (error) {
      setError("Có lỗi xảy ra khi tải sản phẩm");
      return [];
    }
  };

  // ------------------- Các trường input -------------------
  const fields = [
    { name: "id", label: "ID", type: "hidden" },
    { name: "title", label: "Tiêu đề" },
    {
      name: "productId",
      label: "Sản phẩm",
      type: "select",
      loadOptions: handleLoadOptions,
    },
    { name: "file", label: "Ảnh", type: "file" },
    { name: "isActive", label: "Kích hoạt", type: "switch" },
  ];

  // --------------------- Logic Form ---------------------
  const handleAdd = async (banner) => {
    try {
      setLoading(true);
      const res = await bannerServices.createBanner(banner);
      setSuccess("Thêm banner thành công");
      setBanners((prev) => [...prev, res]);
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

  const handleEdit = async (banner) => {
    try {
      setLoading(true);
      await bannerServices.updateBanner(banner);
      setSuccess("Cập nhật banner thành công");
      fetchBanners();
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
      await bannerServices.deleteBanner(id);
      setSuccess("Xóa banner thành công");
      fetchBanners();
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
      await bannerServices.deleteBanners(ids);
      setSuccess(`Xóa thành công ${ids.length} banner`);
      fetchBanners();
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
          data={banners}
          fields={fields}
          postSchema={bannerSchema.post}
          putSchema={bannerSchema.put}
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

export default Banner;

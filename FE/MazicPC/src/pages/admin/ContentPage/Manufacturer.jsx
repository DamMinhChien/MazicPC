import { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import manufacturerServices from "../../../apis/manufacturerService";
import MyToast from "../../../components/MyToast";
import MyFullSpinner from "@components/MyFullSpinner";
import SubmitContext from "@utils/SubmitContext";
import manufacturerSchema from "../../../schemas/admin/manufacturerSchema";

const Manufacturer = () => {
  const [manufacturers, setManufacturers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ------------------- Gọi API thành công -------------------
  const [success, setSuccess] = useState("");

  const fetchManufacturers = async () => {
    try {
      setLoading(true);
      const res = await manufacturerServices.getManufacturers();
      setManufacturers(res);
    } catch (err) {
      setLoading(false);
      setError(err.message || "Có lỗi xảy ra khi tải nhà sản xuất");
    } finally {
      setLoading(false); 
      setError("");
    }
  };
  useEffect(() => {
    fetchManufacturers();
  }, []);

  const title = "nhà sản xuất";

  // ------------------- Các trường input -------------------
  const fields = [
    { name: "id", label: "ID", type: "hidden" },
    { name: "name", label: "Tên nhà sản xuất" },
    { name: "slug", label: "Slug" },
    { name: "logoUrl", label: "Logo", type: "url" },
    { name: "description", label: "Mô tả", type: "textarea" },
    { name: "website", label: "Website", type: "url" },
  ];

  // --------------------- Xử lý logic Form ------------------------------------
  const handleAdd = async (manufacturer) => {
    try {
      setLoading(true);
      const res = await manufacturerServices.createManufacturer(manufacturer);
      setSuccess("Thêm nhà sản xuất thành công");
      setManufacturers((prev) => [...prev, res]);
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

  const handleEdit = async (manufacturer) => {
    try {
      setLoading(true);
      await manufacturerServices.updateManufacturer(manufacturer);
      setSuccess("Cập nhật nhà sản xuất thành công");
      fetchManufacturers();
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
      console.log("Xóa từ Manufacturer:", id);
      setLoading(true);
      await manufacturerServices.deleteManufacturer(id);
      setSuccess("Xóa nhà sản xuất thành công");
      fetchManufacturers();
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
      await manufacturerServices.deleteManufacturers(ids);
      setSuccess(`Xóa thành công ${ids.length} nhà sản xuất`);
      fetchManufacturers();
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
          data={manufacturers}
          fields={fields}
          postSchema={manufacturerSchema.post}
          putSchema={manufacturerSchema.put}
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

export default Manufacturer;

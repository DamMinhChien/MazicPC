import { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import MyToast from "../../../components/MyToast";
import MyFullSpinner from "@components/MyFullSpinner";
import shippingMethodService from "../../../apis/shippingMethodServices";
import SubmitContext from "@utils/SubmitContext";
import shippingMethodSchema from "../../../schemas/admin/shippingMethodSchema";
import { parseApiError } from "../../../utils/helper";

const ShippingMethod = () => {
  const [shippingMethods, setShippingMethods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchShippingMethods = async () => {
    try {
      setLoading(true);
      const res = await shippingMethodService.getShippingMethods();
      setShippingMethods(res);
    } catch (err) {
      setError(err.message || "Có lỗi xảy ra khi tải phương thức giao hàng");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShippingMethods();
  }, []);

  const title = "phương thức giao hàng";

  const fields = [
    { name: "id", label: "ID", type: "hidden" },
    { name: "name", label: "Tên phương thức vận chuyển" },
    { name: "fee", label: "Phí giao hàng", type: "number" },
  ];

  const handleAdd = async (method) => {
    try {
      setLoading(true);
      await shippingMethodService.createShippingMethod(method);
      setSuccess("Thêm phương thức giao hàng thành công");
      fetchShippingMethods();
    } catch (error) {
      setError(parseApiError(error));
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (method) => {
    try {
      setLoading(true);
      await shippingMethodService.updateShippingMethod(method);
      setSuccess("Cập nhật phương thức giao hàng thành công");
      fetchShippingMethods();
    } catch (error) {
      setError(parseApiError(error));
    } finally {
      setLoading(false);
    }
  };

  const handleDel = async (id) => {
    try {
      setLoading(true);
      await shippingMethodService.deleteShippingMethod(id);
      setSuccess("Xóa phương thức giao hàng thành công");
      fetchShippingMethods();
    } catch (error) {
      setError(parseApiError(error));
    } finally {
      setLoading(false);
    }
  };

  const handleDelMany = async (ids) => {
    try {
      setLoading(true);
      await shippingMethodService.deleteShippingMethods(ids);
      setSuccess(`Xóa thành công ${ids.length} phương thức giao hàng`);
      fetchShippingMethods();
    } catch (error) {
      setError(parseApiError(error));
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
          data={shippingMethods}
          fields={fields}
          postSchema={shippingMethodSchema.post}
          putSchema={shippingMethodSchema.put}
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

export default ShippingMethod;

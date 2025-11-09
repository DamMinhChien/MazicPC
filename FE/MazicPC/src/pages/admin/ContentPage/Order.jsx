import { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import MyToast from "../../../components/MyToast";
import MyFullSpinner from "@components/MyFullSpinner";
import orderService from "../../../apis/orderServices";
import SubmitContext from "@utils/SubmitContext";
import orderSchema from "../../../schemas/admin/orderSchema";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await orderService.getAdminOrders();
      setOrders(res);
    } catch (err) {
      setError(err.message || "Có lỗi xảy ra khi tải danh sách đơn hàng");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const title = "đơn hàng";

  const fields = [
    { name: "id", label: "ID", type: "hidden" },
    {
      name: "status",
      label: "Trạng thái đơn hàng",
      type: "select",
      loadOptions: async () => [
        { value: "Pending", label: "Chờ xác nhận" },
        { value: "Confirmed", label: "Đã xác nhận" },
        { value: "Delivering", label: "Đang giao" },
        { value: "Completed", label: "Đã giao" },
        { value: "Cancelled", label: "Đã hủy" },
      ],
    },
  ];

  const handleEdit = async (order) => {
    try {
      setLoading(true);
      await orderService.updateOrder(order);
      setSuccess("Cập nhật đơn hàng thành công");
      fetchOrders();
    } catch (error) {
      const errors = error.response?.data || error.message;
      if (Array.isArray(errors))
        setError(errors.map((e) => e.message).join(", "));
      else setError(errors.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SubmitContext.Provider value={{ title, handleEdit }}>
        <AdminLayout
          data={orders}
          fields={fields}
          postSchema={null}
          putSchema={orderSchema.put}
          permissions={{
            canAdd: false,
            canEdit: true,
            canDelete: false,
            canDeleteMany: false,
          }}
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

export default Order;

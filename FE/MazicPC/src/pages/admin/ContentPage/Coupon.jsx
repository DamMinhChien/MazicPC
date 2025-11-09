import { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import couponService from "../../../apis/couponServices";
import MyToast from "../../../components/MyToast";
import MyFullSpinner from "@components/MyFullSpinner";
import SubmitContext from "@utils/SubmitContext";
import couponSchema from "../../../schemas/admin/couponSchema";

const Coupon = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchCoupons = async () => {
    try {
      setLoading(true);
      const res = await couponService.getCoupons();
      setCoupons(res);
    } catch (err) {
      setError(err.message || "Có lỗi xảy ra khi tải mã giảm giá");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const title = "Quản lý mã giảm giá";

  const fields = [
    { name: "id", label: "ID", type: "hidden" },
    { name: "code", label: "Mã giảm giá" },
    { name: "discount", label: "Giá trị giảm", type: "number" },
    { name: "isPercent", label: "Giảm theo %", type: "switch" },
    { name: "quantity", label: "Số lượng", type: "number" },
    { name: "startDate", label: "Ngày bắt đầu", type: "date" },
    { name: "endDate", label: "Ngày kết thúc", type: "date" },
  ];

  const handleAdd = async (coupon) => {
    try {
      setLoading(true);
      await couponService.createCoupon(coupon);
      setSuccess("Thêm mã giảm giá thành công");
      fetchCoupons();
    } catch (error) {
      const errors = error.response?.data || error.message;
      if (Array.isArray(errors))
        setError(errors.map((e) => e.message).join(", "));
      else setError(errors.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (coupon) => {
    try {
      setLoading(true);
      await couponService.updateCoupon(coupon);
      setSuccess("Cập nhật mã giảm giá thành công");
      fetchCoupons();
    } catch (error) {
      const errors = error.response?.data || error.message;
      if (Array.isArray(errors))
        setError(errors.map((e) => e.message).join(", "));
      else setError(errors.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDel = async (id) => {
    try {
      setLoading(true);
      await couponService.deleteCoupon(id);
      setSuccess("Xóa mã giảm giá thành công");
      fetchCoupons();
    } catch (error) {
      const errors = error.response?.data || error.message;
      if (Array.isArray(errors))
        setError(errors.map((e) => e.message).join(", "));
      else setError(errors.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelMany = async (ids) => {
    try {
      setLoading(true);
      await couponService.deleteCoupons(ids);
      setSuccess(`Xóa thành công ${ids.length} mã giảm giá`);
      fetchCoupons();
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
      <SubmitContext.Provider
        value={{ title, handleAdd, handleEdit, handleDel, handleDelMany }}
      >
        <AdminLayout
          data={coupons}
          fields={fields}
          postSchema={couponSchema.post}
          putSchema={couponSchema.put}
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

export default Coupon;

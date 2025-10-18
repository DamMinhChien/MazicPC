import { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import promotionService from "../../../apis/promotionService";
import MyToast from "../../../components/MyToast";
import MyFullSpinner from "@components/MyFullSpinner";
import SubmitContext from "@utils/SubmitContext";
import promotionSchema from "../../../schemas/admin/promotionSchema";

const GlobalPromotion = () => {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchPromotions = async () => {
    try {
      setLoading(true);
      const res = await promotionService.getPromotionsByType("global");
      setPromotions(res);
    } catch (err) {
      setError(err.message || "Có lỗi xảy ra khi tải khuyến mãi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPromotions();
  }, []);

  const title = "Khuyến mãi toàn hệ thống";

  const fields = [
    { name: "id", label: "ID", type: "hidden" },
    { name: "name", label: "Tên khuyến mãi" },
    {
      name: "discountType",
      label: "Loại giảm giá",
      type: "select",
      loadOptions: async () => [
        { value: "percent", label: "Phần trăm" },
        { value: "amount", label: "Số tiền" },
      ],
    },
    { name: "discountValue", label: "Giá trị giảm", type: "number" },
    { name: "startDate", label: "Ngày bắt đầu", type: "date" },
    { name: "endDate", label: "Ngày kết thúc", type: "date" },
    { name: "targetType", label: "Đối tượng áp dụng", type: "hidden" },
  ];

  const handleAdd = async (promotion) => {
    try {
      setLoading(true);
      const payload = {
        name: promotion.name,
        discountType: promotion.discountType,
        discountValue: promotion.discountValue,
        startDate: promotion.startDate,
        endDate: promotion.endDate,
        targets: [
          {
            targetType: "global",
            targetId: null,
          },
        ],
      };
      await promotionService.createPromotion(payload);
      setSuccess("Thêm khuyến mãi thành công");
      fetchPromotions();
    } catch (error) {
      const errors = error.response?.data || error.message;
      if (Array.isArray(errors))
        setError(errors.map((e) => e.message).join(", "));
      else setError(errors.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (promotion) => {
    try {
      setLoading(true);
      const payload = {
        id: promotion.id,
        name: promotion.name,
        discountType: promotion.discountType,
        discountValue: promotion.discountValue,
        startDate: promotion.startDate,
        endDate: promotion.endDate,
        targets: [
          {
            targetType: "global",
            targetId: null,
          },
        ],
      };
      await promotionService.updatePromotion(payload);
      setSuccess("Cập nhật khuyến mãi thành công");
      fetchPromotions();
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
      await promotionService.deletePromotion(id);
      setSuccess("Xóa khuyến mãi thành công");
      fetchPromotions();
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
      await promotionService.deletePromotions(ids);
      setSuccess(`Xóa thành công ${ids.length} khuyến mãi`);
      fetchPromotions();
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
          data={promotions}
          fields={fields}
          postSchema={promotionSchema.post}
          putSchema={promotionSchema.put}
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

export default GlobalPromotion;

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import AdminLayout from "../layout/AdminLayout";
import promotionService from "../../../apis/promotionService";
import manufacturerService from "../../../apis/manufacturerService";
import MyToast from "../../../components/MyToast";
import MyFullSpinner from "@components/MyFullSpinner";
import SubmitContext from "@utils/SubmitContext";
import promotionSchema from "../../../schemas/admin/promotionSchema";
import { parseApiError } from "../../../utils/helper";

const ManufacturerPromotion = () => {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ------------------- Lấy danh sách khuyến mãi theo manufacturer -------------------
  const fetchPromotions = async () => {
    try {
      setLoading(true);
      const res = await promotionService.getPromotionsByType("manufacturer");
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

  // ------------------- Lấy danh sách manufacturer -------------------
  const {
    data: manufacturers = [],
    isLoading: isManufacturerLoading,
    error: manufacturerError,
  } = useQuery({
    queryKey: ["manufacturers"],
    queryFn: () => manufacturerService.getManufacturers(),
  });

  const title = "khuyến mãi theo nhà sản xuất";

  // ------------------- Danh sách field -------------------
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
    {
      name: "targetId",
      label: "Tên nhà sản xuất áp dụng",
      type: "select",
      loadOptions: async () =>
        manufacturers.map((m) => ({ value: m.id, label: m.name })),
    },
  ];

  // ------------------- Xử lý thêm mới -------------------
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
            targetType: "manufacturer",
            targetId: promotion.targetId,
          },
        ],
      };

      await promotionService.createPromotion(payload);
      setSuccess("Thêm khuyến mãi thành công");
      fetchPromotions();
    } catch (error) {
      setError(parseApiError(error));
    } finally {
      setLoading(false);
    }
  };

  // ------------------- Xử lý cập nhật -------------------
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
            targetType: "manufacturer",
            targetId: promotion.targetId,
          },
        ],
      };

      await promotionService.updatePromotion(payload);
      setSuccess("Cập nhật khuyến mãi thành công");
      fetchPromotions();
    } catch (error) {
      setError(parseApiError(error));
    } finally {
      setLoading(false);
    }
  };

  // ------------------- Xử lý xóa 1 -------------------
  const handleDel = async (id) => {
    try {
      setLoading(true);
      await promotionService.deletePromotion(id);
      setSuccess("Xóa khuyến mãi thành công");
      fetchPromotions();
    } catch (error) {
      setError(parseApiError(error));
    } finally {
      setLoading(false);
    }
  };

  // ------------------- Xử lý xóa nhiều -------------------
  const handleDelMany = async (ids) => {
    try {
      setLoading(true);
      await promotionService.deletePromotions(ids);
      setSuccess(`Xóa thành công ${ids.length} khuyến mãi`);
      fetchPromotions();
    } catch (error) {
      setError(parseApiError(error));
    } finally {
      setLoading(false);
    }
  };

  // ------------------- Render giao diện -------------------
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
        show={!!error || !!manufacturerError}
        message={error || manufacturerError?.message}
        onClose={() => setError("")}
      />

      <MyToast
        title="Thành công"
        bg="success"
        show={!!success}
        message={success}
        onClose={() => setSuccess("")}
      />

      <MyFullSpinner show={loading || isManufacturerLoading} />
    </>
  );
};

export default ManufacturerPromotion;

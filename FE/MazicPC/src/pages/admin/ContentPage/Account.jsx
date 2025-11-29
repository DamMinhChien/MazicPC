import { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import accountServices from "../../../apis/accountService";
import MyToast from "../../../components/MyToast";
import MyFullSpinner from "@components/MyFullSpinner";
import SubmitContext from "@utils/SubmitContext";
import accountSchema from "../../../schemas/admin/accountSchema";
import { parseApiError } from "../../../utils/helper";

const Account = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ------------------- Gọi API thành công -------------------
  const [success, setSuccess] = useState("");

  const fetAccounts = async () => {
    try {
      setLoading(true);
      const res = await accountServices.getAccounts();
      setAccounts(res);
    } catch (err) {
      setLoading(false);
      setError(err.message || "Có lỗi xảy ra khi tải tài khoản");
    } finally {
      setLoading(false);
      setError("");
    }
  };
  useEffect(() => {
    fetAccounts();
  }, []);

  const title = "tài khoản";

  // ------------------- Các trường input -------------------
  const fields = [
    { name: "id", label: "ID", type: "hidden" },
    { name: "username", label: "Tên đăng nhập" },
    { name: "email", label: "Email" },
    { name: "password", label: "Mật khẩu" },
    { name: "fullName", label: "Họ và tên" },
    {
      name: "role",
      label: "Vai trò",
      type: "select",
      loadOptions: async () => [
        { value: "User", label: "User" },
        { value: "Admin", label: "Admin" },
      ],
    },
    { name: "isActive", label: "Kích hoạt", type: "switch" },
  ];

  // --------------------- Xử lý logic Form ------------------------------------
  const handleAdd = async (acc) => {
    try {
      setLoading(true);
      const res = await accountServices.createAccount(acc);
      setSuccess("Thêm tài khoản thành công");
      setAccounts((prev) => [...prev, res]);
    } catch (error) {
      setError(parseApiError(error));
    } finally {
      setLoading(false);
    }
  };
  const handleEdit = async (acc) => {
    try {
      setLoading(true);
      await accountServices.updateAccount(acc);
      setSuccess("Cập nhật tài khoản thành công");
      fetAccounts();
    } catch (error) {
      setError(parseApiError(error));
    } finally {
      setLoading(false);
    }
  };
  const handleDel = async (id) => {
    try {
      console.log("Xóa từ Account:", id);
      setLoading(true);
      await accountServices.deleteAccount(id);
      setSuccess("Xóa tài khoản thành công");
      fetAccounts();
    } catch (error) {
      setError(parseApiError(error));
    } finally {
      setLoading(false);
    }
  };
  const handleDelMany = async (ids) => {
    try {
      setLoading(true);
      await accountServices.deleteAccounts(ids);
      setSuccess(`Xóa thành công ${ids.length} tài khoản`);
      fetAccounts();
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
          data={accounts}
          fields={fields}
          postSchema={accountSchema.post}
          putSchema={accountSchema.put}
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

export default Account;

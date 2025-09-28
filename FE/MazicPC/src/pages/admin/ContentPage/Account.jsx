import React, { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import accountServices from "../../../apis/accountService";
import MyToast from "../../../components/MyToast";
import MyFullSpinner from "@components/MyFullSpinner";
import accountSchema from "../../../schemas/admin/postAccountSchema";
import SubmitContext from "@utils/SubmitContext";

const Account = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ------------------- Gọi API thành công -------------------
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
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
      }
    };
    fetAccounts();
  }, []);

  const title = "tài khoản";
  // ------------------- Các trường input -------------------
  const fields = [
    { name: "username", label: "Tên đăng nhập" },
    { name: "email", label: "Email" },
    { name: "password", label: "Mật khẩu" },
    { name: "fullName", label: "Họ và tên" },
    {
      name: "role",
      label: "Vai trò",
      type: "select",
      options: [
        { value: "user", label: "User" },
        { value: "admin", label: "Admin" },
      ],
    },
    { name: "isActive", label: "Kích hoạt", type: "switch" },
  ];

  // --------------------- Xử lý logic Form ------------------------------------
  const handleAdd = (data) => {};
  const handleEdit = (data) => {};
  const handleDel = (id) => {};
  const handleDelMany = (ids) => {};

  return (
    <>
      <SubmitContext.Provider
        value={{title, handleAdd, handleEdit, handleDel, handleDelMany }}
      >
        <AdminLayout
          data={accounts}
          fields={fields}
          schema={accountSchema}
        />
      </SubmitContext.Provider>

      {/* Toast hiển thị lỗi */}
      <MyToast
        show={!!error}
        onClose={() => setError("")}
        message={error}
        title="Lỗi"
        bg="danger"
      />

      {/* Toast hiển thị thành công */}
      <MyToast
        show={success}
        onClose={() => setSuccess(false)}
        message={successMessage}
        title="Thành công"
        bg="success"
      />

      <MyFullSpinner show={loading} />
    </>
  );
};

export default Account;

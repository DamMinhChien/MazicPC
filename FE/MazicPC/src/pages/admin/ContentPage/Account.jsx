import React, { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import accountServices from "../../../apis/accountService";
import MyToast from "../../../components/MyToast";
import MyFullSpinner from "@components/MyFullSpinner";
import accountSchema from "../../../schemas/admin/postAccountSchema";
const Account = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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

  // ------------------- Các trường input -------------------
  const fields = [
    { name: "username", label: "Tên đăng nhập"},
    { name: "email", label: "Email" },
    { name: "password", label: "Mật khẩu" },
    { name: "fullName", label: "Họ và tên" },
    { name: "role", label: "Vai trò" , type: "select", options: [{ value: "user", label: "User" }, { value: "admin", label: "Admin" }]},
    { name: "isActive", label: "Kích hoạt", type: "switch" },
  ];

  return (
    <>
      <AdminLayout title="tài khoản" data={accounts} fields={fields} schema={accountSchema}/>

      {/* Toast hiển thị lỗi */}
      <MyToast
        show={!!error}
        onClose={() => setError("")}
        message={error}
        title="Lỗi"
        bg="danger"
      />

      <MyFullSpinner show={loading} />
    </>
  );
};

export default Account;

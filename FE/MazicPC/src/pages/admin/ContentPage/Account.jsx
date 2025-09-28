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
  const [success, setSuccess] = useState("");

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
        setError("");
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
        { value: "User", label: "User" },
        { value: "Admin", label: "Admin" },
      ],
    },
    { name: "isActive", label: "Kích hoạt", type: "switch" },
  ];

  // --------------------- Xử lý logic Form ------------------------------------
  const handleAdd = async (acc) => {
    console.log("Thêm tài khoản từ Account.jsx:", acc);
    try {
      setLoading(true);
      const res = await accountServices.createAccount(acc);
      setSuccess("Thêm tài khoản thành công");
      setAccounts((prev) => [...prev, res]);
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
  const handleEdit = (acc) => {};
  const handleDel = (id) => {};
  const handleDelMany = (ids) => {};

  return (
    <>
      <SubmitContext.Provider
        value={{ title, handleAdd, handleEdit, handleDel, handleDelMany }}
      >
        <AdminLayout data={accounts} fields={fields} schema={accountSchema} />
      </SubmitContext.Provider>

      {/* <MyToast
        show={!!error || !!success}
        onClose={() => {
          setError("");
          setSuccess("");
        }}
        message={error || success}
        title={error ? "Lỗi" : "Thành công"}
        bg={error ? "danger" : "success"}
      /> */}

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

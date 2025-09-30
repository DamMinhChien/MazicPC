import { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import userSchema from "../../../schemas/admin/userSchema";
import MyToast from "../../../components/MyToast";
import MyFullSpinner from "@components/MyFullSpinner";
import userService from "../../../apis/userService";
import SubmitContext from "@utils/SubmitContext";

const User = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ------------------- Gọi API thành công -------------------
  const [success, setSuccess] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await userService.getUsers();
      setUsers(res);
    } catch (err) {
      setError(err.message || "Có lỗi xảy ra khi tải người dùng");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const title = "người dùng";

  // ------------------- Các trường input -------------------
  const fields = [
    { name: "id", label: "ID", type: "hidden" },
    { name: "phone", label: "Số điện thoại" },
    { name: "address", label: "Địa chỉ" },
    { name: "avatarUrl", label: "Avatar URL" },
    { name: "fullName", label: "Họ và tên" },
  ];

  // --------------------- Xử lý logic Form ---------------------
  const handleAdd = async (user) => {};

  const handleEdit = async (user) => {
    console.log("Sửa từ User:", user);
    try {
      setLoading(true);
      await userService.updateUser(user.id, user);
      
      setSuccess("Cập nhật người dùng thành công");
      fetchUsers();
    } catch (error) {
      const errors = error.response?.data || error.message;
      setError(
        Array.isArray(errors)
          ? errors.map((e) => e.message).join(", ")
          : errors.message || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDel = async (id) => {
    try {
      setLoading(true);
      await userService.deleteUser(id);
      setSuccess("Xóa người dùng thành công");
      fetchUsers();
    } catch (error) {
      const errors = error.response?.data || error.message;
      setError(
        Array.isArray(errors)
          ? errors.map((e) => e.message).join(", ")
          : errors.message || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelMany = async (ids) => {
    try {
      setLoading(true);
      await userService.deleteUsers(ids);
      setSuccess(`Xóa thành công ${ids.length} người dùng`);
      fetchUsers();
    } catch (error) {
      const errors = error.response?.data || error.message;
      setError(
        Array.isArray(errors)
          ? errors.map((e) => e.message).join(", ")
          : errors.message || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SubmitContext.Provider
        value={{ title, handleAdd, handleEdit, handleDel, handleDelMany}}
      >
        <AdminLayout
          data={users}
          fields={fields}
          postSchema={userSchema.put}
          putSchema={userSchema.put}
          addButtonShow= {true} 
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

export default User;

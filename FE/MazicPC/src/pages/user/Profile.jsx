import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchMe, logout } from "../../redux/slices/authSlice"; // thay đổi import
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Modal,
  Image,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { FaUserCircle, FaKey, FaMapMarkerAlt, FaTrash } from "react-icons/fa";
import accountSchema from "../../schemas/admin/accountSchema";
import userSchema from "../../schemas/admin/userSchema";
import accountServices from "../../apis/accountService";
import userService from "../../apis/userService";
import Address from "./Address";
import MyToast from "../../components/MyToast";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const userData = useSelector((state) => state.auth.user);

  // toast / feedback state
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  // Form for account info
  const {
    register: registerAccount,
    handleSubmit: handleSubmitAccount,
    reset: resetAccount,
    formState: { errors: accountErrors },
  } = useForm({
    resolver: zodResolver(accountSchema.putMe),
    defaultValues: {
      email: userData?.email || "",
      fullName: userData?.user?.fullName || "",
      password: "",
    },
  });

  // Form for user info
  const {
    register: registerUser,
    handleSubmit: handleSubmitUser,
    watch: watchUser,
    reset: resetUser,
    formState: { errors: userErrors },
  } = useForm({
    resolver: zodResolver(userSchema.putMe),
    defaultValues: {
      fullName: userData?.user?.fullName || "",
      phone: userData?.user?.phone || "",
      address: userData?.user?.address || "",
    },
  });

  // keep forms in sync when userData changes
  useEffect(() => {
    resetAccount({
      email: userData?.email || "",
      fullName: userData?.user?.fullName || "",
      password: "",
    });
    resetUser({
      fullName: userData?.user?.fullName || "",
      phone: userData?.user?.phone || "",
      address: userData?.user?.address || "",
      file: null,
    });
    setPreviewImage(null);
  }, [userData, resetAccount, resetUser]);

  // helper: fetch latest user from server and update redux
  const refreshAuthUser = async () => {
    try {
      // Thay vì gọi API thủ công và setUser, dùng fetchMe thunk
      await dispatch(fetchMe()).unwrap();
      // Vẫn giữ invalidate cache của React Query
      queryClient.invalidateQueries(["user"]);
    } catch (err) {
      // Bỏ qua lỗi vì mutations đã xử lý error
    }
  };

  // Mutations
  const updateAccountMutation = useMutation({
    mutationFn: (data) => {
      // Call updateAccountMe directly without FormData
      return accountServices.updateAccountMe(data);
    },
    onSuccess: async () => {
      await refreshAuthUser();
      queryClient.invalidateQueries(["user"]);
      setSuccess("Cập nhật thông tin tài khoản thành công!");
      setError("");
    },
    onError: (err) => {
      setError(err?.message || "Cập nhật tài khoản thất bại");
      setSuccess("");
    },
  });

  // mutation accepts { data, file }
  const updateUserMutation = useMutation({
    mutationFn: ({ data }) => {
      // Use updateUser with FormData handling
      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        if (data[key] !== undefined && data[key] !== null) {
          if (key === "file") {
            formData.append("file", data[key]);
          } else {
            const value =
              typeof data[key] === "boolean" ? data[key].toString() : data[key];
            formData.append(key, value);
          }
        }
      });

      return userService.updateMe(data, formData);
    },
    onSuccess: async () => {
      await refreshAuthUser();
      queryClient.invalidateQueries(["user"]);
      setSuccess("Cập nhật thông tin cá nhân thành công!");
      setError("");
    },
    onError: (err) => {
      setError(err?.message || "Cập nhật thông tin cá nhân thất bại");
      setSuccess("");
    },
  });

  const deleteAccountMutation = useMutation({
    mutationFn: () => accountServices.deleteAccountMe(),
    onSuccess: () => {
      // clear auth state and redirect to login
      dispatch(logout());
      navigate("/login", { replace: true });
    },
    onError: (err) => {
      setError(err?.message || "Xóa tài khoản thất bại");
      setSuccess("");
    },
  });

  // Handle file change
  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  // submit handlers
  const onSubmitAccount = (data) => {
    // Only include non-empty fields for account update
    const payload = {};
    if (data.email?.trim()) payload.email = data.email.trim();
    if (data.fullName?.trim()) payload.fullName = data.fullName.trim();
    if (data.password?.trim()) payload.password = data.password.trim();

    // Only call if we have data to update
    if (Object.keys(payload).length > 0) {
      updateAccountMutation.mutate(payload);
    }
  };

  const onSubmitUser = (data) => {
    const fileField = watchUser("file");
    const file = fileField && fileField.length ? fileField[0] : null;

    // Only include non-empty fields for user update
    const payload = {};
    if (data.fullName?.trim()) payload.fullName = data.fullName.trim();
    if (data.phone?.trim()) payload.phone = data.phone.trim();
    if (data.address?.trim()) payload.address = data.address.trim();
    if (file) payload.file = file;

    // Only mutate if we have data to update
    if (Object.keys(payload).length > 0) {
      updateUserMutation.mutate({ data: payload });
    }
  };

  return (
    <Container className="py-5">
      <Card className="mb-4 shadow-lg p-4">
        <Card.Body>
          <h2 className="mb-0  text-center fw-bold">Hồ sơ của tôi</h2>
        </Card.Body>
      </Card>

      <Row className="g-4">
        {/* Account Information */}
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white">
              <FaKey className="me-2" />
              Thông tin tài khoản
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmitAccount(onSubmitAccount)}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" {...registerAccount("email")} />
                  {accountErrors.email && (
                    <Form.Text className="text-danger">
                      {accountErrors.email.message}
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Họ tên</Form.Label>
                  <Form.Control {...registerAccount("fullName")} />
                  {accountErrors.fullName && (
                    <Form.Text className="text-danger">
                      {accountErrors.fullName.message}
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Mật khẩu mới (để trống nếu không đổi)</Form.Label>
                  <Form.Control
                    type="password"
                    {...registerAccount("password")}
                  />
                  {accountErrors.password && (
                    <Form.Text className="text-danger">
                      {accountErrors.password.message}
                    </Form.Text>
                  )}
                </Form.Group>

                <Button
                  type="submit"
                  disabled={updateAccountMutation.isLoading}
                >
                  {updateAccountMutation.isLoading
                    ? "Đang cập nhật..."
                    : "Cập nhật"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Personal Information */}
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white">
              <FaUserCircle className="me-2" />
              Thông tin cá nhân
            </Card.Header>
            <Card.Body>
              <div className="text-center mb-4">
                <Image
                  src={
                    previewImage ||
                    userData?.user?.avatarUrl ||
                    "/avatar_placeholder.jpg"
                  }
                  roundedCircle
                  width={120}
                  height={120}
                  className="object-fit-cover border"
                />
              </div>

              <Form onSubmit={handleSubmitUser(onSubmitUser)}>
                <Form.Group className="mb-3">
                  <Form.Label>Ảnh đại diện</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    {...registerUser("file")}
                    onChange={(e) => {
                      handleFileChange(e);
                      // forward event to RHF so value is set
                      const onChange = registerUser("file").onChange;
                      if (onChange) onChange(e);
                    }}
                  />
                  {userErrors.file && (
                    <Form.Text className="text-danger">
                      {userErrors.file.message}
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Số điện thoại</Form.Label>
                  <Form.Control {...registerUser("phone")} />
                  {userErrors.phone && (
                    <Form.Text className="text-danger">
                      {userErrors.phone.message}
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Địa chỉ</Form.Label>
                  <Form.Control {...registerUser("address")} />
                  {userErrors.address && (
                    <Form.Text className="text-danger">
                      {userErrors.address.message}
                    </Form.Text>
                  )}
                </Form.Group>

                <div className="d-flex justify-content-between align-items-center">
                  <Button type="submit" disabled={updateUserMutation.isLoading}>
                    {updateUserMutation.isLoading
                      ? "Đang cập nhật..."
                      : "Cập nhật"}
                  </Button>

                  <Button
                    variant="danger"
                    onClick={() => setShowDeleteConfirm(true)}
                  >
                    <FaTrash className="me-2" />
                    Xóa tài khoản
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Shipping Addresses - chỉ hiển thị nếu không phải Admin */}
        {userData?.role !== "Admin" && (
          <Col xs={12}>
            <Card className="shadow-sm">
              <Card.Header className="bg-primary text-white">
                <FaMapMarkerAlt className="me-2" />
                Địa chỉ giao hàng
              </Card.Header>
              <Card.Body>
                <Address />
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>

      {/* Delete Confirmation Modal */}
      <Modal
        show={showDeleteConfirm}
        onHide={() => setShowDeleteConfirm(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-danger">Xóa tài khoản</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Bạn có chắc chắn muốn xóa tài khoản? Hành động này không thể hoàn
            tác!
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDeleteConfirm(false)}
          >
            Hủy
          </Button>
          <Button
            variant="danger"
            onClick={() => deleteAccountMutation.mutate()}
            disabled={deleteAccountMutation.isLoading}
          >
            {deleteAccountMutation.isLoading ? "Đang xóa..." : "Xóa tài khoản"}
          </Button>
        </Modal.Footer>
      </Modal>

      <style jsx>{`
        .object-fit-cover {
          object-fit: cover;
        }
      `}</style>

      <MyToast
        title={success ? "Thành công" : "Lỗi"}
        bg={success ? "success" : "danger"}
        show={!!success || !!error}
        message={success || error}
        onClose={() => {
          setSuccess("");
          setError("");
        }}
      />
    </Container>
  );
};

export default Profile;

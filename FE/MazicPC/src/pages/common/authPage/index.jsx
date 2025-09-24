import { useEffect, useState } from "react";
import styles from "./style.module.css";
import authService from "../../../apis/authService";
import registerSchema from "@/schemas/registerSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import MyToast from "../../../components/MyToast";
import loginSchema from "@/schemas/loginSchema";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchMe } from "../../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import ROUTERS from "../../../utils/router";

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastBg, setToastBg] = useState("success");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  //const schema = isSignUp ? registerSchema : loginSchema;
  // Khởi tạo useForm
  // Form đăng ký
  const registerForm = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  });

  // Form đăng nhập
  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  // Lắng nghe lỗi và show toast
  useEffect(() => {
    const errors = isSignUp
      ? registerForm.formState.errors
      : loginForm.formState.errors;

    if (Object.keys(errors).length > 0) {
      const firstError = Object.values(errors)[0]?.message;
      setToastMessage(firstError);
      setToastBg("danger");
      setShowToast(true);
    }

    if (user) {
      if (user.role.toLowerCase() === "admin") {
        navigate(ROUTERS.ADMIN.DASHBOARD);
      } else {
        navigate(ROUTERS.USER.HOME);
      }
    }
  }, [
    registerForm.formState.errors,
    loginForm.formState.errors,
    isSignUp,
    user,
    navigate,
  ]);

  const onSubmit = async (data) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      let res;
      if (isSignUp) {
        res = await authService.register(data);
        setToastMessage("Đăng ký thành công!");
      } else {
        res = await authService.login(data);
        setToastMessage("Đăng nhập thành công!");

        // Lưu state trong Redux và localstore
        dispatch(fetchMe());
      }

      setToastBg("success");
      setShowToast(true);
    } catch (error) {
      const validationErrors = error.response?.data;

      // Nếu là mảng lỗi validation
      if (Array.isArray(validationErrors) && validationErrors.length > 0) {
        const messages = validationErrors
          .map((err) => err.errorMessage)
          .join(", ");
        setToastMessage(messages);
      } else if (typeof validationErrors === "string") {
        // server trả plain text (Unauthorized("..."))
        setToastMessage(validationErrors);
      } else {
        setToastMessage(error.message); // fallback
      }
      setToastBg("danger");
      setShowToast(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.authWrapper}>
      <div
        className={`${styles.container} ${isSignUp ? styles.active : ""}`}
        id="container"
      >
        {/* Form Đăng ký */}
        <div className={`${styles.formContainer} ${styles.signUp}`}>
          <form onSubmit={registerForm.handleSubmit(onSubmit)}>
            <h1>Đăng ký</h1>
            <input
              type="text"
              placeholder="Họ và tên"
              {...registerForm.register("fullName")}
            />
            <input
              type="text"
              placeholder="Tài khoản"
              {...registerForm.register("userName")}
            />
            <input
              type="password"
              placeholder="Mật khẩu"
              {...registerForm.register("password")}
            />
            <input
              type="email"
              placeholder="Email"
              {...registerForm.register("email")}
            />
            <button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Đang xử lý...
                </>
              ) : (
                "Đăng ký"
              )}
            </button>
          </form>
        </div>

        {/* Form Đăng nhập */}
        <div className={`${styles.formContainer} ${styles.signIn}`}>
          <form onSubmit={loginForm.handleSubmit(onSubmit)}>
            <h1>Đăng nhập</h1>
            <input
              type="text"
              placeholder="Tài khoản"
              {...loginForm.register("userName")}
            />
            <input
              type="password"
              placeholder="Mật khẩu"
              {...loginForm.register("password")}
            />
            <button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Đang xử lý...
                </>
              ) : (
                "Đăng nhập"
              )}
            </button>
          </form>
        </div>

        {/* Toggle */}
        <div className={styles.toggleContainer}>
          <div className={styles.toggle}>
            <div className={`${styles.togglePanel} ${styles.toggleLeft}`}>
              <h1>Chào mừng trở lại!</h1>
              <p>Nhập thông tin để đăng nhập</p>
              <button
                type="button"
                className={styles.hidden}
                onClick={() => setIsSignUp(false)}
              >
                Đăng nhập
              </button>
            </div>
            <div className={`${styles.togglePanel} ${styles.toggleRight}`}>
              <h1>Xin chào!</h1>
              <p>Đăng ký để trải nghiệm đầy đủ tính năng</p>
              <button
                type="button"
                className={styles.hidden}
                onClick={() => setIsSignUp(true)}
              >
                Đăng ký
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      <MyToast
        show={showToast}
        onClose={() => setShowToast(false)}
        message={toastMessage}
        bg={toastBg}
        delay={3000}
        position="top-end"
      />
    </div>
  );
};

export default AuthPage;

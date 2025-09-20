import { useState } from "react";
import styles from "./style.module.css";

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className={styles.authWrapper}>
      <div
        className={`${styles.container} ${isSignUp ? styles.active : ""}`}
        id="container"
      >
        {/* Form Đăng ký */}
        <div className={`${styles.formContainer} ${styles.signUp}`}>
          <form>
            <h1>Đăng ký</h1>
            <input type="text" placeholder="Họ và tên" />
            <input type="text" placeholder="Tài khoản" />
            <input type="password" placeholder="Mật khẩu" />
            <button type="submit">Đăng ký</button>
          </form>
        </div>

        {/* Form Đăng nhập */}
        <div className={`${styles.formContainer} ${styles.signIn}`}>
          <form>
            <h1>Đăng nhập</h1>
            <input type="text" placeholder="Tài khoản" />
            <input type="password" placeholder="Mật khẩu" />
            <button type="submit">Đăng nhập</button>
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
    </div>
  );
};

export default AuthPage;

import { Link } from "react-router-dom";
import styles from "./style.module.css";
import ROUTERS from "../../../utils/router";

const NotFoundPage = () => {
  return (
    <div className={styles.bgPurple}>
      <div className={styles.stars}>
        {/* Logo nếu cần */}
        <div className={styles.customNavbar}>
          <div className={styles.brandLogo}>
            <img
              src="http://salehriaz.com/404Page/img/logo.svg"
              alt="Logo"
              width="80"
            />
          </div>
        </div>

        {/* Nội dung chính */}
        <div className={styles.centralBody}>
          <img
            className={styles.image404}
            src="http://salehriaz.com/404Page/img/404.svg"
            alt="404"
            width="300"
          />
          <Link to={ROUTERS.USER.HOME} className={styles.btnGoHome}>
            Trang chủ
          </Link>
        </div>

        {/* Các đối tượng bay */}
        <div className={styles.objects}>
          <img
            className={styles.objectRocket}
            src="http://salehriaz.com/404Page/img/rocket.svg"
            alt="Rocket"
            width="40"
          />
          <div className={styles.earthMoon}>
            <img
              className={styles.objectEarth}
              src="http://salehriaz.com/404Page/img/earth.svg"
              alt="Earth"
              width="100"
            />
            <img
              className={styles.objectMoon}
              src="http://salehriaz.com/404Page/img/moon.svg"
              alt="Moon"
              width="80"
            />
          </div>
          <div className={styles.boxAstronaut}>
            <img
              className={styles.objectAstronaut}
              src="http://salehriaz.com/404Page/img/astronaut.svg"
              alt="Astronaut"
              width="140"
            />
          </div>
        </div>

        {/* Sao sáng */}
        <div className={styles.glowingStars}>
          <div className={styles.star}></div>
          <div className={styles.star}></div>
          <div className={styles.star}></div>
          <div className={styles.star}></div>
          <div className={styles.star}></div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;

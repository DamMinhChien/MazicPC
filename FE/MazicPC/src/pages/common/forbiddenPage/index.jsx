import { Link } from "react-router-dom";
import styles from "./style.module.css";
import ROUTERS from "../../../utils/router";
const ForbiddenPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.mainContainer}>
        {/* Bat 1 */}
        <div className={styles.bat + " " + styles.fly1}>
          <img
            className={styles.wing + " " + styles.leftWing}
            src="/403/bat-wing.png"
            alt="Cánh trái"
          />
          <img className={styles.body} src="/403/bat-body.png" alt="Thân dơi" />
          <img
            className={styles.wing + " " + styles.rightWing}
            src="/403/bat-wing.png"
            alt="Cánh phải"
          />
        </div>

        {/* Bat 2 */}
        <div className={styles.bat + " " + styles.fly2}>
          <img
            className={styles.wing + " " + styles.leftWing}
            src="/403/bat-wing.png"
            alt="Cánh trái"
          />
          <img className={styles.body} src="/403/bat-body.png" alt="Thân dơi" />
          <img
            className={styles.wing + " " + styles.rightWing}
            src="/403/bat-wing.png"
            alt="Cánh phải"
          />
        </div>

        {/* Bat 3 */}
        <div className={styles.bat + " " + styles.fly3}>
          <img
            className={styles.wing + " " + styles.leftWing}
            src="/403/bat-wing.png"
            alt="Cánh trái"
          />
          <img className={styles.body} src="/403/bat-body.png" alt="Thân dơi" />
          <img
            className={styles.wing + " " + styles.rightWing}
            src="/403/bat-wing.png"
            alt="Cánh phải"
          />
        </div>

        {/* Foreground */}
        <img
          className={styles.foregroundImg}
          src="/403/HauntedHouseForeground.png"
          alt="Ngôi nhà ma ám"
        />
      </div>

      <h1 className={styles.errorCode}>FORBIDDEN 403</h1>
      <Link to={ROUTERS.USER.HOME} className={styles.errorText}>
        Khu vực này bị cấm. Hãy quay lại ngay!
      </Link>
    </div>
  );
};

export default ForbiddenPage;

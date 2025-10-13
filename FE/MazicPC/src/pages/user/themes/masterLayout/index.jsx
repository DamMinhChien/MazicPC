import { useEffect, useState } from "react";
//import AdsMarquee from "../../components/AdsMarquee";
import Footer from "../footer";
import Header from "../header";
import Snowfall from "../../../../components/Snowfall";
import { useLocation } from "react-router-dom";

const MasterLayout = ({ children, ...props }) => {
  const location = useLocation();
  const [showSnow, setShowSnow] = useState(false);
  useEffect(() => {
    const navbar = document.querySelector(".navbar");
    const content = document.querySelector(".main");
    if (navbar && content) {
      content.style.paddingTop = `${navbar.offsetHeight}px`;
    }
  }, []);

  useEffect(() => {
    window.scroll({ top: 0, behavior: "smooth" });
  }, [location]);

  return (
    <div className="wrapper min-vh-100 d-flex flex-column" {...props}>
      {showSnow && <Snowfall />}
      <Header
        showSnow={showSnow}
        toggleSnow={() => setShowSnow((prev) => !prev)}
      />
      <div className="main flex-grow-1 mt-5">{children}</div>
      <Footer />
    </div>
  );
};

export default MasterLayout;

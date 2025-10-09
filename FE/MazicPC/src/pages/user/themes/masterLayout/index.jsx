import { useEffect, useState } from "react";
import AdsMarquee from "../../components/AdsMarquee";
import Footer from "../footer";
import Header from "../header";
import Snowfall from "../../../../components/Snowfall";

const MasterLayout = ({ children, ...props }) => {
  const [showSnow, setShowSnow] = useState(false);
  useEffect(() => {
  const navbar = document.querySelector('.navbar');
  const content = document.querySelector('.main');
  if (navbar && content) {
    content.style.paddingTop = `${navbar.offsetHeight}px`;
  }
}, []);

  return (
    <div className="wrapper min-vh-100 d-flex flex-column" {...props}>
      {showSnow && <Snowfall />}
      <AdsMarquee />
      <Header
        showSnow={showSnow}
        toggleSnow={() => setShowSnow((prev) => !prev)}
      />
      <div className="main flex-grow-1">{children}</div>
      <Footer />
    </div>
  );
};

export default MasterLayout;

import Footer from "../footer";
import Header from "../header";

const MasterLayout = ({ children, ...props }) => {
  return (
    <div className="wrapper min-vh-100 d-flex flex-column" {...props}>
      <Header />
      <div className="main flex-grow-1">{children}</div>
      <Footer />
    </div>
  );
};

export default MasterLayout;

import { useEffect } from "react";
import AppHeader from "./AppHeader";
import AppSidebar from "./AppSidebar";
import AppContent from "./AppContent";
import AppFooter from "./AppFooter";
import { Container } from "react-bootstrap";

const DashboardPage = () => {
  useEffect(() => {
    import("@coreui/coreui/dist/js/coreui.bundle.min.js");
    import("@coreui/coreui/dist/css/coreui.min.css");
  }, []);
  return (
    <Container fluid className="d-flex bg-white">
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 flex-grow-1" style={{marginLeft: "80px"}}>
        <AppHeader />
        <div className="body flex-grow-1 p-3">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </Container>
  );
};

export default DashboardPage;

import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
} from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import "./header.css"

const Header = () => {
  return (
    <header className="px-4">
      <Navbar bg="light" expand="lg" className="mb-3">
        <Container fluid className="d-flex align-items-center justify-content-between">
          <Navbar.Brand href="#" className="order-1 order-lg-0 mx-auto mx-lg-0">
            <img
              src="/logo-black-new.png"
              alt="logo"
              style={{ height: "50px" }}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar-expand-lg" />
          <Navbar.Offcanvas
            id="offcanvasNavbar-expand-lg"
            aria-labelledby="offcanvasNavbarLabel-expand-lg"
            placement="start"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel-expand-lg">
                Menu
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="mx-auto gap-2">
                <Nav.Link href="#home" className="fw-bold">
                  Trang chủ
                </Nav.Link>
                <NavDropdown
                  title="Danh mục"
                  className="category-menu fw-bold"
                >
                  <NavDropdown.Item href="#action1">Liên hệ</NavDropdown.Item>
                  <NavDropdown.Item href="#action2">Hỗ trợ</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action3">Đăng xuất</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="#about" className="fw-bold">
                  Tin tức
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
          <Nav className="order-1 order-lg-0 ms-auto mx-lg-0 flex-nowrap">
            <NavDropdown title={<IoPerson size={20} />} id="user-menu-dropdown">
              <NavDropdown.Item href="#profile">Hồ sơ</NavDropdown.Item>
              <NavDropdown.Item href="#settings">Cài đặt</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#logout">Đăng xuất</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#cart">
              <FaShoppingCart size={20} />
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;

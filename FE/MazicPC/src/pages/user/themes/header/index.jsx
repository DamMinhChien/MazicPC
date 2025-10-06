import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
} from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import "./header.css";
import { useDispatch, useSelector } from "react-redux";
import ROUTERS from "../../../../utils/router";
import {
  FaArrowRightFromBracket,
  FaArrowRightToBracket,
} from "react-icons/fa6";
import { Link } from "react-router-dom";
import { logoutAsync } from "../../../../redux/slices/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isLogin = !!user;
  console.log("Trạng thái: ", user);

  return (
    <header className="px-4">
      <Navbar bg="light" variant="light" expand="lg" className="mb-3">
        <Container
          fluid
          className="d-flex align-items-center justify-content-between"
        >
          <Navbar.Brand
            as={Link}
            to={ROUTERS.USER.HOME}
            className="order-1 order-lg-0 mx-auto mx-lg-0"
          >
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
                <Nav.Link as={Link} to={ROUTERS.USER.HOME} className="fw-bold">
                  Trang chủ
                </Nav.Link>
                <NavDropdown title="Danh mục" className="category-menu fw-bold">
                  <NavDropdown.Item as={Link} to="#action1">
                    Liên hệ
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="#action2">
                    Hỗ trợ
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="#action3">
                    Đăng xuất
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link as={Link} to={ROUTERS.USER.HOME} className="fw-bold">
                  Tin tức
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
          <Nav className="order-1 order-lg-0 ms-auto mx-lg-0 flex-nowrap">
            <NavDropdown title={<IoPerson size={20} />} id="user-menu-dropdown">
              <NavDropdown.Item as={Link} to="#profile">
                Hồ sơ
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="#settings">
                Cài đặt
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="#logout">
                Đăng xuất
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to={ROUTERS.USER.HOME}>
              <FaShoppingCart size={20} />
            </Nav.Link>
            <Nav.Link
              as={Link}
              to={isLogin ? "#" : ROUTERS.COMMON.AUTH}
              onClick={() => dispatch(logoutAsync())}
            >
              {isLogin ? (
                <FaArrowRightFromBracket />
              ) : (
                <FaArrowRightToBracket />
              )}
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;

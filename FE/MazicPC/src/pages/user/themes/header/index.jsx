import {
  Button,
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
} from "react-bootstrap";
import { FaShoppingCart, FaSnowflake } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import ROUTERS from "../../../../utils/router";
import {
  FaArrowRightFromBracket,
  FaArrowRightToBracket,
} from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { logoutAsync } from "../../../../redux/slices/authSlice";
import SearchHeader from "../../components/SearchHeader";
import AdsMarquee from "../../components/AdsMarquee";
import { useQuery } from "@tanstack/react-query";
import categoryServices from "../../../../apis/categoryService";
import MyFullSpinner from "../../../../components/MyFullSpinner";
import CategoryMegaMenu from "../../components/CategoryMegaMenu";
import { useEffect, useState } from "react";

const Header = ({ showSnow, toggleSnow }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isLogin = !!user;
  //fixed="top" style={{ marginTop: "2rem" }}
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();

  // 🔒 Mỗi khi URL thay đổi → tự đóng menu
  useEffect(() => {
    setShowMenu(false);
  }, [location]);

  const { data: categories, isLoading } = useQuery({
    queryKey: ["categoriesTree"],
    queryFn: async () => categoryServices.getCategoryTree(),
  });

  return (
    <header className="position-fixed fixed-top">
      <AdsMarquee />
      <Navbar bg="light" variant="light" expand="lg">
        <Container
          fluid
          className="d-flex align-items-center justify-content-between position-relative"
        >
          {/* Logo cho màn hình lg+ */}
          <Navbar.Brand
            as={Link}
            to={ROUTERS.USER.HOME}
            className="d-none d-lg-block"
          >
            <img
              src="/logo-black-new.png"
              alt="logo"
              style={{ height: "50px" }}
            />
          </Navbar.Brand>

          {/* Logo cho màn hình nhỏ (căn giữa) */}
          <Navbar.Brand
            as={Link}
            to={ROUTERS.USER.HOME}
            className="position-absolute start-50 translate-middle-x d-lg-none"
          >
            <img
              src="/logo-black-new.png"
              alt="logo"
              style={{ height: "50px" }}
            />
          </Navbar.Brand>

          {/* Toggle menu */}
          <Navbar.Toggle aria-controls="offcanvasNavbar-expand-lg" />

          {/* Offcanvas menu */}
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
            <Offcanvas.Body className="fs-5">
              <Nav className="mx-auto gap-2">
                <Nav.Link as={Link} to={ROUTERS.USER.HOME} className="fw-bold">
                  Trang chủ
                </Nav.Link>
                <NavDropdown
                  title="Danh mục"
                  className="category-menu fw-bold position-static"
                  menuVariant="light"
                  as="div"
                  show={showMenu}
                  onClick={() => setShowMenu(!showMenu)}
                >
                  {isLoading ? (
                    <MyFullSpinner show={isLoading} />
                  ) : (
                    showMenu && (
                      <CategoryMegaMenu categories={categories || []} />
                    )
                  )}
                </NavDropdown>

                <Nav.Link as={Link} to={ROUTERS.USER.HOME} className="fw-bold">
                  Tin tức
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>

          {/* Icon góc phải */}
          <div
            className="d-flex align-items-center gap-3 flex-nowrap"
            style={{ minWidth: "fit-content" }}
          >
            <SearchHeader />

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

            <Nav.Link onClick={toggleSnow}>
              <FaSnowflake
                size={20}
                className={showSnow ? "text-danger" : "text-dark"}
              />
            </Nav.Link>

            <Nav.Link as={Link} to={ROUTERS.USER.CART}>
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
          </div>
        </Container>
      </Navbar>
      <style jsx>
        {`
          .category-menu .dropdown-menu {
            left: 0 !important;
            right: 0 !important;
            width: 100%;
            border: none;
            padding: 0;
          }
          .category-menu .dropdown-menu.show {
            display: block;
          }
        `}
      </style>
    </header>
  );
};

export default Header;

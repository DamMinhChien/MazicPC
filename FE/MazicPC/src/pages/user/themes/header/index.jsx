import {
  Button,
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
  Image,
  Badge,
} from "react-bootstrap";
import {
  FaShoppingCart,
  FaSnowflake,
  FaBoxOpen,
  FaUserAlt,
} from "react-icons/fa";
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
  const cartItems = useSelector((state) => state.cart.items);
  const isLogin = !!user;
  //fixed="top" style={{ marginTop: "2rem" }}
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();

  // avatar (theo yêu cầu dùng user.user.avatarUrl, fallback)
  const avatarSrc = user?.user?.avatarUrl || "/avatar_placeholder.jpg";

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

            {/* --- user avatar + dropdown --- */}
            <NavDropdown
              id="user-menu-dropdown"
              className="user-dropdown"
              title={
                <Image
                  src={avatarSrc}
                  roundedCircle
                  width={40}
                  height={40}
                  style={{ objectFit: "cover", border: "2px solid #000000ff" }}
                />
              }
            >
              <NavDropdown.Item as={Link} to={ROUTERS.USER.PROFILE || "#profile"}>
                <FaUserAlt className="me-2" />
                Hồ sơ
              </NavDropdown.Item>

              <NavDropdown.Item as={Link} to={ROUTERS.USER.ORDER || "#orders"}>
                <FaBoxOpen className="me-2" />
                Đơn hàng
              </NavDropdown.Item>

              <NavDropdown.Divider />
              {/* Đã bỏ mục Đăng xuất ở đây theo yêu cầu */}
            </NavDropdown>

            <Nav.Link onClick={toggleSnow}>
              <FaSnowflake
                size={20}
                className={showSnow ? "text-danger" : "text-dark"}
              />
            </Nav.Link>

            <Nav.Link as={Link} to={ROUTERS.USER.CART}>
              <div className="position-relative d-inline-block">
                <FaShoppingCart size={20} />
                {cartItems.length > 0 && (
                  <Badge
                    bg="danger"
                    className="position-absolute top-0 start-100 translate-middle rounded-circle"
                    style={{ zIndex: 10000 }}
                  >
                    {cartItems.length}
                  </Badge>
                )}
              </div>
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

          /* đảm bảo dropdown được tính tọa độ từ chính trigger */
          .user-dropdown {
            position: relative;
          }

          /* căn giữa dropdown bên dưới avatar */
          .user-dropdown .dropdown-menu {
            left: 50% !important;
            transform: translateX(-50%) !important;
            top: calc(
              100% + 6px
            ) !important; /* 6px gap dưới avatar, chỉnh nếu cần */
            min-width: 200px;
            right: auto !important;
          }

          /* một chút style cho item icon */
          .user-dropdown .dropdown-item svg {
            vertical-align: middle;
          }
        `}
      </style>
    </header>
  );
};

export default Header;

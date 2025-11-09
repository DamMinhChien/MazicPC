import {
  CBadge,
  CSidebar,
  CSidebarBrand,
  CSidebarHeader,
  CSidebarNav,
  CNavGroup,
  CNavItem,
  CNavTitle,
  CNavLink,
} from "@coreui/react";

import CIcon from "@coreui/icons-react";
import {
  cilAccountLogout,
  cilBasket,
  cilCloudDownload,
  cilFactory,
  cilImage,
  cilLayers,
  cilList,
  cilLockLocked,
  cilPuzzle,
  cilSpeedometer,
  cilUser,
  cilTags,
  cilWallpaper,
  cilGift, // thêm import cho mã giảm giá
  cilTruck, // thêm import cho shipping method
} from "@coreui/icons";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../../../redux/slices/currentPageSlice";
import { useEffect } from "react";

const AppSidebar = () => {
  const dispatch = useDispatch();
  const handleSelect = (page) => {
    dispatch(setCurrentPage(page));
  };

  useEffect(() => {
    handleSelect("dashboard");
  }, []);
  return (
    <CSidebar className="border-end" unfoldable>
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand
          onClick={() => handleSelect("dashboard")}
          style={{ cursor: "pointer" }}
        >
          <img
            src="/logo-black.png"
            className="sidebar-brand-narrow"
            alt="Logo small"
            height={32}
          />
          <img
            src="/logo-black.png"
            className="sidebar-brand-full"
            alt="Logo small"
            height={32}
          />
          <span className="sidebar-brand-full ms-2 fw-bold">MazicPC</span>
        </CSidebarBrand>
      </CSidebarHeader>
      <CSidebarNav>
        <CNavTitle>Chức năng</CNavTitle>

        {/* Dashboard riêng một mục */}
        <CNavItem>
          <CNavLink
            onClick={() => handleSelect("dashboard")}
            style={{ cursor: "pointer" }}
          >
            <CIcon customClassName="nav-icon" icon={cilSpeedometer} /> Dashboard
          </CNavLink>
        </CNavItem>

        {/* Nhóm Quản lý người dùng */}
        <CNavGroup
          toggler={
            <>
              <CIcon customClassName="nav-icon" icon={cilUser} /> Quản lý người
              dùng
            </>
          }
        >
          <CNavItem>
            <CNavLink
              onClick={() => handleSelect("account")}
              style={{ cursor: "pointer" }}
            >
              <span className="nav-icon">
                <span className="nav-icon-bullet"></span>
              </span>
              Tài khoản
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              onClick={() => handleSelect("user")}
              style={{ cursor: "pointer" }}
            >
              <span className="nav-icon">
                <span className="nav-icon-bullet"></span>
              </span>
              Người dùng
            </CNavLink>
          </CNavItem>
        </CNavGroup>

        {/* Nhóm Quản lý sản phẩm */}
        <CNavGroup
          toggler={
            <>
              <CIcon customClassName="nav-icon" icon={cilBasket} /> Quản lý sản
              phẩm
            </>
          }
        >
          <CNavItem>
            <CNavLink
              onClick={() => handleSelect("category")}
              style={{ cursor: "pointer" }}
            >
              <span className="nav-icon">
                <span className="nav-icon-bullet"></span>
              </span>
              Danh mục
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              onClick={() => handleSelect("manufacturer")}
              style={{ cursor: "pointer" }}
            >
              <span className="nav-icon">
                <span className="nav-icon-bullet"></span>
              </span>
              Hãng sản xuất
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              onClick={() => handleSelect("product")}
              style={{ cursor: "pointer" }}
            >
              <span className="nav-icon">
                <span className="nav-icon-bullet"></span>
              </span>
              Sản phẩm
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              onClick={() => handleSelect("productImage")}
              style={{ cursor: "pointer" }}
            >
              <span className="nav-icon">
                <span className="nav-icon-bullet"></span>
              </span>
              Ảnh sản phẩm
            </CNavLink>
          </CNavItem>
        </CNavGroup>

        {/* Nhóm Khuyến mãi & Giảm giá */}
        <CNavGroup
          toggler={
            <>
              <CIcon customClassName="nav-icon" icon={cilTags} /> Khuyến mãi &
              Giảm giá
            </>
          }
        >
          <CNavItem>
            <CNavLink
              onClick={() => handleSelect("product-promotion")}
              style={{ cursor: "pointer" }}
            >
              <span className="nav-icon">
                <span className="nav-icon-bullet"></span>
              </span>
              Khuyến mãi sản phẩm
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              onClick={() => handleSelect("category-promotion")}
              style={{ cursor: "pointer" }}
            >
              <span className="nav-icon">
                <span className="nav-icon-bullet"></span>
              </span>
              Khuyến mãi danh mục
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              onClick={() => handleSelect("manufacturer-promotion")}
              style={{ cursor: "pointer" }}
            >
              <span className="nav-icon">
                <span className="nav-icon-bullet"></span>
              </span>
              Khuyến mãi nhà sản xuất
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              onClick={() => handleSelect("global-promotion")}
              style={{ cursor: "pointer" }}
            >
              <span className="nav-icon">
                <span className="nav-icon-bullet"></span>
              </span>
              Khuyến mãi toàn hệ thống
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              onClick={() => handleSelect("coupon")}
              style={{ cursor: "pointer" }}
            >
              <span className="nav-icon">
                <span className="nav-icon-bullet"></span>
              </span>
              Mã giảm giá
            </CNavLink>
          </CNavItem>
        </CNavGroup>

        {/* Nhóm Giao hàng & Hiển thị */}
        <CNavGroup
          toggler={
            <>
              <CIcon customClassName="nav-icon" icon={cilTruck} /> Đơn hàng &
              Vận chuyển
            </>
          }
        >
          <CNavItem>
            <CNavLink
              onClick={() => handleSelect("order")}
              style={{ cursor: "pointer" }}
            >
              <span className="nav-icon">
                <span className="nav-icon-bullet"></span>
              </span>
              Đơn hàng
            </CNavLink>
          </CNavItem>
          
          <CNavItem>
            <CNavLink
              onClick={() => handleSelect("shipping-method")}
              style={{ cursor: "pointer" }}
            >
              <span className="nav-icon">
                <span className="nav-icon-bullet"></span>
              </span>
              Phương thức vận chuyển
            </CNavLink>
          </CNavItem>
        </CNavGroup>
        <CNavItem>
          <CNavLink
            onClick={() => handleSelect("banner")}
            style={{ cursor: "pointer" }}
          >
            <CIcon customClassName="nav-icon" icon={cilImage} /> Banner
          </CNavLink>
        </CNavItem>
      </CSidebarNav>
    </CSidebar>
  );
};

export default AppSidebar;

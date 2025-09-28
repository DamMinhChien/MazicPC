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
  cilCloudDownload,
  cilLayers,
  cilPuzzle,
  cilSpeedometer,
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

        <CNavItem>
          <CNavLink
            onClick={() => handleSelect("dashboard")}
            style={{ cursor: "pointer" }}
          >
            <CIcon customClassName="nav-icon" icon={cilSpeedometer} /> Dashboard
          </CNavLink>
        </CNavItem>

        <CNavItem>
          <CNavLink
            onClick={() => handleSelect("account")}
            style={{ cursor: "pointer" }}
          >
            <CIcon customClassName="nav-icon" icon={cilSpeedometer} /> Tài khoản
          </CNavLink>
        </CNavItem>

        <CNavItem>
          <CNavLink
            onClick={() => handleSelect("product")}
            style={{ cursor: "pointer" }}
          >
            <CIcon customClassName="nav-icon" icon={cilSpeedometer} /> Sản phẩm
          </CNavLink>
        </CNavItem>

        <CNavItem>
          <CNavLink
            onClick={() => handleSelect("category")}
            style={{ cursor: "pointer" }}
          >
            <CIcon customClassName="nav-icon" icon={cilSpeedometer} /> Danh mục
          </CNavLink>
        </CNavItem>

        <CNavItem href="#">
          <CIcon customClassName="nav-icon" icon={cilSpeedometer} /> With badge{" "}
          <CBadge color="primary ms-auto">NEW</CBadge>
        </CNavItem>
        <CNavGroup
          toggler={
            <>
              <CIcon customClassName="nav-icon" icon={cilPuzzle} /> Nav dropdown
            </>
          }
        >
          <CNavItem href="#">
            <span className="nav-icon">
              <span className="nav-icon-bullet"></span>
            </span>{" "}
            Nav dropdown item
          </CNavItem>
          <CNavItem href="#">
            <span className="nav-icon">
              <span className="nav-icon-bullet"></span>
            </span>{" "}
            Nav dropdown item
          </CNavItem>
        </CNavGroup>
        <CNavItem href="https://coreui.io">
          <CIcon customClassName="nav-icon" icon={cilCloudDownload} /> Download
          CoreUI
        </CNavItem>
        <CNavItem href="https://coreui.io/pro/">
          <CIcon customClassName="nav-icon" icon={cilLayers} /> Try CoreUI PRO
        </CNavItem>
      </CSidebarNav>
    </CSidebar>
  );
};

export default AppSidebar;

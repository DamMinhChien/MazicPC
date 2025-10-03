import {
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CHeader,
  CHeaderBrand,
} from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../../redux/slices/currentPageSlice";
import { logoutAsync } from "../../../redux/slices/authSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ROUTERS from "../../../utils/router";
import ConfirmModal from "@components/ConfirmModal";
import MyToast from "../../../components/MyToast";

const AppHeader = () => {
  const dispatch = useDispatch();
  const [logoutError, setLogoutError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleSelect = (page) => {
    dispatch(setCurrentPage(page));
  };

  const handleLogout = () => {
    dispatch(logoutAsync())
      .unwrap()
      .then(() => {
        navigate(ROUTERS.USER.HOME); // chuyển hướng về home
      })
      .catch((err) => {
        setLogoutError(true);
        setErrorMessage(err || "Lỗi đăng xuất");
      });
    setShowConfirm(false);
  };

  return (
    <>
      <CHeader>
        <CContainer
          fluid
          className="d-flex justify-content-between align-items-center"
        >
          {/* Bên trái - Logo (click → dispatch) */}
          <CHeaderBrand
            onClick={() => handleSelect("dashboard")}
            style={{ cursor: "pointer" }}
          >
            <img src="/logo-black-new.png" alt="logo" width={50} />
          </CHeaderBrand>

          {/* Ở giữa - Tiêu đề */}
          <h4 className="m-0 fw-bold text-center flex-grow-1 text-gradient">
            MazicPC
          </h4>

          {/* Bên phải - Danger Administrator + avatar */}
          <div className="d-flex align-items-center">
            <span className="text-danger fw-bold me-4 text-capitalize">
              Administrator {user.username}
            </span>
            <CDropdown variant="nav-item">
              <CDropdownToggle className="p-0 border-0 bg-transparent">
                <img
                  src={user.user.avatarUrl ?? "/logo-black-new.png"} // đổi sang avatar admin thật
                  alt="admin avatar"
                  width={40}
                  height={40}
                  className="rounded-circle border"
                />
              </CDropdownToggle>
              <CDropdownMenu placement="bottom-end">
                <CDropdownItem href="#">Profile</CDropdownItem>
                <CDropdownItem onClick={() => setShowConfirm(true)}>
                  Đăng xuất
                </CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          </div>
        </CContainer>
      </CHeader>
      <ConfirmModal
        show={showConfirm}
        title="Xác nhận đăng xuất"
        message="Bạn có chắc chắn muốn đăng xuất không?"
        onClose={() => setShowConfirm(false)}
        onConfirm={handleLogout}
      />
      <MyToast
        message={errorMessage}
        onClose={() => setLogoutError(false)}
        show={logoutError}
      />
    </>
  );
};

export default AppHeader;

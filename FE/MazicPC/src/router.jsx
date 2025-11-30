import { Route, Routes } from "react-router-dom";
import ROUTERS from "./utils/router";
import MasterLayout from "./pages/user/themes/masterLayout";
import GioiThieuCongTy from "./pages/user/static/gioi-thieu-cong-ty";
import ChinhSachBaoHanhBaoTri from "./pages/user/static/chinh-sach-bao-hanh-bao-tri";
import ChinhSachBaoMatThongTin from "./pages/user/static/chinh-sach-bao-mat-thong-tin";
import ChinhSachChatLuong from "./pages/user/static/chinh-sach-chat-luong";
import ChinhSachDoiTra from "./pages/user/static/chinh-sach-doi-tra";
import ChinhSachVanChuyen from "./pages/user/static/chinh-sach-van-chuyen";
import ChinhSachVeSinhLapTop from "./pages/user/static/chinh-sach-ve-sinh-laptop";
import AuthPage from "./pages/common/authPage";
import NotFoundPage from "./pages/common/notFoundPage";
import DashboardPage from "./pages/admin/dashboard";
import ProtectedRoute from "./utils/ProtectedRoute";
import ForbiddenPage from "./pages/common/forbiddenPage";
import ProductDetail from "./pages/user/ProductDetail";
import HuongDanMuaHang from "./pages/user/static/huong-dan-mua-hang";
import Products from "./pages/user/Products";
import Cart from "./pages/user/Cart";
import CheckOut from "./pages/user/CheckOut";
import Address from "./pages/user/Address";
import Profile from "./pages/user/Profile";
import PaymentSuccess from "./pages/common/paymentSuccessPage/PaymentSuccess";
import Purchase from "./pages/user/Purchase";
import Shop from "./pages/user/static/shop/shop";
import HomePage from "./pages/user/homePage/HomePage";

const RouterCustom = () => {
  const userRouter = [
    /* ---------------- USER ---------------- */
    { path: ROUTERS.USER.HOME, component: <HomePage /> },
    { path: ROUTERS.USER.GIOI_THIEU_CONG_TY, component: <GioiThieuCongTy /> },
    {
      path: ROUTERS.USER.CHINH_SACH_BAO_HANH_BAO_TRI,
      component: <ChinhSachBaoHanhBaoTri />,
    },
    {
      path: ROUTERS.USER.CHINH_SACH_BAO_MAT_THONG_TIN,
      component: <ChinhSachBaoMatThongTin />,
    },
    {
      path: ROUTERS.USER.CHINH_SACH_CHAT_LUONG,
      component: <ChinhSachChatLuong />,
    },
    { path: ROUTERS.USER.CHINH_SACH_DOI_TRA, component: <ChinhSachDoiTra /> },
    {
      path: ROUTERS.USER.CHINH_SACH_VAN_CHUYEN,
      component: <ChinhSachVanChuyen />,
    },
    {
      path: ROUTERS.USER.CHINH_SACH_VE_SINH_LAPTOP,
      component: <ChinhSachVeSinhLapTop />,
    },
    { path: ROUTERS.USER.HUONG_DAN_MUA_HANG, component: <HuongDanMuaHang /> },
    { path: ROUTERS.USER.PRODUCTS, component: <Products /> },
    { path: ROUTERS.USER.PRODUCT_DETAIL, component: <ProductDetail /> },
    {
      path: ROUTERS.USER.CART,
      component: <Cart />,
      private: true,
      allowedRoles: ["user"],
    },
    {
      path: ROUTERS.USER.CHECKOUT,
      component: <CheckOut />,
      private: true,
      allowedRoles: ["user"],
    },
    {
      path: ROUTERS.USER.ADDRESS,
      component: <Address />,
      private: true,
      allowedRoles: ["user"],
    },
    {
      path: ROUTERS.USER.PROFILE,
      component: <Profile />,
      private: true,
      allowedRoles: ["user", "admin"],
      layout: false,
    },
    {
      path: ROUTERS.USER.PURCHASE,
      component: <Purchase />,
      private: true,
      allowedRoles: ["user"],
    },
    {
      path: ROUTERS.USER.SHOP,
      component: <Shop />,
    },

    /* ---------------- COMMON ---------------- */
    { path: ROUTERS.COMMON.AUTH, component: <AuthPage />, layout: false },
    {
      path: ROUTERS.COMMON.FORBIDDEN,
      component: <ForbiddenPage />,
      layout: false,
    },
    {
      path: ROUTERS.COMMON.PAYMENT_SUCCESS,
      component: <PaymentSuccess />,
      layout: false,
    },
    {
      path: ROUTERS.COMMON.NOT_FOUND,
      component: <NotFoundPage />,
      layout: false,
    },

    /* ---------------- ADMIN ---------------- */
    {
      path: ROUTERS.ADMIN.DASHBOARD,
      component: <DashboardPage />,
      private: true,
      allowedRoles: ["admin"],
      layout: false,
    },
  ];

  return (
    <Routes>
      {userRouter.map((item, key) => {
        const useLayout = item.layout ?? true; // mặc định true
        const element = item.private ? (
          <ProtectedRoute
            component={item.component}
            allowedRoles={item.allowedRoles}
          />
        ) : (
          item.component
        );

        return (
          <Route
            key={key}
            path={item.path}
            element={
              useLayout ? <MasterLayout>{element}</MasterLayout> : element
            }
          />
        );
      })}
    </Routes>
  );
};

export default RouterCustom;

import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/user/homePage";
import ROUTERS from "./utils/router";
import MasterLayout from "./pages/user/themes/masterLayout";
import GioiThieuCongTy from "./pages/user/static/gioi-thieu-cong-ty";
import ChinhSachBaoHanhBaoTri from "./pages/user/static/chinh-sach-bao-hanh-bao-tri";
import ChinhSachBaoMatThongTin from "./pages/user/static/chinh-sach-bao-mat-thong-tin";
import ChinhSachChatLuong from "./pages/user/static/chinh-sach-chat-luong";
import ChinhSachDoiTra from "./pages/user/static/chinh-sach-doi-tra";
import ChinhSachVanChuyen from "./pages/user/static/chinh-sach-van-chuyen";
import ChinhSachVeSinhLapTop from "./pages/user/static/chinh-sach-ve-sinh-laptop";

const RouterCustom = () => {
  const userRouter = [
    {
      path: ROUTERS.USER.HOME,
      component: <HomePage />,
    },
    {
      path: ROUTERS.USER.GIOI_THIEU_CONG_TY,
      component: <GioiThieuCongTy />,
    },
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
    {
      path: ROUTERS.USER.CHINH_SACH_DOI_TRA,
      component: <ChinhSachDoiTra />,
    },
    {
      path: ROUTERS.USER.CHINH_SACH_VAN_CHUYEN,
      component: <ChinhSachVanChuyen />,
    },
    {
      path: ROUTERS.USER.CHINH_SACH_VE_SINH_LAPTOP,
      component: <ChinhSachVeSinhLapTop />,
    },
  ];

  return (
    <Routes>
      {userRouter.map((item, key) => (
        <Route
          key={key}
          path={item.path}
          element={<MasterLayout>{item.component}</MasterLayout>}
        />
      ))}
    </Routes>
  );
};

export default RouterCustom;

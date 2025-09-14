import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/user/homePage";
import ROUTERS from "./utils/router";
import MasterLayout from "./pages/user/themes/masterLayout";

const RouterCustom = () => {
  const userRouter = [
    {
      path: ROUTERS.USER.HOME,
      component: <HomePage />,
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

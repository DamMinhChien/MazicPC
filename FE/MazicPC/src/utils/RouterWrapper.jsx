
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../apis/authService";
import RouterCustom from "../router";
import ROUTERS from "./router"; 

const RouterWrapper = () => {
  //const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = async () => {
      const res = await authService.isLogin();
      console.log("isLogin:", res);
      if (!res) {
        localStorage.removeItem("user");
        //navigate(ROUTERS.USER.HOME, { replace: true });
      }
    };
    checkLogin();
  }, []);

  return <RouterCustom />;
};

export default RouterWrapper;

// App.jsx
import { BrowserRouter, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RouterCustom from "./router";
import { fetchMe } from "./redux/slices/authSlice";
import ROUTERS from "./utils/router";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  console.log("user", user);

  useEffect(() => {
    dispatch(fetchMe()); // kiểm tra login khi mở app
  }, [dispatch]);

  return (
    <BrowserRouter>
      <RouterCustom />
    </BrowserRouter>
  );
}

export default App;

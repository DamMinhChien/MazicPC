import React from "react";
import { useSelector } from "react-redux";
import Account from "../ContentPage/Account";
import Product from "../ContentPage/Product";
import Category from "../ContentPage/Category";
import NotFoundPage from "../../common/notFoundPage";
import Dashboard from "../ContentPage/Dashboard";
import User from "../ContentPage/User";

const AppContent = () => {
  const currentPage = useSelector((state) => state.currentPage.currentPage);
  switch (currentPage) {
    case "dashboard":
      return <Dashboard />;
    case "account":
      return <Account />;
    case "product":
      return <Product />;
    case "category":
      return <Category />;
    case "user":
      return <User />;
    default:
      return <NotFoundPage />;
  }
};

export default AppContent;

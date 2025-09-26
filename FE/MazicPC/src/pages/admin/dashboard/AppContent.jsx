import React from "react";
import { useSelector } from "react-redux";
import Account from "../ContentPage/Account";
import Product from "../ContentPage/Product";
import Category from "../ContentPage/Category";
import NotFoundPage from "../../common/notFoundPage";
import Dashboard from "../ContentPage/Dashboard";

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
    default:
      return <NotFoundPage />;
  }
};

export default AppContent;

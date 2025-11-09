import React from "react";
import { useSelector } from "react-redux";
import Account from "../ContentPage/Account";
import Product from "../ContentPage/Product";
import Category from "../ContentPage/Category";
import NotFoundPage from "../../common/notFoundPage";
import Dashboard from "../ContentPage/Dashboard";
import User from "../ContentPage/User";
import Manufacturer from "../ContentPage/Manufacturer";
import Banner from "../ContentPage/Banner";
import ProductImage from "../ContentPage/ProductImage";
import ProductPromotion from "../ContentPage/ProductPromotion";
import ManufacturerPromotion from "../ContentPage/ManufacturerPromotion";
import CategoryPromotion from "../ContentPage/CategoryPromotion";
import GlobalPromotion from "../ContentPage/GlobalPromotion";
import Coupon from "../ContentPage/Coupon";
import ShippingMethod from "../ContentPage/ShippingMethod";

const AppContent = () => {
  const currentPage = useSelector((state) => state.currentPage.currentPage);
  switch (currentPage) {
    case "dashboard":
      return <Dashboard />;
    case "account":
      return <Account />;
    case "product":
      return <Product />;
    case "productImage":
      return <ProductImage />;
    case "category":
      return <Category />;
    case "user":
      return <User />;
    case "manufacturer":
      return <Manufacturer />;
    case "banner":
      return <Banner />;
    case "product-promotion":
      return <ProductPromotion />;
    case "category-promotion":
      return <CategoryPromotion />;
    case "manufacturer-promotion":
      return <ManufacturerPromotion />;
    case "global-promotion":
      return <GlobalPromotion />;
    case "coupon":
      return <Coupon />;
    case "shipping-method":
      return <ShippingMethod />;

    default:
      return <NotFoundPage />;
  }
};

export default AppContent;

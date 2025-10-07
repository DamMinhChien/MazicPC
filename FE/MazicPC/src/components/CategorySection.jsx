import { useState } from "react";
import ProductSectionHeader from "./ProductSectionHeader";
import MySlider from "../pages/user/components/MySlider";

const CategorySection = ({ categories, products }) => {
  const [maxItem] = useState(20);
  return (
    <div className="my-5">
      <ProductSectionHeader title={categories.name} />
      {/* <ProductList products={products} maxItem={maxItem}/> */}
      <MySlider products={products} maxItem={maxItem}/>
    </div>
  );
};

export default CategorySection;

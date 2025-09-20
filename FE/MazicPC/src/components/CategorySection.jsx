import ProductList from "./ProductList";
import ProductSectionHeader from "./ProductSectionHeader";

const CategorySection = ({ categories, products }) => {
  return (
    <div className="my-5">
      <ProductSectionHeader title={categories.name} />
      <ProductList products={products} />
    </div>
  );
};

export default CategorySection;

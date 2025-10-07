import { useBootstrapBreakpoints } from "react-bootstrap/esm/ThemeProvider";
import ProductCard from "./MyCard";

const ProductList = ({ products }) => {
  const breakpoints = useBootstrapBreakpoints();
  let visibleCount = products.length;
  if (breakpoints.lg) { 
    visibleCount = 6;
  } else if (breakpoints.md) {
    visibleCount = 3;
  } else if (breakpoints.sm) {
    visibleCount = 2;
  }
  return (
    <div className="d-flex p-4">
      {products.slice(0, visibleCount).map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
};

export default ProductList;

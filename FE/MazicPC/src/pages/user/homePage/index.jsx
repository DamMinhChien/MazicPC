import { Container } from "react-bootstrap";
import BannerCarousel from "../../../components/BannerCarousel";
import ShowRoom from "../../../components/ShowRoom";
import CategorySection from "../../../components/CategorySection";
import { useEffect, useState } from "react";
import categoryServices from "../../../apis/categoryService";

const HomePage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await categoryServices.getCategoriesWithProducts();
        setCategories(res);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      }
    };
    fetchData();
  }, []);

  return (
    <main>
      <Container>
        <BannerCarousel />
        <ShowRoom />
        <Container fluid>
          {categories.map((cat) => (
            <CategorySection
              key={cat.id}
              categories={cat}
              products={cat.products}
            />
          ))}
        </Container>
      </Container>
    </main>
  );
};

export default HomePage;

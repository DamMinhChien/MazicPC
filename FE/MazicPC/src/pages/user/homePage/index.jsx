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
        setCategories(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      }
    };
    fetchData();
  }, []);

  // const categoriesData = [
  //   {
  //     id: 1,
  //     name: "Học tập - Văn phòng",
  //     products: [
  //       { id: 101, name: "Laptop A", price: "10 triệu" },
  //       { id: 102, name: "Laptop B", price: "15 triệu" },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     name: "Gaming",
  //     products: [
  //       { id: 201, name: "Laptop Gaming X", price: "20 triệu" },
  //       { id: 202, name: "Laptop Gaming Y", price: "25 triệu" },
  //     ],
  //   },
  // ];
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

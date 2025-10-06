import { Col, Container, Row } from "react-bootstrap";
import BannerCarousel from "../../../components/BannerCarousel";
import ShowRoom from "../../../components/ShowRoom";
import CategorySection from "../../../components/CategorySection";
import { useEffect, useState } from "react";
import categoryServices from "../../../apis/categoryService";
import MyToast from "@components/MyToast";
import MyFullSpinner from "@components/MyFullSpinner";
import bannerServices from "@apis/bannerService";
import { Link } from "react-router-dom";
import ROUTERS from "../../../utils/router";
import ManufacturersSection from "../components/ManufacturersSection";
import manufacturerServices from "../../../apis/manufacturerService";

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [banners, setBanners] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await categoryServices.getCategoriesWithProducts();
        console.log("Home",res);
        
        setCategories(res);
      } catch (err) {
        setError(err.message || "Có lỗi xảy ra khi tải product");
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    const fetchBanners = async () => {
      try {
        setLoading(true);
        const res = await bannerServices.getBannersWithProduct();
        setBanners(res);
      } catch (error) {
      let errMsg = "Đã xảy ra lỗi không xác định";

      if (error.response) {
        const data = error.response.data;

        if (typeof data === "string") {
          errMsg = data;
        } else if (Array.isArray(data)) {
          errMsg = data.map((e) => e.message || JSON.stringify(e)).join(", ");
        } else if (typeof data === "object" && data !== null) {
          errMsg = data.message || JSON.stringify(data);
        } else {
          errMsg = String(data);
        }
      } else {
        errMsg = error.message;
      }

      setError(errMsg);
      } finally {
        setLoading(false);
      }
    };

    const fetchManufacturer = async () => {
      try {
        setLoading(true);
        const res = await manufacturerServices.getManufacturers();
        setManufacturers(res);
      } catch (error) {
      let errMsg = "Đã xảy ra lỗi không xác định";

      if (error.response) {
        const data = error.response.data;

        if (typeof data === "string") {
          errMsg = data;
        } else if (Array.isArray(data)) {
          errMsg = data.map((e) => e.message || JSON.stringify(e)).join(", ");
        } else if (typeof data === "object" && data !== null) {
          errMsg = data.message || JSON.stringify(data);
        } else {
          errMsg = String(data);
        }
      } else {
        errMsg = error.message;
      }

      setError(errMsg);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
    fetchBanners();
    fetchManufacturer();
    
  }, []);

  return (
    <main>
      <Container>
        <Row className="align-items-stretch">
          <Col md={8} className="p-0">
            <BannerCarousel banners={banners} />
          </Col>
          <Col md={4} className="d-none d-md-flex flex-column p-0">
            <Link to={ROUTERS.USER.HUONG_DAN_MUA_HANG}>
              <img
                src="/img_carousel_1.jpg"
                alt="img_carousel_1"
                className="w-100"
              />
            </Link>
            <Link to={ROUTERS.USER.HUONG_DAN_MUA_HANG}>
              <img
                src="/img_carousel_2.jpg"
                alt="img_carousel_2"
                className="w-100"
              />
            </Link>
          </Col>
        </Row>

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

        <ManufacturersSection manufacturers={manufacturers}/>
      </Container>

      <MyToast
        title="Lỗi"
        bg="danger"
        show={!!error}
        message={error}
        onClose={() => setError("")}
      />
      <MyToast
        title="Thành công"
        bg="success"
        show={!!success}
        message={success}
        onClose={() => setSuccess("")}
      />

      <MyFullSpinner show={loading} />
    </main>
  );
};

export default HomePage;

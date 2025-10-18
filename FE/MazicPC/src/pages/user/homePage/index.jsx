import { Col, Container, Row, Stack } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
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
import HeroSection from "../static/HeroSection";
import TextHeader from "../components/textHeader";
import statsService from "../../../apis/statsService";
import TestimonialCard from "../components/TestimonialCard";
import PurchaseSteps from "../components/PurchaseSteps";
import GoogleMapEmbed from "../components/GoogleMapEmbed";

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
        console.log("Home", res);

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

  const { data = {} } = useQuery({
    queryKey: ["totals"],
    queryFn: async () => statsService.getTotals(),
  });

  return (
    <main>
      <HeroSection />
      <Container>
        <Row className="align-items-stretch">
          <Col md={8} className="p-0">
            <BannerCarousel banners={banners} />
          </Col>
          <Col md={4} className="d-none d-md-flex flex-column p-0">
            <Link to={ROUTERS.USER.HUONG_DAN_MUA_HANG} className="zoom-fade">
              <img
                src="/img_carousel_1.jpg"
                alt="img_carousel_1"
                className="w-100"
              />
            </Link>
            <Link
              to={ROUTERS.USER.HUONG_DAN_MUA_HANG}
              className="no-underline zoom-fade"
            >
              <img
                src="/img_carousel_2.jpg"
                alt="img_carousel_2"
                className="w-100"
              />
            </Link>
          </Col>
        </Row>

        <Container className="my-3">
          <TextHeader title="Lựa chọn thỏa thích" />
          <Row className="my-5">
            <Col lg={6}>
              <div>
                <h3 className="text-primary">Với đội ngũ chuyên nghiệp...</h3>
                <p className="fs-5">
                  ...Tại MazicPC, chúng tôi mang đến những chiếc laptop chất
                  lượng cao, cấu hình mạnh mẽ, phục vụ nhu cầu học tập, làm việc
                  và giải trí. Mỗi sản phẩm được chọn lọc kỹ lưỡng từ các thương
                  hiệu uy tín, đảm bảo hiệu năng, độ bền và trải nghiệm tốt nhất
                  cho bạn. MazicPC đồng hành cùng bạn trên mọi hành trình công
                  nghệ, nâng tầm hiệu quả công việc và giải trí.
                </p>
              </div>
              <div className="d-flex justify-content-around">
                <div className="d-flex flex-column flex-nowrap align-items-center">
                  <h1>{data.productCount}</h1>
                  <p>Sản phẩm</p>
                </div>
                <div className="d-flex flex-column flex-nowrap  align-items-center">
                  <h1>{data.categoryCount}</h1>
                  <p>Danh mục</p>
                </div>
                <div className="d-flex flex-column flex-nowrap  align-items-center">
                  <h1>{data.manufacturerCount}</h1>
                  <p>Nhầ phân phối</p>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="zoom-fade">
                <img src="/repair.jpeg" alt="repair" className="w-100" />
              </div>
            </Col>
          </Row>
        </Container>

        {/* ----------------------------------Show Room------------------------------------ */}
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

        <Container>
          <TextHeader title="Cùng xem các Reviewer hàng đầu nói gì về chúng tôi" />
          <TestimonialCard
            image="/duongde.webp"
            name="Reviewer Dương Dê"
            role="Top 10 reviewer Việt Nam"
            link="https://www.youtube.com/@duongde_official"
            quote="MazicPC là địa chỉ yên tâm tuyệt đối của mình mỗi khi cần giới thiệu anh chị em bạn bè người thân mua laptop. Máy tốt, giá tốt, cảm giác yên tâm! "
            imagePosition="left"
          />
          <TestimonialCard
            image="/adminkha.webp"
            name="Reviewer Admin Kha"
            role="Admin Kha Channel"
            link="https://www.youtube.com/@AdminKha"
            quote="Từ lần đầu mua laptop ở MazicPC, mình đã ưng ngay vì cách các bạn hỗ trợ quá tận tình. Cảm giác mua hàng mà được quan tâm như người quen, nên giờ không chỉ mình mà người thân, bạn bè cũng toàn mua ở đây!"
            imagePosition="right"
          />
          <TestimonialCard
            image="/vuive.jpg"
            name="Reviewer Người Chơi Đồ"
            role="Admin Kha Channel"
            link="https://www.youtube.com/@NguoiChoiDoo"
            quote="Mua Laptop để an tâm nhất thì anh em cứ ghé MazicPC để có những chiếc máy vừa chơi vừa học với giá hợp lí nhất, chắc chắn sẽ không khiến bạn thất vọng!"
            imagePosition="left"
          />
        </Container>

        <PurchaseSteps />

        <ManufacturersSection manufacturers={manufacturers} />
      </Container>

      <section>
          <TextHeader title="Ghé thăm chúng tôi" />
          <GoogleMapEmbed />
        </section>

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

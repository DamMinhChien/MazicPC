import { Link, useNavigate, useParams } from "react-router-dom";
import MyBreadcrumb from "../../components/MyBreadcrumb";
import {
  Badge,
  Button,
  Card,
  Col,
  FormControl,
  InputGroup,
  ListGroup,
  Row,
} from "react-bootstrap";
import productServices from "../../apis/productService";
import My3DSlider from "./components/My3DSlider";
import { BsPatchCheckFill, BsShieldCheck, BsTruck } from "react-icons/bs";
import { MdError } from "react-icons/md";
import { formatCurrency } from "../../utils/helper";
import {
  FaBolt,
  FaFacebook,
  FaGift,
  FaShoppingCart,
  FaYoutube,
  FaPlus,
  FaMinus,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import MyToast from "../../components/MyToast";
import MyFullSpinner from "../../components/MyFullSpinner";
import FlashSaleBanner from "../user/components/FlashSaleBanner";
import ROUTERS from "../../utils/router";
import ProductTabs from "./components/ProductTabs";
import MySlider from "./components/MySlider";
import { useDispatch, useSelector } from "react-redux";
import ConfirmModal from "../../components/ConfirmModal";
import { addToCart, fetchCart } from "../../redux/slices/cartSlice";

const ProductDetail = () => {
  const promotions = [
    {
      id: 1,
      text: "Gift Code 500,000đ - Back To School 2025 with Acer Khuyến mại mùa tựu trường",
    },
    {
      id: 2,
      text: "Tặng ngay 1 x Lót chuột DareU ESP108 Black TLX_450×400×5mm trị giá 180.000đ",
    },
    {
      id: 3,
      text: "Tặng ngay 1 x Giá đỡ Laptop 16in AA trị giá 129.000đ",
    },
  ];

  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);

  const [products, setProducts] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [maxItem] = useState(20);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await productServices.getProducts();
        console.log("product:", res);

        setProducts(res);
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
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await productServices.getDetailProduct(id);
        setProduct(res);

        let updatedImages = Array.isArray(res.images) ? [...res.images] : [];

        if (res.imageUrl) {
          updatedImages.unshift({
            imageUrl: res.imageUrl,
            isPrimary: true,
          });
        }

        setImages(updatedImages);
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

    fetchProduct();

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [id]);

  // Add to cart
  const user = useSelector((state) => state.auth.user);
  const [showConfirm, setShowConfirm] = useState(false);

  //const cart = useSelector(state => state.cart.cart)
  const dispatch = useDispatch();

  const handleConfirmAddToCart = () => {
    navigate(ROUTERS.COMMON.AUTH);
  };

  const handleAddToCart = async () => {
    // 1️⃣ Chưa login hoặc không phải role user
    if (!user || user.role.toLowerCase() !== "user") {
      console.log("user: ", user);
      setShowConfirm(true);
      return;
    }

    try {
      setLoading(true);
      // 2️⃣ Gọi API thêm sản phẩm vào giỏ
      await dispatch(
        addToCart({
          productId: Number(id),
          quantity: 1,
        })
      ).unwrap();

      // 3️⃣ Lấy lại giỏ hàng mới nhất
      await dispatch(fetchCart());

      // 4️⃣ Điều hướng sang trang giỏ hàng
      navigate(ROUTERS.USER.CART);
    } catch (err) {
      setError(err.message || "Thêm vào giỏ hàng thất bại!");
    } finally {
      setLoading(false);
    }
  };

  const handleIncrease = () => {
    if (product.stockQty && quantity < product.stockQty) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <main className="container bg-light p-4">
      <MyBreadcrumb />
      <section>
        <Row className="mt-4">
          <Col md={5}>
            <h3 className="fw-bold">{`${product.name} | ${product.shortDescription}`}</h3>

            <div className="d-flex flex-nowrap gap-2 align-items-center ">
              <strong className="fw-bold text-danger">Tình trạng</strong>
              <Badge className="bg-primary-subtle text-primary p-2">
                Mới 100%
              </Badge>
              <Badge
                className={`p-2 ${
                  product.stockQty > 0
                    ? "bg-success-subtle text-success"
                    : "bg-warning-subtle text-warning"
                }`}
              >
                <span className="me-1">
                  {product.stockQty > 0 ? <BsPatchCheckFill /> : <MdError />}
                </span>
                <span>{product.stockQty > 0 ? "Sẵn hàng" : "Hết hàng"}</span>
              </Badge>
            </div>
            <div className="my-3">
              <My3DSlider images={images} />
            </div>

            <div className="d-flex gap-2 align-items-center justify-content-center">
              <Button
                variant="outline-primary"
                className="d-flex align-items-center gap-2"
                onClick={() =>
                  (window.location.href = "https://www.facebook.com")
                }
              >
                <FaFacebook size={20} />
                <span>Tham gia group khách hàng</span>
              </Button>

              <Button
                variant="outline-danger"
                className="d-flex align-items-center gap-2"
                onClick={() =>
                  (window.location.href = "https://www.youtube.com")
                }
              >
                <FaYoutube size={20} />
                <span>Subscribe kênh MazicPC</span>
              </Button>
            </div>
          </Col>
          <Col md={7}>
            <div>
              <FlashSaleBanner />
              <h3 className="text-danger fw-bold my-3">
                {formatCurrency(product.price)}
              </h3>

              <div className="my-3">
                <div className="d-flex align-items-center gap-3">
                  <span className="fw-semibold text-dark fs-5">Số lượng:</span>

                  <InputGroup
                    className="d-flex align-items-center"
                    style={{ width: "180px" }}
                  >
                    <Button
                      onClick={handleDecrease}
                      size="sm"
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: "38px",
                        height: "38px",
                        backgroundColor: "#ffe3e3",
                        borderColor: "#ffb3b3",
                        color: "#d62828",
                      }}
                      disabled={quantity <= 1}
                    >
                      <FaMinus />
                    </Button>

                    <FormControl
                      value={quantity}
                      readOnly
                      className="text-center fw-bold border-2 border-dark-subtle rounded-pill"
                      style={{
                        width: "60px",
                        height: "38px",
                        fontSize: "1.1rem",
                        backgroundColor: "transparent",
                      }}
                    />

                    <Button
                      onClick={handleIncrease}
                      size="sm"
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: "38px",
                        height: "38px",
                        backgroundColor: "#d9fdd3",
                        borderColor: "#90ee90",
                        color: "#2d6a4f",
                      }}
                      disabled={
                        product.stockQty && quantity >= product.stockQty
                      }
                    >
                      <FaPlus />
                    </Button>
                  </InputGroup>

                  <small className="text-muted ms-2">
                    (Còn{" "}
                    <strong
                      className={
                        product.stockQty > 0 ? "text-success" : "text-danger"
                      }
                    >
                      {product.stockQty || 0}
                    </strong>{" "}
                    sản phẩm)
                  </small>
                </div>
              </div>

              <Row>
                <Col md={6} className="d-flex">
                  <Card
                    className="shadow-sm flex-fill border border-2 border-danger"
                    style={{ backgroundColor: "#ffecec" }}
                  >
                    <Card.Body>
                      <Card.Title className="text-danger fw-bold d-flex align-items-center mb-3">
                        <FaGift className="me-2" />
                        Quà tặng khuyến mãi
                      </Card.Title>
                      <hr className="border border-1 border-danger opacity-100" />

                      <ListGroup variant="flush">
                        {promotions.map((item) => (
                          <ListGroup.Item
                            key={item.id}
                            className="border-0 ps-0 d-flex align-items-start"
                            style={{ backgroundColor: "transparent" }}
                          >
                            <Badge
                              bg="danger"
                              pill
                              className="me-2 mt-1"
                              style={{ fontSize: "0.8rem" }}
                            >
                              {item.id}
                            </Badge>
                            <span
                              dangerouslySetInnerHTML={{ __html: item.text }}
                              style={{ color: "#000" }}
                            />
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6} className="h-100">
                  <Card
                    className="border-2 border border-success shadow-sm"
                    style={{ backgroundColor: "#e8f9f0" }}
                  >
                    <Card.Body>
                      <Card.Title className="text-success fw-bold d-flex align-items-center mb-3">
                        <FaGift className="me-2" />
                        Quà tặng khuyến mãi
                      </Card.Title>
                      <hr className="border border-1 border-success opacity-100" />

                      <ListGroup variant="flush">
                        <ListGroup.Item
                          className="border-0 ps-0 d-flex align-items-start"
                          style={{ backgroundColor: "transparent" }}
                        >
                          <Badge
                            bg="success"
                            pill
                            className="me-2 mt-1"
                            style={{ fontSize: "0.8rem" }}
                          >
                            1
                          </Badge>
                          <span>Windows bản quyền.</span>
                        </ListGroup.Item>

                        <ListGroup.Item
                          className="border-0 ps-0 d-flex align-items-start"
                          style={{ backgroundColor: "transparent" }}
                        >
                          <Badge
                            bg="success"
                            pill
                            className="me-2 mt-1"
                            style={{ fontSize: "0.8rem" }}
                          >
                            2
                          </Badge>
                          <span>Miễn phí cân màu màn hình công nghệ cao.</span>
                        </ListGroup.Item>

                        <ListGroup.Item
                          className="border-0 ps-0 d-flex align-items-start"
                          style={{ backgroundColor: "transparent" }}
                        >
                          <Badge
                            bg="success"
                            pill
                            className="me-2 mt-1"
                            style={{ fontSize: "0.8rem" }}
                          >
                            3
                          </Badge>
                          <span>Balo thời trang AZ sành điệu.</span>
                        </ListGroup.Item>

                        <ListGroup.Item
                          className="border-0 ps-0 d-flex align-items-start"
                          style={{ backgroundColor: "transparent" }}
                        >
                          <Badge
                            bg="success"
                            pill
                            className="me-2 mt-1"
                            style={{ fontSize: "0.8rem" }}
                          >
                            4
                          </Badge>
                          <span>Chuột không dây & Bàn di cao cấp.</span>
                        </ListGroup.Item>

                        <ListGroup.Item
                          className="border-0 ps-0 d-flex align-items-start"
                          style={{ backgroundColor: "transparent" }}
                        >
                          <Badge
                            bg="success"
                            pill
                            className="me-2 mt-1"
                            style={{ fontSize: "0.8rem" }}
                          >
                            5
                          </Badge>
                          <span>
                            Gói bảo dưỡng, vệ sinh tra keo tản nhiệt{" "}
                            <b>Thermal Grizzly Kryonaut</b> & cài đặt phần mềm
                            miễn phí TRỌN ĐỜI.
                          </span>
                        </ListGroup.Item>

                        <ListGroup.Item
                          className="border-0 ps-0 d-flex align-items-start"
                          style={{ backgroundColor: "transparent" }}
                        >
                          <Badge
                            bg="success"
                            pill
                            className="me-2 mt-1"
                            style={{ fontSize: "0.8rem" }}
                          >
                            6
                          </Badge>
                          <span>
                            Voucher giảm giá cho lần mua hàng tiếp theo.
                          </span>
                        </ListGroup.Item>
                      </ListGroup>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              <div className="d-flex justify-content-center">
                <Row className="text-primary fw-semibold my-3 gx-4">
                  <Col xs="auto" className="d-flex align-items-center">
                    <BsShieldCheck className="me-2" size={20} />
                    <Link
                      to={ROUTERS.USER.CHINH_SACH_BAO_HANH_BAO_TRI}
                      className="text-decoration-none text-primary"
                    >
                      Bảo hành toàn diện
                    </Link>
                  </Col>

                  <Col xs="auto" className="d-flex align-items-center">
                    <BsTruck className="me-2" size={20} />
                    <Link
                      to={ROUTERS.USER.CHINH_SACH_VAN_CHUYEN}
                      className="text-decoration-none text-primary"
                    >
                      Giao hàng toàn quốc
                    </Link>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </section>

      <section className="my-5">
        <ProductTabs product={product} />
      </section>

      <section className="my-5">
        <div className="p-4 shadow-lg rounded-3">
          <div className="fw-bold fs-4 text-primary">Có thể bạn sẽ thích</div>
          <MySlider products={products} maxItem={maxItem} />
        </div>
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

      <ConfirmModal
        show={showConfirm}
        title={"Thông báo"}
        message={
          "Bạn chưa đăng nhập, đăng nhập ngay để trải nghiệm tính năng này !"
        }
        onClose={() => {
          setShowConfirm(false);
        }}
        onConfirm={handleConfirmAddToCart}
      />
    </main>
  );
};

export default ProductDetail;

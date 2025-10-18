import { Container } from "react-bootstrap";
import heroImg from "/hero-section.jpg";

const HeroSection = () => {
  return (
    <section
      style={{
        position: "relative",
        height: "400px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "white",
        backgroundImage: `url(${heroImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="mb-3"
    >
      {/* Overlay làm mờ nền */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)", // nền đen mờ 50%
          zIndex: 1,
        }}
      />

      {/* Nội dung chữ */}
      <Container
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1 style={{ fontSize: "5rem" }}>Chào mừng đến với MazicPC</h1>
        <p style={{ fontSize: "1.5rem", marginTop: "20px" }}>
          MazicPC – Đưa công nghệ vào từng khoảnh khắc !
        </p>
        <p style={{ fontSize: "1.5rem", marginTop: "5px" }}>
          MazicPC đồng hành cùng bạn trên mọi hành trình công nghệ
        </p>
      </Container>
    </section>
  );
};

export default HeroSection;

import { Card, Row, Col, Image } from "react-bootstrap";
import { FaQuoteLeft } from "react-icons/fa";

const TestimonialCard = ({
  image,
  name,
  role,
  quote,
  imagePosition = "left",
  link, // 👈 link khi click ảnh
}) => {
  const isImageLeft = imagePosition === "left";

  const handleClick = () => {
    if (link) window.open(link, "_blank");
  };

  return (
    <>
      <Card className="p-4 shadow-sm testimonial-card border-0 rounded-4 my-3">
        <Row
          className={`align-items-center g-4 ${
            !isImageLeft ? "flex-row-reverse" : ""
          }`}
        >
          {/* Ảnh */}
          <Col md={4} className="text-center">
            <div
              className="testimonial-avatar-wrapper mx-auto"
              onClick={handleClick}
              style={{ cursor: link ? "pointer" : "default" }}
            >
              <Image
                src={image}
                alt={name}
                roundedCircle
                fluid
                className="testimonial-avatar"
              />
            </div>
          </Col>

          {/* Nội dung */}
          <Col md={8}>
            <h4 className="fw-bold mb-3">{name}</h4>

            <div className="testimonial-quote-box p-4">
              <div className="d-flex align-items-start mb-3">
                <div className="testimonial-quote-icon me-3">
                  <FaQuoteLeft size={20} />
                </div>
                <p className="fst-italic mb-0">{quote}</p>
              </div>

              <div className="d-flex align-items-center mt-3">
                <Image
                  src={image}
                  alt={name}
                  roundedCircle
                  width={35}
                  height={35}
                  className="me-2"
                />
                <span className="fw-semibold">{name}</span>
                <span className="text-muted ms-2">• {role}</span>
              </div>
            </div>
          </Col>
        </Row>
      </Card>

      {/* CSS nội tuyến */}
      <style jsx>{`
        .testimonial-card {
          background-color: #fff;
          border-radius: 12px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .testimonial-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }

        .testimonial-avatar-wrapper {
          display: inline-block;
          overflow: hidden;
          border-radius: 50%;
          transition: transform 0.5s ease, opacity 0.5s ease;
        }

        .testimonial-avatar-wrapper:hover {
          transform: scale(1.05);
          opacity: 0.9;
        }

        .testimonial-avatar {
          width: 220px;
          height: 220px;
          object-fit: cover;
        }

        .testimonial-quote-box {
          background: #f9f9f9;
          border-radius: 10px;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
          position: relative;
          transition: background 0.3s ease;
        }

        .testimonial-quote-icon {
          color: #d36a5e;
          background: #f4e2de;
          padding: 8px;
          border-radius: 6px;
        }

        @media (max-width: 768px) {
          .testimonial-avatar {
            width: 180px;
            height: 180px;
          }
        }
      `}</style>
    </>
  );
};

export default TestimonialCard;

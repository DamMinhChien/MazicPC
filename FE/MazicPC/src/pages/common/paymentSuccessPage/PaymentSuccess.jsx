import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";
import ROUTERS from "../../../utils/router";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (countdown === 0) {
      navigate(ROUTERS.USER.PURCHASE, { replace: true });
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, navigate]);

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center min-vh-100 bg-light"
    >
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Card className="shadow-lg border-0 rounded-4 p-4 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="mb-3"
              >
                <FaCheckCircle
                  size={80}
                  className="text-success mb-3"
                  style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))" }}
                />
              </motion.div>

              <h2 className="fw-bold text-dark mb-2">
                Thanh toán thành công 🎉
              </h2>
              <p className="text-muted mb-4">
                Cảm ơn bạn đã mua hàng! Bạn sẽ được chuyển hướng đến{" "}
                <strong>trang đơn mua</strong> trong{" "}
                <span className="text-success fw-semibold">{countdown}s</span>.
              </p>

              <Button 
                variant="success"
                size="lg"
                className="w-100 mb-3"
                onClick={() => navigate(ROUTERS.USER.PURCHASE, { replace: true })}
              >
                Đi tới đơn mua ngay
              </Button>

              <small className="text-secondary">
                Bạn sẽ nhận được email xác nhận đơn hàng trong ít phút nữa.
              </small>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
}

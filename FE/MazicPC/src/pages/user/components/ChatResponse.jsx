import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import chatService from "../../../apis/chatService";
import { Badge, Card } from "react-bootstrap";

const ChatResponse = ({ steps, triggerNextStep, setError }) => {
  const [data, setData] = useState(null);
  const [hasRequested, setHasRequested] = useState(false);
  const userMessage = steps.userMessage?.value;

  const chatMutation = useMutation({
    mutationFn: (message) => chatService(message),
    onSuccess: (data) => {
      setData(data);
      triggerNextStep();
    },
    onError: (error) => {
      setError("Đã có lỗi xảy ra khi gửi tin nhắn " + error.message);
      triggerNextStep();
    },
  });

  useEffect(() => {
  if (userMessage && !hasRequested) {
    setHasRequested(true);
    chatMutation.mutate(userMessage);
  }
}, [userMessage, hasRequested]);

  return (
    <>
      {data && (
        <div>
          <div style={{ fontSize: "14px", marginBottom: "10px" }}>
            {data.message}
          </div>

          {data.products && data.products.length > 0 && (
            <div
              style={{
                display: "flex",
                overflowX: "auto",
                gap: "0.5rem",
                paddingBottom: "0.5rem",
              }}
            >
              {data.products.map((product) => (
                <Card
                  key={product.id}
                  style={{
                    minWidth: "180px",
                    flex: "0 0 auto",
                    display: "flex",
                    flexDirection: "row",
                    padding: "0.5rem",
                    borderRadius: "0.625rem",
                  }}
                >
                  <Card.Img
                    src={product.imageUrl}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                      borderRadius: "0.5rem",
                    }}
                  />

                  <Card.Body
                    style={{
                      padding: "0.25rem 0.5rem",
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <Card.Title
                      style={{
                        fontSize: "0.875rem",
                        marginBottom: "0.25rem",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {product.name}
                    </Card.Title>

                    <Card.Text
                      style={{ fontSize: "0.8125rem", marginBottom: "0.25rem" }}
                    >
                      Giá: {product.price} đ
                    </Card.Text>

                    {product.manufacturer && (
                      <Card.Text
                        style={{
                          fontSize: "0.75rem",
                          color: "#555",
                          marginBottom: "0.25rem",
                        }}
                      >
                        {product.manufacturer}
                      </Card.Text>
                    )}

                    <Badge
                      bg={product.stockQty > 0 ? "success" : "danger"}
                      style={{ fontSize: "0.75rem" }}
                    >
                      {product.stockQty > 0 ? "Còn hàng" : "Hết hàng"}
                    </Badge>
                  </Card.Body>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ChatResponse;

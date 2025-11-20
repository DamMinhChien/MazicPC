import { useSelector } from "react-redux";
import ChatBot from "react-simple-chatbot";
import ChatResponse from "./ChatResponse";
import MyToast from "../../../components/MyToast";
import { useState } from "react";

const Chat = () => {
  const theme = {
    background: "#f5f8fb",
    fontFamily: "Arial",
    headerBgColor: "#1976d2",
    headerFontColor: "#fff",
    headerFontSize: "18px",
    botBubbleColor: "#1976d2",
    botFontColor: "#fff",
    userBubbleColor: "#fff",
    userFontColor: "#4a4a4a",
  };

  const [error, setError] = useState("");

  const steps = [
    {
      id: "1",
      message: "Xin chào! Tôi có thể giúp gì cho bạn?",
      trigger: "userMessage",
    },
    { id: "userMessage", user: true, trigger: "apiResponse" },
    {
      id: "apiResponse",
      component: <ChatResponse setError={setError} />,
      // waitAction: true,
      asMessage: true,
      loading: true,
      waitAction: true,
      trigger: "userMessage",
    },
  ];

  const user = useSelector((state) => state.auth.user);
  const avatarSrc = user?.user?.avatarUrl || "/avatar_placeholder.jpg";

  if (!user) return;

  return (
    <>
      <div className="position-fixed end-0 bottom-0 me-2 mb-2 me-md-3 mb-md-3 me-lg-5 mb-lg-5 z-3">
        <ChatBot
          steps={steps}
          theme={theme}
          floating={true}
          botAvatar="/chatbot.png"
          userAvatar={avatarSrc}
        />
      </div>
      <MyToast
        title="Lỗi"
        bg="danger"
        show={!!error}
        message={error}
        onClose={() => setError("")}
      />
    </>
  );
};

export default Chat;

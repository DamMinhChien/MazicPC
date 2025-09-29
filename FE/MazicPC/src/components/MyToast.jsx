import { Toast, ToastContainer } from "react-bootstrap";

const MyToast = ({
  show,
  onClose,
  message,
  title = "Thông báo",
  bg = "danger",
  delay = 3000,
  position = "top-end", // top-start, top-end, bottom-start, bottom-end
}) => {
  // map position prop sang style fixed
  const positionStyle = {
    position: "fixed",
    zIndex: 9999,
    top: position.includes("top") ? "1rem" : "auto",
    bottom: position.includes("bottom") ? "1rem" : "auto",
    right: position.includes("end") ? "1rem" : "auto",
    left: position.includes("start") ? "1rem" : "auto",
  };

  return (
    <ToastContainer className="p-0" style={positionStyle}>
      <Toast
        show={show}
        onClose={onClose}
        bg={bg}
        autohide
        delay={delay}
        className="shadow text-white"
      >
        <Toast.Header closeButton className={`bg-${bg} text-white`}>
          <strong className="me-auto">{title}</strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default MyToast;

import { Toast, ToastContainer } from "react-bootstrap";

const MyToast = ({
  show,
  onClose,
  message,
  title = "Thông báo",
  bg = "danger",
  delay = 3000,
  position = "top-end",
}) => {
  return (
    <ToastContainer position={position} className="p-3">
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

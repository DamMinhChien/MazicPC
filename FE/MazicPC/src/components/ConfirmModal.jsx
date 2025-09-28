import React from "react";
import { Modal, Button } from "react-bootstrap";

const ConfirmModal = ({ show, title, message, onClose, onConfirm }) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title || "Xác nhận"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message || "Bạn có chắc chắn?"}</Modal.Body> 
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Hủy
        </Button>
        <Button variant="danger" className="text-white" onClick={onConfirm}>
          Xác nhận
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;

import React from "react";
import { Button } from "react-bootstrap";

const ButtonIcon = ({ bg, icon, label, onClick, type = "button" }) => {
  return (
    <Button
      variant={bg}
      className="text-white d-flex align-items-center gap-2"
      onClick={onClick}
      type={type}
    >
      {icon} {label}
    </Button>
  );
};

export default ButtonIcon;

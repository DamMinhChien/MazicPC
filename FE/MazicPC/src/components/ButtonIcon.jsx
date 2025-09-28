import React from "react";
import { Button } from "react-bootstrap";

const ButtonIcon = ({ bg, icon, label, onClick }) => {
  return (
    <Button variant={bg} className="text-white d-flex align-items-center gap-2" onClick={onClick}>
      {icon} {label}
    </Button>
  );
};

export default ButtonIcon;

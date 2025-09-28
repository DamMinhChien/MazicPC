import React, { useMemo } from "react";
import { Spinner } from "react-bootstrap";

const BOOTSTRAP_VARIANTS = [
  "primary",
  "secondary",
  "success",
  "danger",
  "warning",
  "info",
  "light",
  "dark",
];

export default function MyFullSpinner({
  size = 60,
  animation = "border",
  show = true,
}) {
  const variant = useMemo(() => {
    return BOOTSTRAP_VARIANTS[
      Math.floor(Math.random() * BOOTSTRAP_VARIANTS.length)
    ];
  }, []);

  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(255,255,255,0.6)",
        zIndex: 1060,
      }}
    >
      <Spinner
        animation={animation}
        variant={variant}
        role="status"
        style={{ width: size, height: size }}
      />
    </div>
  );
}

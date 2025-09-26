import { CFooter, CLink } from "@coreui/react";
import React from "react";

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <CLink href="https://coreui.io">CoreUI</CLink>
        <span>&copy; 2025 creativeLabs.</span>
      </div>
      <div>
        <span>Powered by</span>
        <CLink href="https://coreui.io">CoreUI</CLink>
      </div>
    </CFooter>
  );
};

export default AppFooter;

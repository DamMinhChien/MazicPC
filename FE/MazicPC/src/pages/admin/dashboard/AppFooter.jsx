import { CFooter, CLink } from "@coreui/react";
import React from "react";

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <CLink href="#">MazicPC</CLink>
        <span className="ms-1">
          <strong>&copy; 2025</strong>
        </span>
      </div>
      <div>
        <span>
          Powered by <strong>CHIENDEEPEYES</strong>
        </span>
      </div>
    </CFooter>
  );
};

export default AppFooter;

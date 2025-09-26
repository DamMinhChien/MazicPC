import {
  CButton,
  CCollapse,
  CContainer,
  CDropdown,
  CDropdownDivider,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CForm,
  CFormInput,
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CHeaderToggler,
  CNavItem,
  CNavLink,
} from "@coreui/react";
import React, { useState } from "react";

const AppHeader = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <CHeader>
        <CContainer fluid>
          <CHeaderBrand href="#">Header</CHeaderBrand>
          <CHeaderToggler onClick={() => setVisible(!visible)} />
          <CCollapse className="header-collapse" visible={visible}>
            <CHeaderNav>
              <CNavItem>
                <CNavLink href="#" active>
                  Home
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink href="#">Link</CNavLink>
              </CNavItem>
              <CDropdown variant="nav-item">
                <CDropdownToggle color="secondary">
                  Dropdown button
                </CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem href="#">Action</CDropdownItem>
                  <CDropdownItem href="#">Another action</CDropdownItem>
                  <CDropdownDivider />
                  <CDropdownItem href="#">Something else here</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
              <CNavItem>
                <CNavLink href="#" disabled>
                  Disabled
                </CNavLink>
              </CNavItem>
            </CHeaderNav>
            <CForm className="d-flex">
              <CFormInput className="me-2" type="search" placeholder="Search" />
              <CButton type="submit" color="success" variant="outline">
                Search
              </CButton>
            </CForm>
          </CCollapse>
        </CContainer>
      </CHeader>
    </>
  );
};

export default AppHeader;

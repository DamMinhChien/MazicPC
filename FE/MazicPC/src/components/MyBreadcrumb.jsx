import { Link, useLocation } from "react-router-dom";
import { Breadcrumb } from "react-bootstrap";
import { FaHome } from "react-icons/fa";

const MyBreadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <Breadcrumb>
      <Breadcrumb.Item
        linkAs={Link}
        linkProps={{ to: "/" }}
        className="d-flex justify-content-center"
      >
        <FaHome className="me-2" size={20}/>
        <strong>Trang chủ</strong>
      </Breadcrumb.Item>

      {pathnames.map((name, index) => {
        const routeTo = "/" + pathnames.slice(0, index + 1).join("/");
        const isLast = index === pathnames.length - 1;

        return isLast ? (
          <Breadcrumb.Item active key={name}>
            {name}
          </Breadcrumb.Item>
        ) : (
          <Breadcrumb.Item key={name} linkAs={Link} linkProps={{ to: routeTo }}>
            {name}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

export default MyBreadcrumb;

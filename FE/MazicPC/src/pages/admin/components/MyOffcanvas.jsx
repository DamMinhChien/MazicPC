import MyForm from "./MyForm";
import { Offcanvas } from "react-bootstrap";

const MyOffcanvas = ({
  show,
  onHide,
  title,
  schema,
  fields,
  defaultValues,
  onSubmit,
  mode,
}) => {
  return (
    <Offcanvas
      style={{ width: "70%", maxWidth: "100vw" }}
      show={show}
      onHide={onHide}
      placement="end"
      scroll={true}
      backdrop={true}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          {mode === "edit" ? "Sửa" : "Thêm mới"} {title}
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <MyForm
          schema={schema}
          defaultValues={defaultValues}
          fields={fields}
          onSubmit={(formData) => {
            onSubmit(formData, mode === "edit" ? defaultValues : null);
            onHide();
          }}
          mode={mode}
        />
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default MyOffcanvas;

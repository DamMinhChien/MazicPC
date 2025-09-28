import { useForm } from "react-hook-form";
import ButtonIcon from "../../../components/ButtonIcon";
import { FaBroom, FaEdit, FaPlus } from "react-icons/fa";
import { Row, Col, Form } from "react-bootstrap";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

const MyForm = ({ schema, defaultValues, fields, onSubmit, mode }) => {
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "all",
  });

  // Focus input đầu tiên khi form render
  useEffect(() => {
    if (fields?.length > 0) {
      setFocus(fields[0].name);
    }
  }, [fields, setFocus]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        {fields.map((field) => {
          //console.log("Field:", field.name, "Type:", field.type);
          return (
            <Col md={6} key={field.name}>
              <Form.Group className="mb-3">
                <Form.Label>{field.label}</Form.Label>
                {field.type === "select" ? (
                  <Form.Select
                    {...register(field.name)}
                    isInvalid={!!errors[field.name]}
                  >
                    <option value="">-- Chọn --</option>
                    {field.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </Form.Select>
                ) : field.type === "checkbox" ? (
                  <Form.Check
                    type="checkbox"
                    label={field.label}
                    {...register(field.name)}
                    isInvalid={!!errors[field.name]}
                  />
                ) : field.type === "switch" ? (
                  <Form.Check
                    type="switch"
                    className="custom-switch-lg"
                    size={"lg"}
                    label={field.label}
                    {...register(field.name)}
                    isInvalid={!!errors[field.name]}
                  />
                ) : field.type === "textarea" ? (
                  <Form.Control
                    as="textarea"
                    rows={3}
                    {...register(field.name)}
                    isInvalid={!!errors[field.name]}
                  />
                ) : (
                  <Form.Control
                    type={field.type || "text"}
                    {...register(field.name)}
                    isInvalid={!!errors[field.name]}
                  />
                )}
                <Form.Control.Feedback type="invalid">
                  {errors[field.name]?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          );
        })}
      </Row>

      <div className="d-flex gap-2 align-items-center justify-content-center mt-5">
        <ButtonIcon
          bg={mode === "edit" ? "warning" : "success"}
          label={mode === "edit" ? "Cập nhật" : "Thêm mới"}
          icon={mode === "edit" ? <FaEdit /> : <FaPlus />}
        />
        <ButtonIcon
          bg="secondary"
          label="Nhập lại"
          onClick={() => reset(defaultValues)}
          icon={<FaBroom />}
        />
      </div>
    </Form>
  );
};

export default MyForm;

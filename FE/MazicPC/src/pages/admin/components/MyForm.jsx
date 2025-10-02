import { useForm } from "react-hook-form";
import ButtonIcon from "../../../components/ButtonIcon";
import { FaBroom, FaEdit, FaPlus } from "react-icons/fa";
import { Row, Col, Form } from "react-bootstrap";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useState } from "react";
import SubmitContext from "@utils/SubmitContext";

const MyForm = ({ schema, defaultValues, fields, mode }) => {
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

  const [preview, setPreview] = useState(null);
  const [options, setOptions] = useState({});

  //const { handleLoadOptions } = useContext(SubmitContext);
  useEffect(() => {
    fields.forEach(async (field) => {
      if (field.type === "select" && field.loadOptions) {
        const opts = await field.loadOptions();
        setOptions((prev) => ({ ...prev, [field.name]: opts }));
      }
    });
  }, []);

  useEffect(() => {
    const fileField = fields.find((f) => f.type === "file")?.name;
    if (
      mode === "edit" &&
      defaultValues &&
      fileField &&
      defaultValues[fileField]
    ) {
      setPreview(defaultValues[fileField]); // URL hiện tại từ DB
    }
  }, [mode, defaultValues, fields]);

  // Focus input đầu tiên khi form render
  useEffect(() => {
    if (fields?.length > 0) {
      setFocus(fields[0].name);
    }
  }, [fields, setFocus]);

  const { handleAdd, handleEdit } = useContext(SubmitContext);

  const onSubmit = (data) => {
    if (mode === "edit") {
      // console.log("Sửa từ MyForm:", data);
      //console.log("DefaultValues:", defaultValues);
      // console.log("fields:", fields);
      // console.log("schema:", Object.keys(schema.shape));
      // Lấy file (nếu có)
      //const fileField = fields.find((f) => f.type === "file")?.name;
      //const file = fileField ? data[fileField]?.[0] : null; // data[fieldName] là FileList
      handleEdit(data);
    } else {
      // Không gửi id khi thêm mới
      const { id, ...rest } = data;
      handleAdd(rest);
      console.log("Thêm từ MyForm:", rest);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {/* Hidden fields */}
      {fields
        .filter((f) => f.type === "hidden")
        .map((field) => (
          <input key={field.name} type="hidden" {...register(field.name)} />
        ))}

      <Row>
        {fields
          .filter((f) => f.type !== "hidden")
          .map((field) => (
            <Col md={6} key={field.name}>
              <Form.Group className="mb-3">
                <Form.Label>{field.label}</Form.Label>
                {field.type === "select" ? (
                  <Form.Select
                    {...register(field.name, {
                      setValueAs: (v) => (v === "" ? null : v),
                    })}
                    isInvalid={!!errors[field.name]}
                  >
                    <option value="">-- Chọn --</option>
                    {(options[field.name] || []).map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </Form.Select>
                ) : field.type === "disabled" ? (
                  <>
                    <Form.Control type="text" {...register(field.name)} />
                  </>
                ) : field.type === "checkbox" ? (
                  <Form.Check
                    type="checkbox"
                    label={field.label}
                    {...register(field.name)}
                    isInvalid={!!errors[field.name]}
                  />
                ) : field.type === "file" ? (
                  <>
                    <Form.Control
                      type="file"
                      {...register(field.name, {
                        onChange: (e) => {
                          const file = e.target.files[0];
                          if (file) {
                            // tạo URL tạm để preview
                            setPreview(URL.createObjectURL(file));
                          } else {
                            setPreview(defaultValues?.[field.name] || null);
                          }
                        }, // chỉ lấy file đầu tiên
                      })}
                      isInvalid={!!errors[field.name]}
                    />
                    {preview && (
                      <img
                        src={preview}
                        alt="Preview"
                        className="img-thumbnail mt-2"
                        width={150}
                      />
                    )}
                  </>
                ) : field.type === "switch" ? (
                  <Form.Check
                    type="switch"
                    className="custom-switch-lg"
                    size="lg"
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
          ))}
      </Row>

      <div className="d-flex gap-2 align-items-center justify-content-center mt-5">
        <ButtonIcon
          type="submit"
          bg={mode === "edit" ? "warning" : "success"}
          label={mode === "edit" ? "Cập nhật" : "Thêm mới"}
          icon={mode === "edit" ? <FaEdit /> : <FaPlus />}
        />
        <ButtonIcon
          bg="secondary"
          label="Nhập lại"
          onClick={() => (mode === "edit" ? reset(defaultValues) : reset())}
          icon={<FaBroom />}
        />
      </div>
    </Form>
  );
};

export default MyForm;

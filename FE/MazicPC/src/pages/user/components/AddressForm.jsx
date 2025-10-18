import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import {
  Form,
  Row,
  Col,
  Button,
  FloatingLabel,
  Spinner,
} from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";

// API helpers
const fetchProvinces = async () => {
  const { data } = await axios.get("https://provinces.open-api.vn/api/p/");
  return data;
};

const fetchDistricts = async () => {
  const { data } = await axios.get("https://provinces.open-api.vn/api/d/");
  return data;
};

const fetchWards = async () => {
  const { data } = await axios.get("https://provinces.open-api.vn/api/w/");
  return data;
};

export default function AddressForm({ data = null, onSubmit }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [filteredWards, setFilteredWards] = useState([]);

  const selectedProvince = watch("province");
  const selectedDistrict = watch("district");

  const user = useSelector(state => state.auth.user)
  const id = user.id
  const phone = user.phone

  // Query: provinces / districts / wards
  const { data: provinces = [], isLoading: loadingProvinces } = useQuery({
    queryKey: ["provinces"],
    queryFn: fetchProvinces,
  });

  const { data: districts = [], isLoading: loadingDistricts } = useQuery({
    queryKey: ["districts"],
    queryFn: fetchDistricts,
  });

  const { data: wards = [], isLoading: loadingWards } = useQuery({
    queryKey: ["wards"],
    queryFn: fetchWards,
  });

  // Lọc quận/huyện theo tỉnh
  useEffect(() => {
    if (selectedProvince) {
      setFilteredDistricts(
        districts.filter((d) => d.province_code === Number(selectedProvince))
      );
      setFilteredWards([]);
    } else {
      setFilteredDistricts([]);
      setFilteredWards([]);
    }
  }, [selectedProvince, districts]);

  // Lọc phường/xã theo quận
  useEffect(() => {
    if (selectedDistrict) {
      setFilteredWards(
        wards.filter((w) => w.district_code === Number(selectedDistrict))
      );
    } else {
      setFilteredWards([]);
    }
  }, [selectedDistrict, wards]);

  // Khi nhận vào data -> reset form để hiện thông tin
  useEffect(() => {
    if (data) {
      reset({
        name: data.name || "",
        province: data.province || "",
        district: data.district || "",
        ward: data.ward || "",
        address: data.address || "",
        phone: data.phone || "",
        note: data.note || "",
      });
    } else {
      reset({
        name: "",
        province: "",
        district: "",
        ward: "",
        address: "",
        phone: "",
        note: "",
      });
    }
  }, [data, reset]);

  const handleFormSubmit = (formData) => {
    const submitData = data
      ? { ...formData, id: data.id, mode: "edit" } // sửa
      : { ...formData, mode: "create" }; // thêm mới
    console.log("Submit:", submitData);
    if (onSubmit) onSubmit(submitData);
  };

  const isLoading = loadingProvinces || loadingDistricts || loadingWards;

  return (
    <Form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="p-4 border rounded bg-light"
    >
      <h3 className="mb-3">
        {data ? "Chỉnh sửa địa chỉ" : "Thêm mới địa chỉ"}
      </h3>

      <FloatingLabel label="Họ và tên *" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Họ và tên"
          {...register("name", { required: "Vui lòng nhập họ và tên" })}
          isInvalid={errors.name}
        />
        <Form.Control.Feedback type="invalid">
          {errors.name?.message}
        </Form.Control.Feedback>
      </FloatingLabel>

      <Row className="g-3">
        <Col md>
          <FloatingLabel label="Tỉnh/Thành phố *">
            <Form.Select
              {...register("province", {
                required: "Vui lòng chọn tỉnh/thành",
              })}
              disabled={isLoading}
              isInvalid={errors.province}
            >
              <option value="">Chọn Tỉnh/Thành phố</option>
              {provinces.map((p) => (
                <option key={p.code} value={p.code}>
                  {p.name}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.province?.message}
            </Form.Control.Feedback>
          </FloatingLabel>
        </Col>

        <Col md>
          <FloatingLabel label="Quận/Huyện *">
            <Form.Select
              {...register("district", {
                required: "Vui lòng chọn quận/huyện",
              })}
              disabled={!filteredDistricts.length}
              isInvalid={errors.district}
            >
              <option value="">Chọn Quận/Huyện</option>
              {filteredDistricts.map((d) => (
                <option key={d.code} value={d.code}>
                  {d.name}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.district?.message}
            </Form.Control.Feedback>
          </FloatingLabel>
        </Col>

        <Col md>
          <FloatingLabel label="Phường/Xã *">
            <Form.Select
              {...register("ward", { required: "Vui lòng chọn phường/xã" })}
              disabled={!filteredWards.length}
              isInvalid={errors.ward}
            >
              <option value="">Chọn Phường/Xã</option>
              {filteredWards.map((w) => (
                <option key={w.code} value={w.code}>
                  {w.name}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.ward?.message}
            </Form.Control.Feedback>
          </FloatingLabel>
        </Col>
      </Row>

      <FloatingLabel label="Địa chỉ cụ thể *" className="my-3">
        <Form.Control
          type="text"
          placeholder="Địa chỉ cụ thể"
          {...register("address", { required: "Vui lòng nhập địa chỉ cụ thể" })}
          isInvalid={errors.address}
        />
        <Form.Control.Feedback type="invalid">
          {errors.address?.message}
        </Form.Control.Feedback>
      </FloatingLabel>

      <FloatingLabel label="Số điện thoại *" className="mb-3">
        <Form.Control
          type="tel"
          placeholder="Số điện thoại"
          {...register("phone", {
            required: "Vui lòng nhập số điện thoại",
            pattern: {
              value: /^(03|05|07|08|09)\d{8}$/,
              message: "Số điện thoại không hợp lệ",
            },
          })}
          isInvalid={errors.phone}
        />
        <Form.Control.Feedback type="invalid">
          {errors.phone?.message}
        </Form.Control.Feedback>
      </FloatingLabel>

      <FloatingLabel label="Ghi chú (tuỳ chọn)" className="mb-3">
        <Form.Control
          as="textarea"
          style={{ height: "80px" }}
          placeholder="Ghi chú"
          {...register("note")}
        />
      </FloatingLabel>

      <div className="text-end">
        <Button variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? (
            <Spinner animation="border" size="sm" />
          ) : data ? (
            "Cập nhật địa chỉ"
          ) : (
            "Lưu địa chỉ"
          )}
        </Button>
      </div>
    </Form>
  );
}

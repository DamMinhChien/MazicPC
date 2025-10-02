import { z } from "zod";

const currentYear = new Date().getFullYear();

const createProductSchema = z.object({
  // File bắt buộc khi tạo
  file: z
    .any()
    .refine((val) => val instanceof FileList, {
      message: "Vui lòng chọn file",
    })
    .refine((val) => val.length > 0, { message: "Vui lòng chọn file" })
    .transform((val) => val[0])
    .refine((f) => f.size < 10 * 1024 * 1024, {
      message: "File phải nhỏ hơn 10MB",
    })
    .refine(
      (f) =>
        ["image/jpeg", "image/png", "image/gif", "image/webp"].includes(f.type),
      { message: "Chỉ được upload ảnh định dạng JPG, PNG, GIF, WEBP" }
    ),

  name: z
    .string({ required_error: "Tên sản phẩm là bắt buộc" })
    .min(1, { message: "Tên sản phẩm không được để trống" }),

  categoryId: z.any().refine((val) => !isNaN(Number(val)), {
    message: "Danh mục không hợp lệ",
  }),

  manufacturerId: z.any().refine((val) => !isNaN(Number(val)), {
    message: "Hãng sản xuất không hợp lệ",
  }),

  price: z.coerce
    .number({ invalid_type_error: "Giá sản phẩm phải là số" })
    .min(0, { message: "Giá sản phẩm không được âm" }),

  stockQty: z.coerce
    .number({ invalid_type_error: "Số lượng tồn kho phải là số" })
    .min(0, { message: "Số lượng tồn kho không hợp lệ" }),

  shortDescription: z
    .string({ invalid_type_error: "Mô tả ngắn phải là chuỗi" })
    .optional(),

  description: z
    .string({ invalid_type_error: "Mô tả chi tiết phải là chuỗi" })
    .optional(),

  warrantyMonths: z.coerce
    .number({ invalid_type_error: "Thời gian bảo hành phải là số" })
    .min(0, { message: "Bảo hành không được nhỏ hơn 0 tháng" })
    .max(120, { message: "Bảo hành tối đa 120 tháng" })
    .optional(),

  imageUrl: z
    .string({ invalid_type_error: "Ảnh đại diện phải là chuỗi" })
    .url({ message: "Ảnh đại diện phải là URL hợp lệ" })
    .optional(),

  // Thông số kỹ thuật
  cpu: z.string({ invalid_type_error: "CPU phải là chuỗi" }).optional(),
  ram: z.string({ invalid_type_error: "RAM phải là chuỗi" }).optional(),
  storage: z
    .string({ invalid_type_error: "Ổ lưu trữ phải là chuỗi" })
    .optional(),
  display: z
    .string({ invalid_type_error: "Màn hình phải là chuỗi" })
    .optional(),
  gpu: z.string({ invalid_type_error: "GPU phải là chuỗi" }).optional(),
  os: z.string({ invalid_type_error: "Hệ điều hành phải là chuỗi" }).optional(),
  keyboard: z
    .string({ invalid_type_error: "Bàn phím phải là chuỗi" })
    .optional(),
  fingerprintReader: z
    .boolean({ invalid_type_error: "Đầu đọc vân tay phải là true/false" })
    .optional(),
  battery: z.string({ invalid_type_error: "Pin phải là chuỗi" }).optional(),
  camera: z.string({ invalid_type_error: "Camera phải là chuỗi" }).optional(),
  ports: z
    .string({ invalid_type_error: "Cổng kết nối phải là chuỗi" })
    .optional(),
  wireless: z
    .string({ invalid_type_error: "Kết nối không dây phải là chuỗi" })
    .optional(),
  dimensions: z
    .string({ invalid_type_error: "Kích thước phải là chuỗi" })
    .optional(),
  weight: z
    .string({ invalid_type_error: "Khối lượng phải là chuỗi" })
    .optional(),
  color: z.string({ invalid_type_error: "Màu sắc phải là chuỗi" }).optional(),
  material: z
    .string({ invalid_type_error: "Chất liệu phải là chuỗi" })
    .optional(),
  condition: z
    .string({ invalid_type_error: "Tình trạng phải là chuỗi" })
    .optional(),
  manufactureYear: z
    .any()
    .refine(
      (val) => {
        if (val === undefined || val === null || val === "") return true;
        const year = Number(val);
        return (
          !isNaN(year) &&
          Number.isInteger(year) &&
          year >= 2000 &&
          year <= currentYear
        );
      },
      { message: `Năm sản xuất phải là số nguyên từ 2000 đến ${currentYear}` }
    )
    .transform((val) =>
      val === undefined || val === null || val === "" ? undefined : Number(val)
    )
    .optional(),
  warrantyInfo: z
    .string({ invalid_type_error: "Thông tin bảo hành phải là chuỗi" })
    .optional(),
  brand: z
    .string({ invalid_type_error: "Thương hiệu phải là chuỗi" })
    .optional(),
  productType: z
    .string({ invalid_type_error: "Loại sản phẩm phải là chuỗi" })
    .optional(),
  origin: z.string({ invalid_type_error: "Xuất xứ phải là chuỗi" }).optional(),
});

const updateProductSchema = z.object({
  // File bắt buộc khi tạo
  id: z.any().refine((val) => !isNaN(Number(val)), {
    message: "Id sản phẩm không hợp lệ",
  }),
  file: z
    .any()
    .refine((val) => val instanceof FileList, {
      message: "Vui lòng chọn file",
    })
    .refine((val) => val.length > 0, { message: "Vui lòng chọn file" })
    .transform((val) => val[0])
    .refine((f) => f.size < 10 * 1024 * 1024, {
      message: "File phải nhỏ hơn 10MB",
    })
    .refine(
      (f) =>
        ["image/jpeg", "image/png", "image/gif", "image/webp"].includes(f.type),
      { message: "Chỉ được upload ảnh định dạng JPG, PNG, GIF, WEBP" }
    ),

  name: z
    .string({ required_error: "Tên sản phẩm là bắt buộc" })
    .min(1, { message: "Tên sản phẩm không được để trống" }),

  categoryId: z.any().refine((val) => !isNaN(Number(val)), {
    message: "Danh mục không hợp lệ",
  }),

  manufacturerId: z.any().refine((val) => !isNaN(Number(val)), {
    message: "Hãng sản xuất không hợp lệ",
  }),

  price: z.coerce
    .number({ invalid_type_error: "Giá sản phẩm phải là số" })
    .min(0, { message: "Giá sản phẩm không được âm" }),

  stockQty: z.coerce
    .number({ invalid_type_error: "Số lượng tồn kho phải là số" })
    .min(0, { message: "Số lượng tồn kho không hợp lệ" }),

  shortDescription: z
    .string({ invalid_type_error: "Mô tả ngắn phải là chuỗi" })
    .optional(),

  description: z
    .string({ invalid_type_error: "Mô tả chi tiết phải là chuỗi" })
    .optional(),

  warrantyMonths: z.coerce
    .number({ invalid_type_error: "Thời gian bảo hành phải là số" })
    .min(0, { message: "Bảo hành không được nhỏ hơn 0 tháng" })
    .max(120, { message: "Bảo hành tối đa 120 tháng" })
    .optional(),

  imageUrl: z
    .string({ invalid_type_error: "Ảnh đại diện phải là chuỗi" })
    .url({ message: "Ảnh đại diện phải là URL hợp lệ" })
    .optional(),

  // Thông số kỹ thuật
  cpu: z.string({ invalid_type_error: "CPU phải là chuỗi" }).optional(),
  ram: z.string({ invalid_type_error: "RAM phải là chuỗi" }).optional(),
  storage: z
    .string({ invalid_type_error: "Ổ lưu trữ phải là chuỗi" })
    .optional(),
  display: z
    .string({ invalid_type_error: "Màn hình phải là chuỗi" })
    .optional(),
  gpu: z.string({ invalid_type_error: "GPU phải là chuỗi" }).optional(),
  os: z.string({ invalid_type_error: "Hệ điều hành phải là chuỗi" }).optional(),
  keyboard: z
    .string({ invalid_type_error: "Bàn phím phải là chuỗi" })
    .optional(),
  fingerprintReader: z
    .boolean({ invalid_type_error: "Đầu đọc vân tay phải là true/false" })
    .optional(),
  battery: z.string({ invalid_type_error: "Pin phải là chuỗi" }).optional(),
  camera: z.string({ invalid_type_error: "Camera phải là chuỗi" }).optional(),
  ports: z
    .string({ invalid_type_error: "Cổng kết nối phải là chuỗi" })
    .optional(),
  wireless: z
    .string({ invalid_type_error: "Kết nối không dây phải là chuỗi" })
    .optional(),
  dimensions: z
    .string({ invalid_type_error: "Kích thước phải là chuỗi" })
    .optional(),
  weight: z
    .string({ invalid_type_error: "Khối lượng phải là chuỗi" })
    .optional(),
  color: z.string({ invalid_type_error: "Màu sắc phải là chuỗi" }).optional(),
  material: z
    .string({ invalid_type_error: "Chất liệu phải là chuỗi" })
    .optional(),
  condition: z
    .string({ invalid_type_error: "Tình trạng phải là chuỗi" })
    .optional(),
  manufactureYear: z
    .any()
    .refine(
      (val) => {
        if (val === undefined || val === null || val === "") return true;
        const year = Number(val);
        return (
          !isNaN(year) &&
          Number.isInteger(year) &&
          year >= 2000 &&
          year <= currentYear
        );
      },
      { message: `Năm sản xuất phải là số nguyên từ 2000 đến ${currentYear}` }
    )
    .transform((val) =>
      val === undefined || val === null || val === "" ? undefined : Number(val)
    )
    .optional(),
  warrantyInfo: z
    .string({ invalid_type_error: "Thông tin bảo hành phải là chuỗi" })
    .optional(),
  brand: z
    .string({ invalid_type_error: "Thương hiệu phải là chuỗi" })
    .optional(),
  productType: z
    .string({ invalid_type_error: "Loại sản phẩm phải là chuỗi" })
    .optional(),
  origin: z.string({ invalid_type_error: "Xuất xứ phải là chuỗi" }).optional(),
});

const productSchema = {
  post: createProductSchema,
  put: updateProductSchema,
};

export default productSchema;

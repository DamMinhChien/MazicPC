import { z } from "zod";

const currentYear = new Date().getFullYear();
const nonEmptyStringOrEmptyToUndefined = (schema) =>
  schema.optional().or(z.literal("").transform(() => undefined));

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

  videoUrl: nonEmptyStringOrEmptyToUndefined(
    z.string({ message: "VideoUrl phải là chuỗi." }).url({
      message: "VideoUrl phải là một đường dẫn URL hợp lệ.",
    })
  ),

  categoryId: z.any().refine((val) => !isNaN(Number(val)), {
    message: "Danh mục không hợp lệ",
  }),

  manufacturerId: z.any().refine((val) => !isNaN(Number(val)), {
    message: "Hãng sản xuất không hợp lệ",
  }),

  price: z.coerce
    .number({ message: "Giá sản phẩm phải là số" })
    .min(0, { message: "Giá sản phẩm không được âm" }),

  stockQty: z.coerce
    .number({ message: "Số lượng tồn kho phải là số" })
    .min(0, { message: "Số lượng tồn kho không hợp lệ" }),

  shortDescription: z
    .string({ message: "Mô tả ngắn phải là chuỗi" })
    .optional(),

  description: z.string({ message: "Mô tả chi tiết phải là chuỗi" }).optional(),

  warrantyMonths: z.coerce
    .number({ message: "Thời gian bảo hành phải là số" })
    .min(0, { message: "Bảo hành không được nhỏ hơn 0 tháng" })
    .max(120, { message: "Bảo hành tối đa 120 tháng" })
    .optional(),

  // Thông số kỹ thuật
  cpu: z.string({ message: "CPU phải là chuỗi" }).optional(),
  ram: z.string({ message: "RAM phải là chuỗi" }).optional(),
  storage: z.string({ message: "Ổ lưu trữ phải là chuỗi" }).optional(),
  display: z.string({ message: "Màn hình phải là chuỗi" }).optional(),
  gpu: z.string({ message: "GPU phải là chuỗi" }).optional(),
  os: z.string({ message: "Hệ điều hành phải là chuỗi" }).optional(),
  keyboard: z.string({ message: "Bàn phím phải là chuỗi" }).optional(),
  fingerprintReader: z
    .boolean({ message: "Đầu đọc vân tay phải là true/false" })
    .optional(),
  battery: z.string({ message: "Pin phải là chuỗi" }).optional(),
  camera: z.string({ message: "Camera phải là chuỗi" }).optional(),
  ports: z.string({ message: "Cổng kết nối phải là chuỗi" }).optional(),
  wireless: z.string({ message: "Kết nối không dây phải là chuỗi" }).optional(),
  dimensions: z.string({ message: "Kích thước phải là chuỗi" }).optional(),
  weight: z.string({ message: "Khối lượng phải là chuỗi" }).optional(),
  color: z.string({ message: "Màu sắc phải là chuỗi" }).optional(),
  material: z.string({ message: "Chất liệu phải là chuỗi" }).optional(),
  condition: z.string({ message: "Tình trạng phải là chuỗi" }).optional(),
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
    .string({ message: "Thông tin bảo hành phải là chuỗi" })
    .optional(),
  brand: z.string({ message: "Thương hiệu phải là chuỗi" }).optional(),
  productType: z.string({ message: "Loại sản phẩm phải là chuỗi" }).optional(),
  origin: z.string({ message: "Xuất xứ phải là chuỗi" }).optional(),
});

const updateProductSchema = z.object({
  // File bắt buộc khi tạo
  id: z.any().refine((val) => !isNaN(Number(val)), {
    message: "Id sản phẩm không hợp lệ",
  }), 
  file: z
    .any()
    .optional() // cho phép không truyền
    .refine((val) => val === undefined || val instanceof FileList, {
      message: "File không hợp lệ",
    })
    .refine(
      (val) => !val || val.length === 0 || val.length > 0, // bỏ check bắt buộc
      { message: "File không hợp lệ" }
    )
    .transform((val) => (val && val.length > 0 ? val[0] : undefined))
    .refine((f) => !f || f.size < 10 * 1024 * 1024, {
      message: "File phải nhỏ hơn 10MB",
    })
    .refine(
      (f) =>
        !f ||
        ["image/jpeg", "image/png", "image/gif", "image/webp"].includes(f.type),
      { message: "Chỉ được upload ảnh định dạng JPG, PNG, GIF, WEBP" }
    ),

  name: z
    .string({ required_error: "Tên sản phẩm là bắt buộc" })
    .min(1, { message: "Tên sản phẩm không được để trống" }),

  videoUrl: nonEmptyStringOrEmptyToUndefined(
    z.string({ message: "LogoUrl phải là chuỗi." }).url({
      message: "LogoUrl phải là một đường dẫn URL hợp lệ.",
    })
  ),

  categoryId: z.any().refine((val) => !isNaN(Number(val)), {
    message: "Danh mục không hợp lệ",
  }),

  manufacturerId: z.any().refine((val) => !isNaN(Number(val)), {
    message: "Hãng sản xuất không hợp lệ",
  }),

  price: z.coerce
    .number({ message: "Giá sản phẩm phải là số" })
    .min(0, { message: "Giá sản phẩm không được âm" }),

  stockQty: z.coerce
    .number({ message: "Số lượng tồn kho phải là số" })
    .min(0, { message: "Số lượng tồn kho không hợp lệ" }),

  shortDescription: z
    .string({ message: "Mô tả ngắn phải là chuỗi" })
    .optional(),

  description: z.string({ message: "Mô tả chi tiết phải là chuỗi" }).optional(),

  warrantyMonths: z.coerce
    .number({ message: "Thời gian bảo hành phải là số" })
    .min(0, { message: "Bảo hành không được nhỏ hơn 0 tháng" })
    .max(120, { message: "Bảo hành tối đa 120 tháng" })
    .optional(),

  // Thông số kỹ thuật
  cpu: z.any().optional(),
  ram: z.any().optional(),
  storage: z.any().optional(),
  display: z.any().optional(),
  gpu: z.any().optional(),
  os: z.any().optional(),
  keyboard: z.any().optional(),
  fingerprintReader: z.boolean().optional(),
  battery: z.any().optional(),
  camera: z.any().optional(),
  ports: z.any().optional(),
  wireless: z.any().optional(),
  dimensions: z.any().optional(),
  weight: z.any().optional(),
  color: z.any().optional(),
  material: z.any().optional(),
  condition: z.any().optional(),
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
  warrantyInfo: z.any().optional(),
  brand: z.any().optional(),
  productType: z.any().optional(),
  origin: z.any().optional(),
});

const productSchema = {
  post: createProductSchema,
  put: updateProductSchema,
};

export default productSchema;

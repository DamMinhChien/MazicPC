import { z } from "zod";

const bannerSchema = {
  put: z.object({
    id: z.any(),
    file: z
      .any()
      .transform((val) => (val instanceof FileList ? val[0] : val))
      .optional()
      .refine((f) => !f || f.size < 10 * 1024 * 1024, {
        message: "File phải nhỏ hơn 10MB",
      })
      .refine(
        (f) =>
          !f ||
          ["image/jpeg", "image/png", "image/gif", "image/webp"].includes(
            f.type
          ),
        { message: "Chỉ được upload ảnh" }
      ),
    title: z
      .string({ message: "Tiêu đề không được để trống" })
      .min(1, "Tiêu đề không được để trống")
      .max(200, "Tiêu đề tối đa 200 ký tự"),

    isActive: z.boolean({ message: "Trạng thái không được để trống" }),

    productId: z
      .any()
      .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
        message: "Sản phẩm không được để trống",
      }),
  }),
  post: z.object({
    id: z.any(),
    file: z
      .any()
      .refine((val) => val instanceof FileList, {
        message: "Vui lòng chọn file",
      }) // phải là FileList
      .refine((val) => val.length > 0, { message: "Vui lòng chọn file" }) // không rỗng
      .transform((val) => val[0]) // lấy file đầu tiên
      .refine((f) => f.size < 10 * 1024 * 1024, {
        message: "File phải nhỏ hơn 10MB",
      })
      .refine(
        (f) =>
          ["image/jpeg", "image/png", "image/gif", "image/webp"].includes(
            f.type
          ),
        { message: "Chỉ được upload ảnh" }
      ),

    title: z
      .string({ message: "Tiêu đề không được để trống" })
      .min(1, "Tiêu đề không được để trống")
      .max(200, "Tiêu đề tối đa 200 ký tự"),

    isActive: z.boolean({ message: "Trạng thái không được để trống" }),

    productId: z
      .any()
      .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
        message: "Sản phẩm không được để trống",
      }),
  }),
};

export default bannerSchema;

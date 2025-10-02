import { z } from "zod";

const productImageSchema = {
  post: z.object({
    id: z.any(),

    productId: z.any().refine((val) => Number(val) > 0, {
      message: "ProductId phải lớn hơn 0",
    }),

    // file ảnh bắt buộc khi thêm mới
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
          ["image/jpeg", "image/png", "image/gif", "image/webp"].includes(
            f.type
          ),
        { message: "Chỉ được upload ảnh" }
      ),

    isPrimary: z.boolean({
      message: "Cần xác định ảnh có phải chính hay không",
    }),
  }),

  put: z.object({
    id: z.any(),

    productId: z.any().refine((val) => Number(val) > 0, {
      message: "ProductId phải lớn hơn 0",
    }),

    // file optional khi update
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

    isPrimary: z.boolean({
      message: "Cần xác định ảnh có phải chính hay không",
    }),
  }),
};

export default productImageSchema;

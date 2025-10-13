import { z } from "zod";

const categorySchema = {
  post: z.object({
    id: z.any(),
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
          ["image/jpeg", "image/png", "image/gif", "image/webp"].includes(
            f.type
          ),
        { message: "Chỉ được upload ảnh định dạng JPG, PNG, GIF, WEBP" }
      ),
    name: z
      .string({ message: "Tên danh mục không được để trống" })
      .min(1, "Tên danh mục không được để trống")
      .max(100, "Tên danh mục không được vượt quá 100 ký tự"),

    slug: z
      .string({ message: "Slug không được để trống" })
      .min(1, "Slug không được để trống")
      .max(100, "Slug không được vượt quá 100 ký tự")
      .regex(/^[a-z0-9-]+$/, "Slug chỉ được chứa chữ thường, số và dấu '-'"),

    parentId: z.any().optional(),
  }),

  put: z.object({
    id: z.any(),
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
          ["image/jpeg", "image/png", "image/gif", "image/webp"].includes(
            f.type
          ),
        { message: "Chỉ được upload ảnh định dạng JPG, PNG, GIF, WEBP" }
      ),
    name: z
      .string({ message: "Tên danh mục không được để trống" })
      .min(1, "Tên danh mục không được để trống")
      .max(100, "Tên danh mục không được vượt quá 100 ký tự"),

    slug: z
      .string({ message: "Slug không được để trống" })
      .min(1, "Slug không được để trống")
      .max(100, "Slug không được vượt quá 100 ký tự")
      .regex(/^[a-z0-9-]+$/, "Slug chỉ được chứa chữ thường, số và dấu '-'"),

    parentId: z.any().optional(),
  }),
};

export default categorySchema;

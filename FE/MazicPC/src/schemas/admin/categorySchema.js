import { z } from "zod";

const categorySchema = {
  post: z.object({
    id: z.any(),

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

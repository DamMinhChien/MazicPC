import { z } from "zod";

const nonEmptyStringOrEmptyToUndefined = (schema) =>
  schema.optional().or(z.literal("").transform(() => undefined));

const manufacturerSchema = {
  post: z.object({
    name: z
      .string({ message: "Tên nhà sản xuất phải là chuỗi." })
      .min(1, { message: "Tên nhà sản xuất không được để trống." })
      .max(100, { message: "Tên nhà sản xuất không được vượt quá 100 ký tự." }),

    slug: z
      .string({ message: "Slug phải là chuỗi." })
      .regex(/^[a-z0-9-]+$/, {
        message: "Slug chỉ được chứa chữ thường, số và dấu gạch ngang.",
      })
      .max(100, { message: "Slug không được vượt quá 100 ký tự." }),

    logoUrl: nonEmptyStringOrEmptyToUndefined(
      z.string({ message: "LogoUrl phải là chuỗi." }).url({
        message: "LogoUrl phải là một đường dẫn URL hợp lệ.",
      })
    ),

    description: nonEmptyStringOrEmptyToUndefined(
      z.string({ message: "Mô tả phải là chuỗi." }).max(500, {
        message: "Mô tả không được vượt quá 500 ký tự.",
      })
    ),

    website: nonEmptyStringOrEmptyToUndefined(
      z.string({ message: "Website phải là chuỗi." }).url({
        message: "Website phải là một đường dẫn URL hợp lệ.",
      })
    ),
  }),

  // PUT: thường cho phép cập nhật từng phần -> các field optional
  put: z.object({
    id: z.number({ message: "ID phải là số." }),
    name: nonEmptyStringOrEmptyToUndefined(
      z
        .string({ message: "Tên nhà sản xuất phải là chuỗi." })
        .min(1, { message: "Tên nhà sản xuất không được để trống." })
        .max(100, {
          message: "Tên nhà sản xuất không được vượt quá 100 ký tự.",
        })
    ),

    slug: nonEmptyStringOrEmptyToUndefined(
      z
        .string({ message: "Slug phải là chuỗi." })
        .regex(/^[a-z0-9-]+$/, {
          message: "Slug chỉ được chứa chữ thường, số và dấu gạch ngang.",
        })
        .max(100, { message: "Slug không được vượt quá 100 ký tự." })
    ),

    logoUrl: nonEmptyStringOrEmptyToUndefined(
      z.string({ message: "LogoUrl phải là chuỗi." }).url({
        message: "LogoUrl phải là một đường dẫn URL hợp lệ.",
      })
    ),

    description: nonEmptyStringOrEmptyToUndefined(
      z.string({ message: "Mô tả phải là chuỗi." }).max(500, {
        message: "Mô tả không được vượt quá 500 ký tự.",
      })
    ),

    website: nonEmptyStringOrEmptyToUndefined(
      z.string({ message: "Website phải là chuỗi." }).url({
        message: "Website phải là một đường dẫn URL hợp lệ.",
      })
    ),
  }),
};
export default manufacturerSchema;

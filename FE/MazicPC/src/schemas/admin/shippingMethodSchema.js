import { z } from "zod";

const nonEmptyStringOrEmptyToUndefined = (schema) =>
  schema.optional().or(z.literal("").transform(() => undefined));

const shippingMethodSchema = {
  post: z.object({
    name: z
      .string({ message: "Tên phương thức giao hàng phải là chuỗi." })
      .min(1, { message: "Tên phương thức giao hàng không được để trống." })
      .max(100, {
        message: "Tên phương thức giao hàng không được vượt quá 100 ký tự.",
      }),

    fee: z.refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Phí giao hàng phải lớn hơn hoặc bằng 0.",
    }),
  }),

  put: z.object({
    id: z.number({ message: "ID phải là số." }),

    name: nonEmptyStringOrEmptyToUndefined(
      z
        .string({ message: "Tên phương thức giao hàng phải là chuỗi." })
        .min(1, { message: "Tên phương thức giao hàng không được để trống." })
        .max(100, {
          message: "Tên phương thức giao hàng không được vượt quá 100 ký tự.",
        })
    ),

    fee: nonEmptyStringOrEmptyToUndefined(
      z.refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
        message: "Phí giao hàng phải lớn hơn hoặc bằng 0.",
      })
    ),
  }),
};

export default shippingMethodSchema;

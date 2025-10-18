import { z } from "zod";

const promotionSchema = {
  post: z
    .object({
      name: z
        .string({ message: "Tên khuyến mãi phải là chuỗi." })
        .min(1, { message: "Tên khuyến mãi không được để trống." }),

      discountType: z
        .string({ message: "Loại giảm giá phải là chuỗi." })
        .refine((t) => t === "percent" || t === "amount", {
          message: "Loại giảm giá phải là 'percent' hoặc 'amount'.",
        }),

      discountValue: z
        .any()
        .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
          message: "Giá trị giảm phải là số và lớn hơn 0.",
        }),

      startDate: z
        .string({ message: "Ngày bắt đầu không hợp lệ." })
        .transform((val) => new Date(val)),

      endDate: z
        .string({ message: "Ngày kết thúc không hợp lệ." })
        .transform((val) => new Date(val)),

      targetId: z.any(),
    })
    .refine((data) => data.endDate > data.startDate, {
      message: "Ngày kết thúc phải sau ngày bắt đầu.",
      path: ["endDate"],
    }),

  put: z
    .object({
      id: z.number({ message: "ID phải là số." }),

      name: z
        .string({ message: "Tên khuyến mãi phải là chuỗi." })
        .min(1, { message: "Tên khuyến mãi không được để trống." })
        .optional(),

      discountType: z
        .string({ message: "Loại giảm giá phải là chuỗi." })
        .refine((t) => t === "percent" || t === "amount", {
          message: "Loại giảm giá phải là 'percent' hoặc 'amount'.",
        })
        .optional(),

      discountValue: z
        .any()
        .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
          message: "Giá trị giảm phải là số và lớn hơn 0.",
        })
        .optional(),

      startDate: z
        .string({ message: "Ngày bắt đầu không hợp lệ." })
        .transform((val) => new Date(val))
        .optional(),

      endDate: z
        .string({ message: "Ngày kết thúc không hợp lệ." })
        .transform((val) => new Date(val))
        .optional(),

      targetId: z.any().nullable().optional(),
    })
    .refine(
      (data) =>
        !(data.startDate && data.endDate) || data.endDate > data.startDate,
      { message: "Ngày kết thúc phải sau ngày bắt đầu.", path: ["endDate"] }
    ),
};

export default promotionSchema;

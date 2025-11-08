import { z } from "zod";

const nonEmptyStringOrEmptyToUndefined = (schema) =>
  schema.optional().or(z.literal("").transform(() => undefined));

const couponSchema = {
  post: z.object({
    code: z
      .string({ message: "Mã giảm giá phải là chuỗi." })
      .min(1, { message: "Mã giảm giá không được để trống." })
      .max(50, { message: "Mã giảm giá không được vượt quá 50 ký tự." }),

    discount: z
      .number({ message: "Giá trị giảm phải là số." })
      .positive({ message: "Giá trị giảm phải lớn hơn 0." }),

    isPercent: z.boolean({ message: "isPercent phải là boolean." }),

    startDate: z
      .date({ invalid_type_error: "Ngày bắt đầu không hợp lệ." })
      .refine(date => !isNaN(date.getTime()), { message: "Ngày bắt đầu không hợp lệ." }),

    endDate: z
      .date({ invalid_type_error: "Ngày kết thúc không hợp lệ." })
      .refine(date => !isNaN(date.getTime()), { message: "Ngày kết thúc không hợp lệ." })
      .refine((endDate, ctx) => {
        const startDate = ctx.parent.startDate;
        return startDate ? endDate > startDate : true;
      }, { message: "Ngày kết thúc phải sau ngày bắt đầu." }),

    quantity: z
      .number({ message: "Số lượng phải là số." })
      .positive({ message: "Số lượng phải lớn hơn 0." })
      .max(10000, { message: "Số lượng không được vượt quá 10,000." }),
  }),

  put: z.object({
    id: z.number({ message: "ID phải là số." }),

    code: nonEmptyStringOrEmptyToUndefined(
      z
        .string({ message: "Mã giảm giá phải là chuỗi." })
        .min(1, { message: "Mã giảm giá không được để trống." })
        .max(50, { message: "Mã giảm giá không được vượt quá 50 ký tự." })
    ),

    discount: nonEmptyStringOrEmptyToUndefined(z.number().positive()),

    isPercent: z.boolean().optional(),

    startDate: nonEmptyStringOrEmptyToUndefined(
      z.date().refine(date => !isNaN(date.getTime()), { message: "Ngày bắt đầu không hợp lệ." })
    ),

    endDate: nonEmptyStringOrEmptyToUndefined(
      z.date()
        .refine(date => !isNaN(date.getTime()), { message: "Ngày kết thúc không hợp lệ." })
    ),

    quantity: nonEmptyStringOrEmptyToUndefined(z.number().positive().max(10000)),
  }),
};

export default couponSchema;

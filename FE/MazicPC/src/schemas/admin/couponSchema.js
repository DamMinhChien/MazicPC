import { z } from "zod";

// Helper: cho phép "" => undefined (dùng cho form edit)
const nonEmptyStringOrEmptyToUndefined = (schema) =>
  schema.optional().or(z.literal("").transform(() => undefined));

// Helper: field ngày (convert string → Date và validate)
const dateField = (label) =>
  z
    .string({ required_error: `${label} không hợp lệ.` })
    .transform((val) => new Date(val))
    .refine((date) => !isNaN(date.getTime()), {
      message: `${label} không hợp lệ.`,
    });

const couponSchema = {
  // ===== Schema khi thêm mới =====
  post: z
    .object({
      code: z
        .string({ message: "Mã giảm giá phải là chuỗi." })
        .min(1, { message: "Mã giảm giá không được để trống." })
        .max(50, { message: "Mã giảm giá không được vượt quá 50 ký tự." }),

      discount: z
        .union([z.string(), z.number()])
        .transform((val) => Number(val))
        .refine((val) => val > 0, { message: "Giá trị giảm phải lớn hơn 0." }),

      isPercent: z.boolean({ message: "isPercent phải là boolean." }),

      startDate: dateField("Ngày bắt đầu"),
      endDate: dateField("Ngày kết thúc"),

      quantity: z
        .union([z.string(), z.number()])
        .transform((val) => Number(val))
        .refine((val) => val > 0 && val <= 10000, {
          message: "Số lượng phải là số dương và không vượt quá 10,000.",
        }),
    })
    // ✅ kiểm tra ngày kết thúc > ngày bắt đầu ở cấp object
    .refine((data) => data.endDate > data.startDate, {
      message: "Ngày kết thúc phải sau ngày bắt đầu.",
      path: ["endDate"],
    }),

  // ===== Schema khi cập nhật =====
  put: z
    .object({
      id: z.number({ message: "ID phải là số." }),

      code: nonEmptyStringOrEmptyToUndefined(
        z
          .string({ message: "Mã giảm giá phải là chuỗi." })
          .min(1, { message: "Mã giảm giá không được để trống." })
          .max(50, { message: "Mã giảm giá không được vượt quá 50 ký tự." })
      ),

      discount: nonEmptyStringOrEmptyToUndefined(
        z
          .union([z.string(), z.number()])
          .transform((val) => Number(val))
          .refine((val) => val > 0, {
            message: "Giá trị giảm phải lớn hơn 0.",
          })
      ),

      isPercent: z.boolean().optional(),

      startDate: nonEmptyStringOrEmptyToUndefined(dateField("Ngày bắt đầu")),
      endDate: nonEmptyStringOrEmptyToUndefined(dateField("Ngày kết thúc")),

      quantity: nonEmptyStringOrEmptyToUndefined(
        z
          .union([z.string(), z.number()])
          .transform((val) => Number(val))
          .refine((val) => val > 0 && val <= 10000, {
            message: "Số lượng phải là số dương và không vượt quá 10,000.",
          })
      ),
    })
    // ✅ kiểm tra logic ngày trong update nếu cả hai có mặt
    .refine(
      (data) =>
        !data.startDate ||
        !data.endDate ||
        new Date(data.endDate) > new Date(data.startDate),
      {
        message: "Ngày kết thúc phải sau ngày bắt đầu.",
        path: ["endDate"],
      }
    ),
};

export default couponSchema;

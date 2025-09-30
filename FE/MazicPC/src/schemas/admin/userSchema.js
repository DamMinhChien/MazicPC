import { z } from "zod";

const userSchema = {
  put: z.object({
    id: z.any(),
    phone: z
      .string({ message: "Số điện thoại phải là chuỗi." })
      .regex(/^\d{10,11}$/, { message: "Số điện thoại phải gồm 10-11 chữ số." })
      .optional()
      .or(z.literal("").transform(() => undefined)),

    address: z
      .string({ message: "Địa chỉ phải là chuỗi." })
      .min(5, { message: "Địa chỉ phải có ít nhất 5 ký tự." })
      .optional()
      .or(z.literal("").transform(() => undefined)),

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

    fullName: z
      .string({ message: "Họ và tên phải là chuỗi." })
      .min(2, { message: "Họ và tên phải có ít nhất 2 ký tự." })
      .max(50, { message: "Họ và tên không được quá 50 ký tự." })
      .regex(/^[a-zA-ZÀ-ỹ\s]+$/, {
        message: "Họ và tên chỉ được chứa chữ cái và khoảng trắng.",
      })
      .optional(),
  }),
};

export default userSchema;

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

    avatarUrl: z
      .string({ message: "AvatarUrl phải là chuỗi." })
      .url({ message: "AvatarUrl phải là đường dẫn URL hợp lệ." })
      .optional()
      .or(z.literal("").transform(() => undefined)),

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

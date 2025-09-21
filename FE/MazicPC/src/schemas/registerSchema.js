import { z } from "zod";

const registerSchema = z.object({
  userName: z
    .string()
    .nonempty("Tên đăng nhập không được để trống.")
    .min(3, "Tên đăng nhập phải có ít nhất 3 ký tự."),

  email: z
    .string()
    .nonempty("Email không được để trống.")
    .email("Email không hợp lệ."),

  password: z
    .string()
    .nonempty("Mật khẩu không được để trống.")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự.")
    .regex(/[^a-zA-Z0-9]/, "Mật khẩu phải chứa ít nhất một ký tự đặc biệt."),

  fullName: z
    .string()
    .nonempty("Họ và tên không được để trống.")
    .min(2, "Họ và tên phải có ít nhất 2 ký tự.")
    .max(50, "Họ và tên không được quá 50 ký tự.")
    .regex(
      /^[a-zA-ZÀ-ỹ\s]+$/,
      "Họ và tên chỉ được chứa chữ cái và khoảng trắng."
    ),
});
export default registerSchema;

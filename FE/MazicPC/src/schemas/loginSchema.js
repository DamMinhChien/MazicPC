import { z } from "zod";

const loginSchema = z.object({
  userName: z
    .string()
    .nonempty("Tên đăng nhập không được để trống.")
    .min(3, "Tên đăng nhập phải có ít nhất 3 ký tự."),

  password: z
    .string()
    .nonempty("Mật khẩu không được để trống.")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự.")
    .regex(/[^a-zA-Z0-9]/, "Mật khẩu phải chứa ít nhất một ký tự đặc biệt."),
});
export default loginSchema;

import { z } from "zod";
import accountServices from "../../apis/accountService";

// Hàm gọi API check username
async function isExistAccount(username) {
  try {
    const res = await accountServices.isExistAccount(username);
    return res;
  } catch (err) {
    console.error("Lỗi khi gọi API check username:", err);
    return true; // Giả sử username khả dụng nếu có lỗi gọi API
  }
}

const accountSchema = z.object({
  username: z
    .string({ message: "Tên đăng nhập phải là chuỗi." })
    .nonempty({ message: "Tên đăng nhập không được để trống." })
    .min(3, { message: "Tên đăng nhập phải có ít nhất 3 ký tự." })
    .refine(async (username) => await isExistAccount(username), {
      message: "Tên đăng nhập đã tồn tại.",
    }),

  email: z
    .string({ message: "Email phải là chuỗi." })
    .nonempty({ message: "Email không được để trống." })
    .email({ message: "Email không hợp lệ." }),

  password: z
    .string({ message: "Mật khẩu phải là chuỗi." })
    .nonempty({ message: "Mật khẩu không được để trống." })
    .min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Mật khẩu phải chứa ít nhất một ký tự đặc biệt.",
    }),

  fullName: z
    .string({ message: "Họ và tên phải là chuỗi." })
    .nonempty({ message: "Họ và tên không được để trống." })
    .min(2, { message: "Họ và tên phải có ít nhất 2 ký tự." })
    .max(50, { message: "Họ và tên không được quá 50 ký tự." })
    .regex(/^[a-zA-ZÀ-ỹ\s]+$/, {
      message: "Họ và tên chỉ được chứa chữ cái và khoảng trắng.",
    }),

  role: z.enum(["user", "admin"], {
    message: "Vai trò không hợp lệ. Chỉ chấp nhận: User, Admin.",
  }),

  isActive: z.boolean({
    message: "Trạng thái hoạt động không hợp lệ.",
  }),
});

export default accountSchema;

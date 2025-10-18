import { z } from "zod";

const nonEmptyStringOrEmptyToUndefined = (schema) =>
  schema.optional().or(z.literal("").transform(() => undefined));

const phoneRegex = /^(0|\+84)[0-9]{9,10}$/;

const shippingAddressSchema = {
  post: z.object({
    fullName: z
      .string({ message: "Họ và tên phải là chuỗi." })
      .min(1, { message: "Họ và tên không được để trống." })
      .max(100, { message: "Họ và tên không được vượt quá 100 ký tự." }),

    phone: z
      .string({ message: "Số điện thoại phải là chuỗi." })
      .min(1, { message: "Số điện thoại không được để trống." })
      .regex(phoneRegex, { message: "Số điện thoại không hợp lệ." }),

    province: z
      .string({ message: "Tỉnh/Thành phố phải là chuỗi." })
      .min(1, { message: "Tỉnh/Thành phố không được để trống." }),

    district: z
      .string({ message: "Quận/Huyện phải là chuỗi." })
      .min(1, { message: "Quận/Huyện không được để trống." }),

    ward: z
      .string({ message: "Phường/Xã phải là chuỗi." })
      .min(1, { message: "Phường/Xã không được để trống." }),

    detailAddress: z
      .string({ message: "Địa chỉ chi tiết phải là chuỗi." })
      .min(1, { message: "Địa chỉ chi tiết không được để trống." }),

    note: nonEmptyStringOrEmptyToUndefined(
      z
        .string({ message: "Ghi chú phải là chuỗi." })
        .max(255, { message: "Ghi chú không được vượt quá 255 ký tự." })
    ),
  }),

  put: z.object({
    id: z.number({ message: "ID phải là số." }),

    fullName: nonEmptyStringOrEmptyToUndefined(
      z
        .string({ message: "Họ và tên phải là chuỗi." })
        .min(1, { message: "Họ và tên không được để trống." })
        .max(100, { message: "Họ và tên không được vượt quá 100 ký tự." })
    ),

    phone: nonEmptyStringOrEmptyToUndefined(
      z
        .string({ message: "Số điện thoại phải là chuỗi." })
        .regex(phoneRegex, { message: "Số điện thoại không hợp lệ." })
    ),

    province: nonEmptyStringOrEmptyToUndefined(
      z
        .string({ message: "Tỉnh/Thành phố phải là chuỗi." })
        .min(1, { message: "Tỉnh/Thành phố không được để trống." })
    ),

    district: nonEmptyStringOrEmptyToUndefined(
      z
        .string({ message: "Quận/Huyện phải là chuỗi." })
        .min(1, { message: "Quận/Huyện không được để trống." })
    ),

    ward: nonEmptyStringOrEmptyToUndefined(
      z
        .string({ message: "Phường/Xã phải là chuỗi." })
        .min(1, { message: "Phường/Xã không được để trống." })
    ),

    detailAddress: nonEmptyStringOrEmptyToUndefined(
      z
        .string({ message: "Địa chỉ chi tiết phải là chuỗi." })
        .min(1, { message: "Địa chỉ chi tiết không được để trống." })
    ),

    note: nonEmptyStringOrEmptyToUndefined(
      z
        .string({ message: "Ghi chú phải là chuỗi." })
        .max(255, { message: "Ghi chú không được vượt quá 255 ký tự." })
    ),
  }),
};

export default shippingAddressSchema;

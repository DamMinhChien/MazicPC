import { z } from "zod";

const orderItemSchema = z.object({
  productId: z
    .number({ message: "Mã sản phẩm phải là số." })
    .int()
    .positive({ message: "Sản phẩm không hợp lệ." }),

  quantity: z
    .number({ message: "Số lượng phải là số." })
    .int()
    .positive({ message: "Số lượng phải lớn hơn 0." }),
});

const orderSchema = {
  post: z.object({
    shippingAddressId: z
      .number({ message: "Địa chỉ nhận hàng là bắt buộc." })
      .int()
      .positive({ message: "Địa chỉ nhận hàng là bắt buộc." }),

    paymentMethod: z
      .string({ message: "Phải chọn phương thức thanh toán." })
      .min(1, { message: "Phải chọn phương thức thanh toán." })
      .refine(
        (method) => ["cod", "momo"].includes(method.toLowerCase()),
        { message: "Phương thức thanh toán không hợp lệ." }
      ),

    orderItems: z
      .array(orderItemSchema, { message: "Đơn hàng phải có ít nhất 1 sản phẩm." })
      .nonempty({ message: "Đơn hàng phải có ít nhất 1 sản phẩm." }),
  }),
};

export default orderSchema;

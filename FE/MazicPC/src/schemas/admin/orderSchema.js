import { z } from "zod";

const orderSchema = {
  put: z.object({
    id: z.any({ message: "ID không hợp lệ hoặc thiếu." }),

    status: z.enum(
      ["Pending", "Confirmed", "Delivering", "Completed", "Cancelled", "Returning", "Returned"],
      {
        message:
          "Trạng thái đơn hàng không hợp lệ. Giá trị hợp lệ gồm: Pending, Confirmed, Delivering, Completed, Cancelled, Returning, Returned.",
      }
    ),
  }),
};

export default orderSchema;

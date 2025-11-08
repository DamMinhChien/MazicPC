import { z } from "zod";

const nonEmptyStringOrEmptyToUndefined = (schema) =>
  schema.optional().or(z.literal("").transform(() => undefined));

const reviewSchema = {
  post: z.object({
    productId: z.any(),

    rating: z
      .number({ message: "Điểm đánh giá phải là số." })
      .min(1, { message: "Điểm đánh giá phải từ 1 đến 5." })
      .max(5, { message: "Điểm đánh giá phải từ 1 đến 5." }),

    comment: nonEmptyStringOrEmptyToUndefined(
      z
        .string({ message: "Bình luận phải là chuỗi." })
        .max(500, { message: "Bình luận không được vượt quá 500 ký tự." })
    ),
  }),

  put: z.object({
    id: z.number({ message: "ID phải là số." }),

    rating: z
      .number({ message: "Điểm đánh giá phải là số." })
      .min(1, { message: "Điểm đánh giá phải từ 1 đến 5." })
      .max(5, { message: "Điểm đánh giá phải từ 1 đến 5." })
      .optional(),

    comment: nonEmptyStringOrEmptyToUndefined(
      z
        .string({ message: "Bình luận phải là chuỗi." })
        .max(500, { message: "Bình luận không được vượt quá 500 ký tự." })
    ),
  }),
};

export default reviewSchema;

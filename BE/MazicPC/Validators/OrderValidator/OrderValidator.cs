using FluentValidation;
using MazicPC.DTOs.OrderDTO;

namespace MazicPC.Validators.OrderValidator
{
    public class OrderValidator : AbstractValidator<OrderDto>
    {
        public OrderValidator()
        {
            RuleFor(x => x.ShippingAddressId)
            .GreaterThan(0)
            .WithMessage("Địa chỉ nhận hàng là bắt buộc.");

            RuleFor(x => x.ShippingMethodId)
                .GreaterThan(0)
                .WithMessage("Phải chọn phương thức giao hàng.");

            RuleFor(x => x.PaymentMethod)
                .NotEmpty()
                .WithMessage("Phải chọn phương thức thanh toán.")
                .Must(BeAValidPaymentMethod)
                .WithMessage("Phương thức thanh toán không hợp lệ.");

            RuleFor(x => x.CouponCode)
                .Must(c => string.IsNullOrWhiteSpace(c) || c.Length >= 3)
                .WithMessage("Mã giảm giá không hợp lệ.");

            RuleFor(x => x.OrderItems)
                .NotEmpty()
                .WithMessage("Đơn hàng phải có ít nhất 1 sản phẩm.");

            RuleForEach(x => x.OrderItems)
                .SetValidator(new OrderItemValidator());
        }

        private bool BeAValidPaymentMethod(string method)
        {
            var validMethods = new[] { "cod", "momo", "vnpay" };
            return validMethods.Contains(method.ToLower());
        }
    }
}

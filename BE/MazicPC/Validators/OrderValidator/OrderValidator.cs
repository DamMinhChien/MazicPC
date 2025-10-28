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

            RuleFor(x => x.PaymentMethod)
            .NotEmpty()
            .WithMessage("Phải chọn phương thức thanh toán")
            .Must(BeAValidPaymentMethod)
            .WithMessage("Phương thức thanh toán không hợp lệ");

            RuleFor(x => x.OrderItems)
            .NotEmpty()
            .WithMessage("Đơn hàng phải có ít nhất 1 sản phẩm");

            RuleForEach(x => x.OrderItems)
                .SetValidator(new OrderItemValidator());
        }

        private bool BeAValidPaymentMethod(string method)
        {
            var validMethods = new[] { "cod", "momo" };
            return validMethods.Contains(method.ToLower());
        }
    }
}

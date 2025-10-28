using FluentValidation;
using MazicPC.DTOs.OrderDTO;

namespace MazicPC.Validators.OrderValidator
{
    public class OrderItemValidator : AbstractValidator<OrderItemDto>
    {
        public OrderItemValidator()
        {
            RuleFor(x => x.ProductId)
                .GreaterThan(0)
                .WithMessage("Sản phẩm không hợp lệ.");

            RuleFor(x => x.Quantity)
                .GreaterThan(0)
                .WithMessage("Số lượng phải lớn hơn 0.");
        }
    }
}

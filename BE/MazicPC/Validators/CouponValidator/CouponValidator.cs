using FluentValidation;
using MazicPC.DTOs.CouponDTO;

namespace MazicPC.Validators.CouponValidator
{
    public class CouponValidator : AbstractValidator<CouponDto>
    {
        public CouponValidator()
        {
            RuleFor(x => x.Code)
            .NotEmpty().WithMessage("Mã giảm giá không được để trống.")
            .MaximumLength(50).WithMessage("Mã giảm giá không được vượt quá 50 ký tự.");

            RuleFor(x => x.Discount)
                .GreaterThan(0).WithMessage("Giá trị giảm phải lớn hơn 0.")
                .LessThanOrEqualTo(x => x.IsPercent ? 100 : 1_000_000)
                .WithMessage("Nếu là phần trăm thì tối đa 100, nếu là số tiền thì tối đa 1,000,000.");

            RuleFor(x => x.StartDate)
                .NotEmpty().WithMessage("Ngày bắt đầu không được để trống.");

            RuleFor(x => x.EndDate)
                .NotEmpty().WithMessage("Ngày kết thúc không được để trống.")
                .GreaterThan(x => x.StartDate).WithMessage("Ngày kết thúc phải sau ngày bắt đầu.");

            RuleFor(x => x.Quantity)
                .GreaterThan(0).WithMessage("Số lượng phải lớn hơn 0.")
                .LessThanOrEqualTo(10000).WithMessage("Số lượng không được vượt quá 10,000.");
        }
    }
}

using FluentValidation;
using MazicPC.DTOs.CouponDTO;

namespace MazicPC.Validators.CouponValidator
{

    public class CouponValidator : AbstractValidator<CouponDto>
    {
        public CouponValidator()
        {
         
            // Validate Mã giảm giá (Code)
        
            RuleFor(x => x.Code)
                // Không được để trống
                .NotEmpty().WithMessage("Mã giảm giá không được để trống.")

                // Giới hạn độ dài tối đa 50 ký tự
                .MaximumLength(50).WithMessage("Mã giảm giá không được vượt quá 50 ký tự.");

            // Validate Giá trị giảm (Discount)
            
            RuleFor(x => x.Discount)
                // Giá trị phải lớn hơn 0
                .GreaterThan(0).WithMessage("Giá trị giảm phải lớn hơn 0.")

                // Tùy theo loại giảm giá:
                // - Nếu IsPercent = true  => giảm theo % tối đa là 100
                // - Nếu IsPercent = false => giảm theo tiền tối đa là 1,000,000
                .LessThanOrEqualTo(x => x.IsPercent ? 100 : 1_000_000)
                .WithMessage("Nếu là phần trăm thì tối đa 100, nếu là số tiền thì tối đa 1,000,000.");

          
            // Validate Ngày bắt đầu (StartDate)
        
            RuleFor(x => x.StartDate)
                // Không được bỏ trống ngày bắt đầu
                .NotEmpty().WithMessage("Ngày bắt đầu không được để trống.");

          
            // Validate Ngày kết thúc (EndDate)
       
            RuleFor(x => x.EndDate)
                // Không được bỏ trống ngày kết thúc
                .NotEmpty().WithMessage("Ngày kết thúc không được để trống.")

                // Ngày kết thúc phải sau ngày bắt đầu
                .GreaterThan(x => x.StartDate)
                .WithMessage("Ngày kết thúc phải sau ngày bắt đầu.");

     
            // Validate Số lượng coupon (Quantity)
     
            RuleFor(x => x.Quantity)
                // Số lượng phải lớn hơn 0
                .GreaterThan(0).WithMessage("Số lượng phải lớn hơn 0.")

                // Không vượt quá 10,000
                .LessThanOrEqualTo(10000)
                .WithMessage("Số lượng không được vượt quá 10,000.");
        }
    }
}

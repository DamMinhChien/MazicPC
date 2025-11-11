using FluentValidation;
using MazicPC.DTOs.OrderDTO;
using MazicPC.Enum;
using System;

namespace MazicPC.Validators.OrderValidator
{
    public class UpdateOrderStatusValidator : AbstractValidator<UpdateOrderStatusDto>
    {
        public UpdateOrderStatusValidator()
        {
            RuleFor(x => x.Status)
            .NotEmpty().WithMessage("Trạng thái không được để trống.")
            .Must(BeAValidStatus).WithMessage($"Trạng thái phải là một trong các giá trị: {string.Join(", ", System.Enum.GetNames(typeof(OrderStatus)))}");
        }
        private bool BeAValidStatus(string status)
        {
            return System.Enum.TryParse<OrderStatus>(status, ignoreCase: true, out _);
        }
    }

    
    }

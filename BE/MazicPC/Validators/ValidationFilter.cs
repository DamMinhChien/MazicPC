using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace MazicPC.Validators
{
    public class ValidationFilter : IAsyncActionFilter
    {
        private readonly IServiceProvider _sp;

        public ValidationFilter(IServiceProvider sp)
        {
            _sp = sp;
        }

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            foreach (var arg in context.ActionArguments.Values)
            {
                if (arg == null) continue;

                var validatorType = typeof(IValidator<>).MakeGenericType(arg.GetType());
                var validator = _sp.GetService(validatorType);
                if (validator == null) continue;

                var method = validatorType.GetMethod("ValidateAsync", new[] { arg.GetType(), typeof(CancellationToken) });
                var resultTask = (Task)method.Invoke(validator, new object[] { arg, CancellationToken.None });
                await resultTask.ConfigureAwait(false);

                var result = (FluentValidation.Results.ValidationResult)
                    resultTask.GetType().GetProperty("Result").GetValue(resultTask);

                if (!result.IsValid)
                {
                    context.Result = new BadRequestObjectResult(result.Errors);
                    return;
                }
            }

            await next();
        }
    }

}

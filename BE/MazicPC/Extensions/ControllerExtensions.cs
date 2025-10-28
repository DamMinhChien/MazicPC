using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace MazicPC.Extensions
{
    public static class ControllerExtensions
    {
        public static int? GetCurrentAccountId(this ControllerBase controller)
        {
            var idStr = controller.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return int.TryParse(idStr, out var id) ? id : null;
        }
    }
}

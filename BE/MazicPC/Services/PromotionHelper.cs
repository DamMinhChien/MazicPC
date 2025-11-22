using MazicPC.Models;
using Microsoft.EntityFrameworkCore;

namespace MazicPC.Services
{
    public class PromotionHelper
    {
        private readonly MazicPcContext _context;

        public PromotionHelper(MazicPcContext context)
        {
            _context = context;
        }

        public async Task<(decimal finalPrice, decimal? discountValue, string? promotionName, DateTime? startDate, DateTime? EndDate)>
            CalculateDiscountAsync(Product product)
        {
            var now = DateTime.Now;

            // Lấy toàn bộ promotions đang hoạt động
            var promotions = await (from p in _context.Promotions
                                    join t in _context.PromotionTargets on p.Id equals t.PromotionId
                                    where p.StartDate <= now && p.EndDate >= now
                                    select new
                                    {
                                        Promotion = p,
                                        t.TargetType,
                                        t.TargetId
                                    }).ToListAsync();

            // Lọc ưu tiên theo: global → category → manufacturer → product
            var matched = promotions.FirstOrDefault(x => x.TargetType == "global")
                        ?? promotions.FirstOrDefault(x => x.TargetType == "category" && x.TargetId == product.CategoryId)
                        ?? promotions.FirstOrDefault(x => x.TargetType == "manufacturer" && x.TargetId == product.ManufacturerId)
                        ?? promotions.FirstOrDefault(x => x.TargetType == "product" && x.TargetId == product.Id);

            if (matched == null)
                return (product.Price, null, null, null, null);

            var promo = matched.Promotion;
            decimal discount = promo.DiscountType.ToLower() == "percent"
                ? product.Price * promo.DiscountValue / 100
                : promo.DiscountValue;

            decimal finalPrice = Math.Max(0, product.Price - discount);

            return (finalPrice, discount, promo.Name,promo.StartDate, promo.EndDate);
        }
    }
}

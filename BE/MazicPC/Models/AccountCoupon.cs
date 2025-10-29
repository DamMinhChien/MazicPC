using System;
using System.Collections.Generic;

namespace MazicPC.Models;

public partial class AccountCoupon
{
    public int Id { get; set; }

    public int AccountId { get; set; }

    public int CouponId { get; set; }

    public DateTime UsedAt { get; set; }

    public virtual Account Account { get; set; } = null!;

    public virtual Coupon Coupon { get; set; } = null!;
}

using System;
using System.Collections.Generic;

namespace MazicPC.Models;

public partial class Coupon
{
    public int Id { get; set; }

    public string Code { get; set; } = null!;

    public decimal Discount { get; set; }

    public bool IsPercent { get; set; }

    public DateTime StartDate { get; set; }

    public DateTime EndDate { get; set; }

    public virtual ICollection<AccountCoupon> AccountCoupons { get; set; } = new List<AccountCoupon>();

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
}

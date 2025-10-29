using System;
using System.Collections.Generic;

namespace MazicPC.Models;

public partial class Order
{
    public int Id { get; set; }

    public int AccountId { get; set; }

    public decimal TotalAmount { get; set; }

    public string Status { get; set; } = null!;

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public int ShippingAddressId { get; set; }

    public int ShippingMethodId { get; set; }

    public int? CouponId { get; set; }

    public virtual Account Account { get; set; } = null!;

    public virtual Coupon? Coupon { get; set; }

    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

    public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();

    public virtual ShippingAddress ShippingAddress { get; set; } = null!;

    public virtual ShippingMethod ShippingMethod { get; set; } = null!;
}

using System;
using System.Collections.Generic;

namespace MazicPC.Models;

public partial class Order
{
    public int Id { get; set; }

    public int AccountId { get; set; }

    public int? ShippingMethodId { get; set; }

    public decimal TotalAmount { get; set; }

    public string Status { get; set; } = null!;

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public virtual Account Account { get; set; } = null!;

    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

    public virtual ICollection<OrderStatusLog> OrderStatusLogs { get; set; } = new List<OrderStatusLog>();

    public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();

    public virtual ShippingMethod? ShippingMethod { get; set; }
}

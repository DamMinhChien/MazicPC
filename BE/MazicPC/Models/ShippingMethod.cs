using System;
using System.Collections.Generic;

namespace MazicPC.Models;

public partial class ShippingMethod
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public decimal Fee { get; set; }

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
}

using System;
using System.Collections.Generic;

namespace MazicPC.Models;

public partial class Payment
{
    public int Id { get; set; }

    public int OrderId { get; set; }

    public string PaymentMethod { get; set; } = null!;

    public string Status { get; set; } = null!;

    public DateTime? PaidAt { get; set; }

    public virtual Order Order { get; set; } = null!;
}

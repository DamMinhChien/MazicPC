using System;
using System.Collections.Generic;

namespace MazicPC.Models;

public partial class OrderStatusLog
{
    public int Id { get; set; }

    public int OrderId { get; set; }

    public string Status { get; set; } = null!;

    public DateTime? CreatedAt { get; set; }

    public virtual Order Order { get; set; } = null!;
}

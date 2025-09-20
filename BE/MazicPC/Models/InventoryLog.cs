using System;
using System.Collections.Generic;

namespace MazicPC.Models;

public partial class InventoryLog
{
    public int Id { get; set; }

    public int ProductId { get; set; }

    public int QuantityChange { get; set; }

    public string? Reason { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual Product Product { get; set; } = null!;
}

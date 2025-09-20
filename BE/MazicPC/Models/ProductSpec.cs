using System;
using System.Collections.Generic;

namespace MazicPC.Models;

public partial class ProductSpec
{
    public int Id { get; set; }

    public int ProductId { get; set; }

    public int SpecId { get; set; }

    public string Value { get; set; } = null!;

    public virtual Product Product { get; set; } = null!;

    public virtual Spec Spec { get; set; } = null!;
}

using System;
using System.Collections.Generic;

namespace MazicPC.Models;

public partial class Spec
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<ProductSpec> ProductSpecs { get; set; } = new List<ProductSpec>();
}

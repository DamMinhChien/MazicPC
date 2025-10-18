using System;
using System.Collections.Generic;

namespace MazicPC.Models;

public partial class PromotionTarget
{
    public int Id { get; set; }

    public int PromotionId { get; set; }

    public string TargetType { get; set; } = null!;

    public int? TargetId { get; set; }

    public virtual Promotion Promotion { get; set; } = null!;
}

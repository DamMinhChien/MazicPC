﻿using System;
using System.Collections.Generic;

namespace MazicPC.Models;

public partial class ProductPromotion
{
    public int Id { get; set; }

    public int ProductId { get; set; }

    public int PromotionId { get; set; }

    public virtual Product Product { get; set; } = null!;

    public virtual Promotion Promotion { get; set; } = null!;
}

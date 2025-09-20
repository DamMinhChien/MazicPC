﻿using System;
using System.Collections.Generic;

namespace MazicPC.Models;

public partial class Cart
{
    public int Id { get; set; }

    public int AccountId { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public virtual Account Account { get; set; } = null!;

    public virtual ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();
}

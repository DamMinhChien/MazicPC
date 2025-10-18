using System;
using System.Collections.Generic;

namespace MazicPC.Models;

public partial class ShippingAddress
{
    public int Id { get; set; }

    public int AccountId { get; set; }

    public string FullName { get; set; } = null!;

    public string Phone { get; set; } = null!;

    public bool? IsDefault { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public string Province { get; set; } = null!;

    public string District { get; set; } = null!;

    public string Ward { get; set; } = null!;

    public string DetailAddress { get; set; } = null!;

    public string? Note { get; set; }

    public virtual Account Account { get; set; } = null!;
}

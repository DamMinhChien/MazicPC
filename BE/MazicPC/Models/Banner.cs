using System;
using System.Collections.Generic;

namespace MazicPC.Models;

public partial class Banner
{
    public int Id { get; set; }

    public string? Title { get; set; }

    public string ImageUrl { get; set; } = null!;

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public bool? IsActive { get; set; }

    public int? ProductId { get; set; }

    public virtual Product? Product { get; set; }
}

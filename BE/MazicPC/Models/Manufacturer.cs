using System;
using System.Collections.Generic;

namespace MazicPC.Models;

public partial class Manufacturer
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Slug { get; set; } = null!;

    public string? LogoUrl { get; set; }

    public string? Description { get; set; }

    public string? Website { get; set; }

    public virtual ICollection<Product> Products { get; set; } = new List<Product>();
}

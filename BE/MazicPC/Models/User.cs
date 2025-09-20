using System;
using System.Collections.Generic;

namespace MazicPC.Models;

public partial class User
{
    public int Id { get; set; }

    public int AccountId { get; set; }

    public string FullName { get; set; } = null!;

    public string? Phone { get; set; }

    public string? Address { get; set; }

    public string? AvatarUrl { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public virtual Account Account { get; set; } = null!;
}

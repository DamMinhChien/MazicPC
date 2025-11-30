using System;
using System.Collections.Generic;

namespace MazicPC.Models;

public partial class Review
{ 
    //model riview
    public int Id { get; set; }

    public int ProductId { get; set; }

    public int AccountId { get; set; }

    public int Rating { get; set; }

    public string? Comment { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual Account Account { get; set; } = null!;

    public virtual Product Product { get; set; } = null!;
}

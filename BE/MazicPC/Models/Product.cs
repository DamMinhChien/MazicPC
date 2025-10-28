using System;
using System.Collections.Generic;

namespace MazicPC.Models;

public partial class Product
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public int? CategoryId { get; set; }

    public int? ManufacturerId { get; set; }

    public string? ShortDescription { get; set; }

    public string? Description { get; set; }

    public decimal Price { get; set; }

    public int StockQty { get; set; }

    public int? WarrantyMonths { get; set; }

    public string? ImageUrl { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public string? Cpu { get; set; }

    public string? Ram { get; set; }

    public string? Storage { get; set; }

    public string? Display { get; set; }

    public string? Gpu { get; set; }

    public string? Os { get; set; }

    public string? Keyboard { get; set; }

    public bool? FingerprintReader { get; set; }

    public string? Battery { get; set; }

    public string? Camera { get; set; }

    public string? Ports { get; set; }

    public string? Wireless { get; set; }

    public string? Dimensions { get; set; }

    public string? Weight { get; set; }

    public string? Color { get; set; }

    public string? Material { get; set; }

    public string? Condition { get; set; }

    public int? ManufactureYear { get; set; }

    public string? WarrantyInfo { get; set; }

    public string? Brand { get; set; }

    public string? ProductType { get; set; }

    public string? Origin { get; set; }

    public string? VideoUrl { get; set; }

    public virtual ICollection<Banner> Banners { get; set; } = new List<Banner>();

    public virtual ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();

    public virtual Category? Category { get; set; }

    public virtual Manufacturer? Manufacturer { get; set; }

    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

    public virtual ICollection<ProductImage> ProductImages { get; set; } = new List<ProductImage>();

    public virtual ICollection<Review> Reviews { get; set; } = new List<Review>();
}

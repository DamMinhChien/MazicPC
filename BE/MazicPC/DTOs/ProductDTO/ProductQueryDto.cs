namespace MazicPC.DTOs.ProductDTO
{
    public class ProductQueryDto
    {
        public int Page { get; set; } = 1;
        public int Limit { get; set; } = 20;
        public string? Category { get; set; }
        public string? Manufacturer { get; set; }
        public string? Sort { get; set; } = "name";
        public string? Search { get; set; }
        public decimal? PriceMin { get; set; }
        public decimal? PriceMax { get; set; }
    }

}

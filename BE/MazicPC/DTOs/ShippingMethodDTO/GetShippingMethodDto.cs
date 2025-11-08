namespace MazicPC.DTOs.ShippingMethodDTO
{
    public class GetShippingMethodDto
    {
        public int Id { get; set; }

        public string Name { get; set; } = null!;

        public decimal Fee { get; set; }
    }
}

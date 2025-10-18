namespace MazicPC.DTOs.ShippingAddressDTO
{
    public class ShippingAddressDto
    {
        public string FullName { get; set; } = null!;

        public string Phone { get; set; } = null!;

        public bool? IsDefault { get; set; }

        public string Province { get; set; } = null!;

        public string District { get; set; } = null!;

        public string Ward { get; set; } = null!;

        public string DetailAddress { get; set; } = null!;

        public string? Note { get; set; }
    }
}

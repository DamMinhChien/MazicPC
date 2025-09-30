namespace MazicPC.DTOs.ManufacturerDTO
{
    public class ManufacturerDto
    {
        public string Name { get; set; } = null!;

        public string Slug { get; set; } = null!;

        public string? LogoUrl { get; set; }

        public string? Description { get; set; }

        public string? Website { get; set; }
    }
}

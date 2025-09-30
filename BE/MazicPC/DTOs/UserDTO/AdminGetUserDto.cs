namespace MazicPC.DTOs.UserDTO
{
    public class AdminGetUserDto 
    {
        public int Id { get; set; }
        public string Username { get; set; } = null!;

        public string FullName { get; set; } = null!;

        public string? Phone { get; set; }

        public string? Address { get; set; }

        public string? AvatarUrl { get; set; }
        public DateTime? CreatedAt { get; set; }

        public DateTime? UpdatedAt { get; set; }
    }
}

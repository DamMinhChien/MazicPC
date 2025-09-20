namespace MazicPC.DTOs.AccountDTO
{
    public class AdminPostAccountDto
    {
        public string Username { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string FullName { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string? Role { get; set; } = "Customer"; // Default role
        public bool? IsActive { get; set; } = true; // Default to active
    }
}

namespace MazicPC.DTOs.AccountDTO
{
    public class GetAccountDto
    {
        public int Id;
        public string Username { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Role { get; set; } = null!;
        public bool? IsActive { get; set; }
        public string Password { get; set; } = null!;
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}

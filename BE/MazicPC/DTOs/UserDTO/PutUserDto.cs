namespace MazicPC.DTOs.UserDTO
{
    public class PutUserDto
    {
        public string FullName { get; set; } = null!;
         
        public string? Phone { get; set; }

        public string? Address { get; set; }

        //public string? AvatarUrl { get; set; }
    }
}

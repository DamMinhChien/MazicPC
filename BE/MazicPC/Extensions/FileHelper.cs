namespace MazicPC.Extensions
{
    public static class FileHelper
    {
        // Lưu file ảnh vào folder uploads và trả về URL
        public static async Task<string> SaveImageAsync(IFormFile file, IWebHostEnvironment env, HttpRequest request, string? oldFileUrl = null)
        {
            if (file == null || file.Length == 0)
                throw new ArgumentException("File không hợp lệ");

            // Validate file size
            const long maxSize = 10 * 1024 * 1024; // 10MB
            if (file.Length > maxSize)
                throw new ArgumentException("File quá lớn, phải <= 10MB!");

            // Validate ảnh
            if (!ImageValidator.IsValidImage(file))
                throw new ArgumentException("Không phải file ảnh hợp lệ!");

            // Tạo folder uploads nếu chưa có
            var uploads = Path.Combine(env.WebRootPath, "uploads");
            if (!Directory.Exists(uploads)) Directory.CreateDirectory(uploads);

            // Xóa file cũ nếu có
            if (!string.IsNullOrEmpty(oldFileUrl))
            {
                var oldFileName = Path.GetFileName(oldFileUrl);
                var oldFilePath = Path.Combine(uploads, oldFileName);
                if (System.IO.File.Exists(oldFilePath))
                    System.IO.File.Delete(oldFilePath);
            }

            // Lưu file mới
            var fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(uploads, fileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var baseUrl = $"{request.Scheme}://{request.Host}{request.PathBase}";
            return $"{baseUrl}/uploads/{fileName}";
        }
    }

}

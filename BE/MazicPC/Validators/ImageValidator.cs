namespace MazicPC.Validators
{
    public static class ImageValidator
    {
        private static readonly Dictionary<string, byte[][]> _fileSignatures = new()
{
    { ".jpg", new[] { new byte[] { 0xFF, 0xD8, 0xFF } } },
    { ".jpeg", new[] { new byte[] { 0xFF, 0xD8, 0xFF } } },
    { ".png", new[] { new byte[] { 0x89, 0x50, 0x4E, 0x47 } } },
    { ".gif", new[] { new byte[] { 0x47, 0x49, 0x46, 0x38 } } },
    { ".bmp", new[] { new byte[] { 0x42, 0x4D } } },
    { ".webp", new[] { new byte[] { 0x52, 0x49, 0x46, 0x46 } } } // RIFF, further bytes indicate WEBP
};

        public static bool IsValidImage(IFormFile file)
        {
            if (file == null) return false;

            // 1) content type quick-check
            if (!file.ContentType.StartsWith("image/", StringComparison.OrdinalIgnoreCase))
                return false;

            // 2) extension whitelist
            var ext = Path.GetExtension(file.FileName).ToLowerInvariant();
            if (string.IsNullOrEmpty(ext) || !_fileSignatures.ContainsKey(ext))
                return false;

            // 3) check magic bytes
            using var stream = file.OpenReadStream();
            var headerBytes = new byte[12]; // read enough bytes for signatures
            var read = stream.Read(headerBytes, 0, headerBytes.Length);

            var signatures = _fileSignatures[ext];
            foreach (var sig in signatures)
            {
                if (read >= sig.Length && headerBytes.Take(sig.Length).SequenceEqual(sig))
                    return true;
            }

            return false;
        }

    }
}

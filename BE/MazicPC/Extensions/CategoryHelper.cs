using MazicPC.DTOs.CategoryDTO;

namespace MazicPC.Extensions
{
    public class CategoryHelper
    {
        // Helper method chuyển đổi từ flat thành nested
        public static List<CategoryUserDto> BuildCategoryTree(List<CategoryUserDto> flatCategories, int? parentId = null)
        {
            var categoryDictionary = flatCategories
                .Where(c => c.ParentId == parentId)
                .ToDictionary(c => c.Id, c => c);

            foreach (var category in categoryDictionary.Values)
            {
                category.Children = BuildCategoryTree(flatCategories, category.Id);
            }

            return categoryDictionary.Values.ToList();
        }
    }
}

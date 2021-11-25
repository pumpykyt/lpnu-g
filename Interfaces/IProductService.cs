using System.Collections.Generic;
using System.Threading.Tasks;
using lpnu.Dtos;

namespace lpnu.Interfaces
{
    public interface IProductService
    {
        Task PostProductAsync(ProductRequestDto model);
        Task<IEnumerable<ProductResponseDto>> GetProductsAsync(string searchQuery, string sortQuery);
        Task EditProductAsync(int productId, ProductRequestDto model);
        Task DeleteProductAsync(int productId);
    }
}
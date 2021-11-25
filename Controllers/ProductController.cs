using System.Threading.Tasks;
using lpnu.Dtos;
using lpnu.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace lpnu.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddProductAsync(ProductRequestDto model)
        {
            await _productService.PostProductAsync(model);
            return Ok();
        }

        [HttpGet("get")]
        public async Task<IActionResult> GetProductsAsync(string searchQuery, string sortQuery = "default")
        {
            var result = await _productService.GetProductsAsync(searchQuery, sortQuery);
            return Ok(result);
        }

        [HttpPut("edit")]
        public async Task<IActionResult> EditProductAsync(int productId, ProductRequestDto model)
        {
            await _productService.EditProductAsync(productId, model);
            return Ok();
        }

        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteProductAsync(int productId)
        {
            await _productService.DeleteProductAsync(productId);
            return Ok();
        }
    }
}
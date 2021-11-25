using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using lpnu.Data;
using lpnu.Data.Entities;
using lpnu.Dtos;
using lpnu.Exceptions;
using lpnu.Interfaces;
using Mapster;
using Microsoft.EntityFrameworkCore;

namespace lpnu.Services
{
    public class ProductService : IProductService
    {
        private readonly EFContext _context;

        public ProductService(EFContext context)
        {
            _context = context;
        }

        public async Task PostProductAsync(ProductRequestDto model)
        {
            var product = model.Adapt<Product>();
            product.ImagePath = await SaveImage(model.Base64);
            await _context.Products.AddAsync(product);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<ProductResponseDto>> GetProductsAsync(string searchQuery, string sortQuery)
        {
            var products = _context.Products.AsQueryable();
            
            if (!string.IsNullOrEmpty(searchQuery))
            {
                products = products.Where(t => t.Name.ToLower().Contains(searchQuery.ToLower()));
            }

            switch (sortQuery)
            {
                case "price_asc":
                    products = products.OrderBy(t => t.Price);
                    break;
                case "price_desc":
                    products = products.OrderByDescending(t => t.Price);
                    break;
                default:
                    products = products.OrderBy(t => t.Name);
                    break;
            }

            var result = await products.ToListAsync();
            
            return result.Adapt<IEnumerable<ProductResponseDto>>();
        }

        public async Task EditProductAsync(int productId, ProductRequestDto model)
        {
            var product = await _context.Products.SingleOrDefaultAsync(t => t.Id == productId);
            
            if (product == null)
            {
                throw new RestException(HttpStatusCode.NotFound);
            }

            product.Name = model.Name;
            product.Price = model.Price;
            product.AvailableCount = model.AvailableCount;
            
            await _context.SaveChangesAsync();
        }

        public async Task DeleteProductAsync(int productId)
        {
            var product = await _context.Products.SingleOrDefaultAsync(t => t.Id == productId);
            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
        }

        private async Task<string> SaveImage(string base64)
        {
            var normalizedBase64 = base64.Substring(base64.LastIndexOf(',') + 1);
            var bytes = Convert.FromBase64String(normalizedBase64);
            var newFileName = Guid.NewGuid() + GetFileExtension(normalizedBase64);
            await File.WriteAllBytesAsync(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", newFileName), bytes);
            
            return newFileName;
        }
        private static string GetFileExtension(string base64String)
        {
            var data = base64String.Substring(0, 5);

            switch (data.ToUpper())
            {
                case "IVBOR":
                    return ".png";
                case "/9J/4":
                    return ".jpg";
                case "AAAAF":
                    return ".mp4";
                case "JVBER":
                    return ".pdf";
                case "AAABA":
                    return ".ico";
                case "UMFYI":
                    return ".rar";
                case "E1XYD":
                    return ".rtf";
                case "U1PKC":
                    return ".txt";
                case "MQOWM":
                case "77U/M":
                    return ".srt";
                default:
                    return string.Empty;
            }
        }
    }
}
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace lpnu.Data.Entities
{
    public class Product
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int AvailableCount { get; set; }
        public string ImagePath { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
    }
}
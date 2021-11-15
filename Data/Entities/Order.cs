using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace lpnu.Data.Entities
{
    public class Order
    {
        [Key]
        public int Id { get; set; }
        public int Count { get; set; }
        public decimal TotalPrice { get; set; }
        public string Status { get; set; }
        public string UserId { get; set; }
        public virtual ICollection<Product> Products { get; set; }
        public virtual User User { get; set; }
    }
}
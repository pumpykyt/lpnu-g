namespace lpnu.Dtos
{
    public class ProductResponseDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int AvailableCount { get; set; }
        public string ImagePath { get; set; }
    }
}
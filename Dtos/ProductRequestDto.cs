namespace lpnu.Dtos
{
    public class ProductRequestDto
    {
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int AvailableCount { get; set; }
        public string Base64 { get; set; }
    }
}
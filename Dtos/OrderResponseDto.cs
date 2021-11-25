namespace lpnu.Dtos
{
    public class OrderResponseDto
    {
        public int Id { get; set; }
        public string Status { get; set; }
        public decimal TotalPrice { get; set; }
        public string UserEmail { get; set; }
    }
}
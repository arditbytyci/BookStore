namespace BookStore.DTO
{
    public class OrderDTO
    {
        public int OrderID { get; set; } // PK 
        public DateTime? OrderDate { get; set; } = DateTime.UtcNow;

        public decimal TotalAmount { get; set; }

        public string UserId { get; set; }

        public string Email { get; set; } = string.Empty;

        public string FullName { get; set; } = string.Empty;

        public List<OrderDetailDTO> OrderDetails { get; set; } = new List<OrderDetailDTO>();
    }
}

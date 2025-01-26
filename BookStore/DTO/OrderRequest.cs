namespace BookStore.DTO
{
    public class OrderRequest
    {
        public string UserId { get; set; }
        public decimal TotalAmount { get; set; }
            
        public int OrderID { get; set; }

        public string Email { get; set; }
        public string FullName  { get; set; }

        public DateTime OrderDate { get; set; } 
        public List<OrderDetailDTO> OrderDetails { get; set; }


       
    }
}

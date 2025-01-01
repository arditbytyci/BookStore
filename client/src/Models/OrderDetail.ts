export interface OrderDetail {
  orderDetailID: number;
  quantity: number;
  orderID: number;
  bookID: number;
  bookName: string;
  bookPrice: number;
}

// public class OrderDetailDTO
// {
//     public int OrderDetailID { get; set; } // PK
//     public int Quantity { get; set; }

//     //FK
//     public int OrderID { get; set; }
//     public int BookID { get; set; }

//     public string BookName { get; set; } = string.Empty;

//     public decimal BookPrice { get; set; }
// }

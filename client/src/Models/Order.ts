export interface Order {
  orderID: number;
  orderDate: string;
  totalAmount: number;
  customerID: number;
  customerName: string;
}

// public int OrderID { get; set; } // PK
// public DateTime? OrderDate { get; set; } = DateTime.UtcNow;

// public decimal TotalAmount { get; set; }

// public int CustomerID { get; set; }

// public string CustomerName { get; set; } = string.Empty;

// public List<OrderDTO> OrderDetails { get; set; } = new List<OrderDTO>();

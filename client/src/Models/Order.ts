import { OrderDetail } from "./OrderDetail";

export interface Order {
  orderID: number;
  orderDate: string;
  totalAmount: number;
  userId: string;
  email: string;
  fullName: string;
  orderDetails: OrderDetail[];
}

// {
//   "orderID": 0,
//   "orderDate": "2025-01-16",
//   "totalAmount": 40,
//   "userId": "f559ebd8-5ee5-4953-bb3e-a98c1be32484",
//   "email": "",
//   "fullName": "",
//   "orderDetails": [
//   ]

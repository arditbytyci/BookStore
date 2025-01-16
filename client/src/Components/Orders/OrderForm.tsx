import { useState } from "react";
import { OrderDetail } from "../../Models/OrderDetail";

const OrderForm: React.FC = () => {
  const [userId, setUserId] = useState<string>("");
  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  return (
    <div>
      <h2>Create an order</h2>
      <input
        type="text"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />


      <h3></h3>
    </div>
  );
};

export default OrderForm;

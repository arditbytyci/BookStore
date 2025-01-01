import { useEffect, useState } from "react";
import { Customer } from "../Models/Customer";
import axiosClient from "../axiosClient";

const CustomerView = () => {
  const [customerData, setCustomerData] = useState<Customer[]>([]);
  const [, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axiosClient.get("/customer");
      setCustomerData(response.data);
    } catch (error) {
      setError("Failed to fetch customers");
    }
  };

  // export interface Customer {
  //   customerID: number;
  //   fullName: string;
  //   email: string;
  //   phone: string;
  //   userID: string;
  //   userName: string;
  // }

  return (
    <div>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>ID</th>
            <th>FullName</th>
            <th>Email</th>
            <th>Phone</th>
            <th>userID</th>
            <th>userName</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {customerData.map((c, i) => (
            <tr key={i}>
              <th>{c.customerID}</th>
              <th>{c.fullName}</th>
              <th>{c.email}</th>
              <th>{c.phone}</th>
              <th>{c.userID}</th>
              <th>{c.userName}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerView;

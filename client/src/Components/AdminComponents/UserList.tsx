import React, { useEffect, useState } from "react";
import { User } from "../../Models/User";
import axiosClient from "../../axiosClient";

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axiosClient.get("/user");
      setUsers(response.data);
    } catch (error) {
      console.error("fetchUsers API error", error);
    }
  };

  return (
    <div className="userlist-container">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th className="pl-12">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.userName}</td>
              <td>{u.fullName}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>{new Date(u.createdAt).toLocaleDateString()}</td>
              <td colSpan={2}>
                <button className="btn btn-md btn-outline btn-circle btn-warning text-white font-semibold mr-4">
                  Edit
                </button>
                <button className="btn btn-md btn-outline btn-circle btn-error text-white font-semibold">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;

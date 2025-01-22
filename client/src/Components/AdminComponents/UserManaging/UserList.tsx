import { useUsers } from "../hooks/useUsers";

const UserList: React.FC = () => {
  const { users, error, loading, handleDeleteUser } = useUsers();

  if (error) return <p>{error}</p>;
  if (loading) return <p>{loading}</p>;

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
              <td>
                <button
                  onClick={() => handleDeleteUser(u.id)}
                  className="btn btn-md btn-outline btn-circle btn-error text-white font-semibold"
                >
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

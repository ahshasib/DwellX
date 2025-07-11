import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../hooks/useAxiosSecure";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const axiosSecure = useAxiosSecure(); 
  useEffect(() => {
    axiosSecure.get(`/users`)
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, [axiosSecure]);

  const handleRoleChange = async (id, currentRole) => {
    const roles = ["user", "agent", "admin"];
    const nextRole = roles[(roles.indexOf(currentRole) + 1) % roles.length];

    try {
      const res = await axiosSecure.patch(`/users/role/${id}`, {
        newRole: nextRole,
      });

      if (res.data.modifiedCount > 0) {
        Swal.fire("Success", `Role changed to ${nextRole}`, "success");

        setUsers(prev =>
          prev.map(user => user._id === id ? { ...user, role: nextRole } : user)
        );
      }
    } catch (error) {
      Swal.fire("Error", "Failed to update role", "error");
    }
  };

  return (
    <div className="p-6">
      <Helmet><title>Manage Users | Dashboard</title></Helmet>
      <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">Manage Users</h2>

      <div className="overflow-x-auto">
        <table className="table w-full text-sm">
          <thead>
            <tr className="bg-indigo-100 text-indigo-800 font-semibold">
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Current Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td>{index + 1}</td>
                <td>{user.displayName || "N/A"}</td>
                <td>{user.email}</td>
                <td>
                  <span className="capitalize px-2 py-1 rounded bg-gray-100 text-gray-800">{user.role}</span>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-outline btn-primary"
                    onClick={() => handleRoleChange(user._id, user.role || "user")}
                  >
                    Change Role
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;

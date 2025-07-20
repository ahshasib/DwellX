import { useState } from "react";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState("customer");

  // ✅ Fetch users using useQuery
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-users");
      return res.data;
    },
  });

  // ✅ Mutation for updating user role
  const updateRoleMutation = useMutation({
    mutationFn: async ({ email, role }) => {
      const res = await axiosSecure.patch(`/user/role/update/${email}`, {
        role,
      });
      return res.data;
    },
    onSuccess: (data, variables) => {
      if (data.modifiedCount > 0) {
        Swal.fire("Success", `Role changed to ${variables.role}`, "success");
        queryClient.invalidateQueries(["all-users"]);
        document.getElementById("roleModal").close();
      }
    },
    onError: () => {
      Swal.fire("Error", "Failed to update role", "error");
    },
  });

  const openModal = (user) => {
    setSelectedUser(user);
    setNewRole(user.role || "customer");
    document.getElementById("roleModal").showModal();
  };

  const handleUpdateRole = () => {
    if (!selectedUser) return;
    updateRoleMutation.mutate({ email: selectedUser.email, role: newRole });
  };

  return (
    <div className="p-6">
      <Helmet>
        <title>Manage Users | Dashboard</title>
      </Helmet>
      <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">
        Manage Users
      </h2>

      {isLoading ? (
        <div className="text-center mt-10 text-lg text-gray-600">Loading users...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full text-sm">
            <thead>
              <tr className="bg-indigo-100 text-indigo-800 font-semibold">
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Current Role</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td>{index + 1}</td>
                  <td>{user.name || "N/A"}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className="capitalize px-2 py-1 rounded bg-gray-100 text-gray-800">
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`capitalize px-2 py-1 rounded 
                      ${user.status === "requested"
                          ? "bg-yellow-200 text-yellow-800"
                          : user.status === "verified"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                    >
                      {user.status || "Unverified"}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline btn-primary"
                      onClick={() => openModal(user)}
                    >
                      Change Role
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      <dialog id="roleModal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Change Role</h3>
          <select
            className="select select-bordered w-full mb-4"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
          >
            <option value="customer">Customer</option>
            <option value="seller">Seller</option>
            <option value="admin">Admin</option>
          </select>
          <div className="modal-action">
            <form method="dialog" className="flex gap-2">
              <button className="btn btn-outline">Cancel</button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleUpdateRole}
                disabled={updateRoleMutation.isLoading}
              >
                {updateRoleMutation.isLoading ? "Updating..." : "OK"}
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ManageUsers;

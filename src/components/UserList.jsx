import React, { useContext, useState } from "react";
import { AddContext } from "../Context/AddContext";
import { MdDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

function UserList() {
  const { users, deleteUser, updateUser } = useContext(AddContext);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "" });

  if (!users) {
    return <p className="p-4 text-gray-500">Loading users...</p>;
  }

  if (users.length === 0) {
    return <p className="p-4 text-gray-500">No users found.</p>;
  }

  const openEditModal = (user) => {
    setEditingUser(user.id);
    setFormData({ name: user.name, email: user.email });
  };

  const handleSave = () => {
    updateUser(editingUser, formData);
    setEditingUser(null);
  };

  const handleCancel = () => setEditingUser(null);

  return (
    <div className="p-4">
      <table className="min-w-full   border-gray-300 dark:border-gray-700">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800">
            <th className=" px-4 py-2 text-left">Name</th>
            <th className=" px-4 py-2 text-left">Email</th>
            <th className=" px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              <td className="px-4 py-2">{user.name}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2 text-center flex justify-center gap-2">
                <button
                  onClick={() => openEditModal(user)}
                  className="text-blue-500 hover:text-blue-700 font-bold"
                >
                  <FaRegEdit size={24} />{" "}
                </button>
                <button
                  onClick={() => deleteUser(user.id)}
                  className="text-red-500 hover:text-red-700 font-bold"
                >
                  <MdDeleteForever size={24} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {editingUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-md w-80 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 dark:text-gray-300"
              onClick={handleCancel}
            >
              ✖
            </button>
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Edit User
            </h2>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Name"
              className="w-full mb-2 p-2 border rounded text-sm"
            />
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              placeholder="Email"
              className="w-full mb-4 p-2 border rounded text-sm"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={handleSave}
                className="px-3 py-1 bg-green-500 text-white rounded text-sm"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="px-3 py-1 bg-gray-400 text-white rounded text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserList;

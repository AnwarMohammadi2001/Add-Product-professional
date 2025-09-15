import React, { useContext, useState } from "react";
import { AddContext } from "../Context/AddContext";

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

  const handleEdit = (user) => {
    setEditingUser(user.id);
    setFormData({ name: user.name, email: user.email });
  };

  const handleSave = () => {
    updateUser(editingUser, formData);
    setEditingUser(null);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {users.slice(0, 8).map((user) => (
        <div
          key={user.id}
          className="border dark:border-gray-700 p-4 rounded-lg shadow hover:shadow-lg transition bg-white dark:bg-gray-800"
        >
          {editingUser === user.id ? (
            <div>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="w-full mb-2 p-1 border rounded text-sm"
              />
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                className="w-full mb-2 p-1 border rounded text-sm"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="px-2 py-1 bg-green-500 text-white rounded text-xs"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingUser(null)}
                  className="px-2 py-1 bg-gray-400 text-white rounded text-xs"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4 justify-between">
              <div>
                <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {user.name}
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {user.email}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(user)}
                  className="text-blue-500 font-bold hover:text-blue-700"
                >
                  ✎
                </button>
                <button
                  onClick={() => deleteUser(user.id)}
                  className="text-red-500 font-bold hover:text-red-700"
                >
                  ✕
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default UserList;

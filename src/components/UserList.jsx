import React, { useContext } from "react";
import { AddContext } from "../Context/AddContext";

function UserList() {
  const { users } = useContext(AddContext);

  if (!users || users.length === 0) {
    return <p className="p-4 text-gray-500">Loading users...</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {users.slice(0, 8).map((user) => (
        <div
          key={user.id}
          className="border dark:border-gray-700 p-4 rounded-lg shadow hover:shadow-lg transition bg-white dark:bg-gray-800"
        >
          <div className="flex items-center gap-4">
            <div>
              <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {user.name}
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {user.email}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserList;

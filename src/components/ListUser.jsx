import React, { useContext } from "react";
import { AddContext } from "../Context/AddContext";

const ListUser = () => {
  const { users, currentUser } = useContext(AddContext);

  if (!users) {
    return <p className="p-4 text-gray-500">Loading users...</p>;
  }

  // Filter out the logged-in user
  const filteredUsers = users.filter((u) => u.id !== currentUser?.id);

  if (filteredUsers.length === 0) {
    return <p className="p-4 text-gray-500">No other users found.</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100"></h2>
      <ul className="space-y-2">
        {filteredUsers.map((user , index) => (
          <li
            key={user.id}
            className="p-3 flex  items-center gap-x-5 dark:bg-gray-800"
          >
            <span>{index + 1}</span>
            <p className="font-medium text-gray-900 dark:text-gray-100">
              {user.name}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {user.email}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListUser;

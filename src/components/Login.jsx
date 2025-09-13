import { useContext, useState } from "react";
import { AddContext } from "../Context/AddContext";

const Login = () => {
  const { users, userLoading, currentUser, login, logout } =
    useContext(AddContext);
  const [username, setUsername] = useState("");

  const handleLogin = () => {
    const success = login(username);
    if (!success) {
      alert("User not found!");
    }
  };

  return (
    <div className="p-4">
      {currentUser ? (
        <div>
          <p>Welcome, {currentUser.name}!</p>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          <input
            type="text"
            placeholder="Enter username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border px-2 py-1 mr-2"
          />
          <button
            onClick={handleLogin}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;

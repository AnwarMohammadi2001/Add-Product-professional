import { useContext, useState } from "react";
import { AddContext } from "../Context/AddContext";

const Login = () => {
  const { users, currentUser, login, logout } = useContext(AddContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const handleLogin = () => {
    const success = login(username, email); // login function will check both
    if (!success) {
      alert("User not found!");
    }
  };

  return (
    <div className="p-6 w-full max-w-sm mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      {currentUser ? (
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Welcome, {currentUser.firstName}!
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 text-center mb-2">
            Login
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-4">
            Enter your username or email to continue
          </p>

          {/* Username input */}
          <div className="relative">
            <input
              type="text"
              id="usernameInput"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder=" "
              className="peer w-full border-b-2 border-gray-300 dark:border-gray-600 bg-transparent text-gray-900 dark:text-gray-100 py-2 px-1 focus:outline-none focus:border-blue-500"
            />
            <label
              htmlFor="usernameInput"
              className="absolute left-1 top-2 text-gray-400 dark:text-gray-400 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-blue-500 peer-focus:text-sm"
            >
              Username
            </label>
          </div>

          {/* Email input */}
          <div className="relative">
            <input
              type="email"
              id="emailInput"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=" "
              className="peer w-full border-b-2 border-gray-300 dark:border-gray-600 bg-transparent text-gray-900 dark:text-gray-100 py-2 px-1 focus:outline-none focus:border-blue-500"
            />
            <label
              htmlFor="emailInput"
              className="absolute left-1 top-2 text-gray-400 dark:text-gray-400 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-blue-500 peer-focus:text-sm"
            >
              Email
            </label>
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;

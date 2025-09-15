import React, { useContext, useState } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { FaUserCircle } from "react-icons/fa";
import Drawer_First from "./Drawer_First";
import { AddContext } from "../Context/AddContext";
import Login from "./Login";
import Register from "./Register"; // ✅ import Register
import { IoMdPersonAdd } from "react-icons/io";

const NavbarNew = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const { cartItems, darkMode, toggleDarkMode, currentUser, logout } =
    useContext(AddContext);

  // Handle cart click
  const handleCartClick = () => {
    if (!currentUser) {
      setShowLogin(true); // open login modal if not logged in
    } else {
      setDrawerIsOpen(true); // open cart drawer if logged in
    }
  };

  // Handle user icon click
  const handleUserClick = () => {
    if (!currentUser) {
      setShowLogin(true);
    } else {
      setShowUserMenu((prev) => !prev);
    }
  };

  return (
    <div className="flex py-3 px-10 items-center justify-between bg-white dark:bg-gray-900 relative">
      <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        MyShop
      </div>

      {/* Dark Mode Toggle */}
      <button
        onClick={toggleDarkMode}
        className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
      >
        {darkMode ? "☀️ Light" : "🌙 Dark"}
      </button>

      {/* Right icons */}
      <div className="flex items-center gap-4 relative">
        {/* Register Button */}
        <div
          onClick={() => setShowRegister(true)}
          className="flex items-center gap-x-2 border py-2 px-4 rounded-md border-gray-300 cursor-pointer hover:bg-gray-200 duration-300 transition-colors"
        >
          <span>Register</span>
          <IoMdPersonAdd />
        </div>

        {/* Cart Icon */}
        <div className="relative">
          <CiShoppingCart
            onClick={handleCartClick}
            size={30}
            className="cursor-pointer hover:scale-105 transition-all duration-300 text-gray-900 dark:text-gray-100"
          />
          {cartItems?.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cartItems.length}
            </span>
          )}
        </div>

        {/* User Icon */}
        <div className="relative">
          {currentUser ? (
            <div
              className="cursor-pointer hover:scale-105 transition-all duration-300  flex items-center gap-3 border-gray-300"
              onClick={handleUserClick}
            >
              <span className="">{currentUser.name}</span>
            </div>
          ) : (
            <FaUserCircle
              onClick={handleUserClick}
              size={30}
              className="cursor-pointer hover:scale-105 transition-all duration-300 text-gray-900 dark:text-gray-100"
            />
          )}

          {/* Dropdown menu for logged-in user */}
          {showUserMenu && currentUser && (
            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-md py-2 z-50">
              <p className="px-4 py-2 text-gray-900 dark:text-gray-100">
                Hello, {currentUser.name}!
              </p>
              <button
                onClick={logout}
                className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Drawer */}
      {drawerIsOpen && currentUser && (
        <Drawer_First
          drawerIsOpen={drawerIsOpen}
          setDrawerIsOpen={setDrawerIsOpen}
        />
      )}

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-md w-80 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 dark:text-gray-300"
              onClick={() => setShowLogin(false)}
            >
              ✖
            </button>
            <Login />
          </div>
        </div>
      )}

      {/* Register Modal */}
      {showRegister && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-md w-80 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 dark:text-gray-300"
              onClick={() => setShowRegister(false)}
            >
              ✖
            </button>
            <Register onClose={() => setShowRegister(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default NavbarNew;

import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";
import NavLinks from "./NavLinks";
import ShoppingBug from "./ShoppingBug";
import { AddContext } from "../Context/AddContext";
import Login from "./Login"; // your login component
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false); // login modal
  const { currentUser } = useContext(AddContext);

  return (
    <nav className="bg-white fixed top-0 left-0 right-0 z-50 shadow-md">
      <div className="flex items-center font-medium justify-between p-5">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src={Logo} alt="logo" className="h-9 cursor-pointer" />
          <div className="text-3xl md:hidden" onClick={() => setOpen(!open)}>
            <ion-icon name={`${open ? "close" : "menu"}`}></ion-icon>
          </div>
        </div>

        {/* Links */}
        <ul className="md:flex hidden uppercase items-center gap-8 font-[Poppins]">
          <li className="relative group">
            <Link to="/" className="py-7 px-3 inline-block">
              Home
            </Link>
            <span className="absolute left-0 bottom-0 h-[2px] w-full bg-black scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
          </li>
          <NavLinks />
        </ul>

        {/* Right icons */}
        <div className="flex items-center gap-4">
          {/* Shopping cart */}
          <ShoppingBug />

          {/* User icon */}
          <div
            className="text-2xl cursor-pointer text-gray-700"
            onClick={() => setShowLogin(true)}
          >
            <FaUserCircle />
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md shadow-md w-80 relative">
            <button
              className="absolute top-2 right-2 text-gray-500"
              onClick={() => setShowLogin(false)}
            >
              ✖
            </button>
            <Login />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

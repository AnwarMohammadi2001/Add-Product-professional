import React, { useContext, useState } from "react";
import { CiShoppingCart } from "react-icons/ci";
import Drawer from "./Drawer";
// import { AppContext } from "../Context/AppContext";

const Button = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const { cartItems } = useContext(AppContext);

  return (
    <>
      {/* Cart Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="relative p-2 rounded-full hover:bg-gray-100"
      >
        <CiShoppingCart size={24} />
        {cartItems?.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {cartItems.length}
          </span>
        )}
      </button>

      {/* Drawer */}
      <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default Button;

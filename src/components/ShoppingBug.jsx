import React, { useContext, useState } from "react";
import { CiShoppingCart } from "react-icons/ci";
import Drawerr from "./Drawerr";
import { CardContext } from "../Context/CardContext";

const ShoppingBug = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems } = useContext(CardContext);
  return (
    <>
      <div className="relative p-2 rounded-full hover:bg-gray-100">
        <CiShoppingCart size={24} onClick={() => setIsOpen(true)} />
        {cartItems?.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {cartItems.length}
          </span>
        )}
      </div>
      {isOpen && <Drawerr isOpen={isOpen} onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default ShoppingBug;

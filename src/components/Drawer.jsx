import React, { useContext } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { AppContext } from "../Context/AppContext";

const Drawer = ({ isOpen, onClose }) => {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(AppContext);
  return (
    <div
      className={`fixed top-0 right-0 h-full w-96 bg-gray-200 transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold">Your Cart</h2>
        <button onClick={onClose} className="text-gray-600 hover:text-black">
          <IoCloseSharp size={24} />{" "}
        </button>
      </div>

      {/* Items */}
      <div className="p-4 space-y-3 overflow-y-auto h-[75%]">
        {cartItems?.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          cartItems?.map((item) => (
            <div className="flex items-center justify-between border-b pb-2">
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 object-cover rounded"
              />
              <div className="flex-1 px-2">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">
                  ${item.price.toFixed(2)}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      {cartItems?.length > 0 && (
        <div className="p-4 border-t">
          <button
            onClick={clearCart}
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default Drawer;

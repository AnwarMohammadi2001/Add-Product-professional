import React, { useContext } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { AddContext } from "../Context/AddContext";

const Drawer_First = ({ drawerIsOpen, setDrawerIsOpen }) => {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(AddContext);
  return (
    <AnimatePresence>
      {drawerIsOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-40"
            onClick={() => setDrawerIsOpen(false)}
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4 }}
            className="fixed top-0 right-0 h-full w-96 bg-white shadow-lg z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold">Your Cart</h2>
              <button
                onClick={() => setDrawerIsOpen(false)}
                className="text-gray-600 hover:text-black"
              >
                <IoCloseSharp size={24} />
              </button>
            </div>

            {/* Cart items */}
            <div className="p-4 space-y-3 overflow-y-auto flex-1">
              {cartItems?.length === 0 ? (
                <p className="p-4">Your cart is empty.</p>
              ) : (
                cartItems?.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border-b pb-2"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-contain rounded"
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
              <div className="p-4 border-t space-y-3">
                <p className="text-right font-semibold">
                  Subtotal: $
                  {cartItems
                    .reduce((acc, item) => acc + item.price * item.quantity, 0)
                    .toFixed(2)}
                </p>
                <button
                  onClick={clearCart}
                  className="w-full bg-red-500 text-white py-2 hover:bg-red-600"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Drawer_First;

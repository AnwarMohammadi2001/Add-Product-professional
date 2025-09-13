import React, { useContext, useState } from "react";
import { AddContext } from "../Context/AddContext";
import Login from "./Login";

const ProductList = () => {
  const { data, addToCart, currentUser } = useContext(AddContext);
  const [showLogin, setShowLogin] = useState(false);

  // Function to handle Add to Cart
  const handleAddToCart = (item) => {
    addToCart(item, () => setShowLogin(true)); // if not logged in, open login
  };

  return (
    <div className="p-6 px-20">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {data.slice(0, 10).map((item) => (
          <div
            key={item.id}
            className="border border-gray-200 p-3 rounded h-[370px] shadow flex flex-col justify-between hover:shadow-lg transition"
          >
            <div>
              <img
                src={item.image}
                alt={item.title}
                className="h-[200px] object-cover mx-auto"
              />
              <h2 className="text-sm font-semibold mt-2">{item.title}</h2>
              <p className="text-gray-600">${item.price}</p>
            </div>
            <div>
              <button
                onClick={() => handleAddToCart(item)}
                className="bg-black text-white w-full py-2 mt-3 hover:bg-gray-900 transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Login Modal */}
      {showLogin && !currentUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-50 z-50">
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
    </div>
  );
};

export default ProductList;

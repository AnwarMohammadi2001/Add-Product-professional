import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import { products } from "./products";

const Shop = () => {
  const { cartItems, addToCart, increaseQuantity, decreaseQuantity } =
    useContext(AppContext);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {products.map((product) => {
        const inCart = cartItems.find((item) => item.id === product.id);

        return (
          <div
            key={product.id}
            className="border p-4 rounded-lg shadow hover:shadow-md transition"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-32 object-cover rounded"
            />
            <h3 className="mt-2 font-semibold">{product.name}</h3>
            <p className="text-gray-500 text-sm">{product.description}</p>
            <p className="mt-1 font-bold">${product.price}</p>

            {inCart ? (
              <div className="flex items-center justify-between mt-3">
                <button
                  onClick={() => decreaseQuantity(product.id)}
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  -
                </button>
                <span>{inCart.quantity}</span>
                <button
                  onClick={() => increaseQuantity(product.id)}
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  +
                </button>
              </div>
            ) : (
              <button
                onClick={() => addToCart(product)}
                className="mt-3 w-full bg-blue-500 text-white py-1.5 rounded hover:bg-blue-600"
              >
                Add to Cart
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Shop;

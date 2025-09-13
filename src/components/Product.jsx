import React, { useContext } from "react";
import { productData } from "../components/Data";
import { CardContext } from "../Context/CardContext";

const Product = () => {
  const { addToCart } = useContext(CardContext);
  return (
    <div className="p-6 px-20">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productData.map((product) => (
          <div
            key={product.id}
            className="border border-gray-50  shadow-md hover:shadow-md rounded-md transition bg-white"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full object-cover rounded-t-md"
            />
            <div className="p-3">
              <h3 className="text-lg font-semibold">{product.title}</h3>
              <p className="text-gray-600">${product.price}</p>
            </div>
            <button
              onClick={() => addToCart(product)}
              className="mt-3 w-full bg-black text-white py-2 hover:bg-gray-900 cursor-pointer transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;

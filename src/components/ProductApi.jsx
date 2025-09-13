import React, { useContext } from "react";
import { CardContext } from "../Context/CardContext";

const ProductApi = () => {
  const { product, addToCart } = useContext(CardContext);
  return (
    <div className="p-6 px-20">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {product.slice(0, 10).map((item) => (
          <div
            key={item.id}
            className="border border-gray-200 p-3 rounded h-[370px] shadow flex flex-col justify-between hover:shadow-lg transition"
          >
            <div>
              <img
                src={item.image}
                alt={item.title}
                className="  h-[200px] object-cover mx-auto"
              />
              <h2 className="text-sm font-semibold mt-2">{item.title}</h2>
              <p className="text-gray-600">${item.price}</p>
            </div>
            <div>
              <button
                onClick={() => addToCart(item)}
                className="bg-black text-white w-full py-2 mt-3 hover:bg-gray-900 transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductApi;

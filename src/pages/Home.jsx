import React from "react";
import Product from "../components/Product";
import ProductApi from "../components/ProductApi";
import UserList from "../components/UserList";
import ProductList from "../components/ProductList";

const Home = () => {
  return (
    <div className="min-h-screen mt-20 ">
      {/* <Product />
      <ProductApi />
      <UserList /> */}
      <ProductList />
      <UserList />
    </div>
  );
};

export default Home;

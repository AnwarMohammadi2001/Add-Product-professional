import React from "react";
import UserList from "../components/UserList";
import ProductList from "../components/ProductList";

const Home = () => {
  return (
    <div className="min-h-screen mt-20 ">
      <ProductList />
      <UserList />
    </div>
  );
};

export default Home;

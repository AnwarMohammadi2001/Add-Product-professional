import React, { useContext } from "react";
import UserList from "../components/UserList";
import ProductList from "../components/ProductList";
import { AddContext } from "../Context/AddContext";
import HeroSlider from "../components/HeroSlider";

const Home = () => {
  const { currentUser } = useContext(AddContext);
  return (
    <div className="min-h-screen mt-20 ">
      <HeroSlider />
      <ProductList />
      {currentUser ? null : <UserList />}
    </div>
  );
};

export default Home;

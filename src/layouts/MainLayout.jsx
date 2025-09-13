import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import NavbarNew from "../components/NavbarNew";
// import Footer from "../components/Footer";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-800">
      {/* <Navbar /> */}
      <NavbarNew />
      <main className="flex-grow ">
        <Outlet /> {/* Nested route renders here */}
      </main>
      {/* <Footer /> */}
    </div>
  );
}

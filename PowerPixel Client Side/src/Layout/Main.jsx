import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../Pages/Home/Components/NavBar";

const Main = () => {
  return (
    <div className="bg-gray-100">
      <NavBar></NavBar>
      <Outlet></Outlet>
    </div>
  );
};

export default Main;

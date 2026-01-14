import React from "react";

const Navbar = () => {
  return (
    <nav className="fixed bg-white top-0 w-full max-w-screen py-5 px-10 shadow-md flex justify-between">
      <div className="text-xl">Logo</div>
      <div>User name</div>
    </nav>
  );
};

export default Navbar;

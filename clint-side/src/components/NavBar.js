import React from "react";
import { Link } from "react-router-dom";
import logo from "../static/netlify-logo.png";
import SearchBar from "../SearchBar";
import DropdownMenu from "./DropdownMenu";
import Sidebar from "./SideBar";
import { useState } from "react";
import LoginModal from "./LoginModal";
const NavBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="z-20 fixed top-0 w-full flex justify-center gap-8 items-center h-24 shadow-xl bg-white p-4">
      <Link to="/">
        <img className="w-10 pt-2" src={logo} alt="" />
      </Link>
      <DropdownMenu />
      <SearchBar />
      <button
        onClick={handleOpenModal}
        className="hidden md:flex justify-center font-bold items-center mt-2 py-3 px-6 rounded-xl text-white bg-[#0D99FF] hover:brightness-75 transition-all"
      >
        Log In
      </button>
      <Sidebar />
      <LoginModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default NavBar;

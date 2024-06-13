import React from "react";
import bg from "../static/header-bg.png";
import ladder from "../static/header-img.png";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
      }}
      className="p-4 h-screen bg-center flex flex-col md:flex-row justify-center items-center"
    >
      <div className="flex flex-col md:text-left mt-14">
        <h1 className="text-6xl font-bold text-gray-700 mb-4">Nerdify</h1>
        <p className="text-xl font-semibold text-gray-700">
          Your Reliable Support, Anytime, Anywhere.
        </p>
        <p className="text-xl font-semibold text-gray-700">Earn as You Learn</p>
        <div className="mt-6">
          <Link to="/courses">
            <button className="hidden md:flex justify-center font-bold items-center mt-2 py-3 px-6 rounded-xl text-white bg-[#0D99FF] hover:brightness-75 transition-all">
              Explore Courses
            </button>
          </Link>
        </div>
      </div>

      <div className="w-72 md:w-80">
        <img src={ladder} alt="" />
      </div>
      <Link to="/courses">
        <button className="md:hidden flex justify-center font-bold items-center mt-2 py-3 px-6 rounded-xl text-white bg-[#0D99FF] hover:brightness-75 transition-all">
          Explore Courses
        </button>
      </Link>
    </div>
  );
};

export default Header;

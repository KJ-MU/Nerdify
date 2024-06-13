import React, { useState } from "react";

const Drawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full px-4 md:px-1 ">
      <ul className="w-full space-y-2 font-medium bg-gray-400 p-2 rounded-xl hover:bg-gray-500">
        <li>
          <button
            type="button"
            onClick={toggleDrawer}
            className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group "
            aria-controls="dropdown-example"
            data-collapse-toggle="dropdown-example"
          >
            <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
              chapter 1
            </span>
            <svg
              className={`w-3 h-3 transform ${isOpen ? "rotate-180" : ""}`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          <ul
            id="dropdown-example"
            className={`py-2 space-y-2 ${isOpen ? "block" : "hidden"}`}
          >
            <li>
              <a
                href="#"
                className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100"
              >
                lessosn1
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100"
              >
                lesson2
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100"
              >
                lesson3
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Drawer;

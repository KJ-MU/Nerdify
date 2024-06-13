import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    console.log("Selected Option:", option);
    // You can add your logic here for handling the selected option
    setIsOpen(false); // Close the dropdown after selecting an option
  };

  return (
    <div
      className="hidden transition-all md:block relative pt-2  text-left"
      ref={dropdownRef}
    >
      <div>
        <button
          type="button"
          className="font-bold inline-flex justify-center w-full rounded-md  px-4 py-2 bg-white text-sm  text-gray-700  focus:border-transparent"
          onClick={toggleDropdown}
        >
          Explore
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 17a1 1 0 01-.707-.293l-5-5a1 1 0 011.414-1.414L10 14.586l4.293-4.293a1 1 0 011.414 1.414l-5 5A1 1 0 0110 17z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-left absolute left-0 mt-2 w-36 text-left rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <Link to="/courses">
              <button
                onClick={() => handleOptionClick("Option 1")}
                className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                All{" "}
              </button>
            </Link>
            <button
              onClick={() => handleOptionClick("Option 2")}
              className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              College{" "}
            </button>

            <button
              onClick={() => handleOptionClick("Option 3")}
              className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              High School
            </button>
            <button
              onClick={() => handleOptionClick("Option 4")}
              className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Other{" "}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;

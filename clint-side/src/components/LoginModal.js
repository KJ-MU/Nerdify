import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

const LoginModal = ({ isOpen, onClose }) => {
  const modalRef = useRef();
  const handleModalClosing = () => {
    onClose();
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalContent = (
    <div className="fixed inset-0  flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        ref={modalRef}
        className="bg-white mx-4 p-8 w-full max-w-md rounded-lg shadow-lg"
      >
        <h2 className="text-2xl mb-6 text-center">Login</h2>
        <form>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="px-6 py-2 bg-[#0D99FF] text-white rounded-md"
            >
              Login
            </button>
          </div>
          <div className="flex justify-center items-center font-medium gap-1 py-2 text-xs">
            <p>Not registered?</p>{" "}
            <Link
              onClick={handleModalClosing}
              to="/sign-in"
              className="text-[#0D99FF] hover:brightness-75 hover:underline"
            >
              Create account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default LoginModal;

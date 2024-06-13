import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginModal from "../components/LoginModal";
const SignInPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [isStudent, setIsStudent] = useState(false);

  const handleUserTypeChange = (event) => {
    const { value } = event.target;
    setUserType(value);
    if (value === "college" || value === "highschool") {
      setIsStudent(true);
    } else {
      setIsStudent(false);
      setSchoolName("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl mb-6 text-center">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="userType"
              className="block text-sm font-medium text-gray-700"
            >
              User Type
            </label>
            <select
              id="userType"
              value={userType}
              onChange={handleUserTypeChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            >
              <option value="">Select User Type</option>
              <option value="college">College Student</option>
              <option value="highschool">High School Student</option>
              <option value="other">Other</option>
            </select>
          </div>
          {isStudent && (
            <div className="mb-4">
              <label
                htmlFor="schoolName"
                className="block text-sm font-medium text-gray-700"
              >
                {userType === "college" ? "College" : "High School"} Name
              </label>
              <input
                type="text"
                id="schoolName"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              />
            </div>
          )}
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="px-6 py-2 bg-[#0D99FF] text-white rounded-md"
            >
              Sign In
            </button>
          </div>
          <div className="flex justify-center items-center font-medium gap-1 py-2 text-xs">
            <p>Already registered?</p>{" "}
            <p
              onClick={handleOpenModal}
              className="text-[#0D99FF] hover:brightness-75 hover:underline"
            >
              Log In{" "}
            </p>
          </div>
        </form>
        <LoginModal isOpen={isModalOpen} onClose={handleCloseModal} />
      </div>
    </div>
  );
};

export default SignInPage;

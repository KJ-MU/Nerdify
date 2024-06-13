import React, { useState } from "react";

const ProfileHeader = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    username: "John Doe",
    email: "johndoe@example.com",
    subscribedCourses: 5,
    watchedTime: "10h 30m",
    image: "https://via.placeholder.com/150",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Handle save logic here
    setIsEditing(false);
  };

  return (
    <div className="w-8/12 mx-auto p-4 bg-white  rounded-lg flex items-center justify-center">
      <div className="w-full md:pr-6 flex flex-col items-center justify-center md:flex-row">
        <div className="w-full flex md:flex-row gap-5 flex-col md:justify-start justify-center items-center md:w-3/4 mt-4">
          <img
            src={user.image}
            alt="User"
            className="w-32 h-32 rounded-full object-cover"
          />
          <div className="flex md:text-left justify-between items-center">
            <div className="flex flex-col justify-start">
              <h2 className="text-2xl font-bold">{user.username}</h2>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-gray-600">
                Lectures: {user.subscribedCourses} | Total Study Time:{" "}
                {user.watchedTime}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleEditClick}
          className="md:self-start px-4 py-2 my-6 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Edit Profile
        </button>
        {isEditing && (
          <form className="mt-4" onSubmit={handleSave}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700">Username</label>
                <input
                  type="text"
                  name="username"
                  value={user.username}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-gray-700">Old Password</label>
                <input
                  type="password"
                  name="oldPassword"
                  value={user.oldPassword}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-gray-700">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={user.newPassword}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-gray-700">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={user.confirmPassword}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Save Changes
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;

import React from "react";
import ProfileHeader from "../components/ProfileHeader";
import { Carousel } from "@material-tailwind/react";
const ProfilePage = () => {
  return (
    <>
      <div className=" flex mt-32 justify-center">
        <ProfileHeader />
      </div>
      <div className="">
        <h2>My Learning</h2>
      </div>
      <div className="">
        <h2>My Courses</h2>
      </div>
    </>
  );
};

export default ProfilePage;

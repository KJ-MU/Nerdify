import React from "react";
import VideoPlayer from "../components/VideoPlayer";
import Drawer from "../components/Drawer";
import ButtonContainer from "../components/ButtonContainer";
import CourseChapters from "../components/CourseChapters";
import { Outlet } from "react-router-dom";
const SingleCoursePage = () => {
  return (
    <div className="md:my-40 my-28 flex md:items-start md:flex-row flex-col justify-center items-center">
      <div className="w-full md:w-2/3 px-10">
        <VideoPlayer
          videoUrl="https://firebasestorage.googleapis.com/v0/b/nerdify-3b431.appspot.com/o/courses-vid%2Fportifolio.mp4?alt=media&token=1d041193-141f-4e87-a882-7bacbc2803c0"
          title="subject math"
        />
        <ButtonContainer />
        <Outlet />
      </div>
      <div className="md:px-2 px-10 flex justify-start items-start w-full md:w-1/3">
        <CourseChapters />
      </div>
    </div>
  );
};

export default SingleCoursePage;

import React from "react";
import Drawer from "./Drawer";
import Subscribe from "./Subscribe";
const CourseChapters = () => {
  return (
    <div className="h-screen w-full">
      <div className="md:px-2 flex flex-col my-5 md:my-0 bg-gray-200 py-5 rounded-xl w-full gap-2 md:h-[450px] md:overflow-y-auto">
        <div className=" flex justify-start items-start w-full ">
          <Drawer />
        </div>
        <div className="flex justify-start items-start w-full ">
          <Drawer />
        </div>
        <div className="flex justify-start items-start w-full ">
          <Drawer />
        </div>
      </div>
      <Subscribe />
    </div>
  );
};

export default CourseChapters;

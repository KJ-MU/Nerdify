import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { searchCoursesByTitle } from "../features/courseSlice";
const SearchBar = () => {
  const [inputValue, setInputValue] = useState("");
  const { courses } = useSelector((state) => state.course);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    dispatch(searchCoursesByTitle(inputValue));
    navigate("/courses");
  };

  return (
    <>
      <div className="pt-2 sm:1/5 w-3/5 md:w-2/6 relative text-gray-600">
        <input
          onChange={handleChange}
          className="border-2 border-gray-300 bg-[#F6F5F5] w-full h-12 px-2 pr-16 rounded-lg text-sm hover:brightness-95 transition-all focus:outline-none"
          placeholder="Search New Courses"
        />
        <button
          onChange={handleSubmit}
          type="submit"
          className="absolute right-0 top-1 mt-5 mr-4"
        >
          <svg
            className="text-gray-600 h-4 w-4 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            version="1.1"
            id="Capa_1"
            x="0px"
            y="0px"
            viewBox="0 0 56.966 56.966"
            style={{ enableBackground: "new 0 0 56.966 56.966" }}
            xmlSpace="preserve"
            width="512px"
            height="512px"
          >
            <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
          </svg>
        </button>
      </div>
    </>
  );
};

export default SearchBar;

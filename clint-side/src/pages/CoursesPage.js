import React, { useState } from "react";
import Card from "../components/Card";
import ReactPaginate from "react-paginate";

const CoursesPage = ({ courses }) => {
  const [currentPage, setCurrentPage] = useState(0); // ReactPaginate uses 0-based index
  const coursesPerPage = 8;

  // Calculate the current courses to display
  const indexOfLastCourse = (currentPage + 1) * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  // Calculate the total number of pages
  const pageCount = Math.ceil(courses.length / coursesPerPage);

  // Handle page change
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="container mx-auto mt-16 py-20 md:px-10 lg:px-0">
      <div className="px-4 py-6 w-full text-3xl text-left font-bold text-gray-700 mb-4">
        Courses
      </div>
      <div className="flex flex-wrap justify-center items-center gap-10 -mx-2">
        {currentCourses.map((course, index) => (
          <Card key={index} course={course} />
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"pagination flex list-none space-x-2"}
          activeClassName={"active"}
          pageClassName={"page-item"}
          pageLinkClassName={
            "page-link px-3 py-1 rounded transition-all bg-gray-200 text-gray-700 hover:bg-gray-300"
          }
          previousClassName={"page-item"}
          previousLinkClassName={
            "page-link px-3 py-1 rounded transition-all bg-gray-200 text-gray-700 hover:bg-gray-300"
          }
          nextClassName={"page-item"}
          nextLinkClassName={
            "page-link px-3 py-1 rounded transition-all bg-gray-200 text-gray-700 hover:bg-gray-300"
          }
          breakLinkClassName={
            "page-link px-3 py-1 rounded transition-all bg-gray-200 text-gray-700"
          }
          disabledClassName={"opacity-50 cursor-not-allowed"}
          activeLinkClassName={"bg-[#0D99FF] text-white"}
        />
      </div>
    </div>
  );
};

export default CoursesPage;

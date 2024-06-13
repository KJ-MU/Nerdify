import React from "react";
import Features from "../components/Features";
import Header from "../components/Header";
import Carousel from "../components/Carousel";
import Card from "../components/Card";
const cards = [
  {
    id: 1,
    subject: "Computer Science",
    studentName: "John Doe",
    rating: 5,
    imageUrl:
      "https://th.bing.com/th/id/OIP.U0SfqHcCr4A3TEW4cIDGOQHaEI?rs=1&pid=ImgDetMain",
    schoolName: "Tech University",
  },
  {
    id: 2,
    subject: "Web Development",
    studentName: "Alice Smith",
    rating: 4,
    imageUrl: "https://example.com/image2.jpg",
    schoolName: "Code Academy",
  },
  {
    id: 3,
    subject: "Data Structures",
    studentName: "Emma Johnson",
    rating: 3,
    imageUrl: "https://example.com/image3.jpg",
    schoolName: "Data Institute",
  },
  {
    id: 4,
    subject: "Machine Learning",
    studentName: "Michael Brown",
    rating: 5,
    imageUrl: "https://example.com/image4.jpg",
    schoolName: "AI Academy",
  },
  {
    id: 5,
    subject: "Artificial Intelligence",
    studentName: "Sophia Wilson",
    rating: 2,
    imageUrl: "https://example.com/image5.jpg",
    schoolName: "Tech Institute",
  },
  {
    id: 6,
    subject: "Software Engineering",
    studentName: "David Lee",
    rating: 4,
    imageUrl: "https://example.com/image6.jpg",
    schoolName: "Dev College",
  },
  {
    id: 7,
    subject: "Database Management",
    studentName: "Olivia Garcia",
    rating: 1,
    imageUrl: "https://example.com/image7.jpg",
    schoolName: "Data School",
  },
  {
    id: 8,
    subject: "Cybersecurity",
    studentName: "Noah Martinez",
    rating: 3,
    imageUrl: "https://example.com/image8.jpg",
    schoolName: "Security Institute",
  },
  {
    id: 9,
    subject: "Mobile App Development",
    studentName: "Sophie Brown",
    rating: 4,
    imageUrl: "https://example.com/image9.jpg",
    schoolName: "App Academy",
  },
  {
    id: 10,
    subject: "Network Administration",
    studentName: "Ethan Davis",
    rating: 5,
    imageUrl: "https://example.com/image10.jpg",
    schoolName: "Networking School",
  },
];
const HomePage = () => {
  return (
    <div>
      <Header />
      <Features />
      <div className=" flex flex-col justify-center items-center my-20">
        <Carousel cards={cards} />
      </div>
    </div>
  );
};

export default HomePage;

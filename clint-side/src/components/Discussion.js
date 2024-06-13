import React, { useState } from "react";
import Modal from "react-modal";
import ReactPaginate from "react-paginate";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import "./styles/Modal.css";
const initialDiscussions = [
  {
    id: 1,
    title: "Discussion 1",
    content: "This is the content for discussion 1.",
    comments: [
      { id: 1, text: "This is a comment on discussion 1." },
      { id: 2, text: "Another comment on discussion 1." },
    ],
  },
  {
    id: 2,
    title: "Discussion 2",
    content: "This is the content for discussion 2.",
    comments: [{ id: 1, text: "This is a comment on discussion 2." }],
  },
  // Add more dummy discussions as needed
];

const Discussions = () => {
  const [discussions, setDiscussions] = useState(initialDiscussions);
  const [newDiscussion, setNewDiscussion] = useState({
    title: "",
    content: "",
  });
  const [newComment, setNewComment] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [activeDiscussions, setActiveDiscussions] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 4;

  const handleAddDiscussion = () => {
    const newId = discussions.length + 1;
    const newDiscussionWithId = { ...newDiscussion, id: newId, comments: [] };
    setDiscussions([newDiscussionWithId, ...discussions]);
    setNewDiscussion({ title: "", content: "" });
    setModalIsOpen(false);
  };

  const handleAddComment = (discussionId) => {
    const updatedDiscussions = discussions.map((discussion) => {
      if (discussion.id === discussionId) {
        return {
          ...discussion,
          comments: [
            ...discussion.comments,
            { id: discussion.comments.length + 1, text: newComment },
          ],
        };
      }
      return discussion;
    });
    setDiscussions(updatedDiscussions);
    setNewComment("");
  };

  const toggleDiscussion = (id) => {
    if (activeDiscussions.includes(id)) {
      setActiveDiscussions(activeDiscussions.filter((dId) => dId !== id));
    } else {
      setActiveDiscussions([...activeDiscussions, id]);
    }
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentDiscussions = discussions.slice(offset, offset + itemsPerPage);

  return (
    <div className="container my-32 text-left mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Discussions</h1>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => setModalIsOpen(true)}
        >
          Add Discussion
        </button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Add Discussion"
        className="modal"
        overlayClassName="overlay"
      >
        <h2 className="text-xl font-semibold mb-2">Start a new discussion</h2>
        <input
          type="text"
          className="w-full p-2 mb-2 border rounded"
          placeholder="Title"
          value={newDiscussion.title}
          onChange={(e) =>
            setNewDiscussion({ ...newDiscussion, title: e.target.value })
          }
        />
        <textarea
          className="w-full p-2 mb-2 border rounded"
          placeholder="Content"
          value={newDiscussion.content}
          onChange={(e) =>
            setNewDiscussion({ ...newDiscussion, content: e.target.value })
          }
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleAddDiscussion}
        >
          Add Discussion
        </button>
      </Modal>

      <div>
        {currentDiscussions.map((discussion) => (
          <div key={discussion.id} className="mb-6 p-4 bg-white rounded shadow">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleDiscussion(discussion.id)}
            >
              <h2 className="text-xl font-semibold">{discussion.title}</h2>
              {activeDiscussions.includes(discussion.id) ? (
                <FaChevronDown />
              ) : (
                <FaChevronRight />
              )}
            </div>

            {activeDiscussions.includes(discussion.id) && (
              <>
                <p className="mb-4">{discussion.content}</p>
                <div className="ml-4 mb-4">
                  {discussion.comments.map((comment) => (
                    <div key={comment.id} className="mb-2">
                      <div className="p-2 bg-gray-100 rounded">
                        {comment.text}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="ml-4">
                  <input
                    type="text"
                    className="w-full p-2 mb-2 border rounded"
                    placeholder="Add a comment"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={() => handleAddComment(discussion.id)}
                  >
                    Add Comment
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {discussions.length > itemsPerPage && (
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={Math.ceil(discussions.length / itemsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
          nextLinkClassName={"nex"}
          previousLinkClassName={"prev"}
          disabledClassName={"disabled"}
          pageClassName={"page"}
        />
      )}
    </div>
  );
};

export default Discussions;

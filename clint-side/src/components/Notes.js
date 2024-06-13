import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // or another theme CSS file

const Notes = () => {
  const [editorHtml, setEditorHtml] = useState("");

  const handleEditorChange = (content) => {
    setEditorHtml(content);
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "align",
    "list",
    "bullet",
    "link",
    "image",
  ];

  return (
    <div className="text-left max-w-full mx-auto mt-8">
      <div className="bg-white md:h-80 rounded-lg shadow-md p-4">
        <ReactQuill
          className="md:h-60"
          theme="snow"
          value={editorHtml}
          onChange={handleEditorChange}
          modules={modules}
          formats={formats}
          placeholder="write notes"
        />
      </div>
    </div>
  );
};

export default Notes;

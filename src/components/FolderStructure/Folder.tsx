import React from "react";
import "../../styles/folder.css";
import { NotesType } from "../../types/types";
import { displayNotes } from "../../utils";

interface FolderProps {
  url: string;
  data: {
    notes: NotesType;
    title: string;
  };
  handleFolderDelete: (url: string) => void;
}

const Folder: React.FC<FolderProps> = ({ url, data, handleFolderDelete }) => {
  const handleMouseOver = () => {
    let tmp = `<button id="myButton">delete</button> </br> </br>`;
    tmp += displayNotes(data.notes);
    const ele = document.getElementById("popover");
    if (ele) {
      ele.innerHTML = tmp;
      document
        .getElementById("myButton")
        ?.addEventListener("click", () => handleFolderDelete(url));
    }
  };

  return (
    <div className="popover__wrapper">
      <a href={url} target="_blank">
        <div
          onMouseOver={handleMouseOver}
          style={{
            border: "1px solid",
            borderColor: "black",
            padding: "2px",
            fontSize: "12px",
            height: "36px",
            width: "72px",
            overflow: "clip",
          }}
        >
          {data.title}
        </div>
      </a>
    </div>
  );
};

export default Folder;

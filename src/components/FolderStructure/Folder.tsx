import React, { useEffect } from "react";
import { NotesType } from "../../types/types";
import { displayNotes } from "../../utils";
import "./folder.css";

interface FolderProps {
  url: string;
  data: {
    notes: NotesType;
    title: string;
  };
}

const Folder: React.FC<FolderProps> = ({ url, data }) => {
  useEffect(() => {
    const tmp = displayNotes(data.notes);
    const ele = document.getElementById("notes");
    if (ele) {
      ele.innerHTML = tmp;
    }
  }, [url]);

  return (
    <div className="popover__wrapper">
      <a href="#">
        <div
          style={{
            border: "1px solid",
            borderColor: "black",
            padding: "16px",
            fontSize: "12px",
            height: "36px",
            width: "100px",
            overflow: "clip",
          }}
        >
          {data.title}
        </div>
      </a>
      <div className="popover__content">
        <div className="popover__message" id={"notes"}></div>
      </div>
    </div>
  );
};

export default Folder;

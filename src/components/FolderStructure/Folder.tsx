import React from "react";
import { NotesType } from "../../types/types";

interface FolderProps {
  url: string;
  title: string;
  notes: NotesType;
}

const Folder: React.FC<FolderProps> = ({ url, notes, title }) => {
  return (
    <div style={{ border: "1px", padding: "20px", fontSize: "12px" }}>
      {title}
    </div>
  );
};

export default Folder;

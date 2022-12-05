import React from "react";
import { DataType } from "../../types/types";
import Folder from "./Folder";

interface FolderStructureProps {
  data: DataType;
}

const FolderStructure: React.FC<FolderStructureProps> = ({ data }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "auto auto auto",
        backgroundColor: "blanchedalmond",
        gap: "4px",
      }}
    >
      {Object.keys(data).map(function (key) {
        return <Folder url={key} data={data[key]} />;
      })}
    </div>
  );
};

export default FolderStructure;

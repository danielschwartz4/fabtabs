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
      }}
    >
      {Object.keys(data).map(function (key) {
        return (
          <Folder
            key={key}
            title={data[key]["title"]}
            url={key}
            notes={data[key]["notes"]}
          />
        );
      })}
    </div>
  );
};

export default FolderStructure;

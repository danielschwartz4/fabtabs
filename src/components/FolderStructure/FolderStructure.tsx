import React from "react";
import "../../styles/folder.css";
import { DataType } from "../../types/types";
import Folder from "./Folder";

interface FolderStructureProps {
  data: DataType;
  setData: React.Dispatch<React.SetStateAction<DataType | undefined>>;
}

const FolderStructure: React.FC<FolderStructureProps> = ({ data, setData }) => {
  const handleFolderDelete = async (url: string) => {
    delete data[url];
    chrome.storage.local.set({ data: data });
    // !! This doesn't work
    setData(data);
    return;
  };

  return (
    <div>
      Folders:
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto auto auto auto",
          rowGap: 0,
          backgroundColor: "burlywood",
          gap: "2px",
          maxHeight: "200px",
          overflow: "scroll",
        }}
      >
        {Object.keys(data).map(function (key, i) {
          return (
            <Folder
              key={i}
              handleFolderDelete={handleFolderDelete}
              url={key}
              data={data[key]}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FolderStructure;

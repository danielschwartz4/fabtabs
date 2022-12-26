import React from "react";
import { BsTrash } from "react-icons/bs";

interface PopoverProps {}

const Popover: React.FC<PopoverProps> = ({}) => {
  const handleMouseLeave = () => {
    const ele = document.getElementById("popover");
    if (ele) {
      ele.innerHTML = "";
    }
  };

  return (
    <div onMouseLeave={handleMouseLeave} className="popover__content">
      <div id={"popover"}>{/* <BsTrash></BsTrash> */}</div>
    </div>
  );
};

export default Popover;

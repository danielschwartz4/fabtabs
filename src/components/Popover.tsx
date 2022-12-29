import { Box } from "@chakra-ui/react";
import React from "react";

interface PopoverProps {}

const Popover: React.FC<PopoverProps> = ({}) => {
  const handleMouseLeave = () => {
    const ele = document.getElementById("popover");
    if (ele) {
      ele.innerHTML = "";
    }
  };

  return (
    <Box
      onMouseLeave={handleMouseLeave}
      className="popover__content"
      style={{
        boxShadow:
          "0 8px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      }}
    >
      <Box id={"popover"}></Box>
    </Box>
  );
};

export default Popover;

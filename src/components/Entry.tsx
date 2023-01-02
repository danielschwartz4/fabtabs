import { Box, Text } from "@chakra-ui/react";
import React from "react";

interface EntryProps {
  text: string;
  uuid?: string;
  canClick?: boolean;
}

const Entry: React.FC<EntryProps> = ({ text, uuid, canClick }) => {
  const showHighlight = (uuid: string) => {
    console.log("HERE");
    console.log(uuid);
    chrome.runtime.sendMessage({
      action: "show-highlight",
      arguments: uuid,
    });
  };

  return (
    <Box
      bgColor={"white"}
      borderRadius={"4px"}
      fontSize={"14px"}
      whiteSpace={"nowrap"}
      textOverflow={"ellipsis"}
      padding={"8px"}
      textColor={"#170F47"}
      cursor={"pointer"}
    >
      <Text
        onClick={() => {
          if (canClick && uuid) showHighlight(uuid);
        }}
        padding={2}
        my={"auto"}
        isTruncated
      >
        {text}
      </Text>
    </Box>
  );
};

export default Entry;

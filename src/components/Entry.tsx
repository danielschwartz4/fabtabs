import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { GrClose } from "react-icons/gr";

interface EntryProps {
  text: string;
  uuid?: string;
  canClick?: boolean;
  handleFolderDelete?: (url: string) => void;
}

const Entry: React.FC<EntryProps> = ({
  text,
  uuid,
  canClick,
  handleFolderDelete,
}) => {
  const showHighlight = (uuid: string) => {
    chrome.runtime.sendMessage({
      action: "show-highlight",
      arguments: uuid,
    });
  };

  return (
    <Flex
      bgColor={"white"}
      borderRadius={"4px"}
      fontSize={"14px"}
      whiteSpace={"nowrap"}
      textOverflow={"ellipsis"}
      padding={"8px"}
      textColor={"#170F47"}
      cursor={"pointer"}
      alignItems={"center"}
      justify={"space-between"}
    >
      <Text
        onClick={() => {
          if (canClick && uuid) showHighlight(uuid);
        }}
        padding={2}
        my={"auto"}
        width={"260px"}
        overflow={"hidden"}
        textOverflow={"ellipsis"}
        isTruncated
      >
        {text}
      </Text>
      {handleFolderDelete && uuid ? (
        <GrClose
          onClick={() => {
            if (handleFolderDelete && uuid) handleFolderDelete(uuid);
          }}
          color="grey"
          cursor={"pointer"}
        />
      ) : null}
    </Flex>
  );
};

export default Entry;

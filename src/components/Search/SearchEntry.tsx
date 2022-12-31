import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { Highlight } from "../../types/types";

interface SearchEntryProps {
  type: "highlight" | "page";
  highlight: Highlight;
}

const SearchEntry: React.FC<SearchEntryProps> = ({ type, highlight }) => {
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
      <Text padding={2} my={"auto"}>
        {type === "highlight" ? highlight.string : highlight.href}
      </Text>
    </Box>
  );
};

export default SearchEntry;

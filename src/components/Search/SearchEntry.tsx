import { Box, Link, Text } from "@chakra-ui/react";
import React from "react";
import { Highlight } from "../../types/types";

interface SearchEntryProps {
  type: "highlight" | "page";
  highlight: Highlight;
  href: string;
}

const SearchEntry: React.FC<SearchEntryProps> = ({ type, highlight, href }) => {
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
        <a href={href} target="_blank">
          {type === "highlight" ? highlight.string : highlight.href}
        </a>
      </Text>
    </Box>
  );
};

export default SearchEntry;

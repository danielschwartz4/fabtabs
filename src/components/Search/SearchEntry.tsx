import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { centerSearchWord } from "../../utils/searchUtiils";

interface SearchEntryProps {
  href: string;
  text: string;
  searchVal: string;
}

const SearchEntry: React.FC<SearchEntryProps> = ({ href, text, searchVal }) => {
  const processedText = centerSearchWord(text, searchVal);
  // const tmp = processedText.split(new RegExp(searchVal, "i"));
  const tmp = processedText.split(new RegExp(`${searchVal}(.*)`, "i"));
  console.log(tmp);

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
          {tmp[0]}{" "}
          <span style={{ color: "red" }}>{searchVal.toLocaleLowerCase()}</span>
          {tmp[1]}
        </a>
      </Text>
      <Text color={"#8C8C8C"} mb={"4px"}>
        {href}
      </Text>
    </Box>
  );
};

export default SearchEntry;

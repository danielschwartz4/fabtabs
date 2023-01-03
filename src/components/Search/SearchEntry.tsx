import { Box, Flex, Text, Image } from "@chakra-ui/react";
import React from "react";
import { centerSearchWord } from "../../utils/searchUtiils";

interface SearchEntryProps {
  href: string;
  text: string;
  searchVal: string;
  favicon?: string;
}

const SearchEntry: React.FC<SearchEntryProps> = ({
  href,
  text,
  searchVal,
  favicon,
}) => {
  const processedText = centerSearchWord(text, searchVal);
  const tmp = processedText.split(new RegExp(`${searchVal}(.*)`, "i"));
  const showHighlight = (uuid: string) => {
    console.log("hello");
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
      padding={"8px"}
      textColor={"#170F47"}
      cursor={"pointer"}
    >
      <a href={href} target="_blank">
        <Flex gap={"8px"}>
          {favicon ? <Image boxSize={"18px"} src={favicon} alt="" /> : null}
          <Text padding={2} my={"auto"} isTruncated>
            {tmp[0]}{" "}
            <span style={{ color: "red" }}>
              {searchVal.toLocaleLowerCase()}
            </span>
            {tmp[1]}
          </Text>
        </Flex>
        {/* {currentUrl != href?.substring(href.indexOf("//") + 2) ? (
        <Text padding={2} my={"auto"}>
          <a href={href} target="_blank">
            {tmp[0]}{" "}
            <span style={{ color: "red" }}>
              {searchVal.toLocaleLowerCase()}
            </span>
            {tmp[1]}
          </a>
        </Text>
      ) : (
        <Text
          onClick={() => showHighlight("7b951d73-5502-44b6-b158-9ae55755a040")}
          padding={2}
          my={"auto"}
        >
          {tmp[0]}{" "}
          <span style={{ color: "red" }}>{searchVal.toLocaleLowerCase()}</span>
          {tmp[1]}
        </Text>
      )} */}

        <Text isTruncated color={"#8C8C8C"} mb={"4px"}>
          {href}
        </Text>
      </a>
    </Box>
  );
};

export default SearchEntry;

import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { centerSearchWord } from "../../utils/searchUtiils";
import { getCurrentTab } from "../../utils/utils";

interface SearchEntryProps {
  href: string;
  text: string;
  searchVal: string;
  currentUrl: string | undefined;
}

const SearchEntry: React.FC<SearchEntryProps> = ({
  href,
  text,
  searchVal,
  currentUrl,
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
      whiteSpace={"nowrap"}
      textOverflow={"ellipsis"}
      padding={"8px"}
      textColor={"#170F47"}
      cursor={"pointer"}
    >
      <a href={href} target="_blank">
        <Text padding={2} my={"auto"}>
          {tmp[0]}{" "}
          <span style={{ color: "red" }}>{searchVal.toLocaleLowerCase()}</span>
          {tmp[1]}
        </Text>

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

        <Text color={"#8C8C8C"} mb={"4px"}>
          {href}
        </Text>
      </a>
    </Box>
  );
};

export default SearchEntry;

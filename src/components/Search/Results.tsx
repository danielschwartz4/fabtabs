import { Box, Stack } from "@chakra-ui/react";
import React from "react";
import { Highlight, PageGroup } from "../../types/types";
import Title from "../Title";
import SearchEntry from "./SearchEntry";

interface ResultsProps {
  searchVal: string;
  highlightData: Highlight[] | undefined;
  titleData: PageGroup[] | undefined;
  currentUrl: string | undefined;
}

const Results: React.FC<ResultsProps> = ({
  searchVal,
  highlightData,
  titleData,
  currentUrl,
}) => {
  console.log("titleData", titleData);
  console.log("pageData");

  return (
    <Box
      h={"567px"}
      overflow={"scroll"}
      borderRadius={"4px"}
      padding={4}
      bgColor="#F3F2F9"
    >
      <Title text="pages" />
      <Stack overflow={"scroll"} borderRadius={"4px"} padding={4}>
        {titleData && titleData.length > 0 ? (
          titleData.map((val: PageGroup, idx: number) => {
            return (
              <SearchEntry
                key={idx}
                href={val.highlights[0].href}
                text={val.title}
                searchVal={searchVal}
                favicon={val.favicon}
              />
            );
          })
        ) : (
          <Title text="no page matches" />
        )}
      </Stack>
      <Title text="highlights"></Title>
      <Stack overflow={"scroll"} borderRadius={"4px"} padding={4}>
        {highlightData && highlightData.length > 0 ? (
          highlightData.map((val: Highlight, idx: number) => {
            return (
              <SearchEntry
                key={idx}
                href={val.href}
                text={val.string}
                searchVal={searchVal}
              />
            );
          })
        ) : (
          <Title text="no highlight" />
        )}
      </Stack>
    </Box>
  );
};

export default Results;

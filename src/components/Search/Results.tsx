import { Box, Stack } from "@chakra-ui/react";
import React from "react";
import { DataType, Highlight, PageGroup } from "../../types/types";
import Entry from "../Entry";
import Title from "../Title";
import SearchEntry from "./SearchEntry";

interface ResultsProps {
  // filteredData: Highlight[];
  highlightData: Highlight[] | undefined;
  titleData: PageGroup[] | undefined;
}

const Results: React.FC<ResultsProps> = ({ highlightData, titleData }) => {
  console.log("titleData", titleData);
  console.log("pageData");

  return (
    <Box
      h={"567px"}
      // overflow={"scroll"}
      borderRadius={"4px"}
      padding={4}
      bgColor="#F3F2F9"
    >
      <Title text="pages"></Title>
      <Stack overflow={"scroll"} borderRadius={"4px"} padding={4}>
        {titleData && titleData.length > 0 ? (
          titleData.map((val: PageGroup, idx: number) => {
            console.log("HERE", val.highlights);
            return (
              <SearchEntry
                key={idx}
                type="page"
                highlight={val.highlights[0]}
                href={val.highlights[0].href}
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
                type="highlight"
                highlight={val}
                href={val.href}
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

import { Box, Stack } from "@chakra-ui/react";
import React from "react";
import { Highlight } from "../../types/types";
import Entry from "../Entry";
import Title from "../Title";
import SearchEntry from "./SearchEntry";

interface ResultsProps {
  // filteredData: Highlight[];
  highlightData: Highlight[] | undefined;
  pageData: Highlight[] | undefined;
}

const Results: React.FC<ResultsProps> = ({ highlightData, pageData }) => {
  console.log("highlightData", highlightData);
  console.log("pageData", pageData);

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
        {highlightData && highlightData.length > 0 ? (
          highlightData.map((val: any, idx: number) => {
            return <SearchEntry type="page" highlight={val}></SearchEntry>;
          })
        ) : (
          <Title text="no page matches" />
        )}
      </Stack>
      <Title text="highlights"></Title>
      <Stack overflow={"scroll"} borderRadius={"4px"} padding={4}>
        {pageData && pageData.length > 0 ? (
          pageData.map((val: any, idx: number) => {
            return <SearchEntry type="highlight" highlight={val}></SearchEntry>;
          })
        ) : (
          <Title text="no highlight" />
        )}
      </Stack>
    </Box>
  );
};

export default Results;

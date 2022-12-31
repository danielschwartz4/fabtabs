import { Stack } from "@chakra-ui/react";
import React from "react";
import { Highlight } from "../types/types";
import Entry from "./Entry";
import Title from "./Title";

interface HighlightListProps {
  highlights: Highlight[];
}

const HighlightList: React.FC<HighlightListProps> = ({ highlights }) => {
  return (
    <>
      {highlights ? (
        <Stack overflow={"scroll"} borderRadius={"4px"} padding={4}>
          <Title text={"highlights on selected page"} />
          {highlights.map(function (h, i) {
            return <Entry key={i} text={h.string} uuid={h.uuid} canClick />;
          })}
        </Stack>
      ) : null}
    </>
  );
};
export default HighlightList;

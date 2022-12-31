import { Stack } from "@chakra-ui/react";
import React from "react";
import { Highlight } from "../types/types";
import Entry from "./Entry";
import Title from "./Title";

interface HighlightListProps {
  title: string;
  highlights: Highlight[];
}

const HighlightList: React.FC<HighlightListProps> = ({ title, highlights }) => {
  return (
    <>
      {highlights ? (
        <Stack
          maxH={"300px"}
          overflow={"scroll"}
          borderRadius={"4px"}
          padding={4}
        >
          <Title text={title} />
          {highlights.map(function (h, i) {
            return <Entry key={i} text={h.string} uuid={h.uuid} canClick />;
          })}
        </Stack>
      ) : null}
    </>
  );
};
export default HighlightList;

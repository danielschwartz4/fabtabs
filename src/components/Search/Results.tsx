import { Box } from "@chakra-ui/react";
import React from "react";

interface ResultsProps {
  filteredData: any;
}

const Results: React.FC<ResultsProps> = ({ filteredData }) => {
  return (
    <Box
      h={"567px"}
      overflow={"scroll"}
      borderRadius={"4px"}
      padding={4}
      bgColor="#F3F2F9"
    >
      <Box>
        {/* val changes depending on coming from stringResult or href result */}
        {filteredData && filteredData.length > 0 ? (
          filteredData.map((val: any, idx: number) => {
            return <Box key={idx}>- {val.string}</Box>;
          })
        ) : (
          <Box>Nothing matching</Box>
        )}
      </Box>
    </Box>
  );
};

export default Results;

import { Box } from "@chakra-ui/react";
import React from "react";

interface ResultsProps {
  filteredData: any;
}

const Results: React.FC<ResultsProps> = ({ filteredData }) => {
  console.log("filteredData", filteredData);
  return (
    <Box
      style={{
        boxShadow:
          "rgb(0 0 0 / 80%) 0px 4px 8px 0px, rgb(0 0 0 / 30%) 0px 6px 20px 8px",
      }}
      h={"200px"}
      overflow={"scroll"}
      borderRadius={"4px"}
      padding={4}
      bgColor="white"
    >
      <Box>
        {filteredData && filteredData.length > 0 ? (
          filteredData.map((val: any, idx: number) => {
            console.log(val);
            return <Box key={idx}>{val[0]}</Box>;
          })
        ) : (
          <Box>Nothing matching</Box>
        )}
      </Box>
    </Box>
  );
};

export default Results;

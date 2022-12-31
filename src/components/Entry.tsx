import { Box, Text } from "@chakra-ui/react";
import React from "react";

interface EntryProps {
  text: string;
}

const Entry: React.FC<EntryProps> = ({ text }) => {
  return (
    <Box
      bgColor={"white"}
      borderRadius={"4px"}
      fontSize={"14px"}
      whiteSpace={"nowrap"}
      textOverflow={"ellipsis"}
      padding={"8px"}
      textColor={"#170F47"}
    >
      <Text padding={2} my={"auto"}>
        {text}
      </Text>
    </Box>
  );
};

export default Entry;

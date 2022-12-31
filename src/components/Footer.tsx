import { Flex, Text } from "@chakra-ui/react";
import React from "react";

interface FooterProps {}

const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <Flex
      mb={"8px"}
      h={"24px"}
      justify={"space-between"}
      mx={"-8px"}
      bgColor={"white"}
      textColor={"#8C8C8C"}
    >
      <Text m={"8px"} ml={"8px"}>
        made by Daniel and Olivia
      </Text>
      <Text m={"8px"} mr={"8px"}>
        highlight with cmd/ctrl+h
      </Text>
    </Flex>
  );
};

export default Footer;

import { Flex, Text } from "@chakra-ui/react";
import React from "react";

interface FooterProps {}

const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <Flex justify={"space-between"} textColor={"#8C8C8C"}>
      <Text m={"0px"} ml={"8px"}>
        {/* made by Daniel and Olivia */}
        made by Daniel
      </Text>
      <Text m={"0px"} mr={"8px"}>
        highlight with cmd/ctrl+h
      </Text>
    </Flex>
  );
};

export default Footer;

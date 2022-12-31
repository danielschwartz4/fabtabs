import { Text } from "@chakra-ui/react";
import React from "react";

interface TitleProps {
  text: string;
}

const Title: React.FC<TitleProps> = ({ text }) => {
  return (
    <Text position={"static"} textColor={"#453F68"} fontSize={"14px"}>
      {text}
    </Text>
  );
};

export default Title;

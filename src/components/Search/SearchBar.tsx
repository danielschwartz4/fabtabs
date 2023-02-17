import { Box, Input } from "@chakra-ui/react";
import React from "react";

interface SearchBarProps {
  setSearchVal: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: React.FC<SearchBarProps> = ({ setSearchVal }) => {
  const handleChange = (value: string) => {
    setSearchVal(value);
  };

  return (
    <Box>
      <Input
        autoFocus
        variant="outline"
        onChange={(e) => handleChange(e.target.value)}
        placeholder="  🔍 search for a page or highlight"
        borderRadius={"4px"}
        fontSize={"14px"}
        w={"-webkit-fill-available"}
        h={"32px"}
        border={0}
      />
    </Box>
  );
};

export default SearchBar;

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
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Basic usage"
      />
    </Box>
  );
};

export default SearchBar;

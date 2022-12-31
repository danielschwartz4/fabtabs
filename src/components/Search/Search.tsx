import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { DataType } from "../../types/types";
import { JsonFilter } from "../../utils/parseJson";
import Results from "./Results";
import SearchBar from "./SearchBar";

interface SearchProps {
  data: DataType | undefined;
}

const Search: React.FC<SearchProps> = ({ data }) => {
  const [searchVal, setSearchVal] = useState<string>("");
  const [filtered, setFiltered] = useState<DataType>();

  const regex = new RegExp(`.*${searchVal}.*`, "i");

  const stringFilter = {
    string: regex,
  };

  const hrefFilter = {
    href: regex,
  };

  useEffect(() => {
    let filtered: any;
    if (data) {
      // filtered = Object.entries(data).filter(([key, val]) => regex.test(key));
      // !! Map these two separately and display separately
      const stringResult = JsonFilter(data, stringFilter);
      const hrefResult = JsonFilter(data, hrefFilter);
      filtered = [...new Set([...stringResult.all(), ...hrefResult.all()])];
    }
    setFiltered(filtered);
  }, [searchVal]);

  return (
    <>
      <SearchBar setSearchVal={setSearchVal}></SearchBar>
      {searchVal ? (
        <Box width={"inherit"}>
          <Box width={"inherit"} zIndex={10} position={"absolute"}>
            {data ? <Results filteredData={filtered}></Results> : null}
          </Box>
        </Box>
      ) : (
        <></>
      )}
    </>
  );
};

export default Search;

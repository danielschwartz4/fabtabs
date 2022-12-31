import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { DataType, Highlight } from "../../types/types";
import { JsonFilter } from "../../utils/parseJson";
import Title from "../Title";
import Results from "./Results";
import SearchBar from "./SearchBar";

interface SearchProps {
  data: DataType | undefined;
}

const Search: React.FC<SearchProps> = ({ data }) => {
  const [searchVal, setSearchVal] = useState<string>("");
  const [highlightData, setHighlightData] = useState<Highlight[]>();
  const [pageData, setPageData] = useState<Highlight[]>();

  const regex = new RegExp(`.*${searchVal}.*`, "i");

  const stringFilter = {
    string: regex,
  };

  const hrefFilter = {
    href: regex,
  };

  useEffect(() => {
    let filtered: any;
    let hd: Highlight[] | undefined;
    let pd: Highlight[] | undefined;
    if (data) {
      // filtered = Object.entries(data).filter(([key, val]) => regex.test(key));
      // !! Map these two separately and display separately
      const stringResult = JsonFilter(data, stringFilter);
      hd = stringResult.all();
      const hrefResult = JsonFilter(data, hrefFilter);
      pd = hrefResult.all();

      // filtered = [...new Set([...stringResult.all(), ...hrefResult.all()])];
    }
    setHighlightData(hd);
    setPageData(pd);
    // setFiltered(filtered);
  }, [searchVal]);

  return (
    <>
      <SearchBar setSearchVal={setSearchVal}></SearchBar>
      {searchVal ? (
        <Box width={"inherit"}>
          {highlightData || pageData ? (
            <Box width={"inherit"} zIndex={10} position={"absolute"}>
              {data ? (
                <Results highlightData={highlightData} pageData={pageData} />
              ) : null}
            </Box>
          ) : (
            <Title text="no matches" />
          )}
        </Box>
      ) : (
        <></>
      )}
    </>
  );
};

export default Search;

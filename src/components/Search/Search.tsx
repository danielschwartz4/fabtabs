import { Box } from "@chakra-ui/react";
import { contains } from "jquery";
import React, { useEffect, useState } from "react";
import { DataType, Highlight, PageGroup } from "../../types/types";
import { JsonFilter } from "../../utils/parseJson";
import Title from "../Title";
import Results from "./Results";
import SearchBar from "./SearchBar";

interface SearchProps {
  data: DataType | undefined;
  currentUrl?: string | undefined;
}

const Search: React.FC<SearchProps> = ({ data, currentUrl }) => {
  const [searchVal, setSearchVal] = useState<string>("");
  const [highlightData, setHighlightData] = useState<Highlight[]>();
  const [titleData, setTitleData] = useState<PageGroup[]>();
  const [commentData, setCommentData] = useState<Highlight[]>();

  // const [pageData, setPageData] = useState<Highlight[]>();

  const regex = new RegExp(`.*${searchVal}.*`, "i");

  const stringFilter = {
    string: regex,
  };

  const titleFilter = {
    title: regex,
  };

  const commentFilter = {
    comment: regex,
  };

  useEffect(() => {
    let hd: Highlight[] | undefined;
    let td: PageGroup[] | undefined;
    let cd: Highlight[] | undefined;
    if (data) {
      // !! Map these two separately and display separately
      const titeResult = JsonFilter(data, titleFilter);
      td = titeResult.all();
      const stringResult = JsonFilter(data, stringFilter);
      hd = stringResult.all();
      const commentResult = JsonFilter(data, commentFilter);
      cd = commentResult.all();
    }
    setHighlightData(hd);
    setTitleData(td);
    setCommentData(cd);
  }, [searchVal]);

  return (
    <>
      <SearchBar setSearchVal={setSearchVal} />
      {searchVal ? (
        <Box width={"inherit"}>
          {highlightData || titleData ? (
            <Box width={"inherit"} zIndex={10} position={"absolute"}>
              {data ? (
                <Results
                  searchVal={searchVal}
                  highlightData={highlightData}
                  commentData={commentData}
                  titleData={titleData}
                  currentUrl={currentUrl}
                />
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

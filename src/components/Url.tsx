import React, { useEffect, useState } from "react";

interface urlProps {
  v: string;
}

const Url: React.FC<urlProps> = ({ v }) => {
  const [url, setUrl] = useState<string>("");

  /**
   * Get current URL
   */
  useEffect(() => {
    const queryInfo = { active: true, lastFocusedWindow: true };

    chrome.tabs &&
      chrome.tabs.query(queryInfo, (tabs) => {
        const _url = tabs[0].url;
        console.log(_url);
        if (_url) {
          setUrl(_url);
        }
      });
  }, []);

  return <div>URL: {url}</div>;
};

export default Url;

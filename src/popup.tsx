import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { displayNotes } from "./utils";

interface PopupProps {
  data: { [url: string]: { [note: string]: { posUrl: string } } };
}

const Popup: React.FC<PopupProps> = ({ data }) => {
  const [currentURL, setCurrentURL] = useState<string>();
  // const [notes, setNotes] = useState<{ [note: string]: {} }>();
  const [notes, setNotes] = useState<string>();

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      setCurrentURL(tabs[0].url);
    });
  }, []);

  useEffect(() => {
    if (!currentURL) {
      return;
    }
    // setNotes(data[currentURL]);
    const tmp = displayNotes(data[currentURL]);
    // setNotes(tmp);
    const ele = document.getElementById("notes");
    if (ele) {
      // ele.addEventListener("click", openIndex);
      ele.innerHTML = tmp;
    }
  }, [currentURL]);

  chrome.storage.onChanged.addListener((changes, namespace) => {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
      console.log(
        `Storage key "${key}" in namespace "${namespace}" changed.`,
        `Old value was "${oldValue}", new value is "${newValue}".`
      );
    }
  });
  const x = "yoyoyoy";

  return (
    <>
      <ul style={{ minWidth: "700px" }}>
        <li>Current URL: {currentURL}</li>
        <li>Current Time: {new Date().toLocaleTimeString()}</li>
      </ul>
      <div>
        {data[currentURL as string] ? <div id={"notes"}></div> : "NO NOTES"}
      </div>
    </>
  );
};

export default Popup;

chrome.storage.local.get(function (data) {
  console.log("yo");
  console.log(data);
  ReactDOM.render(
    <React.StrictMode>
      <Popup data={data.data} />
    </React.StrictMode>,
    document.getElementById("root")
  );
});

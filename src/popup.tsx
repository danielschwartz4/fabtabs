import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface PopupProps {
  text: string;
}

const Popup: React.FC<PopupProps> = ({ text }) => {
  const [count, setCount] = useState(0);
  const [currentURL, setCurrentURL] = useState<string>();
  const [selectionText, setSelectionText] = useState<string>();

  useEffect(() => {
    chrome.action.setBadgeText({ text: count.toString() });
  }, [count]);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      setCurrentURL(tabs[0].url);
    });
  }, []);
  console.log(text);

  chrome.storage.onChanged.addListener((changes, namespace) => {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
      console.log(
        `Storage key "${key}" in namespace "${namespace}" changed.`,
        `Old value was "${oldValue}", new value is "${newValue}".`
      );
    }
  });

  const changeBackground = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      console.log(tabs);
      const tab = tabs[0];
      if (tab.id) {
        chrome.tabs.sendMessage(
          tab.id,
          {
            color: "#555555",
          },
          (msg) => {
            console.log("result message:", msg);
          }
        );
      }
    });
  };

  return (
    <>
      <ul style={{ minWidth: "700px" }}>
        <li>Current URL: {currentURL}</li>
        <li>Current Time: {new Date().toLocaleTimeString()}</li>
      </ul>
      <button
        onClick={() => {
          setCount(count + 1);
          console.log(count);
        }}
        style={{ marginRight: "5px" }}
      >
        count up
      </button>
      <button onClick={changeBackground}>change background</button>
      <div>{text}</div>
    </>
  );
};

export default Popup;

chrome.storage.local.get(function (data) {
  console.log("yo");
  console.log(data);
  ReactDOM.render(
    <React.StrictMode>
      <Popup text={data.text} />
    </React.StrictMode>,
    document.getElementById("root")
  );
});

import Head from "next/head";
import styles from "../styles/Home.module.css";
import React from "react";
export default function Home() {
  const [port, setPort] = React.useState(null);
  const debouncedPortVal = useDebounce(port, 500);
  const [command, setCommand] = React.useState(formatCopyCommand(port));
  const commandRef = React.useRef(null);
  const portRef = React.useRef(null);
  const [copied, setCopied] = React.useState(false);
  const copyOnChange = (e) => {
    e.preventDefault();
    setCopied(false);
    setPort(e.target.value);
  };
  function copyCode() {
    setCopied(true);
    commandRef.current.select();
    document.execCommand("copy");
  }
  function inputPress(e) {
    if(portRef.current === document.activeElement && e.charCode === 13){
      copyCode()
    }
  }
  React.useEffect(() => {
    setCommand(formatCopyCommand(port));
  }, [port]);

  React.useEffect(() => {
    if (portRef.current) {
      portRef.current.focus();
    }
  }, [portRef.current]);
  return (
    <div 
    className="min-h-screen h-full flex flex-col items-center justify-center relative">
      {/* <div className="absolute w-full h-full bg-gray-800 bg-opacity-20"></div> */}

      <div className="m-auto h-full w-full max-w-prose flex flex-col items-center justify-center space-y-3">
        <div className="flex flex-col font-mono w-full relative">
          <h1 className="text-4xl font-extralight mb-4 font-serif">
            kill process on port {port}
          </h1>

          <input
            className="absolute opacity-0 pointer-events-none -left-full"
            value={command}
            ref={commandRef}
            readOnly
            type="text"
          />
          <input
            max={65535}
            min={0}
            autoFocus={true}
            onChange={copyOnChange}
            onKeyPress={inputPress}
            ref={portRef}
            value={port}
            className="text-lg flex-1 p-2 border-black focus:outline-none focus:ring focus:ring-green-200 border-solid border-2"
            placeholder="port number"
            type="number"
          />
        </div>
        <div className="w-full text-sm font-serif space-x-2 flex">
          <div>1.) copy command below </div>
          <div>2.) paste in terminal</div>
        </div>
        <code
          onClick={copyCode}
          className="bg-gray-800 hover:bg-gray w-full cursor-pointer p-2 text-white text-sm flex flex-row items-center justify-between"
        >
          <div>
            <span className="select-none">~ </span>
            {command}
          </div>
          {port && (
            <button
              onClick={copyCode}
              className="select-none flex flex-row items-center space-x-1 focus:outline-none  focus:ring-1 rounded-  focus:ring-green-200 px-2"
            >
              <svg
                className="h-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <span>{copied ? "copied!" : "copy"}</span>
            </button>
          )}
        </code>
      </div>
    </div>
  );
}

function formatCopyCommand(port) {
  return `lsof -ti :${port || "{PORT}"} | xargs kill`;
}

// Credit to ... https://usehooks.com/useDebounce/
function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );

  return debouncedValue;
}

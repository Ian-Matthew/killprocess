import Head from "next/head";
import styles from "../styles/Home.module.css";
import React from "react";
import { useDebounce } from "../utils/hooks";
import * as NextLink from "next/link";
export default function Home() {
  // Track port
  const [port, setPort] = React.useState(null);
  // Debounce the value, so format hook doesn't run every change
  const debouncedPortVal = useDebounce(port, 150);
  // generated command
  const command = React.useMemo(() => formatCopyCommand(debouncedPortVal), [
    debouncedPortVal,
  ]);
  // ref to the hidden command input (browser can only copy from a "selected" input)
  const commandCopyRef = React.useRef(null);
  // port ref used for triggiring the copy function when input has focus
  const portInputRef = React.useRef(null);
  // has the user copied the code? used to render "copy" vs "copied" in UI
  const [copied, setCopied] = React.useState(false);

  //Change handler for for port input
  function copyOnChange(e) {
    e.preventDefault();
    setCopied(false);
    setPort(e.target.value);
  }
  // function to copy the command from hidden input to the clipboard
  function copyCode() {
    setCopied(true);
    commandCopyRef.current.select();
    document.execCommand("copy");
  }
  // watch the inpur ref -- if enter is pressed while focus, trigger copy
  function inputPress(e) {
    if (portInputRef.current === document.activeElement && e.charCode === 13) {
      copyCode();
    }
  }

  // By default focus on the portInput on load
  React.useEffect(() => {
    if (portInputRef.current) {
      portInputRef.current.focus();
    }
  }, [portInputRef.current]);

  return (
    <div className="min-h-screen h-full flex flex-col items-center justify-center relative mx-5">
      <div className="flex flex-row w-full justify-end items-center max-w-screen-xl mt-5">
        <div className="flex flex-row items-center space-x-3 ">
          <div className="font-bold cursor-pointer">home</div>
          <div className="cursor-pointer">bash script</div>
          <div className="cursor-pointer">about</div>
          <div className="cursor-not-allowed  text-black text-opacity-50">
            windows <span className="text-xs">(coming soon...)</span>
          </div>
        </div>
      </div>
      <div className="m-auto h-full w-full max-w-prose flex flex-col items-center justify-center space-y-3">
        <div className="flex flex-col font-mono w-full relative">
          <h1 className="text-4xl font-extralight mb-4 font-serif">
            kill process on port {port}
          </h1>

          <input
            className="absolute opacity-0 pointer-events-none -left-full"
            value={command}
            ref={commandCopyRef}
            readOnly
            type="text"
          />
          <input
            max={65535}
            min={0}
            autoFocus={true}
            onChange={copyOnChange}
            onKeyPress={inputPress}
            ref={portInputRef}
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
        <code className="bg-gray-800 hover:bg-gray w-full  p-2 text-white text-sm flex flex-row items-center justify-between">
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

const Link = (props) => {
  const { disabled } = props;
  return (
    <NextLink {...props}>
      <a
        className={`${
          disabled ? "cursor-not-allowed font-normal" : "cursor-pointer"
        } font-`}
      ></a>
    </NextLink>
  );
};

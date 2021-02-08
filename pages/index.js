import Head from "next/head";
import styles from "../styles/Home.module.css";
import React from "react";
import { useDebounce } from "../utils/hooks";
import * as NextLink from "next/link";
import { Navigation } from "../components/Navigation";
import "twin.macro";

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
    <>
      <Head>
        <title>Kill Process</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="A simple way to kill a process running on a port"
        />
      </Head>
      <div tw="flex flex-col font-mono w-full relative">
        <h1 tw="text-2xl font-extralight mb-4">kill process on port {port}</h1>

        <input
          tw="absolute opacity-0 pointer-events-none -left-full"
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
          tw="text-lg flex-1 p-2 border-black focus:outline-none focus:ring focus:ring-pink-200 border-solid border-2"
          placeholder="port number"
          type="number"
        />
      </div>
      <code tw="bg-gray-800  w-full  p-2 text-white text-sm flex flex-row items-center justify-between">
        <div>
          <span tw="select-none">~ </span>
          {command}
        </div>
        {port && (
          <button
            onClick={copyCode}
            tw="select-none flex flex-row items-center space-x-1 focus:outline-none  focus:ring-1 focus:ring-pink-200 px-2"
          >
            <svg
              tw="h-4"
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
    </>
  );
}

function formatCopyCommand(port) {
  return `lsof -ti :${port || "{PORT}"} | xargs kill`;
}

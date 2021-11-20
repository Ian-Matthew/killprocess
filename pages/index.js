import Head from "next/head";
import React from "react";
import { useDebounce } from "../utils/hooks";
import classNames from "classnames";

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
  const [copied, setCopied] = React.useState();

  //Change handler for for port input
  function copyOnChange(e) {
    e.preventDefault();
    setCopied(0);
    setPort(e.target.value);
  }

// formatted string of copy command
function formatCopyCommand(port) {
  return `lsof -ti :${port || "{PORT}"} | xargs kill`;
}

  // function to copy the command from hidden input to the clipboard
  function copyCode() {
    setCopied(copied + 1);
    commandCopyRef.current.select();
    document.execCommand("copy");
  }
  // watch the input ref -- if enter is pressed while focus, trigger copy
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
        <title>
          Kill Process | How to kill a process running on a port
        </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="This is the easiest way to kill a process running on a port. Just enter the port and copy the generated script."
        />
        <meta charSet="utf-8" />
      </Head>
      <section className="space-y-3 w-full">
        <div className="flex flex-col w-full relative">
          <h1 className="text-xl font-semibold mb-4">
            kill process on port {port}
          </h1>
          <div className="aria-hidden">
          <input
            aria-label="Port Number"
            className="absolute opacity-0 pointer-events-none -left-full"
            value={command}
            ref={commandCopyRef}
            readOnly
            type="text"
          />
          </div>
         
          <div className="relative flex items-center justify-between flex-row flex-1 w-full">
            <div className="absolute right-5 text-xs text-gray-400 overflow-hidden">
              <div className="relative">
                <span
                  className={classNames(
                    "transition-opacity duration-500",
                    port ? "opacity-100" : "opacity-0"
                  )}
                >
                  <strong className="font-medium">return/enter</strong> to copy
                </span>
                {!!copied && (
                  <span
                    key={`copy-${copied}`}
                    className={classNames(
                      "absolute flex justify-end h-full top-0 left-0 w-full font-medium bg-white animate-fade-in-and-out "
                    )}
                  >
                    copied!
                  </span>
                )}
              </div>
            </div>
            <input
              name="port"
              max={65535}
              min={0}
              autoFocus={true}
              onChange={copyOnChange}
              onKeyPress={inputPress}
              ref={portInputRef}
              value={port}
              className="text-lg w-full p-2 border-black focus:outline-none focus:ring focus:ring-pink-200 border-solid border-2"
              placeholder="port number"
              type="number"
            />
          </div>
        </div>
        <code className="bg-gray-800 font-mono w-full  p-2 text-white text-sm flex flex-row items-center justify-between">
          <div>
            <span className="select-none text-pink-400">~ </span>
            {command}
          </div>

          <button
            onClick={copyCode}
            className="select-none hidden xs:flex flex-row items-center space-x-1 focus:outline-none  focus:ring-1 focus:ring-pink-200 px-2"
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
            <span>copy</span>
          </button>
        </code>
      </section>

      </>
  );
}


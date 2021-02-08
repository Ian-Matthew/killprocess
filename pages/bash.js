import Head from "next/head";
import React from "react";
import { Navigation } from "../components/Navigation";
import "twin.macro";

export default function Bash() {
  const functioncCopyRef = React.useRef(null);
  return (
    <div tw="min-h-screen h-full flex flex-col items-center justify-center relative mx-5">
      <div tw="flex flex-row w-full justify-end items-center max-w-screen-xl mt-5">
        <Navigation></Navigation>
      </div>
      <div tw="m-auto h-full w-full max-w-prose flex flex-col items-center justify-center space-y-3">
        <div tw="flex flex-col font-mono w-full relative space-y-3">
          <p>Add to .bashrc/.zshrc</p>

          <pre tw="bg-gray-800  w-full  p-2 text-white text-sm ">
            <div></div>
            {`function kill-port(){`}
            <br />
            <span>&#9;{`lsof -ti :$1 | xargs kill`}</span>
            <br />
            {`}`}
          </pre>
          <p>Then: </p>

          <code tw="bg-gray-800  w-full  p-2 text-white text-sm">
            <span tw="select-none">~ </span>
            kill-port 3000
          </code>
        </div>
      </div>
    </div>
  );
}

function formatCopyCommand(port) {
  return `lsof -ti :${port || "{PORT}"} | xargs kill`;
}

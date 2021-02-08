import Head from "next/head";
import React from "react";
import "twin.macro";

export default function Bash() {
  return (
    <>
      <Head>
        <title>Kill Process | Bash Script</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="A simple way to kill a process running on a port using a bash script."
        />
      </Head>
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
    </>
  );
}

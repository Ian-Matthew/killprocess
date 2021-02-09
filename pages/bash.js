import Head from "next/head";
import React from "react";

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
      <p className="font-semibold">Add to .bashrc/.zshrc</p>

      <code className="bg-gray-800 font-mono w-full p-2 text-white text-sm ">
        {`function kill-port(){`}
        <br />
        <span>&nbsp;&nbsp;{`lsof -ti :$1 | xargs kill`}</span>
        <br />
        {`}`}
      </code>
      <p className="font-semibold">Then: </p>

      <code className="bg-gray-800  w-full  p-2 text-white text-sm">
        <span className="select-none text-pink-400">~ </span>
        kill-port 3000
      </code>
    </>
  );
}

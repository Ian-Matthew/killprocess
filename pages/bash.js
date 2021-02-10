import Head from "next/head";
import React from "react";

export default function Bash() {
  return (
    <>
      <Head>
        <title>Kill Process | Bash Script</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="A simple way to kill a process running on a port using a bash script. Just copy this bash script into your .bashrc/.zshrc, source the file and run the command."
        />
      </Head>
      <h1 className="text-xl font-semibold mb-4">bash script</h1>
      <div className="space-y-3 flex flex-col w-full">
        <p className="font-semibold">add to .bashrc/.zshrc</p>

        <code className="bg-gray-800 font-mono w-full p-2 text-white text-sm ">
          {`function kill-port(){`}
          <br />
          <span>&nbsp;&nbsp;{`lsof -ti :$1 | xargs kill`}</span>
          <br />
          {`}`}
        </code>
        <p className="font-semibold">then: </p>

        <code className="bg-gray-800  w-full  p-2 text-white text-sm">
          <span className="select-none text-pink-400">~ </span>
          kill-port 3000
        </code>
      </div>
    </>
  );
}

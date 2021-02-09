import React from "react";
import { Navigation } from "./Navigation";
import "twin.macro";
export function Layout({ children }) {
  return (
    <div tw="min-h-screen h-full flex flex-col font-rubik items-center relative mx-5">
      <Navigation></Navigation>
      <div tw="flex flex-1 justify-center flex-col w-full relative space-y-3 max-w-prose">
        {children}
      </div>
      <footer tw="flex w-full flex-row max-w-screen-xl justify-center items-center text-sm text-gray-400">
        <span>made by Ian Matthew Sobule</span>
      </footer>
    </div>
  );
}

import React from "react";
import { Navigation } from "./Navigation";
export function Layout({ children }) {
  return (
    <div className="min-h-screen h-full flex flex-col font-rubik items-center relative mx-5">
      <Navigation></Navigation>
      <div className="flex flex-1 justify-center flex-col w-full relative space-y-3 max-w-prose">
        {children}
      </div>
      <footer className="flex w-full flex-row max-w-screen-xl justify-center items-center text-sm text-gray-400">
        <span>made by Ian Matthew Sobule</span>
      </footer>
    </div>
  );
}

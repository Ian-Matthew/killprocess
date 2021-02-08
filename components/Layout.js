import React from "react";
import { Navigation } from "./Navigation";
import "twin.macro";
export function Layout({ children }) {
  return (
    <div tw="min-h-screen h-full font-mono flex flex-col items-center relative mx-5">
      <Navigation></Navigation>
      <div tw="flex flex-1 justify-center flex-col font-mono w-full relative space-y-3 max-w-prose">
        {children}
      </div>
    </div>
  );
}

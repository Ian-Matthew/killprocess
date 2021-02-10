import React from "react";
import { Navigation } from "./Navigation";
import NextLink from "next/link";

export const Layout = ({ children }) => {
  return (
    <div className="min-h-screen h-full flex flex-col font-rubik items-center relative mx-5">
      <Header></Header>
      <main className="flex flex-1 justify-center flex-col w-full relative  max-w-prose">
        {children}
      </main>
      <footer className="flex w-full flex-row max-w-screen-xl justify-center items-center text-sm text-gray-400">
        <span>made by Ian Matthew Sobule</span>
      </footer>
    </div>
  );
};

const Header = () => {
  return (
    <header className="flex flex-row w-full justify-between items-center max-w-screen-xl mt-5">
      <div className="flex flex-row items-center">
        <NextLink href="/">
          <a className="text-xl font-semibold">killprocess.dev</a>
        </NextLink>
      </div>
      <Navigation></Navigation>
    </header>
  );
};

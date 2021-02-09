import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import tw from "twin.macro";

export function Navigation() {
  return (
    <header tw="flex flex-row w-full justify-end items-center max-w-screen-xl mt-5">
      <nav tw="flex flex-row items-center space-x-3 ">
        <NavLink href="/">home</NavLink>
        <NavLink href="/bash">bash script</NavLink>
      </nav>
    </header>
  );
}

const NavLink = ({ href, children, ...props }) => {
  const router = useRouter();
  const active = router.pathname === href;
  const styles = [
    tw`cursor-pointer hover:text-black text-gray-500 font-medium`,
    active && tw`text-pink-500 hover:text-pink-500 font-bold`,
  ];
  return (
    <Link {...props} href={href}>
      <a css={styles}>{children}</a>
    </Link>
  );
};

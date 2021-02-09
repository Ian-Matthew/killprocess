import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import classNames from "classnames";

export function Navigation() {
  return (
    <header className="flex flex-row w-full justify-end items-center max-w-screen-xl mt-5">
      <nav className="flex flex-row items-center space-x-3 ">
        <NavLink href="/">home</NavLink>
        <NavLink href="/bash">bash script</NavLink>
      </nav>
    </header>
  );
}

const NavLink = ({ href, children, ...props }) => {
  const router = useRouter();
  const active = router.pathname === href;
  const linkClasses = classNames(
    "cursor-pointer hover:text-black text-gray-500 font-medium",
    { "text-pink-500 hover:text-pink-500 font-bold": active }
  );
  return (
    <Link {...props} href={href}>
      <a className={linkClasses}>{children}</a>
    </Link>
  );
};

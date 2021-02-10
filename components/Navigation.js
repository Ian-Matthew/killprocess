import React from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import classNames from "classnames";

export const Navigation = () => {
  return (
    <nav className="flex flex-row items-center space-x-3 ">
      <NavLink className="hidden xs:block" href="/">
        home
      </NavLink>
      <NavLink href="/about">about</NavLink>
      <NavLink href="/bash">bash script</NavLink>
    </nav>
  );
};

const NavLink = ({ href, children, className, ...props }) => {
  const router = useRouter();
  const active = router.pathname === href;
  const linkClasses = classNames(
    "cursor-pointer hover:text-black text-gray-500 font-medium text-sm xs:text-base",
    { "text-pink-500 hover:text-pink-500 font-bold": active },
    className
  );
  return (
    <NextLink {...props} href={href}>
      <a className={linkClasses}>{children}</a>
    </NextLink>
  );
};

export const InlineLink = ({ href, children, ...props }) => {
  return (
    <NextLink {...props} href={href}>
      <a className="cursor-pointer underline hover:text-blue-300 text-blue-500 font-medium">
        {children}
      </a>
    </NextLink>
  );
};

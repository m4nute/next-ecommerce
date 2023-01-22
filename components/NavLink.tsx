import React from "react";
import Link from "next/link";

type Props = {
  navText: string;
  redirect: string;
  align: boolean;
};

function NavLink(props: Props) {
  const { navText, redirect, align } = props;

  return (
    <Link
      className={`group transition-all duration-300 ease-in-out px-2 ${align && "flex flex-col justify-center"
        }`}
      href={redirect}
    >
      <span
        className={`bg-left-bottom bg-gradient-to-r from-gray-200 to-gray-200 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-300 ease-out py-2 `}
      >
        {navText}
      </span>
    </Link>
  );
}

export default NavLink;

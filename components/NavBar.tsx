"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

import { Button } from "@/components/ui/button";

export function ButtonLogin() {
  return <Button>login</Button>;
}

function isActive(pathname: string, href: string) {
  return pathname.startsWith(href);
}
export default function NavBar() {
  const pathname = usePathname();
  // const user = {
  //   name: "john doe",
  //   image: "https://i.pravatar.cc/300",
  // };

  const user: any = null;
  // {`hover:text-accent-400 transition-colors `}
  return (
    <nav className="flex justify-between items-center w-full ">
      <ul className="flex justify-start items-center gap-4 w-full p-3 ">
        <Logo />
        <li>
          <Link
            href={"/rooms"}
            className={`${
              isActive(pathname, "/rooms")
                ? "underline-offset-4 underline "
                : ""
            } hover:text-green-400 transition-colors duration-200`}
          >
            rooms
          </Link>
        </li>
      </ul>
      {user ? (
        <Link href={"/profile"}>
          {/* <ButtonLogin /> */}
          <Button variant="outline">login</Button>
          <img
            className="rounded-full h-9 cursor-pointer hover:h-11 transition-all duration-200"
            src={user?.image}
            alt={user?.name}
            referrerPolicy="no-referrer"
          />
        </Link>
      ) : (
        <Button variant="outline">login</Button>
        // <Link href={"/login"}>login</Link>
      )}
    </nav>
  );
}

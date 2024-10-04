"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./Button";
import Logo from "./Logo";

function isActive(pathname: string, href: string) {
  return pathname.startsWith(href);
}
export default function NavBar() {
  const pathname = usePathname();
  console.log(pathname);
  // const user = {
  //   name: "john doe",
  // };
  const user: any = null;
  return (
    <nav className=" mx-3 flex justify-between items-center  ">
      <ul className=" flex justify-start items-center gap-4 w-full py-2 ">
        <Logo />
        <li>
          <Link
            href={"/rooms"}
            className={`${
              isActive(pathname, "/rooms")
                ? "underline-offset-4 underline "
                : ""
            } hover:text-accent-300 transition-colors duration-200`}
          >
            rooms
          </Link>
        </li>
      </ul>
      {user ? (
        <Link href={"/profile"}>
          <p>{user.name}</p>
        </Link>
      ) : (
        <Button background="bg-primary-300" hoverBackground="bg-primary-200">
          <Link href={"/login"}>Login</Link>
        </Button>
      )}
    </nav>
  );
}

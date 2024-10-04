"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./Button";
import Logo from "./Logo";

function isActive(pathname: string, href: string) {
  return pathname.startsWith(href);
}
type User = {
  name: string;
};

export default function NavBar() {
  const pathname = usePathname();
  const user: User = { name: "ferhattaher" };

  return (
    <nav className="bg-[#0843a8] shadow-md py-2 px-4">
      <div className="container mx-auto flex justify-between items-center">
        <ul className="flex justify-start items-center gap-6 px-4">
          <Logo />
          <li>
            <Link
              href={"/rooms"}
              className={`${
                isActive(pathname, "/rooms")
                  ? "underline-offset-4 underline text-accent-200"
                  : "text-gray-300"
              } hover:text-accent-300 transition-colors duration-200`}
            >
              Rooms
            </Link>
          </li>
          {/* Add more navigation items here if needed */}
        </ul>
        {user ? (
          <Link href={"/profile"}>
            <p className="text-gray-200 hover:text-accent-300 transition-colors duration-200">
              {user.name.toUpperCase()}
            </p>
          </Link>
        ) : (
          <Button background="bg-primary-300" hoverBackground="bg-primary-200">
            <Link href={"/login"}>Login</Link>
          </Button>
        )}
      </div>
    </nav>
  );
}

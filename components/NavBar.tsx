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
      <div className="flex justify-between items-center">
        <ul className="flex justify-start items-center gap-6 px-4">
          <Logo />
          <li>
            <Link
              href={"/rooms"}
              className={`${
                isActive(pathname, "/rooms")
                  ? "underline-offset-4 underline text-[#00ff6f]"
                  : "text-gray-300"
              } hover:text-green-400 transition-colors duration-200  `}
            >
              Rooms
            </Link>
          </li>
          {/* Add more navigation items here if needed */}
        </ul>
        {user ? (
          <Link href={"/profile"}>
            <p className="cyan-gradient   font-semibold transition-colors duration-200">
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

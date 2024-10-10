"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "./Button";
import Logo from "./Logo";
import Profile from "./Profile";

function isActive(pathname: string, href: string) {
  return pathname.startsWith(href);
}
type User = {
  name: string;
  email: string;
  id: string;
  verified: boolean;
  token: string;
};

export default function NavBar({ user }: { user: User }) {
  const pathname = usePathname();
  const [userName, setUserName] = useState<string>(user.name);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

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
        </ul>
        {user ? (
          <p
            onClick={() => setIsProfileModalOpen(true)}
            className="cyan-gradient cursor-pointer border border-blue-500 px-2 py-1 rounded-lg  font-semibold transition-colors duration-200"
          >
            {userName.toUpperCase()}
          </p>
        ) : (
          <Button background="bg-primary-300" hoverBackground="bg-primary-200">
            <Link href={"/login"}>Login</Link>
          </Button>
        )}
      </div>
      <Profile
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        name={user.name}
        userId={user.id}
        updateUser={setUserName}
      />
    </nav>
  );
}

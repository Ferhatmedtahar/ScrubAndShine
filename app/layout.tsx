import "@/app/globals.css";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { verifyToken } from "@/lib/verifyToken";
import { Metadata } from "next";
import { cookies } from "next/headers";
export const metadata: Metadata = {
  title: {
    default: "Scrub&Shine",
    template: "%s | Scrub&Shine",
  },
  description:
    " Stay organized, save time and see all the rooms to scrub and shine, tasks for each room , track your progress and organize your tasks !",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jwt = cookies().get("jwt")?.value!;
  let userId;

  const decoded = verifyToken(jwt)!; // Implement this function to verify the token

  if (!decoded || !decoded.userId) {
    userId = null;
  }

  userId = decoded.userId;
  const data = await fetch(`http://localhost:3000/api/users/${userId}`);
  const { user } = await data.json();

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gradient-to-r from-[#faf4f4] to-[#f5ffff]">
        <NavBar user={user} />
        <div className="flex-grow">{children}</div>

        <Footer />
      </body>
    </html>
  );
}

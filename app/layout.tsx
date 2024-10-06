import "@/app/globals.css";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: {
    default: "Scrub&Shine",
    template: "%s | Scrub&Shine",
  },
  description:
    " Stay organized, save time and see all the rooms to scrub and shine, tasks for each room , track your progress and organize your tasks !",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gradient-to-r from-[#faf4f4] to-[#f5ffff]">
        <NavBar />
        <div className="flex-grow">{children}</div>

        <Footer />
      </body>
    </html>
  );
}

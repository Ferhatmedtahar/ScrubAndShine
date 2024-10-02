import "@/app/_styles/globals.css";
import { Metadata } from "next";
import NavBar from "../components/NavBar";
export const metadata: Metadata = {
  title: {
    default: "Scrub&Shine",
    template: "%s | Scrub&Shine",
  },
  description:
    "come here , see all the rooms for scrub and shine, and tasks for each room , track your progress and organize your tasks",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-400 flex  items-center justify-center flex-col gap-20 mt-4 text-2xl px-8 py-3 ">
        <NavBar />

        {children}

        <footer className="text-center text-cyan-200">footer</footer>
      </body>
    </html>
  );
}

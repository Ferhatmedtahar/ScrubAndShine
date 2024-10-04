import Features from "@/components/Features";

import Hero from "@/components/Hero";
import Usage from "@/components/Usage";

export default function page() {
  return (
    <main className="flexCenter flex-col gap-4  bg-gradient-to-r from-[#f7f6f6] to-[#efffff]">
      <Hero />
      <Features />
      <Usage />
    </main>
  );
}

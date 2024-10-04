import Features from "@/components/Features";

import Hero from "@/components/Hero";
import Usage from "@/components/Usage";

export default function page() {
  return (
    <main className="flexCenter flex-col gap-4  ">
      <Hero />
      <Features />
      <Usage />
    </main>
  );
}

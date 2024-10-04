import { FlipWords } from "@/components/ui/flip-words";
import { Button } from "./Button";
// Make sure this is correctly imported

export default function Hero() {
  const words = ["organized", "efficient", "sparkling", "effortless"];

  return (
    <section className="relative h-[95vh] w-full bg-cover bg-bg-main bg-center flex flex-col sm:items-center lg:flex-row justify-between items-center p-8 shadow-xl border-blue-300 border-b-2">
      <div className="flex flex-col gap-6 text-center xxs:items-center lg:items-start lg:text-left lg:max-w-[500px]">
        <h1 className=" text-3xl md:text-5xl font-bold blue-gradient">
          Transform Your Home with
        </h1>
        <FlipWords
          words={words}
          duration={1500}
          className="text-3xl md:text-3xl  font-medium text-accent-300 -mt-5 -p-1"
        />
        <p className="text-text-100 text-lg font-semibold">
          Stay organized, save time, and ensure every room sparkles with ease.
        </p>

        <Button background="bg-accent-200" hoverBackground="bg-accent-300">
          Get Started
        </Button>
      </div>
    </section>
  );
}

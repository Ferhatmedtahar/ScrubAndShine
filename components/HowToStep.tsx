function HowToStep({ number, text }: { number: number; text: string }) {
  return (
    <li className="flex items-center gap-4 py-3 cursor-default ">
      <div className="bg-bg-200 text-primary-100 rounded-full w-10 h-10 flexCenter font-semibold text-lg shadow-lg">
        {number}
      </div>
      <p className="sm:text-base text-stone-800 font-medium leading-relaxed  hover:text-primary-100 transition-all duration-100 text-sm">
        {text}
      </p>
    </li>
  );
}

export default HowToStep;

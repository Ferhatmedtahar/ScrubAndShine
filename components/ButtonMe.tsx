export function Button({
  children,
  background,
  hoverBackground,
}: {
  children: React.ReactNode;
  background: string;
  hoverBackground: string;
}) {
  return (
    <button
      className={` px-3 py-1 text-sm max-w-[150px] sm:max-w-[250px] lg:max-w-[300px] lg:py-3 lg:px-7 ${background} text-white font-semibold rounded-lg hover:${hoverBackground} transition-all  shadow-xl duration-150`}
    >
      {children}
    </button>
  );
}

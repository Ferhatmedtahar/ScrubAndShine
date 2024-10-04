import React from "react";

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
      className={` px-6 py-2  max-w-[150px] sm:max-w-[250px] lg:max-w-[300px] lg:py-3 lg:px-7 ${background} text-white font-semibold rounded-lg hover:${hoverBackground} transition-all  shadow-xl duration-100`}
    >
      {children}
    </button>
  );
}

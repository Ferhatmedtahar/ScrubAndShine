function RoomButton({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant?: string;
}) {
  let hovering: string = "";
  if (variant === "delete")
    hovering = `hover:bg-red-500  hover:border-red-700 `;
  if (variant === "edit")
    hovering = `hover:bg-darkPrimary-300  hover:border-darkPrimary-200 `;
  if (variant === "base") hovering = `hover:bg-slate-200   `;
  return (
    <button
      className={`p-2 flex items-center  rounded-md border border-slate-300  ${hovering} transition-all duration-100`}
    >
      {children}
    </button>
  );
}
export default RoomButton;

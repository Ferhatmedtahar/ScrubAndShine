function AnalyticsCard({
  title,
  value,
  total,
}: {
  title: string;
  value: number;
  total?: number;
}) {
  if (!total) total = 0;
  return (
    <div
      className={` ${
        value / total === 1
          ? "bg-accent-200 hover:bg-accent-100"
          : "hover:bg-bg-300"
      }  border border-gray-300 flex flex-col   rounded-lg p-4  transition-all duration-300 `}
    >
      <div className="flex flex-row items-center justify-between pb-2 ">
        <h1 className="text-sm font-semibold">{title}</h1>
      </div>

      <div className="text-2xl font-bold cursor-default">
        {value}
        {total ? (
          <span className="text-sm text-gray-500 hover:text-accent-200 transition-all duration-200 ">
            {" "}
            /{total}
          </span>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
export default AnalyticsCard;

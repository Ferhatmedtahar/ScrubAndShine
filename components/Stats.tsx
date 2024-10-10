import AnalyticsCard from "./AnalyticsCard";

export default function Stats({ stats }: { stats: any }) {
  const { totalTasks, totalRooms, CompletedTasks } = stats;
  return (
    <div className=" flex  justify-between items-center flex-col gap-3 md:flex-row ">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8 max-w-[800px]  ">
        <AnalyticsCard title="Total Tasks" value={totalTasks} />
        <AnalyticsCard title="Total Rooms" value={totalRooms} />
        <AnalyticsCard
          title="Completed Tasks"
          value={CompletedTasks}
          total={totalTasks}
        />
      </div>
    </div>
  );
}

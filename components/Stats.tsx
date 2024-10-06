import AnalyticsCard from "./AnalyticsCard";
import { Button } from "./ui/Button";

export default function Stats() {
  return (
    <div className=" flex  justify-between items-center flex-col gap-3 md:flex-row ">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8 max-w-[800px]  ">
        <AnalyticsCard title="Total Tasks" value={24} />
        <AnalyticsCard title="Total Rooms" value={5} />
        <AnalyticsCard title="Completed Tasks" value={18} total={24} />
      </div>
      <Button size={"lg"}>Add New Room</Button>
    </div>
  );
}

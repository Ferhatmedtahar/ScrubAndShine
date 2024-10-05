import RoomsList from "@/components/RoomsList";
import Stats from "@/components/Stats";

export const metadata = {
  title: "Rooms",
};

export default function page() {
  return (
    <main className=" max-container padding-container flex   flex-col gap-4">
      <Stats />
      <RoomsList />
    </main>
  );
}

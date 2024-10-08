import PageClient from "./page-client";

export const metadata = {
  title: "Rooms",
};

export default async function Page() {
  const data = await fetch("http://localhost:3000/api/rooms", {
    cache: "no-store",
  });
  const roomsData = await data.json();
  return <PageClient roomsData={roomsData} />;
}

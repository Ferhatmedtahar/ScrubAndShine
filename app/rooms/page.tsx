import { cookies } from "next/headers";
import PageClient from "./page-client";
export const metadata = {
  title: "Rooms",
};
export const dynamic = "force-dynamic";
export default async function Page() {
  const jwt = cookies().get("jwt")?.value!;
  const data = await fetch(`http://localhost:3000/api/rooms?token=${jwt}`, {
    cache: "no-store",
  });
  if (!data.ok) {
    // Handle error if fetching fails
    throw new Error("Failed to fetch rooms");
  }
  const roomsData = await data.json();
  return <PageClient roomsData={roomsData} jwt={jwt} />;
}

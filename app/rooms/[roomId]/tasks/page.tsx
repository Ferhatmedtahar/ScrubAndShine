import PageClient from "./page-client";

export const metadata = {
  title: "Tasks",
};

export default async function Page({ params }: { params: { roomId: string } }) {
  const data = await fetch("http://localhost:3000/api/tasks", {
    cache: "no-store",
  });
  const res = await data.json();
  const tasksData = res.tasks;

  return <PageClient tasksData={tasksData} params={params} />;
}

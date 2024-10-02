// app/rooms/[roomId]/tasks/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: {
    roomId: string;
  };
};
export const generateMetadata = ({ params }: Props): Metadata => {
  return {
    title: `Tasks for Room ${params.roomId}`,
    description: `Tasks for Room ${params.roomId} , here you can see all the tasks for this room`,
  };
};

const page = ({ params }: { params: { roomId: string } }) => {
  const { roomId } = params;
  if (+roomId > 1000) {
    notFound();
  }
  if (+roomId === 3) {
    throw new Error("something went wrong");
  }
  return (
    <div>
      <h1>Tasks for Room {roomId}</h1>
    </div>
  );
};

export default page;

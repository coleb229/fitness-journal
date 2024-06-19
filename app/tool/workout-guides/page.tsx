'use server'
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { WorkoutGuide } from "@/components/custom/WorkoutGuide";
import { workouts } from "../../data/workoutGuide.data";

export default async function Home() {

  const session = await getServerSession(authOptions);
  const user = session?.user?.email;
  if(!session) {
    redirect('/api/auth/signin')
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="grid grid-cols-4 gap-4">
        {workouts.map((workout:any) => (
          <WorkoutGuide key={workout.id} data={workout} />
        ))}
      </div>
    </main>
  );
}

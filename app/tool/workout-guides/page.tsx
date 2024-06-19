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

  const sections = ['chest', 'back', 'legs', 'delts', 'biceps', 'triceps']

  return (
    <main className="flex min-h-screen flex-col p-24">
      {sections.map((section) => (
        <div key={section} className="py-10">
          <h1 className="text-4xl font-bold mb-4 border-b-2 border-black">{section}</h1>
          <div className="grid grid-cols-4 gap-4">
            {workouts.map((workout:any) => (
              workout.target === section &&
              <WorkoutGuide key={workout.id} data={workout} />
            ))}
          </div>
        </div>
      ))}
    </main>
  );
}

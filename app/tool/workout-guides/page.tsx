'use server'
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { WorkoutGuide } from "@/components/custom/WorkoutGuide";
import { workouts } from "../../data/workoutGuide.data";
import { tester } from "@/app/data/tester";
import { PageHeader } from "@/components/custom/PageHeader";

export default async function Home() {

  const session = await getServerSession(authOptions);
  let user
  if(!session) {
    user = tester.email
  } else {
    user = session?.user?.email
  }

  const sections = ['chest', 'back', 'legs', 'delts', 'biceps', 'triceps', 'abs']

  return (
    <main className="flex min-h-screen flex-col items-center px-24 py-10">
      <PageHeader title="Workout Guides" description='Find a workout guide for your target muscle group' url='/tool/workout-guides' />
      {sections.map((section) => (
        <div key={section} className="py-10">
          <h1 className="text-4xl font-bold mb-4 border-b-2 border-black italic">{section.toUpperCase()}</h1>
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

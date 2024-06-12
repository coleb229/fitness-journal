'use server'
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { TrainingTable } from "@/components/custom/TrainingTable";

export default async function Home() {

  const session = await getServerSession(authOptions);
  const user = session?.user?.email;
  if(!session) {
    redirect('/api/auth/signin')
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="grid grid-cols-3 gap-6">
        <TrainingTable exercise={'Bench Press'} />
        <TrainingTable exercise={'Overhead Press'} />
        <TrainingTable exercise={'Deadlift'} />
        <TrainingTable exercise={'Pullup'} />
        <TrainingTable exercise={'Squat'} />
        <TrainingTable exercise={'Curl'} />
      </div>
    </main>
  );
}
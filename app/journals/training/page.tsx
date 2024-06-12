'use server'
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { TrainingTable } from "@/components/custom/TrainingTable";
import prisma from "@/lib/prisma";

export default async function Home() {

  const session = await getServerSession(authOptions);
  const user = session?.user?.email;
  if(!session) {
    redirect('/api/auth/signin')
  }

  const benchPressData = await prisma.training.findMany({
    where: {
      user: user as string,
      exercise: 'benchPress'
    }
  });

  const overheadPressData = await prisma.training.findMany({
    where: {
      user: user as string,
      exercise: 'overheadPress'
    }
  });

  const deadliftData = await prisma.training.findMany({
    where: {
      user: user as string,
      exercise: 'deadlift'
    }
  });

  const pullupData = await prisma.training.findMany({
    where: {
      user: user as string,
      exercise: 'pullup'
    }
  });

  const squatData = await prisma.training.findMany({
    where: {
      user: user as string,
      exercise: 'squat'
    }
  });

  const curlData = await prisma.training.findMany({
    where: {
      user: user as string,
      exercise: 'curl'
    }
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="grid grid-cols-3 gap-6">
        <TrainingTable exercise='benchPress' session={user} data={benchPressData} />
        <TrainingTable exercise='overheadPress' session={user} data={overheadPressData} />
        <TrainingTable exercise='deadlift' session={user} data={deadliftData} />
        <TrainingTable exercise='pullup' session={user} data={pullupData} />
        <TrainingTable exercise='squat' session={user} data={squatData} />
        <TrainingTable exercise='curl' session={user} data={curlData} />
      </div>
    </main>
  );
}
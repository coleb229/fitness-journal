'use server'
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { TrainingTable } from "@/components/custom/TrainingTable";
import prisma from "@/lib/prisma";
import { tester } from "@/app/data/tester";

export default async function Home() {

  const session = await getServerSession(authOptions);
  let user
  if(!session) {
    user = tester.email
  } else {
    user = session?.user?.email
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

  //need to add a way to swap between different exercises and store them in user preferences

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="grid grid-cols-3 gap-6">
        <TrainingTable exercise='benchPress' session={user} data={benchPressData} title='Bench Press' />
        <TrainingTable exercise='overheadPress' session={user} data={overheadPressData} title='Overhead Press' />
        <TrainingTable exercise='deadlift' session={user} data={deadliftData} title='Deadlift' />
        <TrainingTable exercise='pullup' session={user} data={pullupData} title='Pullup' />
        <TrainingTable exercise='squat' session={user} data={squatData} title='Squat' />
        <TrainingTable exercise='curl' session={user} data={curlData} title='Curl' />
      </div>
    </main>
  );
}
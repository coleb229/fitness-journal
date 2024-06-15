'use server'
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { UserPreference } from "@/components/custom/UserPreferences";
import { updateTargetFat, updateTargetProtein, updateTargetCarbs, updateTargetCalories } from "@/lib/db";
import { UserStats } from "@/components/custom/UserStats";

export default async function Home() {

  const session = await getServerSession(authOptions);
  if(!session) {
    redirect('/api/auth/signin')
  }

  const preferences = await prisma.userPreferences.findUnique({
    where: {
      user: session?.user?.email as string
    }
  })

  const dietData = await prisma.dailyLog.findMany({
    where: {
      user: session?.user?.email as string
    }
  })

  const trainingData = await prisma.training.findMany({
    where: {
      user: session?.user?.email as string
    }
  })

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="absolute top-20 left-20">
        <UserStats data={{dietData, trainingData}} />
      </div>
      <h1>Profile</h1>
      <UserPreference action={updateTargetFat} label="Target Fat" target="tFat" preferences={preferences?.tFat} />
      <UserPreference action={updateTargetProtein} label="Target Protein" target="tProtein" preferences={preferences?.tProtein} />
      <UserPreference action={updateTargetCarbs} label="Target Carbs" target="tCarbs" preferences={preferences?.tCarbs} />
      <UserPreference action={updateTargetCalories} label="Target Calories" target="tCalories" preferences={preferences?.tCalories} />
    </main>
  );
}
'use server'
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { UserPreference, UpdateGoal } from "@/components/custom/UserPreferences";
import { updateTargetFat, updateTargetProtein, updateTargetCarbs, updateTargetCalories } from "@/lib/db";
import { UserStats } from "@/components/custom/UserStats";
import { TooltipComponent } from "@/components/custom/Tooltip";
import { tester } from "../data/tester";
import { PageHeader } from "@/components/custom/PageHeader";

export default async function Home() {

  const session = await getServerSession(authOptions);
  let user
  if(!session) {
    user = tester.email
  } else {
    user = session?.user?.email
  }

  const preferences = await prisma.userPreferences.findUnique({
    where: {
      user: user as string
    }
  })

  const dietData = await prisma.dailyLog.findMany({
    where: {
      user: user as string
    }
  })

  const trainingData = await prisma.training.findMany({
    where: {
      user: user as string
    }
  })

  return (
    <main className="flex flex-col min-h-screen items-center px-24 py-10">
      <PageHeader title="Profile" description='Set your goals and preferences here' url='/user' />
      <div className="absolute top-60 left-20 bg-white rounded-lg w-[400px]">
        <UserStats data={{dietData, trainingData}} preference={preferences?.goal} />
      </div>
      <h1>Profile</h1>
      <div className="flex items-center">
        <UpdateGoal />
        <TooltipComponent message="This preference will affect the calculation of days you met calorie intake goals - Set accordingly." />
      </div>
      <div className="flex items-center">
        <UserPreference action={updateTargetFat} label="Target Fat" target="tFat" preferences={preferences?.tFat} type='number' />
        <TooltipComponent message="Fat intake is typically set lower than protein and carbs" />
      </div>
      <div className="flex items-center">
        <UserPreference action={updateTargetProtein} label="Target Protein" target="tProtein" preferences={preferences?.tProtein} type='number' />
        <TooltipComponent message="Best practice to maintain/build muscle is to set this equal to your current weight in lbs." />
      </div>
      <div className="flex items-center">
        <UserPreference action={updateTargetCarbs} label="Target Carbs" target="tCarbs" preferences={preferences?.tCarbs} type='number' />
        <TooltipComponent message="This is typically set higher than fat, but lower than protein.  adjust according to your energy levels at different intake levels." />
      </div>
      <div className="flex items-center">
        <UserPreference action={updateTargetCalories} label="Target Calories" target="tCalories" preferences={preferences?.tCalories} type='number' />
        <TooltipComponent message="Use the bmr calculator to help with setting this value.  If you want to lose weight, set this lower than your bmr.  If you want to gain weight, set this higher than your bmr.  If maintaining, set equal to bmr." />
      </div>
    </main>
  );
}
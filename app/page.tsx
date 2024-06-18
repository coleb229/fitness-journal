'use server'
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { GraphCarousel } from "@/components/custom/Carousel";
import { AddGoal } from "@/components/custom/AddGoal";
import { ListGoals } from "@/components/custom/ListGoals";

export default async function Home() {

  const session = await getServerSession(authOptions);
  const user = session?.user?.email;
  if(!session) {
    redirect('/api/auth/signin')
  }

  if(!await prisma.userPreferences.findUnique({
    where: {
      user: user as string
    }
  })) {
    await prisma.userPreferences.create({
      data: {
        user: user as string
      }
    })
  }

  const dailyLogs = await prisma.dailyLog.findMany({
    orderBy: {
      date: 'asc'
    },
    where: {
      user: session?.user?.email as string
    }
  })

  const goals = await prisma.goal.findMany({
    where: {
      user: session?.user?.email as string
    }
  })

  const training = await prisma.training.findMany({
    where: {
      user: session?.user?.email as string,
    },
    orderBy: {
      weight: 'asc'
    }
  })

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="w-full grid grid-cols-2">
        <div>
          <GraphCarousel data={dailyLogs} />
        </div>
        <div className="px-20 h-[400px] overflow-auto">
          <div className="flex items-center justify-center border-b-2 mb-2">
            <h1 className="pr-4 text-xl font-semibold">Add a Goal -{'>'}</h1>
            <AddGoal />
          </div>
          <ListGoals goals={goals} dailyLogs={dailyLogs} training={training} />
        </div>
      </div>
      <p className="font-bold py-4">In Progress</p>
    </main>
  );
}

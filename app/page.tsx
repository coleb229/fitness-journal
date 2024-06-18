'use server'
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { GraphCarousel } from "@/components/custom/Carousel";
import { AddGoal } from "@/components/custom/AddGoal";
import { ListGoals } from "@/components/custom/ListGoals";
import { Notification } from "@/components/custom/Notification";

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

  const notifications = []

  if(dailyLogs.length === 0) {
    notifications.push('You have no daily logs. Add a new log from the journals/diet page')
  }
  if(training.length === 0) {
    notifications.push('You have no training logs. Add a new log from the journals/training page')
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="w-full grid grid-cols-2">
        <div>
          <GraphCarousel data={dailyLogs} />
        </div>
        <div className="px-20 h-[400px] overflow-auto">
          <div className="flex items-center justify-center border-b-2 mb-2">
            <h1 className="pr-4 text-xl font-semibold">Add a Goal -{'>'}</h1>
            {dailyLogs.length === 0 && training.length === 0 ? <p className="text-red-500">You need to add a daily log and a training log before you can add a goal</p> : <AddGoal />}
          </div>
          <ListGoals goals={goals} dailyLogs={dailyLogs} training={training} />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center absolute bottom-0 right-0 p-10 z-50">
        {notifications.map((notification, index) => {
          return (
            <Notification key={index} message={notification} />
          )
        })}
      </div>
    </main>
  );
}

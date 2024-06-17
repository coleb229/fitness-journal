'use server'
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { GraphCarousel } from "@/components/custom/Carousel";

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

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="w-full grid grid-cols-2">
        <GraphCarousel data={dailyLogs} />
        <div>
          <p className="text-center py-20">
            Goals Section
          </p>
        </div>
      </div>
      <p className="font-bold">In Progress</p>
      <p>- add goals w/ progress tracker</p>
      <p>- create user dashboard</p>
    </main>
  );
}

'use server'
import { OutputTable } from "@/components/custom/OutputTable";
import { FormDrawer } from "@/components/custom/FormDrawer";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getUserPreferences } from "@/lib/db";

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
      date: 'desc'
    },
    where: {
      user: session?.user?.email as string
    }
  })
  console.log(dailyLogs)

  const preferences = await prisma.userPreferences.findUnique({
    where: {
      user: session?.user?.email as string
    }
  })

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <FormDrawer preferences={preferences} />
      <OutputTable data={dailyLogs} />
    </main>
  );
}

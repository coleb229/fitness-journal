'use server'
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { WeightLineGraph, FatLineGraph, ProteinLineGraph, CarbsLineGraph } from "@/components/custom/LineGraph";

export default async function Home() {

  const session = await getServerSession(authOptions);
  const user = session?.user?.email;
  if(!session) {
    redirect('/api/auth/signin')
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
      <h1 className="text-4xl">Weight Progress</h1>
      <div className="h-[400px] w-[800px]">
        <WeightLineGraph data={dailyLogs} key='weight' />
      </div>
      <h1 className="text-4xl">Fat Intake</h1>
      <div className="h-[400px] w-[800px]">
        <FatLineGraph data={dailyLogs} key='weight' />
      </div>
      <h1 className="text-4xl">Protein Intake</h1>
      <div className="h-[400px] w-[800px]">
        <ProteinLineGraph data={dailyLogs} key='weight' />
      </div>
      <h1 className="text-4xl">Carbs Intake</h1>
      <div className="h-[400px] w-[800px]">
        <CarbsLineGraph data={dailyLogs} key='weight' />
      </div>
    </main>
  );
}
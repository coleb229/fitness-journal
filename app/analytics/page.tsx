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
      <div className="h-[500px] w-[1400px] pb-20">
        <WeightLineGraph data={dailyLogs} key='weight' />
      </div>
      <h1 className="text-4xl">Fat Intake</h1>
      <div className="h-[500px] w-[1400px] pb-20">
        <FatLineGraph data={dailyLogs} key='weight' />
      </div>
      <h1 className="text-4xl">Protein Intake</h1>
      <div className="h-[500px] w-[1400px] pb-20">
        <ProteinLineGraph data={dailyLogs} key='weight' />
      </div>
      <h1 className="text-4xl">Carbs Intake</h1>
      <div className="h-[500px] w-[1400px] pb-20">
        <CarbsLineGraph data={dailyLogs} key='weight' />
      </div>
    </main>
  );
}
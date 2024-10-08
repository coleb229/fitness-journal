'use server'
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { WeightLineGraph, FatLineGraph, ProteinLineGraph, CarbsLineGraph } from "@/components/custom/LineGraph";
import { GraphCollapsible } from "@/components/custom/GraphCollapsible";
import { tester } from "@/app/data/tester";
import { PageHeader } from "@/components/custom/PageHeader";

export default async function Home() {

  const session = await getServerSession(authOptions);
  let user
  if(!session) {
    user = tester.email
  } else {
    user = session?.user?.email
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
    <main className="flex items-center flex-col px-24 py-10 min-h-screen">
      <PageHeader title="Analytics" description='View your progress over time' url='/analytics' />
      <GraphCollapsible title="Weight Progress">
        <WeightLineGraph data={dailyLogs} key='weight' variant='analytics' />
      </GraphCollapsible>
      <GraphCollapsible title="Fat Intake">
        <FatLineGraph data={dailyLogs} key='weight' />
      </GraphCollapsible>
      <GraphCollapsible title="Protein Intake">
        <ProteinLineGraph data={dailyLogs} key='weight' />
      </GraphCollapsible>
      <GraphCollapsible title="Carbs Intake">
        <CarbsLineGraph data={dailyLogs} key='weight' />
      </GraphCollapsible>
    </main>
  );
}
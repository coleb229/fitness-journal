'use server'
import Image from "next/image";
import { OutputTable } from "@/components/custom/OutputTable";
import { FormDrawer } from "@/components/custom/FormDrawer";
import prisma from "@/lib/prisma";

export default async function Home() {

  const dailyLogs = await prisma.dailyLog.findMany({
    orderBy: {
      date: 'asc'
    }
  })
  console.log(dailyLogs)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Fitness Journal</h1>
      <OutputTable data={dailyLogs} />
      <FormDrawer />
    </main>
  );
}

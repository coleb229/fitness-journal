'use server'
import Image from "next/image";
import { OutputTable } from "@/components/custom/OutputTable";
import { FormDrawer } from "@/components/custom/FormDrawer";
import { LoginButton } from "@/components/custom/LoginButtons";
import prisma from "@/lib/prisma";

export default async function Home() {

  const dailyLogs = await prisma.dailyLog.findMany({
    orderBy: {
      date: 'asc'
    }
  })
  console.log(dailyLogs)

  return (
    <main className="flex min-h-screen flex-col items-center justify-around p-24">
      <OutputTable data={dailyLogs} />
      <FormDrawer />
      <LoginButton />
    </main>
  );
}

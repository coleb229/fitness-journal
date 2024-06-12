'use server'
import Image from "next/image";
import { OutputTable } from "@/components/custom/OutputTable";
import { FormDrawer } from "@/components/custom/FormDrawer";
import { LogoutButton } from "@/components/custom/LoginButtons";
import prisma from "@/lib/prisma";
import { useEffect } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {

  const session = await getServerSession(authOptions);
  if(!session) {
    redirect('/api/auth/signin')
  }

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
      <LogoutButton />
    </main>
  );
}

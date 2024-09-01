'use server'
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { PageHeader } from "@/components/custom/PageHeader";
import { tester } from "@/app/data/tester";
import { AddProgressRow } from "@/components/custom/AddProgressRow";
import { ProgressTable } from "@/components/custom/ProgressTable";

export default async function Page() {
  const session = await getServerSession(authOptions);
  let user
  if(!session) {
    user = tester.email
  } else {
    user = session?.user?.email
  }

  const data = await prisma.progressEntry.findMany({
    orderBy: {
      date: 'asc'
    },
    where: {
      user: user as string
    }
  })
  console.log(data)

  const images = []
  for (const entry of data) {
    const image = await prisma.image.findMany({
      where: {
        progressEntryId: entry.id
      }
    })
    image.length > 0 ? images.push(image) : null
  }
  console.log(images)

  return (
    <main className="flex min-h-screen flex-col py-10">
      <PageHeader title="Progress Journal" description="Upload Progress Pics to this page to visualize your progress over time." url='/' />
      <div className="px-24">
        <ProgressTable data={data} images={images} />
        <AddProgressRow />
      </div>
    </main>
  )
}
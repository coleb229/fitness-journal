'use server'
import { OutputTable } from "@/components/custom/OutputTable";
import { FormDrawer } from "@/components/custom/FormDrawer";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { tester } from "@/app/data/tester";

export default async function Home() {

  const session = await getServerSession(authOptions);
  let user
  if(!session) {
    user = tester.email
  } else {
    user = session?.user?.email
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
      user: user as string
    }
  })

  const preferences = await prisma.userPreferences.findUnique({
    where: {
      user: user as string
    }
  })

  const actions = {
    editCalories: async (formData:any) => {
      'use server'
      await prisma.dailyLog.update({
        where: {
          id: formData.get('id')
        },
        data: {
          calories: parseInt(formData.get('calories'))
        }
      })
      redirect('/journals/diet')
    },
    editFat: async (formData:any) => {
      'use server'
      await prisma.dailyLog.update({
        where: {
          id: formData.get('id')
        },
        data: {
          fat: parseInt(formData.get('fat'))
        }
      })
      redirect('/journals/diet')
    },
    editProtein: async (formData:any) => {
      'use server'
      await prisma.dailyLog.update({
        where: {
          id: formData.get('id')
        },
        data: {
          protein: parseInt(formData.get('protein'))
        }
      })
      redirect('/journals/diet')
    },
    editCarbs: async (formData:any) => {
      'use server'
      await prisma.dailyLog.update({
        where: {
          id: formData.get('id')
        },
        data: {
          carbs: parseInt(formData.get('carbs'))
        }
      })
      redirect('/journals/diet')
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <FormDrawer preferences={preferences} />
      <OutputTable data={dailyLogs} targets={preferences} actions={actions} />
    </main>
  );
}
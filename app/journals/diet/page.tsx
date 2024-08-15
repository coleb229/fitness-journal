'use server'
import { OutputTable } from "@/components/custom/OutputTable";
import { FormDrawer } from "@/components/custom/FormDrawer";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { tester } from "@/app/data/tester";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {

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

  // !!!PAGINATION!!!
  const page = searchParams['page'] ?? '1'
  const per_page = searchParams['per_page'] ?? '10'

  const start = (Number(page) - 1) * Number(per_page)
  const end = start + Number(per_page)

  const entries = dailyLogs.slice(start, end)

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
    },
    toggleAbs: async (formData:any) => {
      'use server'
      const log = await prisma.dailyLog.findUnique({
        where: {
          id: formData.get('id')
        }
      })
      await prisma.dailyLog.update({
        where: {
          id: formData.get('id')
        },
        data: {
          abs: log?.abs === true ? false : true
        }
      })
      redirect('/journals/diet')
    },
    toggleCardio: async (formData:any) => {
      'use server'
      const log = await prisma.dailyLog.findUnique({
        where: {
          id: formData.get('id')
        }
      })
      await prisma.dailyLog.update({
        where: {
          id: formData.get('id')
        },
        data: {
          cardio: log?.cardio === true ? false : true
        }
      })
      redirect('/journals/diet')
    },
    editTraining: async (formData:any) => {
      'use server'
      await prisma.dailyLog.update({
        where: {
          id: formData.get('id')
        },
        data: {
          training: formData.get('training')
        }
      })
      redirect('/journals/diet')
    },
    editBodyWeight: async (formData:any) => {
      'use server'
      await prisma.dailyLog.update({
        where: {
          id: formData.get('id')
        },
        data: {
          weight: parseFloat(formData.get('weight'))
        }
      })
      redirect('/journals/diet')
    },
    editNotes: async (formData:any) => {
      'use server'
      await prisma.dailyLog.update({
        where: {
          id: formData.get('id')
        },
        data: {
          notes: formData.get('notes')
        }
      })
      redirect('/journals/diet')
    },
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <FormDrawer preferences={preferences} />
      <OutputTable data={entries} targets={preferences} actions={actions} fullData={dailyLogs} />
    </main>
  );
}
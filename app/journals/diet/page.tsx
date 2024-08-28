'use server'
import { OutputTable } from "@/components/custom/OutputTable";
import { FormDrawer } from "@/components/custom/FormDrawer";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { tester } from "@/app/data/tester";
import { PageHeader } from "@/components/custom/PageHeader";
import { revalidatePath } from "next/cache";
import { PageInfo } from "@/components/custom/PageInfo";
import { dietJournalPageProps } from "@/app/data/pageProps";

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

  const userPreferenceData = await prisma.userPreferences.findUnique({
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
      try {
        await prisma.dailyLog.update({
          where: {
            id: formData.get('id')
          },
          data: {
            calories: parseInt(formData.get('calories'))
          }
        })
        revalidatePath('/journals/diet')
      } catch (error) {
        return {
          error: 'Something went wrong'
        }
      }
    },
    editFat: async (formData:any) => {
      'use server'
      try {
        await prisma.dailyLog.update({
          where: {
            id: formData.get('id')
          },
          data: {
            fat: parseInt(formData.get('fat'))
          }
        })
        revalidatePath('/journals/diet')
      } catch (error) {
        return {
          error: 'Something went wrong'
        }
      }
    },
    editProtein: async (formData:any) => {
      'use server'
      try {
        await prisma.dailyLog.update({
          where: {
            id: formData.get('id')
          },
          data: {
            protein: parseInt(formData.get('protein'))
          }
        })
        revalidatePath('/journals/diet')
      } catch (error) {
        console.log(error)
        return {
          error: 'Something went wrong'
        }
      }
    },
    editCarbs: async (formData:any) => {
      'use server'
      try {
        await prisma.dailyLog.update({
          where: {
            id: formData.get('id')
          },
          data: {
            carbs: parseInt(formData.get('carbs'))
          }
        })
        revalidatePath('/journals/diet')
      } catch (error) {
        return {
          error: 'Something went wrong'
        }
      }
    },
    toggleAbs: async (formData:any) => {
      'use server'
      try {
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
        revalidatePath('/journals/diet')
      } catch (error) {
        return {
          error: 'Something went wrong'
        }
      }
    },
    toggleCardio: async (formData:any) => {
      'use server'
      try {
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
        revalidatePath('/journals/diet')
      } catch (error) {
        return {
          error: 'Something went wrong'
        }
      }
    },
    editTraining: async (formData:any) => {
      'use server'
      try {
        await prisma.dailyLog.update({
          where: {
            id: formData.get('id')
          },
          data: {
            training: formData.get('training')
          }
        })
        revalidatePath('/journals/diet')
      } catch (error) {
        return {
          error: 'Something went wrong'
        }
      }
    },
    editBodyWeight: async (formData:any) => {
      'use server'
      try {
        await prisma.dailyLog.update({
          where: {
            id: formData.get('id')
          },
          data: {
            weight: parseFloat(formData.get('weight'))
          }
        })
        revalidatePath('/journals/diet')
      } catch (error) {
        return {
          error: 'Something went wrong'
        }
      }
    },
    editNotes: async (formData:any) => {
      'use server'
      try {
        await prisma.dailyLog.update({
          where: {
            id: formData.get('id')
          },
          data: {
            notes: formData.get('notes')
          }
        })
        revalidatePath('/journals/diet')
      } catch (error) {
        return {
          error: 'Something went wrong'
        }
      }
    },
    editTargetCalories: async (formData:any) => {
      'use server'
      await prisma.userPreferences.update({
        where: {
          user: user as string
        },
        data: {
          tCalories: parseInt(formData.get('targetCalories'))
        }
      })
      setTimeout(() => {
        revalidatePath('/journals/diet')
      }, 1000)
    },
    editTargetFat: async (formData:any) => {
      'use server'
      await prisma.userPreferences.update({
        where: {
          user: user as string
        },
        data: {
          tFat: parseInt(formData.get('targetFat'))
        }
      })
    },
    editTargetProtein: async (formData:any) => {
      'use server'
      await prisma.userPreferences.update({
        where: {
          user: user as string
        },
        data: {
          tProtein: parseInt(formData.get('targetProtein'))
        }
      })
      setTimeout(() => {
        revalidatePath('/journals/diet')
      }, 1000)
    },
    editTargetCarbs: async (formData:any) => {
      'use server'
      await prisma.userPreferences.update({
        where: {
          user: user as string
        },
        data: {
          tCarbs: parseInt(formData.get('targetCarbs'))
        }
      })
      setTimeout(() => {
        revalidatePath('/journals/diet')
      }, 1000)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center px-24 py-10">
      <PageHeader title="Diet Journal" description="Track your daily nutrition intake" url='/journals/diet' />
      <PageInfo props={dietJournalPageProps} />
      <FormDrawer preferences={preferences} />
      <OutputTable data={entries} targets={preferences} actions={actions} fullData={dailyLogs} userPreferences={userPreferenceData} />
    </main>
  );
}
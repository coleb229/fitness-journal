'use server'
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { GraphCarousel } from "@/components/custom/Carousel";
import { AddGoal } from "@/components/custom/AddGoal";
import { ListGoals } from "@/components/custom/ListGoals";
import { Notification } from "@/components/custom/Notification";
import { tester } from "./data/tester";
import { PageHeader } from "@/components/custom/PageHeader";
import { dailyLogExampleData, goalExampleData, trainingExampleData } from "./data/exampleData";
import { FastTravel } from "@/components/custom/FastTravel";

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
      date: 'asc'
    },
    where: {
      user: session?.user?.email as string
    }
  })

  // catch if there are no daily logs -> returns a notification only currently
  if(dailyLogs.length === 0) {
    return (
      <main className="flex min-h-screen flex-col items-center px-24 py-4">
        <PageHeader title="Dashboard" description="Take a glimpse at your overall fitness progress" url='/' />
        <div className="w-full grid grid-cols-2">
          <div>
            <GraphCarousel data={dailyLogExampleData} goal={195} />
          </div>
          <div className="px-20 h-[400px] overflow-auto">
            <div className="flex items-center justify-center border-b-2 mb-2">
              <h1 className="pr-4 text-xl font-semibold">Add a Goal -{'>'}</h1>
              <AddGoal dailyLogs={dailyLogs} training={trainingExampleData} />
            </div>
            <ListGoals goals={goalExampleData} dailyLogs={dailyLogExampleData} training={trainingExampleData} rate={1 + '(ish)'} />
          </div>
        </div>
        <FastTravel />
        <div className="flex flex-col items-center justify-center fixed bottom-0 right-0 p-10 z-50">
          <Notification key={1} message={"You need to add dailyLog data before personal data will be displayed on this page.  For now you are provided example data."} />
        </div>
      </main>
    )
  }

  const goals = await prisma.goal.findMany({
    where: {
      user: session?.user?.email as string
    }
  })

  const training = await prisma.training.findMany({
    where: {
      user: session?.user?.email as string,
    },
    orderBy: {
      weight: 'asc'
    }
  })

  const loseGoal = await prisma.goal.findMany({
    where: {
      user: session?.user?.email as string,
      goal: 'lose'
    }
  })
  const gainGoal = await prisma.goal.findMany({
    where: {
      user: session?.user?.email as string,
      goal: 'gain'
    }
  })
  let weightGoal
  if(loseGoal.length > 0) {
    weightGoal = loseGoal[0].target
  }
  if(gainGoal.length > 0) {
    weightGoal = gainGoal[0].target
  }

//   !!! NEED TO CONVERT DATE STRING TO A NUMBER VALUE TO CALCULATE WEIGHT LOSS RATE !!!
//   done

  const calculateWeightLossRate = () => {
    const monthMap = [
      { name: 'Jan', value: 1 }, { name: 'Feb', value: 2 }, { name: 'Mar', value: 3 },
      { name: 'Apr', value: 4 }, { name: 'May', value: 5 }, { name: 'Jun', value: 6 },
      { name: 'Jul', value: 7 }, { name: 'Aug', value: 8 }, { name: 'Sep', value: 9 },
      { name: 'Oct', value: 10 }, { name: 'Nov', value: 11 }, { name: 'Dec', value: 12 }
    ];

    // formats start date string to a number value
    let startDate = dailyLogs[0].date.toDateString()
    let startDateMonth = startDate.slice(4, 7)
    
    // formats end date string to a number value
    let endDate = dailyLogs[dailyLogs.length - 1].date.toDateString()
    let endDateMonth = endDate.slice(4, 7)

    for(let i = 0; i < monthMap.length; i++) {
      if(startDateMonth === monthMap[i].name) {
        startDate = startDate.replace(startDateMonth, monthMap[i].value.toString())
      }
      if(endDateMonth === monthMap[i].name) {
        endDate = endDate.replace(endDateMonth, monthMap[i].value.toString())
      }
    }

    startDate = startDate.slice(4, 15)
    endDate = endDate.slice(4, 15)

    const startWeight = dailyLogs[0].weight
    const endWeight = dailyLogs[dailyLogs.length - 1].weight

    const startTime = new Date(startDate).getTime()
    const endTime = new Date(endDate).getTime()

    let timeDifference = endTime - startTime
    timeDifference = timeDifference / (1000 * 3600 * 24) / 7

    const weightLoss = startWeight - endWeight
    const weightLossRate = weightLoss / timeDifference
    const weightLossRateToFixed = weightLossRate.toFixed(2)

    return weightLossRateToFixed
  }

  const weightLossRate = calculateWeightLossRate()

  const notifications = []

  if(dailyLogs.length === 0) {
    notifications.push('You have no daily logs. Add a new log from the journals/diet page')
  }
  if(training.length === 0) {
    notifications.push('You have no training logs. Add a new log from the journals/training page')
  }

  return (
    <main className="flex min-h-screen flex-col items-center px-24 py-4">
      <PageHeader title="Dashboard" description="Take a glimpse at your overall fitness progress" url='/' />
      <div className="w-full grid grid-cols-2">
        <div>
          {weightGoal ? <GraphCarousel data={dailyLogs} goal={weightGoal} /> : 'Add a weight goal to see your progress graphed'}
        </div>
        <div className="px-20 h-[400px] overflow-auto">
          <div className="flex items-center justify-center border-b-2 mb-2">
            <h1 className="pr-4 text-xl font-semibold">Add a Goal -{'>'}</h1>
            {dailyLogs.length === 0 && training.length === 0 ? <p className="text-red-500">You need to add a daily log and a training log before you can add a goal</p> : <AddGoal dailyLogs={dailyLogs} training={training} />}
          </div>
          <ListGoals goals={goals} dailyLogs={dailyLogs} training={training} rate={weightLossRate} />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center absolute bottom-0 right-0 p-10 z-50">
        {notifications.map((notification, index) => {
          return (
            <Notification key={index} message={notification} />
          )
        })}
      </div>
    </main>
  );
}

'use server'
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { GraphCarousel } from "@/components/custom/Carousel";
import { AddGoal } from "@/components/custom/AddGoal";
import { ListGoals } from "@/components/custom/ListGoals";
import { Notification } from "@/components/custom/Notification";
import { tester } from "./data/tester";
import { getUserPreferences } from "@/lib/db";
import { useEffect, useState } from 'react';

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

  const goal = await prisma.goal.findMany({
    where: {
      user: session?.user?.email as string,
      goal: 'lose'
    }
  })
  const weightGoal = goal[0]?.target

//   !!! NEED TO CONVERT DATE STRING TO A NUMBER VALUE TO CALCULATE WEIGHT LOSS RATE !!!
//   done
  const calculateWeightLossRate = () => {
    const monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    // formats start date string to a number value
    let startDate = dailyLogs[0].date.toDateString()
    let startDateMonth = startDate.slice(4, 7)
    switch(startDateMonth) {
      case 'Jan':
        startDate = startDate.replace('Jan', '01')
        break
      case 'Feb':
        startDate = startDate.replace('Feb', '02')
        break
      case 'Mar':
        startDate = startDate.replace('Mar', '03')
        break
      case 'Apr':
        startDate = startDate.replace('Apr', '04')
        break
      case 'May':
        startDate = startDate.replace('May', '05')
        break
      case 'Jun':
        startDate = startDate.replace('Jun', '06')
        break
      case 'Jul':
        startDate = startDate.replace('Jul', '07')
        break
      case 'Aug':
        startDate = startDate.replace('Aug', '08')
        break
      case 'Sep':
        startDate = startDate.replace('Sep', '09')
        break
      case 'Oct':
        startDate = startDate.replace('Oct', '10')
        break
      case 'Nov':
        startDate = startDate.replace('Nov', '11')
        break
      case 'Dec':
        startDate = startDate.replace('Dec', '12')
        break
    }
    startDate = startDate.slice(4, 15)
    let startDateArray = startDate.split(' ')

    // formats end date string to a number value
    let endDate = dailyLogs[dailyLogs.length - 1].date.toDateString()
    let endDateMonth = endDate.slice(4, 7)
    switch(endDateMonth) {
      case 'Jan':
        endDate = endDate.replace('Jan', '01')
        break
      case 'Feb':
        endDate = endDate.replace('Feb', '02')
        break
      case 'Mar':
        endDate = endDate.replace('Mar', '03')
        break
      case 'Apr':
        endDate = endDate.replace('Apr', '04')
        break
      case 'May':
        endDate = endDate.replace('May', '05')
        break
      case 'Jun':
        endDate = endDate.replace('Jun', '06')
        break
      case 'Jul':
        endDate = endDate.replace('Jul', '07')
        break
      case 'Aug':
        endDate = endDate.replace('Aug', '08')
        break
      case 'Sep':
        endDate = endDate.replace('Sep', '09')
        break
      case 'Oct':
        endDate = endDate.replace('Oct', '10')
        break
      case 'Nov':
        endDate = endDate.replace('Nov', '11')
        break
      case 'Dec':
        endDate = endDate.replace('Dec', '12')
        break
    }
    endDate = endDate.slice(4, 15)
    let endDateArray = endDate.split(' ')
    
    console.log('Start Date: ' + startDate)
    console.log('End Date: ' + endDate)

    const startWeight = dailyLogs[0].weight
    const endWeight = dailyLogs[dailyLogs.length - 1].weight

    let startDateDate = new Date(startDate)
    let startTime = startDateDate.getTime()
    let endDateDate = new Date(endDate)
    let endTime = endDateDate.getTime()
    let timeDifference = endTime - startTime
    let daysDifference = timeDifference / (1000 * 3600 * 24)
    let weeksDifference = daysDifference / 7
    console.log('Days: ' + daysDifference)
    console.log('Weeks: ' + weeksDifference)

    const weightLoss = startWeight - endWeight
    const weightLossRate = weightLoss / weeksDifference
    const weightLossRateToFixed = weightLossRate.toFixed(2)

    console.log('Rate: ' + weightLossRate)

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
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-semibold mb-10">Dashboard</h1>
      <div className="w-full grid grid-cols-2">
        <div>
          <GraphCarousel data={dailyLogs} goal={weightGoal} />
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

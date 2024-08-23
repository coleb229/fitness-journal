'use server'
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { TrainingTable } from "@/components/custom/TrainingTable";
import prisma from "@/lib/prisma";
import { tester } from "@/app/data/tester";
import { PageHeader } from "@/components/custom/PageHeader";
import { PageInfo } from "@/components/custom/PageInfo";
import { trainingJournalPageProps } from "@/app/data/pageProps";
import { AddTrainingTable } from "@/components/custom/AddTrainingTable";

export default async function Home() {

  const session = await getServerSession(authOptions);
  let user
  if(!session) {
    user = tester.email
  } else {
    user = session?.user?.email
  }

  const trainingData = await prisma.training.findMany({
    where: {
      user: user as string
    }
  })
  const {
    benchPressData,
    deadliftData,
    squatData,
    overheadPressData,
    pullUpData,
    curlData,
    dipsData,
    legPressData,
    legCurlData,
    legExtensionData,
    latPulldownData,
    seatedRowData,
    chestPressData,
    shoulderFlyData,
    tricepExtensionData,
    preacherCurlData,
    legRaiseData,
    crunchData,
    russianTwistData,
    plankData,
    sidePlankData,
    chestFlyData,
   } = {
    benchPressData: trainingData.filter((data:any) => data.exercise === 'benchPress'),
    deadliftData: trainingData.filter((data:any) => data.exercise === 'deadlift'),
    squatData: trainingData.filter((data:any) => data.exercise === 'squat'),
    overheadPressData: trainingData.filter((data:any) => data.exercise === 'Overhead Press'),
    pullUpData: trainingData.filter((data:any) => data.exercise === 'pullUp'),
    curlData: trainingData.filter((data:any) => data.exercise === 'curl'),
    dipsData: trainingData.filter((data:any) => data.exercise === 'dips'),
    legPressData: trainingData.filter((data:any) => data.exercise === 'legPress'),
    legCurlData: trainingData.filter((data:any) => data.exercise === 'legCurl'),
    legExtensionData: trainingData.filter((data:any) => data.exercise === 'legExtension'),
    latPulldownData: trainingData.filter((data:any) => data.exercise === 'latPulldown'),
    seatedRowData: trainingData.filter((data:any) => data.exercise === 'seatedRow'),
    chestPressData: trainingData.filter((data:any) => data.exercise === 'chestPress'),
    shoulderFlyData: trainingData.filter((data:any) => data.exercise === 'shoulderFly'),
    tricepExtensionData: trainingData.filter((data:any) => data.exercise === 'tricepExtension'),
    preacherCurlData: trainingData.filter((data:any) => data.exercise === 'preacherCurl'),
    legRaiseData: trainingData.filter((data:any) => data.exercise === 'legRaise'),
    crunchData: trainingData.filter((data:any) => data.exercise === 'crunch'),
    russianTwistData: trainingData.filter((data:any) => data.exercise === 'russianTwist'),
    plankData: trainingData.filter((data:any) => data.exercise === 'plank'),
    sidePlankData: trainingData.filter((data:any) => data.exercise === 'sidePlank'),
    chestFlyData: trainingData.filter((data:any) => data.exercise === 'chestFly'),
   }
   
  //need to add a way to swap between different exercises and store them in user preferences

  return (
    <main className="flex min-h-screen flex-col items-center px-24 py-10">
      <PageHeader title='Training Journal' description='Log your training sessions here.' url='/journals/training' />
      <PageInfo props={trainingJournalPageProps} />
      <div className="grid grid-cols-3 gap-6 pt-6">
        {benchPressData.length > 0 && <TrainingTable data={benchPressData} session={session} />}
        {deadliftData.length > 0 && <TrainingTable data={deadliftData} session={session} />}
        {squatData.length > 0 && <TrainingTable data={squatData} session={session} />}
        {overheadPressData.length > 0 && <TrainingTable data={overheadPressData} session={session} />}
        {pullUpData.length > 0 && <TrainingTable data={pullUpData} session={session} />}
        {curlData.length > 0 && <TrainingTable data={curlData} session={session} />}
        {dipsData.length > 0 && <TrainingTable data={dipsData} session={session} />}
        {legPressData.length > 0 && <TrainingTable data={legPressData} session={session} />}
        {legCurlData.length > 0 && <TrainingTable data={legCurlData} session={session} />}
        {legExtensionData.length > 0 && <TrainingTable data={legExtensionData} session={session} />}
        {latPulldownData.length > 0 && <TrainingTable data={latPulldownData} session={session} />}
        {seatedRowData.length > 0 && <TrainingTable data={seatedRowData} session={session} />}
        {chestPressData.length > 0 && <TrainingTable data={chestPressData} session={session} />}
        {shoulderFlyData.length > 0 && <TrainingTable data={shoulderFlyData} session={session} />}
        {tricepExtensionData.length > 0 && <TrainingTable data={tricepExtensionData} session={session} />}
        {preacherCurlData.length > 0 && <TrainingTable data={preacherCurlData} session={session} />}
        {legRaiseData.length > 0 && <TrainingTable data={legRaiseData} session={session} />}
        {crunchData.length > 0 && <TrainingTable data={crunchData} session={session} />}
        {russianTwistData.length > 0 && <TrainingTable data={russianTwistData} session={session} />}
        {plankData.length > 0 && <TrainingTable data={plankData} session={session} />}
        {sidePlankData.length > 0 && <TrainingTable data={sidePlankData} session={session} />}
        {chestFlyData.length > 0 && <TrainingTable data={chestFlyData} session={session} />}
        <AddTrainingTable />
      </div>
    </main>
  );
}
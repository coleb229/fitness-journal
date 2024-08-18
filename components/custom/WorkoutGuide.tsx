import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Image, { StaticImageData } from "next/image"

import benchPress from "@/public/images/benchPress.jpg"
import chestFly from "@/public/images/chestFly.jpg"
import chestPress from "@/public/images/chestPress.jpg"
import crunch from "@/public/images/crunch.jpg"
import curl from "@/public/images/curl.jpg"
import deadlift from "@/public/images/deadlift.jpg"
import dip from "@/public/images/dips.jpg"
import latPulldown from "@/public/images/latPulldown.jpg"
import legCurl from "@/public/images/legCurl.jpg"
import legExtension from "@/public/images/legExtension.jpg"
import legPress from "@/public/images/legPress.jpg"
import legRaise from "@/public/images/legRaise.jpg"
import overheadPress from "@/public/images/overheadPress.jpg"
import plank from "@/public/images/plank.jpg"
import preacherCurl from "@/public/images/preacherCurl.jpg"
import pullup from "@/public/images/pullup.jpg"
import russianTwist from "@/public/images/russianTwist.jpg"
import seatedRow from "@/public/images/seatedRow.jpg"
import shoulderFly from "@/public/images/shoulderFly.jpg"
import sidePlank from "@/public/images/sidePlank.jpg"
import squat from "@/public/images/squat.jpg"
import tricepExtension from "@/public/images/tricepExtension.jpg"

  const picMap: { [key:string]: StaticImageData } = {
    benchPress: benchPress,
    chestFly: chestFly,
    chestPress: chestPress,
    crunch: crunch,
    curl: curl,
    deadlift: deadlift,
    dip: dip,
    latPulldown: latPulldown,
    legCurl: legCurl,
    legExtension: legExtension,
    legPress: legPress,
    legRaise: legRaise,
    overheadPress: overheadPress,
    plank: plank,
    preacherCurl: preacherCurl,
    pullup: pullup,
    russianTwist: russianTwist,
    seatedRow: seatedRow,
    shoulderFly: shoulderFly,
    sidePlank: sidePlank,
    squat: squat,
    tricepExtension: tricepExtension
  }

export const WorkoutGuide = ({ data }:any) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="hover:shadow-xl">
        <WorkoutGuideCard data={data} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{data.title}</AlertDialogTitle>
          <AlertDialogDescription>
            <Image className="mx-auto" src={`/gifs/${data.name}.gif`} alt={data.title} width={200} height={200} /> {/* Only works locally, vercel hates static images */}
            <ol className="list-decimal">
              {data.instructions.map((instruction:any, index:number) => (
                <li key={index} className="my-2 mx-4">{instruction}</li>
              ))}
            </ol>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

const WorkoutGuideCard = ({ data }:any) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{data.title}</CardTitle>
        <CardDescription>Targets the {data.target}</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center items-center">
        <Image src={`/images/${data.name}.jpg`} alt={data.title} width={200} height={200} />
      </CardContent>
    </Card>
  )
}
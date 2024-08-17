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
import benchPress from "@/public/images/workouts/benchPress.jpg"
import chestFly from "@/public/images/workouts/chestFly.jpg"
import chestPress from "@/public/images/workouts/chestPress.jpg"
import crunch from "@/public/images/workouts/crunch.jpg"
import curl from "@/public/images/workouts/curl.jpg"
import deadlift from "@/public/images/workouts/deadlift.jpg"
import dip from "@/public/images/workouts/dips.jpg"
import latPulldown from "@/public/images/workouts/latPulldown.jpg"
import legCurl from "@/public/images/workouts/legCurl.jpg"
import legExtension from "@/public/images/workouts/legExtension.jpg"
import legPress from "@/public/images/workouts/legPress.jpg"
import legRaise from "@/public/images/workouts/legRaise.jpg"
import overheadPress from "@/public/images/workouts/overheadPress.jpg"
import plank from "@/public/images/workouts/plank.jpg"
import preacherCurl from "@/public/images/workouts/preacherCurl.jpg"
import pullup from "@/public/images/workouts/pullup.jpg"
import russianTwist from "@/public/images/workouts/russianTwist.jpg"
import seatedRow from "@/public/images/workouts/seatedRow.jpg"
import shoulderFly from "@/public/images/workouts/shoulderFly.jpg"
import sidePlank from "@/public/images/workouts/sidePlank.jpg"
import squat from "@/public/images/workouts/squat.jpg"
import tricepExtension from "@/public/images/workouts/tricepExtension.jpg"

const fuck = 'me'

export const WorkoutGuide = ({ data }:any) => {

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



  return (
    <AlertDialog>
      <AlertDialogTrigger className="hover:shadow-xl">
        <WorkoutGuideCard data={data} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{data.title}</AlertDialogTitle>
          <AlertDialogDescription>
            <Image src={picMap[data.name]} alt={data.title} width={200} height={200} /> {/* Only works locally */}
            <ol>
              {data.instructions.map((instruction:any, index:number) => (
                <li key={index}>{instruction}</li>
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
        <Image src={`/images/workouts/${data.name}.jpg`} alt={data.title} width={200} height={200} />
      </CardContent>
    </Card>
  )
}